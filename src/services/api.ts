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

export const churchApi = {
  // Health check
  async getHealth(): Promise<{ status: string; uptime: number; timestamp: string }> {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Backend offline');
    return res.json();
  },

  // Stats
  async getStats(): Promise<BackendStats> {
    const res = await fetch(`${API_BASE}/stats`);
    const json: ApiResponse<BackendStats> = await res.json();
    if (!json.success || !json.data) throw new Error(json.error || 'Failed to fetch stats');
    return json.data;
  },

  // Inquiries
  async getInquiries(filter?: { type?: string; status?: string; search?: string }): Promise<BackendInquiry[]> {
    const params = new URLSearchParams();
    if (filter?.type) params.append('type', filter.type);
    if (filter?.status) params.append('status', filter.status);
    if (filter?.search) params.append('search', filter.search);

    const res = await fetch(`${API_BASE}/inquiries?${params.toString()}`);
    const json: ApiResponse<BackendInquiry[]> = await res.json();
    if (!json.success || !json.data) throw new Error(json.error || 'Failed to fetch inquiries');
    return json.data;
  },

  async createInquiry(data: ContactFormData): Promise<{ referenceId: string; message: string; inquiry: BackendInquiry }> {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json: ApiResponse<BackendInquiry> = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to submit form');
    return {
      referenceId: json.referenceId || json.data?.id || 'SUBMITTED',
      message: json.message || 'Submission received',
      inquiry: json.data!,
    };
  },

  async updateInquiryStatus(id: string, status: BackendInquiry['status'], notes?: string): Promise<BackendInquiry> {
    const res = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
    });
    const json: ApiResponse<BackendInquiry> = await res.json();
    if (!json.success || !json.data) throw new Error(json.error || 'Failed to update inquiry');
    return json.data;
  },

  async deleteInquiry(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'DELETE',
    });
    const json: ApiResponse = await res.json();
    return Boolean(json.success);
  },

  // Event RSVPs
  async submitEventRSVP(eventId: string, payload: EventRSVPPayload): Promise<{ message: string; rsvp: BackendEventRSVP }> {
    const res = await fetch(`${API_BASE}/events/${eventId}/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json: ApiResponse<BackendEventRSVP> = await res.json();
    if (!json.success || !json.data) throw new Error(json.error || 'Failed to submit RSVP');
    return {
      message: json.message || 'RSVP confirmed',
      rsvp: json.data,
    };
  },

  async getEventRSVPs(eventId?: string): Promise<BackendEventRSVP[]> {
    const url = eventId ? `${API_BASE}/events/rsvps?eventId=${eventId}` : `${API_BASE}/events/rsvps`;
    const res = await fetch(url);
    const json: ApiResponse<BackendEventRSVP[]> = await res.json();
    if (!json.success || !json.data) return [];
    return json.data;
  },

  // Newsletter
  async subscribeNewsletter(email: string, source = 'website'): Promise<{ message: string; isNew?: boolean }> {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    });
    const json: ApiResponse = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to subscribe');
    return { message: json.message || 'Subscribed successfully' };
  }
};
