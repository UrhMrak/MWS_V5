# MRAK Web Studios - Portfolio

A modern, minimalist portfolio website built with Next.js and Tailwind CSS, featuring responsive design and smooth animations.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Navigation**:
  - Desktop: Right-side navigation bar
  - Mobile: Sticky top navigation that appears on scroll
- **Active Section Detection**: Navigation items show a dash (-) prefix when their section is in viewport
- **Smooth Animations**: Subtle transitions and hover effects using Framer Motion
- **Clean Typography**: Professional fonts (Inter, Poppins) with consistent sizing
- **Neutral Color Palette**: Warm whites, grays, and blacks with accent colors
- **Semantic HTML**: Clean, accessible code structure

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Fonts**: Google Fonts (Inter, Poppins)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page with all sections
├── components/
│   └── Navigation.tsx       # Navigation component
├── tailwind.config.js       # Tailwind configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Sections

1. **Home**: Hero section with introduction and call-to-action
2. **About Me**: Personal information with technology icons
3. **My Work**: Featured projects with descriptions and screenshot placeholders

## Customization

- **Colors**: Modify the color palette in `tailwind.config.js`
- **Content**: Update text content in `app/page.tsx`
- **Navigation**: Add/remove navigation items in `components/Navigation.tsx`
- **Animations**: Adjust animation settings in component files

## Deployment

The project is ready for deployment on Vercel, Netlify, or any other hosting platform that supports Next.js.

```bash
npm run build
npm start
```
