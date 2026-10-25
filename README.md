# PROJECT SOMNIA (SomniaOS v4.81)
### A Deeply Interactive Operating System From an Alternate Reality

SOMNIA is a fully interactive, fictional operating system recovered from an alternate timeline where the September 26, 1983 Petrov Incident coincided with a catastrophic sub-harmonic resonant anomaly in the Aleutian Trench and high-arctic permafrost.

Operating as a complete desktop simulation, SOMNIA features a simulated virtual file system (VFS), an interconnected web of over 40 fictional websites, email accounts, IRC messaging channels, audio spectrum analysis with Web Audio synthesis, a safe command shell with a lexer/pipe grammar, an interactive detective corkboard, timeline explorer, and a rule-based clue engine with branching save state management.

---

## 1. Quick Start & Execution

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Launch
```bash
# Install dependencies
npm install

# Run automated test suites (28 tests across VFS, terminal grammar, clues, search, branching)
npm test

# Launch the interactive local dev server
npm run dev

# Or build the production bundle
npm run build
```
Once the dev server starts, open your browser at `http://localhost:5173/`.

---

## 2. Desktop Environment & Visual Direction

### Art Direction
SOMNIA blends late-1990s/early-2000s computing, scientific research terminals, deep-space telemetry, obsolete corporate software, and analog horror.

### Features
- **Boot Sequence & Hardware POST**: Authentically verifies 2048 MB RAM, mounts `/dev/sd0a` from the Aleutian Trench station, and plays a synthesized C-Major-9 retro boot chime via Web Audio.
- **Login Screen**: Switch between operator profiles (`External Investigator`, `Dr. Arun Kovacs`, or `Archive Guest`).
- **Window Manager**: Full window lifecycle (draggable headers, 8-directional resizers, minimize to taskbar, maximize/restore, close, z-ordering, active glow).
- **5 Curated Themes**:
  1. `retro-98`: Classic 1998 corporate teal desktop with 3D beveled gray windows.
  2. `amber-terminal`: Monochrome 1980s research lab phosphor amber and dark carbon.
  3. `obsidian-cobalt`: Deep-space telemetry midnight navy with neon cyan accents.
  4. `polar-teal`: Svalbard high-arctic daylight theme with clean ice-teal and slate typography.
  5. `anomaly-breach`: Reality decoherence glitch theme with magenta/cyan chromatic pulse.
- **CRT Scanlines & Phosphor Filter**: Toggleable scanlines, phosphor glow, and screen curvature vignette in System Settings or Taskbar.
- **Synthesized Sound Engine**: Mechanical key clicks, window open/close sounds, disk head actuator seek chatter, error warbles, and a 7.83 Hz Schumann sub-harmonic binaural drone.

---

## 3. The 5 Major Narrative Arcs & Central Mystery

1. **Arc 1: The Orpheus Event & Station Epsilon**:
   The Orpheus Institute constructed Station Epsilon at -6,420 meters depth in the Aleutian Trench (52°40'N, 173°30'W) to interface with an inexplicable 7.834 Hz granitic standing wave. Sonar reveals an ancient 800m rectilinear structure embedded in the basalt.
2. **Arc 2: The Petrov 1983 Discrepancy**:
   Archive records conflict directly:
   - *Stream A* (Official History): Stanislav Petrov reported a false alarm, preserving world peace.
   - *Stream B* (Recovered Tape): An ionospheric EMP strike blacked out radar, locking the northern hemisphere at 7.83 Hz and trapping human communications in the planetary cavity.
3. **Arc 3: The Cognitive Carrier (Voices in the Bedrock)**:
   Hydrophone technicians discovered ASCII text and human voices emerging directly from the 7.83 Hz oceanic acoustic spectrum. Atomic clocks in Svalbard began slipping by +43.8ms as local spacetime diverged.
4. **Arc 4: The Whistleblower Syndicate (The Glitch Board)**:
   Corporate VP Julian Sterling issued Directive 83 to purge all 1983 divergence tapes and weaponize the carrier for defense neural computing. Whistleblowers mirrored the archives to NetBoard-99 and underground BBS nodes.
5. **Arc 5: The Somnia Protocol**:
   Chief Physicist Dr. Arun Kovacs and Dr. Elena Rostova compiled the complete memory of their collapsing timeline into this operating system, waiting for an external investigator to piece together the evidence and anchor their reality.

---

## 4. The Application Ecosystem

