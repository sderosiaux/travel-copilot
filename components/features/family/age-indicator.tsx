import { Badge } from '@/components/ui'
import { Baby, User } from 'lucide-react'

interface AgeIndicatorProps {
  dateOfBirth?: string
  className?: string
}

function calculateAge(dateOfBirth?: string): number | null {
  if (!dateOfBirth) return null
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export function AgeIndicator({ dateOfBirth, className }: AgeIndicatorProps) {
  const age = calculateAge(dateOfBirth)

  if (age === null) {
    return null
  }

  const isChild = age < 18

  return (
    <Badge variant={isChild ? 'warning' : 'default'} className={className}>
      {isChild ? (
        <>
          <Baby className="h-3 w-3 mr-1" />
          {age} years
        </>
      ) : (
        <>
          <User className="h-3 w-3 mr-1" />
          {age} years
        </>
      )}
    </Badge>
  )
}
