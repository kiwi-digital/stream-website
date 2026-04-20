export interface EventType {
  slug: string;
  title: string;
  description: string;
  services: string[];
  benefits: string[];
  ctaLabel: string;
  accentColor: string;
  imageUrl: string;
}

export const events: EventType[] = [
  {
    slug: "funerals",
    title: "Funerals",
    description: "Help distant family and friends be part of the service, no matter where they are.",
    services: ["Live Streaming", "Video Recording"],
    benefits: ["Share with family who can't travel", "On-demand replay for those who miss it", "Password-protected and private"],
    ctaLabel: "Plan Your Funeral Stream",
    accentColor: "#0EA5E9",
    imageUrl: "https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=800&q=80",
  },
  {
    slug: "weddings",
    title: "Weddings",
    description: "Let every guest be part of your special day, whether they're in the room or across the world.",
    services: ["Live Streaming", "Video Recording", "Sound & PA"],
    benefits: ["Guests can watch from anywhere", "Professional video memories", "Custom branded viewer page"],
    ctaLabel: "Plan Your Wedding Stream",
    accentColor: "#6366F1",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  },
  {
    slug: "birthdays",
    title: "Birthdays",
    description: "Capture the celebration and share the fun with friends and family near and far.",
    services: ["Video Recording", "Sound & PA"],
    benefits: ["Lasting memories on USB or online", "Party soundtrack handled", "Relive the moment anytime"],
    ctaLabel: "Plan Your Birthday Event",
    accentColor: "#14B8A6",
    imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
  },
  {
    slug: "school-events",
    title: "School Events",
    description: "Stream prize-givings, performances, and sports days for parents and whanau who can't make it.",
    services: ["Live Streaming", "Projector & Screens"],
    benefits: ["Parents can watch live from work", "Big screen replay in the hall", "Recording for the school archive"],
    ctaLabel: "Plan Your School Event",
    accentColor: "#22D3EE",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
  },
  {
    slug: "church-services",
    title: "Church Services",
    description: "Extend your reach beyond the building with professional live streaming for your congregation.",
    services: ["Live Streaming", "Sound & PA"],
    benefits: ["Reach your congregation at home", "Crystal-clear audio for worship", "On-demand replay of sermons"],
    ctaLabel: "Plan Your Church Stream",
    accentColor: "#A855F7",
    imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80",
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    description: "Professional AV and streaming for conferences, AGMs, presentations, and team events.",
    services: ["Live Streaming", "Projector & Screens", "Sound & PA"],
    benefits: ["Remote attendees join seamlessly", "Professional production quality", "Full AV setup handled for you"],
    ctaLabel: "Plan Your Corporate Event",
    accentColor: "#818CF8",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
];
