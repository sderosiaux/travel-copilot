import {
  LucideIcon,
  Home,
  Plane,
  PlaneTakeoff,
  FileCheck,
  FileText,
  Users,
  CheckSquare,
  Settings,
  Search,
  DollarSign,
  Clock,
  MessageSquare,
  BarChart3,
  Award,
  Star,
  Share2,
  Command,
  Coffee,
  MapPin,
  Utensils,
  Shield,
  Smartphone,
  AlertCircle,
  TrendingUp,
  Package,
  Cloud,
} from 'lucide-react'

// ============================================================================
// PRIMARY NAVIGATION
// ============================================================================
// These items appear in the main sidebar (always visible on desktop)
// Limited to 8 items to follow Miller's Law (7±2) for optimal cognitive load

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  badge?: number // Optional notification badge
  description?: string // For tooltips/accessibility
}

export const PRIMARY_NAV: NavItem[] = [
  {
    href: '/',
    label: 'Dashboard',
    icon: Home,
    description: 'Overview of your trips and upcoming travel',
  },
  {
    href: '/trips',
    label: 'Trips',
    icon: Plane,
    description: 'Manage all your trips and itineraries',
  },
  {
    href: '/flights',
    label: 'Flights',
    icon: PlaneTakeoff,
    description: 'View and manage flight bookings',
  },
  {
    href: '/briefing',
    label: 'Briefing',
    icon: FileCheck,
    description: 'Pre-trip preparation and checklists',
  },
  {
    href: '/documents',
    label: 'Documents',
    icon: FileText,
    description: 'Passports, visas, and travel documents',
  },
  {
    href: '/family',
    label: 'Family',
    icon: Users,
    description: 'Manage travelers and family members',
  },
  {
    href: '/check-in',
    label: 'Check-in',
    icon: CheckSquare,
    description: 'Online check-in for upcoming flights',
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
    description: 'App preferences and account settings',
  },
]

// ============================================================================
// CONTEXTUAL NAVIGATION
// ============================================================================
// These features appear within specific pages/contexts
// Organized by parent page for implementation reference

export interface ContextualFeature {
  id: string
  label: string
  icon: LucideIcon
  type: 'tab' | 'widget' | 'button' | 'section'
  parentRoute: string
  href?: string
  description?: string
}

export const CONTEXTUAL_FEATURES: ContextualFeature[] = [
  // Trip Detail Page Features
  {
    id: 'trip-timeline',
    label: 'Timeline',
    icon: TrendingUp,
    type: 'tab',
    parentRoute: '/trips/[id]',
    href: '/trips/[id]/timeline',
    description: 'Day-by-day trip itinerary',
  },
  {
    id: 'trip-expenses',
    label: 'Expenses',
    icon: DollarSign,
    type: 'tab',
    parentRoute: '/trips/[id]',
    description: 'Track trip spending and budget',
  },
  {
    id: 'trip-packing',
    label: 'Packing',
    icon: Package,
    type: 'tab',
    parentRoute: '/trips/[id]',
    description: 'Packing lists and reminders',
  },
  {
    id: 'trip-reviews',
    label: 'Reviews',
    icon: Star,
    type: 'tab',
    parentRoute: '/trips/[id]',
    description: 'Rate places you visited',
  },
  {
    id: 'trip-weather',
    label: 'Weather',
    icon: Cloud,
    type: 'widget',
    parentRoute: '/trips/[id]',
    description: 'Destination weather forecast',
  },
  {
    id: 'trip-timezone',
    label: 'Timezone',
    icon: Clock,
    type: 'widget',
    parentRoute: '/trips/[id]',
    description: 'Local time and timezone info',
  },
  {
    id: 'trip-emergency',
    label: 'Emergency',
    icon: AlertCircle,
    type: 'widget',
    parentRoute: '/trips/[id]',
    description: 'Emergency contacts and services',
  },

  // Flight Detail Page Features
  {
    id: 'flight-alternatives',
    label: 'Alternatives',
    icon: TrendingUp,
    type: 'button',
    parentRoute: '/flights/[id]',
    href: '/flights/[id]/alternatives',
    description: 'Rebooking options during disruptions',
  },
  {
    id: 'flight-seatmap',
    label: 'Seat Map',
    icon: MapPin,
    type: 'button',
    parentRoute: '/flights/[id]',
    description: 'View and select seats',
  },
  {
    id: 'flight-lounges',
    label: 'Lounges',
    icon: Coffee,
    type: 'button',
    parentRoute: '/flights/[id]',
    href: '/lounges',
    description: 'Find airport lounges',
  },
  {
    id: 'flight-airport-departure',
    label: 'Departure Airport',
    icon: MapPin,
    type: 'button',
    parentRoute: '/flights/[id]',
    href: '/airports/[code]',
    description: 'Terminal info and maps',
  },
  {
    id: 'flight-airport-arrival',
    label: 'Arrival Airport',
    icon: MapPin,
    type: 'button',
    parentRoute: '/flights/[id]',
    href: '/airports/[code]',
    description: 'Terminal info and maps',
  },

  // Settings Page Sections
  {
    id: 'settings-rewards',
    label: 'Rewards & Loyalty',
    icon: Award,
    type: 'section',
    parentRoute: '/settings',
    description: 'Manage loyalty programs and points',
  },
  {
    id: 'settings-insurance',
    label: 'Insurance',
    icon: Shield,
    type: 'section',
    parentRoute: '/settings',
    description: 'Travel insurance information',
  },
  {
    id: 'settings-meals',
    label: 'Meal Preferences',
    icon: Utensils,
    type: 'section',
    parentRoute: '/settings',
    description: 'Dietary restrictions and preferences',
  },
  {
    id: 'settings-sim',
    label: 'eSIM / SIM Cards',
    icon: Smartphone,
    type: 'section',
    parentRoute: '/settings',
    description: 'Mobile connectivity options',
  },
]

