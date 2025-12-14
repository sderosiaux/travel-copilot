'use client'

import { use } from 'react'
import { Button, Card, Badge } from '@/components/ui'
import {
  ExecutiveSummaryCard,
  FlightSummaryCard,
  DocumentChecklistCard,
  DestinationInfoCard,
  WeatherWidget,
  TimezoneWidget,
  EmergencyContactsCard,
  ReminderListCard,
} from '@/components/features/briefing'
import {
  generateExecutiveSummary,
  generateFlightSummary,
  generateDocumentChecklist,
  generateReminders,
  getDestinationInfoForTrip,
} from '@/lib/briefing/generate-briefing'
import { mockTrips } from '@/data/trips'
import { mockDocuments } from '@/data/documents'
import { getDestinationInfo } from '@/data/destinations'
import { Printer, Share2, ArrowLeft, Download } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface BriefingDetailPageProps {
  params: Promise<{
    tripId: string
  }>
}

export default function BriefingDetailPage({ params }: BriefingDetailPageProps) {
  const { tripId } = use(params)

  // Find the trip
  const trip = Object.values(mockTrips).find(t => t.id === tripId)

  if (!trip) {
    notFound()
  }

  // Generate briefing data
  const executiveSummary = generateExecutiveSummary(trip)
  const flightSummary = generateFlightSummary(trip)
  const documentChecklist = generateDocumentChecklist(trip, Object.values(mockDocuments))
  const reminders = generateReminders(trip)
  const destinationInfo = getDestinationInfoForTrip(trip)
  const originInfo = getDestinationInfo(trip.origin)

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex-1">
          <Link href="/briefing">
            <Button variant="ghost" className="mb-4 -ml-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Briefings
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Trip Briefing</h1>
          <p className="text-text-secondary">
            Comprehensive briefing for {trip.title}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="primary">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Generated Date */}
      {trip.briefing?.generatedAt && (
        <Card className="bg-info/5 border-info/20">
          <div className="p-4">
            <p className="text-sm text-text-secondary">
              Briefing generated on{' '}
              {new Date(trip.briefing.generatedAt).toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </Card>
      )}

      {/* Executive Summary */}
      <section>
        <ExecutiveSummaryCard summary={executiveSummary} />
      </section>

      {/* Flight Summary */}
      <section>
        <FlightSummaryCard flights={flightSummary} />
      </section>

      {/* Important Reminders */}
      <section>
        <ReminderListCard reminders={reminders} />
      </section>

      {/* Document Checklist */}
      <section>
        <DocumentChecklistCard documents={documentChecklist} />
      </section>

      {/* Destination Information Grid */}
      {destinationInfo && (
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Destination Guide
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Destination Info */}
            <DestinationInfoCard destination={destinationInfo} />

            {/* Weather */}
            <WeatherWidget destination={destinationInfo} />

            {/* Timezone */}
            {originInfo && (
              <TimezoneWidget origin={originInfo} destination={destinationInfo} />
            )}

            {/* Emergency Contacts */}
            <EmergencyContactsCard destination={destinationInfo} />
          </div>
        </section>
      )}

      {/* Trip Notes */}
      {trip.notes && (
        <section>
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Trip Notes
              </h3>
              <p className="text-text-secondary whitespace-pre-wrap">{trip.notes}</p>
            </div>
          </Card>
        </section>
      )}

      {/* Print-only Footer */}
      <div className="hidden print:block mt-12 pt-6 border-t border-border">
        <p className="text-sm text-text-tertiary text-center">
          Generated by Travel Copilot • {new Date().toLocaleDateString('en-GB')} •{' '}
          For: {trip.title}
        </p>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .no-print,
          nav,
          header,
          footer,
          button {
            display: none !important;
          }

          .print\\:block {
            display: block !important;
          }

          .container {
            max-width: 100% !important;
            padding: 0 !important;
          }

          section {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}
