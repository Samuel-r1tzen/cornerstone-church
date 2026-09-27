import React, { useState } from 'react';
import { ContactFormData, InquiryType } from '../types';
import { churchApi } from '../services/api';
import { PencilHeading } from './PencilHeading';
import { 
  Send, 
  CheckCircle, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  HeartHandshake, 
  Calendar, 
  Users, 
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SocialMediaRow } from './SocialIcons';

interface ContactSectionProps {
  initialInquiryType?: InquiryType;
  initialMessage?: string;
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialInquiryType = 'visit',
  initialMessage = '',
  initialService = '09:00 AM'
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: initialInquiryType,
    servicePreference: initialService,
    visitDate: '',
    hasChildren: false,
    childrenCount: 0,
    message: initialMessage,
    isConfidentialPrayer: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [referenceCode, setReferenceCode] = useState<string>('');
  const [responseMsg, setResponseMsg] = useState<string>('');
  const [activeTab, setActiveTab] = useState<InquiryType>(initialInquiryType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await churchApi.createInquiry(formData);
      setReferenceCode(result.referenceId);
      setResponseMsg(result.message);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Contact submit error:', err);
      setSubmitError(err.message || 'Could not connect to church backend. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabChange = (type: InquiryType) => {
    setActiveTab(type);
    setFormData(prev => ({ ...prev, inquiryType: type }));
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#070B16] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C] mb-3">
              <span className="w-6 h-px bg-[#FF6B2C]" />
              We Are Here For You
            </div>
            <PencilHeading text="CONNECT & CONTACT" dataPencil="contact" maxWidth="740px" />
          </div>
          <p className="text-sm sm:text-base text-[#B0B7C3] max-w-md">
            Whether you are planning your first Sunday, asking for confidential prayer, or reaching out to a pastor, our team responds promptly within 24 hours.
          </p>
        </div>

        {/* 2-Column Grid: Left Contact Info / Right Responsive Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Campus Info & Visiting Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-[#0A0F1F] p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-xl">
              <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FF6B2C]" />
                Centurion Campus
              </h3>

              <div className="space-y-4 text-sm text-[#B0B7C3]">
                <div>
                  <span className="text-xs uppercase tracking-wider text-white font-semibold block mb-0.5">
                    Physical Address
                  </span>
                  <p>123 Church Street, Lyttelton Manor</p>
                  <p>Centurion, 0157, Gauteng, South Africa</p>
                  <p className="text-xs text-[#FF6B2C] mt-1">
                    (Directly off Botha Avenue / N1 John Vorster exit)
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="text-xs uppercase tracking-wider text-white font-semibold block mb-0.5">
                    Sunday Gathering Times
                  </span>
                  <p>09:00 AM — Classic & Cornerstone Kids</p>
                  <p>11:00 AM — Modern Praise & Young Adults</p>
                  <p>17:30 PM — Acoustic Encounter & Communion</p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#FF6B2C]" />
                    <span className="text-white">+27 12 345 6789</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#FF6B2C]" />
                    <span className="text-white">hello@cornerstonechurch.co.za</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#FF6B2C]" />
                    <span>Church Office: Tue – Fri 08:30 – 16:30</span>
                  </div>
                </div>
              </div>

              {/* Direct Map Direction Link */}
              <a
                href="https://maps.google.com/?q=Centurion+South+Africa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-sm bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors block text-center"
              >
                <span>Open in Google Maps / Waze</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF6B2C]" />
              </a>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <span className="text-[10px] font-display uppercase tracking-widest text-[#FF6B2C] block font-semibold">
                  Official Church Social Channels
                </span>
                <SocialMediaRow variant="badges" showLabels={true} iconClassName="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Quick Prayer Commitment Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0F1424] to-[#0A0F1F] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6B2C] font-semibold">
                <HeartHandshake className="w-4 h-4" />
                Prayer Support 24/7
              </div>
              <h4 className="font-display font-bold text-lg text-white">
                Need Prayer Today?
              </h4>
              <p className="text-xs text-[#B0B7C3] leading-relaxed">
                Our pastors and intercessory prayer team meet weekly to pray over every request submitted. You may mark your request as strictly confidential.
              </p>
            </div>

          </div>

          {/* Right Column: Full Featured Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0A0F1F] p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl">
            
            {submitted ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#FF6B2C]/20 border border-[#FF6B2C]/40 flex items-center justify-center mx-auto text-[#FF6B2C]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Thank You, {formData.fullName || 'Friend'}!
                </h3>
                <p className="text-sm text-[#B0B7C3] max-w-md mx-auto leading-relaxed">
                  {responseMsg || (
                    formData.inquiryType === 'visit'
                      ? "We are so excited to welcome you this Sunday! A host team member has been notified and will have your reserved parking and welcome bag ready."
                      : formData.inquiryType === 'prayer'
                      ? "Your prayer request has been received by our pastoral prayer team. We stand in faith with you."
                      : "Your message has been sent to our church office. A team member will get back to you within 24 hours."
                  )}
                </p>

                {referenceCode && (
                  <div className="inline-block bg-[#080B12] border border-[#FF6B2C]/30 px-4 py-2 rounded-lg text-xs">
                    <span className="text-[#B0B7C3]">Reference Code: </span>
                    <span className="font-mono font-bold text-[#FF6B2C]">{referenceCode}</span>
                  </div>
                )}

                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setReferenceCode('');
                      setResponseMsg('');
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        inquiryType: 'visit',
                        servicePreference: '09:00 AM',
                        visitDate: '',
                        hasChildren: false,
                        childrenCount: 0,
                        message: '',
                        isConfidentialPrayer: false,
                      });
                    }}
                    className="px-6 py-2.5 rounded-sm bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{submitError}</span>
                  </div>
                )}
                
                {/* Inquiry Type Tabs */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B0B7C3] font-semibold mb-2">
                    How Can We Best Help You?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'visit' as InquiryType, label: 'Plan A Visit' },
                      { id: 'prayer' as InquiryType, label: 'Prayer Request' },
                      { id: 'ministry' as InquiryType, label: 'Join Ministry' },
                      { id: 'general' as InquiryType, label: 'General Question' },
                    ].map((tab) => (
                      <button
                        type="button"
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`py-2 px-3 text-xs font-semibold rounded-sm transition-all border ${
                          activeTab === tab.id
                            ? 'bg-[#FF6B2C] text-[#080B12] border-[#FF6B2C] shadow-md shadow-[#FF6B2C]/20'
                            : 'bg-white/5 text-[#B0B7C3] border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#B0B7C3] font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sipho Sithole"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#080B12] border border-white/15 focus:border-[#FF6B2C] rounded-sm py-2.5 px-3 text-sm text-white placeholder-[#B0B7C3]/50 focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#B0B7C3] font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sipho@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#080B12] border border-white/15 focus:border-[#FF6B2C] rounded-sm py-2.5 px-3 text-sm text-white placeholder-[#B0B7C3]/50 focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                    />
                  </div>
                </div>

                {/* Phone & Service Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#B0B7C3] font-semibold mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +27 82 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#080B12] border border-white/15 focus:border-[#FF6B2C] rounded-sm py-2.5 px-3 text-sm text-white placeholder-[#B0B7C3]/50 focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                    />
                  </div>

                  {activeTab === 'visit' ? (
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#B0B7C3] font-semibold mb-1">
                        Preferred Sunday Service
                      </label>
                      <select
                        value={formData.servicePreference}
                        onChange={(e) => setFormData({ ...formData, servicePreference: e.target.value })}
                        className="w-full bg-[#080B12] border border-white/15 focus:border-[#FF6B2C] rounded-sm py-2.5 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                      >
                        <option value="09:00 AM">09:00 AM — Family & Classic</option>
                        <option value="11:00 AM">11:00 AM — Contemporary Praise</option>
                        <option value="17:30 PM">17:30 PM — Acoustic Encounter</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#B0B7C3] font-semibold mb-1">
                        Subject / Focus
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Health, Family, Serving"
                        className="w-full bg-[#080B12] border border-white/15 focus:border-[#FF6B2C] rounded-sm py-2.5 px-3 text-sm text-white placeholder-[#B0B7C3]/50 focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                      />
                    </div>
                  )}
                </div>

                {/* Additional checkboxes for Visit or Prayer */}
                {activeTab === 'visit' && (
                  <div className="bg-white/[0.02] p-4 rounded-lg border border-white/5 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasChildren}
                        onChange={(e) => setFormData({ ...formData, hasChildren: e.target.checked })}
                        className="w-4 h-4 text-[#FF6B2C] rounded focus:ring-0 bg-[#080B12] border-white/20"
                      />
                      <span className="text-xs text-[#F5F2EE]">
                        I am bringing children (We will prepare safe check-in tags)
                      </span>
                    </label>

                    {formData.hasChildren && (
                      <div className="pl-7">
                        <label className="block text-[11px] text-[#B0B7C3] mb-1">
                          Ages / Grades of Children:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 4 years old and Grade 3"
                          className="w-full bg-[#080B12] border border-white/15 rounded py-1.5 px-3 text-xs text-white"
                        />
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'prayer' && (
                  <label className="flex items-center gap-3 cursor-pointer bg-white/[0.02] p-3 rounded border border-white/5">
                    <input
                      type="checkbox"
                      checked={formData.isConfidentialPrayer}
                      onChange={(e) => setFormData({ ...formData, isConfidentialPrayer: e.target.checked })}
                      className="w-4 h-4 text-[#FF6B2C] rounded focus:ring-0 bg-[#080B12] border-white/20"
                    />
                    <span className="text-xs text-[#F5F2EE] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#FF6B2C]" />
                      Keep this request strictly confidential (Pastoral team only)
                    </span>
                  </label>
                )}

                {/* Message Field */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B0B7C3] font-semibold mb-1">
                    {activeTab === 'prayer' ? 'Your Prayer Request' : 'Your Message / Questions'} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={
                      activeTab === 'prayer' 
                        ? 'Share what is on your heart. We are committed to praying for you...'
                        : 'Let us know anything that will help us serve you better...'
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#080B12] border border-white/15 focus:border-[#FF6B2C] rounded-sm py-2.5 px-3 text-sm text-white placeholder-[#B0B7C3]/50 focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-sm bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#FF6B2C]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending your details...</span>
                  ) : (
                    <>
                      <span>
                        {activeTab === 'visit' 
                          ? 'Confirm My Sunday Visit' 
                          : activeTab === 'prayer' 
                          ? 'Submit Prayer Request' 
                          : 'Send Message'}
                      </span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-[#B0B7C3]/70">
                  Your privacy is sacred to us. We never sell or spam your contact information.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
