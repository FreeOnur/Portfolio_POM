'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-space font-bold mb-6"
              >
                <span className="gradient-text">About</span> Me
              </motion.h2>
              
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-300 leading-relaxed mb-6"
              >
                I'm a passionate developer with over 5 years of experience creating
                digital experiences that push the boundaries of what's possible.
                Specializing in modern web technologies, 3D graphics, and interactive design.
              </motion.p>
              
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-300 leading-relaxed"
              >
                My journey began with a fascination for how things work, leading me to
                explore everything from frontend frameworks to 3D graphics and machine learning.
                I believe in the power of technology to create meaningful connections.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { number: "50+", label: "Projects Completed" },
                { number: "5+", label: "Years Experience" },
                { number: "20+", label: "Happy Clients" },
                { number: "100%", label: "Satisfaction Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="glass-effect rounded-lg p-6 text-center glow-effect"
                >
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual content */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Content card */}
              <motion.div
                className="relative z-10 h-full glass-effect rounded-2xl p-8 flex flex-col justify-center items-center text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-6 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-3xl">🚀</span>
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  Innovation First
                </h3>
                
                <p className="text-gray-300 mb-6">
                  Always exploring new technologies and pushing creative boundaries
                </p>
                
                <div className="flex space-x-4">
                  {['React', 'Next.js', 'Three.js', 'AI/ML'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
