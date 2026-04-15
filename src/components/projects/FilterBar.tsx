'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import clsx from 'clsx'

const categories = [
  { value: '', label: 'All' },
  { value: 'villa', label: 'Villas' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'horeca', label: 'Horeca' },
]

const statuses = [
  { value: '', label: 'All' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'upcoming', label: 'Upcoming' },
]

export default function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeCategory = searchParams.get('category') || ''
  const activeStatus = searchParams.get('status') || ''

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/projects?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
      {/* Category group */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <span className="text-muted text-[10px] font-sans font-medium tracking-widest uppercase shrink-0">
          Type
        </span>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter('category', cat.value)}
              aria-pressed={activeCategory === cat.value}
              className={clsx(
                'h-8 sm:h-9 px-3 sm:px-5 text-[10px] sm:text-[11px] font-sans font-medium tracking-widest uppercase transition-all duration-300',
                activeCategory === cat.value
                  ? 'bg-black text-cream'
                  : 'bg-cream text-muted hover:text-black'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <span className="hidden md:block w-px h-8 bg-black/10" />

      {/* Status group */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <span className="text-muted text-[10px] font-sans font-medium tracking-widest uppercase shrink-0">
          Status
        </span>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilter('status', s.value)}
              aria-pressed={activeStatus === s.value}
              className={clsx(
                'h-8 sm:h-9 px-3 sm:px-5 text-[10px] sm:text-[11px] font-sans font-medium tracking-widest uppercase transition-all duration-300',
                activeStatus === s.value
                  ? 'bg-black text-cream'
                  : 'bg-cream text-muted hover:text-black'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
