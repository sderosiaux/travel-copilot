import type {
  TripHighlight,
  ShareSettings,
  SharedItem,
  TripCard,
} from '@/types/social'

export const mockTripHighlights: TripHighlight[] = [
  {
    id: 'highlight-001',
    tripId: 'trip-tokyo-001',
    tripTitle: 'Family Holiday to Tokyo',
    destination: 'Tokyo, Japan',
    type: 'photo',
    title: 'Stunning sunset at Tokyo Tower',
    description: 'Amazing view from the observation deck as the sun set over the city.',
    imageUrl: '/images/highlights/tokyo-tower.jpg',
    location: 'Tokyo Tower, Minato City',
    timestamp: '2025-11-17T18:30:00+09:00',
    tags: ['sunset', 'tokyo-tower', 'family'],
    privacy: 'public',
    createdAt: '2025-11-17T19:00:00+09:00',
  },
  {
    id: 'highlight-002',
    tripId: 'trip-tokyo-001',
    tripTitle: 'Family Holiday to Tokyo',
    destination: 'Tokyo, Japan',
    type: 'memory',
    title: 'First time trying authentic sushi',
    description:
      'The kids loved the conveyor belt sushi restaurant! Diego even tried raw salmon.',
    location: 'Shibuya Sushi Bar',
    timestamp: '2025-11-16T19:00:00+09:00',
    tags: ['food', 'sushi', 'family', 'first-time'],
    privacy: 'friends',
    createdAt: '2025-11-16T20:00:00+09:00',
  },
  {
    id: 'highlight-003',
    tripId: 'trip-paris-001',
    tripTitle: 'Weekend in Paris',
    destination: 'Paris, France',
    type: 'milestone',
    title: 'Celebrated 10th Anniversary',
    description:
      'Perfect romantic dinner at Le Jules Verne on the Eiffel Tower.',
    imageUrl: '/images/highlights/paris-anniversary.jpg',
    location: 'Le Jules Verne, Paris',
    timestamp: '2024-10-13T20:00:00+02:00',
    tags: ['anniversary', 'romantic', 'eiffel-tower'],
    privacy: 'public',
    createdAt: '2024-10-13T22:00:00+02:00',
  },
]

export const mockShareSettings: ShareSettings = {
  userId: 'user-carlos-001',
  defaultPrivacy: 'friends',
  allowedPlatforms: ['twitter', 'facebook', 'whatsapp', 'copy-link'],
  autoShareAchievements: true,
  autoShareMilestones: false,
  watermarkEnabled: true,
  includeLocation: true,
  updatedAt: '2025-12-01T10:00:00Z',
}

export const mockSharedItems: SharedItem[] = [
  {
    id: 'shared-001',
    contentId: 'highlight-001',
    userId: 'user-carlos-001',
    platform: 'twitter',
    privacy: 'public',
    url: 'https://twitter.com/carlos/status/123456',
    views: 245,
    likes: 34,
    sharedAt: '2025-11-17T19:30:00+09:00',
  },
  {
    id: 'shared-002',
    contentId: 'highlight-003',
    userId: 'user-carlos-001',
    platform: 'facebook',
    privacy: 'friends',
    url: 'https://facebook.com/carlos/posts/789012',
    views: 89,
    likes: 23,
    sharedAt: '2024-10-13T22:30:00+02:00',
  },
  {
    id: 'shared-003',
    contentId: 'card-tokyo-001',
    userId: 'user-carlos-001',
    platform: 'instagram',
    privacy: 'public',
    views: 512,
    likes: 67,
    sharedAt: '2025-11-22T14:00:00Z',
  },
]

export const mockTripCards: TripCard[] = [
  {
    id: 'card-tokyo-001',
    tripId: 'trip-tokyo-001',
    template: 'photo-grid',
    title: 'Family Holiday to Tokyo',
    destination: 'Tokyo, Japan',
    dates: {
      start: '2025-11-15',
      end: '2025-11-22',
    },
    highlights: [
      'Visited Tokyo Tower',
      'Tried authentic sushi',
      'Explored Shibuya',
      'Disney Tokyo adventure',
    ],
    stats: {
      countries: 1,
      cities: 1,
      flights: 2,
      days: 7,
    },
    photos: [
      '/images/tokyo/tower.jpg',
      '/images/tokyo/sushi.jpg',
      '/images/tokyo/shibuya.jpg',
      '/images/tokyo/disney.jpg',
    ],
    backgroundColor: '#FF6B6B',
    textColor: '#FFFFFF',
    privacy: 'public',
    createdAt: '2025-11-22T10:00:00Z',
  },
  {
    id: 'card-paris-001',
    tripId: 'trip-paris-001',
    template: 'minimal',
    title: 'Weekend in Paris',
    destination: 'Paris, France',
    dates: {
      start: '2024-10-12',
      end: '2024-10-15',
    },
    highlights: [
      'Eiffel Tower dinner',
      'Louvre Museum',
      '10th Anniversary celebration',
    ],
    stats: {
      countries: 1,
      cities: 1,
      flights: 2,
      days: 3,
    },
    photos: ['/images/paris/eiffel.jpg', '/images/paris/louvre.jpg'],
    backgroundColor: '#4ECDC4',
    textColor: '#FFFFFF',
    privacy: 'friends',
    createdAt: '2024-10-15T18:00:00Z',
  },
]

export const socialMockData = {
  highlights: mockTripHighlights,
  settings: mockShareSettings,
  sharedItems: mockSharedItems,
  tripCards: mockTripCards,
}
