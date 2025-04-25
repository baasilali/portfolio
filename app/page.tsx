"use client"

import { useState, useEffect, useRef } from "react"
import { File, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

const ASCII_NAME = `
██████╗  █████╗  █████╗ ███████╗██╗██╗     
██╔══██╗██╔══██╗██╔══██╗██╔════╝██║██║     
██████╔╝███████║███████║███████╗██║██║     
██╔══██╗██╔══██║██╔══██║╚════██║██║██║     
██████╔╝██║  ██║██║  ██║███████║██║███████╗
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝
`

interface Command {
  name: string
  description: string
  action: () => string
}

export default function Terminal() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>(['Type "help" for available commands.'])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showTabSuggestions, setShowTabSuggestions] = useState(false)
  const [tabSuggestions, setTabSuggestions] = useState<string[]>([])
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const commands: Command[] = [
    {
      name: "help",
      description: "Show available commands",
      action: () => `Step bash, version 9.17.03.11.22.01-release (x86_64)
These shell commands are defined internally.
Type 'help' to see this list.

- "education": Show education details
- "experience": Show work experience
- "projects": Show project portfolio
- "certifications": Show certifications
- "clear": Clear the terminal

`,
    },
    {
      name: "education",
      description: "Show education details",
      action: () => `
San Jose State University - Bachelor's in Engineering in Software Engineering
- Minor in Buisness Administration
- Graduation Year: 2026
- GPA: 3.86

- Relevant Course Material: 
    - Data Structures, Python Programming, Object-Oriented Design, 
      Linear Algebra/ Differential Equations, Multivariable
      Calculus, Introduction to Engineering, Analog/DigitalCircuits, 
      Network Administration, Internet of Things (IoT)

`,
    },
    {
      name: "experience",
      description: "Show work experience",
      action: () => `

Innowi Inc. - SWE Intern
Sep 2021 - Feb 2022
Santa Clara, CA
Java, JavaScript, Node.js, Next.js

      - Designed and implemented front-end point of sale software for 
        73 restaurants to increase order efficiency on company kiosks
      - Maintained back-end objects on an Android OS, Java programming 
        and Creo Parametric for customized interactive UI/UX
      - Product usage increased by 35% post front-end development, 
        increasing profit by 50,000 USD in one calendar year

Teledyne Lecroy - SWE Intern
July 2023 - Nov 2023
Milpitas, CA
Python

    - Developed an Interposer Test Utility to increase/automate testing, 
      efficiency increased by ~50% to ease workloads for peers.
    - Created a central API to allow other engineers to test and debug 
      15+ interposer's firmware upholding NVMe PCIe standards
    - PyQt5 for front-end app dev. and created dynamic/self-sustained 
      back-end objects to minimize future maintenance
    - Created documentation for over 50+ classes and programs, used 
      feedback from Sr. Engineers to uphold relevancy and use-cases

`,
    },
    {
      name: "projects",
      description: "Show project portfolio",
      action: () => `

Ultrasonic Measuring Intrument 
C, C++
    - Using an Arduino IDE and a RasberryPi5, developed multi-layered
      functions in C/C# to read data from an Ultrasonic Sensor to 
      accurately measure exact distances (in cm/in/ft) up to 15 ft 
      with a 4% error margin (laser-measuring instrument as control) 
    - Presented at SJSU StartUp and SJSU IdeasLab - Earned 2 Awards 
      for Innovation

Interactive Wave Animation
Three.js, GLSL, JavaScript, WebGL

    - Engineered a real-time 3D wave simulation using Three.js and custom 
      GLSL shaders, implementing Perlin noise algorithms for fluid 
      wave pattern generation
    - Developed a dual-wave system with interactive parameter controls, 
      allowing real-time manipulation of wave frequency (0.1-3.0Hz), 
      amplitude (0.1-3.0), and speed (0.01-2.0)
    - Optimized performance through efficient point cloud rendering and 
      shader computations, maintaining 60+ FPS across modern browsers 
      while handling thousands of vertices
    - Implemented comprehensive camera controls with smooth transitions 
      and auto-rotation, along with a responsive design system adapting 
      to various screen sizes and device capabilities

Explosions - Physics-Based Particle Simulation
Python, Tkinter

    - Engineered a real-time physics engine simulating gravity effects, 
      elastic collisions, and particle-to-particle interactions with 
      velocity-based explosion mechanics
    - Implemented comprehensive collision detection system handling 
      ball-to-ball and wall collisions with energy loss calculations 
      and bounce damping
    - Developed an interactive UI for velocity control and simulation 
      management, featuring real-time parameter adjustments and 
      state reset functionality

Resumate.dev - visibilty.
Python, Next.js, Node.js, HTML/CS/JS

    - Developed an AI integrated web-app trained on an NLP using 
      spaCy to provide keyword feedback for users, leveraging company 
      ATS systems
    - Next.js / TSX front-end Node.Js backend, used MongoDB and MySQL 
      to securely organize and store information to train AI
    - Calculated 90% efficiency in data allocation, 98% accuracy in created 
      word-clouds and calculated a 18% increase in interviews

Ray Tracer Visualizer - Interactive Light Simulation
React, Three.js, TypeScript, Tailwind CSS

    - Engineered a real-time 3D light simulation system with dual 
      visualization modes (Technical/Realistic), implementing physical-based 
      rendering and dynamic ray tracing
    - Developed an interactive environment featuring configurable objects 
      (metallic sphere, matte cube, glass dodecahedron) with realistic 
      material properties and transformations
    - Optimized performance through conditional ray visualization and 
      efficient geometry updates, achieving smooth real-time rendering 
      with up to 50 concurrent light rays
    - Implemented comprehensive controls for camera manipulation, object 
      transformation, and ray parameter adjustments using React Three 
      Fiber and Drei

2m
Node.js, React, AWS, HTML/CSS/JS

    - Coming Soon! (2m.trading)
    - Designed and integrated an AI-driven chatbot tailored for the CS:GO 
      Skin economy, leveraging a customized Llama3 model on a RAG to 
      real-time data on prices, market-trends, and pattern-identification
    - Developed a marketplace to buy and trade digital assets, and efficient 
      handling of querying multi-billion row databases, thousands of API 
      requests, and transactional sales from over 10,000 MAU
      (integrated with Stripe)
    - Data Collection was done by aggregating data from all popular CS2 
      sites, parsed and organized JSON format

`,
    },
    {
      name: "certifications",
      description: "Show certifications",
      action: () => `
      
- AWS Certified Cloud Practitioner
- IBM Exploratory Data Analysis for Machine Learning
- Stanford Machine Learning: Regression and Classification
- Palo Alto Networks Cybersecurity Certification
- Cisco CCNA Switching, Routing, and Wireless Essentials
- Cisco CCNA: Introduction to Networks


`,
    },
    {
      name: "clear",
      description: "Clear the terminal",
      action: () => "",
    },
  ]

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output]) // This dependency is necessary for scrolling to work

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const command = commands.find((c) => c.name === trimmedCmd)

    if (command) {
      if (command.name === "clear") {
        setOutput(['Type "help" for available commands.'])
      } else {
        setOutput((prev) => [...prev, `[root@localhost ~]# ${cmd}`, command.action()])
      }
    } else if (trimmedCmd === "ls") {
      setOutput((prev) => [...prev, `[root@localhost ~]# ${cmd}`, `No directories. Type "help" for available commands.`])
    } else if (trimmedCmd === "cd") {
      setOutput((prev) => [...prev, `[root@localhost ~]# ${cmd}`, `No directories. Type "help" for available commands.`])
    } else if (trimmedCmd === "flashbang") {
      setTheme('light')
      setOutput((prev) => [...prev, `[root@localhost ~]# ${cmd}`, `FLASHBANG!`])
    } else if (trimmedCmd === "dark mode") {
      setTheme('dark')
      setOutput((prev) => [...prev, `[root@localhost ~]# ${cmd}`, `Switched to dark mode.`])
    } else if (trimmedCmd) {
      setOutput((prev) => [...prev, `[root@localhost ~]# ${cmd}`, `Command not found: ${cmd}`])
    }
  }

  const handleTabCompletion = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      
      // Get the current input
      const currentInput = input.trim().toLowerCase()
      
      // Find all commands that start with the current input
      const matches = [
        ...commands.map(cmd => cmd.name),
        "ls", "cd", "flashbang", "dark mode" // Add secret commands to tab completion
      ].filter(cmd => cmd.startsWith(currentInput))
      
      if (matches.length === 0) {
        // No matches, do nothing
        return
      } else if (matches.length === 1) {
        // Exactly one match, auto-complete it
        setInput(matches[0])
        setShowTabSuggestions(false)
      } else {
        // Multiple matches, show suggestions
        setTabSuggestions(matches)
        setShowTabSuggestions(true)
        
        // If this is the second tab press with the same input, complete with the first suggestion
        if (tabSuggestions.length > 0 && 
            JSON.stringify(tabSuggestions) === JSON.stringify(matches) && 
            input === currentInput) {
          setInput(matches[0])
          setShowTabSuggestions(false)
        }
      }
    } else if (e.key === 'Escape') {
      // Hide suggestions when Escape is pressed
      setShowTabSuggestions(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setShowTabSuggestions(false) // Hide suggestions when navigating history
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setShowTabSuggestions(false) // Hide suggestions when navigating history
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else {
        setHistoryIndex(-1)
        setInput("")
      }
    } else if (e.key === 'Tab') {
      handleTabCompletion(e)
    } else if (e.key === 'Escape') {
      setShowTabSuggestions(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setShowTabSuggestions(false) // Hide suggestions when typing
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setCommandHistory(prev => [...prev, input])
      setHistoryIndex(-1)
      setInput("")
    }
  }

  const handleClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div className={`min-h-screen p-4 font-mono ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-gray-200 text-green-800'}`} onClick={handleClick}>
      <div className="mx-auto max-w-3xl">
        <pre className="mb-4 text-xs leading-none md:text-sm">{ASCII_NAME}</pre>

        <div className="mb-6">
          <p className="mb-1">B.E. Software Engineering + Minor Buisness Adminstration</p>
          <p className="mb-3">San Jose State University</p>
          <div className="flex space-x-4">
            <Link href="https://github.com/baasilali" className={`flex items-center space-x-1 ${theme === 'dark' ? 'hover:text-green-300' : 'hover:text-green-600'}`}>
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </Link>
            <Link href="https://linkedin.com/in/baasilali" className={`flex items-center space-x-1 ${theme === 'dark' ? 'hover:text-green-300' : 'hover:text-green-600'}`}>
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn</span>
            </Link>
            <Link href="mailto:baasil.ali@gmail.com" className={`flex items-center space-x-1 ${theme === 'dark' ? 'hover:text-green-300' : 'hover:text-green-600'}`}>
              <Mail className="h-5 w-5" />
              <span>Email</span>
            </Link>
            <Link href="https://drive.google.com/file/d/1uO7cDSyq9zHykewBZKtcgqyrvOpwhsss/view?usp=sharing" className={`flex items-center space-x-1 ${theme === 'dark' ? 'hover:text-green-300' : 'hover:text-green-600'}`}>
              <File className="h-5 w-5" />
              <span>Resume</span>
            </Link>
          </div>
        </div>

        <div ref={outputRef} className={`mb-4 h-[60vh] overflow-y-auto rounded border ${theme === 'dark' ? 'border-green-400 bg-black' : 'border-green-800 bg-gray-100'} p-4 relative`}>
          {output.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
          
          {/* Tab suggestions */}
          {showTabSuggestions && tabSuggestions.length > 0 && (
            <div className={`absolute bottom-12 left-4 right-4 ${theme === 'dark' ? 'bg-black border-green-400' : 'bg-gray-100 border-green-800'} border p-2 rounded`}>
              <div className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-800'}`}>Available commands:</div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {tabSuggestions.map((cmd, i) => (
                  <div key={i} className={theme === 'dark' ? 'text-green-400' : 'text-green-800'}>{cmd}</div>
                ))}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex">
            <span className="mr-2">[root@localhost ~]#</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none"
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  )
}

