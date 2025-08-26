---
# Lighthouse Revival Church - Frontend

This is the official frontend repository for the Lighthouse Revival Church website, built with Next.js, TypeScript, and Tailwind CSS. The application is designed to be modern, responsive, multi-lingual, and a central hub for the church community.

 
*(Replace this with a screenshot of your application's homepage)*

---

## ✨ Key Features

- **Multi-Channel Prayer Request System**:
  - **Google Sheets Integration**: Users can submit prayer requests through a dedicated form. These requests are automatically and securely saved to a Google Sheet via a backend API, allowing for easy management by church staff.
  - **Direct WhatsApp Submission**: An alternative "Send via WhatsApp" button allows users to send their formatted prayer request directly to the church's official WhatsApp number for immediate attention.

- **Dynamic Event Display**:
  - Fetches and displays upcoming events directly from the church's **Google Calendar API**.
  - Presents events in a visually engaging and interactive animated card carousel on the homepage.

- **Multi-Language & RTL Support**:
  - Fully internationalized content structure, managed via a custom `LanguageProvider`.
  - Seamless support for **Right-to-Left (RTL)** languages, ensuring a native and accessible user experience for all community members. The UI automatically adjusts its layout for RTL languages.

- **Modern & Responsive UI**:
  - Built with **Tailwind CSS** and **Shadcn/UI** for a clean, beautiful, and consistent design system.
  - Fully responsive layout that works perfectly on desktops, tablets, and mobile devices.
  - Smooth page transitions and component animations powered by **Framer Motion**.

- **Rich Content Pages**:
  - A compelling "About Us" page detailing the church's history and the pastor's journey.
  - Clear, organized sections for different church services, contact information, and the church's core mission.

- **Instant User Feedback**:
  - Integrated **toast notifications** for actions like form submissions, providing clear success or error messages to the user.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/lighthouse-revival-frontend.git
   cd lighthouse-revival-frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root of the project by copying the example file:
   ```sh
   cp .env.example .env.local
   ```
   Now, fill in the required values in `.env.local`. These are necessary for fetching events and submitting prayer requests.

4. **Run the development server:**
   ```sh
   npm run dev
   ```

Open http://localhost:3000 with your browser to see the result.

---

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file.

`NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY` - Your Google Calendar API Key.
`NEXT_PUBLIC_GOOGLE_CALENDAR_ID` - The ID of the Google Calendar to fetch events from.
`GOOGLE_SHEET_ID` - The ID of the Google Sheet for prayer requests (used by the backend).
`GOOGLE_SERVICE_ACCOUNT_EMAIL` - The service account email for Google Sheets API access.
`GOOGLE_PRIVATE_KEY` - The private key for the Google service account.

---

## 📁 Project Structure

```
frontend/
├── app/                # Next.js App Router: Pages and Layouts
│   ├── api/            # API routes (e.g., for prayer requests)
│   ├── (main)/         # Main page routes
│   ├── about/          # About Us page
│   ├── request/        # Prayer Request page
│   ├── layout.tsx      # Root layout with Navbar and Footer
│   └── page.tsx        # Homepage
├── components/         # Reusable components
│   ├── layout/         # Navigation, Footer
│   ├── providers/      # Context providers (e.g., LanguageProvider)
│   ├── sections/       # Large page sections (e.g., Hero, Events)
│   └── ui/             # UI primitives from Shadcn/UI (Button, Toast, etc.)
├── hooks/              # Custom React hooks (e.g., use-toast)
├── lib/                # Utility functions and constants
├── public/             # Static assets (images, fonts)
└── styles/             # Global styles
```
