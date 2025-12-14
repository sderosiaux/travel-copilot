# Travel Copilot Navigation Structure
## Visual Organization Guide

**Date:** 2025-12-14

---

## Overview: 3-Tier Navigation System

The navigation is organized into three distinct tiers to balance discoverability with cognitive load:

```
┌─────────────────────────────────────────────────────────────────┐
│                    TIER 1: PRIMARY NAVIGATION                    │
│                     (Sidebar - 8 items)                          │
│                  Always visible, main journeys                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  TIER 2: CONTEXTUAL NAVIGATION                   │
│                        (15 features)                             │
│              Shown within relevant pages/contexts                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   TIER 3: UTILITY NAVIGATION                     │
│                   (Command Palette - 8 items)                    │
│              Quick access via Cmd+K or button click              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tier 1: Primary Sidebar Navigation

### Desktop View (Expanded)

```
┌──────────────────────────────┐
│  TC  Travel Copilot          │
├──────────────────────────────┤
│                              │
│  🏠  Dashboard               │
│  ✈️   Trips                   │
│  🛫  Flights                 │
│  📋  Briefing                │
│  📄  Documents               │
│  👥  Family                  │
│  ✅  Check-in                │
│  ⚙️   Settings                │
│                              │
├──────────────────────────────┤
│  ⌘   Quick Actions      ⌘K   │
└──────────────────────────────┘
```

### Desktop View (Collapsed)

```
┌──────┐
│  TC  │
├──────┤
│  🏠  │
│  ✈️   │
│  🛫  │
│  📋  │
│  📄  │
│  👥  │
│  ✅  │
│  ⚙️   │
├──────┤
│  ⌘   │
└──────┘
```

### Mobile View (Bottom Tabs)

```
┌────────────────────────────────────┐
│                                    │
│        Main Content Area           │
│                                    │
├────────────────────────────────────┤
│  🏠     ✈️      🛫    ✅     ⋯      │
│ Home  Trips  Flights Check-in More │
└────────────────────────────────────┘
```

### Navigation Items Detail

| Icon | Label | Route | Purpose |
|------|-------|-------|---------|
| 🏠 | Dashboard | `/` | Overview hub, upcoming trips, quick actions |
| ✈️ | Trips | `/trips` | Manage all trips, view itineraries |
| 🛫 | Flights | `/flights` | View and track all flight bookings |
| 📋 | Briefing | `/briefing` | Pre-trip preparation and checklists |
| 📄 | Documents | `/documents` | Passports, visas, travel documents |
| 👥 | Family | `/family` | Manage travelers and family members |
| ✅ | Check-in | `/check-in` | Online check-in for upcoming flights |
| ⚙️ | Settings | `/settings` | App preferences and account settings |

---

## Tier 2: Contextual Navigation

### Trip Detail Page (`/trips/[id]`)

```
┌──────────────────────────────────────────────────────────────┐
│  Trip: Paris 2025                                  Feb 1-7   │
├──────────────────────────────────────────────────────────────┤
│  [Overview] [Timeline] [Expenses] [Packing] [Reviews]        │
├────────────────────────────────┬─────────────────────────────┤
│                                │                             │
│  Main Trip Content             │  ☁️ Weather Widget          │
│                                │  ━━━━━━━━━━━━━━━━━━━        │
│  - Flight details              │  Paris, France              │
│  - Hotel bookings              │  72°F, Sunny                │
│  - Activities                  │  5-day forecast...          │
│                                │                             │
│                                │  🕐 Timezone Widget         │
│                                │  ━━━━━━━━━━━━━━━━━━━        │
│                                │  CET (UTC+1)                │
│                                │  6 hours ahead of home      │
│                                │                             │
│                                │  🚨 Emergency Widget        │
│                                │  ━━━━━━━━━━━━━━━━━━━        │
│                                │  Emergency: 112             │
│                                │  US Embassy: +33...         │
│                                │                             │
│                                │  📤 [Share Trip]            │
└────────────────────────────────┴─────────────────────────────┘
```

**Tab Navigation:**
- **Overview:** Trip summary, key details
- **Timeline:** Day-by-day itinerary
- **Expenses:** Budget tracking, receipts
- **Packing:** Checklist, recommendations
- **Reviews:** Rate places visited

**Sidebar Widgets:**
- **Weather:** Real-time forecast for destination
- **Timezone:** Local time, jet lag info
- **Emergency:** Contacts, embassy info
- **Share:** Share trip with family/friends

### Flight Detail Page (`/flights/[id]`)

```
┌──────────────────────────────────────────────────────────────┐
│  Flight AA123: JFK → LAX                       Feb 1, 8:00 AM │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  Flight Status: On Time                                        │
│  Seat: 12A (Window)                    Gate: B22              │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ 🪑 View      │  │ ☕ Find       │  │ 🔄 Check      │       │
│  │ Seat Map     │  │ Lounges      │  │ Alternatives  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                                │
│  ✈️ JFK Airport Info                                          │
│  Terminal 4 • Security wait: 15 min • [View Map]              │
│                                                                │
│  ✈️ LAX Airport Info                                          │
│  Terminal 1 • Arrival Gate: TBD • [View Map]                  │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

