"use client"

import { useState, useRef, useEffect } from 'react'
import { X, MessageCircle, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
}

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [userType, setUserType] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => setIsOpen(!isOpen)

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: inputMessage,
        sender: 'user'
      }
      setMessages(prev => [...prev, newMessage])
      setInputMessage('')
      setTimeout(() => handleBotResponse(inputMessage), 1000)
    }
  }

  const handleBotResponse = (userMessage: string) => {
    let botResponse = "I'm sorry, I didn't understand that. Can you please rephrase?"

    if (userMessage.toLowerCase().includes('job') || userMessage.toLowerCase().includes('work')) {
      botResponse = "We have many job opportunities for healthcare professionals. Can you tell me more about your specialization and preferred location?"
    } else if (userMessage.toLowerCase().includes('salary') || userMessage.toLowerCase().includes('pay')) {
      botResponse = "Salaries vary depending on the position, location, and experience. We offer competitive compensation packages. Can you specify which role you're interested in?"
    } else if (userMessage.toLowerCase().includes('apply')) {
      botResponse = "To apply for a position, you can browse our job listings and submit your application through our website. Would you like me to guide you through the process?"
    }

    const newBotMessage: Message = {
      id: Date.now().toString(),
      content: botResponse,
      sender: 'bot'
    }
    setMessages(prev => [...prev, newBotMessage])
  }

  const handleUserTypeSelection = (type: string) => {
    setUserType(type)
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      content: `Welcome! As ${type}, how can I assist you today?`,
      sender: 'bot'
    }
    setMessages([welcomeMessage])
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <>
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 z-50 rounded-full bg-[#00bfa5] hover:bg-[#20413d] p-3"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 z-50 w-80 shadow-lg">
          <CardHeader className="bg-[#00bfa5] text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                AfyaLink
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={toggleChat}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {!userType ? (
              <>
                <p className="mb-4 text-sm">
                  Hi there, I&apos;m the Aya Locums virtual assistant. Let&apos;s get you the information
                  you&apos;re looking for.
                </p>
                <p className="mb-4 text-sm">
                  By continuing with this chat, you agree that the chat may be recorded, saved,
                  and used in accordance with our privacy practices, as outlined in our{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
                <p className="mb-4 text-sm">To best support you, please share a bit about yourself:</p>
                <div className="space-y-2">
                  {[
                    "I'm a CRNA",
                    "I'm a Nurse Practitioner",
                    "I'm a Physician",
                    "I'm a Physician Assistant",
                    "I'm another type of healthcare provider",
                    "I'm not a healthcare provider"
                  ].map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => handleUserTypeSelection(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </>
            ) : (
              <ScrollArea className="h-[300px] pr-4" ref={scrollAreaRef}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block p-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-[#00bfa5] text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            )}
          </CardContent>
          {userType && (
            <CardFooter className="p-4 pt-0">
              <div className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage()
                    }
                  }}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      )}
    </>
  )
}