// ============================================================================
// COMMAND PALETTE / QUICK ACTIONS
// ============================================================================
// Utility features accessible via keyboard shortcut (Cmd+K / Ctrl+K)
// Or via "Quick Actions" button at bottom of sidebar

export interface QuickAction {
  id: string
  label: string
  icon: LucideIcon
  href?: string
  action?: string // Action identifier for special behaviors
  keywords: string[] // For fuzzy search
  category: 'utility' | 'navigation' | 'action'
  description?: string
}

export const QUICK_ACTIONS: QuickAction[] = [
  // Utilities
  {
    id: 'currency',
    label: 'Currency Converter',
    icon: DollarSign,
    href: '/currency',
    keywords: ['currency', 'convert', 'money', 'exchange', 'rate', 'forex', 'dollar', 'euro'],
    category: 'utility',
    description: 'Convert between currencies',
  },
  {
    id: 'timezone',
    label: 'Timezone Converter',
    icon: Clock,
    href: '/timezone',
    keywords: ['timezone', 'time', 'zone', 'jet lag', 'clock', 'local time', 'utc'],
    category: 'utility',
    description: 'Convert time zones and manage jet lag',
  },
  {
    id: 'phrases',
    label: 'Language Phrases',
    icon: MessageSquare,
    href: '/phrases',
    keywords: ['phrases', 'language', 'translate', 'speak', 'communication', 'dictionary'],
    category: 'utility',
    description: 'Common phrases in different languages',
  },
  {
    id: 'weather',
    label: 'Weather',
    icon: Cloud,
    href: '/weather',
    keywords: ['weather', 'forecast', 'temperature', 'rain', 'climate'],
    category: 'utility',
    description: 'Weather forecasts for destinations',
  },

  // Analytics & Gamification
  {
    id: 'stats',
    label: 'Travel Stats',
    icon: BarChart3,
    href: '/stats',
    keywords: ['stats', 'statistics', 'analytics', 'data', 'numbers', 'metrics', 'insights'],
    category: 'utility',
    description: 'Your travel statistics and insights',
  },
  {
    id: 'achievements',
    label: 'Achievements',
    icon: Award,
    href: '/achievements',
    keywords: ['achievements', 'badges', 'awards', 'milestones', 'gamification', 'unlock'],
    category: 'utility',
    description: 'Travel achievements and badges',
  },
  {
    id: 'recommendations',
    label: 'Recommendations',
    icon: Star,
    href: '/recommendations',
    keywords: ['recommendations', 'suggestions', 'tips', 'advice', 'personalized', 'ai'],
    category: 'utility',
    description: 'Personalized travel recommendations',
  },

  // Actions
  {
    id: 'share',
    label: 'Share Trip',
    icon: Share2,
    action: 'openShareModal',
    keywords: ['share', 'send', 'export', 'invite', 'collaborate'],
    category: 'action',
    description: 'Share your trip with others',
  },
  {
    id: 'search',
    label: 'Search Everything',
    icon: Search,
    action: 'openGlobalSearch',
    keywords: ['search', 'find', 'look', 'query', 'lookup'],
    category: 'action',
    description: 'Search across all your travel data',
  },

  // Quick Navigation (duplicates primary nav for keyboard access)
  {
    id: 'nav-dashboard',
    label: 'Go to Dashboard',
    icon: Home,
    href: '/',
    keywords: ['dashboard', 'home', 'overview', 'main'],
    category: 'navigation',
    description: 'Return to dashboard',
  },
  {
    id: 'nav-trips',
    label: 'Go to Trips',
    icon: Plane,
    href: '/trips',
    keywords: ['trips', 'travel', 'itinerary', 'plans'],
    category: 'navigation',
    description: 'View all trips',
  },
  {
    id: 'nav-flights',
    label: 'Go to Flights',
    icon: PlaneTakeoff,
    href: '/flights',
    keywords: ['flights', 'airline', 'booking', 'plane'],
    category: 'navigation',
    description: 'View all flights',
  },
]