**Action Buttons:**
- **View Seat Map:** Opens seat selection interface
- **Find Lounges:** Shows available lounges at departure airport
- **Check Alternatives:** Rebooking options (shown during disruptions)

**Contextual Links:**
- **JFK Airport Info:** Links to `/airports/JFK`
- **LAX Airport Info:** Links to `/airports/LAX`

### Settings Page (`/settings`)

```
┌──────────────────────────────────────────────────────────────┐
│  Settings                                                     │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  Profile & Preferences                                         │
│  ├─ Personal Information                                       │
│  ├─ 🍽️  Meal Preferences                                      │
│  ├─ 🔔 Notifications                                           │
│  └─ 🌐 Language & Region                                       │
│                                                                │
│  Travel Accounts                                               │
│  ├─ 🏆 Loyalty Programs & Rewards                             │
│  ├─ 🛡️  Travel Insurance                                      │
│  └─ 📱 eSIM / SIM Card Preferences                            │
│                                                                │
│  App Settings                                                  │
│  ├─ 🎨 Theme & Appearance                                      │
│  ├─ 🔒 Privacy & Security                                      │
│  └─ 💾 Data Management                                         │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

**Sections:**
- **Profile & Preferences:** Personal info, meal preferences, notifications
- **Travel Accounts:** Loyalty programs, insurance, eSIM settings
- **App Settings:** Theme, privacy, data management

---

## Tier 3: Command Palette (Quick Actions)

### Activation

**Keyboard:**
- Mac: `Cmd + K`
- Windows/Linux: `Ctrl + K`

**Mouse:**
- Click "Quick Actions" button at bottom of sidebar

### Interface

```
┌──────────────────────────────────────────────────────────┐
│  🔍 Search actions and pages...                          │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  UTILITIES                                                │
│  💱 Currency Converter                                    │
│  🕐 Timezone Converter                                    │
│  💬 Language Phrases                                      │
│  ☁️  Weather Forecast                                     │
│  📊 Travel Stats                                          │
│  🏆 Achievements                                          │
│  ✨ Recommendations                                        │
│                                                           │
│  ACTIONS                                                  │
│  📤 Share Trip                                            │
│  🔍 Search Everything                                     │
│                                                           │
│  PAGES                                                    │
│  🏠 Go to Dashboard                                       │
│  ✈️  Go to Trips                                          │
│  🛫 Go to Flights                                         │
│                                                           │
├──────────────────────────────────────────────────────────┤
│  ↑↓ Navigate • Enter Select • Esc Close                  │
└──────────────────────────────────────────────────────────┘
```

### Features List

**Utilities:**
- 💱 Currency Converter
- 🕐 Timezone Converter
- 💬 Language Phrases
- ☁️ Weather Forecast
- 📊 Travel Stats
- 🏆 Achievements
- ✨ Recommendations

**Actions:**
- 📤 Share Trip
- 🔍 Search Everything

**Quick Navigation:**
- All primary nav items accessible via keyboard

---

## Complete Feature Map

### All 31 Features Organized

```
PRIMARY (8 items)
├─ 🏠 Dashboard
├─ ✈️  Trips
├─ 🛫 Flights
├─ 📋 Briefing
├─ 📄 Documents
├─ 👥 Family
├─ ✅ Check-in
└─ ⚙️  Settings

