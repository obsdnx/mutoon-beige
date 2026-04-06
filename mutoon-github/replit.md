# Mutoon - Islamic Educational Workbooks

## Overview
A minimalist, scholarly website for Mutoon, an Islamic educational book business selling 5 structured bilingual workbooks. Light, warm aesthetic with library illustration backgrounds, sepia brown accents, clean typography, and professional animations.

## Recent Changes
- Created /product page with interactive downward timeline showcasing workbook features
- Removed Kitab At-Tawheed workbook (now 5 total)
- Added real book cover images for all 5 workbooks
- Added Mutoon at-Taalib al-Ilm collection info to Mission page
- Added Nullifiers of Islam and 40 Hadith Nawawi as workbooks
- Added proper contact form validation (required fields, valid email, enum type)
- Seed logic now upserts missing workbooks instead of only seeding when table is empty
- Added amazonLink field to workbooks schema
- Amazon links for Three Principles and Glorification of Knowledge
- "Coming Soon" badge/overlay for books without Amazon links
- Contact email: contact@mutoon.co.uk
- WhatsApp: +44 7552 908868
- Created /mission page with goals, motivations, and purpose sections
- Quote changed to "Seeking knowledge is an obligation upon every Muslim" (Hadith - Ibn Majah)

## Project Architecture
- **Frontend**: React + Vite on port 5000, using wouter for routing, framer-motion for animations
- **Backend**: Express API server
- **Database**: PostgreSQL via Drizzle ORM
- **Styling**: Tailwind CSS with custom warm cream/parchment palette (hsl 40 30% 96%), sepia brown accent (hsl 28 45% 35%)
- **Fonts**: Cormorant Garamond (headings), Source Sans 3 (body), Scheherazade New (Arabic)

## Key Pages
- `/` - Home page with hero carousel, about section, workbooks carousel, quote section, contact form
- `/product` - Our Product page with interactive timeline showing workbook features (structured sections, bilingual matn, guided exercises)
- `/mission` - Mission, goals, motivations, and Mutoon at-Taalib al-Ilm collection info

## Workbooks
1. The Three Principles - Amazon: https://www.amazon.co.uk/dp/1919280138
2. The Four Principles - No Amazon link (coming soon)
3. Glorification of Knowledge - Amazon: https://www.amazon.co.uk/dp/191928012X
4. Nullifiers of Islam - No Amazon link (coming soon)
5. 40 Hadith Nawawi - No Amazon link (coming soon)

## Design Choices
- Library illustration (attached_assets/image_1769909210137.png) at 40% opacity with cream gradient overlays
- Hero text is left-aligned with auto-play carousel (5 second intervals)
- Workbooks section uses sliding carousel with navigation arrows
- Quote section has character-by-character typing effect triggered on scroll
- Simple horizontal bar carousel indicators
