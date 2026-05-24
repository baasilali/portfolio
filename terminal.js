const CONFIGS = {
  home: {
    cwd: "~/workspace/home",
    tree: {
      works: { url: "./works.html" },
      contact: { url: "./contact.html" },
    },
    animate: true,
  },
  works: {
    cwd: "~/workspace/works",
    tree: {
      "2026": {
        "statistically-the-best-crosshair": { url: "./crosshair.html" },
        "halftones-and-dithers": { url: "./halftones.html" },
      },
      "2025": {
        "the-perfect-pc": { url: "./perfect-pc.html" },
        "elide-simplyfying-complexity": { url: "./elide.html" },
      },
      home: { url: "./index.html" },
      contact: { url: "./contact.html" },
    },
  },
  contact: {
    cwd: "~/workspace/contact",
    tree: {
      home: { url: "./index.html" },
      works: { url: "./works.html" },
      x: { url: "https://x.com/baasil" },
      linkedin: { url: "https://www.linkedin.com/in/baasilali" },
      github: { url: "https://github.com/baasilali" },
      mail: { url: "mailto:baasil@elide.dev" },
    },
  },
};

const config = CONFIGS[document.body.dataset.cwd];
const terminal = document.getElementById("terminal");

let subdir = [];
let activeLine = terminal.querySelector(".prompt-line.active");
let activeCmd = activeLine.querySelector(".cmd");
let buffer = "";
let demoTl = null;

function currentNode() {
  return subdir.reduce((node, seg) => node[seg], config.tree);
}

function currentPath() {
  return [config.cwd, ...subdir].join("/");
}

function lsOutput() {
  return Object.keys(currentNode()).join("  ");
}

function freezeActivePrompt() {
  activeLine.classList.remove("active");
  activeLine.querySelector(".caret")?.remove();
}

function makePromptLine() {
  const line = document.createElement("div");
  line.className = "line prompt-line active";
  line.innerHTML = `<span class="prefix">baasil ${currentPath()} %&nbsp;</span><span class="cmd"></span><span class="caret">_</span>`;
  terminal.appendChild(line);
  activeLine = line;
  activeCmd = line.querySelector(".cmd");
  buffer = "";
}

function appendOutput(text, cls = "output") {
  const line = document.createElement("div");
  line.className = `line ${cls}`;
  line.textContent = text;
  terminal.appendChild(line);
}

function render() {
  activeCmd.textContent = buffer;
}

const COMMANDS = ["ls", "cd", "clear"];

function complete() {
  const parts = buffer.split(" ");
  const last = parts[parts.length - 1];
  const lower = last.toLowerCase();

  let candidates;
  if (parts.length === 1) {
    candidates = COMMANDS;
  } else if (parts[0] === "cd") {
    candidates = Object.keys(currentNode());
  } else {
    return;
  }

  const matches = candidates.filter(
    (c) => c.toLowerCase().startsWith(lower) && c.toLowerCase() !== lower,
  );

  if (matches.length === 1) {
    parts[parts.length - 1] = matches[0];
    buffer = parts.join(" ");
    render();
  }
}

function execute(input) {
  const cmd = input.trim();
  freezeActivePrompt();

  if (cmd === "") {
    makePromptLine();
    return;
  }

  const [name, ...args] = cmd.split(/\s+/);

  if (name === "clear" && args.length === 0) {
    terminal.innerHTML = "";
    makePromptLine();
    return;
  } else if (name === "ls" && args.length === 0) {
    appendOutput(lsOutput());
  } else if (name === "cd") {
    const raw = args[0] || "";
    const target = raw.toLowerCase();

    if (target === "..") {
      if (subdir.length > 0) subdir.pop();
    } else {
      const node = currentNode();
      const key = Object.keys(node).find((k) => k.toLowerCase() === target);
      const entry = key ? node[key] : null;

      if (!entry) {
        appendOutput(`cd: no such file or directory: ${raw}`, "error");
      } else if (entry.url) {
        window.location.href = entry.url;
        return;
      } else {
        subdir.push(key);
      }
    }
  } else {
    appendOutput(`zsh: command not found: ${name}`, "error");
  }

  makePromptLine();
}

document.addEventListener("keydown", (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  if (demoTl && demoTl.isActive()) {
    demoTl.kill();
    activeCmd.textContent = buffer;
  }

  if (e.key === "Tab") {
    e.preventDefault();
    complete();
  } else if (e.key === "Enter") {
    e.preventDefault();
    execute(buffer);
  } else if (e.key === "Backspace") {
    e.preventDefault();
    buffer = buffer.slice(0, -1);
    render();
  } else if (e.key.length === 1) {
    e.preventDefault();
    buffer += e.key;
    render();
  }
});

if (config.animate && typeof gsap !== "undefined") {
  const phrases = ["cd works", "cd contact"];
  demoTl = gsap.timeline({ defaults: { ease: "none" } });
  phrases.forEach((text) => {
    const s = { n: 0 };
    demoTl
      .to(s, {
        n: text.length,
        duration: text.length * 0.14,
        onUpdate: () => { activeCmd.textContent = text.slice(0, Math.round(s.n)); },
      })
      .to({}, { duration: 1.0 })
      .to(s, {
        n: 0,
        duration: text.length * 0.09,
        onUpdate: () => { activeCmd.textContent = text.slice(0, Math.round(s.n)); },
      })
      .to({}, { duration: 0.5 });
  });
}
