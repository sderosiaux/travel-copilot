'use client'

import { Shield, FileText, Phone, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui'
import type { InsurancePolicy } from '@/types/insurance'

interface PolicyCardProps {
  policy: InsurancePolicy
  onViewDetails: () => void
}

export function PolicyCard({ policy, onViewDetails }: PolicyCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20'
      case 'expired':
        return 'bg-error/10 text-error border-error/20'
      case 'cancelled':
        return 'bg-text-secondary/10 text-text-secondary border-text-secondary/20'
      default:
        return 'bg-text-secondary/10 text-text-secondary border-text-secondary/20'
    }
  }

  const getDaysUntilExpiry = () => {
    const today = new Date()
    const expiry = new Date(policy.coverageEnd)
    const diff = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const daysLeft = getDaysUntilExpiry()
  const isExpiringSoon = daysLeft > 0 && daysLeft <= 30

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-lg bg-primary-500/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <CardTitle className="text-lg">{policy.provider}</CardTitle>
              <p className="text-sm text-text-secondary mt-1">
                Policy: {policy.policyNumber}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(policy.status)}>
            {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-text-secondary">Type</p>
            <p className="font-medium text-text-primary capitalize">
              {policy.type.replace('_', ' ')}
            </p>
          </div>
          <div>
            <p className="text-text-secondary">Premium</p>
            <p className="font-medium text-text-primary">
              {policy.premium.currency} {policy.premium.amount.toFixed(2)}
              <span className="text-text-secondary text-xs ml-1">
                /{policy.premium.frequency}
              </span>
            </p>
          </div>
          <div>
            <p className="text-text-secondary">Coverage Start</p>
            <p className="font-medium text-text-primary">
              {new Date(policy.coverageStart).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-text-secondary">Coverage End</p>
            <p className="font-medium text-text-primary">
              {new Date(policy.coverageEnd).toLocaleDateString()}
            </p>
          </div>
        </div>

        {isExpiringSoon && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
            <AlertCircle className="h-4 w-4 text-warning" />
            <p className="text-sm text-warning">
              Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="secondary" className="flex-1" onClick={onViewDetails}>
            <FileText className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button variant="secondary" className="flex-1">
            <Phone className="h-4 w-4 mr-2" />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
