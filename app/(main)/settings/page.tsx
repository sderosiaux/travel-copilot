'use client'

import { Settings as SettingsIcon, User, Heart, Sliders, Bot, CloudOff } from 'lucide-react'
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import {
  ProfileForm,
  PreferencesForm,
  AppSettingsForm,
  CopilotSettings,
  OfflineSettings,
} from '@/components/features/settings'

export default function SettingsPage() {
  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="h-8 w-8 text-primary-500" />
          <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
        </div>
        <p className="text-text-secondary">
          Manage your profile, preferences, and application settings
        </p>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="app" className="flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              <span className="hidden sm:inline">App Settings</span>
            </TabsTrigger>
            <TabsTrigger value="copilot" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">Copilot</span>
            </TabsTrigger>
            <TabsTrigger value="offline" className="flex items-center gap-2">
              <CloudOff className="h-4 w-4" />
              <span className="hidden sm:inline">Offline</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Profile Information</h2>
              <p className="text-sm text-text-secondary mb-4">
                Update your personal information and profile picture
              </p>
            </div>
            <ProfileForm />
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Travel Preferences</h2>
              <p className="text-sm text-text-secondary mb-4">
                Set your default travel preferences and accessibility needs
              </p>
            </div>
            <PreferencesForm />
          </TabsContent>

          <TabsContent value="app" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Application Settings</h2>
              <p className="text-sm text-text-secondary mb-4">
                Customize your experience, theme, language, and integrations
              </p>
            </div>
            <AppSettingsForm />
          </TabsContent>

          <TabsContent value="copilot" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Copilot Settings</h2>
              <p className="text-sm text-text-secondary mb-4">
                Customize how your AI travel copilot communicates with you
              </p>
            </div>
            <CopilotSettings />
          </TabsContent>

          <TabsContent value="offline" className="space-y-6">
            <OfflineSettings />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
