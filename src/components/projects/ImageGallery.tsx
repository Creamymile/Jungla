'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SanityImage } from '@/types'
import { urlFor } from '@/lib/sanity.client'

const FALLBACK_IMAGE = '/images/placeholder-villa.svg'

interface ImageGalleryProps {
  images?: SanityImage[]
}

function getImageUrl(image: SanityImage | undefined): string {
  try {
    if (image) return urlFor(image).width(1200).url()
  } catch {
    // Sanity not configured
  }
  return FALLBACK_IMAGE
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const gallery = images && images.length > 0 ? images : undefined
  const count = gallery ? gallery.length : 0

  const open = useCallback((idx: number) => {
    setActiveIndex(idx)
    setLightboxOpen(true)
  }, [])

  const close = useCallback(() => setLightboxOpen(false), [])

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? count - 1 : i - 1))
  }, [count])

  const next = useCallback(() => {
    setActiveIndex((i) => (i === count - 1 ? 0 : i + 1))
  }, [count])

  // Keyboard nav
  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen, close, prev, next])

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxOpen])

  if (count === 0) return null

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {Array.from({ length: count }).map((_, i) => {
          const src = getImageUrl(gallery?.[i])
          // First image spans 2 cols on md+
          const span = i === 0 ? 'md:col-span-2 md:row-span-2' : ''

          return (
            <button
              key={i}
              onClick={() => open(i)}
              className={`relative overflow-hidden cursor-pointer group ${span} ${i === 0 ? 'aspect-[4/3]' : 'aspect-square'}`}
            >
              <Image
                src={src}
                alt={gallery?.[i]?.alt || `Gallery image ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </button>
          )
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/95 flex items-center justify-center"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors z-10"
              aria-label="Close gallery"
            >
              <X size={28} />
            </button>

            {/* Counter */}
            <span className="absolute top-6 left-6 text-cream/40 text-sm font-sans tracking-wider">
              {activeIndex + 1} / {count}
            </span>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={36} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={36} />
            </button>

            {/* Image */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90vw] h-[80vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={getImageUrl(gallery?.[activeIndex])}
                alt={gallery?.[activeIndex]?.alt || `Gallery image ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
