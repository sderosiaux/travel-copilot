import type {
  Recommendation,
  RecommendationInsight,
  PersonalizedFeed,
} from '@/types/recommendations'

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-dest-001',
    userId: 'user-carlos-001',
    type: 'destination',
    title: 'Discover Reykjavik, Iceland',
    description:
      'Based on your love for unique destinations and autumn travel, Iceland offers stunning landscapes, northern lights, and a perfect blend of adventure and relaxation.',
    reason: 'based_on_preferences',
    score: 92,
    imageUrl: '/images/destinations/reykjavik.jpg',
    metadata: {
      destination: {
        city: 'Reykjavik',
        country: 'Iceland',
        countryCode: 'IS',
        continent: 'Europe',
        estimatedCost: 2800,
        bestTimeToVisit: ['September', 'October', 'March', 'April'],
        flightTime: 210,
        distance: 1880,
      },
    },
    tags: ['adventure', 'nature', 'unique', 'northern-lights'],
    createdAt: '2024-12-10T10:00:00Z',
    isActive: true,
    isDismissed: false,
  },
  {
    id: 'rec-dest-002',
    userId: 'user-carlos-001',
    type: 'destination',
    title: 'Return to Tokyo for Cherry Blossom Season',
    description:
      "You've visited Tokyo 3 times. Spring cherry blossom season (late March to early April) offers a magical experience you haven't seen yet.",
    reason: 'based_on_history',
    score: 88,
    imageUrl: '/images/destinations/tokyo-spring.jpg',
    metadata: {
      destination: {
        city: 'Tokyo',
        country: 'Japan',
        countryCode: 'JP',
        continent: 'Asia',
        estimatedCost: 3200,
        bestTimeToVisit: ['March', 'April'],
        flightTime: 690,
        distance: 9560,
      },
    },
    tags: ['seasonal', 'cherry-blossom', 'cultural', 'returning'],
    createdAt: '2024-12-09T15:30:00Z',
    isActive: true,
    isDismissed: false,
  },
  {
    id: 'rec-dest-003',
    userId: 'user-carlos-001',
    type: 'destination',
    title: 'Explore Lisbon, Portugal',
    description:
      'Similar travelers who enjoy Paris and Barcelona also love Lisbon. Experience stunning architecture, delicious cuisine, and coastal beauty.',
    reason: 'similar_travelers',
    score: 85,
    imageUrl: '/images/destinations/lisbon.jpg',
    metadata: {
      destination: {
        city: 'Lisbon',
        country: 'Portugal',
        countryCode: 'PT',
        continent: 'Europe',
        estimatedCost: 1800,
        bestTimeToVisit: ['May', 'June', 'September', 'October'],
        flightTime: 160,
        distance: 1584,
      },
    },
    tags: ['cultural', 'food', 'beaches', 'affordable'],
    createdAt: '2024-12-08T12:00:00Z',
    isActive: true,
    isDismissed: false,
  },
  {
    id: 'rec-exp-001',
    userId: 'user-carlos-001',
    type: 'experience',
    title: 'Hot Air Balloon Over Cappadocia',
    description:
      'An unforgettable sunrise experience floating over fairy chimneys and ancient valleys. Perfect for your next adventure trip.',
    reason: 'trending',
    score: 90,
    imageUrl: '/images/experiences/cappadocia-balloon.jpg',
    metadata: {
      experience: {
        category: 'Adventure',
        duration: 180,
        difficulty: 'easy',
        priceRange: '150-250',
        minAge: 6,
      },
    },
    tags: ['adventure', 'unique', 'sunrise', 'photography'],
    createdAt: '2024-12-11T08:00:00Z',
    isActive: true,
    isDismissed: false,
  },
  {
    id: 'rec-exp-002',
    userId: 'user-carlos-001',
    type: 'experience',
    title: 'Northern Lights Photography Tour',
    description:
      'Guided tour with professional photographer to capture the aurora borealis. Includes camera tips and hot chocolate.',
    reason: 'based_on_preferences',
    score: 87,
    imageUrl: '/images/experiences/northern-lights.jpg',
    metadata: {
      experience: {
        category: 'Nature & Photography',
        duration: 240,
        difficulty: 'easy',
        priceRange: '100-180',
        minAge: 8,
      },
    },
    tags: ['nature', 'photography', 'winter', 'guided-tour'],
    createdAt: '2024-12-10T14:00:00Z',
    isActive: true,
    isDismissed: false,
  },
  {
    id: 'rec-airline-001',
    userId: 'user-carlos-001',
    type: 'airline',
    title: 'Try Singapore Airlines',
    description:
      'For your long-haul flights, Singapore Airlines offers exceptional service and is consistently rated among the world\'s best. Part of Star Alliance.',
    reason: 'based_on_preferences',
    score: 82,
    metadata: {
      airline: {
        airlineCode: 'SQ',
        airlineName: 'Singapore Airlines',
        alliance: 'star_alliance',
        averagePrice: 2800,
        onTimePerformance: 89,
      },
    },
    tags: ['premium', 'long-haul', 'highly-rated'],
    createdAt: '2024-12-07T10:00:00Z',
    isActive: true,
    isDismissed: false,
  },
  {
    id: 'rec-season-001',
    userId: 'user-carlos-001',
    type: 'season',
    title: 'Visit Vienna in Christmas Market Season',
    description:
      'December is magical in Vienna with world-famous Christmas markets, festive atmosphere, and winter charm.',
    reason: 'seasonal',
    score: 86,
    imageUrl: '/images/seasonal/vienna-christmas.jpg',
    metadata: {
      season: {
        destination: 'Vienna, Austria',
        months: ['November', 'December'],
        weatherCondition: 'Cold with festive atmosphere',
        events: [
          'Christmas Markets',
          'New Year\'s Concert',
          'St. Stephen\'s Cathedral Events',
        ],
      },
    },
    tags: ['seasonal', 'christmas', 'markets', 'cultural'],
    createdAt: '2024-12-06T09:00:00Z',
    isActive: true,
    isDismissed: false,
  },
  {
    id: 'rec-dest-004',
    userId: 'user-carlos-001',
    type: 'destination',
    title: 'Copenhagen for Design and Culture',
    description:
      'Scandinavian charm meets modern design. Perfect for your preference for clean aesthetics and cultural experiences.',
    reason: 'based_on_preferences',
    score: 84,
    imageUrl: '/images/destinations/copenhagen.jpg',
    metadata: {
      destination: {
        city: 'Copenhagen',
        country: 'Denmark',
        countryCode: 'DK',
        continent: 'Europe',
        estimatedCost: 2200,
        bestTimeToVisit: ['May', 'June', 'July', 'August'],
        flightTime: 105,
        distance: 956,
      },
    },
    tags: ['design', 'cultural', 'cycling', 'hygge'],
    createdAt: '2024-12-05T11:00:00Z',
    isActive: true,
    isDismissed: false,
  },
]

