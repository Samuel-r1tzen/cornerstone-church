import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'church-backend-db.json');

export interface ChurchInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  inquiryType: 'visit' | 'prayer' | 'ministry' | 'pastor' | 'general';
  servicePreference?: string;
  visitDate?: string;
  hasChildren?: boolean;
  childrenCount?: number;
  message: string;
  isConfidentialPrayer?: boolean;
  status: 'new' | 'prayed' | 'contacted' | 'in-progress' | 'archived';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventRSVPRecord {
  id: string;
  eventId: string;
  eventTitle: string;
  fullName: string;
  email: string;
  phone?: string;
  attendeesCount: number;
  notes?: string;
  createdAt: string;
}

export interface NewsletterRecord {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
}

interface DatabaseSchema {
  inquiries: ChurchInquiry[];
  eventRsvps: EventRSVPRecord[];
  newsletter: NewsletterRecord[];
}

// Initial realistic seed data for the pastoral team to inspect
const SEED_DATA: DatabaseSchema = {
  inquiries: [
    {
      id: 'INQ-2026-001',
      fullName: 'Jacob & Sarah Van Der Merwe',
      email: 'jacob.vdm@outlook.co.za',
      phone: '+27 82 555 4910',
      inquiryType: 'visit',
      servicePreference: '09:00 AM',
      visitDate: '2026-09-27',
      hasChildren: true,
      childrenCount: 2,
      message: 'Hi there, our family recently relocated to Lyttelton from Cape Town. We have an 8-year-old and a 5-year-old and would love to check out Cornerstone Kids this Sunday.',
      isConfidentialPrayer: false,
      status: 'contacted',
      notes: 'Host team assigned: Johan & Martie. Parking spot reserved.',
      createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
    {
      id: 'INQ-2026-002',
      fullName: 'Thabo Mokoena',
      email: 'thabo.mokoena@gmail.com',
      phone: '+27 71 892 3341',
      inquiryType: 'prayer',
      message: 'Please stand with me in prayer regarding an urgent medical diagnosis for my mother in hospital, and peace for our family during this difficult season.',
      isConfidentialPrayer: true,
      status: 'prayed',
      notes: 'Pastor David and prayer team held focused intercession on Tuesday morning.',
      createdAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    },
    {
      id: 'INQ-2026-003',
      fullName: 'Lerato Dlamini',
      email: 'lerato.d@cloudmail.co.za',
      phone: '+27 83 234 9811',
      inquiryType: 'ministry',
      message: 'Hello! I attended the Young Adults service last month and would love to get plugged into a weekly Life Group or serve in the media team.',
      isConfidentialPrayer: false,
      status: 'new',
      notes: '',
      createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    }
  ],
  eventRsvps: [
    {
      id: 'RSVP-1001',
      eventId: 'worship-night',
      eventTitle: 'Centurion Worship & Prayer Night',
      fullName: 'Bongani Sithole',
      email: 'bongani.s@gmail.com',
      phone: '+27 84 991 2288',
      attendeesCount: 3,
      notes: 'Bringing family and guests',
      createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    },
    {
      id: 'RSVP-1002',
      eventId: 'family-picnic',
      eventTitle: 'Spring Family Braai & Sports Day',
      fullName: 'Anel Du Plessis',
      email: 'anel.dup@mweb.co.za',
      phone: '+27 82 443 1920',
      attendeesCount: 4,
      notes: 'Bringing fold-up chairs and braai salads',
      createdAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    }
  ],
  newsletter: [
    {
      id: 'NEWS-01',
      email: 'grace.k@cornerstone.co.za',
      subscribedAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
      source: 'footer',
    },
    {
      id: 'NEWS-02',
      email: 'mark.pretorius@businessnet.co.za',
      subscribedAt: new Date(Date.now() - 30 * 3600 * 1000).toISOString(),
      source: 'contact_page',
    }
  ]
};

class ChurchDatabase {
  private data: DatabaseSchema;
  private saveTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        if (parsed.inquiries && parsed.eventRsvps && parsed.newsletter) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Could not read existing database file, initializing with seed data.', err);
    }

    this.saveImmediate(SEED_DATA);
    return JSON.parse(JSON.stringify(SEED_DATA));
  }

  private save(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      this.saveImmediate(this.data);
    }, 250);
  }

  private saveImmediate(data: DatabaseSchema): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write church backend database to disk:', err);
    }
  }

  // --- INQUIRIES & CONTACT ---
  public getInquiries(filter?: { type?: string; status?: string; search?: string }): ChurchInquiry[] {
    let result = [...this.data.inquiries];

    if (filter?.type && filter.type !== 'all') {
      result = result.filter(item => item.inquiryType === filter.type);
    }
    if (filter?.status && filter.status !== 'all') {
      result = result.filter(item => item.status === filter.status);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(item => 
        item.fullName.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getInquiryById(id: string): ChurchInquiry | undefined {
    return this.data.inquiries.find(item => item.id === id);
  }

  public createInquiry(payload: Omit<ChurchInquiry, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'notes'>): ChurchInquiry {
    const count = this.data.inquiries.length + 1;
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const id = `INQ-${new Date().getFullYear()}-${count.toString().padStart(3, '0')}-${randomHex}`;
    
    const newInquiry: ChurchInquiry = {
      ...payload,
      id,
      status: 'new',
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.data.inquiries.unshift(newInquiry);
    this.save();
    return newInquiry;
  }

  public updateInquiryStatus(
    id: string, 
    status: ChurchInquiry['status'], 
    notes?: string
  ): ChurchInquiry | null {
    const item = this.data.inquiries.find(i => i.id === id);
    if (!item) return null;

    item.status = status;
    if (notes !== undefined) {
      item.notes = notes;
    }
    item.updatedAt = new Date().toISOString();
    this.save();
    return item;
  }

  public deleteInquiry(id: string): boolean {
    const idx = this.data.inquiries.findIndex(i => i.id === id);
    if (idx === -1) return false;
    this.data.inquiries.splice(idx, 1);
    this.save();
    return true;
  }

  // --- EVENT RSVPS ---
  public getEventRsvps(eventId?: string): EventRSVPRecord[] {
    if (eventId) {
      return this.data.eventRsvps.filter(r => r.eventId === eventId);
    }
    return [...this.data.eventRsvps].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public createEventRsvp(payload: Omit<EventRSVPRecord, 'id' | 'createdAt'>): EventRSVPRecord {
    const count = this.data.eventRsvps.length + 1;
    const id = `RSVP-${count.toString().padStart(4, '0')}`;
    
    const rsvp: EventRSVPRecord = {
      ...payload,
      id,
      createdAt: new Date().toISOString(),
    };

    this.data.eventRsvps.unshift(rsvp);
    this.save();
    return rsvp;
  }

  // --- NEWSLETTER ---
  public subscribeNewsletter(email: string, source = 'website'): { isNew: boolean; subscriber: NewsletterRecord } {
    const normalized = email.trim().toLowerCase();
    const existing = this.data.newsletter.find(n => n.email === normalized);
    if (existing) {
      return { isNew: false, subscriber: existing };
    }

    const newSubscriber: NewsletterRecord = {
      id: `NEWS-${(this.data.newsletter.length + 1).toString().padStart(2, '0')}`,
      email: normalized,
      subscribedAt: new Date().toISOString(),
      source,
    };

    this.data.newsletter.unshift(newSubscriber);
    this.save();
    return { isNew: true, subscriber: newSubscriber };
  }

  public getNewsletterSubscribers(): NewsletterRecord[] {
    return [...this.data.newsletter];
  }

  // --- OVERVIEW STATS ---
  public getStats() {
    const totalInquiries = this.data.inquiries.length;
    const prayerRequests = this.data.inquiries.filter(i => i.inquiryType === 'prayer').length;
    const visitBookings = this.data.inquiries.filter(i => i.inquiryType === 'visit').length;
    const pendingReview = this.data.inquiries.filter(i => i.status === 'new').length;
    const eventRsvpsCount = this.data.eventRsvps.reduce((acc, r) => acc + (r.attendeesCount || 1), 0);
    const newsletterCount = this.data.newsletter.length;

    return {
      totalInquiries,
      prayerRequests,
      visitBookings,
      pendingReview,
      eventRsvpsCount,
      newsletterCount,
      serverTime: new Date().toISOString(),
    };
  }
}

export const churchDb = new ChurchDatabase();
