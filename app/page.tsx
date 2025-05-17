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

const projectsData = [
  { name: "Interactive 3D Wave Animation", url: "https://3d-waves.vercel.app/", id: "interactive-wave-animation" },
  { name: "Explosions - Physics-Based Particle Simulation", url: "https://github.com/baasilali/explosions", id: "explosions-physics-simulation" },
  { name: "Resumate.dev", url: "https://resumate.dev", id: "resumate-dev" },
  { name: "Ray Tracer Visualizer", url: "https://raytracing-fawn.vercel.app/", id: "ray-tracer-visualizer" },
  { name: "2m", url: "https://2m.trading", id: "2m-trading" },
  { name: "Entropy Visualizer", url: "https://entropy-sand.vercel.app/", id: "entropy-visualizer" }
];

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
  const [currentDirectory, setCurrentDirectory] = useState("~")
  const [installedProjects, setInstalledProjects] = useState<string[]>([])
  const [isInstalling, setIsInstalling] = useState(false)
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

Portfolio Information:
- "education": Show education details
- "experience": Show work experience
- "projects": Show project portfolio
- "certifications": Show certifications
- "clear": Clear the terminal

Navigation & Projects:
- "ls": List available projects
- "cd <project-name>": Navigate to a project
- "cd ..": Navigate back to home directory

Project Commands (when in a project directory):
- "npm install": Install project dependencies
- "npm run dev": Launch the project in a new tab

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

Interactive 3D Wave Animation
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