| Application | Description |
|---|---|
| **ArcaNet Browser** | Web browser with 42 interconnected websites across 10 categories, bookmarks, history, and a **View Source** inspector revealing hidden HTML developer comments and steganographic clues. |
| **OmniMail** | Multi-account email client (`investigator`, `dr.kovacs`, `elena.rostova`, unlockable `j.sterling` and `nullpointer`) with folders, attachments, search, and message composition. |
| **SignalRelay** | IRC/mesh messaging client with channels (`#orpheus-core`, `#telemetry-night-shift`, `#watercooler`, `#anomaly-investigation`), user roles, timestamps, and live simulated message sending. |
| **Navigator Pro** | Virtual File System manager supporting tree view, grid/details view, CRUD, move, copy, restore from Recycle Bin, hex dump viewer for `.dat` files, and metadata inspection. |
| **Somnia Command Shell (SCS)** | Terminal with history (Up/Down), Tab autocomplete, command grammar with pipes (`\| grep`), output redirection (`>`), diagnostics (`ps`, `netstat`, `dmesg`), and lore queries (`query`, `telemetry`, `decrypt`, `auth`, `clues`). |
| **AetherWave Player** | Audio player with real-time waveform spectrum canvas, volume, scrubber, and synchronized transcripts with clickable clue markers. Synthesizes real audio using the Web Audio API. |
| **DeepScan Search** | Universal cross-application search indexing files, emails, web pages, chat logs, audio transcripts, and timeline events with relevance scoring and direct "Open in App" navigation. |
| **Chronos Timeline** | Interactive chronological visualization (1974–2004) highlighting contradictory records between Stream A and Stream B, anomaly severity, and linked primary source artifacts. |
| **Evidence Corkboard** | Interactive detective workspace with draggable node cards, color-coded relationship threads (`contradicts`, `created_by`, `mentions`, `coverup`), confidence sliders, and hypothesis tracking. |
| **System Monitor** | Live telemetry monitoring showing 4-core CPU utilization, 7.83 Hz sub-harmonic phase stability, memory parity, running daemon threads, and real-time station logs. |
| **Notepad** | Simple text editor for creating, reading, and saving notes directly into the simulated virtual file system. |
| **Timeline Branching** | State manager supporting multiple save slots, timeline branching (forking an investigation into an alternate hypothesis without losing prime progress), JSON export/import, and factory reset. |
| **Settings** | Configuration for themes, master volume, sound effects toggle, CRT scanlines, CRT screen curvature, reduced motion, clock format, and difficulty mode. |

---

## 5. Terminal Command Reference

```bash
# File System Operations
ls [-l, -a] [path]        # List directory contents
cd <path>                 # Change working directory (supports .. and absolute paths)
pwd                       # Print current directory
cat <file>                # Read file contents (enforces EYES ONLY clearance)
touch <file>              # Create new empty file
mkdir <dir>               # Create new directory
rm [-r] <path>            # Move file/directory to recycle bin
cp <src> <dest>           # Copy file/directory
mv <src> <dest>           # Move or rename file/directory
echo "text" [> file]      # Print text or redirect to file

# System Diagnostics
ps, top                   # List running daemons (somnia-kernel, chronos-syncd, etc.)
netstat                   # Display simulated sockets and loopback ports
dmesg                     # Print kernel boot and hardware transducer buffers
whoami                    # Display active user and clearance level
uname, date               # Kernel version and temporal sync status

# Investigative & Lore Commands
query <table_name>        # Query Orpheus relational archive (stations, personnel, incidents, frequencies)
telemetry [frequency]     # Demodulate real-time 7.83 Hz sub-harmonic carrier
decrypt <file> -k <key>   # Decrypt classified archives using discovered key (e.g. 7.83-PETROV-1983)
auth <level> <override>   # Elevate clearance level to inspect EYES ONLY files (e.g. auth 4 783-PETROV-ORPHEUS)
archive <search_term>     # Deep query across tape reel index
clues                     # Summary of discovered clues and mystery completion percentage
theme <theme_name>        # Switch desktop theme (retro-98, amber-terminal, obsidian-cobalt, polar-teal, anomaly-breach)
reboot                    # Trigger system restart and BIOS self-test
```

---

## 6. Global Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Alt + T` | Open / Focus Somnia Command Shell (Terminal) |
| `Alt + B` | Open / Focus ArcaNet Web Browser |
| `Alt + E` | Open / Focus Navigator Pro (File Explorer) |
| `Alt + I` | Open / Focus Evidence Corkboard & Graph |
| `Ctrl + Space` | Open DeepScan Universal Search |
| `Escape` | Close Start Menu / Context Menus / Popovers |

---

## 7. Verification & Automated Tests

Automated unit tests are implemented using Vitest:
- `test/vfs.test.ts`: Virtual File System CRUD, soft delete to Recycle Bin, restore, search, path normalization, JSON serialization.
- `test/terminalParser.test.ts`: Command lexer, quoted strings, pipes (`| grep`), output redirection (`>`), clearance enforcement, query, decrypt.
- `test/clueEngine.test.ts`: Multi-modal discovery triggers, progress calculation, deduplication.
- `test/search.test.ts`: Cross-system search across 6 categories, keyword scoring, relevance ranking.
- `test/stateManager.test.ts`: Canonical state generation, timeline branching without state pollution, JSON export and import.

Run tests anytime with:
```bash
npm test
```
