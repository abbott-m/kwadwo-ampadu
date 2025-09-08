/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Zap, Sparkles, Eye, Scan, X, Send, User, Mail, MessageSquare } from 'lucide-react'

// Project data
const projects = [
  {
    id: 1,
    title: "Free The Youth",
    url: "https://free-the-youth.vercel.app",
    description: "Where sound meets style. Experience exclusive performances and runway shows featuring Africa's most innovative artists and designers, all in one unforgettable weekend",
    tech: ["Next.js", "React", "Tailwind CSS"],
    color: "from-purple-500 to-pink-500",
    category: "Rave"
  },
  {
    id: 2,
    title: "XecutePass",
    url: "https://www.xecutepass.com/",
    description: "Transform your events with smart tickets, digital credits, and comprehensive insurance. Experience the future of event management today",
    tech: ["React", "Node.js", "Security"],
    color: "from-blue-500 to-cyan-500",
    category: "Ticketing"
  },
  {
    id: 3,
    title: "Trusondr",
    url: "https://www.trusondr.com/",
    description: "A privacy-focused platform that matches you with like-minded people while keeping your identity completely under your control",
    tech: ["Next.js", "Healthcare API", "AI"],
    color: "from-green-500 to-emerald-500",
    category: "AI Community"
  },
  {
    id: 4,
    title: "MeSusu",
    url: "https://mesusu.app/",
    description: "A structured, goal-oriented savings platform that encourages daily savings, rewards users for meeting their goals, and offers a clear, easy-to-use interface for tracking progress",
    tech: ["React Native", "Mobile", "Cloud"],
    color: "from-orange-500 to-red-500",
    category: "Fintech"
  },
  {
    id: 5,
    title: "Xecute Team",
    url: "https://www.xecuteteam.com/",
    description: "Creating and actualizing modern ideas in entertainment around Africa and beyond. We are a full-service organization supporting diverse talent through artist management, events, and marketing excellence",
    tech: ["Next.js", "Team Tools", "Productivity"],
    color: "from-indigo-500 to-purple-500",
    category: "Events"
  },
  {
    id: 6,
    title: "St Andrews Website",
    url: "https://st-andrews-website.vercel.app/",
    description: "Founded in 2005 with a simple yet powerful vision: to create an educational environment where every student could reach their full potential",
    tech: ["Next.js", "CMS", "Education"],
    color: "from-teal-500 to-blue-500",
    category: "Education"
  },
  {
    id: 7,
    title: "Zaama Disco Concert",
    url: "https://www.zaamadiscoconcert.com/",
    description: "A fusion of music, fashion, art, and raw energy, Zaama Disco is where Ghana's youth and culture and the world come alive to celebrate creativity and culture",
    tech: ["React", "Events", "Entertainment"],
    color: "from-pink-500 to-rose-500",
    category: "Entertainment"
  },
  {
    id: 8,
    title: "Vintage Gala",
    url: "https://www.vintagegala.org/",
    description: "Promotes conscious fashion, reduces textile waste, and supports a circular economy. By connecting vendors, creatives, and shoppers, vintage gala inspires mindful choices and celebrates fashion that's both stylish and sustainable.",
    tech: ["Next.js", "Events", "Luxury"],
    color: "from-amber-500 to-orange-500",
    category: "Brand"
  },
  {
    id: 9,
    title: "Slam Jam",
    url: "https://slam-jam-web.vercel.app/",
    description: "Step into the arena where high-octane basketball prowess meets electrifying entertainment. The ultimate celebration of high school culture, sport, and music creating an immersive, dynamic experience that captivates fans and participants alike",
    tech: ["React", "Sports", "Real-time"],
    color: "from-red-500 to-pink-500",
    category: "Sports"
  }
]

