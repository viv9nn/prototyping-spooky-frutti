export interface NotificationTemplate {
  id?: string;
  sender: string;
  message: string;
  type: "risky" | "harmless";
  appIcon?: string; // emoji or mini icon
  appLabel?: string;
  caughtDialogue?: string; // what the girlfriend screams if she reads it
}

export const RISKY_NOTIFICATIONS: NotificationTemplate[] = [
  {
    sender: "Jessica",
    message: "miss you already 😘",
    type: "risky",
    appIcon: "💬",
    appLabel: "Messages",
    caughtDialogue: "WHO'S JESSICA??! And why is she missing you?!",
  },
  {
    sender: "Unknown",
    message: "last night was fun 👀",
    type: "risky",
    appIcon: "💬",
    appLabel: "Messages",
    caughtDialogue: "WAIT, who is 'Unknown' and what was 'fun'?!",
  },
  {
    sender: "Mom",
    message: "Sweetie, how's the date going?? 💕",
    type: "risky",
    appIcon: "💬",
    appLabel: "Messages",
    caughtDialogue: "Is your MOM micromanaging our date right now?!",
  },
  {
    sender: "Dad",
    message: "Did you pay for dinner like I told you?",
    type: "risky",
    appIcon: "💬",
    appLabel: "Messages",
    caughtDialogue: "Wait... did your DAD have to tell you to pay?!",
  },
  {
    sender: "Hannah",
    message: "are we still on for Friday? 😏",
    type: "risky",
    appIcon: "💬",
    appLabel: "Messages",
    caughtDialogue: "WHO IS HANNAH?! What are you doing on Friday?!",
  },
  {
    sender: "Tinder",
    message: "You have 3 new super-likes waiting! 🔥",
    type: "risky",
    appIcon: "🔥",
    appLabel: "Tinder",
    caughtDialogue: "ARE YOU STILL ON TINDER RIGHT NEXT TO ME?!",
  },
  {
    sender: "Sarah",
    message: "is she asleep yet? call me 🤫",
    type: "risky",
    appIcon: "💬",
    appLabel: "Messages",
    caughtDialogue: "'IS SHE ASLEEP YET'?! NO I'M NOT ASLEEP!",
  },
  {
    sender: "Chloe",
    message: "found your hoodie at my apartment 💋",
    type: "risky",
    appIcon: "💬",
    appLabel: "Messages",
    caughtDialogue: "YOUR HOODIE IS AT CHLOE'S APARTMENT?!",
  },
];

export const HARMLESS_NOTIFICATIONS: NotificationTemplate[] = [
  {
    sender: "Weather",
    message: "Rain tomorrow at 2 PM 🌧️",
    type: "harmless",
    appIcon: "☀️",
    appLabel: "Weather",
  },
  {
    sender: "Battery",
    message: "20% remaining - Low Power Mode",
    type: "harmless",
    appIcon: "🪫",
    appLabel: "System",
  },
  {
    sender: "Duolingo",
    message: "These Spanish verbs won't learn themselves! 🦉",
    type: "harmless",
    appIcon: "🦉",
    appLabel: "Duolingo",
  },
  {
    sender: "Calendar",
    message: "Dentist Appointment in 2 days",
    type: "harmless",
    appIcon: "📅",
    appLabel: "Calendar",
  },
  {
    sender: "Spotify",
    message: "Discover Weekly is ready for you 🎧",
    type: "harmless",
    appIcon: "🎵",
    appLabel: "Spotify",
  },
  {
    sender: "News",
    message: "Local cat wins mayoral election 🐱👑",
    type: "harmless",
    appIcon: "📰",
    appLabel: "News",
  },
  {
    sender: "YouTube",
    message: "Lofi Beats for Sleeping is live now",
    type: "harmless",
    appIcon: "▶️",
    appLabel: "YouTube",
  },
];

export interface ActiveNotification extends NotificationTemplate {
  instanceId: string;
  spawnTime: number; // game time in seconds when it appeared
  seenByGirlfriendDuration: number; // seconds girlfriend has looked while this is on screen
  hasBeenCaught: boolean; // whether caught penalty has already fired for this instance
  isExiting: boolean; // animating off-screen upward
}
