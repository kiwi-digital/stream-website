export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  subtitle: string;
  features: ServiceFeature[];
  popularFor: string[];
  howItWorks: [string, string, string];
  faqs: FaqItem[];
  accentColor: string;
  imageUrl: string;
  pricing: { label: string; from: string; note: string };
}

export const services: Service[] = [
  {
    slug: "live-streaming",
    title: "Live Streaming",
    shortTitle: "Live Streaming",
    icon: "Video",
    description: "Capture your event live and share it with anyone, anywhere in the world.",
    subtitle: "Share your most important moments with family, friends, and colleagues — no matter where they are.",
    features: [
      { icon: "MonitorPlay", title: "Multi-Camera Streaming", description: "Professional PTZ HD cameras capture every angle, switched live for a broadcast-quality stream." },
      { icon: "Globe", title: "Custom Branded Viewer Page", description: "A personalised, password-protected webpage with your branding, message, and comment section for viewers." },
      { icon: "PlayCircle", title: "On-Demand Replay", description: "Your stream is hosted online after the event so anyone can catch up at their convenience." },
      { icon: "Lock", title: "Secure & Private", description: "Password-protected streams ensure only invited viewers can access your event." },
    ],
    popularFor: ["Funerals", "Weddings", "Church Services", "School Events"],
    howItWorks: ["Tell us about your event", "We set up and test everything", "You go live — we handle the rest"],
    faqs: [
      { question: "How far in advance do I need to book?", answer: "We recommend booking at least 2 weeks ahead. For funerals and urgent events, we do our best to accommodate short notice — contact us and we'll see what we can do." },
      { question: "Can remote viewers interact during the stream?", answer: "Yes. Our custom viewer pages include a comment section so remote viewers can share messages and condolences in real time." },
      { question: "What happens if the internet drops during the event?", answer: "We always have backup connectivity options and record locally as a failsafe. If the stream is interrupted, the recording ensures nothing is lost." },
      { question: "Can I watch the stream after the event?", answer: "Absolutely. We host your video online after the event so anyone can catch up, even if they missed the live broadcast." },
    ],
    accentColor: "#0EA5E9",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    pricing: { label: "Live Streaming", from: "$450", note: "Includes setup, single camera, and 2-hour stream. Multi-camera and longer events quoted on request." },
  },
  {
    slug: "video-recording",
    title: "Video Recording",
    shortTitle: "Video Recording",
    icon: "Camera",
    description: "Keep lasting memories of your event with professional multi-camera recording.",
    subtitle: "Professional video recording that captures every detail of your event, delivered on USB or hosted online.",
    features: [
      { icon: "Camera", title: "Multi-Camera Coverage", description: "Multiple HD cameras ensure every moment is captured from the best angles." },
      { icon: "Usb", title: "USB Delivery", description: "Receive your recording on a USB stick, ready to play on any computer or smart TV." },
      { icon: "Cloud", title: "Online Hosting", description: "Optionally host your video online for easy sharing with family and friends." },
      { icon: "Scissors", title: "Professional Quality", description: "Years of experience means we capture every detail professionally, so you can relive the event for years to come." },
    ],
    popularFor: ["Weddings", "Funerals", "Conferences", "School Events"],
    howItWorks: ["Tell us about your event", "We record with professional cameras", "Receive your video on USB or online"],
    faqs: [
      { question: "What format is the video delivered in?", answer: "Videos are delivered in MP4 format on a USB stick, playable on any computer, smart TV, or media player." },
      { question: "Can I also get a live stream with the recording?", answer: "Yes — we often bundle live streaming and recording together. Contact us for a combined quote." },
      { question: "How long does it take to receive the recording?", answer: "You'll receive your USB at the end of the event or within a few business days, depending on the package." },
    ],
    accentColor: "#6366F1",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
    pricing: { label: "Video Recording", from: "$350", note: "Includes setup, recording, and delivery on USB. Additional cameras and editing available." },
  },
  {
    slug: "sound-pa",
    title: "Sound & PA",
    shortTitle: "Sound & PA",
    icon: "Speaker",
    description: "Professional PA systems to ensure your event is heard clearly by everyone.",
    subtitle: "Crystal-clear sound for events of any size — from intimate ceremonies to large venues.",
    features: [
      { icon: "Mic", title: "Wireless Microphones", description: "Lapel, handheld, and podium microphones for clear audio in any setting." },
      { icon: "Speaker", title: "PA System Setup", description: "Professional speakers and amplifiers sized to your venue for even, clear coverage." },
      { icon: "Music", title: "Music Playback", description: "Play background music, entrance songs, or audio tracks through our system with easy control." },
      { icon: "Headphones", title: "Audio Mixing", description: "On-site audio mixing ensures the right balance between speakers, music, and ambient sound." },
    ],
    popularFor: ["Weddings", "Church Services", "School Events", "Conferences"],
    howItWorks: ["Tell us about your venue and event", "We design the right sound setup", "We set up, test, and operate on the day"],
    faqs: [
      { question: "Can you provide sound for outdoor events?", answer: "Yes. We have portable PA systems suitable for outdoor ceremonies, sports days, and community events." },
      { question: "Do you supply microphones?", answer: "Yes — we provide wireless lapel mics, handheld mics, and podium mics as part of the sound package." },
      { question: "Can I play my own music through the system?", answer: "Absolutely. Connect via Bluetooth, USB, or aux cable — whatever works best for you." },
    ],
    accentColor: "#14B8A6",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80",
    pricing: { label: "Sound & PA", from: "$250", note: "Includes PA system, wireless mic, and setup. Larger venues and additional mics quoted on request." },
  },
  {
    slug: "projector-screen-hire",
    title: "Projector & Screen Hire",
    shortTitle: "Projector & Screens",
    icon: "Monitor",
    description: "High-quality projectors and screens for presentations, slideshows, and live video feeds.",
    subtitle: "Make your visuals shine with professional projection equipment for any venue.",
    features: [
      { icon: "Projector", title: "HD Projectors", description: "Bright, high-resolution projectors that deliver sharp visuals even in well-lit venues." },
      { icon: "RectangleHorizontal", title: "Screens of All Sizes", description: "From portable screens for small rooms to large format screens for conference halls." },
      { icon: "MonitorPlay", title: "Live Video Feeds", description: "Display real-time camera feeds on big screens so everyone in the venue gets an up-close view." },
      { icon: "Settings", title: "Full Setup & Operation", description: "We deliver, set up, test, and operate the equipment — you just focus on your event." },
    ],
    popularFor: ["Conferences", "Church Services", "Funerals", "School Events"],
    howItWorks: ["Tell us your venue and what you need to display", "We recommend the right equipment", "We deliver, set up, and operate on the day"],
    faqs: [
      { question: "Can I connect my own laptop to the projector?", answer: "Yes. We support HDMI, USB-C, and wireless connections for laptops and other devices." },
      { question: "What size screens do you have?", answer: "We carry screens from 6ft portable to large format. We'll recommend the right size based on your venue and audience." },
      { question: "Can you display a live camera feed on the screen?", answer: "Yes — this is one of our most popular setups. We can show a live camera feed on one or multiple screens around the venue." },
    ],
    accentColor: "#22D3EE",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80",
    pricing: { label: "Projector & Screens", from: "$200", note: "Includes projector, screen, and setup. Multiple screens and larger formats available." },
  },
  {
    slug: "equipment-hire",
    title: "Equipment Hire",
    shortTitle: "Equipment Hire",
    icon: "Wrench",
    description: "Hire professional AV equipment for your own events — cameras, mixers, screens, and more.",
    subtitle: "Access professional-grade AV gear without the cost of ownership.",
    features: [
      { icon: "Camera", title: "Cameras", description: "PTZ HD cameras and camcorders available for hire, ideal for recording or streaming." },
      { icon: "SlidersHorizontal", title: "Mixers & Switchers", description: "Video switchers and audio mixers for multi-source events." },
      { icon: "Monitor", title: "Screens & Displays", description: "Monitors, projectors, and screens in various sizes for any venue." },
      { icon: "Cable", title: "Cables & Accessories", description: "HDMI, SDI, audio cables, tripods, stands, and all the accessories you need." },
    ],
    popularFor: ["DIY Events", "Schools", "Community Groups", "Businesses"],
    howItWorks: ["Tell us what equipment you need", "We prepare and deliver it", "Return it when you're done"],
    faqs: [
      { question: "Do I need experience to use the equipment?", answer: "Our gear is straightforward to use, and we provide a quick walkthrough on delivery. For complex setups, we recommend our operated service instead." },
      { question: "How long can I hire equipment for?", answer: "Hire periods are flexible — from a single day to a full week. Contact us for pricing based on your needs." },
      { question: "Do you deliver and collect the equipment?", answer: "Yes. We deliver to your venue, set up if needed, and collect after your event." },
    ],
    accentColor: "#A855F7",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
    pricing: { label: "Equipment Hire", from: "$100", note: "Day rate for individual items. Bundles and weekly rates available on request." },
  },
];
