# Minimalist Coastal Theme Refresh

## Goal
Restyle the existing Dhanraj Coal Transport website with the supplied palette — `#01161E`, `#124559`, `#598392`, `#AEC3B0`, and `#EFF6E0` — to create a cleaner, calmer, more trustworthy experience that keeps attention on the business, products, rates, and quote actions.

## Plan

### 1. Rebuild the visual system around the new palette
- Use deep ink (`#01161E`) for the main background and strongest text contrast.
- Use dark teal (`#124559`) for elevated sections and structured surfaces.
- Use steel blue (`#598392`) for primary actions, links, active controls, and data highlights.
- Use sage (`#AEC3B0`) for secondary accents and positive states.
- Use soft ivory-green (`#EFF6E0`) for primary text and selected high-contrast areas.
- Update all semantic color, gradient, glow, border, and shadow tokens so the palette remains consistent throughout the site.

### 2. Simplify the presentation
- Remove the ember/fire visual language, orange glows, heavy gradients, strong grain, and overly dramatic card treatments.
- Reduce decorative borders and effects while improving whitespace, alignment, and typographic hierarchy.
- Restyle navigation, buttons, product tabs, rate filters, forms, tables, testimonials, FAQs, contact details, and mobile controls as one cohesive minimalist system.
- Keep cards purposeful and restrained, with subtle separation instead of visual noise.

### 3. Retheme the interactive visuals
- Recolor the coal, product, globe, route, lighting, fog, and particle scenes using teal, steel blue, sage, and ivory accents.
- Reduce particle intensity and glow so the 3D work supports the page instead of competing with its content.
- Restyle the transport strip and India network map to match the calmer direction.

### 4. Preserve conversion and functionality
- Keep all existing business copy, datasets, section order, quote flows, phone and WhatsApp actions, product viewer, network controls, rates, calculator, FAQ search, and contact form unchanged.
- Maintain strong contrast and clear primary actions so the minimalist treatment remains easy to scan and use.
- Update the browser theme color to match the new deep-ink background.

## Technical details
- Centralize the palette in semantic tokens within the global stylesheet; presentation code continues to consume those roles.
- Replace remaining hardcoded scene colors with a shared palette export so the 3D visuals stay synchronized with the interface.
- Preserve the current data-driven content structure and client-only, performance-capped Three.js architecture.

## Verification
- Review desktop and mobile layouts for readability, contrast, consistent spacing, and visual balance.
- Verify navigation, product tabs, network lanes, rate search/filter/export/calculator, FAQ, quote actions, and contact submission still work.
- Confirm the page has no leftover orange/ember styling, overlaps, runtime errors, or build errors.
