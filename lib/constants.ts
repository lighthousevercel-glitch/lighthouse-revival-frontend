export const CHURCH_INFO = {
  name: "Lighthouse Revival Church International",
  location: "Abu Dhabi, UAE",
  established: "2006",
  pastor: "Pastor Manoj Thomas",
  contact: {
    email: "info@lighthousechurch.com",
    phone: "+971-50-374-8678",
  },
  services: {
    english: {
      time: "12:30pm to 2:30pm",
      day: "Sunday",
      location: "G2 Hall at Brethren Church Center, Abu Dhabi",
    },
    tamil: {
      time: "3:00pm to 5:00pm",
      day: "Sunday",
      location: "G2 Hall at Brethren Church Center, Abu Dhabi",
    },
    hindi: {
      time: "4:30pm to 6:00pm",
      day: "Saturday",
      location: "Elohim Hall, Mussafah, Abu Dhabi",
    },
    malayalam: {
      time: "3:00pm to 5:00pm",
      day: "Sunday",
      location: "G2 Hall at Brethren Church Center, Abu Dhabi",
    },
     urdu: {
      time: "4:30pm to 6:00pm",
      day: "Saturday",
      location: "Elohim Hall, Mussafah, Abu Dhabi",
    }
  },
  transportation: {
    locations: ["Baniyas", "Abu Dhabi City", "Shabiya", "ICAD"],
    isFree: true,
  },
}

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
] as const

export const BIBLE_VERSE = {
  reference: "Isaiah 41:10",
  text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
}
