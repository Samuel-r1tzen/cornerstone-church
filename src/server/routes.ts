import { Router } from 'express';
import type { Request, Response } from 'express';
import { churchDb } from './db.ts';
import type { ChurchInquiry } from './db.ts';
import { FEATURED_SERMON, RECENT_SERMONS, UPCOMING_EVENTS, SERVICE_TIMES, MINISTRIES_DATA } from '../data/churchData.ts';

export const apiRouter = Router();

const ALL_SERMONS = [FEATURED_SERMON, ...RECENT_SERMONS];

// Health Check
apiRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'Cornerstone Church Centurion Backend',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Overall Stats for Pastoral Staff Dashboard
apiRouter.get('/stats', (req: Request, res: Response) => {
  try {
    const stats = churchDb.getStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve stats' });
  }
});

// --- INQUIRIES & PRAYER REQUESTS & VISIT BOOKINGS ---

// GET /api/inquiries
apiRouter.get('/inquiries', (req: Request, res: Response) => {
  try {
    const { type, status, search } = req.query;
    const inquiries = churchDb.getInquiries({
      type: typeof type === 'string' ? type : undefined,
      status: typeof status === 'string' ? status : undefined,
      search: typeof search === 'string' ? search : undefined,
    });
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch inquiries' });
  }
});

// GET /api/inquiries/:id
apiRouter.get('/inquiries/:id', (req: Request, res: Response) => {
  const item = churchDb.getInquiryById(req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, error: 'Inquiry not found' });
  }
  res.json({ success: true, data: item });
});

// POST /api/inquiries (Contact Form / Prayer Request / Plan Visit)
apiRouter.post('/inquiries', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      inquiryType,
      servicePreference,
      visitDate,
      hasChildren,
      childrenCount,
      message,
      isConfidentialPrayer,
    } = req.body;

    // Validation
    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        error: 'Please provide at least your full name and email address.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    const newInquiry = churchDb.createInquiry({
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone || '').trim(),
      inquiryType: (inquiryType as any) || 'general',
      servicePreference: servicePreference ? String(servicePreference) : undefined,
      visitDate: visitDate ? String(visitDate) : undefined,
      hasChildren: Boolean(hasChildren),
      childrenCount: Number(childrenCount) || 0,
      message: String(message || '').trim(),
      isConfidentialPrayer: Boolean(isConfidentialPrayer),
    });

    res.status(201).json({
      success: true,
      message: getInquirySuccessMessage(newInquiry),
      referenceId: newInquiry.id,
      data: newInquiry,
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ success: false, error: 'Server error creating inquiry' });
  }
});

function getInquirySuccessMessage(inquiry: ChurchInquiry): string {
  switch (inquiry.inquiryType) {
    case 'prayer':
      return inquiry.isConfidentialPrayer 
        ? 'Your confidential prayer request has been received with love. Pastor David and our pastoral intercessory team are standing with you in faith.'
        : 'Your prayer request has been received. Our prayer team is lifting you up before God.';
    case 'visit':
      return `Thank you for letting us know! We have reserved your guest parking and welcome packet for the ${inquiry.servicePreference || 'Sunday'} service.`;
    case 'pastor':
      return 'Your pastoral meeting request has been submitted. Our pastoral assistant will contact you within 24 hours to coordinate.';
    case 'ministry':
      return 'Thank you for your interest! A ministry leader will connect with you soon to help you find your circle.';
    default:
      return 'Thank you for reaching out to Cornerstone Church! We have received your message and will respond promptly.';
  }
}

// PATCH /api/inquiries/:id (Update status / pastoral notes)
apiRouter.patch('/inquiries/:id', (req: Request, res: Response) => {
  try {
    const { status, notes } = req.body;
    const updated = churchDb.updateInquiryStatus(req.params.id, status, notes);

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update inquiry' });
  }
});

// DELETE /api/inquiries/:id
apiRouter.delete('/inquiries/:id', (req: Request, res: Response) => {
  try {
    const ok = churchDb.deleteInquiry(req.params.id);
    if (!ok) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete inquiry' });
  }
});

// --- EVENT RSVPS & EVENTS ---

