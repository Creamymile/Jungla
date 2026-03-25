'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/types'
import ProjectCard from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || ''
  const activeStatus = searchParams.get('status') || ''

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false
      if (activeStatus && p.status !== activeStatus) return false
      return true
    })
  }, [projects, activeCategory, activeStatus])

  const isFiltered = activeCategory !== '' || activeStatus !== ''

  if (filtered.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted font-light text-lg">
          No projects match the current filters.
        </p>
      </div>
    )
  }

  // Uniform grid when filters are active
  if (isFiltered) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <ProjectCard project={project} tall={false} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    )
  }

  // Masonry layout when showing all projects
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
      <AnimatePresence mode="popLayout">
        {/* Tall card — left */}
        {filtered[0] && (
          <motion.div
            key={filtered[0]._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 lg:row-span-2"
          >
            <ProjectCard project={filtered[0]} tall />
          </motion.div>
        )}

        {/* Right side 2x2 grid */}
        {filtered.length > 1 && (
          <div className="lg:col-span-7 lg:row-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            <AnimatePresence mode="popLayout">
              {filtered.slice(1).map((project, i) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: (i + 1) * 0.05 }}
                >
                  <ProjectCard project={project} tall={false} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
