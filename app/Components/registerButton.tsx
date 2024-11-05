'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { X } from "lucide-react"

export default function Popup() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#00bfa5] hover:bg-[#20413d]">Apply</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[500px] lg:max-w-[550px] p-0">
        <Card className="w-full border-0 shadow-none">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-lg font-bold text-[#0F3E5C]">REGISTER WITH AFYALINK</h1>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogTrigger>
            </div>
            <ScrollArea className="h-[70vh] pr-4">
              <form className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="firstName" className="text-xs font-medium text-gray-700">
                      First Name<span className="text-red-500">*</span>
                    </label>
                    <Input id="firstName" required className="h-8 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName" className="text-xs font-medium text-gray-700">
                      Last Name<span className="text-red-500">*</span>
                    </label>
                    <Input id="lastName" required className="h-8 text-sm" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-medium text-gray-700">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <Input id="email" type="email" placeholder="seynozz@gmail.com" required className="h-8 text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-xs font-medium text-gray-700">
                      Phone<span className="text-red-500">*</span>
                    </label>
                    <Input id="phone" type="tel" required className="h-8 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="postalCode" className="text-xs font-medium text-gray-700">Postal Code</label>
                    <Input id="postalCode" className="h-8 text-sm" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="profession" className="text-xs font-medium text-gray-700">
                    Profession<span className="text-red-500">*</span>
                  </label>
                  <Select>
                    <SelectTrigger id="profession" className="h-8 text-sm">
                      <SelectValue placeholder="Select profession" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physician">Physician</SelectItem>
                      <SelectItem value="nurse">Nurse Practitioner</SelectItem>
                      <SelectItem value="pa">Physician Assistant</SelectItem>
                      <SelectItem value="crna">CRNA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="specialty" className="text-xs font-medium text-gray-700">
                    Primary Specialty<span className="text-red-500">*</span>
                  </label>
                  <Select>
                    <SelectTrigger id="specialty" className="h-8 text-sm">
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internal">Internal Medicine</SelectItem>
                      <SelectItem value="family">Family Medicine</SelectItem>
                      <SelectItem value="emergency">Emergency Medicine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="states" className="text-xs font-medium text-gray-700">Licensed States</label>
                  <Select>
                    <SelectTrigger id="states" className="h-8 text-sm">
                      <SelectValue placeholder="Select states" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="mct" className="text-xs font-medium text-gray-700">Practice License</label>
                  <Input id="mct" className="h-8 text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="password" className="text-xs font-medium text-gray-700">
                      Password<span className="text-red-500">*</span>
                    </label>
                    <Input id="password" type="password" required className="h-8 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="confirmPassword" className="text-xs font-medium text-gray-700">
                      Confirm Password<span className="text-red-500">*</span>
                    </label>
                    <Input id="confirmPassword" type="password" required className="h-8 text-sm" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="recommendation" className="text-xs font-medium text-gray-700">
                    Recommended by (Optional)
                  </label>
                  <Input id="recommendation" className="h-8 text-sm" />
                </div>

                <div className="space-y-1">
                  <label htmlFor="resume" className="text-xs font-medium text-gray-700">Upload Resume</label>
                  <Input id="resume" type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" className="text-xs" />
                  {file && <p className="text-xs text-green-600">File uploaded: {file.name}</p>}
                  <p className="text-xs text-gray-500">Allowed: PDF, DOC, DOCX. Max: 20MB</p>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" className="mt-1" />
                  <label htmlFor="terms" className="text-xs text-gray-600">
                    By clicking &quot;Get Started&quot;, you agree to AfyaLink&apos;s{' '}
                    <Link href="#" className="text-[#0F3E5C] hover:underline">
                      Privacy Notice
                    </Link>{' '}
                    and{' '}
                    <Link href="#" className="text-[#0F3E5C] hover:underline">
                      Terms of Use
                    </Link>.
                  </label>
                </div>

                <div className="flex justify-center">
                  <Button type="submit" className="w-auto px-4 bg-[#0F3E5C] hover:bg-[#0F3E5C]/90 text-white h-7 text-xs">
                    Get Started
                  </Button>
                </div>
              </form>
            </ScrollArea>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}