CONTEXTUAL (15 items)
├─ Within Trips
│  ├─ 📅 Timeline
│  ├─ 💰 Expenses
│  ├─ 🎒 Packing
│  ├─ ⭐ Reviews
│  ├─ ☁️  Weather (widget)
│  ├─ 🕐 Timezone (widget)
│  └─ 🚨 Emergency (widget)
├─ Within Flights
│  ├─ 🔄 Alternatives
│  ├─ 🪑 Seat Map
│  ├─ ☕ Lounges
│  ├─ ✈️  Departure Airport
│  └─ ✈️  Arrival Airport
└─ Within Settings
   ├─ 🏆 Rewards & Loyalty
   ├─ 🛡️  Insurance
   ├─ 🍽️  Meal Preferences
   └─ 📱 eSIM / SIM

UTILITY (8 items)
├─ 💱 Currency Converter
├─ 🕐 Timezone Converter
├─ 💬 Language Phrases
├─ ☁️  Weather
├─ 📊 Travel Stats
├─ 🏆 Achievements
├─ ✨ Recommendations
└─ 🔍 Search
```

---

## User Journey Navigation Flows

### Journey 1: Planning a Trip

```
1. Dashboard
   └─> View upcoming trips

2. Trips → Create New
   └─> Add destinations, dates

3. Trip Detail Page
   ├─> Add flights
   ├─> Add hotels
   └─> Add activities

4. Briefing
   └─> Review preparation checklist

5. Documents
   └─> Upload passport, check visa requirements

6. Trip Detail → Packing Tab
   └─> Create packing list

7. Trip Detail → Weather Widget
   └─> Check destination forecast
```

### Journey 2: Flight Day

```
1. Dashboard
   └─> See today's flight highlighted

2. Check-in
   └─> Online check-in for flight

3. Flight Detail
   ├─> View flight status
   └─> Check gate, terminal

4. Flight Detail → Seat Map
   └─> Confirm or change seat

5. Flight Detail → Find Lounges
   └─> View lounge access options

6. Flight Detail → JFK Airport
   └─> Terminal map, security wait times
```

### Journey 3: At Destination

```
1. Trip Detail → Timeline
   └─> View today's itinerary

2. Trip Detail → Expenses
   └─> Log spending

3. Quick Actions (⌘K) → Currency
   └─> Convert prices

4. Quick Actions (⌘K) → Phrases
   └─> Translate common phrases

5. Trip Detail → Weather Widget
   └─> Check daily forecast

6. Trip Detail → Emergency Widget
   └─> Access emergency contacts if needed
```

### Journey 4: Post-Trip

```
1. Trip Detail → Expenses
   └─> Review total spending

2. Trip Detail → Reviews Tab
   └─> Rate restaurants, attractions

3. Quick Actions (⌘K) → Stats
   └─> View travel statistics

4. Quick Actions (⌘K) → Achievements
   └─> See unlocked badges
```

---

## Feature Discovery Patterns

### Progressive Disclosure Strategy

**First-Time User Experience:**

```
Day 1: Show only primary navigation (8 items)
       └─> User learns core features

Day 3: Tooltip highlights "Quick Actions" button
       └─> User discovers utility features

Week 1: When user views trip detail for first time
        └─> Contextual tabs and widgets appear
        └─> Brief tooltip explains tabs

Week 2: Smart suggestions based on behavior
        └─> "Did you know you can track expenses?"
        └─> "Check out the weather widget"
```

### Contextual Feature Triggers

| Feature | Trigger Condition | Presentation |
|---------|------------------|--------------|
| Seat Map | User views flight within 7 days | "View Seat Map" button |
| Lounges | User at airport (geolocation) | Prominent banner + notification |
| Alternatives | Flight delayed/cancelled | Alert with "Check Alternatives" |
| Weather Widget | User opens trip detail | Sidebar widget (always visible) |
| Emergency Widget | User in destination country | Sidebar widget (location-based) |
| Check-in | Flight within 24 hours | Dashboard banner + notification |

---

## Mobile Navigation Adaptations

### Bottom Tab Bar (Primary)

```
┌────────────────────────────────────┐
│  🏠     ✈️      🛫    ✅     ⋯      │
│ Home  Trips  Flights Check-in More │
└────────────────────────────────────┘
```

### "More" Menu (Secondary)

```
┌──────────────────────────────────┐
│  More                            │
├──────────────────────────────────┤
│  📋 Briefing                     │
│  📄 Documents                    │
│  👥 Family                       │
│  ☕ Lounges                       │
│  💱 Currency                     │
│  💬 Phrases                       │
│  📊 Stats                         │
│  ⚙️  Settings                     │
└──────────────────────────────────┘
```

### Mobile Gestures

- **Swipe left/right:** Switch between tabs (on trip/flight detail pages)
- **Pull to refresh:** Update flight status, weather
- **Long press:** Quick actions menu
- **Pinch:** Zoom seat maps, airport maps

---

## Accessibility Features

### Keyboard Navigation

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Open command palette |
| `Tab` | Navigate through items |
| `Enter` | Select/activate |
| `Esc` | Close palette/modal |
| `↑↓` | Navigate list items |
| `/` | Focus search |

### Screen Reader Support

- All icons have `aria-label` attributes
- Navigation structure uses semantic HTML
- Active states announced
- Tooltips read as descriptions
- Keyboard focus indicators visible

### Visual Indicators

- **Active page:** Primary color background, white text
- **Hover state:** Subtle background color change
- **Focus state:** Clear outline (2px primary color)
- **Badge notifications:** Red dot with number
- **Loading states:** Skeleton screens, spinners

---

## Analytics & Metrics

### Navigation Usage Tracking

**Events to Track:**
```javascript
// Primary navigation clicks
trackEvent('nav_primary_click', { item: 'trips' })

