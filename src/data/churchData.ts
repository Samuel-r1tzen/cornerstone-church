import type { MenuItem, ServiceTime, Ministry, Sermon, ChurchEvent, LeadershipMember, FaqItem, TestimonialItem } from '../types.ts';

// ============================================================
// HAMBURGER MENU HIGHLIGHT ITEMS
// Each item has a distinct, high-quality, atmospheric image
// that blends into the deep dark navy background (#0A0F1F).
// ============================================================
export const MENU_HIGHLIGHT_ITEMS: MenuItem[] = [
  {
    id: 'home',
    number: '01',
    label: 'HOME',
    subtitle: 'Where Faith, People & Purpose Meet',
    tag: 'Centurion Campus',
    targetId: 'hero',
    pageId: 'home',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-09855589a6ea?auto=format&fit=crop&w=1000&q=80',
    altText: 'Atmospheric illuminated sanctuary with warm architectural light',
    accentQuote: 'A welcoming space for every generation to encounter God.'
  },
  {
    id: 'visit',
    number: '02',
    label: 'PLAN A VISIT',
    subtitle: 'Everything You Need for Your First Sunday',
    tag: 'First-Time Guests',
    targetId: 'what-to-expect',
    pageId: 'visit',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
    altText: 'Warm welcoming hosts greeting visitors at church entrance',
    accentQuote: 'Reserved guest parking, free barista coffee & guided check-in.'
  },
  {
    id: 'story',
    number: '03',
    label: 'OUR STORY',
    subtitle: 'Rooted in Christ, Serving Centurion',
    tag: 'Who We Are',
    targetId: 'story',
    pageId: 'story',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80',
    altText: 'Close community gathering in fellowship and meaningful conversation',
    accentQuote: 'A multi-generational family following Jesus together since 2014.'
  },
  {
    id: 'ministries',
    number: '04',
    label: 'MINISTRIES',
    subtitle: 'Kids, Youth, Young Adults & Outreach',
    tag: 'Find Your Circle',
    targetId: 'ministries',
    pageId: 'ministries',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
    altText: 'Diverse group of young people laughing and sharing life in community',
    accentQuote: 'Discipleship for every age and season of life.'
  },
  {
    id: 'sermons',
    number: '05',
    label: 'SERMONS',
    subtitle: 'Watch, Listen & Download Study Guides',
    tag: 'Latest Messages',
    targetId: 'sermons',
    pageId: 'sermons',
    imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1000&q=80',
    altText: 'Speaker teaching from scripture on stage with warm amber lights',
    accentQuote: 'Biblical teaching applied straight to everyday life.'
  },
  {
    id: 'events',
    number: '06',
    label: 'EVENTS',
    subtitle: 'Night of Worship, Outreaches & Gatherings',
    tag: 'What’s Happening',
    targetId: 'events',
    pageId: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
    altText: 'Worship night concert with crowd singing and stage illumination',
    accentQuote: 'Moments created for connection, worship, and impact.'
  },
  {
    id: 'contact',
    number: '07',
    label: 'CONTACT & PRAYER',
    subtitle: 'Send a Message, Request Prayer or Visit',
    tag: 'We are Here For You',
    targetId: 'contact',
    pageId: 'contact',
    imageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1000&q=80',
    altText: 'Quiet hands folded in prayer with warm morning window light',
    accentQuote: 'Confidential prayer team and fast pastoral response.'
  }
];

// ============================================================
// SERVICE TIMES
// ============================================================
export const SERVICE_TIMES: ServiceTime[] = [
  {
    time: '09:00 AM',
    name: 'Classic & Family Service',
    description: 'Blended modern worship and classic hymns, full Cornerstone Kids ministry (Nursery – Gr 7), vibrant family energy.',
    features: ['Cornerstone Kids Church', 'Parent & Baby Lounge', 'Sign Language Interpreter', 'Lobby Barista Open at 08:15'],
    isPopular: true
  },
  {
    time: '11:00 AM',
    name: 'Contemporary & Young Adults',
    description: 'Energetic modern praise, high-impact expository preaching, strong university and young professional community.',
    features: ['Cornerstone Kids Church', 'Coffee & Croissant Bar', 'After-Service Social Hangout', 'Prayer Ministry Available']
  },
  {
    time: '17:30 PM',
    name: 'Evening Acoustic & Encounter',
    description: 'Intimate candlelit acoustic worship, extended prayer, open communion, and contemplative preaching.',
    features: ['Extended Acoustic Worship', 'Communion Every Week', 'High School & Campus Focus', 'Casual Atmosphere']
  }
];

