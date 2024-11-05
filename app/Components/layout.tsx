'use client'
import { Button } from "@/components/ui/button"
import { ChevronDown, Facebook, Linkedin, Menu, User, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ReactNode, useState } from "react"
import Popup from "./registerButton"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = {
    "Physician Jobs": [
      "Primary Care",
      "Emergency Medicine",
      "Surgery",
      "Internal Medicine",
    ],
    "Advanced Practice Jobs": [
      "Nurse Practitioner",
      "Physician Assistant",
      "CRNA",
      "Clinical Nurse Specialist",
    ],
    "For Locum Tenens": [
      "Why Locum Tenens?",
      "Pay & Benefits",
      "Housing & Travel",
      "Privileging & Credentialing",
      "Your Team",
      "FAQs",
    ],
    "For Employers": [
      "Workforce Solutions",
      "Staffing Request",
      "Quality Assurance",
      "Client Resources",
    ],
    "About": [
      "About Aya Locums",
      "Contact",
      "Careers",
      "News & Updates",
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link className="flex items-center gap-2 transition-transform hover:scale-105" href="/">
            <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="rounded" />
            <span className="text-xl font-bold">AfyaLink</span>
          </Link>
          <nav className="hidden md:flex gap-4 lg:gap-6">
            {Object.entries(navItems).map(([title, items]) => (
              <div key={title} className="group relative">
                <div className="flex items-center gap-1 text-sm font-medium cursor-pointer">
                  <span className="group-hover:text-blue-500">{title}</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:text-blue-500 group-hover:rotate-180" />
                </div>
                <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg transition-all duration-200 ease-in-out">
                  <div className="py-2">
                    {items.map((item) => (
                      <Link
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href={"/advanced-practice-jobs"}>
              <Button variant="outline" className="border-[#00bfa5] text-black hover:bg-[#284843] hover:text-white">
                Search jobs
              </Button>
            </Link>
            <Button className="bg-[#00bfa5] hover:bg-[#20413d]">Get started</Button>
            <Button variant="ghost" size="icon" className="hover:bg-blue-50 hover:text-blue-500">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white overflow-y-auto">
          <div className="p-4">
            {Object.entries(navItems).map(([title, items]) => (
              <div key={title} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                {items.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block py-2 text-sm text-gray-700 hover:text-blue-500"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-6 space-y-4">
              <Link href={"/advanced-practice-jobs"}>
                <Button variant="outline" className="w-full border-[#00bfa5] text-black hover:bg-[#284843] hover:text-white">
                  Search jobs
                </Button>
              </Link>
              <Button className="w-full bg-[#00bfa5] hover:bg-[#20413d]">Get started</Button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-white">
        <div className="container px-4 py-8 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Company</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link className="text-gray-600 hover:text-gray-900" href="#">
                    About AfyaLink
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-gray-900" href="#">
                    Corporate Careers
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-gray-900" href="#">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Jobs</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link className="text-gray-600 hover:text-gray-900" href="#">
                    Search Jobs
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-gray-900" href="#">
                    Physician Jobs
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-gray-900" href="#">
                    Physician Assistant Jobs
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-gray-900" href="#">
                    Nurse Practitioner Jobs
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-gray-900" href="#">
                    CRNA Jobs
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-gray-900" href="#">
                    Therapists Assistant Jobs
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-gray-900" href="#">
                    Dentist Jobs
                  </Link>
                </li>
               
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Employers</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link className="text-gray-600 hover:text-gray-900" href="#">
                    Workforce Solutions
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-gray-900" href="#">
                    Staffing Requests
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start lg:items-end">
              <Image
                src="/logo.jpg"
                alt="AfyaLink Logo"
                width={150}
                height={50}
                className="mb-6"
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="outline" className="min-w-[100px]">
                  Log in
                </Button>
                <Popup/>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-start gap-4 border-t pt-8 md:flex-row md:items-center">
            <div className="flex gap-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-600">
              <span>©2024 AfyaLink Healthcare, Inc.</span>
              <Link className="hover:text-gray-900" href="#">
                Terms of Use
              </Link>
              <Link className="hover:text-gray-900" href="#">
                Privacy Policy
              </Link>
              <Link className="hover:text-gray-900" href="#">
                Do Not Sell or Share My Personal Information
              </Link>
              <Link className="hover:text-gray-900" href="#">
                State Law Privacy Rights
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}