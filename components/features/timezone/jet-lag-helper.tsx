'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, AlertCircle, CheckCircle } from 'lucide-react'
import type { JetLagRecommendation } from '@/types/timezone'

interface JetLagHelperProps {
  recommendation: JetLagRecommendation
}

const severityColors = {
  low: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200',
  moderate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200',
}

const priorityIcons = {
  high: <AlertCircle className="h-4 w-4 text-red-500" />,
  medium: <Clock className="h-4 w-4 text-yellow-500" />,
  low: <CheckCircle className="h-4 w-4 text-green-500" />,
}

export function JetLagHelper({ recommendation }: JetLagHelperProps) {
  const beforeTips = recommendation.recommendations.filter((tip) => tip.category === 'before')
  const duringTips = recommendation.recommendations.filter((tip) => tip.category === 'during')
  const afterTips = recommendation.recommendations.filter((tip) => tip.category === 'after')

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Jet Lag Helper</CardTitle>
            <CardDescription>
              {recommendation.departure} → {recommendation.destination}
            </CardDescription>
          </div>
          <Badge className={severityColors[recommendation.severity]}>
            {recommendation.severity} severity
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-bg-secondary rounded-lg">
            <div>
              <p className="text-sm text-text-secondary">Time Difference</p>
              <p className="text-2xl font-bold text-text-primary">
                {recommendation.timeDifference} hours
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Estimated Recovery</p>
              <p className="text-2xl font-bold text-text-primary">
                {recommendation.recoveryDays} days
              </p>
            </div>
          </div>

          {/* Tips by category */}
          <Tabs defaultValue="before" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="before">Before ({beforeTips.length})</TabsTrigger>
              <TabsTrigger value="during">During ({duringTips.length})</TabsTrigger>
              <TabsTrigger value="after">After ({afterTips.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="before" className="mt-4">
              <div className="space-y-3">
                {beforeTips.map((tip, index) => (
                  <div
                    key={index}
                    className="p-4 border border-border-primary rounded-lg hover:bg-bg-secondary transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {priorityIcons[tip.priority]}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-text-primary">{tip.title}</h4>
                          <Badge variant="default" className="text-xs">
                            {tip.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="during" className="mt-4">
              <div className="space-y-3">
                {duringTips.map((tip, index) => (
                  <div
                    key={index}
                    className="p-4 border border-border-primary rounded-lg hover:bg-bg-secondary transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {priorityIcons[tip.priority]}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-text-primary">{tip.title}</h4>
                          <Badge variant="default" className="text-xs">
                            {tip.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="after" className="mt-4">
              <div className="space-y-3">
                {afterTips.map((tip, index) => (
                  <div
                    key={index}
                    className="p-4 border border-border-primary rounded-lg hover:bg-bg-secondary transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {priorityIcons[tip.priority]}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-text-primary">{tip.title}</h4>
                          <Badge variant="default" className="text-xs">
                            {tip.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
