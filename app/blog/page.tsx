'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Calendar, Clock, User, Brain, Heart, Utensils, Dumbbell, Moon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const healthActivities = [
  { name: "Daily Exercise", icon: Dumbbell, color: "bg-red-100 text-red-600" },
  { name: "Healthy Eating", icon: Utensils, color: "bg-green-100 text-green-600" },
  { name: "Mental Wellness", icon: Brain, color: "bg-blue-100 text-blue-600" },
  { name: "Heart Health", icon: Heart, color: "bg-pink-100 text-pink-600" },
  { name: "Sleep Hygiene", icon: Moon, color: "bg-purple-100 text-purple-600" },
]

const blogPosts = [
  {
    id: 1,
    title: "The Future of Telemedicine in Healthcare",
    excerpt: "Explore how telemedicine is revolutionizing patient care and what it means for healthcare professionals.",
    author: "Dr. Abdul Makame",
    date: "2024-03-15",
    readTime: "5 min read",
    category: "Technology",
    activity: "Mental Wellness",
    image: "/tele.jpeg?height=400&width=600",
  },
  {
    id: 2,
    title: "Navigating the Challenges of Rural Healthcare",
    excerpt: "Discover the unique challenges faced by healthcare providers in rural areas and innovative solutions being implemented.",
    author: "Dr. JJ Mwaka",
    date: "2024-03-10",
    readTime: "7 min read",
    category: "Rural Health",
    activity: "Heart Health",
    image: "/rural.jpeg?height=400&width=600",
  },
  {
    id: 3,
    title: "The Impact of AI on Medical Diagnostics",
    excerpt: "Learn how artificial intelligence is enhancing diagnostic accuracy and efficiency in healthcare settings.",
    author: "Dr. Mark Msangi",
    date: "2024-03-05",
    readTime: "6 min read",
    category: "Technology",
    activity: "Mental Wellness",
    image: "/ai.webp?height=400&width=600",
  },
  {
    id: 4,
    title: "Mental Health in the Workplace: A Growing Concern",
    excerpt: "Explore the importance of mental health support in professional environments and strategies for improvement.",
    author: "Dr. Michael Brown",
    date: "2024-03-01",
    readTime: "8 min read",
    category: "Mental Health",
    activity: "Mental Wellness",
    image: "/mental.jpeg?height=400&width=600",
  },
  {
    id: 5,
    title: "Nutrition Trends: Separating Fact from Fiction",
    excerpt: "Dive into the latest nutrition trends and learn how to distinguish between evidence-based advice and popular myths.",
    author: "Theresia John, PHD",
    date: "2024-02-25",
    readTime: "6 min read",
    category: "Nutrition",
    activity: "Healthy Eating",
    image: "/nutrition.jpeg?height=400&width=600",
  },
  {
    id: 6,
    title: "The Rise of Personalized Medicine",
    excerpt: "Discover how genetic testing and tailored treatments are transforming the landscape of healthcare.",
    author: "Dr. Alex Zephyr",
    date: "2024-02-20",
    readTime: "7 min read",
    category: "Medical Advances",
    activity: "Heart Health",
    image: "/medicine.jpeg?height=400&width=600",
  },
  {
    id: 7,
    title: "10 Simple Exercises for a Healthier You",
    excerpt: "Learn about easy-to-do exercises that can significantly improve your overall health and fitness.",
    author: "Mike Johnson, PT",
    date: "2024-02-15",
    readTime: "5 min read",
    category: "Fitness",
    activity: "Daily Exercise",
    image: "/exercise.jpeg?height=400&width=600",
  },
  {
    id: 8,
    title: "The Science of Sleep: Why It Matters and How to Improve It",
    excerpt: "Explore the latest research on sleep and discover practical tips for better sleep hygiene.",
    author: "Dr. Lissa George",
    date: "2024-02-10",
    readTime: "8 min read",
    category: "Sleep",
    activity: "Sleep Hygiene",
    image: "/sleep.jpeg?height=400&width=600",
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [isGridView, setIsGridView] = useState(true)
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  useEffect(() => {
    const filtered = blogPosts.filter(post => 
      (selectedCategory === 'All' || post.category === selectedCategory) &&
      (selectedActivity === null || post.activity === selectedActivity) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredPosts(filtered)
  }, [selectedCategory, searchTerm, selectedActivity])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleActivityClick = (activity: string) => setSelectedActivity(selectedActivity === activity ? null : activity)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-4">
            AfyaLink Health Hub
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Your source for the latest insights, trends, and news in healthcare. Empowering professionals and patients alike.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-xl p-6 mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Daily Health Activities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {healthActivities.map((activity, index) => (
              <motion.div
                key={activity.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${activity.color} rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer ${selectedActivity === activity.name ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                onClick={() => handleActivityClick(activity.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <activity.icon className="w-8 h-8 mb-2" />
                <span className="font-medium">{activity.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="w-full sm:w-64">
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {Array.from(new Set(blogPosts.map(post => post.category))).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-64">
            <Input
              type="text"
              placeholder="Search posts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setIsGridView(!isGridView)}
          >
            {isGridView ? 'List View' : 'Grid View'}
          </Button>
        </div>

        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <h3 className="text-xl font-semibold mb-4">Articles related to {selectedActivity}</h3>
            <ul className="list-disc pl-5">
              {filteredPosts.map((post) => (
                <li key={post.id} className="mb-2">
                  <Link href={`/blog/${post.id}`} className="text-blue-600 hover:underline">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        <AnimatePresence>
          <div className={`grid gap-8 ${isGridView ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ${isGridView ? '' : 'flex'}`}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className={`object-cover ${isGridView ? 'w-full h-48' : 'w-1/3 h-full'}`}
                />
                <div className={`p-6 ${isGridView ? '' : 'w-2/3'}`}>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{post.date}</span>
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">{post.author}</span>
                    </div>
                    <Link href={`/blog/${post.id}`} className="text-blue-500 hover:text-blue-600 flex items-center">
                      Read more
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <div className="mt-4">
                    <Badge variant="secondary">{post.category}</Badge>
                    <Badge variant="outline" className="ml-2">{post.activity}</Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showScrollToTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8"
          >
            <Button
              variant="secondary"
              size="icon"
              onClick={scrollToTop}
              className="rounded-full shadow-lg"
            >
              <ArrowRight className="w-6 h-6 transform rotate-[-90deg]" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}