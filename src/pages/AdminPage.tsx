import React, { useState, useEffect } from 'react';
import { churchApi, BackendInquiry, BackendStats, BackendEventRSVP } from '../services/api';
import { PageId } from '../types';
import { PencilHeading } from '../components/PencilHeading';
import { 
  ShieldCheck, 
  ArrowLeft, 
  RefreshCw, 
  CheckCircle, 
  Clock, 
  Mail, 
  Phone, 
  HeartHandshake, 
  Calendar, 
  Users, 
  Sparkles, 
  AlertCircle,
  Search,
  Filter,
  Trash2,
  Check,
  Server,
  Activity
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'rsvps' | 'newsletter'>('inquiries');
  const [inquiries, setInquiries] = useState<BackendInquiry[]>([]);
  const [rsvps, setRsvps] = useState<BackendEventRSVP[]>([]);
  const [newsletter, setNewsletter] = useState<any[]>([]);
  const [stats, setStats] = useState<BackendStats | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [serverStatus, setServerStatus] = useState<{ online: boolean; uptime: number; latency: number } | null>(null);

  // Filters
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Editing state for pastoral notes
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const loadData = async (isBackground = false) => {
    if (!isBackground) setIsLoading(true);
    else setIsRefreshing(true);

    const start = performance.now();
    try {
      const [healthRes, statsRes, inquiriesRes, rsvpsRes] = await Promise.all([
        churchApi.getHealth().catch(() => null),
        churchApi.getStats().catch(() => null),
        churchApi.getInquiries({
          type: typeFilter !== 'all' ? typeFilter : undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          search: searchTerm.trim() || undefined,
        }).catch(() => []),
        churchApi.getEventRSVPs().catch(() => []),
      ]);

      const end = performance.now();

      if (healthRes) {
        setServerStatus({
          online: true,
          uptime: Math.round(healthRes.uptime),
          latency: Math.round(end - start),
        });
      } else {
        setServerStatus({ online: false, uptime: 0, latency: 0 });
      }

      if (statsRes) setStats(statsRes);
      setInquiries(inquiriesRes);
      setRsvps(rsvpsRes);
    } catch (err) {
      console.error('Failed to load portal data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [typeFilter, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const handleStatusChange = async (id: string, newStatus: BackendInquiry['status']) => {
    try {
      const updated = await churchApi.updateInquiryStatus(id, newStatus);
      setInquiries(prev => prev.map(item => item.id === id ? updated : item));
      showToast(`Status updated to "${newStatus}"`);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      const target = inquiries.find(i => i.id === id);
      if (!target) return;
      const updated = await churchApi.updateInquiryStatus(id, target.status, noteText);
      setInquiries(prev => prev.map(item => item.id === id ? updated : item));
      setEditingId(null);
      showToast('Pastoral notes saved');
    } catch (err) {
      alert('Failed to save notes');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this submission record?')) return;
    try {
      const ok = await churchApi.deleteInquiry(id);
      if (ok) {
        setInquiries(prev => prev.filter(i => i.id !== id));
        showToast('Record deleted');
      }
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const showToast = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3500);
  };

  return (
    <div className="pt-24 pb-20 space-y-10 min-h-screen bg-[#070B16]">
      
      {/* Header & Server Status Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#B0B7C3] hover:text-[#FF6B2C] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Church Website</span>
        </button>

        <div className="bg-[#0A0F1F] rounded-2xl border border-white/10 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C] mb-2">
                <span className="w-6 h-px bg-[#FF6B2C]" />
                Staff Administration & Care
              </div>
              <PencilHeading text="PASTORAL PORTAL" dataPencil="admin" maxWidth="640px" />
              <p className="text-sm text-[#B0B7C3] max-w-xl mt-1">
                Real-time backend dashboard for managing Sunday first-time visitors, confidential prayer requests, event RSVPs, and pastoral follow-ups.
              </p>
            </div>

            {/* Live Server Heartbeat Card */}
            <div className="bg-[#080B12] border border-white/10 p-4 rounded-xl shrink-0 flex flex-col gap-2 min-w-[240px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#B0B7C3] uppercase tracking-wider flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-[#FF6B2C]" />
                  Backend Engine
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Express
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/5">
                <div>
                  <span className="text-[10px] text-[#B0B7C3]/60 block">Latency</span>
                  <span className="font-mono text-white">{serverStatus?.latency || 12} ms</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#B0B7C3]/60 block">Uptime</span>
                  <span className="font-mono text-white">{serverStatus?.uptime || 120}s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Stats Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#0A0F1F] border border-white/10 p-5 rounded-xl">
            <span className="text-[11px] uppercase tracking-wider text-[#B0B7C3] font-semibold block mb-1">
              Total Inquiries
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-display font-black text-white">
                {stats?.totalInquiries || inquiries.length}
              </span>
              <Mail className="w-4 h-4 text-[#FF6B2C]" />
            </div>
            <span className="text-[10px] text-[#B0B7C3]/70 mt-1 block">Live database records</span>
          </div>

          <div className="bg-[#0A0F1F] border border-white/10 p-5 rounded-xl">
            <span className="text-[11px] uppercase tracking-wider text-[#B0B7C3] font-semibold block mb-1">
              Prayer Requests
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-display font-black text-[#FF6B2C]">
                {stats?.prayerRequests || 0}
              </span>
              <HeartHandshake className="w-4 h-4 text-[#FF6B2C]" />
            </div>
            <span className="text-[10px] text-[#B0B7C3]/70 mt-1 block">Pastoral intercession</span>
          </div>

          <div className="bg-[#0A0F1F] border border-white/10 p-5 rounded-xl">
            <span className="text-[11px] uppercase tracking-wider text-[#B0B7C3] font-semibold block mb-1">
              Sunday Visitors
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-display font-black text-emerald-400">
                {stats?.visitBookings || 0}
              </span>
              <Calendar className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-[10px] text-[#B0B7C3]/70 mt-1 block">Host team prep</span>
          </div>

          <div className="bg-[#0A0F1F] border border-white/10 p-5 rounded-xl">
            <span className="text-[11px] uppercase tracking-wider text-[#B0B7C3] font-semibold block mb-1">
              Event RSVPs
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-display font-black text-amber-400">
                {stats?.eventRsvpsCount || rsvps.length}
              </span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-[10px] text-[#B0B7C3]/70 mt-1 block">Registered attendees</span>
          </div>
        </div>
      </section>

      {/* Main Submissions & Care Management Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A0F1F] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Tabs & Filter Bar */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.01]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`py-2 px-4 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'bg-[#FF6B2C] text-[#080B12]'
                    : 'bg-white/5 text-[#B0B7C3] hover:text-white'
                }`}
              >
                Inquiries & Prayer ({inquiries.length})
              </button>
              <button
                onClick={() => setActiveTab('rsvps')}
                className={`py-2 px-4 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'rsvps'
                    ? 'bg-[#FF6B2C] text-[#080B12]'
                    : 'bg-white/5 text-[#B0B7C3] hover:text-white'
                }`}
              >
                Event RSVPs ({rsvps.length})
              </button>
            </div>

            {/* Refresh & Search controls */}
            <div className="flex items-center gap-3">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B7C3]" />
                <input
                  type="text"
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#080B12] border border-white/15 rounded py-1.5 pl-8 pr-3 text-xs text-white placeholder-[#B0B7C3]/50 focus:outline-none focus:border-[#FF6B2C]"
                />
              </form>

              <button
                onClick={() => loadData(true)}
                disabled={isRefreshing}
                className="p-2 rounded bg-white/5 hover:bg-white/10 text-[#B0B7C3] hover:text-white transition-colors cursor-pointer"
                title="Refresh Live Data"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#FF6B2C]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Quick Filters for Inquiries */}
          {activeTab === 'inquiries' && (
            <div className="px-6 py-3 bg-[#080B12] border-b border-white/5 flex flex-wrap items-center gap-3 text-xs">
              <span className="text-[#B0B7C3] flex items-center gap-1.5 font-medium">
                <Filter className="w-3.5 h-3.5 text-[#FF6B2C]" />
                Filter Type:
              </span>
              {['all', 'visit', 'prayer', 'pastor', 'ministry', 'general'].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    typeFilter === type
                      ? 'bg-white/20 text-white'
                      : 'text-[#B0B7C3] hover:text-white'
                  }`}
                >
                  {type === 'all' ? 'All Types' : type.toUpperCase()}
                </button>
              ))}

              <span className="text-white/20">|</span>

              <span className="text-[#B0B7C3] font-medium">Status:</span>
              {['all', 'new', 'prayed', 'contacted', 'in-progress'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize transition-all cursor-pointer ${
                    statusFilter === st
                      ? 'bg-[#FF6B2C]/20 text-[#FF6B2C] border border-[#FF6B2C]/40'
                      : 'text-[#B0B7C3] hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          )}

          {/* Toast Notification */}
          {actionSuccess && (
            <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-6 py-2.5 flex items-center gap-2 text-emerald-400 text-xs animate-fadeIn">
              <CheckCircle className="w-4 h-4" />
              <span>{actionSuccess}</span>
            </div>
          )}

          {/* Table List View */}
          {isLoading ? (
            <div className="py-20 text-center text-[#B0B7C3] space-y-2">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#FF6B2C]" />
              <p className="text-xs">Querying database from backend...</p>
            </div>
          ) : activeTab === 'inquiries' ? (
            inquiries.length === 0 ? (
              <div className="py-16 text-center text-[#B0B7C3] space-y-2">
                <Mail className="w-8 h-8 mx-auto text-white/20" />
                <p className="text-sm font-semibold text-white">No inquiries found matching criteria</p>
                <p className="text-xs text-[#B0B7C3]">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {inquiries.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-white/[0.015] transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      
                      {/* Left: Contact Info & Badge */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-[#FF6B2C] bg-[#FF6B2C]/10 px-2 py-0.5 rounded border border-[#FF6B2C]/20">
                            {item.id}
                          </span>
                          
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            item.inquiryType === 'prayer'
                              ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                              : item.inquiryType === 'visit'
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                              : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                          }`}>
                            {item.inquiryType}
                          </span>

                          {item.isConfidentialPrayer && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                              <ShieldCheck className="w-3 h-3 text-amber-400" />
                              CONFIDENTIAL
                            </span>
                          )}

                          <span className="text-[11px] text-[#B0B7C3]/60 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <h4 className="font-display font-bold text-lg text-white">
                          {item.fullName}
                        </h4>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#B0B7C3]">
                          <a href={`mailto:${item.email}`} className="flex items-center gap-1.5 hover:text-[#FF6B2C] transition-colors">
                            <Mail className="w-3.5 h-3.5 text-[#FF6B2C]" />
                            {item.email}
                          </a>
                          {item.phone && (
                            <a href={`tel:${item.phone}`} className="flex items-center gap-1.5 hover:text-[#FF6B2C] transition-colors">
                              <Phone className="w-3.5 h-3.5 text-[#FF6B2C]" />
                              {item.phone}
                            </a>
                          )}
                          {item.servicePreference && (
                            <span className="text-white font-medium">
                              Service: {item.servicePreference}
                            </span>
                          )}
                          {item.hasChildren && (
                            <span className="text-emerald-400">
                              Kids attending ({item.childrenCount || 1})
                            </span>
                          )}
                        </div>

                        {/* Message Box */}
                        <div className="p-3.5 rounded-lg bg-[#080B12] border border-white/5 text-sm text-[#F5F2EE] leading-relaxed mt-2">
                          {item.message || '(No extra message provided)'}
                        </div>

                        {/* Pastoral Internal Notes */}
                        <div className="pt-2">
                          {editingId === item.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                placeholder="Add pastoral note (e.g. Prayed with Jacob on phone)..."
                                className="bg-[#080B12] border border-white/20 rounded py-1 px-3 text-xs text-white flex-1 focus:border-[#FF6B2C] focus:outline-none"
                              />
                              <button
                                onClick={() => handleSaveNotes(item.id)}
                                className="px-3 py-1 bg-[#FF6B2C] text-[#080B12] font-bold text-xs rounded"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="px-2 py-1 text-xs text-[#B0B7C3] hover:text-white"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[#B0B7C3] italic">
                                {item.notes ? `Pastoral Note: ${item.notes}` : 'No internal notes attached.'}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingId(item.id);
                                  setNoteText(item.notes || '');
                                }}
                                className="text-[11px] text-[#FF6B2C] hover:underline"
                              >
                                {item.notes ? 'Edit Note' : '+ Add Note'}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Status selector and actions */}
                      <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-2 lg:pt-0">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                          className="bg-[#080B12] border border-white/15 text-xs text-white rounded px-2.5 py-1.5 focus:border-[#FF6B2C] focus:outline-none"
                        >
                          <option value="new">Status: New</option>
                          <option value="prayed">Status: Prayed For 🙏</option>
                          <option value="contacted">Status: Contacted ✅</option>
                          <option value="in-progress">Status: In Progress ⏳</option>
                          <option value="archived">Status: Archived 📁</option>
                        </select>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-[#B0B7C3]/50 hover:text-red-400 transition-colors"
                          title="Delete Submission"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* RSVPs Tab */
            rsvps.length === 0 ? (
              <div className="py-16 text-center text-[#B0B7C3] space-y-2">
                <Calendar className="w-8 h-8 mx-auto text-white/20" />
                <p className="text-sm font-semibold text-white">No Event RSVPs Registered Yet</p>
                <p className="text-xs text-[#B0B7C3]">Event registrations will appear here when visitors sign up.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {rsvps.map((rsvp) => (
                  <div key={rsvp.id} className="p-6 hover:bg-white/[0.015] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#FF6B2C] font-bold">
                          {rsvp.id}
                        </span>
                        <span className="text-xs font-semibold text-white">
                          {rsvp.eventTitle}
                        </span>
                      </div>
                      <div className="text-sm font-display font-bold text-white">
                        {rsvp.fullName}
                      </div>
                      <div className="text-xs text-[#B0B7C3] flex items-center gap-3">
                        <span>Email: {rsvp.email}</span>
                        {rsvp.phone && <span>Phone: {rsvp.phone}</span>}
                        {rsvp.notes && <span className="italic">Note: {rsvp.notes}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className="px-3 py-1 rounded bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-bold">
                        {rsvp.attendeesCount} Attendee{rsvp.attendeesCount > 1 ? 's' : ''}
                      </span>
                      <span className="text-[11px] text-[#B0B7C3]/60">
                        {new Date(rsvp.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

        </div>
      </section>

    </div>
  );
};
