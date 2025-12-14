'use client'

import { useEffect, useState } from 'react'
import { Shield, Plus, FileText } from 'lucide-react'
import { Button, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'
import {
  PolicyCard,
  CoverageDetailsComponent,
  ClaimInfoComponent,
  EmergencyContacts,
} from '@/components/features/insurance'
import { useInsuranceStore } from '@/lib/store/insurance-store'
import { mockInsurancePolicies, mockActiveClaims } from '@/data/insurance'

export default function InsurancePage() {
  const { policies, selectedPolicy, setPolicies, setSelectedPolicy, setActiveClaims } =
    useInsuranceStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load mock data
    if (policies.length === 0) {
      setPolicies([mockInsurancePolicies.comprehensive])
      setActiveClaims([mockActiveClaims.flightDelay])
    }
  }, [policies.length, setPolicies, setActiveClaims])

  useEffect(() => {
    if (policies.length > 0 && !selectedPolicy) {
      setSelectedPolicy(policies[0])
    }
  }, [policies, selectedPolicy, setSelectedPolicy])

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-primary-500/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Travel Insurance</h1>
            <p className="text-text-secondary">
              Manage your policies and file claims
            </p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Policy
        </Button>
      </div>

      {/* Policies List */}
      {policies.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-lg">
          <Shield className="h-16 w-16 text-text-tertiary mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            No Insurance Policies
          </h3>
          <p className="text-text-secondary mb-6 text-center max-w-md">
            Add your travel insurance policy to access coverage details, emergency contacts,
            and file claims.
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Policy
          </Button>
        </div>
      ) : (
        <>
          {/* Policy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policies.map((policy) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                onViewDetails={() => setSelectedPolicy(policy)}
              />
            ))}
          </div>

          {/* Policy Details */}
          {selectedPolicy && (
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-primary-500" />
                <h2 className="text-2xl font-bold text-text-primary">
                  {selectedPolicy.provider} - Policy Details
                </h2>
              </div>

              <Tabs defaultValue="coverage" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="coverage">Coverage Details</TabsTrigger>
                  <TabsTrigger value="claims">Claims</TabsTrigger>
                  <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
                </TabsList>

                <TabsContent value="coverage" className="mt-6">
                  <CoverageDetailsComponent coverage={selectedPolicy.coverageDetails} />
                </TabsContent>

                <TabsContent value="claims" className="mt-6">
                  <ClaimInfoComponent
                    claimInfo={selectedPolicy.claimInfo}
                    emergencyContacts={selectedPolicy.emergencyContacts}
                  />
                </TabsContent>

                <TabsContent value="contacts" className="mt-6">
                  <EmergencyContacts contacts={selectedPolicy.emergencyContacts} />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </>
      )}
    </div>
  )
}