export const mockInsights: RecommendationInsight[] = [
  {
    id: 'insight-001',
    title: 'You prefer short-haul European destinations',
    description:
      '75% of your trips are to European cities within 3 hours flight time. Consider exploring more of Scandinavia or Eastern Europe.',
    category: 'pattern',
    priority: 'medium',
  },
  {
    id: 'insight-002',
    title: 'Autumn is your favorite travel season',
    description:
      'Most of your trips happen between September and November. Book early for next autumn to get better deals.',
    category: 'pattern',
    priority: 'low',
  },
  {
    id: 'insight-003',
    title: 'Save 30% by traveling mid-week',
    description:
      'Your preferred destinations are 30% cheaper when departing Tuesday-Thursday instead of weekends.',
    category: 'savings',
    priority: 'high',
  },
  {
    id: 'insight-004',
    title: 'British Airways loyalty benefits available',
    description:
      "You've flown 42 BA flights. You may be eligible for Executive Club tier benefits and companion vouchers.",
    category: 'tip',
    priority: 'high',
  },
  {
    id: 'insight-005',
    title: 'Family-friendly destinations recommended',
    description:
      'Based on your family trips, consider destinations with excellent family infrastructure like Switzerland or Denmark.',
    category: 'preference',
    priority: 'medium',
  },
]

export const mockPersonalizedFeed: PersonalizedFeed = {
  userId: 'user-carlos-001',
  recommendations: mockRecommendations,
  insights: mockInsights,
  lastUpdated: '2024-12-13T10:00:00Z',
}
