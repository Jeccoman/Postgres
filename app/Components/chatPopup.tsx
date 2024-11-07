"use client"

import { useState, useRef, useEffect } from 'react'
import { X, MessageCircle, Send, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  isPartial?: boolean
}

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [userType, setUserType] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => setIsOpen(!isOpen)

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: inputMessage,
        sender: 'user'
      }
      setMessages(prev => [...prev, newMessage])
      setInputMessage('')
      await simulateRealTimeAIResponse(inputMessage)
    }
  }

  const simulateRealTimeAIResponse = async (userMessage: string) => {
    setIsTyping(true)
    const aiResponse = generateAIResponse(userMessage)
    const words = aiResponse.split(' ')
    
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50))
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1]
        if (lastMessage && lastMessage.sender === 'bot' && lastMessage.isPartial) {
          return [
            ...prev.slice(0, -1),
            { ...lastMessage, content: `${lastMessage.content} ${words[i]}` }
          ]
        } else {
          return [
            ...prev,
            {
              id: Date.now().toString(),
              content: words[i],
              sender: 'bot',
              isPartial: true
            }
          ]
        }
      })
    }

    setMessages(prev => {
      const lastMessage = prev[prev.length - 1]
      if (lastMessage && lastMessage.sender === 'bot' && lastMessage.isPartial) {
        return [
          ...prev.slice(0, -1),
          { ...lastMessage, isPartial: false }
        ]
      }
      return prev
    })
    setIsTyping(false)

    setConversationContext(prev => [...prev, userMessage, aiResponse])
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase()
    const context = conversationContext.join(' ').toLowerCase()

    if (lowercaseMessage.includes('job') || lowercaseMessage.includes('work')) {
      if (!context.includes('job opportunities')) {
        return "We have a wide range of job opportunities for healthcare professionals. These include short-term locum tenens assignments and permanent placements across various specialties. What type of position or specialty are you most interested in?"
      } else {
        return "To help you find the best job match, could you tell me more about your experience level and any specific preferences you have for your next position?"
      }
    } else if (lowercaseMessage.includes('salary') || lowercaseMessage.includes('pay')) {
      if (!context.includes('salaries vary')) {
        return "Salaries vary depending on the position, location, and experience. We offer competitive compensation packages tailored to each role. Could you specify which role or specialty you're interested in for more accurate information?"
      } else {
        return "In addition to base salary, many of our positions offer benefits like health insurance, retirement plans, and paid time off. Are there any specific aspects of compensation that are particularly important to you?"
      }
    } else if (lowercaseMessage.includes('apply')) {
      if (!context.includes('apply for a position')) {
        return "To apply for a position, you can browse our job listings on our website and submit your application online. The process typically involves creating a profile, uploading your resume, and providing some basic information. Would you like me to guide you through the steps or provide a link to our job board?"
      } else {
        return "Once you've submitted your application, our recruitment team will review it and reach out if there's a good match. Is there a particular type of position you're planning to apply for?"
      }
    } else if (lowercaseMessage.includes('location') || lowercaseMessage.includes('where')) {
      if (!context.includes('opportunities across')) {
        return "We have opportunities across the United States, from bustling urban centers to peaceful rural communities. Some popular locations include California, Texas, New York, and Florida, but we have positions in nearly every state. Do you have a preferred region or state in mind?"
      } else {
        return "Each location offers unique experiences and opportunities. Are there specific factors about the work location that are important to you, such as climate, cost of living, or proximity to certain amenities?"
      }
    } else if (lowercaseMessage.includes('benefits') || lowercaseMessage.includes('insurance')) {
      if (!context.includes('benefits packages')) {
        return "We offer comprehensive benefits packages for many of our positions. These often include health insurance, dental and vision coverage, 401(k) plans with company match, paid time off, and professional development opportunities. The specific benefits may vary depending on the position and assignment length. What benefits are most important to you?"
      } else {
        return "In addition to standard benefits, we also offer unique perks like flexible scheduling and travel reimbursements for some positions. Is there a specific benefit or perk you're particularly interested in?"
      }
    } else if (lowercaseMessage.includes('interview') || lowercaseMessage.includes('hiring process')) {
      if (!context.includes('hiring process')) {
        return "Our hiring process typically involves several steps: 1) Initial application review, 2) Phone screening with a recruiter, 3) Skills assessment or technical interview, 4) Interview with the hiring manager or team, and 5) Reference checks and offer. The entire process usually takes 2-4 weeks. Which part of the process would you like more information about?"
      } else {
        return "We strive to make our hiring process as smooth and transparent as possible. Do you have any specific concerns or questions about the interview process or what to expect during the different stages?"
      }
    } else {
      return "Thank you for your question. To provide the most helpful information, could you please clarify if you're interested in job opportunities, salaries, the application process, work locations, benefits, or our hiring process? Or if there's another aspect of working with AfyaLink you'd like to know about?"
    }
  }

  const handleUserTypeSelection = (type: string) => {
    setUserType(type)
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      content: `Welcome! As ${type}, how can I assist you today? Feel free to ask about job opportunities, salaries, application process, locations, benefits, or our hiring process.`,
      sender: 'bot'
    }
    setMessages([welcomeMessage])
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 z-50 rounded-full bg-primary hover:bg-primary/90 p-3 shadow-lg transition-all duration-300 ease-in-out"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 z-50 w-[350px] sm:w-[400px] shadow-xl max-h-[600px] flex flex-col bg-background border-primary/10 transition-all duration-300 ease-in-out rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary to-primary-dark text-primary-foreground py-3 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center font-bold">
                <svg
                  className="w-7 h-7 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
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
                AfyaLink AI
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleChat} 
                className="text-primary-foreground hover:text-primary-foreground/90 rounded-full"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow overflow-y-auto scrollbar-hide">
            {!userType ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Hi there, I&apos;m the AfyaLink AI assistant. Let&apos;s get you the information
                  you&apos;re looking for.
                </p>
                <p className="text-sm text-muted-foreground">
                  By continuing, you agree to our{' '}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
                <p className="text-sm font-medium">To best support you, please share a bit about yourself:</p>
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
                      className="w-full justify-start text-left text-sm hover:bg-primary/10 transition-colors"
                      onClick={() => handleUserTypeSelection(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={message.sender === 'user' ? "/placeholder.svg" : "/placeholder.svg"} alt={message.sender === 'user' ? "User Avatar" : "AI Avatar"} />
                        <AvatarFallback>{message.sender === 'user' ? 'U' : 'AI'}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2 max-w-[80%]">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" alt="AI Avatar" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </CardContent>
          {userType && (
            <CardFooter className="p-4 bg-background border-t">
              <form onSubmit={(e) => { e.preventDefault(); void handleSendMessage(); }} className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-grow text-sm rounded-full"
                  aria-label="Message input"
                />
                <Button type="submit" size="icon" className="shrink-0 rounded-full" aria-label="Send message">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          )}
        </Card>
      )}
    </>
  )
}