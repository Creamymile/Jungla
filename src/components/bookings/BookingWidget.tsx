'use client'

interface BookingWidgetProps {
  channelManagerId?: string
  status?: 'active' | 'coming-soon'
}

export default function BookingWidget({ channelManagerId, status }: BookingWidgetProps) {
  if (status === 'coming-soon' || !channelManagerId) {
    return (
      <div className="relative border border-black/10 bg-cream/50 flex flex-col items-center justify-center py-20 px-8 text-center">
        <span className="bg-cream text-black text-[11px] font-sans font-medium tracking-widest uppercase px-5 py-2 mb-6">
          Coming Soon
        </span>
        <p className="text-muted text-sm font-light max-w-sm">
          This property will be available for booking shortly. Contact us
          directly to be first in line.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-black/10">
      <iframe
        src={`https://login.smoobu.com/en/booking-widget/${channelManagerId}`}
        title="Booking Widget"
        className="w-full min-h-[500px] border-0"
        loading="lazy"
      />
    </div>
  )
}
