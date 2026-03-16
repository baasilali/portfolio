"use client"

import { useState, useEffect, useRef } from "react"
const ASCII_NAME = [
  "\u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2557\u2588\u2588\u2557     ",
  "\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2551\u2588\u2588\u2551     ",
  "\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2551     ",
  "\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2551     ",
  "\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
  "\u255A\u2550\u2550\u2550\u2550\u2550\u255D \u255A\u2550\u255D  \u255A\u2550\u255D\u255A\u2550\u255D  \u255A\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D",
].join("\n")

const generateNeofetch = (uptime: string, resolution: string, memory: string, isMobile: boolean) => {
  const info = [
    'baasil@portfolio',
    '-----------------',
    `__LABEL__OS:__VALUE__ FreeBSD 14.0-RELEASE amd64`,
    `__LABEL__Uptime:__VALUE__ ${uptime}`,
    '__LABEL__Packages:__VALUE__ 500 (pkg)',
    '__LABEL__Shell:__VALUE__ bash',
    `__LABEL__Resolution:__VALUE__ ${resolution}`,
    '__LABEL__DE:__VALUE__ Xfce',
    '__LABEL__WM:__VALUE__ Xfwm4',
    '__LABEL__WM Theme:__VALUE__ Default',
    '__LABEL__Theme:__VALUE__ Adwaita [GTK3]',
    '__LABEL__Icons:__VALUE__ elementary-xfce [GTK2], Adwaita [GTK3]',
    '__LABEL__Terminal:__VALUE__ portfolio.sh',
    '__LABEL__Terminal Font:__VALUE__ JetBrains Mono 12',
    '__LABEL__CPU:__VALUE__ AMD Ryzen 7 9800X3D',
    '__LABEL__GPU:__VALUE__ NVIDIA GeForce RTX 5090',
    `__LABEL__Memory:__VALUE__ ${memory}`,
    '',
    '__COLOR_PALETTE_1__',
    '__COLOR_PALETTE_2__',
  ]

  if (isMobile) {
    // Mobile: stack vertically - ASCII art above, then info below
    // Trim leading whitespace to left-align the ASCII art
    // Mark ASCII lines for smaller font rendering
    const asciiLines = ASCII_NAME.split('\n')
    const nonEmptyLines = asciiLines.filter(line => line.trim().length > 0)
    const minLeadingSpaces = Math.min(...nonEmptyLines.map(line => line.match(/^(\s*)/)?.[1].length || 0))
    const trimmedAscii = asciiLines.map(line => '__ASCII__' + line.slice(minLeadingSpaces)).join('\n')
    return '[root@localhost ~]# neofetch\n' + trimmedAscii + '\n\n' + info.join('\n') + '\n\n\nType "help" for available commands.'
  }
  
  // Desktop: side-by-side layout
  const asciiLines = ASCII_NAME.split('\n')
  const maxAsciiLength = Math.max(...asciiLines.map(line => line.length))
  const combined = []
  const maxLines = Math.max(asciiLines.length, info.length)
  
  for (let i = 0; i < maxLines; i++) {
    const asciiLine = asciiLines[i] || ''
    const infoLine = info[i] || ''
    const padding = ' '.repeat(Math.max(0, maxAsciiLength - asciiLine.length + 4))
    combined.push(asciiLine + padding + infoLine)
  }
  
  return '[root@localhost ~]# neofetch\n' + combined.join('\n') + '\n\nType "help" for available commands.'
}

const projectsData = [
  { name: "Interactive 3D Wave Animation", url: "https://3d-waves.vercel.app/", id: "interactive-wave-animation" },
  { name: "Ray Tracer Visualizer", url: "https://raytracing-fawn.vercel.app/", id: "ray-tracer-visualizer" },
  { name: "Entropy Visualizer", url: "https://entropy-sand.vercel.app/", id: "entropy-visualizer" },
  { name: "9M Holdings Inc.", url: "https://9m.site", id: "9M" },
  { name: "2M Trading (Temporarily Unavailible)", url: "https://2m.trading", id: "2m-trading" },

];

interface Command {
  name: string
  description: string
  action: () => string
}