// ============================================================
// WHAT TO EXPECT GUIDELINES
// ============================================================
export const VISITOR_GUIDELINES = [
  {
    step: '01',
    title: 'Easy Parking & Warm Welcome',
    description: 'Follow the friendly parking team right to our reserved First-Time Guest parking bays near the main entrance.',
    badge: 'Hassle-Free'
  },
  {
    step: '02',
    title: 'Secure Cornerstone Kids Check-In',
    description: 'Safe, age-tailored environments for infants through Grade 7 with secure digital name tags and police-cleared volunteers.',
    badge: 'Safe & Fun'
  },
  {
    step: '03',
    title: 'Complimentary Barista Coffee',
    description: 'Stop by our Connection Lounge before or after service for fresh artisan espresso, rooibos tea, and baked treats on us.',
    badge: 'On the House'
  },
  {
    step: '04',
    title: '75 Minutes of Joy & Truth',
    description: 'A service featuring 25 minutes of uplifting modern worship followed by 35 minutes of practical, Christ-centred scripture.',
    badge: 'Inspiring'
  },
  {
    step: '05',
    title: 'No Pressure, Come As You Are',
    description: 'From jeans and sneakers to Sunday best, wear whatever makes you comfortable. You will never be singled out or put on the spot.',
    badge: 'Zero Judgment'
  }
];

// ============================================================
// MINISTRIES DATA
// ============================================================
export const MINISTRIES_DATA: Ministry[] = [
  {
    id: 'kids',
    title: 'Cornerstone Kids',
    category: 'Children (0–12 Yrs)',
    description: 'A fun, high-energy, Bible-centred space where children discover the love of Jesus through songs, interactive storytelling, and games.',
    lead: 'Pastor Kelebogile Sithole',
    meetingTime: 'Sundays at 09:00 & 11:00 AM',
    imageUrl: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80',
    highlights: ['Secure check-in badges', 'Age-graded learning rooms', 'Sensory quiet room for infants']
  },
  {
    id: 'youth',
    title: 'Ignite Youth',
    category: 'Teens (Grades 8–12)',
    description: 'Equipping teenagers to stand bold in their faith, tackle real-world pressures, build deep friendships, and make a tangible difference.',
    lead: 'Thabo Ndlovu',
    meetingTime: 'Friday Nights 18:30 – 21:00',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    highlights: ['Live youth band', 'Camp retreats & bonfire nights', 'High school campus outreach']
  },
  {
    id: 'young-adults',
    title: 'Young Adults & Uni',
    category: 'Ages 18–30',
    description: 'A flourishing community of university students, creatives, and young professionals navigating careers, relationships, and faith.',
    lead: 'Michael & Thandi Khumalo',
    meetingTime: 'Tuesdays 19:00 in Life Groups',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    highlights: ['Bi-weekly worship & talk series', 'Mentorship with senior leaders', 'City social events']
  },
  {
    id: 'worship',
    title: 'Cornerstone Worship',
    category: 'Music & Creative Arts',
    description: 'Worship leaders, musicians, audio engineers, and visual artists dedicated to ushering the congregation into God’s presence.',
    lead: 'Pastor John Dlamini',
    meetingTime: 'Thursday Rehearsals 19:00',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    highlights: ['Original music writing', 'Production & live streaming', 'Musician training academy']
  },
  {
    id: 'outreach',
    title: 'City Hope Outreach',
    category: 'Community Compassion',
    description: 'Taking the church beyond the four walls: weekly food distribution to 300+ families, school tutoring, and community clinics.',
    lead: 'Linda van Wyk',
    meetingTime: 'Saturdays 09:00 Outreach Blitz',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    highlights: ['Mobile soup kitchen', 'School stationery bursaries', 'Winter blanket & coat drives']
  },
  {
    id: 'prayer',
    title: 'Intercessory Prayer',
    category: 'Prayer & Pastoral Care',
    description: 'Standing in faith for healing, restoration, family breakthroughs, and revival across South Africa and the nations.',
    lead: 'Pastor David & Prayer Team',
    meetingTime: 'Wednesdays 06:00 AM & Sundays 08:15 AM',
    imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
    highlights: ['24/7 confidential prayer chain', 'Hospital & home visitations', 'Sunday post-service prayer']
  }
];

