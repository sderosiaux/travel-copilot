'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Card,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Button,
} from '@/components/ui'
import {
  User,
  FileText,
  Heart,
  Plane,
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  Calendar,
  Trash2,
} from 'lucide-react'
import { useFamilyStore } from '@/lib/store/family-store'
import {
  RelationshipBadge,
  AgeIndicator,
  SpecialNeedsBadges,
  MemberDocuments,
  MemberPreferences,
  FamilyMemberForm,
} from '@/components/features/family'

interface FamilyMemberClientProps {
  memberId: string
}

function FamilyMemberContent({ memberId }: FamilyMemberClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isEditing, setIsEditing] = useState(false)

  const { getMemberById, updateMember, removeMember } = useFamilyStore()
  const member = getMemberById(memberId)

  const defaultTab = searchParams.get('tab') || 'profile'

  if (!member) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Card className="p-12 text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-3">Member Not Found</h2>
          <p className="text-text-secondary mb-6">
            The family member you are looking for does not exist.
          </p>
          <Button variant="primary" asChild>
            <Link href="/family">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Family
            </Link>
          </Button>
        </Card>
      </div>
    )
  }

  const fullName = `${member.firstName} ${member.lastName}`
  const initials = `${member.firstName[0]}${member.lastName[0]}`.toUpperCase()

  const handleUpdate = (updates: Partial<typeof member>) => {
    updateMember(member.id, updates)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to remove ${fullName} from your family?`)) {
      removeMember(member.id)
      router.push('/family')
    }
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/family">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Family
          </Link>
        </Button>

        <Card className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={member.avatar} alt={fullName} />
              <AvatarFallback className="bg-primary-500 text-white text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-text-primary mb-3">{fullName}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <RelationshipBadge relationship={member.relationship} />
                <AgeIndicator dateOfBirth={member.dateOfBirth} />
              </div>

              <div className="space-y-2 text-sm text-text-secondary mb-4">
                {member.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a
                      href={`mailto:${member.email}`}
                      className="hover:text-primary-500 transition-colors"
                    >
                      {member.email}
                    </a>
                  </div>
                )}
                {member.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a
                      href={`tel:${member.phone}`}
                      className="hover:text-primary-500 transition-colors"
                    >
                      {member.phone}
                    </a>
                  </div>
                )}
                {member.dateOfBirth && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(member.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <SpecialNeedsBadges specialNeeds={member.specialNeeds} className="mb-4" />

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel Edit' : 'Edit'}
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {isEditing ? (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Edit Member</h2>
          <FamilyMemberForm
            member={member}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        </Card>
      ) : (
        <Card className="p-6">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Documents</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Preferences</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-text-secondary mb-1">First Name</div>
                    <div className="text-text-primary font-medium">{member.firstName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary mb-1">Last Name</div>
                    <div className="text-text-primary font-medium">{member.lastName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary mb-1">Relationship</div>
                    <div className="text-text-primary font-medium capitalize">
                      {member.relationship}
                    </div>
                  </div>
                  {member.dateOfBirth && (
                    <div>
                      <div className="text-sm text-text-secondary mb-1">Date of Birth</div>
                      <div className="text-text-primary font-medium">
                        {new Date(member.dateOfBirth).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {member.specialNeeds && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Special Needs</h2>
                  <div className="space-y-3">
                    {member.specialNeeds.wheelchair && (
                      <Card className="p-4 bg-info/5 border-info">
                        <div className="font-medium text-text-primary">
                          Wheelchair Assistance Required
                        </div>
                      </Card>
                    )}
                    {member.specialNeeds.medicalConditions &&
                      member.specialNeeds.medicalConditions.length > 0 && (
                        <Card className="p-4">
                          <div className="font-medium text-text-primary mb-2">
                            Medical Conditions
                          </div>
                          <ul className="list-disc list-inside text-text-secondary">
                            {member.specialNeeds.medicalConditions.map((condition, idx) => (
                              <li key={idx}>{condition}</li>
                            ))}
                          </ul>
                        </Card>
                      )}
                    {member.specialNeeds.allergies &&
                      member.specialNeeds.allergies.length > 0 && (
                        <Card className="p-4 bg-error/5 border-error">
                          <div className="font-medium text-text-primary mb-2">
                            Allergies
                          </div>
                          <ul className="list-disc list-inside text-text-secondary">
                            {member.specialNeeds.allergies.map((allergy, idx) => (
                              <li key={idx}>{allergy}</li>
                            ))}
                          </ul>
                        </Card>
                      )}
                    {member.specialNeeds.notes && (
                      <Card className="p-4">
                        <div className="font-medium text-text-primary mb-2">Notes</div>
                        <p className="text-text-secondary">{member.specialNeeds.notes}</p>
                      </Card>
                    )}
                  </div>
                </div>
              )}

              {member.specialNeeds?.emergencyContact && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
                  <Card className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-text-secondary mb-1">Name</div>
                        <div className="text-text-primary font-medium">
                          {member.specialNeeds.emergencyContact.name}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-text-secondary mb-1">Relationship</div>
                        <div className="text-text-primary font-medium">
                          {member.specialNeeds.emergencyContact.relationship}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-text-secondary mb-1">Phone</div>
                        <div className="text-text-primary font-medium">
                          {member.specialNeeds.emergencyContact.phone}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="documents">
              <div>
                <h2 className="text-xl font-semibold mb-4">Travel Documents</h2>
                <MemberDocuments documentIds={member.documents} />
              </div>
            </TabsContent>

            <TabsContent value="preferences">
              <div>
                <h2 className="text-xl font-semibold mb-4">Travel Preferences</h2>
                <MemberPreferences preferences={member.preferences} />
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card className="p-8 text-center">
                <Plane className="h-12 w-12 mx-auto mb-4 text-text-tertiary" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  No Travel History
                </h3>
                <p className="text-text-secondary">
                  No past trips found for this family member.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  )
}

export default function FamilyMemberClient({ memberId }: FamilyMemberClientProps) {
  return (
    <Suspense fallback={<div className="container max-w-5xl mx-auto py-8 px-4">Loading...</div>}>
      <FamilyMemberContent memberId={memberId} />
    </Suspense>
  )
}
