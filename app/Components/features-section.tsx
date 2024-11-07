'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-lg overflow-hidden bg-muted w-full max-w-2xl mx-auto lg:mx-0"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 max-w-2xl mx-auto lg:mx-0"
          >
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-[#006D77]">
                Complete transparency.
              </h2>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-[#006D77]">
                Exceptional service.
              </h2>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Get access to full details on pay, assignment and facility.
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Check out assignments across the country and in your own backyard. Engage with our concierge-level recruiters, or manage the process yourself. It&apos;s fast, simple and intuitive—the way a locum tenens experience should be.
              </p>
            </div>
            <Button 
              className="w-full sm:w-auto bg-[#014E5D] hover:bg-[#013D48] text-white px-6 sm:px-8 py-2.5 rounded-md text-base sm:text-lg font-semibold transition-colors"
            >
              Get started
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}