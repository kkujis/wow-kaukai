# WoW Forever "Kaukai" Guild Website - Session Catchup

## Current State
- `index.html`: The main landing page. Cleaned up HTML, removed emojis, updated to a professional yet "cozy forest/camp" aesthetic.
- `testas.html`: A standalone 30-question interactive personality quiz that assigns a class and race based on real-life personality, complete with logic and a "Copy to Discord" feature.
- `landingv3_old.html`: An old, deprecated version of the landing page. Completely ignore this file moving forward.
- `cozy_forest_camp.jpg`: The current global background image.

## Key Design Decisions
- **Typography**: `Cinzel` is used for all headers, navigation, and buttons to maintain a classic, stylized WoW fantasy feel. `Inter` is used for all body text to ensure maximum readability, especially on modern high-resolution screens.
- **Scaling (1440p Optimized)**: Base font size is `1.15rem`. Headings are significantly enlarged (e.g., `4.5rem` for the hero `h1`) to scale perfectly on 1440p monitors.
- **Visuals & Layout**:
  - The site relies on "glassmorphism" (translucent dark backgrounds with an 8px blur) to ensure text legibility against the background image without hiding it completely.
  - The `#hero` section is kept completely transparent and borderless.
  - Most sections and the loot promo block feature a warm, amber `box-shadow` (`rgba(198, 156, 109, 0.25)`) to simulate the glow of a campfire.
  - The primary Call-to-Action button (Personažo Testas) has a highly pronounced amber glow effect that intensifies dramatically on hover.
  - The Roster and Loot Rules (SR+1) have been strictly partitioned into their own distinct sections with context provided.

## Next Steps
- Validate if any additional pages (e.g., specific class guides or detailed rules) need to be created.
- Consider moving CSS to an external `styles.css` file if `index.html` and `testas.html` continue to expand and share visual properties.
- Further refine mobile responsiveness if needed.
