'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const partners = [
  {
    name: 'Aga khan new',
    logo: '/agakhan.jpeg',
    url: 'https://www.mnh.or.tz'
  },
  {
    name: 'Muhimbili national hospital',
    logo: '/muhimbili.png',
    url: 'https://www.kairukihospitals.org'
  },
  {
    name: 'Kairuki North',
    logo: '/kairuki.png',
    url: 'https://www.nwfsc.edu'
  },
  {
    name: 'Sali hospital',
    logo: '/sali.jpeg',
    url: 'https://nwflaaa.org'
  },
  {
    name: 'Msasani hospital',
    logo: '/msasani.png',
    url: 'https://med.ufl.edu'
  }
]

export default function KeyPartners() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length)
    }
  }, [isTransitioning])

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex((prevIndex) => (prevIndex - 1 + partners.length) % partners.length)
    }
  }, [isTransitioning])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      const handleTransitionEnd = () => {
        setIsTransitioning(false)
      }
      slider.addEventListener('transitionend', handleTransitionEnd)
      return () => {
        slider.removeEventListener('transitionend', handleTransitionEnd)
      }
    }
  }, [])

  return (
    <section className="w-full py-8 sm:py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-[#002B49]">KEY PARTNERS</h2>
        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {partners.map((partner, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <Link
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full flex items-center justify-center"
                >
                  <div className="relative w-full max-w-[200px] h-[100px]">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      layout="fill"
                      objectFit="contain"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={prevSlide}
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous partner</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextSlide}
            disabled={isTransitioning}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next partner</span>
          </Button>
        </div>
        <div className="flex justify-center mt-4">
          {partners.map((_, index) => (
            <Button
              key={index}
              className={`h-2 w-2 mx-1 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true)
                  setCurrentIndex(index)
                }
              }}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}