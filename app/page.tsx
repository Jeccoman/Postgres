'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Briefcase, Building2, MapPin, DollarSign, Calendar, Search, Star, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

import KeyPartners from "./Components/banner"
import HeroSection from "./Components/hero-section"
import FeaturesSection from "./Components/features-section"
import TestimonialSection from "./Components/testimonial"

interface Category {
  title: string
  image: string
}

interface Job {
  id: string
  title: string
  specialty: string
  location: string
  salary: number
  category: string
  startDate: string
  duration: string
  featured: boolean
}

interface Facility {
  id: string
  name: string
  type: string
  location: string
  rate: string
  availability: string
}

export default function Component() {
  const [activeTab, setActiveTab] = useState("PHYSICIAN")
  const [showFacilities, setShowFacilities] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])

  const tabs = [
    "PHYSICIAN",
    "CRNA",
    "NURSE PRACTITIONER",
    "PHYSICIAN ASSISTANT",
    "ANESTHESIOLOGIST ASSISTANT"
  ]

  const jobs: Job[] = [
    {
      id: "1",
      title: "Emergency Medicine Physician",
      specialty: "Emergency Medicine",
      location: "Dar es Salaam",
      salary: 200000,
      category: "PHYSICIAN",
      startDate: "2023-08-01",
      duration: "3 months",
      featured: true
    },
    {
      id: "2",
      title: "Orthopedic Surgeon",
      specialty: "Orthopedics",
      location: "Arusha",
      salary: 250000,
      category: "PHYSICIAN",
      startDate: "2023-09-15",
      duration: "6 months",
      featured: false
    },
    {
      id: "3",
      title: "CRNA for Surgical Center",
      specialty: "Anesthesia",
      location: "Mwanza",
      salary: 190000,
      category: "CRNA",
      startDate: "2023-07-20",
      duration: "4 months",
      featured: true
    },
    {
      id: "4",
      title: "Pediatric Nurse Practitioner",
      specialty: "Pediatrics",
      location: "Dodoma",
      salary: 180000,
      category: "NURSE PRACTITIONER",
      startDate: "2023-08-10",
      duration: "3 months",
      featured: false
    },
    {
      id: "5",
      title: "Emergency Medicine PA",
      specialty: "Emergency Medicine",
      location: "Zanzibar",
      salary: 175000,
      category: "PHYSICIAN ASSISTANT",
      startDate: "2023-09-01",
      duration: "5 months",
      featured: true
    },
    {
      id: "6",
      title: "Anesthesiologist Assistant",
      specialty: "Anesthesiology",
      location: "Kilimanjaro",
      salary: 185000,
      category: "ANESTHESIOLOGIST ASSISTANT",
      startDate: "2023-10-01",
      duration: "4 months",
      featured: false
    }
  ]

  const facilities: Facility[] = [
    {
      id: "1",
      name: "Main Operating Theater",
      type: "Surgical Suite",
      location: "Dar es Salaam",
      rate: "TSh 500,000/day",
      availability: "Mon-Fri, 8AM-6PM"
    },
    {
      id: "2",
      name: "Diagnostic Imaging Center",
      type: "Radiology",
      location: "Arusha",
      rate: "TSh 250,000/hour",
      availability: "24/7"
    },
    {
      id: "3",
      name: "Grand Theater",
      type: "Theater",
      location: "Dodoma",
      rate: "TSh 400,000/day",
      availability: "Mon-Sat, 9AM-10PM"
    },
    {
      id: "4",
      name: "Advanced Surgical Suite",
      type: "Surgical Suite",
      location: "Mwanza",
      rate: "TSh 600,000/day",
      availability: "24/7"
    },
    {
      id: "5",
      name: "Modern Surgical Room",
      type: "Surgical Room",
      location: "Zanzibar",
      rate: "TSh 450,000/day",
      availability: "Mon-Fri, 7AM-7PM"
    },
    {
      id: "6",
      name: "High-Tech MRI Center",
      type: "MRI Scan",
      location: "Arusha",
      rate: "TSh 300,000/hour",
      availability: "Mon-Sat, 8AM-8PM"
    },
    {
      id: "7",
      name: "Digital X-Ray Facility",
      type: "X-Ray Machine",
      location: "Dar es Salaam",
      rate: "TSh 150,000/hour",
      availability: "24/7"
    },
    {
      id: "8",
      name: "Advanced Ultrasound Center",
      type: "Ultrasound machines",
      location: "Mwanza",
      rate: "TSh 200,000/hour",
      availability: "Mon-Fri, 8AM-6PM"
    }
  ]

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
 

  const categories: Category[] = [
    { title: "Search physician jobs", image: "/physician.webp?height=300&width=400" },
    { title: "Search CRNA jobs", image: "/nurse.webp?height=300&width=400" },
    { title: "Search PA jobs", image: "/doctor.avif?height=300&width=400" },
    { title: "Search NP jobs", image: "/therapy.webp?height=300&width=400" },
    { title: "Search anesthesiologist assistant jobs", image: "/assistant.webp?height=300&width=400" },
  ]

  useEffect(() => {
    const filtered = jobs.filter(job => 
      job.category === activeTab &&
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!showFeaturedOnly || job.featured) &&
      (selectedLocations.length === 0 || selectedLocations.includes(job.location))
    )
    setFilteredJobs(filtered)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, searchTerm, showFeaturedOnly, selectedLocations])

  const locations = Array.from(new Set(jobs.map(job => job.location)))

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-4xl font-bold text-center text-[#21897E]">
                  Featured Locum Tenens Jobs
                </h2>
                
                {/* Category tabs */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`
                        px-4 py-2 text-sm rounded-full transition-all
                        ${activeTab === tab 
                          ? "bg-[#21897E] text-white shadow-lg" 
                          : "bg-[#21897E]/10 hover:bg-[#21897E]/20"
                        }
                      `}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Search, Filter, and View Jobs button */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
                  <div className="flex flex-1 items-center gap-4 w-full">
                    <div className="relative flex-1 max-w-md">
                      <Input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={showFeaturedOnly}
                          onCheckedChange={(checked) => setShowFeaturedOnly(checked as boolean)}
                        />
                        <span className="text-sm">Featured Only</span>
                      </label>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Filter
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Filter Jobs</DialogTitle>
                            <DialogDescription>
                              Select locations to filter jobs
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            {locations.map((location) => (
                              <div key={location} className="flex items-center space-x-2">
                                <Checkbox
                                  id={location}
                                  checked={selectedLocations.includes(location)}
                                  onCheckedChange={(checked) => {
                                    setSelectedLocations(
                                      checked
                                        ? [...selectedLocations, location]
                                        : selectedLocations.filter((l) => l !== location)
                                    )
                                  }}
                                />
                                <Label htmlFor={location}>{location}</Label>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowFacilities(!showFacilities)}
                    className="bg-[#40C4B2] hover:bg-[#21897E] text-white px-4 py-2 text-sm rounded-full whitespace-nowrap"
                  >
                    {showFacilities ? "View Jobs" : "Available Facilities"}
                  </Button>
                </div>
              </div>

              {showFacilities ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {facilities.map((facility) => (
                    <Card key={facility.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{facility.name}</h3>
                          <p className="text-gray-600">{facility.type}</p>
                        </div>
                        <Building2 className="text-[#21897E]" />
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#21897E]" />
                          {facility.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-[#21897E]" />
                          {facility.availability}
                        </div>
                        <p className="font-medium text-[#21897E]">{facility.rate}</p>
                      </div>
                      <Button 
                        className="mt-4 bg-[#40C4B2] hover:bg-[#21897E] text-white px-4 py-2 text-sm rounded-full"
                      >
                        Book Facility
                      </Button>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredJobs.map((job) => (
                    <Card key={job.id} className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{job.title}</h3>
                          {job.featured && (
                            <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                          )}
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-[#21897E]" />
                            {job.specialty}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#21897E]" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-[#21897E]" />
                            TSh {job.salary.toLocaleString()} /hr
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#21897E]" />
                            Start: {job.startDate}
                
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-[#21897E]" />
                            Duration: {job.duration}
                          </div>
                        </div>
                      </div>
                      <Button
                        
                        className="mt-4 bg-[#40C4B2] hover:bg-[#21897E] text-white px-4 py-2 text-sm rounded-full"
                      >
                        APPLY
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
        <KeyPartners />
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <Link 
                  key={index} 
                  href="#" 
                  className="group relative overflow-hidden rounded-lg transition-transform hover:scale-105"
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={400}
                    height={300}
                    className="aspect-[4/3] object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/60" />
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <h3 className="text-center text-xl font-bold text-white transition-transform group-hover:scale-105">
                      {category.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <TestimonialSection/>
      </main>
    </div>
  )
}