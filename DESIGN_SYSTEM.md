# Travel Copilot - Light Theme Design System

## Overview
This design system follows the minimalist, professional aesthetic inspired by Apple, Stripe, and Linear. The light theme provides a clean, modern interface optimized for tablet/laptop-first experiences with excellent mobile responsiveness.

## Color Palette

### Background Colors
```css
--color-bg-primary: #ffffff      /* Pure white - main content background */
--color-bg-secondary: #fafafa    /* Subtle gray - page background */
--color-bg-tertiary: #f5f5f5     /* Lighter gray - secondary sections */
--color-bg-hover: #f0f0f0        /* Hover state background */
--color-bg-card: #ffffff         /* Card backgrounds */
--color-bg-elevated: #ffffff     /* Elevated surfaces (modals, popovers) */
```

### Text Colors (Semantic Hierarchy)
```css
--color-text-primary: #111827    /* Primary text - headlines, body */
--color-text-secondary: #374151  /* Secondary text - descriptions */
--color-text-tertiary: #6b7280   /* Tertiary text - labels, captions */
--color-text-muted: #9ca3af      /* Muted text - placeholders */
--color-text-disabled: #d1d5db   /* Disabled state text */
```

### Border Colors
```css
--color-border: #e5e7eb          /* Default borders */
--color-border-primary: #e5e7eb  /* Primary borders */
--color-border-secondary: #d1d5db /* Secondary borders (stronger) */
--color-border-light: #f3f4f6    /* Subtle borders */
--color-border-strong: #9ca3af   /* Strong borders */
```

### Surface Colors (Interactive Elements)
```css
--color-surface-default: #ffffff  /* Default surface */
--color-surface-hover: #f9fafb    /* Hover state */
--color-surface-active: #f3f4f6   /* Active/pressed state */
--color-surface-subtle: #fafafa   /* Subtle background variation */
```

### Brand Colors - Primary (Blue)
```css
--color-primary-500: #3b82f6  /* Main primary color */
--color-primary-600: #2563eb  /* Hover state */
--color-primary-700: #1d4ed8  /* Active state */
--color-primary-100: #dbeafe  /* Light background for selections */
```

### Brand Colors - Accent (Coral/Orange)
```css
--color-accent-500: #f97316   /* Main accent color */
--color-accent-600: #ea580c   /* Hover state */
--color-accent-700: #c2410c   /* Active state */
```

### Semantic Colors
```css
--color-success: #10b981       /* Success states */
--color-warning: #f59e0b       /* Warning states */
--color-error: #ef4444         /* Error states */
--color-info: #3b82f6          /* Info states */
```

## Typography

### Font Families
- **Sans-serif**: Inter (primary interface font)
- **Monospace**: JetBrains Mono (code, technical content)

### Type Scale (Mobile-First)
```
Display:   36px/40px - Hero headlines
H1:        30px/36px - Page titles
H2:        24px/32px - Section headers
H3:        20px/28px - Card titles
Body:      16px/24px - Default text (1rem)
Small:     14px/20px - Secondary text
Tiny:      12px/16px - Captions, meta info
```

### Font Weights
- Regular: 400 (body text)
- Medium: 500 (buttons, emphasis)
- Semibold: 600 (headings)
- Bold: 700 (strong emphasis)

## Spacing System

Based on 8px grid system:

```css
4px   (0.25rem) - Tight spacing between related items
8px   (0.5rem)  - Small spacing
16px  (1rem)    - Default medium spacing
24px  (1.5rem)  - Section spacing
32px  (2rem)    - Large spacing between sections
48px  (3rem)    - Hero/major section spacing
```

## Border Radius

```css
--radius-sm:   0.375rem (6px)  - Small elements (tags, badges)
--radius-md:   0.5rem (8px)    - Buttons, inputs
--radius-lg:   0.75rem (12px)  - Cards, modals
--radius-xl:   1rem (16px)     - Large cards
--radius-2xl:  1.5rem (24px)   - Hero sections
```

## Shadows

Subtle shadows optimized for light backgrounds:

```css
--shadow-xs:       /* Minimal shadow for subtle elevation */
--shadow-sm:       /* Small cards, dropdowns */
--shadow-md:       /* Standard cards */
--shadow-lg:       /* Modals, popovers */
--shadow-xl:       /* Large modals, drawers */
--shadow-card:     /* Default card shadow */
--shadow-elevated: /* Hover state elevation */
```

## Transitions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)  /* Quick interactions */
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1)  /* Standard transitions */
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)  /* Smooth, noticeable */
```

## Component Patterns

### Cards
```tsx
// Standard card
<div className="card">
  {/* Content */}
