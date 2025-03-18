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
- "clear": Clear the terminal

`,
    },
    {
      name: "education",
      description: "Show education details",
      action: () => `
San Jose State University - Bachelor's in Engineering in Software Engineering
- Minor in Buisness Administration
- Graduation Year: 2025
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
      
Rhythmic Ai - Find music you actually like.
Tensorflow, PyTorch

    - Utilized Pytorch and TensorFlow, to train Machine-Learning LLM 
      to recommend songs based on similarities in Music Theory
    - Algorithm was focused on summarization and trained on a 
      transformer model Neural Network

Resumate.dev - visibilty.
Python, Next.js, Node.js, HTML/CS/JS

    - Developed an AI integrated web-app trained on an NLP using 
      spaCy to provide keyword feedback for users, leveraging company 
      ATS systems
    - Next.js / TSX front-end Node.Js backend, used MongoDB and MySQL 
      to securely organize and store information to train AI
    - Calculated 90% efficiency in data allocation, 98% accuracy in created 
      word-clouds and calculated a 18% increase in interviews

2m
Node.js, Angular, Golang, HTML/CSS/JS

    - Coming Soon! (Stealth Startup)

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
    } else if (trimmedCmd) {
      setOutput((prev) => [...prev, `[root@localhost ~]# ${cmd}`, `Command not found: ${cmd}`])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput("")
    }
  }

  const handleClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-black p-4 font-mono text-green-400" onClick={handleClick}>
      <div className="mx-auto max-w-3xl">
        <pre className="mb-4 text-xs leading-none md:text-sm">{ASCII_NAME}</pre>

        <div className="mb-6">
          <p className="mb-1">B.E. Software Engineering + Minor Buisness Adminstration</p>
          <p className="mb-3">San Jose State University</p>
          <div className="flex space-x-4">
            <Link href="https://github.com/baasilali" className="hover:text-green-300">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com/in/baasilali" className="hover:text-green-300">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="mailto:baasil.ali@gmail.com" className="hover:text-green-300">
              <Mail className="h-5 w-5" />
            </Link>
            <Link href="https://drive.google.com/file/d/1uO7cDSyq9zHykewBZKtcgqyrvOpwhsss/view?usp=sharing" className="hover:text-green-300">
              <File className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div ref={outputRef} className="mb-4 h-[60vh] overflow-y-auto rounded border border-green-400 bg-black p-4">
          {output.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex">
            <span className="mr-2">[root@localhost ~]#</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  )
}