// ============================================================
// SERMONS
// ============================================================
export const FEATURED_SERMON: Sermon = {
  id: 'featured-surrender',
  title: 'The Peace of Total Surrender',
  series: 'Unshakable Faith',
  speaker: 'Pastor David Mokoena',
  speakerRole: 'Lead Pastor',
  date: 'September 13, 2026',
  scripture: 'Philippians 4:6–7 & Proverbs 3:5–6',
  duration: '38 min',
  imageUrl: '/assets/images/sermon_surrender_1790258194984.jpg',
  summary: 'When life feels overwhelming, God does not call us to carry tomorrow alone. Discover how relinquishing control unlocks supernatural peace that transcends understanding.',
  tags: ['Peace', 'Trust', 'Surrender', 'Spiritual Warfare'],
  featured: true
};

export const RECENT_SERMONS: Sermon[] = [
  {
    id: 'sermon-mountains',
    title: 'Faith That Moves Mountains',
    series: 'Unshakable Faith',
    speaker: 'Pastor Sarah Mokoena',
    speakerRole: 'Co-Lead Pastor',
    date: 'September 6, 2026',
    scripture: 'Mark 11:22–24',
    duration: '34 min',
    imageUrl: '', // No external image: gracefully falls back to custom Mountain Artwork
    summary: 'Moving beyond safe theological formulas into daring kingdom trust when facing impossible obstacles.',
    tags: ['Faith', 'Miracles', 'Boldness']
  },
  {
    id: 'sermon-purpose',
    title: 'Living With Divine Purpose',
    series: 'Created For More',
    speaker: 'Pastor John Dlamini',
    speakerRole: 'Worship Pastor',
    date: 'August 30, 2026',
    scripture: 'Ephesians 2:10',
    duration: '31 min',
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=600&q=80',
    summary: 'How everyday work, neighborhood relationships, and personal passions align with God’s great commission.',
    tags: ['Calling', 'Vocation', 'Kingdom']
  },
  {
    id: 'sermon-grace',
    title: 'The Scandal of Extravagant Grace',
    series: 'Prodigal Heart',
    speaker: 'Pastor David Mokoena',
    speakerRole: 'Lead Pastor',
    date: 'August 23, 2026',
    scripture: 'Luke 15:11–32',
    duration: '42 min',
    imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=600&q=80',
    summary: 'Understanding the relentless pursuit of the Father toward both the wandering rebel and the self-righteous son.',
    tags: ['Grace', 'Forgiveness', 'Identity']
  }
];

// ============================================================
// UPCOMING EVENTS
// ============================================================
export const UPCOMING_EVENTS: ChurchEvent[] = [
  {
    id: 'event-worship-night',
    day: '25',
    month: 'SEP',
    fullDate: 'Friday, 25 September 2026',
    time: '19:00 – 21:30',
    title: 'Night of Worship & Prayer',
    location: 'Main Sanctuary · Centurion Campus',
    category: 'Worship Encounter',
    description: 'An unhurried evening of acoustic and full-band worship, prophetic prayer, and communion. Childcare provided for ages 1–6.',
    badges: ['Free Admission', 'All Welcome', 'Childcare Available'],
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'event-outreach',
    day: '03',
    month: 'OCT',
    fullDate: 'Saturday, 3 October 2026',
    time: '08:30 – 12:30',
    title: 'City Hope Community Food & Blessing Drive',
    location: 'Centurion Central Park & Lyttelton',
    category: 'Community Service',
    description: 'Serving 400 food hampers, mobile health checkups, children’s sports day, and offering prayer to local families in need.',
    badges: ['Volunteers Needed', 'Family Friendly', 'Community Impact'],
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'event-baptism',
    day: '18',
    month: 'OCT',
    fullDate: 'Sunday, 18 October 2026',
    time: 'During 09:00 & 11:00 Services',
    title: 'Water Baptism Celebration Sunday',
    location: 'Main Auditorium Courtyard',
    category: 'Celebration',
    description: 'Publicly declaring your faith in Jesus Christ through water baptism. Attend our 30-min preparation class on Wednesday prior.',
    badges: ['Sign Up Online', 'Celebration Service', 'Bring Family'],
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'event-youth-camp',
    day: '06',
    month: 'NOV',
    fullDate: '6–8 November 2026',
    time: 'Weekend Retreat',
    title: 'Ignite Youth Annual Mountain Retreat',
    location: 'Magaliesberg Mountain Camp',
    category: 'Youth Retreat',
    description: 'Three unforgettable days of outdoor adventures, campfire worship, inspiring breakout sessions, and life-changing friendships.',
    badges: ['Grades 8–12', 'Registration Open', 'Bursaries Available'],
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
  }
];