// ============================================================================
// MOBILE NAVIGATION
// ============================================================================
// Bottom tab bar for mobile devices (5 items maximum)
// Last item is "More" which opens a menu with remaining features

export const MOBILE_NAV: NavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
    description: 'Dashboard home',
  },
  {
    href: '/trips',
    label: 'Trips',
    icon: Plane,
    description: 'Your trips',
  },
  {
    href: '/flights',
    label: 'Flights',
    icon: PlaneTakeoff,
    description: 'Your flights',
  },
  {
    href: '/check-in',
    label: 'Check-in',
    icon: CheckSquare,
    description: 'Check in online',
  },
  // "More" menu is handled separately in MobileNav component
]

// Items shown in mobile "More" menu
export const MOBILE_MORE_ITEMS: NavItem[] = [
  {
    href: '/briefing',
    label: 'Briefing',
    icon: FileCheck,
    description: 'Trip preparation',
  },
  {
    href: '/documents',
    label: 'Documents',
    icon: FileText,
    description: 'Travel documents',
  },
  {
    href: '/family',
    label: 'Family',
    icon: Users,
    description: 'Travelers',
  },
  {
    href: '/lounges',
    label: 'Lounges',
    icon: Coffee,
    description: 'Airport lounges',
  },
  {
    href: '/currency',
    label: 'Currency',
    icon: DollarSign,
    description: 'Currency converter',
  },
  {
    href: '/phrases',
    label: 'Phrases',
    icon: MessageSquare,
    description: 'Language help',
  },
  {
    href: '/stats',
    label: 'Stats',
    icon: BarChart3,
    description: 'Travel statistics',
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
    description: 'App settings',
  },
]

// ============================================================================
// FEATURE CATEGORIES
// ============================================================================
// Used for organizing features in settings, help, or feature discovery

export interface FeatureCategory {
  id: string
  label: string
  description: string
  features: string[] // IDs from PRIMARY_NAV, CONTEXTUAL_FEATURES, or QUICK_ACTIONS
}

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    id: 'core',
    label: 'Core Travel',
    description: 'Essential trip and flight management',
    features: ['trips', 'flights', 'check-in', 'documents', 'family', 'briefing'],
  },
  {
    id: 'airport',
    label: 'Airport & Flight Day',
    description: 'Features for travel day',
    features: [
      'check-in',
      'flight-seatmap',
      'flight-lounges',
      'flight-airport-departure',
      'flight-airport-arrival',
    ],
  },
  {
    id: 'destination',
    label: 'At Destination',
    description: 'Tools for when you arrive',
    features: [
      'trip-timeline',
      'trip-expenses',
      'trip-weather',
      'trip-emergency',
      'currency',
      'phrases',
    ],
  },
  {
    id: 'planning',
    label: 'Trip Planning',
    description: 'Prepare for your journey',
    features: ['briefing', 'trip-packing', 'trip-weather', 'timezone', 'recommendations'],
  },
  {
    id: 'tracking',
    label: 'Tracking & Insights',
    description: 'Monitor your travels',
    features: ['trip-expenses', 'stats', 'achievements', 'trip-reviews'],
  },
  {
    id: 'utilities',
    label: 'Utilities',
    description: 'Helpful travel tools',
    features: ['currency', 'timezone', 'phrases', 'weather'],
  },
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all navigation items flattened for search
 */
export function getAllNavigationItems(): Array<{
  id: string
  label: string
  href?: string
  keywords: string[]
}> {
  const primaryItems = PRIMARY_NAV.map((item) => ({
    id: item.href,
    label: item.label,
    href: item.href,
    keywords: [item.label.toLowerCase()],
  }))

  const quickActionItems = QUICK_ACTIONS.map((action) => ({
    id: action.id,
    label: action.label,
    href: action.href,
    keywords: action.keywords,
  }))

  return [...primaryItems, ...quickActionItems]
}

/**
 * Get contextual features for a specific route
 */
export function getContextualFeatures(route: string): ContextualFeature[] {
  return CONTEXTUAL_FEATURES.filter((feature) => {
    // Handle dynamic routes like /trips/[id]
    const routePattern = feature.parentRoute.replace(/\[.*?\]/g, '[^/]+')
    const regex = new RegExp(`^${routePattern}$`)
    return regex.test(route)
  })
}

/**
 * Check if a route should show specific contextual navigation
 */
export function shouldShowContextualNav(route: string): {
  showTabs: boolean
  showWidgets: boolean
  showActions: boolean
} {
  const features = getContextualFeatures(route)

  return {
    showTabs: features.some((f) => f.type === 'tab'),
    showWidgets: features.some((f) => f.type === 'widget'),
    showActions: features.some((f) => f.type === 'button'),
  }
}

// Backward compatibility with old navigation
// Remove this after migration is complete
export const NAV_ITEMS = PRIMARY_NAV
