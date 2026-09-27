import { ContactFormData, InquiryType } from '../types';

export interface BackendInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
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

export interface BackendStats {
  totalInquiries: number;
  prayerRequests: number;
  visitBookings: number;
  pendingReview: number;
  eventRsvpsCount: number;
  newsletterCount: number;
  serverTime: string;
}

export interface EventRSVPPayload {
  fullName: string;
  email: string;
  phone?: string;
  attendeesCount: number;
  notes?: string;
}

export interface BackendEventRSVP {
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

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  count?: number;
  referenceId?: string;
}

const API_BASE = '/api';

// Local storage keys for offline/GitHub Pages static mode
const LS_INQUIRIES_KEY = 'cornerstone_offline_inquiries';
const LS_RSVPS_KEY = 'cornerstone_offline_rsvps';
const LS_NEWSLETTER_KEY = 'cornerstone_offline_newsletter';

function getLocalInquiries(): BackendInquiry[] {
  try {
    const raw = localStorage.getItem(LS_INQUIRIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalInquiries(inquiries: BackendInquiry[]) {
  try {
    localStorage.setItem(LS_INQUIRIES_KEY, JSON.stringify(inquiries));
  } catch {}
}

function getLocalRSVPs(): BackendEventRSVP[] {
  try {
    const raw = localStorage.getItem(LS_RSVPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalRSVPs(rsvps: BackendEventRSVP[]) {
  try {
    localStorage.setItem(LS_RSVPS_KEY, JSON.stringify(rsvps));
  } catch {}
}

export const churchApi = {
  // Health check
  async getHealth(): Promise<{ status: string; uptime: number; timestamp: string }> {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (!res.ok) throw new Error('Backend offline');
      const text = await res.text();
      return JSON.parse(text);
    } catch {
      return {
        status: 'offline-static',
        uptime: 0,
        timestamp: new Date().toISOString(),
      };
    }
  },

  // Stats
  async getStats(): Promise<BackendStats> {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) throw new Error('Backend offline');
      const json: ApiResponse<BackendStats> = await res.json();
      if (!json.success || !json.data) throw new Error(json.error || 'Failed to fetch stats');
      return json.data;
    } catch {
      const localInquiries = getLocalInquiries();
      const localRsvps = getLocalRSVPs();
      let newsletterCount = 0;
      try {
        const raw = localStorage.getItem(LS_NEWSLETTER_KEY);
        newsletterCount = raw ? JSON.parse(raw).length : 0;
      } catch {}

      return {
        totalInquiries: localInquiries.length,
        prayerRequests: localInquiries.filter(i => i.inquiryType === 'prayer').length,
        visitBookings: localInquiries.filter(i => i.inquiryType === 'visit').length,
        pendingReview: localInquiries.filter(i => i.status === 'new').length,
        eventRsvpsCount: localRsvps.length,
        newsletterCount,
        serverTime: new Date().toISOString(),
      };
    }
  },

  // Inquiries
  async getInquiries(filter?: { type?: string; status?: string; search?: string }): Promise<BackendInquiry[]> {
    try {
      const params = new URLSearchParams();
      if (filter?.type) params.append('type', filter.type);
      if (filter?.status) params.append('status', filter.status);
      if (filter?.search) params.append('search', filter.search);

      const res = await fetch(`${API_BASE}/inquiries?${params.toString()}`);
      if (!res.ok) throw new Error('Backend offline');
      const json: ApiResponse<BackendInquiry[]> = await res.json();
      if (!json.success || !json.data) throw new Error(json.error || 'Failed to fetch inquiries');
      return json.data;
    } catch {
      let inquiries = getLocalInquiries();
      if (filter?.type) inquiries = inquiries.filter(i => i.inquiryType === filter.type);
      if (filter?.status) inquiries = inquiries.filter(i => i.status === filter.status);
      if (filter?.search) {
        const q = filter.search.toLowerCase();
        inquiries = inquiries.filter(i => 
          i.fullName.toLowerCase().includes(q) || 
          i.email.toLowerCase().includes(q) || 
          i.message.toLowerCase().includes(q)
        );
      }
      return inquiries;
    }
  },

  async createInquiry(data: ContactFormData): Promise<{ referenceId: string; message: string; inquiry: BackendInquiry }> {
    try {
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const json: ApiResponse<BackendInquiry> = await res.json();
        if (json.success && json.data) {
          return {
            referenceId: json.referenceId || json.data.id || 'SUBMITTED',
            message: json.message || 'Submission received',
            inquiry: json.data,
          };
        }
      }
    } catch (e) {
      // Fall through to offline storage
    }

    // Offline / GitHub Pages fallback
    const refCode = `CC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newInquiry: BackendInquiry = {
      id: refCode,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || '',
      inquiryType: data.inquiryType,
      servicePreference: data.servicePreference,
      visitDate: data.visitDate,
      hasChildren: data.hasChildren,
      childrenCount: data.childrenCount,
      message: data.message,
      isConfidentialPrayer: data.isConfidentialPrayer,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const current = getLocalInquiries();
    current.unshift(newInquiry);
    saveLocalInquiries(current);

    return {
      referenceId: refCode,
      message: 'Thank you! Your message has been received and our pastoral team will connect with you soon.',
      inquiry: newInquiry,
    };
  },

  async updateInquiryStatus(id: string, status: BackendInquiry['status'], notes?: string): Promise<BackendInquiry> {
    try {
      const res = await fetch(`${API_BASE}/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      if (res.ok) {
        const json: ApiResponse<BackendInquiry> = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch {}

    const current = getLocalInquiries();
    const item = current.find(i => i.id === id);
    if (item) {
      item.status = status;
      if (notes !== undefined) item.notes = notes;
      item.updatedAt = new Date().toISOString();
      saveLocalInquiries(current);
      return item;
    }
    throw new Error('Inquiry not found');
  },

  async deleteInquiry(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/inquiries/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const json: ApiResponse = await res.json();
        return Boolean(json.success);
      }
    } catch {}

    const current = getLocalInquiries().filter(i => i.id !== id);
    saveLocalInquiries(current);
    return true;
  },

  // Event RSVPs
  async submitEventRSVP(eventId: string, payload: EventRSVPPayload): Promise<{ message: string; rsvp: BackendEventRSVP }> {
    try {
      const res = await fetch(`${API_BASE}/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json: ApiResponse<BackendEventRSVP> = await res.json();
        if (json.success && json.data) {
          return {
            message: json.message || 'RSVP confirmed',
            rsvp: json.data,
          };
        }
      }
    } catch {}

    const newRsvp: BackendEventRSVP = {
      id: `RSVP-${Math.floor(1000 + Math.random() * 9000)}`,
      eventId,
      eventTitle: payload.notes || 'Cornerstone Event',
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      attendeesCount: payload.attendeesCount,
      notes: payload.notes,
      createdAt: new Date().toISOString(),
    };
    const current = getLocalRSVPs();
    current.unshift(newRsvp);
    saveLocalRSVPs(current);

    return {
      message: `RSVP confirmed for ${payload.fullName}! We look forward to seeing you.`,
      rsvp: newRsvp,
    };
  },

  async getEventRSVPs(eventId?: string): Promise<BackendEventRSVP[]> {
    try {
      const url = eventId ? `${API_BASE}/events/rsvps?eventId=${eventId}` : `${API_BASE}/events/rsvps`;
      const res = await fetch(url);
      if (res.ok) {
        const json: ApiResponse<BackendEventRSVP[]> = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch {}

    const rsvps = getLocalRSVPs();
    return eventId ? rsvps.filter(r => r.eventId === eventId) : rsvps;
  },

  // Newsletter
  async subscribeNewsletter(email: string, source = 'website'): Promise<{ message: string; isNew?: boolean }> {
    try {
      const res = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      if (res.ok) {
        const json: ApiResponse = await res.json();
        if (json.success) return { message: json.message || 'Subscribed successfully' };
      }
    } catch {}

    try {
      const raw = localStorage.getItem(LS_NEWSLETTER_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      if (!list.includes(email)) {
        list.push(email);
        localStorage.setItem(LS_NEWSLETTER_KEY, JSON.stringify(list));
      }
    } catch {}

    return { message: 'Thank you for subscribing! You are now connected to weekly Cornerstone updates.' };
  }
};
