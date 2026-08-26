# 3D Creative Developer Portfolio — Project Specification

## 1. Project Goal

Build a premium, production-quality 3D portfolio website for a Frontend Engineer / Creative Developer.

The website must communicate:

- Frontend engineering expertise
- Creative development
- Three.js / WebGL capability
- Motion and interaction design
- Strong UI/UX skills

The final result should feel like an Awwwards-quality creative developer portfolio.

---

## 2. Technology Stack

Use:

- React.js
- Vite
- JavaScript or TypeScript
- Three.js
- React Three Fiber
- @react-three/drei
- Motion / Framer Motion
- Tailwind CSS
- React Router when multiple routes are needed
- Lucide React
- Simple Icons / Devicon for technology logos

Use modern, stable versions compatible with the project.

---

## 3. Visual Direction

### Theme

Primary visual identity:

**Black / Dark / Cinematic / Futuristic / Minimal / Premium**

Use:

- Near-black backgrounds
- White primary typography
- Muted gray secondary text
- Subtle blue, violet, or cyan accents
- Soft gradients
- Glass effects
- Thin borders
- Atmospheric lighting
- Subtle grain/noise
- Controlled glow

Avoid excessive neon.

The website must NOT look like:

- A gaming dashboard
- A generic Bootstrap portfolio
- A template
- An overdecorated neon website
- An obvious AI-generated landing page

The feeling should be:

**Elegant + Technical + Cinematic + Creative**

---

## 4. Reference Layout

Use the provided reference image as visual inspiration for:

- Section hierarchy
- Spacing
- Composition
- Content density
- General portfolio structure

Do not copy the image literally.

Create a more modern and original interpretation.

---

## 5. Required Sections

The portfolio should contain:

1. Loading Screen
2. Navigation
3. Hero
4. About
5. Experience
6. Skills
7. Projects
8. Contact
9. Footer

---

## 6. Hero

Create a full-screen immersive hero.

Content should communicate:

- Name
- Role
- Short professional statement
- Main CTA
- Secondary CTA

Example:

> Hi, I'm Huyen.

> A Frontend Engineer & Creative Developer crafting immersive digital experiences.

Include an interactive Three.js scene.

Possible objects:

- Abstract geometric object
- Liquid metal shape
- Glass sphere
- Torus
- Floating geometry
- Wireframe structure
- Futuristic abstract object

The object should react subtly to:

- Mouse movement
- Cursor position
- Scroll
- Hover

---

## 7. Animated Background

Do not use a plain static black background.

Create a layered background containing:

1. Black base
2. Radial gradients
3. Animated soft glow
4. Particle field
5. Noise/grain
6. Optional subtle grid/dot pattern
7. Mouse-following light

The background must remain subtle and not interfere with readability.

Create a reusable:

`AnimatedBackground`

component.

---

## 8. Navigation

Create a premium floating navigation.

Items:

- Home
- About
- Experience
- Skills
- Projects
- Contact

Desktop:

- Glass/translucent appearance
- Blur
- Animated active indicator
- Smooth hover effects

Mobile:

- Animated fullscreen menu
- Staggered links
- Backdrop blur
- Smooth open/close transition

---

## 9. About

Include:

- Professional introduction
- Short biography
- Development philosophy
- Current focus
- Location
- Experience summary

Add a small interactive visual or 3D element.

Use scroll-triggered Motion animations.

---

## 10. Experience

Create an animated vertical timeline.

Each item contains:

- Company
- Position
- Duration
- Description
- Technologies

Animate:

- Timeline line
- Cards
- Text
- Entry/exit states

Use Motion scroll triggers.

---

## 11. Skills

Create an interactive skill visualization rather than basic cards.

Categories:

### Frontend

- React
- Next.js
- TypeScript
- JavaScript
- HTML
- CSS
- Tailwind CSS

### 3D / Creative

- Three.js
- React Three Fiber
- WebGL
- GLSL

### Backend

- Node.js
- Express
- REST API
- WebSocket

### Tools

- Git
- GitHub
- Docker
- Figma
- VS Code

Use real technology logos.

Hover interactions should include:

- Scale
- Glow
- Tooltip
- Small movement
- Related 3D reaction

---

## 12. Projects

Projects are one of the most important parts of the website.

Each project should contain:

- Project number
- Title
- Description
- Preview image
- Technologies
- GitHub link
- Live Demo link

Example projects:

### Project 01 — Real-time Chat Platform

React, Node.js, Socket.IO, PostgreSQL

### Project 02 — Room Finder Platform

Next.js, TypeScript, Node.js, PostgreSQL

### Project 03 — 3D Portfolio

React, Three.js, React Three Fiber

### Project 04 — News Platform

React, Express, Python

---

## 13. Project Interaction

Project cards must feel interactive.

On desktop hover:

- Image scales
- Cursor interaction
- Title shifts
- Border animates
- Glow appears
- Arrow moves
- Background subtly changes

Clicking a project should open a detailed view or route.

Project detail should include:

- Large preview
- Description
- Features
- Technology stack
- GitHub
- Live Demo

---

## 14. Assets

Do not leave important visual elements as empty placeholders.

Use an organized asset system:

```text
src/
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   ├── projects/
│   │   ├── profile/
│   │   └── backgrounds/
│   ├── icons/
│   └── models/
```

If real project screenshots are unavailable, create tasteful abstract previews using:

- Browser mockups
- Dark UI interfaces
- Dashboard previews
- Mobile UI mockups
- Abstract 3D visuals