// GET /api/events
apiRouter.get('/events', (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    let events = [...UPCOMING_EVENTS];

    if (category && typeof category === 'string' && category !== 'all') {
      events = events.filter(e => e.category.toLowerCase() === category.toLowerCase());
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      events = events.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.description.toLowerCase().includes(q) || 
        e.location.toLowerCase().includes(q)
      );
    }

    // Attach current RSVP counts
    const enriched = events.map(e => {
      const rsvps = churchDb.getEventRsvps(e.id);
      const totalAttendees = rsvps.reduce((acc, r) => acc + (r.attendeesCount || 1), 0);
      return {
        ...e,
        rsvpCount: totalAttendees,
      };
    });

    res.json({ success: true, count: enriched.length, data: enriched });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch events' });
  }
});

// GET /api/events/rsvps
apiRouter.get('/events/rsvps', (req: Request, res: Response) => {
  try {
    const { eventId } = req.query;
    const rsvps = churchDb.getEventRsvps(typeof eventId === 'string' ? eventId : undefined);
    res.json({ success: true, count: rsvps.length, data: rsvps });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch RSVPs' });
  }
});

// POST /api/events/:id/rsvp
apiRouter.post('/events/:id/rsvp', (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const { fullName, email, phone, attendeesCount, notes } = req.body;

    const event = UPCOMING_EVENTS.find(e => e.id === eventId);
    const eventTitle = event ? event.title : 'Cornerstone Church Gathering';

    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        error: 'Full name and email are required to RSVP.',
      });
    }

    const rsvp = churchDb.createEventRsvp({
      eventId,
      eventTitle,
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      attendeesCount: Math.max(1, Number(attendeesCount) || 1),
      notes: notes ? String(notes).trim() : undefined,
    });

    res.status(201).json({
      success: true,
      message: `Your spot for "${eventTitle}" has been confirmed! We look forward to seeing you.`,
      data: rsvp,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to register RSVP' });
  }
});

// --- SERMONS ---

// GET /api/sermons
apiRouter.get('/sermons', (req: Request, res: Response) => {
  try {
    const { series, speaker, search, tag } = req.query;
    let list = [...ALL_SERMONS];

    if (series && typeof series === 'string' && series !== 'all') {
      list = list.filter(s => s.series.toLowerCase() === series.toLowerCase());
    }

    if (speaker && typeof speaker === 'string' && speaker !== 'all') {
      list = list.filter(s => s.speaker.toLowerCase().includes(speaker.toLowerCase()));
    }

    if (tag && typeof tag === 'string') {
      list = list.filter(s => s.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      list = list.filter(s => 
        s.title.toLowerCase().includes(q) ||
        s.speaker.toLowerCase().includes(q) ||
        s.series.toLowerCase().includes(q) ||
        s.scripture.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch sermons' });
  }
});

// GET /api/sermons/:id
apiRouter.get('/sermons/:id', (req: Request, res: Response) => {
  const sermon = ALL_SERMONS.find(s => s.id === req.params.id);
  if (!sermon) {
    return res.status(404).json({ success: false, error: 'Sermon not found' });
  }
  res.json({ success: true, data: sermon });
});

// --- MINISTRIES & SERVICE TIMES (Read-only reference endpoints) ---
apiRouter.get('/ministries', (req: Request, res: Response) => {
  res.json({ success: true, data: MINISTRIES_DATA });
});

apiRouter.get('/services', (req: Request, res: Response) => {
  res.json({ success: true, data: SERVICE_TIMES });
});

// --- NEWSLETTER ---

// POST /api/newsletter
apiRouter.post('/newsletter', (req: Request, res: Response) => {
  try {
    const { email, source } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.',
      });
    }

    const result = churchDb.subscribeNewsletter(email, source || 'website');
    if (result.isNew) {
      res.status(201).json({
        success: true,
        message: 'Thank you for subscribing to Cornerstone Weekly updates!',
        data: result.subscriber,
      });
    } else {
      res.json({
        success: true,
        message: 'You are already subscribed to Cornerstone Weekly updates! Thank you for staying connected.',
        data: result.subscriber,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to subscribe' });
  }
});

// GET /api/newsletter
apiRouter.get('/newsletter', (req: Request, res: Response) => {
  try {
    const list = churchDb.getNewsletterSubscribers();
    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve subscribers' });
  }
});
