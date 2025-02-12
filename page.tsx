"use client"

import { useState, useEffect, useRef } from "react"
import { Github, Linkedin, Mail } from "lucide-react"
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
  const [output, setOutput] = useState<string[]>(['Welcome! Type "help" for available commands.'])
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const commands: Command[] = [
    {
      name: "help",
      description: "Show available commands",
      action: () => `Available commands:
- help: Show this help message
- education: Show education details
- experience: Show work experience
- projects: Show project portfolio
- clear: Clear the terminal`,
    },
    {
      name: "education",
      description: "Show education details",
      action: () => `Education:
- Bachelor's in Computer Science
- University Name
- Graduation Year: 20XX
- GPA: X.XX`,
    },
    {
      name: "experience",
      description: "Show work experience",
      action: () => `Work Experience:
- Software Engineer at Company A (20XX - Present)
- Web Developer at Company B (20XX - 20XX)`,
    },
    {
      name: "projects",
      description: "Show project portfolio",
      action: () => `Projects:
- Project A: Description here
- Project B: Description here
- Project C: Description here`,
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
        setOutput([])
      } else {
        setOutput((prev) => [...prev, `$ ${cmd}`, command.action()])
      }
    } else if (trimmedCmd) {
      setOutput((prev) => [...prev, `$ ${cmd}`, `Command not found: ${cmd}`])
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
          <p className="mb-2">BSc Computer Science</p>
          <div className="flex space-x-4">
            <Link href="https://github.com/yourusername" className="hover:text-green-300">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com/in/yourusername" className="hover:text-green-300">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="mailto:your.email@example.com" className="hover:text-green-300">
              <Mail className="h-5 w-5" />
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

