import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { Badge } from '@/components/ui'
import {
  AlertCircle,
  FileText,
  Heart,
  Package,
  Calendar,
  Info,
  CheckCircle2
} from 'lucide-react'
import type { Reminder } from '@/lib/briefing/generate-briefing'

interface ReminderListProps {
  reminders: Reminder[]
}

export function ReminderListCard({ reminders }: ReminderListProps) {
  const getCategoryIcon = (category: Reminder['category']) => {
    switch (category) {
      case 'travel':
        return <Calendar className="w-5 h-5" />
      case 'documents':
        return <FileText className="w-5 h-5" />
      case 'health':
        return <Heart className="w-5 h-5" />
      case 'packing':
        return <Package className="w-5 h-5" />
      case 'booking':
        return <Calendar className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getPriorityBadge = (priority: Reminder['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge variant="error">High Priority</Badge>
      case 'medium':
        return <Badge variant="warning">Medium</Badge>
      case 'low':
        return <Badge variant="info">Low Priority</Badge>
    }
  }

  const getPriorityColor = (priority: Reminder['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-error text-error'
      case 'medium':
        return 'border-warning text-warning'
      case 'low':
        return 'border-info text-info'
    }
  }

  if (reminders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Important Reminders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-2" />
            <p className="text-text-primary font-medium">All set!</p>
            <p className="text-sm text-text-secondary">No pending reminders</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Important Reminders</CardTitle>
          <Badge variant="primary">{reminders.length} item{reminders.length !== 1 ? 's' : ''}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reminders.map(reminder => (
            <div
              key={reminder.id}
              className={`flex items-start gap-3 p-4 rounded-lg border-l-4 ${getPriorityColor(reminder.priority)} bg-bg-secondary`}
            >
              <div className="mt-0.5">
                {getCategoryIcon(reminder.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-text-primary">
                    {reminder.title}
                  </h4>
                  {getPriorityBadge(reminder.priority)}
                </div>

                <p className="text-sm text-text-secondary mb-2">
                  {reminder.description}
                </p>

                <div className="flex items-center gap-3 text-xs text-text-tertiary">
                  <span className="capitalize">{reminder.category}</span>
                  {reminder.dueDate && (
                    <>
                      <span>•</span>
                      <span>
                        Due: {new Date(reminder.dueDate).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-error">
                {reminders.filter(r => r.priority === 'high').length}
              </p>
              <p className="text-xs text-text-secondary">High Priority</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">
                {reminders.filter(r => r.priority === 'medium').length}
              </p>
              <p className="text-xs text-text-secondary">Medium</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-info">
                {reminders.filter(r => r.priority === 'low').length}
              </p>
              <p className="text-xs text-text-secondary">Low Priority</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