// ============================================================
// LEADERSHIP TEAM
// ============================================================
export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    id: 'pastor-david-sarah',
    name: 'David & Sarah Mokoena',
    role: 'Lead Pastors',
    bio: 'David and Sarah planted Cornerstone in 2014 with a vision to see Centurion transformed by the gospel. They are passionate about biblical literacy, authentic discipleship, and building healthy families.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    quote: '"Church is not an event you attend; it is a spiritual family you belong to."'
  },
  {
    id: 'pastor-john',
    name: 'John Dlamini',
    role: 'Worship & Creative Pastor',
    bio: 'John oversees musical worship, production, and digital media. A songwriter and mentor, he is passionate about mentoring the next generation of creative artists for God’s kingdom.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    quote: '"True worship is living with open hands and an undivided heart."'
  },
  {
    id: 'pastor-kele',
    name: 'Kelebogile Sithole',
    role: 'Cornerstone Kids & Youth Director',
    bio: 'Kelebogile holds a degree in Child Development and has served in youth leadership for over 9 years. She leads our safe, energetic children’s environments every Sunday.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    quote: '"When we invest in children today, we secure the heartbeat of tomorrow’s church."'
  }
];

// ============================================================
// FAQS
// ============================================================
export const CHURCH_FAQS: FaqItem[] = [
  {
    question: 'What should I wear to Sunday services?',
    answer: 'Come in whatever you feel comfortable in! You will see people in jeans, sneakers, casual wear, and some in traditional Sunday attire. We care about you, not what you wear.',
    category: 'First Visit'
  },
  {
    question: 'What time should I arrive and where do I park?',
    answer: 'We recommend arriving 15 minutes before the service (08:45 AM or 10:45 AM). Our friendly parking team will guide you straight to dedicated First-Time Guest parking bays in front of the main foyer, where warm barista coffee is waiting.',
    category: 'Services'
  },
  {
    question: 'How long do services last, and what is the gathering like?',
    answer: 'Services run for approximately 75 minutes. We start with 20–25 minutes of passionate, Christ-centred worship led by our team, followed by relevant community announcements, a 30-minute gospel-anchored message, and personal prayer for anyone in need.',
    category: 'Services'
  },
  {
    question: 'What is Cornerstone Kids like and how safe is check-in?',
    answer: 'Cornerstone Kids runs during both 09:00 AM and 11:00 AM gatherings for infants (6 months) through Grade 7. Every volunteer is thoroughly background-checked and child-safety trained. You receive matching digital security claim tags required for check-in and pickup.',
    category: 'Kids & Family'
  },
  {
    question: 'What programs do you have for teenagers (High School & Middle School)?',
    answer: 'Ignite Youth meets every Friday evening from 18:30 to 20:45 in our Youth Auditorium for food, games, live youth-led praise, and small-group discussions. We also host annual mountain camps, leader retreats, and Friday night socials.',
    category: 'Kids & Family'
  },
  {
    question: 'What ministries are active and how can I get plugged in?',
    answer: 'We have thriving communities for every life stage: Children, Youth, Young Adults & Campus, Cornerstone Worship & Creative Arts, Intercessory Prayer, and City Hope Outreach. You can explore ministry details on our dedicated Ministries page or connect with a team leader this Sunday.',
    category: 'Ministries'
  },
  {
    question: 'How do Life Groups work and when do they meet?',
    answer: 'Life Groups are intentional small gatherings of 8 to 14 people that meet weekly in homes across Centurion and on campus (Tuesday to Thursday evenings). They are places to share meals, unpack the Sunday sermon, pray together, and build genuine lifelong friendships.',
    category: 'Connect'
  },
  {
    question: 'How can I start volunteering or serve on a ministry team?',
    answer: 'Whether you love music, tech & cameras, greeting guests with a smile, brewing coffee, teaching children, or packing community food parcels, there is a place for you! Simply fill out our Connect form or stop by the Connect Lounge on Sunday.',
    category: 'Ministries'
  },
  {
    question: 'Are visitors expected to give money or tithe?',
    answer: 'Never. Giving is strictly an act of biblical worship for regular members who call Cornerstone their spiritual home. As our guest, you are warmly invited to receive, worship, and experience God’s love without any financial pressure.',
    category: 'Giving'
  },
  {
    question: 'Can I speak with a pastor or request confidential prayer?',
    answer: 'Absolutely. Pastors and prayer partners are available at the front of the stage after every Sunday gathering. You can also submit confidential prayer requests anytime via our Contact form, and our 24/7 prayer chain will lift you up in faith.',
    category: 'Connect'
  }
];