Entropy Visualizer - Frontend Node Manupulation
TypeScript, JavaScript, CSS, HTML

    - Implemented real-time statistical analysis and visualization of 
      system dynamics, including particle velocity, influence propagation, 
      and connection mapping, with performance-optimized rendering using 
      requestAnimationFrame and efficient neighbor detection algorithms
    - Developed a complex state management system for particles that 
      handles multiple states (ordered/chaotic), implements boundary collision 
      detection, and features an intelligent restoration algorithm that gradually 
      returns particles to their original positions


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
    const args = cmd.trim().split(" ")
    const baseCmd = args[0].toLowerCase()
    const command = commands.find((c) => c.name === baseCmd)

    let newOutput = [...output, `[root@localhost ${currentDirectory}]# ${cmd}`]

    if (isInstalling) {
      setOutput([...newOutput, "Installation in progress. Please wait."]);
      return;
    }

    if (command) {
      if (command.name === "clear") {
        setOutput(['Type "help" for available commands.'])
        return;
      } else {
        newOutput = [...newOutput, command.action()]
      }
    } else if (baseCmd === "ls") {
      if (currentDirectory === "~") {
        const projectNames = projectsData.map(p => p.id)
        newOutput = [...newOutput, " ", ...projectNames, " "]
      } else {
        newOutput = [...newOutput, " ", "Available commands: npm install, npm run dev, cd ..", " "]
      }
    } else if (baseCmd === "cd") {
      if (args.length > 1) {
        const targetDir = args.slice(1).join(" ")
        if (targetDir === "..") {
          if (currentDirectory !== "~") {
            setCurrentDirectory("~")
            newOutput = [...newOutput, `Changed directory to ~`]
          } else {
            newOutput = [...newOutput, `Already in root directory.`]
          }
        } else {
          const projectExists = projectsData.find(p => p.id === targetDir)
          if (projectExists) {
            setCurrentDirectory(targetDir)
            newOutput = [...newOutput, `Changed directory to ${targetDir}`]
          } else {
            newOutput = [...newOutput, `Directory not found: ${targetDir}`]
          }
        }
      } else {
        newOutput = [...newOutput, `Usage: cd <directory_name> or cd ..`]
      }
    } else if (baseCmd === "npm" && args.length > 1) {
      const npmAction = args[1].toLowerCase();
      if (currentDirectory === "~") {
        newOutput = [...newOutput, `npm commands can only be run inside a project directory.`];
      } else if (npmAction === "install") {
        // Check if project is already installed
        if (installedProjects.includes(currentDirectory)) {
          const auditedPackages = Math.floor(Math.random() * 200) + 300;
          const auditTime = Math.floor(Math.random() * 400) + 700;
          const fundingPackages = Math.floor(Math.random() * 100) + 80;
          
          newOutput = [...newOutput, 
            "",
            `up to date, audited ${auditedPackages} packages in ${auditTime}ms`,
            "",
            `${fundingPackages} packages are looking for funding`,
            "  run `npm fund` for details",
            "0 vulnerabilities found"
          ];
          setOutput(newOutput);
          return;
        }
        
        setIsInstalling(true);
        newOutput = [...newOutput, "Installing dependencies..."];
        setOutput(newOutput); // Show initial message

        // Create a function to generate progress bar visuals
        const generateProgressBar = (percent: number) => {
          const totalLength = 20; // Total length of the progress bar
          const filledLength = Math.floor(totalLength * percent / 100);
          // Ensure emptyLength is never negative
          const emptyLength = Math.max(0, totalLength - filledLength);
          
          const bar = "[" + 
                    "#".repeat(filledLength) + 
                    " ".repeat(emptyLength) + 
                    "] " + percent + "%";
          return bar;
        };

        // Add initial messages that will remain visible
        setTimeout(() => {
          setOutput(prev => [...prev, "Fetching packages..."]);
        }, 500);
        
        setTimeout(() => {
          setOutput(prev => [...prev, "Resolving dependencies..."]);
        }, 1000);
        
        // Add space after "Resolving dependencies..."
        setTimeout(() => {
          setOutput(prev => [...prev, ""]);
        }, 1400);
        
        // Add the progress bar line and track its position
        let progressLineIndex = 0;
        setTimeout(() => {
          // Capture the current output length before adding a new line
          setOutput(prev => {
            // This is the correct index for the progress bar after we add it
            progressLineIndex = prev.length;
            return [...prev, "[                    ] 0%"];
          });
          
          // Wait a bit to ensure the state is updated before using progressLineIndex
          setTimeout(() => {
            // Generate specific percentage steps for a 20-character progress bar
            const percentages = [20, 40, 60, 80, 100];
            
            // Schedule the progress updates
            percentages.forEach((percent, index) => {
              setTimeout(() => {
                setOutput(prev => {
                  const updated = [...prev];
                  updated[progressLineIndex] = generateProgressBar(percent);
                  return updated;
                });
              }, 400 * (index + 1)); // Update every 400ms
            });
            
            // Final completion
            setTimeout(() => {
              const numPackages = Math.floor(Math.random() * 1000) + 500;
              const timeTaken = (Math.random() * 10 + 5).toFixed(1);
              setOutput(prev => {
                const updated = [...prev];
                return [...updated, "", `Added ${numPackages} packages in ${timeTaken}s`, `0 vulnerabilities found`];
              });
              setInstalledProjects(prev => [...prev, currentDirectory]);
              setIsInstalling(false);
            }, 400 * percentages.length + 500); // Add 500ms buffer after last percentage update
          }, 100); // Small delay to ensure state is updated
        }, 1500);
        
        return; // Prevent setting output again at the end of function
      } else if (npmAction === "run" && args.length > 2 && args[2].toLowerCase() === "dev") {
        if (!installedProjects.includes(currentDirectory)) {
          newOutput = [...newOutput, `Cannot run project. Please run 'npm install' first.`];
          setOutput(newOutput);
          return;
        }
        
        const project = projectsData.find(p => p.id === currentDirectory);
        if (project) {
          newOutput = [...newOutput, "> next dev"];
          setOutput(newOutput); // Show initial message
          
          setTimeout(() => {
            setOutput(prev => [...prev, 
              "  ▲ Next.js 14.2.25",
              `  - Project URL:  ${project.url}`,
              ""
            ]);
          }, 500);
          
          setTimeout(() => {
            setOutput(prev => [...prev, " ✓ Starting..."]);
          }, 1200);
          
          setTimeout(() => {
            window.open(project.url, '_blank');
          }, 2200);
          
          return; // Prevent setting output again at the end of function
        } else {
          newOutput = [...newOutput, "Error: Could not find project data."]; // Should not happen
        }
      } else {
        newOutput = [...newOutput, `Unknown npm command: npm ${npmAction}${args.length > 2 ? ' ' + args.slice(2).join(' '): ''}`];
      }
    } else if (trimmedCmd === "flashbang") {
      setTheme('light')
      newOutput = [...newOutput, `FLASHBANG!`];
    } else if (trimmedCmd === "dark mode") {
      setTheme('dark')
      newOutput = [...newOutput, `Switched to dark mode.`];
    } else if (trimmedCmd) {
      newOutput = [...newOutput, `Command not found: ${cmd}`]
    }
    setOutput(newOutput)
  }

  const handleTabCompletion = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      
      // Get the current input
      const currentInput = input.trim().toLowerCase()
      
      // Find all commands that start with the current input
      let availableCmds = [
        ...commands.map(cmd => cmd.name),
        "ls", "cd", "flashbang", "dark mode"
      ];

      if (currentDirectory !== "~") {
        availableCmds.push("npm install", "npm run dev");
      }

      if (currentInput.startsWith("npm ")) {
        const npmArg = currentInput.substring(4);
        if (currentDirectory !== "~") {
          // When in a project directory
          if ("run".startsWith(npmArg)) {
            availableCmds = ["npm run dev"];
          } else if (npmArg === "run " || npmArg === "run d") {
            availableCmds = ["npm run dev"];
          } else if ("install".startsWith(npmArg)) {
            availableCmds = ["npm install"];
          } else {
            availableCmds = ["npm install", "npm run dev"].filter(cmd => cmd.startsWith(currentInput));
          }
        } else {
          availableCmds = [];
        }
      } else if (currentInput.startsWith("cd ")) {
        availableCmds = projectsData.map(p => `cd ${p.id}`).filter(name => name.startsWith(currentInput));
        if (currentDirectory !== "~") {
          availableCmds.push("cd ..");
        }
      } else {
         availableCmds = availableCmds.filter(cmd => cmd.startsWith(currentInput));
      }
      
      const matches = availableCmds;
      
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
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-start md:gap-8 mb-6">
          <pre className="text-xs leading-none md:text-sm whitespace-pre mb-4 md:mb-0 md:flex-shrink-0">{ASCII_NAME}</pre>
          
          <div className="md:pt-8 flex flex-col justify-center">
            <p className="mb-2">B.E. Software Engineering + Minor Buisness Adminstration</p>
            <p className="mb-4">San Jose State University</p>
            <div className="flex flex-wrap gap-4">
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
        </div>

        <div ref={outputRef} className={`mb-4 h-[70vh] overflow-y-auto rounded border ${theme === 'dark' ? 'border-green-400 bg-black' : 'border-green-800 bg-gray-100'} p-4 relative`}>
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
            <span className="mr-2">[root@localhost {currentDirectory}]#</span>
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

