# Overview

A multimedia storytelling web application for "Ekyrian & Orquesta Athanor Live" that showcases a recorded concert through an immersive, scroll-driven narrative experience. The application presents each song as a distinct story section with parallax visual effects, background information, and video clips from the live performance. Users navigate through the concert experience via smooth scrolling, with each section featuring cinematic parallax backgrounds that move at different speeds to create depth and visual engagement.

**WCAG 2.1 AA Accessibility Compliant** - The application implements comprehensive accessibility features including semantic HTML, ARIA labels, keyboard navigation, focus management, color contrast compliance, and full prefers-reduced-motion support.

## Recent Updates (November 2025)
### UI/UX Enhancements (November 21, 2025)
- **Smooth Button Animations**: Implemented elegant gradient crossfade transitions on all interactive buttons
  - Hamburger menu button now uses consistent gradient styling (#667eea to #764ba2)
  - All buttons (start, next, previous, menu toggle) feature 0.4s smooth gradient transitions
  - Uses CSS pseudo-elements (::before) with opacity transitions for performant animations
  - Menu items have smoother 0.4s transition timing for cohesive interaction feel
  - All navigation buttons use small-caps (versalitas) for consistent elegant typography
- **Enhanced Typography Sizing**: Increased song titles to 3.5em for improved prominence and readability
- **Menu Header Optimization**: Reduced side menu H3 to 1.1em with small-caps to prevent text overflow
- **Mobile-Optimized Navigation**:
  - Song titles reduced to 2em on mobile (≤768px) for more usable content space
  - Navigation buttons arranged horizontally (side-by-side) on mobile instead of stacked
  - Shorter button text on mobile: "← Anterior" and "Siguiente →" (vs "← Canción Anterior" and "Siguiente Canción →" on desktop)
  - Compact button sizing (padding, font size) optimized for touch targets and screen space

### Typography Update (November 21, 2025)
- **EB Garamond Font**: Replaced Arial with EB Garamond (Google Fonts) throughout the application
  - Elegant serif typeface that matches the literary and cinematic theme
  - Free and open-source alternative to Adobe Garamond Pro
  - Includes multiple weights: 400, 500, 600, 700 (regular and italic)
  - Loaded via Google Fonts CDN with preconnect optimization
- **Small Caps (Versalitas)**: Applied to all major titles for enhanced elegance
  - Hero title and subtitle use small-caps styling
  - All 21 section titles (Introduction + 20 songs) display in versalitas
  - Menu header also uses small-caps for consistent literary aesthetic
  - Creates a literary, classic appearance that complements the concert theme

### Accessibility Compliance (November 21, 2025)
- **WCAG 2.1 AA Implementation**: Complete accessibility overhaul to meet Web Content Accessibility Guidelines Level AA
- **Language and Semantics**: Changed document language to Spanish (lang="es"), proper heading hierarchy (h1>h2), ARIA landmarks (role="main", role="banner")
- **Keyboard Navigation**: Skip navigation link, visible focus indicators (2-3px outlines) on all interactive elements
- **ARIA Labels**: Unique, contextual labels for all 60+ buttons with section numbers (e.g., "Colapsar contenido de la Canción 5 - Kaguya")
- **Color Contrast**: Improved text contrast from #b3b3b3 to #d1d1d1 (ratio 4.5:1+), all text meets AA standards
- **Touch Targets**: All interactive buttons minimum 44x44px for mobile accessibility
- **Dynamic Page Titles**: Automatic title updates via Intersection Observer as users scroll through sections
- **Focus Management**: Skip link with programmatic focus movement, tabindex management on main content
- **Reduced Motion Support**: Complete prefers-reduced-motion implementation:
  - ScrollMagic/GSAP parallax disabled when preference is set
  - Dynamic listener for real-time preference changes with proper cleanup (gsap.killTweensOf)
  - Loading screen animations (fog, text cycling) respect motion preferences
  - All CSS animations and transitions disabled with media query
- **Decorative Images**: Background parallax divs marked as aria-hidden="true" to prevent verbose screen reader announcements
- **aria-expanded**: Dynamic state management on hamburger menu button
- **All 20 concert songs now include complete lyrics** from official Bandcamp sources
- **Spotify-style lyrics panels** added to all songs with vocals (18 songs total)
- **Section markers** (Estribillo, Puente, Verso, Outro) added for improved readability
- **Two instrumental tracks** properly marked: "El Alma del Viento" (Song 11) and "Rutas Misteriosas" (Song 18)
- **Spanish capitalization style** applied to all song titles (articles and prepositions lowercase)
- **Final setlist order confirmed** with all songs in correct performance sequence
- **Navigation arrows added** to all buttons (← and →) for improved visual clarity
- **Background images** updated to match song numbers (song1_bg.jpg through song20_bg.jpg)
- **Dock/Undock functionality** added to all story sections for customizable viewing experience
- **Collapsible side menu** added with complete concert index for quick navigation to any song
- **Enhanced visual effects** with gradient transitions and vignette effects on background images for cinematic depth
- **Mysterious loading screen** with animated Ekyrian logo, fog effects, and progress bar to cover initial image loading

# User Preferences

Preferred communication style: Simple, everyday language.

# Project Details

**User**: Ibai Ruiz (guitarist), Ekyrian copyright owner - authorized to use all band's lyrics
**Concert**: Teatro Pilar Bardem, February 15, 2025
**Total Songs**: 20 (18 with vocals + 2 instrumentals)

## Concert Setlist (Songs 1-20)
1. Ekyrian
2. Alza la Vista
3. Angua
4. El Héroe Esperado
5. Kaguya
6. La Danza de los Muertos
7. Colores en el Viento
8. El Cuento de la Oscuridad
9. Volverte a Soñar
10. El Alquimista
11. El Alma del Viento (Instrumental)
12. El Aprendiz
13. La Travesía del Navegante
14. Ítaca
15. La Balada de Wilfred el Enano
16. El Rey Blanco
17. El Templo del Mar
18. Rutas Misteriosas (Instrumental)
19. La Llegada de Krampus
20. Más Allá de la Tempestad

# System Architecture

## Frontend Architecture
- **Single-Page Application (SPA)**: Built with vanilla HTML, CSS, and JavaScript for simplicity and performance
- **Scroll-Driven Navigation**: Uses smooth scrolling to transition between song sections, creating a continuous narrative flow
- **Modular Section Design**: Each song is represented as a standalone `.story-section` with consistent structure for title, story, and video content

## Animation and Visual Effects
- **ScrollMagic Integration**: Implements scroll-triggered animations and parallax effects using the ScrollMagic library
- **GSAP Animation Engine**: Utilizes GreenSock Animation Platform (GSAP) for smooth, performant parallax transformations
- **Parallax Background System**: Each section features a `.background-parallax` element that moves at 60% of scroll speed (from -30% to +30% position) to create depth illusion

## Content Structure
- **Hero Landing Page**: Full-viewport introduction with call-to-action to start the experience
- **Story Sections**: Each song gets a dedicated full-height section with:
  - Parallax background image (song1_bg.jpg through song20_bg.jpg)
  - Song title and narrative content
  - Embedded video player for live performance clips
  - Navigation elements for progression (← Canción Anterior / Siguiente Canción →)
  - Dock/Undock toggle button for minimizing content

## Interactive Features
- **Loading Screen Animation**: Mysterious loading experience with Ekyrian logo
  - Dark purple gradient background (radial gradient from #1a0033 to black)
  - Animated fog layers drifting across the screen with purple tint
  - Pulsing glow effect on the Ekyrian logo (drop-shadow filters)
  - Progress bar showing loading status
  - Fades out smoothly after 500ms once page loads
  - "Cargando la experiencia..." text with fade animation

- **Side Menu Navigation**: Fixed hamburger menu button (top-left) provides quick access to entire concert
  - Opens a collapsible side menu with complete index of all 21 sections (Intro + 20 songs)
  - Click any song name to instantly scroll to that section
  - Menu automatically collapses after selection for uninterrupted viewing
  - Dark semi-transparent overlay prevents background interaction when menu is open
  - Keyboard shortcut: Press ESC to close menu
  - Purple accent colors matching the application theme
  - Smooth slide-in/out animations (0.4s cubic-bezier transitions)

- **Dock/Undock System**: Users can minimize any song's content panel to focus on the background
  - Click the → button in the top-right to collapse the content to a small 60px capsule
  - Click the ← button to expand the content back to full size
  - Each section can be independently docked/undocked
  - Multiple sections can be docked simultaneously without interference
  - Smooth CSS transitions for collapse/expand animations
  - Collapsed panels remain visible at the right edge with a colored background

- **Enhanced Visual Depth**: Background images feature cinematic effects
  - Multi-layer gradient overlays create smooth transitions between sections
  - Top and bottom edges darkened (70-80% opacity) for seamless section blending
  - 4-layer vignette effect with inset box shadows on backgrounds
  - Eliminates "stacked boxes" appearance, creating flowing narrative experience

## Responsive Design Approach
- **Viewport-Based Sizing**: Uses `100vh` units for consistent full-screen sections across devices
- **Flexible Media Handling**: Video and image elements designed to adapt to different screen sizes
- **Mobile-First CSS**: Styles structured for mobile compatibility with desktop enhancements

# External Dependencies

## JavaScript Libraries
- **ScrollMagic**: Version 2.0.8 via CDN for scroll-based animation triggers and scene management
- **GSAP (GreenSock)**: Referenced in JavaScript code for smooth parallax animations (requires separate inclusion)

## Media Assets
- **Background Images**: Individual background images for each song section stored in `/images/` directory
- **Video Content**: Live performance clips stored in `/videos/` directory with HTML5 video player integration
- **Hero Background**: Main landing page background image (`hero_bg.jpg`)

## CDN Resources
- **ScrollMagic CDN**: `cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/ScrollMagic.min.js`
- **Web Fonts**: Currently using system fonts (Arial) with potential for custom font integration

## Browser APIs
- **Scroll Behavior API**: Native smooth scrolling implementation via `scrollIntoView()`
- **DOM Manipulation APIs**: Standard JavaScript DOM methods for event handling and element selection
- **HTML5 Video API**: Native video controls and playback functionality