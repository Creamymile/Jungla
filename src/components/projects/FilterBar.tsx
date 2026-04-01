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
    <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
      {/* Category group */}
      <div className="flex items-center gap-3">
        <span className="text-muted text-[10px] font-sans font-medium tracking-widest uppercase shrink-0">
          Type
        </span>
        <span className="w-px h-4 bg-black/10 hidden sm:block" />
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter('category', cat.value)}
              aria-pressed={activeCategory === cat.value}
              className={clsx(
                'h-9 px-5 text-[11px] font-sans font-medium tracking-widest uppercase transition-all duration-300',
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
      <span className="hidden sm:block w-px h-8 bg-black/10" />

      {/* Status group */}
      <div className="flex items-center gap-3">
        <span className="text-muted text-[10px] font-sans font-medium tracking-widest uppercase shrink-0">
          Status
        </span>
        <span className="w-px h-4 bg-black/10 hidden sm:block" />
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilter('status', s.value)}
              aria-pressed={activeStatus === s.value}
              className={clsx(
                'h-9 px-5 text-[11px] font-sans font-medium tracking-widest uppercase transition-all duration-300',
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
