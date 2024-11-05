'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronRight, Clock, DollarSign, Users, Building2 } from "lucide-react"
import { useState, useEffect } from "react"

interface Job {
  id: string
  title: string
  location: string
  type: string
  profession: string
  payRate: string
  schedule: string
  openings: number
  image: string
}

export default function JobListings() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])

  const states = [
    "Dar es salaam",
    "Arusha",
    "Tanga",
    "Morogoro",
    "Geita",
    "Mwanza",
    "Dodoma",
    "Simiyu",
    "India",
    // Add more states...
  ]

  const jobs: Job[] = [
    {
      id: "2649614",
      title: "Locum Certified Registered Nurse Anesthetist (CRNA) job in Faribault, MN",
      location: "Twangoma, TZ",
      type: "Locums",
      profession: "Certified Registered Nurse Anesthetist (CRNA)",
      payRate: "Tsh2200/hr - Tsh2800/hr",
      schedule: "4x8-Hour 08:00 - 15:30",
      openings: 2,
      image: "/physician.webp?height=400&width=800",
    },
    {
      id: "2649615",
      title: "Locum Certified Registered Nurse Anesthetist (CRNA) job in Owatonna, MN",
      location: "Dar es salaam, TZ",
      type: "Locums",
      profession: "Certified Registered Nurse Anesthetist (CRNA)",
      payRate: "Tsh2500/hr - Tsh2600/hr",
      schedule: "4x8-Hour 08:00 - 16:30",
      openings: 2,
      image: "/therapy.webp?height=400&width=800",
    },
    // Add more jobs...
  ]

  useEffect(() => {
    // Set the first job as the default selected job
    if (jobs.length > 0) {
      setSelectedJob(jobs[0])
    }
  }, [])

  const handleLocationChange = (state: string, checked: boolean) => {
    setSelectedLocations(prev => 
      checked ? [...prev, state] : prev.filter(s => s !== state)
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#21897E] md:text-4xl">
          Advanced Practice Locums Jobs
        </h1>
        <h2 className="mt-2 text-sm font-semibold text-gray-600">
          BROWSE ADVANCED PRACTICE TRAVEL JOBS NATIONWIDE
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Specialties by Profession" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crna">Certified Registered Nurse Anesthetist (CRNA)</SelectItem>
              <SelectItem value="nurse">Nurse Practitioner</SelectItem>
              <SelectItem value="pa">Physician Assistant</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Locations" />
              </SelectTrigger>
              <SelectContent className="h-[400px]">
                <div className="p-2">
                  <div className="space-y-2">
                    {states.map((state) => (
                      <div key={state} className="flex items-center space-x-2">
                        <Checkbox
                          id={state}
                          checked={selectedLocations.includes(state)}
                          onCheckedChange={(checked) => handleLocationChange(state, checked as boolean)}
                        />
                        <label htmlFor={state} className="text-sm">
                          {state}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between border-t pt-4">
                    <Button variant="outline" size="sm" onClick={() => setSelectedLocations([])}>
                      Clear
                    </Button>
                    <Button size="sm">Show Results</Button>
                  </div>
                </div>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[600px_1fr]"> {/* Updated grid-cols class */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">JOB DETAILS</h3>
            {selectedJob ? (
              <div className="space-y-4">
                <h4 className="text-2xl font-semibold text-[#21897E]">{selectedJob.location}</h4>
                <h5 className="text-xl font-semibold text-[#21897E]">{selectedJob.title}</h5>
                <div className="text-gray-600">
                  Job ID: {selectedJob.id} | Job Type: {selectedJob.type}
                </div>
                <Image
                  src={selectedJob.image}
                  alt={selectedJob.location}
                  width={800}
                  height={400}
                  className="rounded-lg object-cover"
                />
                <div className="grid gap-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm text-gray-600">Profession:</span>
                    <span className="font-medium">{selectedJob.profession}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm text-gray-600">Pay Rate:</span>
                    <span className="font-medium">{selectedJob.payRate}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm text-gray-600">Schedule:</span>
                    <span className="font-medium">{selectedJob.schedule}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm text-gray-600">Number of Openings:</span>
                    <span className="font-medium">{selectedJob.openings}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-2 font-medium">I&apos;M INTERESTED IN THIS POSITION</h4>
                  <p className="mb-4 text-sm text-gray-600">
                    Start your application by entering your email now.
                  </p>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="email" className="mb-1 block text-sm font-medium">
                        Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-[#21897E] focus:outline-none focus:ring-1 focus:ring-[#21897E]"
                        required
                      />
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" className="mt-1" />
                      <label htmlFor="terms" className="text-xs text-gray-600">
                        By clicking &quot;Apply Now&quot;, you acknowledge that your information will be used in accordance with our Privacy Notice and Terms of Use.
                      </label>
                    </div>
                    <Button className="w-full bg-[#21897E] text-white hover:bg-[#21897E]/90">
                      Apply Now
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Select a job to view details</p>
            )}
          </div>

          <div>
            <div className="mb-6">
              <span className="text-xl font-bold">406 Openings</span>
              <br />
              <span className="text-sm  text-gray-600"> 256 Unique Jobs</span>
            </div>
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card
                  key={job.id}
                  className={`cursor-pointer p-6 transition-colors hover:bg-gray-50 ${
                    selectedJob?.id === job.id ? "border-[#21897E]" : ""
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#21897E]">
                          <Building2 className="h-5 w-5" />
                          <span className="font-medium">{job.profession}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <DollarSign className="h-5 w-5" />
                          <span>{job.payRate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-5 w-5" />
                          <span>{job.schedule}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="h-5 w-5" />
                          <span>{job.openings} Openings</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-gray-400" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}