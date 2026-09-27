export type PageId = 'home' | 'visit' | 'story' | 'ministries' | 'sermons' | 'events' | 'contact' | 'admin';

export interface CursorOrigin {
  x: number;
  y: number;
}

export interface MenuItem {
  id: string;
  number: string;
  label: string;
  subtitle: string;
  tag: string;
  targetId: string;
  pageId: PageId;
  // Distinct image for each highlight item that blends into the navy background
  imageUrl: string;
  altText: string;
  accentQuote?: string;
}

export interface ServiceTime {
  time: string;
  name: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Ministry {
  id: string;
  title: string;
  category: string;
  description: string;
  lead: string;
  meetingTime: string;
  imageUrl: string;
  highlights: string[];
}

export interface Sermon {
  id: string;
  title: string;
  series: string;
  speaker: string;
  speakerRole: string;
  date: string;
  scripture: string;
  duration: string;
  imageUrl: string;
  videoUrl?: string;
  audioUrl?: string;
  summary: string;
  tags: string[];
  featured?: boolean;
}

export interface ChurchEvent {
  id: string;
  day: string;
  month: string;
  fullDate: string;
  time: string;
  title: string;
  location: string;
  category: string;
  description: string;
  badges: string[];
  imageUrl?: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'First Visit' | 'Kids & Family' | 'Services' | 'Ministries' | 'Giving' | 'Connect';
}

export interface TestimonialItem {
  id: string;
  name: string;
  roleOrMinistry: string;
  storyTitle: string;
  quote: string;
  fullStory?: string;
  image: string;
  yearsAtChurch: string;
  tag: string;
}

export type InquiryType = 'visit' | 'prayer' | 'ministry' | 'pastor' | 'general';

export interface ContactFormData {
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
}
