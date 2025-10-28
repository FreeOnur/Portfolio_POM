'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Github, Linkedin, Mail, ExternalLink, TreePine, ChevronDown } from 'lucide-react'
import { SkillTreeModal } from './SkillTreeModal'

const teamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Lead Developer",
    image: "👨‍💻",
    bio: "Full-stack developer with expertise in React, Node.js, and cloud architecture. Passionate about creating scalable solutions.",
    skills: ["React", "Node.js", "AWS", "TypeScript"],
    skillFile: "alex-skills.json",
    social: {
      github: "#",
      linkedin: "#",
      email: "#",
      portfolio: "#"
    }
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    image: "👩‍🎨",
    bio: "Creative designer focused on user experience and visual design. Specializes in creating intuitive and beautiful interfaces.",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    skillFile: "sarah-skills.json",
    social: {
      github: "#",
      linkedin: "#",
      email: "#",
      portfolio: "#"
    }
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    role: "DevOps Engineer",
    image: "👨‍🔧",
    bio: "Infrastructure specialist with deep knowledge of cloud platforms, automation, and deployment pipelines.",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    skillFile: "mike-skills.json",
    social: {
      github: "#",
      linkedin: "#",
      email: "#",
      portfolio: "#"
    }
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Mobile Developer",
    image: "👩‍💻",
    bio: "Cross-platform mobile developer with experience in React Native and Flutter. Focused on performance and user experience.",
    skills: ["React Native", "Flutter", "iOS", "Android"],
    skillFile: "emma-skills.json",
    social: {
      github: "#",
      linkedin: "#",
      email: "#",
      portfolio: "#"
    }
  }
]

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [memberSkills, setMemberSkills] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadMemberSkills = async (member: any) => {
    try {
      const response = await fetch(`/data/${member.skillFile}`)
      const data = await response.json()
      setMemberSkills(data)
      setSelectedMember(member)
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error loading skills:', error)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section id="team" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-6">
            Meet the <span className="gradient-text">Team</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Talented individuals working together to create exceptional digital experiences
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              className="group relative"
            >
              <motion.div
                className="dark-glass rounded-2xl p-6 h-full flex flex-col dark-glow"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Avatar */}
                <div className="text-center mb-6">
                  <motion.div
                    className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-3xl mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {member.image}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  
                  <p className="text-purple-400 font-medium">
                    {member.role}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-gray-300 text-sm mb-6 flex-grow">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-2 py-1 bg-black/30 rounded-full text-xs text-white border border-gray-700"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Skill Tree Button */}
                <div className="mb-4">
                  <motion.button
                    onClick={() => loadMemberSkills(member)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-medium flex items-center justify-center space-x-2 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                  >
                    <TreePine size={16} />
                    <span>View Skill Tree</span>
                  </motion.button>
                </div>

                {/* Social links */}
                <div className="flex justify-center space-x-3">
                  {[
                    { icon: Github, href: member.social.github, label: 'GitHub' },
                    { icon: Linkedin, href: member.social.linkedin, label: 'LinkedIn' },
                    { icon: Mail, href: member.social.email, label: 'Email' },
                    { icon: ExternalLink, href: member.social.portfolio, label: 'Portfolio' },
                  ].map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-all duration-300 border border-gray-700"
                      aria-label={label}
                    >
                      <Icon size={16} className="text-white" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white hover:text-purple-400 transition-colors duration-300"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>

      {/* Skill Tree Modal */}
      {isModalOpen && selectedMember && memberSkills && (
        <SkillTreeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          member={memberSkills.member}
          skills={memberSkills.skills}
        />
      )}
    </section>
  )
}