// Contact Form Component
const ContactForm = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => {
          onClose()
          setSubmitStatus('idle')
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateX: 15 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-black/90 border-2 border-cyan-400/50 rounded-2xl p-8 max-w-md w-full transform-gpu"
          style={{
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 50px rgba(0, 255, 255, 0.3), inset 0 0 50px rgba(0, 255, 255, 0.1)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* AR Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
              <h2 className="text-2xl font-black font-mono text-cyan-300">
                CONTACT_PROTOCOL
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-cyan-400 hover:text-cyan-300 transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scanning Line Animation */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{ y: [0, 300] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ top: 0 }}
          />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <label className="block text-sm font-mono text-cyan-400 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                IDENTITY_NAME
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-black/60 border border-cyan-400/30 rounded px-4 py-3 text-white font-mono focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="Enter your name..."
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-mono text-cyan-400 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                CONTACT_PROTOCOL
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-black/60 border border-cyan-400/30 rounded px-4 py-3 text-white font-mono focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="your.email@domain.com"
              />
            </div>

            {/* Message Field */}
            <div className="relative">
              <label className="block text-sm font-mono text-cyan-400 mb-2">
                <MessageSquare className="inline w-4 h-4 mr-2" />
                MESSAGE_PAYLOAD
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full bg-black/60 border border-cyan-400/30 rounded px-4 py-3 text-white font-mono focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                placeholder="Enter your message..."
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-sm font-mono text-center p-3 bg-green-400/10 border border-green-400/30 rounded"
              >
                ✓ MESSAGE_TRANSMITTED_SUCCESSFULLY
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm font-mono text-center p-3 bg-red-400/10 border border-red-400/30 rounded"
              >
                ✗ TRANSMISSION_FAILED - RETRY_REQUIRED
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold font-mono py-3 rounded hover:from-cyan-400 hover:to-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  TRANSMITTING...
                </>
              ) : (
                <>
                  <Send size={16} />
                  SEND_MESSAGE
                </>
              )}
            </motion.button>
          </form>

          {/* AR Footer */}
          <div className="mt-6 pt-4 border-t border-cyan-400/20 text-center">
            <p className="text-xs font-mono text-cyan-400/60">
              SECURE_TRANSMISSION • END_TO_END_ENCRYPTED
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Ultra-minimal particle system for smooth performance
const OptimizedParticles = React.memo(() => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    duration: 15 + (i % 5) * 2,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${10 + (particle.id * 4.5)}%`,
            top: `${20 + (particle.id * 3)}%`,
            animation: `float-particle ${particle.duration}s infinite linear`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
})

OptimizedParticles.displayName = 'OptimizedParticles'

// AR HUD - Static for performance
const ARHud = React.memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Static corner brackets */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-cyan-400 opacity-60" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-cyan-400 opacity-60" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-cyan-400 opacity-60" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-cyan-400 opacity-60" />
      
      {/* Status bar */}
      <div className="absolute top-4 left-4 bg-black/60 border border-cyan-400/30 rounded px-3 py-1 text-xs font-mono text-cyan-300">
        <Eye className="inline w-3 h-3 mr-1" />
        ACTIVE
      </div>
      
      <div className="absolute top-4 right-4 bg-black/60 border border-cyan-400/30 rounded px-3 py-1 text-xs font-mono text-cyan-300">
        <Scan className="inline w-3 h-3 mr-1" />
        9 TARGETS
      </div>
    </div>
  )
})

ARHud.displayName = 'ARHud'

// Optimized project card with minimal animations
const ProjectCard = React.memo(({ project, index }: { project: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        ease: [0.25, 0.25, 0.25, 1]
      }}
      className="group relative transform-gpu will-change-transform"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`
          relative overflow-hidden rounded-xl bg-black/40 border border-cyan-400/20 p-6 h-full
          transition-all duration-300 ease-out
          ${isHovered ? 'border-cyan-400/40 bg-black/60' : ''}
        `}
        style={{
          backdropFilter: 'blur(10px)',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        {/* Subtle glow effect */}
        <div 
          className={`
            absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300
            bg-gradient-to-br ${project.color}
            ${isHovered ? 'opacity-5' : ''}
          `}
        />
        
        {/* AR target indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 border border-cyan-400 rounded-full opacity-60">
          <div className="absolute inset-0.5 bg-cyan-400 rounded-full" />
        </div>

        <div className="relative z-10">
          {/* Category */}
          <div className="inline-block px-2 py-1 rounded text-xs font-mono bg-cyan-400/10 text-cyan-300 mb-3 border border-cyan-400/20">
            {project.category}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2 font-mono transition-colors duration-300 group-hover:text-cyan-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs rounded bg-black/40 text-cyan-300 border border-cyan-400/20 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Launch button */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-sm font-bold hover:from-cyan-400 hover:to-blue-400 transition-all duration-200 font-mono transform-gpu"
          >
            <ExternalLink size={14} />
            LAUNCH
          </a>
        </div>
      </div>
    </motion.div>
  )
})

ProjectCard.displayName = 'ProjectCard'

// Optimized section header
const SectionHeader = React.memo(({ title, subtitle }: { title: string, subtitle?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.25, 0.25, 1] }}
      className="text-center mb-8"
    >
      <h2 className="text-4xl md:text-6xl font-black font-mono text-cyan-300 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-4" />
    </motion.div>
  )
})

SectionHeader.displayName = 'SectionHeader'

// Main portfolio component
export default function UltraSmoothARPortfolio() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  const openContact = useCallback(() => setIsContactOpen(true), [])
  const closeContact = useCallback(() => setIsContactOpen(false), [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Static background for performance */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900">
        <div className="absolute inset-0 opacity-10 cyber-grid" />
      </div>

      <OptimizedParticles />
      <ARHud />

      {/* Hero Section - Optimized */}
      <section className="relative flex items-center justify-center z-10 min-h-screen">
        <div className="text-center max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.25, 0.25, 1] }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-8xl font-black font-mono tracking-wider text-cyan-300 mb-4">
              KWADWO
            </h1>
            <h2 className="text-2xl md:text-5xl font-bold font-mono tracking-wider text-cyan-200 opacity-80">
              AMPADU-YEBOAH
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.25, 0.25, 1] }}
            className="mb-8"
          >
            <p className="text-lg md:text-xl text-cyan-200 mb-4 font-mono">
              FULL-STACK DEVELOPER • AR SPECIALIST • GHANA 🇬🇭
            </p>
            <p className="text-base text-gray-300">
              Building the future, one project at a time • Manwha enthusiast • 29 years of passion
            </p>
          </motion.div>

          {/* Skills grid - Static for performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.25, 0.25, 1] }}
            className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto"
          >
            {['NEXT.JS', 'REACT', 'TYPESCRIPT', 'NODE.JS', 'AI/ML'].map((skill) => (
              <div
                key={skill}
                className="bg-black/40 border border-cyan-400/20 rounded px-3 py-2 text-center font-mono text-cyan-300 text-sm hover:border-cyan-400/40 transition-colors duration-200"
              >
                {skill}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="PROJECT MATRIX" 
            subtitle="A showcase of innovative projects built with cutting-edge technologies"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SectionHeader title="ABOUT_ME.exe" />
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.25, 0.25, 1] }}
              className="space-y-4 text-gray-300 leading-relaxed"
            >
              <p>
                I&apos;m a passionate full-stack developer from Ghana, dedicated to creating innovative digital solutions that make a real impact. At 29, I bring years of experience in modern web technologies.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me immersed in the fascinating world of Manwha, drawing inspiration from their intricate storytelling and visual artistry.
              </p>
              <p>
                My portfolio showcases 9 diverse projects from 2025, each representing a unique challenge and opportunity to push the boundaries of web technology.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.25, 0.25, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8"
          >
            {[
              { label: 'LOCATION', value: 'GHANA 🇬🇭' },
              { label: 'AGE', value: '29 YEARS' },
              { label: 'PROJECTS', value: '100+' },
              { label: 'STATUS', value: 'ACTIVE' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-black/40 border border-cyan-400/20 rounded p-4 text-center"
              >
                <div className="text-xs font-mono text-cyan-400 mb-1">{stat.label}</div>
                <div className="text-sm font-mono text-white">{stat.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeader title="ESTABLISH_CONNECTION" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.25, 0.25, 1] }}
          >
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to collaborate on something extraordinary? Let&apos;s turn your vision into reality.
            </p>
            
            <button 
              onClick={openContact}
              className="group relative px-8 py-4 bg-black/60 border-2 border-cyan-400 rounded text-cyan-300 font-mono font-bold text-lg hover:border-cyan-300 hover:bg-black/80 transition-all duration-200"
            >
              <Zap className="inline mr-2" size={20} />
              INITIATE CONTACT
              <div className="absolute inset-0 bg-cyan-400/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-cyan-400/20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-6 mb-4">
            <Sparkles className="text-cyan-400" size={20} />
            <span className="text-lg font-mono font-bold text-cyan-300">
              KWADWO AMPADU-YEBOAH
            </span>
            <Zap className="text-purple-400" size={20} />
          </div>
          <p className="text-gray-400 font-mono text-sm">
            © 2025 PORTFOLIO SYSTEM • GHANA 🇬🇭 • VERSION 3.0.0
          </p>
        </div>
      </footer>

      {/* Contact Form Modal */}
      <ContactForm isOpen={isContactOpen} onClose={closeContact} />

      <style jsx>{`
        @keyframes float-particle {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
          }
        }
        
        .cyber-grid {
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 100px 100px;
        }
      `}</style>
    </div>
  )
}