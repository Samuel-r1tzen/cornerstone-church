import React, { useState } from 'react';
import { ChurchEvent } from '../types';
import { churchApi } from '../services/api';
import { X, Calendar, MapPin, Clock, Users, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface EventRsvpModalProps {
  event: ChurchEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (eventTitle: string) => void;
}

export const EventRsvpModal: React.FC<EventRsvpModalProps> = ({
  event,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attendeesCount, setAttendeesCount] = useState(1);
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await churchApi.submitEventRSVP(event.id, {
        fullName,
        email,
        phone,
        attendeesCount,
        notes,
      });

      setReferenceId(response.rsvp.id);
      setIsSuccess(true);
      if (onSuccess) onSuccess(event.title);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setReferenceId('');
    setErrorMsg('');
    setFullName('');
    setEmail('');
    setPhone('');
    setAttendeesCount(1);
    setNotes('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-[#0A0F1F] border border-white/15 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2 text-xs font-display tracking-[0.15em] uppercase text-[#FF6B2C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Event Registration</span>
          </div>
          <button
            onClick={handleReset}
            className="p-1 rounded-full text-[#B0B7C3] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FF6B2C]/20 border border-[#FF6B2C]/50 flex items-center justify-center mx-auto text-[#FF6B2C]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                Spot Confirmed!
              </h3>
              <p className="text-sm text-[#B0B7C3] leading-relaxed">
                Thank you, <strong className="text-white">{fullName}</strong>. We've registered <strong className="text-[#FF6B2C]">{attendeesCount} spot{attendeesCount > 1 ? 's' : ''}</strong> for:
              </p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left space-y-1">
                <p className="text-sm font-semibold text-white">{event.title}</p>
                <div className="text-xs text-[#B0B7C3] flex items-center gap-3 pt-1">
                  <span>📅 {event.day} {event.month}</span>
                  <span>⏰ {event.time}</span>
                </div>
                <p className="text-[11px] text-[#FF6B2C] pt-2">
                  Confirmation Code: <span className="font-mono font-bold">{referenceId}</span>
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-sm bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close & View Calendar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event preview badge */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B2C]">
                  {event.category}
                </div>
                <h4 className="text-lg font-bold text-white font-display">
                  {event.title}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#B0B7C3] pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6B2C]" />
                    {event.day} {event.month} · {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6B2C]" />
                    {event.location}
                  </span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form Fields */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B0B7C3] font-semibold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Nkosi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#080B12] border border-white/15 focus:border-[#FF6B2C] rounded py-2 px-3 text-sm text-white placeholder-[#B0B7C3]/40 focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B0B7C3] font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.co.za"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#080B12] border border-white/15 focus:border-[#FF6B2C] rounded py-2 px-3 text-sm text-white placeholder-[#B0B7C3]/40 focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B0B7C3] font-semibold mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+27 82 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#080B12] border border-white/15 focus:border-[#FF6B2C] rounded py-2 px-3 text-sm text-white placeholder-[#B0B7C3]/40 focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B0B7C3] font-semibold mb-1">
                    Number of Attendees
                  </label>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#FF6B2C]" />
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={attendeesCount}
                      onChange={(e) => setAttendeesCount(parseInt(e.target.value, 10) || 1)}
                      className="w-full bg-[#080B12] border border-white/15 focus:border-[#FF6B2C] rounded py-2 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B0B7C3] font-semibold mb-1">
                    Dietary / Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vegetarian, coming with kids"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#080B12] border border-white/15 focus:border-[#FF6B2C] rounded py-2 px-3 text-sm text-white placeholder-[#B0B7C3]/40 focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-sm bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#FF6B2C]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering your spot...' : 'Confirm My Attendance'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
