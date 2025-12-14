'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Luggage } from 'lucide-react'
import { PackingListCard } from '@/components/features/packing/packing-list-card'
import { TemplateSelector } from '@/components/features/packing/template-selector'
import { usePackingStore } from '@/lib/store/packing-store'
import { mockPackingData } from '@/data/packing'

export default function PackingPage() {
  const { lists, templates, setLists, setTemplates, createListFromTemplate } = usePackingStore()
  const [activeTab, setActiveTab] = useState('my-lists')

  useEffect(() => {
    // Load mock data on mount
    setLists(Object.values(mockPackingData.lists))
    setTemplates(Object.values(mockPackingData.templates))
  }, [setLists, setTemplates])

  const handleSelectTemplate = (template: any) => {
    const newList = createListFromTemplate(template, {
      userId: 'user-carlos-001',
      title: `${template.name} Packing List`,
    })
    setLists([...lists, newList])
    setActiveTab('my-lists')
  }

  const upcomingLists = lists.filter((list) => !list.isTemplate && list.tripId)
  const standaloneLists = lists.filter((list) => !list.isTemplate && !list.tripId)

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <Luggage className="h-8 w-8 text-primary-500" />
            Packing Lists
          </h1>
          <p className="text-text-secondary mt-2">
            Organize your packing with smart suggestions and templates
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New List
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-lists">My Lists</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* My Lists Tab */}
        <TabsContent value="my-lists" className="space-y-6 mt-6">
          {/* Trip-based lists */}
          {upcomingLists.length > 0 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-text-primary">Trip Packing Lists</h2>
                <p className="text-sm text-text-secondary mt-1">
                  Lists linked to your upcoming trips
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingLists.map((list) => (
                  <PackingListCard key={list.id} list={list} />
                ))}
              </div>
            </div>
          )}

          {/* Standalone lists */}
          {standaloneLists.length > 0 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-text-primary">Other Lists</h2>
                <p className="text-sm text-text-secondary mt-1">
                  Standalone packing lists
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {standaloneLists.map((list) => (
                  <PackingListCard key={list.id} list={list} />
                ))}
              </div>
            </div>
          )}

          {lists.length === 0 && (
            <div className="text-center py-12 text-text-secondary">
              <Luggage className="h-16 w-16 mx-auto mb-4 text-text-tertiary" />
              <p className="mb-2">No packing lists yet</p>
              <p className="text-sm mb-4">Create your first list or start from a template</p>
              <div className="flex gap-2 justify-center">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New List
                </Button>
                <Button variant="secondary" onClick={() => setActiveTab('templates')}>
                  Browse Templates
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4 mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-text-primary">Packing Templates</h2>
            <p className="text-sm text-text-secondary mt-1">
              Quick-start your packing with pre-built templates
            </p>
          </div>
          <TemplateSelector templates={templates} onSelectTemplate={handleSelectTemplate} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
