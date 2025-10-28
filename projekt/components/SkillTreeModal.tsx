'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface Skill {
  id: string
  name: string
  icon: string
  level: number
  description: string
  position: { x: number; y: number }
  connections: string[]
}

interface Member {
  id: string
  name: string
  role: string
  image: string
}

interface SkillTreeModalProps {
  isOpen: boolean
  onClose: () => void
  member: Member
  skills: Skill[]
}

export function SkillTreeModal({ isOpen, onClose, member, skills }: SkillTreeModalProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const getConnectionPath = (from: Skill, to: Skill) => {
    const fromPos = from.position
    const toPos = to.position
    return `M ${fromPos.x} ${fromPos.y} Q ${(fromPos.x + toPos.x) / 2} ${(fromPos.y + toPos.y) / 2 - 50} ${toPos.x} ${toPos.y}`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-4 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="dark-glass rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-hidden dark-glow">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{member.image}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{member.name}</h2>
                    <p className="text-purple-400 text-lg">{member.role}</p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 dark-glass rounded-full hover:bg-black/50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} className="text-white" />
                </motion.button>
              </div>

              {/* Skill Tree */}
              <div className="relative h-[500px] overflow-hidden">
                {/* SVG for connections */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 600 500"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {skills.map((skill) =>
                    skill.connections.map((connectionId) => {
                      const connectedSkill = skills.find(s => s.id === connectionId)
                      if (!connectedSkill) return null
                      return (
                        <motion.path
                          key={`${skill.id}-${connectionId}`}
                          d={getConnectionPath(skill, connectedSkill)}
                          stroke="url(#gradient)"
                          strokeWidth="2"
                          fill="none"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      )
                    })
                  )}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Skill nodes */}
                <div className="relative w-full h-full">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${(skill.position.x / 600) * 100}%`,
                        top: `${(skill.position.y / 500) * 100}%`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onMouseEnter={() => setHoveredSkill(skill.id)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <motion.div
                        className="relative cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Skill node */}
                        <div className="w-16 h-16 dark-glass rounded-full flex items-center justify-center dark-glow">
                          <span className="text-2xl">{skill.icon}</span>
                        </div>

                        {/* Skill name */}
                        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <span className="text-xs font-medium text-white bg-black/70 px-2 py-1 rounded border border-gray-700">
                            {skill.name}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Hover popup */}
              {hoveredSkill && (
                <motion.div
                  className="fixed z-60 dark-glass rounded-lg p-4 max-w-xs pointer-events-none dark-glow"
                  style={{
                    left: Math.min(mousePosition.x + 20, window.innerWidth - 900),
                    top: Math.max(mousePosition.y - 20, 20),
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {(() => {
                    const skill = skills.find(s => s.id === hoveredSkill)
                    if (!skill) return null
                    return (
                      <div>
                        <h3 className="font-bold text-white mb-2">{skill.name}</h3>
                        <p className="text-sm text-gray-300 mb-2">{skill.description}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">Level:</span>
                          <div className="flex-1 bg-white/20 rounded-full h-2">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                          <span className="text-xs text-white">{skill.level}%</span>
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