// Command palette usage
trackEvent('command_palette_open', { method: 'keyboard' })
trackEvent('command_palette_select', { item: 'currency' })

// Contextual feature usage
trackEvent('contextual_tab_click', { page: 'trip_detail', tab: 'expenses' })
trackEvent('contextual_widget_interact', { widget: 'weather' })

// Feature discovery
trackEvent('feature_discovered', { feature: 'packing_list', method: 'tab_click' })

// Mobile navigation
trackEvent('mobile_tab_click', { tab: 'flights' })
trackEvent('mobile_more_menu_open')
```

**Success Metrics:**
- Feature discovery rate: % of users accessing each feature
- Time to find feature: Avg clicks/time to reach any feature
- Command palette adoption: % of users using Cmd+K weekly
- Contextual engagement: Interaction rate with tabs/widgets
- Mobile usability: Task completion rate on mobile

---

## Design System References

### Color Coding

**Navigation States:**
- Active: `bg-primary-500 text-white`
- Hover: `bg-bg-tertiary`
- Default: `text-text-secondary`
- Focus: `ring-2 ring-primary-500`

**Feature Categories:**
- Core Travel: Blue tones
- Utilities: Purple tones
- Contextual: Adaptive (matches parent page)

### Icon System

All icons from Lucide React library:
- Consistent 20px size in navigation
- 16px in command palette
- 24px in contextual action buttons

### Spacing

- Sidebar item padding: `12px vertical, 12px horizontal`
- Tab padding: `8px vertical, 16px horizontal`
- Widget margins: `16px between widgets`
- Mobile touch targets: Minimum 48px

---

## Implementation Checklist

### Phase 1: Foundation (Week 1)
- [x] Update navigation constants
- [x] Update sidebar component with new nav
- [x] Add Quick Actions button
- [ ] Test navigation rendering
- [ ] Test active states
- [ ] Mobile responsive check

### Phase 2: Contextual (Week 2)
- [ ] Implement tab navigation component
- [ ] Build weather widget
- [ ] Build timezone widget
- [ ] Build emergency widget
- [ ] Add contextual action buttons
- [ ] Test contextual triggers

### Phase 3: Command Palette (Week 3)
- [ ] Install `cmdk` library
- [ ] Build command palette component
- [ ] Add keyboard shortcuts
- [ ] Implement fuzzy search
- [ ] Add analytics tracking

### Phase 4: Mobile (Week 4)
- [ ] Refactor mobile nav to bottom tabs
- [ ] Build "More" menu component
- [ ] Test touch targets
- [ ] Test gestures
- [ ] Performance optimization

---

## Summary

This 3-tier navigation system solves the discoverability problem by:

1. **Primary Navigation (8 items):** Core features always visible in sidebar
2. **Contextual Navigation (15 items):** Features appear when relevant
3. **Utility Navigation (8 items):** Quick access via command palette

**Key Benefits:**
- 300% improvement in feature discoverability (9 → 31 accessible features)
- Reduced cognitive load (8 vs 30 top-level items)
- Modern UX patterns (Linear, Notion, Stripe)
- Mobile-optimized with bottom tabs
- Accessible with keyboard shortcuts and screen readers

**Next Steps:**
1. Stakeholder approval
2. Begin Phase 1 implementation
3. User testing with 5-10 participants
4. Iterate based on feedback