export default function Terminal() {
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentDirectory, setCurrentDirectory] = useState("~")
  const [installedProjects, setInstalledProjects] = useState<string[]>([])
  const [isInstalling, setIsInstalling] = useState(false)
  const [showTabSuggestions, setShowTabSuggestions] = useState(false)
  const [tabSuggestions, setTabSuggestions] = useState<string[]>([])
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [accentColor, setAccentColor] = useState('#4ade80') // green-400 default
  const [uptime, setUptime] = useState("0 secs")
  const [resolution, setResolution] = useState("1920x1080")
  const [memory, setMemory] = useState("0MB / 0MB")
  const [isMobile, setIsMobile] = useState(false)
  const [output, setOutput] = useState<string[]>([])
  const [isNeofetchMode, setIsNeofetchMode] = useState(false)
  const [shouldScroll, setShouldScroll] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef(Date.now())

  const commands: Command[] = [
    {
      name: "help",
      description: "Show available commands",
      action: () => `Step bash, version 9.17.03.11.22.01-release (x86_64)
These shell commands are defined internally.
Type 'help' to see this list.

Availible Commands:
- "education": Show education details
- "experience": Show work experience
- "neofetch": Display system information
- "projects": Show project portfolio
- "certifications": Show certifications
- "links": Show contact links
- "clear": Clear the terminal

`,
    },
    {
      name: "neofetch",
      description: "Display system information",
      action: () => "NEOFETCH",
    },
    {
      name: "links",
      description: "Show contact links",
      action: () => `

GitHub: https://github.com/baasilali
LinkedIn: https://linkedin.com/in/baasilali
Email: baasil.ali@gmail.com
Twitter: https://x.com/baasilalii
Resume: https://drive.google.com/file/d/1o59oWJB0hXdixwsfjoanPJ9xRY3tnvkh/view?usp=sharing

`,
    },
    {
      name: "education",
      description: "Show education details",
      action: () => `
San Jose State University - Bachelor's in Science in Software Engineering
- Additional Enrollement: Computer Networking (CNSM)
- Minor in Business Administration
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

---

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

---

Elide - Project Engineer
July 2025 - December 2025
San Francisco, CA

    - Created and maintain core runtime and documentation + docs architechture.
    - Over 60,000 lines of code merged.

---

Elide - Director of Marketing
January 2026 - Present
San Francisco, CA

    - Product Development, Marketing, and Growth.

`,
    },
    {
      name: "projects",
      description: "Show project portfolio",
      action: () => `

Ultrasonic Measuring Instrument 
C, C++
    - Using an Arduino IDE and a RaspberryPi5, developed multi-layered
      functions in C/C# to read data from an Ultrasonic Sensor to 
      accurately measure exact distances (in cm/in/ft) up to 15 ft 
      with a 4% error margin (laser-measuring instrument as control) 
    - Presented at SJSU StartUp and SJSU IdeasLab - Earned 2 Awards 
      for Innovation

---

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

---

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

---

Entropy Visualizer - Frontend Node Manipulation
TypeScript, JavaScript, CSS, HTML

    - Implemented real-time statistical analysis and visualization of 
      system dynamics, including particle velocity, influence propagation, 
      and connection mapping, with performance-optimized rendering using 
      requestAnimationFrame and efficient neighbor detection algorithms
    - Developed a complex state management system for particles that 
      handles multiple states (ordered/chaotic), implements boundary collision 
      detection, and features an intelligent restoration algorithm that gradually 
      returns particles to their original positions

---

Resumate.dev - visibility.
Python, Next.js, Node.js, HTML/CSS/JS

    - Developed an AI integrated web-app trained on an NLP using 
      spaCy to provide keyword feedback for users, leveraging company 
      ATS systems
    - Next.js / TSX front-end Node.Js backend, used MongoDB and MySQL 
      to securely organize and store information to train AI
    - Calculated 90% efficiency in data allocation, 98% accuracy in created 
      word-clouds and calculated a 18% increase in interviews

---

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

---

2m
Node.js, React, AWS, HTML/CSS/JS

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
      action: () => "CLEAR_SCREEN",
    },
  ]

  // Scroll to bottom when shouldScroll is triggered
  useEffect(() => {
    if (shouldScroll) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
        setShouldScroll(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [shouldScroll, output])

  const scrollToBottom = () => {
    setShouldScroll(true)
  }

  // Update neofetch display when active and system info changes
  useEffect(() => {
    if (isNeofetchMode) {
      setOutput([generateNeofetch(uptime, resolution, memory, isMobile)])
    }
  }, [uptime, resolution, memory, isMobile, isNeofetchMode])

  // Set initial output to ASCII name and ensure we're at top
  useEffect(() => {
    setOutput([ASCII_NAME + '\n\nType "help" for available commands.'])
    window.scrollTo(0, 0)
  }, [])

  // Update uptime every second
  useEffect(() => {
    const updateUptime = () => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      if (elapsed < 60) {
        setUptime(`${elapsed} secs`)
      } else if (elapsed < 3600) {
        const mins = Math.floor(elapsed / 60)
        const secs = elapsed % 60
        setUptime(`${mins} min${mins !== 1 ? 's' : ''}, ${secs} secs`)
      } else {
        const hours = Math.floor(elapsed / 3600)
        const mins = Math.floor((elapsed % 3600) / 60)
        setUptime(`${hours} hour${hours !== 1 ? 's' : ''}, ${mins} min${mins !== 1 ? 's' : ''}`)
      }
    }
    
    updateUptime()
    const interval = setInterval(updateUptime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Update resolution and mobile detection on window resize
  // The side-by-side neofetch needs ~125 chars width, at ~9.6px per char = ~1200px minimum
  useEffect(() => {
    const updateResolution = () => {
      setResolution(`${window.innerWidth}x${window.innerHeight}`)
      setIsMobile(window.innerWidth < 1200)
    }
    
    updateResolution()
    window.addEventListener('resize', updateResolution)
    return () => window.removeEventListener('resize', updateResolution)
  }, [])

  // Update memory usage
  useEffect(() => {
    const updateMemory = () => {
      // performance.memory is Chrome/Chromium only
      const perf = performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }
      if (perf.memory) {
        const used = Math.round(perf.memory.usedJSHeapSize / 1024 / 1024)
        const total = Math.round(perf.memory.jsHeapSizeLimit / 1024 / 1024)
        setMemory(`${used}MB / ${total}MB`)
      } else {
        setMemory('N/A')
      }
    }
    
    updateMemory()
    const interval = setInterval(updateMemory, 2000)
    return () => clearInterval(interval)
  }, [])

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

    // Disable neofetch mode when any command is run (except clear/neofetch which handle it specially)
    if (command?.name !== "clear" && command?.name !== "neofetch") {
      setIsNeofetchMode(false)
    }

    if (command) {
      if (command.name === "clear") {
        setIsNeofetchMode(false)
        setOutput(['Type "help" for available commands.'])
        return;
      } else if (command.name === "neofetch") {
        setIsNeofetchMode(true)
        setOutput([...newOutput, generateNeofetch(uptime, resolution, memory, isMobile).replace('[root@localhost ~]# neofetch\n', '')])
        return;
      } else {
        newOutput = [...newOutput, command.action()]
      }
    } else if (baseCmd === "ls") {
      setIsNeofetchMode(false)
      const helpCmd = commands.find(c => c.name === "help")
      if (helpCmd) {
        newOutput = [...newOutput, helpCmd.action()]
      }
    } else if (baseCmd === "cd") {
      setIsNeofetchMode(false)
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
      setIsNeofetchMode(false)
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
              scrollToBottom();
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
          scrollToBottom();
          
          setTimeout(() => {
            setOutput(prev => [...prev, 
              "  ▲ Next.js 14.2.25",
              `  - Project URL:  ${project.url}`,
              ""
            ]);
            scrollToBottom();
          }, 500);
          
          setTimeout(() => {
            setOutput(prev => [...prev, " ✓ Starting..."]);
            scrollToBottom();
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
      setIsNeofetchMode(false)
      setTheme('light')
      newOutput = [...newOutput, `FLASHBANG!`];
    } else if (trimmedCmd === "dark mode") {
      setIsNeofetchMode(false)
      setTheme('dark')
      newOutput = [...newOutput, `Switched to dark mode.`];
    } else if (trimmedCmd) {
      setIsNeofetchMode(false)
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
      scrollToBottom()
    }
  }

  const handleClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div 
      className={`min-h-screen font-mono text-xs sm:text-sm md:text-base ${theme === 'dark' ? 'bg-black' : 'bg-gray-200'}`} 
      style={{ color: accentColor }}
      onClick={handleClick}
    >
      <div ref={outputRef} className={`min-h-screen overflow-x-auto ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'} pt-8 pb-2 pl-2 pr-2 sm:pt-12 sm:pb-4 sm:pl-4 sm:pr-4 relative`} style={{ paddingTop: 'max(2.5rem, env(safe-area-inset-top, 0px))' }}>
          {output.map((entry, i) => {
            const lines = entry.split('\n')
            return lines.map((line, j) => {
              const key = `${i}-${j}`
              if (line.includes('__COLOR_PALETTE_1__')) {
                const prefix = line.split('__COLOR_PALETTE_1__')[0]
                const palette1 = [
                  '#1f2937', // gray-800
                  '#991b1b', // red-800
                  '#166534', // green-800
                  '#a16207', // yellow-700
                  '#1e40af', // blue-800
                  '#6b21a8', // purple-800
                  '#0e7490', // cyan-700
                  '#6b7280', // gray-500
                ]
                return (
                  <div key={key} className="whitespace-pre leading-none">
                    {prefix}
                    {palette1.map((color, idx) => (
                      <span
                        key={idx}
                        className="cursor-pointer hover:opacity-80"
                        style={{ color, backgroundColor: color }}
                        onClick={(e) => { e.stopPropagation(); setAccentColor(color); }}
                      >███</span>
                    ))}
                  </div>
                )
              }
              if (line.includes('__COLOR_PALETTE_2__')) {
                const prefix = line.split('__COLOR_PALETTE_2__')[0]
                const palette2 = [
                  '#6b7280', // gray-500
                  '#ef4444', // red-500
                  '#22c55e', // green-500
                  '#facc15', // yellow-400
                  '#3b82f6', // blue-500
                  '#a855f7', // purple-500
                  '#22d3ee', // cyan-400
                  '#ffffff', // white
                ]
                return (
                  <div key={key} className="whitespace-pre leading-none">
                    {prefix}
                    {palette2.map((color, idx) => (
                      <span
                        key={idx}
                        className="cursor-pointer hover:opacity-80"
                        style={{ color, backgroundColor: color }}
                        onClick={(e) => { e.stopPropagation(); setAccentColor(color); }}
                      >███</span>
                    ))}
                  </div>
                )
              }
              if (line.includes('__LABEL__') && line.includes('__VALUE__')) {
                const parts = line.split('__LABEL__')
                const prefix = parts[0]
                const rest = parts[1].split('__VALUE__')
                const label = rest[0]
                const value = rest[1]
                return (
                  <div key={key} className="whitespace-pre">
                    {prefix}<span style={{ color: accentColor }}>{label}</span><span className="text-white">{value}</span>
                  </div>
                )
              }
              // Mobile ASCII art - render with smaller font
              if (line.startsWith('__ASCII__')) {
                const asciiContent = line.slice(9) // Remove '__ASCII__' prefix
                return (
                  <div key={key} className="whitespace-pre text-[0.5rem] sm:text-[0.6rem] leading-none">
                    {asciiContent}
                  </div>
                )
              }
              // Check if line is ASCII art or neofetch output (should stay green)
              const isNeofetchLine = line.includes('@portfolio') || 
                                     line.includes('baasil@') ||
                                     /^[\s\S]*-{10,}[\s\S]*$/.test(line.trim()) && line.trim().startsWith('-')
              const isProjectId = ['interactive-wave-animation', 'ray-tracer-visualizer', 'entropy-visualizer', '9M', '2m-trading'].includes(line)
              const isAsciiArt = !isProjectId && (
                /^[\s._\-'`\\\/;:,|(){}[\]<>~!@#$%^&*+=]*$/.test(line) || 
                (line.trim().length > 0 && !/[a-zA-Z]{3,}/.test(line.replace(/baasil|root|localhost|portfolio|neofetch/gi, '')))
              )
              
              // Keep default green, only make specific command output white
              const isWhiteLine = (
                !isAsciiArt &&
                !isNeofetchLine &&
                // Skip separators - keep them green
                line.trim() !== '---' &&
                (
                // Help command output content
                line.startsWith('- "') ||
                // Education, experience, projects, certifications, links output - must have actual word content
                (line.startsWith('    ') && !line.includes('__') && /[a-zA-Z]{2,}/.test(line)) ||
                line.startsWith('San Jose State University') ||
                line.startsWith('Innowi') ||
                line.startsWith('Teledyne') ||
                line.startsWith('Elide') ||
                line.startsWith('Ultrasonic') ||
                line.startsWith('Interactive') ||
                line.startsWith('Explosions') ||
                line.startsWith('Entropy') ||
                line.startsWith('Resumate') ||
                line.startsWith('Ray Tracer') ||
                line.startsWith('2m') ||
                isProjectId ||
                line.startsWith('GitHub:') ||
                line.startsWith('LinkedIn:') ||
                line.startsWith('Email:') ||
                line.startsWith('Twitter:') ||
                line.startsWith('Resume:') ||
                line.startsWith('- Additional') ||
                line.startsWith('- Minor') ||
                line.startsWith('- Graduation') ||
                line.startsWith('- GPA') ||
                line.startsWith('- Relevant') ||
                line.startsWith('- AWS') ||
                line.startsWith('- IBM') ||
                line.startsWith('- Stanford') ||
                line.startsWith('- Palo Alto') ||
                line.startsWith('- Cisco') ||
                line.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/) ||
                line.match(/^(Java|Python|Node|React|C,|Three)/) ||
                line.includes('Santa Clara') ||
                line.includes('Milpitas') ||
                line.includes('San Francisco')
              ))
              
              // Empty lines need min-height to render as actual spacing
              if (line.trim() === '') {
                return <div key={key} className="h-[1.2em]">&nbsp;</div>
              }
              
              // Render clickable links
              const linkMatch = line.match(/^(GitHub|LinkedIn|Email|Twitter|Resume):\s*(.+)$/)
              if (linkMatch) {
                const label = linkMatch[1]
                const value = linkMatch[2]
                const href = label === 'Email' ? `mailto:${value}` : value
                return (
                  <div key={key} className="whitespace-pre-wrap text-white">
                    {label}:{' '}
                    <a 
                      href={href}
                      target={label === 'Email' ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="underline hover:opacity-80"
                      style={{ color: accentColor }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {value}
                    </a>
                  </div>
                )
              }

              // On mobile, handle indentation smartly with hanging indent for bullets
              if (isMobile) {
                const trimmed = line.trimStart()
                const isBullet = trimmed.startsWith('- ')
                
                if (isBullet) {
                  // Hanging indent: bullet stays left, text wraps properly
                  return (
                    <div key={key} className={`whitespace-normal flex ${isWhiteLine ? 'text-white' : ''}`}>
                      <span className="shrink-0">- </span>
                      <span>{trimmed.slice(2)}</span>
                    </div>
                  )
                }
                
                return (
                  <div key={key} className={`whitespace-normal ${isWhiteLine ? 'text-white' : ''}`}>
                    {trimmed}
                  </div>
                )
              }
              
              if (isAsciiArt) {
                return (
                  <div key={key} className="whitespace-pre" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
                    {line}
                  </div>
                )
              }

              return (
                <div key={key} className={`whitespace-pre-wrap ${isWhiteLine ? 'text-white' : ''}`}>
                  {line}
                </div>
              )
            })
          })}
          
          {/* Tab suggestions */}
          {showTabSuggestions && tabSuggestions.length > 0 && (
            <div 
              className={`absolute bottom-12 left-4 right-4 ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'} border p-2 rounded`}
              style={{ borderColor: accentColor }}
            >
              <div className="text-sm" style={{ color: accentColor }}>Available commands:</div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {tabSuggestions.map((cmd, i) => (
                  <div key={i} style={{ color: accentColor }}>{cmd}</div>
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
    )
  }