Do not use random stock photography.

---

## 15. Three.js Architecture

Separate Three.js components from normal UI.

Recommended:

```text
components/
└── three/
    ├── HeroScene
    ├── FloatingGeometry
    ├── ParticleField
    ├── InteractiveObject
    ├── SkillsScene
    └── ProjectScene
```

Use reusable components.

Avoid putting the entire 3D implementation in one file.

Use:

- Suspense
- refs
- optimized geometries
- controlled DPR
- appropriate lighting
- ContactShadows when useful

---

## 16. Motion Design

Motion should be present throughout the website.

Implement:

### Page entrance

- Fade
- Slide
- Scale
- Stagger

### Text

- Word reveal
- Line reveal
- Character reveal when appropriate

### Cards

- Lift
- Scale
- Tilt
- Glow

### Buttons

- Magnetic movement
- Arrow movement
- Background expansion

### Images

- Parallax
- Scale
- Clip-path reveal

### Sections

- Scroll-triggered reveal

Animations must feel smooth and intentional.

Do not animate everything unnecessarily.

---

## 17. Custom Cursor

Desktop only.

Create:

- Small cursor dot
- Larger smooth outer ring

Interactions:

- Expand on clickable elements
- Change on project hover
- Display `VIEW`
- Display `OPEN`
- Display `DRAG` where appropriate

Disable on mobile.

---

## 18. Contact

Create a strong final CTA.

Example:

> Let's build something extraordinary.

Include:

- Email
- GitHub
- LinkedIn
- Social links

Main CTA:

`START A PROJECT →`

Use subtle background 3D or atmospheric lighting.

---

## 19. Footer

Keep it minimal.

Include:

- Name
- Role
- Social links
- Copyright
- Navigation

Example:

`© 2026 Huyen Minh — Designed & Built with React + Three.js`

---

## 20. Typography

Use one primary modern font.

Recommended:

- Inter
- Geist
- Space Grotesk
- Satoshi
- Manrope

Use large display typography.

Suggested desktop scale:

- Hero: 80–140px
- Section headings: 60–100px
- Body: 16–20px

Use responsive typography.

---

## 21. Responsive Design

Support:

- Desktop
- Laptop
- Tablet
- Mobile

Desktop:

- Full 3D experience
- Mouse interaction
- Custom cursor
- Rich motion

Tablet:

- Reduced 3D complexity
- Reduced particle count

Mobile:

- Simplified 3D
- Reduced particles
- Touch-first interaction
- No custom cursor
- Reduced heavy effects

---

## 22. Performance

Target approximately 60 FPS on modern desktop hardware.

Required:

- Lazy-load heavy 3D
- Reduce particles on mobile
- Use Suspense
- Optimize geometry
- Avoid unnecessary React state updates
- Use refs for animation values
- Limit DPR
- Optimize images
- Dispose resources correctly

---

## 23. Accessibility

Implement:

- Semantic HTML
- Keyboard navigation
- Focus states
- Alt text
- Accessible buttons
- Accessible navigation
- Reduced-motion support

Respect:

`prefers-reduced-motion`

When enabled, reduce or disable non-essential animation.

---

## 24. Architecture

Recommended structure:

```text
src/
├── assets/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── hero/
│   ├── about/
│   ├── experience/
│   ├── skills/
│   ├── projects/
│   ├── contact/
│   ├── three/
│   └── ui/
├── sections/
├── data/
├── hooks/
├── utils/
├── App.jsx
└── main.jsx
```

Keep content/data separate from UI.

Do not put everything in `App.jsx`.

---

## 25. Loading Screen

Create a cinematic loading screen.

Example:

`LOADING EXPERIENCE...`

Include a smooth progress indicator.

Transition into the hero after loading.

Keep loading short.

---

## 26. Page Transitions

Use Motion for route transitions.

Possible effects:

- Fade
- Blur
- Scale
- Slide

Keep them fast and elegant.

---

## 27. Micro-interactions

Add subtle details:

- Magnetic buttons
- Animated arrows
- Hover glow
- Icon rotation
- Border animation
- Cursor interaction
- Background light movement
- Text reveal
- 3D reaction

---

## 28. Language

All visible UI content must be in English.

Tone:

- Professional
- Confident
- Modern
- Concise
- Technical
- Creative

Avoid exaggerated marketing language.

---

## 29. SEO

Include:

- Page title
- Meta description
- Open Graph metadata
- Favicon
- Semantic HTML

Example title:

`Huyen Minh — Frontend Engineer & Creative Developer`

---

## 30. Quality Requirements

Do not finish after creating a basic layout.

Do not leave important:

- TODO
- Placeholder
- Empty cards
- Broken images
- Missing imports

If an asset is unavailable, use CSS or Three.js to create an appropriate visual.

Run the project and fix:

- Build errors
- Runtime errors
- Console errors
- Broken imports
- Missing assets
- Responsive issues
- Three.js issues

The final application must be runnable.

---

## 31. Final Design Target

The final result should feel like:

**A premium creative developer portfolio combining engineering and art.**

It should communicate:

**Frontend Engineering + Creative Development + Three.js + Motion + UI/UX**

The first impression should be:

> This is a serious developer who understands both engineering and creative frontend.

Prioritize:

1. Visual quality
2. Interaction quality
3. Typography
4. 3D quality
5. Motion quality
6. Performance
7. Responsive behavior
8. Accessibility
9. Maintainability
