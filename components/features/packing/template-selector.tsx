'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText } from 'lucide-react'
import type { PackingTemplate } from '@/types/packing'

interface TemplateSelectorProps {
  templates: PackingTemplate[]
  onSelectTemplate: (template: PackingTemplate) => void
}

const templateIcons: Record<string, string> = {
  beach: '🏖️',
  business: '💼',
  winter: '❄️',
  hiking: '🥾',
  city: '🏙️',
  camping: '⛺',
  cruise: '🚢',
}

export function TemplateSelector({ templates, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-text-secondary" />
        <h3 className="text-lg font-semibold text-text-primary">
          Start from a Template
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => onSelectTemplate(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{templateIcons[template.type] || '📋'}</span>
                <div>
                  <CardTitle className="text-base group-hover:text-primary-500 transition-colors">
                    {template.name}
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {template.estimatedDuration}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary mb-3">{template.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {template.weatherConditions.slice(0, 3).map((condition) => (
                  <Badge key={condition} variant="default" className="text-xs">
                    {condition}
                  </Badge>
                ))}
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectTemplate(template)
                }}
              >
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
