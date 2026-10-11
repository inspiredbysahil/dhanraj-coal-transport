# Dhanraj Coal Transport — Premium 3D Redesign

## Goal
Build the complete final redesign directly at `/`: preserve the uploaded site’s exact content, section order, rate data, WhatsApp flows, and working controls, while replacing the current blank page with a premium coal, fire, and industrial-energy experience.

The uploaded briefs are the source of truth where the live reference differs, including **63,000+ MT** monthly supply and **15+ ports**.

## Build plan

### 1. Content-first structure
- Create typed data modules under `src/data` for site copy, navigation, services, products, network, rates, industries, testimonials, FAQ, contact details, and footer content.
- Build the single scrolling page in the required order: navigation, hero, industry marquee, about, services, products, supply network, Why Us, rates, industries, coverage, testimonials, FAQ, contact, footer.
- Keep components presentation-only so content remains easy to update and restyle.

### 2. Obsidian-and-ember design system
- Define semantic Tailwind/CSS tokens for obsidian, charcoal, graphite, ash, ember, molten, spark, borders, glows, and surfaces.
- Load Space Grotesk for headings, Inter for body text, and JetBrains Mono for figures and rates.
- Apply dark industrial styling with restrained glass surfaces, gradient-edge details, ember highlights, subtle grain, coal-texture dividers, strong typography, and accessible contrast.
- Add the responsive sticky navigation, active-section state, scroll progress, compact scrolled state, mobile menu, floating desktop actions, and mobile Call/WhatsApp bar.

### 3. Procedural 3D experiences
- Add React Three Fiber/Three.js scenes with React 19-compatible package versions and client-only rendering.
- Hero: faceted coal cluster, pulsing emissive cracks, rising ember particles, fog, lighting, pointer parallax, and scroll response behind readable HTML content.
- Products: tabbed 3D samples for Domestic, Imported, Pet Coke, and Wood Coal with distinct procedural materials, drag/idle rotation, animated specs, status, and product-aware enquiry action.
- Network: interactive dotted globe with selectable global-to-India lanes, plus a responsive SVG India network map with hubs, tooltips, routes, and moving dispatch markers.
- Transport banner: stylised procedural low-poly truck moving along a curved road with scroll progress.
- Limit the page to two active canvases, cap pixel density, pause off-screen rendering, simplify scenes on mobile/low-end devices, and provide CSS/static fallbacks when WebGL or motion is unavailable.

### 4. Motion and interaction
- Add smooth scrolling, headline reveal, scroll-triggered section entrances, parallax accents, count-ups, progress bars, timeline illumination, card tilt, icon motion, magnetic desktop CTAs, and a restrained ember cursor trail.
- Respect `prefers-reduced-motion` by disabling autoplay, scrubbed motion, parallax, cursor effects, and heavy 3D movement.
- Add the spark-to-ember loading transition without delaying access to page content.

### 5. Working business tools
- Preserve anchor navigation, telephone links, global WhatsApp link, back-to-top, product preselection, and row-specific quote messages.
- Rate chart: search, category filters, sortable columns, sticky desktop table, mobile cards, CSV export, remark badges, row quote actions, and tons-based subtotal + 18% GST estimator with freight/TCS notes.
- Testimonials: autoplay with pause, controls, drag/swipe, and reduced-motion handling.
- FAQ: searchable accessible accordion.
- Contact: inline validation, loading/success states, selected product/requirement propagation, then a correctly formatted WhatsApp enquiry.

### 6. Metadata and accessibility
- Add page-specific title, description, Open Graph, Twitter card, theme color, favicon, and LocalBusiness JSON-LD using the supplied legal/contact data.
- Use semantic landmarks, visible focus states, keyboard-operable tabs/carousels/accordions/maps, descriptive labels, and WCAG AA contrast.

## Technical approach
- Keep TanStack Start and Tailwind v4; the home route will be client-only for the 3D experience while retaining route metadata.
- Use React Three Fiber v9 and drei v10 because this project uses React 19; this supersedes the brief’s React 18-era v8/v9 pin while preserving the requested behavior.
- Use lightweight custom shaders/materials only where they visibly improve coal cracks and surface identity; avoid unnecessary post-processing.
- Record the data-driven single-page and 3D performance architecture in `AGENTS.md`.

## Verification
- Check 375px, 768px, 1280px, and 1440px layouts for readable text, stable canvas framing, and no overlap.
- Exercise every navigation item, CTA, phone/WhatsApp link, product tab, globe lane, map hub, rate filter/search/sort/export/estimator/quote, carousel, FAQ search/accordion, contact validation, and product-prefilled enquiry.
- Verify WebGL fallbacks and reduced-motion behavior.
- Run targeted tests, inspect the rendered scenes with screenshots, and finish only with clean build, runtime, console, and network signals.
