'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

const backgroundImages = [
  "/hero1.webp?height=720&width=1280",
  "/hero2.webp?height=720&width=1280",
  "/hero3.webp?height=720&width=1280",
]

export default function HeroSection() {
  const [specialty, setSpecialty] = useState("")
  const [location, setLocation] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % backgroundImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Medical background ${index + 1}`}
            layout="fill"
            objectFit="cover"
            quality={100}
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative container flex flex-col items-center justify-center h-full gap-4 py-8 md:py-12 text-center">
        <motion.h1
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {["Empowering", "Healthcare,", "One", "Shift", "at", "a", "Time."].map((word, index) => (
            <motion.span key={index} className="inline-block mr-2" variants={wordVariants}>
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="max-w-[600px] text-gray-200 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          AfyaLink puts you in control.
        </motion.p>
        <motion.div
          className="w-full max-w-2xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger className="transition-colors hover:border-primary bg-white bg-opacity-90">
                <SelectValue placeholder="Select Specialties by Profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physician">Physician</SelectItem>
                <SelectItem value="crna">Therapist</SelectItem>
                <SelectItem value="np">Nurse Practitioner</SelectItem>
                <SelectItem value="pa">Physician Assistant</SelectItem>
              </SelectContent>
            </Select>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="transition-colors hover:border-primary bg-white bg-opacity-90">
                <SelectValue placeholder="Select Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ny">Tanzania</SelectItem>
                <SelectItem value="ca">Libya</SelectItem>
                <SelectItem value="tx">Kenya</SelectItem>
                <SelectItem value="fl">Uganda</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full md:w-auto transition-transform hover:scale-105 bg-[#21897E] hover:bg-[#1A6F66]" size="lg">
            <Search className="mr-2 h-4 w-4" />
            Search Jobs
          </Button>
        </motion.div>
      </div>
    </section>
  )
}