// ============================================================
// TESTIMONIALS (LIVES CHANGED)
// ============================================================
export const CHURCH_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'thandi',
    name: 'Thandi M.',
    roleOrMinistry: 'Young Adults & Worship Team',
    storyTitle: 'From Loneliness to Family',
    quote: 'I moved to Centurion for work not knowing a single person. Walking into Cornerstone on Sunday was the best decision I ever made. I found mentors, genuine friends, and a space where I could discover my purpose.',
    fullStory: 'In university, I felt overwhelmed and disconnected from church. At Cornerstone, people took time to know my name before asking for my involvement. Today, playing keyboard in worship has reconnected my passion to God’s calling.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    yearsAtChurch: 'Member since 2021',
    tag: 'Young Adults'
  },
  {
    id: 'khumalo-family',
    name: 'Mark & Lerato Khumalo',
    roleOrMinistry: 'Cornerstone Kids Parents & Life Group Hosts',
    storyTitle: 'A Haven For Our Children & Marriage',
    quote: 'With two energetic young boys, we were terrified of disruptive Sunday mornings. The kids team welcomed our sons with open arms and immense love. Our marriage was also strengthened through our weekly Life Group.',
    fullStory: 'Our boys literally jump out of bed excited for Kids Church on Sunday. Having authentic friends in our Life Group who pray with us through parenting challenges and career shifts has been an anchor for our home.',
    image: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=400',
    yearsAtChurch: 'Members since 2019',
    tag: 'Family & Kids'
  },
  {
    id: 'johan-petro',
    name: 'Johan & Petro Van Der Merwe',
    roleOrMinistry: 'City Hope Outreach Volunteers',
    storyTitle: 'Rediscovering Purpose in Retirement',
    quote: 'After retiring, we wondered what God had next. Joining the City Hope Food Drive showed us the heartbeat of Jesus for Centurion. Serving meals and praying with families has brought deeper joy than we ever imagined.',
    fullStory: 'Retirement can feel surprisingly empty if you do not have a kingdom mission. Serving at the monthly outreach blitzes in Lyttelton has energized us. We have seen people healed, fed, and brought into God’s family right in our city.',
    image: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=400',
    yearsAtChurch: 'Members since 2016',
    tag: 'Outreach & Purpose'
  },
  {
    id: 'sipho',
    name: 'Sipho Ndlovu',
    roleOrMinistry: 'Ignite Youth Leader',
    storyTitle: 'Finding Identity & Christ in High School',
    quote: 'High school can be brutal when you are trying to fit in. Ignite Youth gave me leaders who listened, answered hard faith questions, and challenged me to lead with courage instead of compromising.',
    fullStory: 'Attending the annual Mountain Retreat in Magaliesberg completely changed my life. For the first time, God was not just my parents’ religion—He was my Savior. Now I get to mentor younger Grade 8 boys coming up.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    yearsAtChurch: 'Joined in 2023',
    tag: 'Youth & Students'
  },
  {
    id: 'michelle',
    name: 'Dr. Michelle Govender',
    roleOrMinistry: 'Intercessory Prayer Team',
    storyTitle: 'Peace in the Midst of Severe Burnout',
    quote: 'Working in emergency healthcare pushed me to physical and emotional exhaustion. The prayer team prayed over me without judgment. In this community, I rediscovered Sabbath rest and the healing peace of God.',
    fullStory: 'Hospital shifts take a toll on your spiritual vitality. Every Wednesday morning prayer and Sunday service filled my cup back up. I now help lead the confidential prayer chain to support others walking through intense trials.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    yearsAtChurch: 'Member since 2022',
    tag: 'Healing & Faith'
  }
];

