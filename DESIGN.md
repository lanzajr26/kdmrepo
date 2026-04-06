# Design System Document: The Archive of Stone and Sin

## 1. Overview & Creative North Star

### Creative North Star: "The Lantern’s Reach"
This design system is not a mere utility; it is a digital artifact recovered from a world of perpetual darkness. The "Lantern's Reach" philosophy dictates that the UI represents a fleeting circle of light in a crushing void. To achieve this, we move away from standard "app" layouts toward a **Gritty Editorial** experience. 

The interface should feel like a weathered survivor's journal or an ancient stone monolith. We break the "template" look through intentional asymmetry, overlapping elements that mimic physical cards scattered on a table, and a brutalist approach to typography where scale communicates urgency and lore.

## 2. Colors

The palette is anchored in the crushing obsidian of the *Kingdom Death* universe, punctuated by the visceral heat of blood and the cold glimmer of starlight.

### Core Palette
- **Primary Color:** The brand's most distinctive chromatic color, currently set to `#000000`. Suitable for buttons, CTAs, and key interactive elements.
- **Secondary Color:** A supporting color for less prominent UI elements, chips, and secondary actions, currently `#848484`.
- **Tertiary Color:** An additional accent color for highlights, badges, or decorative elements, currently `#D4AF37`.
- **Neutral Color:** A neutral base color for backgrounds, surfaces, and non-chromatic elements, currently `#111111`.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders for sectioning or containers. 
Structure must be defined through **Tonal Shifts**. To separate a sidebar from a main feed, transition from `surface` to `surface_container_low`. To define a card, place a `surface_container_high` object over a `surface` background. Let the change in value define the edge, not a mechanical line.

### Glass & Gradient
To provide visual "soul," use subtle gradients on primary CTAs—transitioning from `primary` (#ffb4a8) to `primary_container` (#990000) at a 45-degree angle. For floating overlays (e.g., character detail modals), use a semi-transparent `surface_variant` with a 12px backdrop blur to create a "frosted obsidian" effect.

## 3. Typography

The typography is a marriage of classic serif authority and modern technical precision.

- **Display & Headlines (`notoSerif`):** Used for character names and major section headers. The serif conveys the weight of history and the "weathered journal" aesthetic. Use `display-lg` (3.5rem) for hero moments to create an editorial, high-contrast feel.
- **Body & Technical Specs (`inter`):** Used for ability descriptions and survivor stats. `inter` provides the necessary legibility for complex game mechanics.
- **Labels & Meta-Data (`spaceGrotesk`):** Used for small, technical labels like "XP," "Insanity," or "Survival." This monospaced-leaning font feels like a stamp on a physical component.

## 4. Elevation & Depth

In this system, depth is "carved" rather than "built."

### The Layering Principle
Hierarchy is achieved by stacking surface-container tiers.
1. **Base Layer:** `surface` (#131313)
2. **Section Layer:** `surface_container_low` (#1c1b1b)
3. **Interactive Card:** `surface_container_high` (#2a2a2a)
4. **Floating Action/Tooltip:** `surface_container_highest` (#353534)

### Ambient Shadows
Shadows must be "Ghost Shadows." Use large blur values (20px+) with low opacity (6%) using a tinted version of `on_surface`. This mimics a soft lantern glow rather than a harsh digital drop shadow.

### The "Ghost Border" Fallback
If an element requires an edge for accessibility (e.g., an input field in a low-contrast environment), use the `outline_variant` token at **15% opacity**. This creates a suggestion of an edge that disappears into the darkness.

## 5. Components

### Buttons
- **Primary:** Gradient from `primary` to `primary_container`. Square corners (`rounded-none`) to feel like stone tiles. No border.
- **Secondary:** `surface_container_highest` background with `on_surface` text. 
- **Tertiary/Ghost:** No background. Text-only with a 1px "Ghost Border" (15% opacity) on hover.

### Survivor Cards
Forbid divider lines. Use `body-sm` typography with high `letter-spacing` for headers and separate content blocks using ample vertical whitespace. If a card contains multiple attributes (Strength, Evasion, etc.), use a subtle `surface_container_low` background for the "value" box to make it feel recessed into the card.

### Input Fields
Avoid the "box" look. Use a `surface_container_lowest` background with sharp, angular corners (`rounded-none`). The focus state should be indicated by a `tertiary` (#e9c349) bottom-border (2px) only, suggesting a gold inlay.

### Status Toggles (Checkboxes/Radio)
Instead of standard circles/squares, use custom "Diamond" shapes for checkboxes. When "checked," the diamond should fill with `primary_container` (#990000) and have a faint `primary` outer glow.

### The "Injury" Log
A specialized list component. Instead of lines, use a vertical gradient "Stripe" on the far left of each list item. As injury severity increases, the stripe shifts from `secondary` to `primary_container`.

## 6. Do's and Don'ts

### Do:
- **Do** use intentional asymmetry. Place a large `notoSerif` headline overlapping a `surface_container` card by 20px to break the grid.
- **Do** lean into "Deep Grays." True black (#000000) should be used only for the deepest shadows or background voids.
- **Do** prioritize white space. A gritty atmosphere needs room to breathe to feel "premium" rather than "cluttered."

### Don't:
- **Don't** use 100% opaque, high-contrast white borders. It shatters the "Lantern's Reach" immersion.
- **Don't** use standard Material Design "Ripple" effects. Instead, use a subtle "Inner Glow" or "Color Shift" for hover states.
- **Don't** use iconography that is too "bubbly" or modern. Use thin-stroke, sharp-angled icons that feel etched or carved.
- **Don't** use divider lines between list items. Use the spacing scale (`0.75rem` to `1rem`) to separate data.

---
*Director's Final Note: This system is about the tension between the dark void and the desperate light. Every pixel must feel like it was placed with the weight of a survivor's life behind it.*