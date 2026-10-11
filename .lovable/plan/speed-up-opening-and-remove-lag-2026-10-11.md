# Speed up opening and remove lag

## What you'll notice
- The page appears almost instantly; 3D visuals fade in afterwards instead of holding up the first screen.
- Scrolling feels native and smooth, no hanging on lower-end phones/laptops.
- 3D visuals pause when off-screen or when the tab is hidden.

## Changes
1. **Load 3D later**: split the 3D scenes (Three.js, ~600KB) out of the first download. Show a light static placeholder first, load the 3D after the page is idle and the section is near view.
2. **Lighter 3D rendering**: lower max sharpness from 1.75x to 1.25x (1x on phones), turn off antialiasing for background scenes, render only when visible, drop the heavy lighting environment, fewer particles.
3. **Remove the smooth-scroll script** (Lenis) that runs every frame; use the browser's native smooth scrolling instead.
4. **Lighter scroll handling**: header scroll check only updates when state changes; progress bar kept but cheap.
5. **Faster hero image**: preload the hero photo, serve a compressed WebP version, mark it high priority.
6. **Skip 3D entirely** for users with "reduce motion" or very small/low-power devices, showing the static image.

## Technical details
- `React.lazy` + `ClientOnly` wrapper around `Scenes.tsx`, imported via dynamic import in `DhanrajSite.tsx`; `requestIdleCallback` gate.
- Canvas: `dpr={[1,1.25]}`, `frameloop` toggled `"always"`/`"never"` by intersection + `visibilitychange`, `powerPreference: "low-power"`, remove `Environment/Lightformer`.
- Remove `lenis` usage; `html { scroll-behavior: smooth }`.
- Verify with Playwright: time to first content, JS size of initial load, no console errors, desktop + mobile.
- Update AGENTS.md rule: 3D scenes must be lazy-loaded outside the initial bundle.
