# ShoreSquad Design System & Project Specifications

## 🌊 Project Overview
**ShoreSquad** is a social, map-based platform for mobilizing young people to organize and participate in beach cleanups. It combines interactive mapping, real-time weather tracking, crew management, and community events into a fun, accessible web app.

---

## 🎨 Color Palette

### Primary Colors
- **Primary Blue** (`#0EA5E9`): Trust, clarity, youth energy. Used for buttons, links, headers.
- **Secondary Cyan** (`#06B6D4`): Ocean water, waves. Used for gradients, accents.
- **Accent Green** (`#10B981`): Eco-action, nature, growth. Used for success states, crew indicators.

### Secondary Colors
- **Warm Amber** (`#F59E0B`): Energy, sunshine, attention. Used for CTAs and highlights.
- **Neutral Gray** (`#F3F4F6`): Clean, modern sections.
- **Dark Gray** (`#1F2937`): Primary text, strong contrast.

### Accessibility
- All color combinations meet **WCAG AA** contrast standards (7:1 or better).
- No critical information conveyed by color alone; patterns and labels used.
- High-contrast mode support included.

---

## ⚡ JavaScript Features & Performance

### 1. **Core Interactivity**
- **Crew Management**: Add/remove crew members with real-time DOM updates.
- **Event Creation**: Quick event creation dialog with localStorage persistence.
- **Mobile Navigation**: Hamburger menu toggle with smooth open/close.
- **Form Validation**: Simple validation on crew form submission.

### 2. **Data Persistence**
- **localStorage Integration**: Crew and events saved to browser storage.
- **JSON Serialization**: Data safely stored and retrieved without network calls.
- **Auto-restore**: Data loaded on page refresh.

### 3. **Performance Optimizations**
- **CSS Variables**: Reusable design tokens for fast theme changes.
- **Event Delegation**: Single listener on crew-list handles multiple removes.
- **CSS Animations**: Hardware-accelerated `transform` and `opacity` (no `left`, `top`).
- **defer Attribute**: Script loads after DOM parsing (`<script defer>`).
- **Minimal Re-flows**: DOM updates batched with `innerHTML` (performance-safe for crew list).

### 4. **Future-Ready Features** (stubs for API integration)
- **Geolocation API**: `locateBtn` ready for real geolocation.
- **Weather API**: Placeholder for OpenWeatherMap or WeatherAPI integration.
- **Map Embedding**: Ready for Leaflet.js, Mapbox, or Google Maps.
- **Backend Sync**: Event listeners structured for REST/GraphQL API calls.

### 5. **Accessibility**
- **Keyboard Navigation**: All buttons focusable, Enter to submit forms.
- **ARIA Labels**: `aria-label`, `aria-expanded`, `role` attributes throughout.
- **Focus Management**: Clear focus styles, visible outlines.
- **Screen Reader Support**: Semantic HTML, descriptive button labels.
- **Prefers Reduced Motion**: Animations disabled for users with motion sensitivity.

---

## 🎯 UX Design Principles

### 1. **Mobile-First Responsive Design**
- Base styles for mobile (< 480px), then progressive enhancement.
- Responsive grid layouts using CSS Grid and Flexbox.
- Touch-friendly buttons: minimum 48px height/width.
- Collapse sidebar on mobile, expand on desktop.

### 2. **Clarity & Simplicity**
- Clear visual hierarchy: title > subtitle > body text.
- Emoji icons for instant recognition (🌊, 📍, 👥, 🎯).
- One primary action per section (e.g., "Add Crew", "Join Event").
- Minimalist design: avoid visual clutter.

### 3. **Engagement & Feedback**
- Hover states on interactive elements (buttons, cards, links).
- Smooth transitions (`--transition-base: 250ms ease-in-out`).
- Toast/alerts for key actions (e.g., crew member added).
- Visual confirmation (card lift on hover, button color change).

### 4. **Accessibility First**
- **Color Contrast**: 7:1+ for all text on background.
- **Focus Indicators**: Clear 3px outline on keyboard focus.
- **Semantic HTML**: `<button>`, `<form>`, `<section>`, `<nav>` for structure.
- **Skip Links** (future): Quick jump to main content.
- **Reduced Motion**: Respect `prefers-reduced-motion` media query.

### 5. **Social & Community Feeling**
- Crew list prominently displayed (builds social proof).
- Emoji and warm colors evoke youth, fun, environmental action.
- Gradient headers (ocean blue → cyan) create visual flow.
- Community event cards showcase attendance ("👥 12 attending").

### 6. **Performance & Accessibility Combined**
- Fast load time (no heavy frameworks, vanilla JS).
- Lazy-ready structure (images can be lazy-loaded in future).
- Service Worker ready for offline support (future).
- Analytics-friendly: clear event tracking opportunities.

---

## 📁 Project Structure

```
ShoreSquad/
├── index.html              # HTML5 boilerplate with semantic sections
├── css/
│   └── styles.css          # All styles, design system, responsive queries
├── js/
│   └── app.js              # Vanilla JS app logic, crew & event management
├── assets/                 # (future) images, logos, icons
├── .gitignore              # Node modules, OS files, env
├── package.json            # Live Server, build scripts
└── README.md               # (recommended) Getting started guide
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js + npm (or just browse directly)

### Option 1: Live Server (Recommended)
```bash
npm install
npm start
# Opens at http://localhost:8080
```

### Option 2: Direct Open
```bash
# Just open index.html in your browser
```

### Git Setup
```bash
git init
git add .
git commit -m "Initial ShoreSquad commit"
git remote add origin <your-repo-url>
git push -u origin main
```

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#0EA5E9` | Buttons, headers, focus states |
| `--secondary` | `#06B6D4` | Gradients, secondary elements |
| `--accent` | `#10B981` | Success, eco-action indicators |
| `--warm` | `#F59E0B` | CTAs, energy, highlights |
| `--spacing-lg` | `2rem` | Section padding, gaps |
| `--radius-lg` | `0.75rem` | Card borders, inputs |
| `--transition-base` | `250ms ease-in-out` | Smooth interactions |

---

## 📱 Browser Support
- Modern browsers: Chrome, Firefox, Safari, Edge (ES6+)
- Mobile: iOS 12+, Android 8+
- **No IE11 support** (uses CSS Grid, Flexbox, modern JS)

---

## 🔮 Future Enhancements
- [ ] Integration with real weather API (OpenWeatherMap)
- [ ] Map embedding (Leaflet.js, Mapbox)
- [ ] User authentication & profiles
- [ ] Real-time notifications (WebSocket/Firebase)
- [ ] Photo upload & gallery
- [ ] Leaderboard & gamification
- [ ] Mobile app (React Native, Flutter)
- [ ] Backend API (Node.js + DB)

---

## 📖 References
- [WCAG 2.1 Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs - CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Vanilla JS Best Practices](https://github.com/loverajoel/you-dont-need-jquery)

---

**Made with 🌊 and ♻️ for beach lovers everywhere.**
