'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, Plus, Globe } from 'lucide-react'
import {
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import {
  QuickDial,
  CountryNumbers,
  EmbassyCard,
  ContactCard,
} from '@/components/features/emergency'
import { useEmergencyStore } from '@/lib/store/emergency-store'
import {
  mockEmergencyContacts,
  mockCountryEmergencyNumbers,
  mockEmbassies,
  mockQuickDialEntries,
} from '@/data/emergency'

export default function EmergencyPage() {
  const {
    contacts,
    countryNumbers,
    embassies,
    quickDial,
    selectedCountry,
    setContacts,
    setCountryNumbers,
    setEmbassies,
    setQuickDial,
    setSelectedCountry,
    deleteContact,
  } = useEmergencyStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load mock data
    if (contacts.length === 0) {
      setContacts([
        mockEmergencyContacts.personal,
        mockEmergencyContacts.medical,
        mockEmergencyContacts.work,
      ])
    }
    if (countryNumbers.length === 0) {
      setCountryNumbers([
        mockCountryEmergencyNumbers.uk,
        mockCountryEmergencyNumbers.japan,
        mockCountryEmergencyNumbers.usa,
        mockCountryEmergencyNumbers.france,
      ])
    }
    if (embassies.length === 0) {
      setEmbassies([
        mockEmbassies.japanUK,
        mockEmbassies.usaUK,
        mockEmbassies.franceUK,
      ])
    }
    if (quickDial.length === 0) {
      setQuickDial(mockQuickDialEntries)
    }
  }, [
    contacts.length,
    countryNumbers.length,
    embassies.length,
    quickDial.length,
    setContacts,
    setCountryNumbers,
    setEmbassies,
    setQuickDial,
  ])

  if (!mounted) {
    return null
  }

  const availableCountries = countryNumbers.map((c) => ({
    code: c.countryCode,
    name: c.countryName,
  }))

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-error/10 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-error" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Emergency Contacts</h1>
            <p className="text-text-secondary">
              Quick access to emergency services and contacts
            </p>
          </div>
        </div>
      </div>

      {/* Quick Dial Section */}
      <QuickDial entries={quickDial} />

      {/* Tabs for different sections */}
      <Tabs defaultValue="country" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="country">Country Emergency Numbers</TabsTrigger>
          <TabsTrigger value="embassy">Embassies & Consulates</TabsTrigger>
          <TabsTrigger value="personal">Personal Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="country" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary-500" />
              <h2 className="text-xl font-semibold text-text-primary">
                Emergency Numbers by Country
              </h2>
            </div>
            <Select value={selectedCountry || 'all'} onValueChange={(value) => setSelectedCountry(value === 'all' ? null : value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {availableCountries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <CountryNumbers countries={countryNumbers} selectedCountry={selectedCountry} />
        </TabsContent>

        <TabsContent value="embassy" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">
              British Embassies & Consulates
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {embassies.map((embassy) => (
              <EmbassyCard key={embassy.id} embassy={embassy} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="personal" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">
              Personal Emergency Contacts
            </h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>

          {contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-lg">
              <AlertCircle className="h-16 w-16 text-text-tertiary mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No Emergency Contacts
              </h3>
              <p className="text-text-secondary mb-6 text-center max-w-md">
                Add personal emergency contacts to ensure quick access to important people
                during your travels.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Contact
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contacts
                .sort((a, b) => (a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1))
                .map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    onDelete={deleteContact}
                  />
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
