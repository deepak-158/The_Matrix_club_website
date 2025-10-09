# The Matrix Club Website

A modern, responsive React website for The Matrix Club - a college multimedia club focused on photography, videography, graphic design, and digital art.

## 🚀 Features

- **Matrix-themed Design**: Dark theme with electric green accents inspired by "The Matrix" movie
- **Animated Matrix Rain Effect**: Background digital rain animation
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Interactive Announcement Modal**: Welcome popup for new visitors
- **Event Management**: Upcoming events, ongoing contests, and event archive
- **Contact Form**: Functional contact form with validation
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Modern Stack**: Built with React, TypeScript, and Vite

## 🎨 Pages

- **Home**: Hero section, club introduction, featured events, and gallery preview
- **About**: Mission/vision, team members, and sponsors
- **Events**: Tabbed interface for upcoming events, ongoing contests, and completed events
- **Contact**: Contact information, form, and FAQ section

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Framer Motion** for animations
- **React Router** for navigation
- **Lucide React** for icons
- **Custom CSS** with CSS Grid and Flexbox

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd matrixf
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🎯 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── MatrixRain.tsx      # Animated background effect
│   └── AnnouncementModal.tsx # Welcome popup modal
├── pages/
│   ├── Home.tsx            # Homepage with hero and sections
│   ├── About.tsx           # About page with team info
│   ├── Events.tsx          # Events with tabbed interface
│   └── Contact.tsx         # Contact form and information
├── App.tsx                 # Main app component with routing
├── App.css                 # Matrix-themed styles
├── index.css               # Global styles and fonts
└── main.tsx                # App entry point
```

## 🎨 Design System

### Color Palette
- **Primary Background**: `#111111` (Deep black)
- **Secondary Background**: `#222222` (Dark grey)
- **Matrix Green**: `#00FF41` (Electric green accent)
- **Text**: `#FFFFFF` (White)
- **Secondary Text**: `#CCCCCC` (Light grey)

### Typography
- **Headings**: 'Share Tech Mono' (Matrix-style monospace)
- **Body Text**: 'Roboto' (Clean, readable sans-serif)

### Key Features
- Glowing green effects and shadows
- Smooth hover animations
- Card-based layout with hover effects
- Responsive grid systems
- Matrix rain background animation

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Customization

### Adding New Events
Edit the events arrays in `src/pages/Events.tsx`:
- `upcomingEvents` - For upcoming workshops and events
- `ongoingContests` - For competitions and challenges
- `completedEvents` - For past events archive

### Updating Team Members
Modify the `teamMembers` array in `src/pages/About.tsx` to add or update team member information.

### Changing Contact Information
Update contact details in `src/pages/Contact.tsx` in the contact information section.

## 📄 License

This project is created for The Matrix Club and is intended for educational and club purposes.

## 🤝 Contributing

This website was built for The Matrix Club. For modifications or contributions, please contact the club administrators.

---

**The Matrix Club** - *Decoding Creativity | Your Reality, Reimagined.*