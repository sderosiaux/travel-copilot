'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MapPin, Calendar, Users } from 'lucide-react'
import type { PackingList } from '@/types/packing'

interface PackingListCardProps {
  list: PackingList
}

const tripTypeColors: Record<PackingList['tripType'], string> = {
  beach: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
  business: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200',
  winter: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200',
  hiking: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200',
  city: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
  camping: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200',
  cruise: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200',
  mixed: 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200',
}

export function PackingListCard({ list }: PackingListCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    })
  }

  return (
    <Link href={`/packing/${list.id}`}>
      <Card className="hover:shadow-lg transition-all duration-200 hover:border-primary-500 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-lg group-hover:text-primary-500 transition-colors">
              {list.title}
            </CardTitle>
            <Badge className={tripTypeColors[list.tripType]}>{list.tripType}</Badge>
          </div>
          {list.description && (
            <p className="text-sm text-text-secondary">{list.description}</p>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Packing Progress</span>
                <span className="font-semibold text-text-primary">
                  {list.progress.packedItems}/{list.progress.totalItems}
                </span>
              </div>
              <Progress value={list.progress.percentage} className="h-2" />
              <div className="flex items-center justify-between text-xs text-text-tertiary">
                <span>{list.progress.percentage}% complete</span>
                <span>
                  {list.progress.essentialsPacked}/{list.progress.essentialsTotal} essentials
                </span>
              </div>
            </div>

            {/* Trip details */}
            <div className="flex flex-wrap gap-3 text-sm text-text-secondary pt-2 border-t border-border-primary">
              {list.destination && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{list.destination}</span>
                </div>
              )}
              {list.startDate && list.endDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {formatDate(list.startDate)} - {formatDate(list.endDate)}
                  </span>
                </div>
              )}
              {list.sharedWith.length > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>Shared with {list.sharedWith.length}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
