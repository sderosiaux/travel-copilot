'use client'

import { FileText, AlertCircle, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui'
import type { ClaimInfo, InsuranceEmergencyContact } from '@/types/insurance'

interface ClaimInfoProps {
  claimInfo: ClaimInfo
  emergencyContacts: InsuranceEmergencyContact[]
}

export function ClaimInfoComponent({ claimInfo, emergencyContacts }: ClaimInfoProps) {
  const claimsContact = emergencyContacts.find((c) => c.type === 'claims')

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary-500" />
            How to File a Claim
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {claimInfo.howToFile.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-sm text-text-secondary pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          {claimsContact && (
            <div className="mt-6 p-4 rounded-lg bg-primary-500/5 border border-primary-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-primary-500" />
                <h4 className="font-medium text-text-primary">Claims Contact</h4>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-text-secondary">
                  <span className="font-medium">UK:</span> {claimsContact.phone}
                </p>
                <p className="text-text-secondary">
                  <span className="font-medium">International:</span> {claimsContact.phoneInternational}
                </p>
                {claimsContact.email && (
                  <p className="text-text-secondary">
                    <span className="font-medium">Email:</span> {claimsContact.email}
                  </p>
                )}
                <p className="text-text-tertiary text-xs mt-2">
                  Available: {claimsContact.available}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {claimInfo.requiredDocuments.map((doc, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                <FileText className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Processing Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-secondary border border-border">
            <AlertCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-text-secondary">{claimInfo.processingTime}</p>
              <p className="text-xs text-text-tertiary mt-2">
                Keep copies of all documents and correspondence for your records.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {claimInfo.claimNumber && (
        <Card>
          <CardHeader>
            <CardTitle>Active Claim</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Claim Number</span>
                <span className="font-mono font-medium text-text-primary">
                  {claimInfo.claimNumber}
                </span>
              </div>
              {claimInfo.claimStatus && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Status</span>
                  <Badge
                    className={
                      claimInfo.claimStatus === 'approved'
                        ? 'bg-success/10 text-success border-success/20'
                        : claimInfo.claimStatus === 'rejected'
                        ? 'bg-error/10 text-error border-error/20'
                        : 'bg-warning/10 text-warning border-warning/20'
                    }
                  >
                    {claimInfo.claimStatus.charAt(0).toUpperCase() +
                      claimInfo.claimStatus.slice(1)}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
