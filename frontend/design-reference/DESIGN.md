---
name: Crimson Sentinel
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#292a2a'
  surface-container-highest: '#343535'
  on-surface: '#e3e2e2'
  on-surface-variant: '#e1bfbb'
  inverse-surface: '#e3e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#a88a86'
  outline-variant: '#59413e'
  surface-tint: '#ffb4ac'
  primary: '#ffb4ac'
  on-primary: '#690007'
  primary-container: '#991b1b'
  on-primary-container: '#ffaaa1'
  inverse-primary: '#b02d29'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#c8c6c6'
  on-tertiary: '#303030'
  tertiary-container: '#4e4e4e'
  on-tertiary-container: '#c1bfbf'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ac'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#8e1214'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#121414'
  on-background: '#e3e2e2'
  surface-variant: '#343535'
typography:
  display-lg:
    fontFamily: IBM Plex Serif
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: IBM Plex Serif
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-sm:
    fontFamily: IBM Plex Serif
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1440px
---

## Brand & Style

The design system is built upon a philosophy of **High-Signal Minimalism**, blending the raw utility of an engineering console with the sophisticated hierarchy of a premium editorial publication. It is designed for elite technical environments where focus is the primary currency.

The visual language is "Command & Control" meets "Thought Leadership." It utilizes a **Dark Mode Only** interface to reduce eye strain during deep work. The aesthetic is defined by:
- **Precision:** Perfect grid alignment and surgical use of color.
- **Authority:** High-contrast typography and a "no-fluff" approach to information density.
- **Calm:** Deep, monochromatic surfaces that recede into the background, allowing code and content to take center stage.

## Colors

This design system uses a restricted, high-drama palette to maintain a serious, professional tone.

- **Primary (Crimson):** Used exclusively for high-priority actions, critical status alerts, and active progress markers. It should never exceed 5% of the total screen real estate.
- **Surface (Deep Charcoal):** Defines the structural containers. It provides enough contrast against the near-black background to establish hierarchy without needing heavy shadows.
- **Neutrals:** A range of grays from Zinc-800 for borders to Zinc-400 for secondary metadata.
- **Success/Warning:** Use muted variations of emerald and amber only when functional (e.g., test cases passing), keeping them desaturated to avoid clashing with the Crimson brand color.

## Typography

The typography strategy employs a "Dual-Track" system:
1. **Editorial Track (IBM Plex Serif):** Used for headlines and philosophical content. This grounds the platform in tradition and authority.
2. **Functional Track (Inter & JetBrains Mono):** Inter handles all standard UI and body copy for maximum legibility. JetBrains Mono is utilized for all technical data, labels, and code input to reinforce the engineering console aesthetic.

**Scaling:** On mobile devices, `display-lg` should scale down to 32px (matching `headline-lg`) to maintain readability within a tighter viewport.

## Layout & Spacing

The layout philosophy alternates between **Editorial Breathing Room** and **Technical Density**:

- **Marketing & Results Screens:** Use a 12-column fixed grid with wide 64px margins and generous vertical padding (80px+) to create a premium, relaxed reading experience.
- **Interview Console:** Switches to a fluid, 0-margin "Full-Screen Workspace" model. Use a 2px visual separator between IDE panes. Gutters are reduced to 12px within the technical workspace to maximize "code-above-the-fold."
- **Rhythm:** All spacing must be multiples of 4px. Use 16px for related elements and 32px for section blocks.

## Elevation & Depth

This design system avoids traditional soft shadows in favor of **Tonal Layering and Sharp Outlines**:

- **Level 0 (Base):** #0A0A0A. Used for the main app background.
- **Level 1 (Surface):** #1A1A1A. Used for cards, code editors, and sidebars.
- **Level 2 (Overlay):** #262626. Used for modals and dropdowns.
- **Borders:** Instead of shadows, use 1px solid strokes in #262626 (low contrast) or #404040 (high contrast) to define boundaries. 
- **Active State:** A "Crimson Glow" may be used sparingly on the active input or primary button, defined as a subtle 8px blur with 20% opacity using the primary crimson color.

## Shapes

The shape language is **Strict and Architectural**. 

- **Components:** Standard buttons and cards use a 4px (Soft) corner radius. This provides a hint of modern refinement while maintaining a professional, rigid structure.
- **Technical Elements:** Code blocks, tabs, and input fields should remain sharp or use a maximum of 2px radius to mimic the feel of classic terminal interfaces.
- **Icons:** Use 2px stroke weight with square caps and joins to match the typographic weight of the headings.

## Components

### Buttons
- **Primary:** Solid #991B1B with white text. No gradient. High-contrast.
- **Secondary:** Outlined with a 1px stroke of #404040. Text is #A3A3A3. On hover, the border brightens to #F5F5F5.
- **Ghost:** Text only in #A3A3A3. Used for low-priority terminal commands.

### Input Fields
- **Technical Input:** Darker than the surface (#0F0F0F) with a 1px border. Focus state changes the border to Crimson (#991B1B) with a monospaced caret.
- **Code Editor:** No visible border, defined by the surface color change. Line numbers in #404040.

### Badges & Chips
- **Status Badges:** Small, caps-only monospace text. "Running" status uses a pulsed Crimson dot icon next to the label.
- **Tags:** Dark gray background (#262626) with #A3A3A3 text, 2px roundedness.

### Progress Indicators
- **Linear Progress:** A 2px thin line. The track is #1A1A1A, the fill is #991B1B. No rounded ends—keep them flat/butt-capped for a technical feel.

### Cards
- **Editorial Cards:** No background fill, 1px #262626 border, 24px internal padding.
- **Metric Cards:** #1A1A1A background, Crimson left-accent border (3px width) to denote importance.