</div>

// Hoverable card
<div className="card-hover">
  {/* Content */}
</div>

// Elevated card (no border)
<div className="card-elevated">
  {/* Content */}
</div>
```

### Buttons
- Primary: Blue background, white text
- Secondary: Gray background, dark text
- Outline: Border only, transparent background
- Ghost: No background, minimal styling

### Input Fields
```tsx
<input className="input-base" />
```
- Default: White background, subtle border
- Hover: Darker border
- Focus: Blue border + blue ring shadow
- Error: Red border + red ring shadow

### Focus States
```tsx
// Standard focus ring
<button className="focus-ring">Click me</button>

// Inset focus ring (for dark backgrounds)
<button className="focus-ring-inset">Click me</button>
```

## Accessibility

### Contrast Ratios
All text colors meet WCAG AA standards:
- Primary text on white: 14.7:1 (AAA)
- Secondary text on white: 9.2:1 (AAA)
- Tertiary text on white: 4.6:1 (AA)

### Focus Indicators
- 2px blue ring with 2px offset
- Always visible on keyboard navigation
- Color: primary-500 (#3b82f6)

### Color Usage
- Never rely on color alone for information
- Include icons or text labels for status
- Use sufficient color contrast for all interactive elements

## Responsive Breakpoints

Following tablet/laptop-first approach:

```css
sm:  640px   /* Large phones */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large displays */
```

## Empty States

Empty states should:
1. Use muted text colors (--color-text-tertiary)
2. Include an icon (--color-icon-tertiary)
3. Provide clear guidance on next actions
4. Use card or subtle background for containment

Example:
```tsx
<div className="card text-center py-12">
  <div className="text-icon-tertiary mb-4">
    {/* Icon */}
  </div>
  <h3 className="text-text-secondary mb-2">No items yet</h3>
  <p className="text-text-tertiary mb-6">
    Get started by creating your first item
  </p>
  <button>Create Item</button>
</div>
```

## Z-Index Layers

```css
--z-base: 0           /* Base layer */
--z-dropdown: 1000    /* Dropdowns, select menus */
--z-sticky: 1100      /* Sticky headers */
--z-fixed: 1200       /* Fixed elements */
--z-modal-backdrop: 1300  /* Modal backdrops */
--z-modal: 1400       /* Modals */
--z-popover: 1500     /* Popovers, tooltips context */
--z-tooltip: 1600     /* Tooltips (highest) */
```

## Best Practices

### DO:
- Use design tokens (CSS variables) for all colors
- Maintain consistent spacing using the 8px grid
- Apply subtle shadows for depth
- Use smooth transitions on interactive elements
- Follow the text hierarchy for readability
- Test with keyboard navigation

### DON'T:
- Hardcode colors in components
- Use more than 2-3 font weights in a single view
- Over-use shadows (subtle is better)
- Create inconsistent border radius values
- Skip focus states on interactive elements
- Ignore responsive considerations

## Code Examples

### Example Card Component
```tsx
export function TravelCard({ title, description, image }) {
  return (
    <div className="card-hover p-6 space-y-4">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-xl font-semibold text-text-primary">
        {title}
      </h3>
      <p className="text-text-secondary">
        {description}
      </p>
      <button className="btn-base bg-primary-500 text-white px-4 py-2 hover:bg-primary-600 focus-ring">
        View Details
      </button>
    </div>
  );
}
```

### Example Empty State
```tsx
export function EmptyState({ title, description, action }) {
  return (
    <div className="bg-bg-primary border border-border rounded-lg p-12 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg-tertiary flex items-center justify-center">
        <IconPlane className="w-8 h-8 text-icon-tertiary" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {title}
      </h3>
      <p className="text-text-tertiary mb-6 max-w-sm mx-auto">
        {description}
      </p>
      {action}
    </div>
  );
}
```

## Visual Hierarchy Tips

1. **Use Size**: Larger elements draw more attention
2. **Use Weight**: Bold text stands out more
3. **Use Color**: Primary text > Secondary > Tertiary
4. **Use Space**: More whitespace = more emphasis
5. **Use Contrast**: Dark on light creates hierarchy
6. **Use Shadows**: Subtle elevation adds importance

## Performance Considerations

- All CSS variables are compiled at build time
- Transitions use GPU-accelerated properties (transform, opacity)
- Shadows are optimized for rendering performance
- Font loading uses swap strategy to prevent FOIT

---

**Last Updated**: 2025-12-14
**Design System Version**: 1.0.0
