'use client'

import * as React from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    id: 1,
    title: "Seamless visibility & control of stock",
    quote: "Ramani's Warehouse & POS applications have helped with stock control. My salespeople & storekeeper are required to use the app whenever stock is being moved, and the data remains available for me to use on demand.",
    author: "Mbizo Mlola Rubatula",
    role: "Managing Director, Tibyange Traders",
    rating: 5,
    image: "/alex.webp?height=400&width=400",
  },
  {
    id: 2,
    title: "Efficient inventory management",
    quote: "The system has transformed how we handle our daily operations. The real-time tracking capabilities have significantly improved our stock management process.",
    author: "Sarah Chen",
    role: "Operations Director, Global Retail",
    rating: 4,
    image: "/sarah.webp?height=400&width=400",
  },
  {
    id: 3,
    title: "Revolutionary stock control",
    quote: "Since implementing this solution, we've seen a dramatic improvement in our inventory accuracy and staff productivity.",
    author: "Michael Rodriguez",
    role: "Warehouse Manager, Prime Logistics",
    rating: 5,
    image: "/michael.webp?height=400&width=400",
  },
]

export default function TestimonialSection() {
  return (
    <motion.section
      className="w-full py-12 bg-background"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-1 md:basis-full">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-0 shadow-none overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">{testimonial.title}</h2>
                        <blockquote className="text-base md:text-lg text-muted-foreground mb-6">&quot;{testimonial.quote}&quot;</blockquote>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="mb-2 sm:mb-0">
                            <p className="font-medium text-green-500">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 relative">
                        <Image
                          src={testimonial.image}
                          alt={`${testimonial.author} testimonial`}
                          width={400}
                          height={400}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4 md:mt-6">
            <CarouselPrevious className="mr-2 bg-background border-0 hover:bg-muted">
              <ChevronLeft className="w-6 h-6 text-green-500" />
            </CarouselPrevious>
            <CarouselNext className="ml-2 bg-background border-0 hover:bg-muted">
              <ChevronRight className="w-6 h-6 text-green-500" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </motion.section>
  )
}