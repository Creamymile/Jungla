'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, LayoutGrid, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SanityImage } from '@/types'
import { urlFor } from '@/lib/sanity.client'

const FALLBACK_IMAGE = '/images/placeholder-villa.svg'

interface ImageGalleryProps {
  images?: SanityImage[]
}

function getImageUrl(image: SanityImage | undefined, width = 1200): string {
  try {
    if (image) return urlFor(image).width(width).url()
  } catch {
    // Sanity not configured
  }
  return FALLBACK_IMAGE
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [allPhotosOpen, setAllPhotosOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const gallery = images && images.length > 0 ? images : undefined
  const count = gallery ? gallery.length : 0

  const openLightbox = useCallback((idx: number) => {
    setActiveIndex(idx)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  const openAllPhotos = useCallback(() => setAllPhotosOpen(true), [])
  const closeAllPhotos = useCallback(() => setAllPhotosOpen(false), [])

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
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen, closeLightbox, prev, next])

  // Close all-photos on Escape
  useEffect(() => {
    if (!allPhotosOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAllPhotos()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [allPhotosOpen, closeAllPhotos])

  // Lock body scroll
  useEffect(() => {
    if (lightboxOpen || allPhotosOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxOpen, allPhotosOpen])

  if (count === 0) return null

  return (
    <>
      {/* ─── Airbnb-style Hero Grid ─── */}
      <div className="relative rounded-xl overflow-hidden">
        {count === 1 ? (
          /* Single image */
          <button onClick={() => openLightbox(0)} aria-label="View photo in lightbox" className="relative w-full aspect-[16/9] cursor-pointer group">
            <Image
              src={getImageUrl(gallery?.[0])}
              alt={gallery?.[0]?.alt || 'Property photo'}
              fill
              className="object-cover group-hover:brightness-90 transition-all duration-300"
              sizes="90vw"
              priority
            />
          </button>
        ) : count === 2 ? (
          /* Two images side by side */
          <div className="grid grid-cols-2 gap-1.5">
            {[0, 1].map((i) => (
              <button key={i} onClick={() => openLightbox(i)} aria-label={`View photo ${i + 1}`} className="relative aspect-[4/3] cursor-pointer group">
                <Image
                  src={getImageUrl(gallery?.[i])}
                  alt={gallery?.[i]?.alt || `Photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:brightness-90 transition-all duration-300"
                  sizes="45vw"
                  priority={i === 0}
                />
              </button>
            ))}
          </div>
        ) : (
          /* 3+ images: Airbnb layout (1 large left + 4 small right) */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-1.5" style={{ aspectRatio: '20/9' }}>
            {/* Main large image */}
            <button
              onClick={() => openLightbox(0)}
              aria-label="View main photo in lightbox"
              className="relative md:col-span-2 md:row-span-2 cursor-pointer group"
            >
              <Image
                src={getImageUrl(gallery?.[0], 1600)}
                alt={gallery?.[0]?.alt || 'Main photo'}
                fill
                className="object-cover group-hover:brightness-90 transition-all duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </button>

            {/* 4 smaller images on the right */}
            {[1, 2, 3, 4].map((i) => {
              if (i >= count) return null
              return (
                <button
                  key={i}
                  onClick={() => openLightbox(i)}
                  aria-label={`View photo ${i + 1}`}
                  className="relative hidden md:block cursor-pointer group"
                >
                  <Image
                    src={getImageUrl(gallery?.[i])}
                    alt={gallery?.[i]?.alt || `Photo ${i + 1}`}
                    fill
                    className="object-cover group-hover:brightness-90 transition-all duration-300"
                    sizes="25vw"
                  />
                </button>
              )
            })}
          </div>
        )}

        {/* "Show all photos" button */}
        {count > 1 && (
          <button
            onClick={openAllPhotos}
            className="absolute bottom-4 right-4 bg-white text-black text-[12px] font-sans font-medium tracking-wide px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-lg hover:bg-gray-50 transition-colors border border-black/10"
          >
            <LayoutGrid size={14} />
            Show all photos
          </button>
        )}
      </div>

      {/* ─── All Photos Modal (Airbnb-style scrollable grid) ─── */}
      <AnimatePresence>
        {allPhotosOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="All photos"
            className="fixed inset-0 z-[9999] bg-white overflow-y-auto"
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-black/5">
              <div className="max-w-5xl mx-auto px-6 py-4 flex items-center">
                <button
                  onClick={closeAllPhotos}
                  className="flex items-center gap-2 text-black hover:bg-black/5 rounded-full p-2 -ml-2 transition-colors"
                  aria-label="Close gallery"
                >
                  <ArrowLeft size={20} />
                </button>
              </div>
            </div>

            {/* Photo grid */}
            <div className="max-w-5xl mx-auto px-6 py-8">
              <div className="space-y-2">
                {gallery?.map((image, i) => {
                  // Alternate between full-width and 2-column rows (Airbnb style)
                  const isFullWidth = i % 3 === 0

                  if (isFullWidth) {
                    return (
                      <button
                        key={i}
                        onClick={() => { closeAllPhotos(); setTimeout(() => openLightbox(i), 100) }}
                        className="relative w-full aspect-[16/10] cursor-pointer group rounded-lg overflow-hidden"
                      >
                        <Image
                          src={getImageUrl(image, 1600)}
                          alt={image?.alt || `Photo ${i + 1}`}
                          fill
                          className="object-cover group-hover:brightness-95 transition-all duration-300"
                          sizes="(max-width: 1024px) 100vw, 900px"
                        />
                      </button>
                    )
                  }

                  // For 2-column items, only render on odd indices (we'll pair them)
                  if (i % 3 === 2) return null // handled by the pair below

                  const nextImage = gallery?.[i + 1]

                  return (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <button
                        onClick={() => { closeAllPhotos(); setTimeout(() => openLightbox(i), 100) }}
                        className="relative aspect-square cursor-pointer group rounded-lg overflow-hidden"
                      >
                        <Image
                          src={getImageUrl(image)}
                          alt={image?.alt || `Photo ${i + 1}`}
                          fill
                          className="object-cover group-hover:brightness-95 transition-all duration-300"
                          sizes="(max-width: 768px) 100vw, 450px"
                        />
                      </button>
                      {nextImage && (
                        <button
                          onClick={() => { closeAllPhotos(); setTimeout(() => openLightbox(i + 1), 100) }}
                          className="relative aspect-square cursor-pointer group rounded-lg overflow-hidden"
                        >
                          <Image
                            src={getImageUrl(nextImage)}
                            alt={nextImage?.alt || `Photo ${i + 2}`}
                            fill
                            className="object-cover group-hover:brightness-95 transition-all duration-300"
                            sizes="(max-width: 768px) 100vw, 450px"
                          />
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Single Image Lightbox ─── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-label="Image lightbox"
            className="fixed inset-0 z-[9998] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
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
                src={getImageUrl(gallery?.[activeIndex], 1600)}
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
