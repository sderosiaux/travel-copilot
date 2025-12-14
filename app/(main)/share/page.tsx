'use client'

import { useState, useEffect } from 'react'
import { useSocialStore } from '@/lib/store/social-store'
import {
  HighlightCard,
  TripCardGenerator,
  ShareDialog,
  PrivacySettings,
} from '@/components/features/social'
import { Tabs, TabsList, TabsTrigger, TabsContent, Button } from '@/components/ui'
import { socialMockData } from '@/data/social'
import { TripHighlight, SharePlatform, SharePrivacy } from '@/types/social'
import { Share2, Sparkles } from 'lucide-react'

export default function SharePage() {
  const {
    highlights,
    tripCards,
    settings,
    setHighlights,
    setTripCards,
    setSettings,
    updateSettings,
    addSharedItem,
  } = useSocialStore()

  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [selectedHighlight, setSelectedHighlight] = useState<TripHighlight | null>(null)

  useEffect(() => {
    // Load mock data on mount
    setHighlights(socialMockData.highlights)
    setTripCards(socialMockData.tripCards)
    setSettings(socialMockData.settings)
  }, [setHighlights, setTripCards, setSettings])

  const handleShareHighlight = (highlight: TripHighlight) => {
    setSelectedHighlight(highlight)
    setShareDialogOpen(true)
  }

  const handleShare = (platform: SharePlatform, privacy: SharePrivacy) => {
    if (!selectedHighlight) return

    // Mock sharing - in production, this would call actual share APIs
    const sharedItem = {
      id: `shared-${Date.now()}`,
      contentId: selectedHighlight.id,
      userId: 'user-carlos-001',
      platform,
      privacy,
      views: 0,
      likes: 0,
      sharedAt: new Date().toISOString(),
    }

    addSharedItem(sharedItem)

    // Mock notification
    alert(`Shared to ${platform} with ${privacy} privacy!`)
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Share2 className="w-8 h-8 text-text-primary" />
            <h1 className="text-3xl font-bold text-text-primary">Social Sharing</h1>
          </div>
        </div>
        <p className="text-text-secondary">
          Share your travel highlights and achievements with friends
        </p>
      </div>

      <Tabs defaultValue="highlights" className="space-y-6">
        <TabsList>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="trip-cards">Trip Cards</TabsTrigger>
          <TabsTrigger value="settings">Privacy Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="highlights" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">
              Your Trip Highlights
            </h2>
            <Button>
              <Sparkles className="w-4 h-4 mr-2" />
              Create Highlight
            </Button>
          </div>

          {highlights.length === 0 ? (
            <div className="text-center py-12 bg-bg-secondary rounded-lg">
              <Share2 className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No highlights yet
              </h3>
              <p className="text-text-secondary mb-4">
                Create your first trip highlight to share with friends
              </p>
              <Button>
                <Sparkles className="w-4 h-4 mr-2" />
                Create Highlight
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {highlights.map((highlight) => (
                <HighlightCard
                  key={highlight.id}
                  highlight={highlight}
                  onShare={handleShareHighlight}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="trip-cards" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">
              Shareable Trip Cards
            </h2>
            <Button>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Card
            </Button>
          </div>

          {tripCards.length === 0 ? (
            <div className="text-center py-12 bg-bg-secondary rounded-lg">
              <Share2 className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No trip cards yet
              </h3>
              <p className="text-text-secondary mb-4">
                Generate beautiful shareable cards from your trips
              </p>
              <Button>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Card
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tripCards.map((card) => (
                <TripCardGenerator
                  key={card.id}
                  tripCard={card}
                  onShare={(platform) => console.log('Share to', platform)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings">
          {settings && (
            <PrivacySettings
              settings={settings}
              onUpdate={updateSettings}
            />
          )}
        </TabsContent>
      </Tabs>

      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        onShare={handleShare}
        title={selectedHighlight?.title || 'Content'}
      />
    </div>
  )
}
