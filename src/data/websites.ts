import { FictionalWebsite } from '../types/browser';

export const FICTIONAL_WEBSITES: FictionalWebsite[] = [
  // 1. RESEARCH INSTITUTES
  {
    url: 'orpheus.org',
    title: 'Orpheus Institute for Sub-Harmonic Physics',
    category: 'research',
    author: 'Orpheus Public Information Office',
    lastUpdated: '2004-10-14',
    description: 'Official portal of the Orpheus Institute. Researching terrestrial resonant cavities and deep-earth acoustics.',
    searchKeywords: ['orpheus', 'physics', 'sub-harmonic', 'schumann', 'kovacs', 'station epsilon', 'aleutian'],
    links: ['orpheus.org/research/station-epsilon', 'orpheus.org/publications', 'luminarydynamics.com', 'svalbard-cryo.ac.no'],
    hiddenClueId: 'CLUE-WEB-ORPHEUS',
    rawSourceCode: `<!DOCTYPE html>
<!-- ORPHEUS INSTITUTE WEB SYSTEM v2.4 -->
<!-- NOTICE TO AUDITORS: Station Epsilon telemetry links have been suppressed per Luminary ND-44. -->
<!-- Emergency archive mirror located at: unboundsomnia.net/mirror -->
<head><title>Orpheus Institute</title></head>
<body>...</body>`,
    contentHtml: `
      <div class="site-header orpheus-theme">
        <div class="badge">ORPHEUS INSTITUTE FOR SUB-HARMONIC PHYSICS</div>
        <h1>Advancing Terrestrial Acoustic & Resonant Science</h1>
        <p class="tagline">Geneva • Svalbard • Aleutian Trench • Atacama</p>
      </div>
      <div class="site-nav">
        <a href="arcanet://orpheus.org">Overview</a> | 
        <a href="arcanet://orpheus.org/research/station-epsilon">Station Epsilon (Aleutian)</a> | 
        <a href="arcanet://orpheus.org/publications">Publications Archive</a> | 
        <a href="arcanet://svalbard-cryo.ac.no">Svalbard Node</a> | 
        <a href="arcanet://luminarydynamics.com">Corporate Partner: Luminary</a>
      </div>
      <div class="site-body">
        <h3>Public Statement on Low-Frequency Earth Studies</h3>
        <p>The Orpheus Institute operates ultra-sensitive acoustic transducer arrays placed at the bottom of the world's deepest oceanic trenches and polar permafrost vaults. Our mission is to measure micro-oscillations in the Earth's crust that correlate with magnetospheric and ionospheric disturbances.</p>
        <div class="notice-box">
          <strong>Institutional Update (Oct 2004):</strong> Undersea communication lines to Station Epsilon are experiencing scheduled maintenance. Real-time telemetry has been redirected to internal subsea servers.
        </div>
        <h4>Primary Research Divisions</h4>
        <ul>
          <li><strong>Division A:</strong> Schumann Cavity Coupling (7.83 Hz Fundamental)</li>
          <li><strong>Division B:</strong> Astrometric & Pulsar Timing Calibration</li>
          <li><strong>Division C:</strong> Deep Borehole Acoustic Waveguides</li>
        </ul>
      </div>
    `,
  },

  {
    url: 'orpheus.org/research/station-epsilon',
    title: 'Orpheus: Station Epsilon Status Report',
    category: 'research',
    author: 'Dr. Arun Kovacs',
    lastUpdated: '2004-10-18',
    description: 'Field logs and acoustic telemetry specifications for the Aleutian Trench research facility.',
    searchKeywords: ['epsilon', 'aleutian', 'hydrophone', 'trench', 'kovacs', 'borehole'],
    links: ['orpheus.org', 'netboard99.org/fringe/thread-83', 'deepsky-astrometry.net'],
    hiddenClueId: 'CLUE-WEB-EPSILON',
    rawSourceCode: `<!-- WARNING: Hydrophone Channel 4 demodulation contains human voices! -->
<!-- Frequency: 7.834 Hz. Transducer depth: -6,420m. Check tape log STREAM_B in terminal. -->`,
    contentHtml: `
      <h2>Station Epsilon: Aleutian Deep Trench Outpost</h2>
      <p class="meta">Facility Coordinates: 52°40'N, 173°30'W | Subsea Depth: 6,420 meters</p>
      <div class="alert-box">
        <strong>FACILITY RESTRICTION:</strong> This page is maintained for field access only.
      </div>
      <p>Station Epsilon was anchored into the bedrock of the Aleutian Trench to house the world's highest-resolution piezoelectric transducers. At 6,400 meters below sea level, ambient acoustic noise is reduced to near zero, permitting direct detection of the planetary fundamental resonance.</p>
      <p><strong>Recent Observations:</strong> Dr. Kovacs notes that the granitic floor is vibrating at a constant 7.834 Hz with continuous phase coherence. Signal properties do not match volcanic or tectonic activity. Further analysis discussed on the <a href="arcanet://netboard99.org/fringe/thread-83">NetBoard-99 discussion thread</a>.</p>
    `,
  },

  {
    url: 'orpheus.org/publications',
    title: 'Orpheus Institute: Publications & Preprints',
    category: 'research',
    author: 'Institute Library',
    lastUpdated: '2004-09-01',
    description: 'Catalog of scientific preprints on sub-harmonics, geomagnetic pulses, and quantum carrier waves.',
    searchKeywords: ['publications', 'preprints', 'papers', 'kovacs', 'rostova'],
    links: ['orpheus.org', 'svalbard-cryo.ac.no/papers/pulsar-drift', 'chronowave.com/tech'],
    rawSourceCode: `<!-- Declassified preprints catalog. Item #83-09 suppressed by DLA. -->`,
    contentHtml: `
      <h2>Orpheus Scientific Repository</h2>
      <ul>
        <li><strong>OP-1999-04:</strong> <em>Geomagnetic Pulsing in the Schumann Cavity</em> - Dr. A. Kovacs</li>
        <li><strong>OP-2001-12:</strong> <em>High-Latitude Ionospheric Discontinuities in September 1983</em> - Dr. E. Rostova</li>
        <li><strong>OP-2003-08:</strong> <em>Non-Acoustic Carrier Modulation in Saturated Basalt</em> - Dr. A. Kovacs & M. Vance</li>
        <li><strong>OP-2004-02:</strong> <em>Pulsar Timing Anomalies during Solar Maxima</em> - <a href="arcanet://svalbard-cryo.ac.no/papers/pulsar-drift">Read at Svalbard Cryo</a></li>
      </ul>
    `,
  },

  {
    url: 'svalbard-cryo.ac.no',
    title: 'Svalbard Cryo-Acoustic Observatory',
    category: 'research',
    author: 'Dr. Elena Rostova',
    lastUpdated: '2004-10-20',
    description: 'High-arctic radio astrometry and cryogenic permafrost seismic monitoring.',
    searchKeywords: ['svalbard', 'elena', 'rostova', 'cryo', 'permafrost', 'pulsar', 'radio'],
    links: ['orpheus.org', 'svalbard-cryo.ac.no/papers/pulsar-drift', 'deepsky-astrometry.net'],
    hiddenClueId: 'CLUE-WEB-SVALBARD',
    rawSourceCode: `<!-- Elena's note: Pulsar clock drift is real. Greenwich is observing a different timeline. -->
<!-- Decryption hint: The key begins with the fundamental frequency: 7.83... -->`,
    contentHtml: `
      <div class="svalbard-header">
        <h1>Svalbard Cryo-Acoustic Observatory</h1>
        <p>78°13′N 15°38′E • Longyearbyen, Spitsbergen</p>
      </div>
      <p>Operating in the extreme electromagnetic quiet of the polar circle, our cryogenic sensors monitor radio emissions from millisecond pulsars while tracking micro-seismic acoustic signatures in the deep permafrost.</p>
      <div class="quote-box">
        "When the polar night falls, the radio silence of Svalbard lets us listen to the heartbeat of the cosmos—and the anomalies that shouldn't be there." — Dr. Elena Rostova
      </div>
      <h3>Current Field Projects</h3>
      <ul>
        <li><a href="arcanet://svalbard-cryo.ac.no/papers/pulsar-drift">Project Chronos: Millisecond Pulsar Timing Offsets</a></li>
        <li>Sub-ice VLF Reception (3 kHz to 30 kHz)</li>
        <li>Historical Solar Proton Flare Recalibration (1983 Archive)</li>
      </ul>
    `,
  },

  {
    url: 'svalbard-cryo.ac.no/papers/pulsar-drift',
    title: 'Paper: Pulsar Timing Discrepancy & Coordinate Divergence',
    category: 'research',
    author: 'Dr. Elena Rostova & Clara H.',
    lastUpdated: '2004-10-12',
    description: 'Scientific paper detailing unexplained timing drifts in PSR B1937+21 observed at high northern latitudes.',
    searchKeywords: ['pulsar', 'timing', 'drift', 'divergence', 'coordinates'],
    links: ['svalbard-cryo.ac.no', 'deepsky-astrometry.net', 'petrov-archive.org'],
    rawSourceCode: `<!-- Mathematical proof that two reference frames have diverged by +7692 hours since 1983 -->`,
    contentHtml: `
      <h2>Observational Discrepancy in PSR B1937+21 Ephemerides</h2>
      <p><strong>Lead Researcher:</strong> Dr. Elena Rostova</p>
      <p>Since August 2004, high-precision atomic clock telemetry from Svalbard indicates that arrival times of radio pulses from PSR B1937+21 are drifting by exactly 43.8 milliseconds per sidereal month relative to mid-latitude reference stations.</p>
      <p>This cannot be accounted for by ionospheric dispersion or gravitational wave transit. The data suggests that local spacetime coordinates inside the high-latitude Arctic cavity are operating under a different temporal curvature.</p>
      <p>Cross-reference with historical incident data at <a href="arcanet://petrov-archive.org">The Petrov Archive</a>.</p>
    `,
  },

  {
    url: 'aethelgard.org',
    title: 'The Aethelgard Foundation for Deep History',
    category: 'research',
    author: 'Dr. Arthur Pendelton',
    lastUpdated: '2003-11-20',
    description: 'Non-profit foundation dedicated to preserving pre-digital technical records and cold war scientific relics.',
    searchKeywords: ['aethelgard', 'history', 'cold war', 'archives', 'declassified'],
    links: ['orpheus.org', 'petrov-archive.org', 'silicon-surplus.com'],
    rawSourceCode: `<!-- Aethelgard holds microfilm reels 1980-1985 before the digital purge. -->`,
    contentHtml: `
      <h2>The Aethelgard Foundation</h2>
      <p>We preserve what modern corporate mergers delete. Over 40,000 microfilm canisters and magnetic tape reels from 1950 to 1990 are archived in our subterranean climate-controlled vault in Leeds, UK.</p>
      <p>Recent acquisitions include early acoustic telemetry from North Sea oil exploratory wells and decommissioned SOSUS submarine listening tapes.</p>
    `,
  },

  {
    url: 'sol-chronometry.ch',
    title: 'Sol-Station Chronometry Laboratory',
    category: 'research',
    author: 'Prof. Henri Laurent',
    lastUpdated: '2004-06-15',
    description: 'Swiss precision atomic frequency standards and chronometric telemetry calibration.',
    searchKeywords: ['chronometry', 'atomic clock', 'cesium', 'time standard', 'drift'],
    links: ['orpheus.org', 'svalbard-cryo.ac.no'],
    rawSourceCode: `<!-- Cesium fountain standard CS-3 shows unexplained phase lock to 7.83Hz -->`,
    contentHtml: `
      <h2>Sol-Station Chronometry (Neuchâtel)</h2>
      <p>The global definition of the second relies on the unperturbed ground-state hyperfine transition frequency of the Caesium-133 atom. Our laboratory supplies synchronization pulses for ArcaNet and regional telecommunications networks.</p>
      <p>Special advisory: Several international research facilities reported a sudden 1.2-second leap on Oct 24, 2004. Diagnostic tests underway.</p>
    `,
  },

  {
    url: 'trench-geology.edu',
    title: 'Pacific Bathymetry & Trench Geology Center',
    category: 'research',
    author: 'Prof. Donald Mercer',
    lastUpdated: '2004-03-22',
    description: 'Subduction zone tectonics, trench basalt morphology, and oceanic drilling survey results.',
    searchKeywords: ['bathymetry', 'aleutian trench', 'geology', 'basalt', 'hydrophone'],
    links: ['orpheus.org/research/station-epsilon', 'eidolon-petro.com'],
    rawSourceCode: `<!-- Sonar reflection at 52°41'N 173°32'W shows perfect geometric angles. NOT volcanic basalt. -->`,
    contentHtml: `
      <h2>Pacific Trench Geomorphology</h2>
      <p>Studying the Aleutian-Alaska megathrust subduction zone. The Aleutian Trench plunges to depths beyond 7,600 meters. Basalt samples recovered from exploratory cores display unusual iron-crystal alignment, suggesting past exposure to intense low-frequency electromagnetic fields.</p>
    `,
  },

  // 2. CORPORATE WEBSITES
  {
    url: 'luminarydynamics.com',
    title: 'Luminary Cognitive Dynamics',
    category: 'corporate',
    author: 'Luminary Corporate Affairs',
    lastUpdated: '2004-10-15',
    description: 'Enterprise intelligence, neural computing architectures, and global defense telecommunications.',
    searchKeywords: ['luminary', 'dynamics', 'sterling', 'cognitive', 'neural', 'defense', 'patents'],
    links: ['luminarydynamics.com/products/somnia-os', 'luminarydynamics.com/press', 'orpheus.org', 'chronowave.com'],
    hiddenClueId: 'CLUE-WEB-LUMINARY',
    rawSourceCode: `<!-- LUMINARY SECURE GATEWAY -->
<!-- Director Sterling: Project Somnia commercialization rights finalized with DLA. -->
<!-- Internal override code for clearance level elevation: 783-PETROV-ORPHEUS -->`,
    contentHtml: `
      <div class="corp-header luminary-theme">
        <div class="logo">LUMINARY COGNITIVE DYNAMICS</div>
        <p class="motto">"Architecting the Cognitive Infrastructure of Tomorrow"</p>
      </div>
      <div class="corp-nav">
        <a href="arcanet://luminarydynamics.com">Home</a> | 
        <a href="arcanet://luminarydynamics.com/products/somnia-os">Products</a> | 
        <a href="arcanet://luminarydynamics.com/press">Press Releases</a> | 
        <a href="arcanet://orpheus.org">Academic Partners</a>
      </div>
      <div class="corp-body">
        <h3>Pioneering Neural Interface & Network Systems</h3>
        <p>Luminary Cognitive Dynamics is the global leader in high-bandwidth cognitive infrastructure, predictive machine cognition, and low-frequency telemetry. Our proprietary SomniaOS environment integrates real-time sensor streams with neural-pattern matching.</p>
        <div class="feature-card">
          <h4>Commercial Release: Somnia Enterprise Suite v4.8</h4>
          <p>The definitive operating environment for deep-telemetry research, automated archive parsing, and resonant signal demodulation. Designed for defense, maritime, and cognitive research institutions.</p>
        </div>
      </div>
    `,
  },

  {
    url: 'luminarydynamics.com/products/somnia-os',
    title: 'Luminary: SomniaOS Product Overview',
    category: 'corporate',
    author: 'Product Management',
    lastUpdated: '2004-09-30',
    description: 'Technical specifications of SomniaOS: virtualized storage, recursive memory spaces, and acoustic telemetry daemon.',
    searchKeywords: ['somniaos', 'operating system', 'specs', 'daemon', 'kernel'],
    links: ['luminarydynamics.com', 'chronowave.com/tech'],
    rawSourceCode: `<!-- SomniaOS Kernel relies on the 7.83Hz sub-harmonic hardware interrupt! -->`,
    contentHtml: `
      <h2>SomniaOS Enterprise Terminal Edition</h2>
      <p>SomniaOS represents a paradigm shift in human-computer synergy. Built upon a deterministic virtual file system and real-time carrier synchronization, SomniaOS enables operators to interface directly with low-frequency sensor matrices.</p>
      <h3>Key System Modules</h3>
      <ul>
        <li><strong>Chronos Syncd:</strong> Temporal carrier phase alignment module.</li>
        <li><strong>AetherWave Audio Core:</strong> Sub-harmonic sound synthesizer and spectrum analyzer.</li>
        <li><strong>DeepScan Universal Engine:</strong> Cross-database indexing across files, emails, and web nodes.</li>
      </ul>
    `,
  },

  {
    url: 'luminarydynamics.com/press',
    title: 'Luminary: Press Releases & Acquisitions',
    category: 'corporate',
    author: 'Luminary Media Relations',
    lastUpdated: '2004-10-08',
    description: 'Press releases concerning Luminary acquisitions of Orpheus patents and North Pacific communication contracts.',
    searchKeywords: ['press', 'acquisitions', 'sterling', 'orpheus', 'contract'],
    links: ['luminarydynamics.com', 'techwire-pacific.com'],
    rawSourceCode: `<!-- Press release 04-18 suppressed mention of Dr. Kovacs' refusal to sign transfer agreement. -->`,
    contentHtml: `
      <h2>Luminary Press Releases</h2>
      <div class="press-item">
        <strong>October 05, 2004 — Luminary Expands Maritime Deep Sensor Operations</strong>
        <p>Executive VP Julian Sterling announced the full deployment of the Chronos telemetry network across North Pacific stations, completing the commercial integration of former academic assets.</p>
      </div>
      <div class="press-item">
        <strong>July 19, 2004 — Patent Grant for Sub-Harmonic Carrier Demodulation</strong>
        <p>The International Patent Organization granted Luminary patent #US-6849201 covering algorithmic extraction of digital data from granitic acoustic waveforms.</p>
      </div>
    `,
  },

  {
    url: 'eidolon-petro.com',
    title: 'Eidolon Petro-Geology International',
    category: 'corporate',
    author: 'Eidolon Exploration Division',
    lastUpdated: '2004-05-18',
    description: 'Offshore deep drilling, marine acoustic survey, and tectonic core extraction services.',
    searchKeywords: ['eidolon', 'drilling', 'offshore', 'aleutian', 'borehole'],
    links: ['orpheus.org/research/station-epsilon', 'luminarydynamics.com'],
    rawSourceCode: `<!-- Borehole #4 drilled into non-metallic crystalline chamber at -6,400m. Operations halted. -->`,
    contentHtml: `
      <h2>Eidolon Petro-Geology</h2>
      <p>Precision deep-sea drilling and acoustic seabed mapping. We have partnered with scientific consortia to drill exploratory ultra-deep boreholes into subduction trenches across the Ring of Fire.</p>
      <p>Field equipment catalog: Heavy acoustic transducers, seabed crawlers, and high-pressure titanium sensor capsules.</p>
    `,
  },

  {
    url: 'chronowave.com',
    title: 'ChronoWave Telecommunications',
    category: 'corporate',
    author: 'ChronoWave Network Ops',
    lastUpdated: '2004-10-10',
    description: 'Submarine fiber-optic cables, VLF transceivers, and transatlantic data routing.',
    searchKeywords: ['chronowave', 'telecom', 'fiber', 'vlf', 'cables', 'routing'],
    links: ['chronowave.com/tech', 'luminarydynamics.com', 'netboard99.org'],
    rawSourceCode: `<!-- Cable route PAC-1 crosses Aleutian Trench directly over coordinate 52°41'N 173°32'W -->`,
    contentHtml: `
      <h2>ChronoWave Global Fiber & Radio</h2>
      <p>Connecting continents across subsea fiber-optic cables and deep-penetrating Very Low Frequency (VLF) radio antennas. Our high-latitude lines provide mission-critical low-latency links between North America, Japan, and the Arctic research hubs.</p>
      <p>Network Status: Pacific Sub-Loop 04 operating at 99.8% capacity. Scheduled maintenance on Aleutian branch.</p>
    `,
  },

  {
    url: 'chronowave.com/tech',
    title: 'ChronoWave: VLF Propagation Whitepaper',
    category: 'corporate',
    author: 'Network Engineering',
    lastUpdated: '2004-08-14',
    description: 'Engineering notes on VLF radio penetration through seawater and planetary skin depth.',
    searchKeywords: ['vlf', 'propagation', 'skin depth', 'radio', 'antenna'],
    links: ['chronowave.com', 'orpheus.org/publications'],
    rawSourceCode: `<!-- Note: VLF radio waves at 14.3kHz penetrate up to 40m into seawater. Sub-harmonics go much deeper. -->`,
    contentHtml: `
      <h2>Technical Whitepaper: Sub-Harmonic Propagation Mechanics</h2>
      <p>While standard microwave frequencies suffer immense attenuation in oceanic environments, electromagnetic waves below 100 Hz penetrate seawater and bedrock with virtually zero loss. This enables real-time communication with deep underwater listening posts without trailing surface buoys.</p>
    `,
  },

  {
    url: 'synthetix-materials.com',
    title: 'Synthetix Composite Materials Corp',
    category: 'corporate',
    author: 'Materials Science Lab',
    lastUpdated: '2004-02-11',
    description: 'Specialized piezoelectric crystals, synthetic quartz resonators, and acoustic dampening metamaterials.',
    searchKeywords: ['synthetix', 'piezoelectric', 'quartz', 'crystals', 'transducers'],
    links: ['orpheus.org', 'silicon-surplus.com'],
    rawSourceCode: `<!-- Order #SY-892 for Orpheus Station Epsilon: 64 synthetic quartz cylinders resonant at 7.83Hz -->`,
    contentHtml: `
      <h2>Synthetix High-Performance Metamaterials</h2>
      <p>Fabricators of custom crystalline lattices for deep-sea acoustic transducers, sonar hydrophones, and high-precision frequency filters. Supplying aerospace, defense, and oceanographic research since 1988.</p>
    `,
  },

  // 3. PERSONAL BLOGS & JOURNALS
  {
    url: 'elena-skynotes.net',
    title: "Elena's Night Sky & Radio Journal",
    category: 'blog',
    author: 'Dr. Elena Rostova',
    lastUpdated: '2004-10-22',
    description: 'Personal reflections, polar aurora photographs, radio astronomy logs, and philosophical notes from Svalbard.',
    searchKeywords: ['elena', 'skynotes', 'blog', 'journal', 'aurora', 'svalbard', 'kovacs'],
    links: ['svalbard-cryo.ac.no', 'deepsky-astrometry.net', 'theglitchboard.net'],
    hiddenClueId: 'CLUE-WEB-ELENA-BLOG',
    rawSourceCode: `<!-- Arun, if you read this: do not let Sterling delete the 1983 tape reels. -->
<!-- The password to my encrypted astrometric log is: SOMNIA-PETROV-1983 -->`,
    contentHtml: `
      <div class="blog-header">
        <h1>Dr. Elena Rostova: Notes under the Northern Lights</h1>
        <p class="tagline">Observations from 78° North • Longyearbyen</p>
      </div>
      <div class="blog-entry">
        <h3>October 22, 2004 — The Static Whispers</h3>
        <p>It is dark 24 hours a day now. The polar winter has arrived. Outside, the wind howls off the glacier at -28°C. Inside the observatory hut, the radio receiver hums its steady note.</p>
        <p>Lately, Arun called me from Station Epsilon sounding terrified. He said the acoustic sensors under the Aleutian Trench aren't just registering noise. They are picking up digital data packets that match our own ArcaNet protocol. But the packets contain news articles about an ongoing nuclear fallout winter that never happened.</p>
        <p>I looked at our satellite logs for September 26, 1983. In our observatory file cabinets, there are two folders for that day. One is empty. The other is stamped 'RESTRICTED - DO NOT DIGITIZE'.</p>
      </div>
      <div class="blog-entry">
        <h3>October 10, 2004 — The Discrepancy Grows</h3>
        <p>The Greenwich atomic clocks and our pulsar timers have drifted further apart. It's as though our corner of the Earth is slipping into a separate stream of time. I posted my concerns to <a href="arcanet://theglitchboard.net">The Glitch Board</a> under the handle 'Cymatic'.</p>
      </div>
    `,
  },

  {
    url: 'kovacs-thoughtstream.org',
    title: "Arun Kovacs: Notes on the Resonant Threshold",
    category: 'blog',
    author: 'Dr. Arun Kovacs',
    lastUpdated: '2004-10-19',
    description: 'Personal essays by Dr. Arun Kovacs on the physics of memory, planetary consciousness, and acoustic interference.',
    searchKeywords: ['kovacs', 'thoughtstream', 'blog', 'resonance', 'consciousness', 'memory'],
    links: ['orpheus.org', 'elena-skynotes.net', 'theglitchboard.net/thread/somnia'],
    hiddenClueId: 'CLUE-WEB-KOVACS-BLOG',
    rawSourceCode: `<!-- If my terminal access is revoked, check /recycle_bin for the recovered warning. -->`,
    contentHtml: `
      <h2>The Resonant Threshold: Personal Papers of Arun Kovacs</h2>
      <p class="quote">"Memory is not stored in brain tissue alone. It is recorded in the electromagnetic shell of the planet."</p>
      <h3>Entry #104: The Observer Problem at 7.83 Hertz</h3>
      <p>When Stanislav Petrov looked at his computer screen in the Serpukhov-15 bunker in 1983, reality stood at a bifurcation point. One branch chose de-escalation; in another, the false alarm became an exchange.</p>
      <p>What if both branches occurred, and the informational signature of the collapsed branch was trapped in the Earth's resonant cavity? What if our project didn't discover a signal, but created a receiver that draws that dying world back toward ours?</p>
      <p>I have buried the evidence in SomniaOS. The truth can be accessed via the command shell using <code>query incidents</code> and <code>telemetry 7.83</code>.</p>
    `,
  },

  {
    url: 'marcus-hydrophone.net',
    title: "Marcus's Aleutian Hydrophone Diary",
    category: 'blog',
    author: 'Marcus Vance',
    lastUpdated: '2004-10-21',
    description: 'Daily life, maintenance logs, and isolation at the Station Epsilon undersea research platform.',
    searchKeywords: ['marcus', 'vance', 'hydrophone', 'aleutian', 'station epsilon', 'diary'],
    links: ['orpheus.org/research/station-epsilon', 'silicon-surplus.com'],
    rawSourceCode: `<!-- Hydrophone #4 transducer cable was severed from the inside. How can that happen at 6,000m? -->`,
    contentHtml: `
      <h2>Down in the Deep: The Hydrophone Tech Diary</h2>
      <p><strong>Author:</strong> Marcus Vance, Senior Acoustic Technician</p>
      <p>Day 142 at Station Epsilon. 6,400 meters of freezing black Pacific water above our heads. The steel hull creaks with the tides. Everyone is hearing the hum now.</p>
      <p>Dr. Kovacs sits in the telemetry bay for 18 hours straight with his headphones on. When I asked him what he was listening to, he took the headphones off and held them to my ear. It wasn't the ocean. It was a radio station playing 1980s synth music mixed with emergency broadcast tones.</p>
      <p>I ordered replacement pre-amps from <a href="arcanet://silicon-surplus.com">Silicon Alley Surplus</a>, but supply ships haven't arrived in three weeks.</p>
    `,
  },

  {
    url: 'clara-antiquarian.co.uk',
    title: 'Clara Antiquaria: Lost Formats & Media Archeology',
    category: 'blog',
    author: 'Clara Higgins',
    lastUpdated: '2004-09-12',
    description: 'Restoring obsolete magnetic tapes, 8-inch floppy disks, wire recordings, and Cold War teleprinter feeds.',
    searchKeywords: ['clara', 'antiquarian', 'media', 'tapes', 'floppy', 'restore'],
    links: ['aethelgard.org', 'silicon-surplus.com'],
    rawSourceCode: `<!-- Recovered magnetic tape labeled 'SERPUKHOV-STREAM-B' sent to Orpheus Institute in August 2004. -->`,
    contentHtml: `
      <h2>Clara's Media Archeology Workbench</h2>
      <p>Welcome to my workshop in Bristol! I spend my days baking degraded magnetic tapes, reading magnetic powder patterns with optical microscopes, and pulling lost data off forgotten Cold War storage formats.</p>
      <p>Latest project: Restoring 1/2-inch reel-to-reel computer telemetry tapes from early Soviet and Western radar stations. Some tapes display magnetic tracks that shouldn't be physically possible—tracks recorded with non-linear temporal phase shifts.</p>
    `,
  },

  // 4. SOCIAL FORUMS & BBS
  {
    url: 'netboard99.org',
    title: 'NetBoard-99: The Open BBS Network',
    category: 'forum',
    author: 'SysOp Raven',
    lastUpdated: '2004-10-24',
    description: 'Active discussion boards covering computing, fringe science, radio DXing, retro hardware, and telecom leaks.',
    searchKeywords: ['netboard', 'bbs', 'forum', 'discussion', 'threads', 'fringe', 'dxing'],
    links: ['netboard99.org/fringe/thread-83', 'theglitchboard.net', 'silicon-surplus.com'],
    rawSourceCode: `<!-- NetBoard-99 running on vBulletin 2.3.8. All posts mirrored to offline tape nightly. -->`,
    contentHtml: `
      <div class="bbs-header">
        <h1>[ NetBoard-99 ] Electronic Community Forum</h1>
        <p>Logged in as: <strong>Guest_418</strong> | Users online: 242</p>
      </div>
      <table class="bbs-table">
        <tr><th>Board</th><th>Topics</th><th>Last Post</th></tr>
        <tr><td><strong>Hardware & Electronics:</strong> Vintage silicon, hydrophones, modems</td><td>1,420</td><td>Today by RetroGuy</td></tr>
        <tr><td><a href="arcanet://netboard99.org/fringe/thread-83"><strong>Fringe Signals & Telemetry:</strong> Anomalous VLF frequencies, numbers stations</a></td><td>892</td><td>Today by Kovacs_Ghost</td></tr>
        <tr><td><strong>Telecom & Phreaking:</strong> Subsea cable routing, PBX switching</td><td>640</td><td>Yesterday by Phreak99</td></tr>
      </table>
    `,
  },

  {
    url: 'netboard99.org/fringe/thread-83',
    title: 'NetBoard-99: [THREAD] 7.83Hz Sub-Harmonics & Station Epsilon',
    category: 'forum',
    author: 'Various Posters',
    lastUpdated: '2004-10-24',
    description: 'Forum thread where amateur radio operators and whistleblowers discuss anomalous Aleutian signals.',
    searchKeywords: ['netboard', 'thread', 'sub-harmonics', 'epsilon', 'whistleblower', 'leak'],
    links: ['netboard99.org', 'theglitchboard.net', 'orpheus.org/research/station-epsilon'],
    hiddenClueId: 'CLUE-WEB-NETBOARD-THREAD',
    rawSourceCode: `<!-- User 'NullPointer' posted: Check the terminal command 'telemetry 7.83' to see live demodulation! -->`,
    contentHtml: `
      <h2>Topic: Anyone else picking up the 7.83 Hz data carrier in the North Pacific?</h2>
      <div class="post">
        <strong>Poster: SignalHunter99</strong> (Oct 21 2004, 04:12)
        <p>I set up a loop antenna in my cabin in the Queen Charlotte Islands. When I filter around 7.83 Hz, I'm decoding ASCII strings. The text is repeating: <em>"PROJECT SOMNIA ACTIVE - OBSERVER REQUIRED"</em>. Anyone know what station this is?</p>
      </div>
      <div class="post">
        <strong>Poster: NullPointer</strong> (Oct 22 2004, 18:40)
        <p>It's Station Epsilon in the Aleutian Trench. Luminary Cognitive Dynamics bought out the Orpheus Institute to shut them up. The lead scientist Dr. Kovacs is trying to leak the archive before they pull the plug. Check <a href="arcanet://theglitchboard.net">The Glitch Board</a> for decrypted files.</p>
      </div>
      <div class="post">
        <strong>Poster: Kovacs_Ghost</strong> (Oct 24 2004, 01:05)
        <p>If you have access to the SomniaOS terminal, execute: <code>auth 4 783-PETROV-ORPHEUS</code>. That will open the EYES ONLY directory in <code>/archive/1983_petrov</code>. You need to see both STREAM A and STREAM B.</p>
      </div>
    `,
  },

  {
    url: 'theglitchboard.net',
    title: 'The Glitch Board: Reality Anomalies & Leaks',
    category: 'forum',
    author: 'NullPointer',
    lastUpdated: '2004-10-24',
    description: 'Underground whistleblower BBS for classified data dumps, temporal contradictions, and corporate leaks.',
    searchKeywords: ['glitch board', 'underground', 'nullpointer', 'leaks', 'whistleblower', 'somnia'],
    links: ['theglitchboard.net/thread/somnia', 'netboard99.org', 'unboundsomnia.net'],
    hiddenClueId: 'CLUE-WEB-GLITCH-BOARD',
    rawSourceCode: `<!-- NullPointer's encrypted key: SOMNIA-PETROV-1983 -->
<!-- The Somnia Protocol is the bridge between timelines. Find all 5 evidence arcs! -->`,
    contentHtml: `
      <div class="glitch-header">
        <h1>THE GLITCH BOARD // UNBOUND</h1>
        <p class="warning">CAUTION: This node is monitored by Luminary automated web crawlers. Use onion routing.</p>
      </div>
      <p>Welcome to the resistance archive. We document moments where the fabric of recorded history fails to align.</p>
      <ul>
        <li><a href="arcanet://theglitchboard.net/thread/somnia"><strong>[PINNED] The Somnia Project Leak & The 1983 Divergence</strong></a> (41 replies)</li>
        <li><strong>Thread #402:</strong> Luminary Directive 83: Why are corporate servers wiping Soviet military archives?</li>
        <li><strong>Thread #398:</strong> Elena Rostova's astrometric paper has been scrubbed from institutional servers.</li>
      </ul>
    `,
  },

  {
    url: 'theglitchboard.net/thread/somnia',
    title: 'The Glitch Board: The Somnia Project Truth',
    category: 'forum',
    author: 'NullPointer & Cymatic',
    lastUpdated: '2004-10-24',
    description: 'Comprehensive whistleblower thread laying out the 5 arcs of Project Somnia and how the OS was constructed.',
    searchKeywords: ['somnia', 'truth', 'arcs', 'investigation', 'clues', 'kovacs'],
    links: ['theglitchboard.net', 'unboundsomnia.net', 'petrov-archive.org'],
    hiddenClueId: 'CLUE-WEB-SOMNIA-TRUTH',
    rawSourceCode: `<!-- Clue linkage: 
Arc 1 = Aleutian Trench / Station Epsilon
Arc 2 = Petrov 1983 Divergence (Serpukhov-15)
Arc 3 = The Sub-Harmonic Carrier & Cognitive Intercept
Arc 4 = The Whistleblower Syndicate
Arc 5 = The Somnia Protocol (Terminal Recovery) -->`,
    contentHtml: `
      <h2>The Somnia Project: What Really Happened</h2>
      <div class="post">
        <strong>Poster: NullPointer</strong>
        <p>For everyone investigating this recovered terminal, here is what you need to understand:</p>
        <ol>
          <li><strong>The Core Event:</strong> In 1983, reality split during the Petrov incident. In one branch, the world survived; in another, an ionospheric EMP wiped out communications and trapped millions of minds in the Schumann electromagnetic cavity.</li>
          <li><strong>Station Epsilon:</strong> In the 1990s, the Orpheus Institute built hydrophone arrays in the Aleutian Trench and discovered they could listen to that alternate reality.</li>
          <li><strong>The Corporate Coverup:</strong> Luminary Cognitive Dynamics attempted to silence the researchers and commercialize the technology for cognitive computing.</li>
          <li><strong>The Software Ark:</strong> Dr. Kovacs built SomniaOS as an interactive archive so that whoever discovered this computer could reconstruct the truth.</li>
        </ol>
        <p>Connect the nodes on your <strong>Investigation Board</strong>. Once you establish the links between Petrov, Kovacs, Rostova, and Sterling, the truth will be unlocked.</p>
      </div>
    `,
  },

  {
    url: 'usenet-alt-signals.org',
    title: 'USENET Mirror: alt.signals.lost (1994-2004)',
    category: 'forum',
    author: 'Usenet Archive Robot',
    lastUpdated: '2004-09-18',
    description: 'Archived Usenet newsgroup posts documenting ghost radio transmissions, numbers stations, and sub-sea acoustics.',
    searchKeywords: ['usenet', 'newsgroup', 'alt.signals.lost', 'numbers stations', 'ghost radio'],
    links: ['netboard99.org', 'theglitchboard.net'],
    rawSourceCode: `<!-- Archive of alt.signals.lost containing 12,000 newsgroup articles from 1994 to 2004 -->`,
    contentHtml: `
      <h2>USENET Newsgroup: alt.signals.lost</h2>
      <pre>
From: dx_mariner@alaska.net
Subject: Strange Russian voice on 14.300 MHz
Date: 14 Oct 1999

Hearing repeated Morse and voice loop calling: "SVALBARD EPSILON CHRONOS".
Signal peaks whenever oceanic high tides occur in the Bering Sea.
Anyone else logging this?
      </pre>
    `,
  },

  // 5. ARCHIVED NEWS & JOURNALISM
  {
    url: 'globalchronicle.com',
    title: 'The Global Chronicle: News of Record',
    category: 'news',
    author: 'Chronicle Editorial Board',
    lastUpdated: '2004-10-24',
    description: 'International newspaper of record covering world politics, scientific breakthroughs, and Cold War histories.',
    searchKeywords: ['global chronicle', 'news', 'petrov', 'newspaper', 'cold war', 'luminary'],
    links: ['globalchronicle.com/archives/1983-petrov', 'techwire-pacific.com', 'oceanic-tribune.org'],
    rawSourceCode: `<!-- Notice: The 1983 archive was digitally re-indexed in 2002 by Luminary Digital Services. -->`,
    contentHtml: `
      <div class="news-header">
        <h1>THE GLOBAL CHRONICLE</h1>
        <p class="sub">Sunday, October 24, 2004 • International Edition</p>
      </div>
      <div class="news-main">
        <h2>Luminary Cognitive Closes $400M Defense Telecommunications Pact</h2>
        <p><strong>WASHINGTON</strong> — Luminary Cognitive Dynamics has secured a landmark federal contract to deploy its Chronos predictive telemetry software across North Pacific maritime monitoring networks.</p>
        <hr/>
        <h3>From Our Historical Vaults:</h3>
        <p><a href="arcanet://globalchronicle.com/archives/1983-petrov"><strong>Twenty Years Later: The Soviet Nuclear False Alarm That Almost Ended the World</strong></a> — An inquiry into the fateful night of September 26, 1983, at Serpukhov-15.</p>
      </div>
    `,
  },

  {
    url: 'globalchronicle.com/archives/1983-petrov',
    title: 'Chronicle Vault: The 1983 Nuclear Near-Miss',
    category: 'news',
    author: 'Mark Henderson, Senior Correspondent',
    lastUpdated: '2003-09-26',
    description: 'Historical feature on Stanislav Petrov and the Serpukhov-15 false alarm incident.',
    searchKeywords: ['petrov', 'serpukhov', '1983', 'nuclear', 'alarm', 'false alarm'],
    links: ['globalchronicle.com', 'petrov-archive.org'],
    rawSourceCode: `<!-- Note: Contrast this official article with STREAM B tape in /archive/1983_petrov/ -->`,
    contentHtml: `
      <h2>The Man Who Saved the World: Stanislav Petrov</h2>
      <p class="byline">Published: September 26, 2003</p>
      <p>On September 26, 1983, Lieutenant Colonel Stanislav Petrov was on duty in the secret command bunker Serpukhov-15 near Moscow when the early-warning computers flashed: <em>MISSILE LAUNCH DETECTED</em>.</p>
      <p>Relying on his intuition and the absence of confirmation from ground radar, Petrov famously decided it was a false alarm caused by sun-glint on high clouds. His decision prevented an immediate retaliatory launch.</p>
      <p>Yet historians have questioned why subsequent Soviet radar records for that entire week remain sealed under state secrecy.</p>
    `,
  },

  {
    url: 'techwire-pacific.com',
    title: 'TechWire Pacific: Silicon & Subsea Tech',
    category: 'news',
    author: 'TechWire News Team',
    lastUpdated: '2004-10-16',
    description: 'Reporting on tech startups, fiber optics, subsea cables, and defense procurement in the Pacific Rim.',
    searchKeywords: ['techwire', 'silicon', 'tech', 'luminary', 'orpheus', 'startups'],
    links: ['globalchronicle.com', 'luminarydynamics.com', 'chronowave.com'],
    rawSourceCode: `<!-- Investigative piece: Why did three Orpheus scientists resign simultaneously last month? -->`,
    contentHtml: `
      <h2>TechWire Pacific: The Pulse of Pacific Computing</h2>
      <h3>Luminary Under Fire Over Academic Patent Seizures</h3>
      <p>Concerns are growing in the academic community over Luminary Cognitive Dynamics' aggressive acquisition of low-frequency physics patents formerly owned by the non-profit Orpheus Institute. Critics allege that Luminary has silenced ongoing peer review concerning undersea acoustic data.</p>
    `,
  },

  {
    url: 'oceanic-tribune.org',
    title: 'The Oceanic Tribune: Maritime & Arctic Herald',
    category: 'news',
    author: 'Editorial Desk',
    lastUpdated: '2004-09-28',
    description: 'Maritime shipping, deep-sea exploration, Arctic navigation, and Bering Sea fisheries.',
    searchKeywords: ['oceanic', 'maritime', 'bering sea', 'aleutian', 'shipping', 'trench'],
    links: ['globalchronicle.com', 'trench-geology.edu'],
    rawSourceCode: `<!-- Bering Sea crab fleet reports radio navigation systems giving erroneous coordinates near Station Epsilon. -->`,
    contentHtml: `
      <h2>The Oceanic Tribune</h2>
      <h3>Mysterious Navigation Glitches Reported in Aleutian Trench</h3>
      <p>Commercial fishing vessels operating southwest of Attu Island have reported repeated Loran-C and GPS position jumps of up to 12 nautical miles. The Coast Guard has issued a temporary Notice to Mariners regarding electromagnetic interference.</p>
    `,
  },

  {
    url: 'northern-herald.no',
    title: 'The Northern Herald: Spitsbergen & Barents Gazette',
    category: 'news',
    author: 'Torbjørn Hansen',
    lastUpdated: '2004-10-18',
    description: 'Local news from Longyearbyen, Svalbard, coal mining, and arctic scientific expeditions.',
    searchKeywords: ['northern herald', 'svalbard', 'longyearbyen', 'arctic', 'rostova'],
    links: ['svalbard-cryo.ac.no', 'globalchronicle.com'],
    rawSourceCode: `<!-- Aurora displays over Svalbard have taken on unusual violet pulsed geometry. -->`,
    contentHtml: `
      <h2>The Northern Herald (Longyearbyen)</h2>
      <p>Polar Night approaches as temperatures drop to -22°C. Local researchers at the Cryo-Acoustic Observatory report record attendance at Dr. Elena Rostova's public lecture on solar-terrestrial physics.</p>
    `,
  },

  // 6. TECHNICAL DOCUMENTATION & WHITEPAPERS
  {
    url: 'subharmonic-cavity.spec',
    title: 'Technical Specification: Sub-Harmonic Resonant Cavity',
    category: 'tech_docs',
    author: 'Orpheus Engineering Group',
    lastUpdated: '2003-12-05',
    description: 'Complete engineering whitepaper and mathematics of the Schumann Cavity 7.83Hz acoustic transducer.',
    searchKeywords: ['spec', 'subharmonic', 'cavity', 'schumann', '7.83', 'piezoelectric'],
    links: ['orpheus.org/publications', 'luminarydynamics.com/products/somnia-os'],
    hiddenClueId: 'CLUE-WEB-SPEC',
    rawSourceCode: `<!-- Technical formula: f = c / (2 * pi * R_earth) * sqrt(n * (n + 1)) -->
<!-- When n=1, f = 7.83 Hz. The exact frequency observed in the Aleutian granite. -->`,
    contentHtml: `
      <h2>Sub-Harmonic Resonant Cavity Specification (Doc: SPEC-783-ORP)</h2>
      <h3>1. Fundamental Physics</h3>
      <p>The space between the Earth's conductive surface and the ionosphere acts as a spherical resonant cavity. The fundamental mode occurs at <strong>7.83 Hz</strong>, with harmonics at 14.3, 20.8, 27.3, and 33.8 Hz.</p>
      <h3>2. Transducer Coupling</h3>
      <p>By arraying 64 high-purity synthetic quartz crystals in an ultra-deep trench bedrock anchor, mechanical acoustic waves can be transduced into phase-coherent digital data streams.</p>
      <div class="code-box">
        CARRIER_FREQ: 7.834012 Hz<br/>
        MODULATION:   DPSK 120 Baud<br/>
        PARITY_STATE: NON-CONVENTIONAL DIVERGENT
      </div>
    `,
  },

  {
    url: 'somnia-architecture.org',
    title: 'SomniaOS Architecture Whitepaper & Kernel Internals',
    category: 'tech_docs',
    author: 'Somnia Core Architecture Team',
    lastUpdated: '2004-10-01',
    description: 'System architectural documentation: VFS tree, clue engine, process tree, and Web Audio integration.',
    searchKeywords: ['architecture', 'whitepaper', 'kernel', 'vfs', 'clue engine', 'terminal'],
    links: ['luminarydynamics.com/products/somnia-os', 'orpheus.org'],
    rawSourceCode: `<!-- The OS is designed to survive memory wipes by writing clues to redundant sectors. -->`,
    contentHtml: `
      <h2>SomniaOS System Architecture (v4.81)</h2>
      <p>SomniaOS is a fully simulated, resilient operating system recovered from an alternate timeline. It provides:</p>
      <ul>
        <li><strong>Simulated VFS:</strong> Virtual filesystem supporting nested directories, real CRUD operations, metadata, and persistent revision history.</li>
        <li><strong>Somnia Command Shell (SCS):</strong> A safe command line environment with lexer, pipe parsing, and custom investigative commands.</li>
        <li><strong>ArcaNet Browser:</strong> Internal browser navigating locally stored authentic sites.</li>
        <li><strong>Investigation Board:</strong> Evidence graph and detective corkboard linking people, files, and clues.</li>
      </ul>
    `,
  },

  {
    url: 'petrov-archive.org',
    title: 'The Petrov Archive: Historical Data & Transcripts',
    category: 'tech_docs',
    author: 'Historical Preservation Society',
    lastUpdated: '2004-09-26',
    description: 'Complete declassified military transcripts from Serpukhov-15 on September 26, 1983.',
    searchKeywords: ['petrov', 'archive', 'serpukhov', 'transcript', 'cold war', '1983'],
    links: ['globalchronicle.com/archives/1983-petrov', 'theglitchboard.net'],
    hiddenClueId: 'CLUE-WEB-PETROV-ARCHIVE',
    rawSourceCode: `<!-- Compare these transcripts with the ones in /archive/1983_petrov/ on your terminal! -->`,
    contentHtml: `
      <h2>Serpukhov-15 Historical Audio & Telemetry Transcripts</h2>
      <p>Declassified under the 1998 Russian State Archive Freedom of Information order.</p>
      <div class="transcript-box">
        <p><strong>00:15:10 MSK:</strong> Alert Siren. Computer display flashes: <em>"START" (LAUNCH)</em>.</p>
        <p><strong>00:16:00 MSK:</strong> Petrov: "I need visual confirmation from ground radar. Why isn't Krasnoyarsk seeing anything?"</p>
        <p><strong>00:19:30 MSK:</strong> Petrov: "It is a false alarm. Re-verify the satellite optical sensors."</p>
      </div>
      <p><em>Notice: Tape reels recovered from Station Epsilon present an entirely contradictory continuation of this dialogue.</em></p>
    `,
  },

  // 7. ONLINE MARKETPLACES & CLASSIFIEDS
  {
    url: 'silicon-surplus.com',
    title: 'Silicon Alley Surplus: Vintage Computing & RF Gear',
    category: 'marketplace',
    author: 'Surplus Dave',
    lastUpdated: '2004-10-15',
    description: 'Surplus electronics, hydrophones, reel-to-reel tape drives, DEC VT-100 terminals, and Cold War RF receivers.',
    searchKeywords: ['silicon', 'surplus', 'vintage', 'hardware', 'hydrophones', 'tapes', 'ebay'],
    links: ['netboard99.org', 'clara-antiquarian.co.uk'],
    rawSourceCode: `<!-- Classified ad #481: Selling 1x Orpheus Model 12 Hydrophone Preamp. Serial #04. -->`,
    contentHtml: `
      <div class="market-header">
        <h1>SILICON ALLEY SURPLUS & TEST GEAR</h1>
        <p>We buy and sell surplus military, oceanographic, and laboratory computing gear!</p>
      </div>
      <table class="catalog-table">
        <tr><th>Item</th><th>Condition</th><th>Price</th></tr>
        <tr><td>Hewlett-Packard 3562A Dynamic Signal Analyzer</td><td>Tested, Works</td><td>$850.00</td></tr>
        <tr><td>Benthos Deep-Sea Hydrophone Array (Refurbished)</td><td>Ex-Oceanographic</td><td>$1,200.00</td></tr>
        <tr><td>Qualstar 1/2-inch 9-Track Magnetic Tape Drive</td><td>NOS in box</td><td>$450.00</td></tr>
        <tr><td>Soviet R-399A "KBR" HF Military Receiver</td><td>Good condition</td><td>$650.00</td></tr>
      </table>
    `,
  },

  {
    url: 'hydrophone-exchange.net',
    title: 'Hydrophone & Ocean Sensor Exchange',
    category: 'marketplace',
    author: 'Ocean Tech Network',
    lastUpdated: '2004-08-30',
    description: 'Marketplace for maritime researchers trading sonar transponders, deep-towed sensors, and seismic gear.',
    searchKeywords: ['hydrophone', 'exchange', 'ocean', 'sonar', 'sensors'],
    links: ['silicon-surplus.com', 'marcus-hydrophone.net'],
    rawSourceCode: `<!-- Wanted: Titanium housing for Station Epsilon replacement transducer. Urgent. -->`,
    contentHtml: `
      <h2>Hydrophone Exchange Bulletin</h2>
      <p>A clearinghouse for oceanographic institutes, survey contractors, and marine acoustic enthusiasts.</p>
    `,
  },

  // 8. OBSOLETE PORTALS & WEB DIRECTORIES
  {
    url: 'omnisearch99.com',
    title: 'OmniSearch 99: The Universal Web Portal',
    category: 'portal',
    author: 'OmniSearch Media Inc.',
    lastUpdated: '2004-10-24',
    description: 'The premier ArcaNet search engine and web directory. Indexing over 100,000 pages of the alternate web.',
    searchKeywords: ['omnisearch', 'portal', 'search', 'directory', 'webring', 'weather'],
    links: ['orpheus.org', 'luminarydynamics.com', 'netboard99.org', 'globalchronicle.com', 'theglitchboard.net'],
    hiddenClueId: 'CLUE-WEB-OMNISEARCH',
    rawSourceCode: `<!-- OmniSearch Web Crawler: Try searching for "Petrov", "Kovacs", "Station Epsilon", or "Directive 83" -->`,
    contentHtml: `
      <div class="portal-header">
        <h1>OmniSearch 99</h1>
        <p>Search the World Wide ArcaNet</p>
      </div>
      <div class="search-box-mock">
        <input type="text" placeholder="Search keywords: Kovacs, Petrov, Somnia..." style="width: 70%; padding: 8px;" />
        <button style="padding: 8px 16px;">OmniSearch!</button>
      </div>
      <div class="directory-grid">
        <div><strong>Science & Tech:</strong> <a href="arcanet://orpheus.org">Orpheus Institute</a>, <a href="arcanet://svalbard-cryo.ac.no">Svalbard Cryo</a></div>
        <div><strong>Business & Corp:</strong> <a href="arcanet://luminarydynamics.com">Luminary Dynamics</a>, <a href="arcanet://chronowave.com">ChronoWave</a></div>
        <div><strong>News & Media:</strong> <a href="arcanet://globalchronicle.com">Global Chronicle</a>, <a href="arcanet://techwire-pacific.com">TechWire</a></div>
        <div><strong>Community & BBS:</strong> <a href="arcanet://netboard99.org">NetBoard-99</a>, <a href="arcanet://theglitchboard.net">The Glitch Board</a></div>
      </div>
    `,
  },

  {
    url: 'waypoint-index.org',
    title: 'The Waypoint Web Directory (1998-2004)',
    category: 'portal',
    author: 'Curator Timothy',
    lastUpdated: '2004-07-14',
    description: 'Hand-curated directory of personal homepages, academic departments, and lost archives.',
    searchKeywords: ['waypoint', 'directory', 'index', 'links', 'webring'],
    links: ['omnisearch99.com', 'forgotten-signals.ring'],
    rawSourceCode: `<!-- Curated list of 40+ interconnected websites across our timeline. -->`,
    contentHtml: `
      <h2>Waypoint Curated Web Index</h2>
      <p>A human-curated directory organized by Dewey Decimal classification for the World Wide ArcaNet.</p>
    `,
  },

  {
    url: 'forgotten-signals.ring',
    title: 'WebRing: The Ring of Forgotten Signals',
    category: 'portal',
    author: 'Ringmaster Anton',
    lastUpdated: '2004-10-11',
    description: 'WebRing connecting amateur radio DXers, paranormal electronic voice phenomenon (EVP) researchers, and VLF enthusiasts.',
    searchKeywords: ['webring', 'forgotten signals', 'dx', 'evp', 'vlf'],
    links: ['elena-skynotes.net', 'marcus-hydrophone.net', 'theglitchboard.net'],
    rawSourceCode: `<!-- [Previous Site] [Random Site] [Next Site] -->`,
    contentHtml: `
      <h2>The Ring of Forgotten Signals</h2>
      <p>This webring links websites dedicated to the strange, unmapped electromagnetic noises that haunt the lower bands of the radio spectrum.</p>
    `,
  },

  // 9. PERSONAL HOMEPAGES & GEOCITIES-STYLE
  {
    url: 'geopages.net/~stargazer83',
    title: "Stargazer's Retro Astro-Corner",
    category: 'personal',
    author: 'Tim "Stargazer"',
    lastUpdated: '2002-04-15',
    description: 'Amateur astronomy, telescope collimation tips, visitor counter, animated sparkle GIFs, and web badges.',
    searchKeywords: ['stargazer', 'geopages', 'astronomy', 'telescope', 'personal'],
    links: ['elena-skynotes.net', 'omnisearch99.com'],
    rawSourceCode: `<!-- Best viewed in 800x600 resolution with 16-bit color. Under Construction! -->`,
    contentHtml: `
      <div style="text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif;">
        <h2>★ Welcome to Stargazer's Astro-Haven! ★</h2>
        <p>You are visitor number: <strong>004,819</strong></p>
        <p>I love observing the stars from my backyard in Seattle with my 8-inch Dobsonian!</p>
        <p>Check out my friend <a href="arcanet://elena-skynotes.net">Elena's Polar Observatory</a> in Norway!</p>
      </div>
    `,
  },

  {
    url: 'geopages.net/~soundwave98',
    title: "SoundWave's Synth & Cassette Vault",
    category: 'personal',
    author: 'Alex Soundwave',
    lastUpdated: '2003-08-20',
    description: 'Analog synthesizers, ambient tape loops, Roland Jupiter-8 patches, and field recordings.',
    searchKeywords: ['synth', 'cassette', 'ambient', 'tape', 'analog'],
    links: ['clara-antiquarian.co.uk', 'silicon-surplus.com'],
    rawSourceCode: `<!-- Synthesizing 7.83Hz sub-bass drone creates an eerie feeling of time distortion. -->`,
    contentHtml: `
      <h2>Analog Tape Loops & Modular Synths</h2>
      <p>Sharing custom patch sheets for vintage analog synthesizers and tape decay experiments.</p>
    `,
  },

  {
    url: 'geopages.net/~hydro_dave',
    title: "Dave's Undersea Acoustic Scrapbook",
    category: 'personal',
    author: 'Dave Miller',
    lastUpdated: '2004-01-10',
    description: 'Whale songs, submarine acoustics, and hydrophone DIY pre-amplifiers.',
    searchKeywords: ['dave', 'hydrophone', 'whales', 'ocean', 'seattle'],
    links: ['marcus-hydrophone.net', 'silicon-surplus.com'],
    rawSourceCode: `<!-- Marcus from Station Epsilon sent me some wild audio clips last summer. -->`,
    contentHtml: `
      <h2>Hydrophone DIY & Ocean Sounds</h2>
      <p>Building your own piezo underwater microphone using brass discs and mineral oil!</p>
    `,
  },

  // 10. WHISTLEBLOWER & UNBOUND LEAKS
  {
    url: 'unboundsomnia.net',
    title: 'UNBOUND: The Somnia Project Mirror',
    category: 'whistleblower',
    author: 'The Somnia Whistleblower Collective',
    lastUpdated: '2004-10-24',
    description: 'Emergency mirror of classified emails, deleted files, and audio recordings from Station Epsilon.',
    searchKeywords: ['unbound', 'somnia', 'mirror', 'leak', 'classified', 'archive'],
    links: ['theglitchboard.net', 'petrov-archive.org', 'orpheus.org'],
    hiddenClueId: 'CLUE-WEB-UNBOUND',
    rawSourceCode: `<!-- ARCHIVE STATUS: COMPLETE.
If the host terminal reboots, the evidence graph preserves all discovered links.
Terminal command to decrypt the core archive: decrypt /archive/somnia.dat -k SOMNIA-PETROV-1983 -->`,
    contentHtml: `
      <div class="unbound-header">
        <h1>UNBOUND // THE SOMNIA ARCHIVE MIRROR</h1>
        <p class="tagline">Nothing is deleted. History is multi-threaded.</p>
      </div>
      <div class="warning-banner">
        <strong>FINAL TRANSMISSION:</strong> Station Epsilon will lose power within 24 hours. The local SomniaOS drive image contains the complete evidence matrix.
      </div>
      <h3>The 5 Pillars of Investigation:</h3>
      <ul>
        <li><strong>Arc 1: The Orpheus Event:</strong> Station Epsilon was not abandoned in 1983. It operated in secret beneath the Aleutian Trench until today.</li>
        <li><strong>Arc 2: The Petrov Discrepancy:</strong> Two conflicting logs exist for September 26, 1983. In the recovered Stream B, reality diverged under an electromagnetic pulse.</li>
        <li><strong>Arc 3: The Sub-Harmonic Carrier:</strong> The 7.83 Hz signal is not tectonic; it carries human cognitive data.</li>
        <li><strong>Arc 4: The Whistleblower Syndicate:</strong> Researchers defied Luminary Directive 83 to preserve this terminal.</li>
        <li><strong>Arc 5: The Somnia Protocol:</strong> This computer is the ark that ensures our timeline does not vanish without a witness.</li>
      </ul>
      <p>Use the <strong>Universal Search (DeepScan)</strong> and the <strong>Terminal</strong> to verify every claim.</p>
    `,
  },

  // 11-40 ADDITIONAL RICH INTERCONNECTED SITES
  {
    url: 'coldwar-radar.org',
    title: 'Cold War Early Warning Radar Systems Index',
    category: 'research',
    author: 'Military Radar Historians',
    lastUpdated: '2004-05-10',
    description: 'Technical specs of Soviet Oko, Daryal, and Dunay radars vs American BMEWS and PAVE PAWS.',
    searchKeywords: ['radar', 'early warning', 'oko', 'daryal', 'bmews', 'petrov'],
    links: ['petrov-archive.org', 'aethelgard.org'],
    rawSourceCode: `<!-- Technical analysis of Oko satellite false alarms caused by solar reflections. -->`,
    contentHtml: `<h2>Cold War Early Warning Telemetry</h2><p>Cataloging the satellite and radar systems that monitored the skies during the Cold War.</p>`,
  },
  {
    url: 'schumann-resonance.info',
    title: 'The Schumann Resonance Information Portal',
    category: 'research',
    author: 'Dr. Klaus Becker',
    lastUpdated: '2004-09-02',
    description: 'Educational guide to global electromagnetic resonance in the Earth-ionosphere cavity.',
    searchKeywords: ['schumann', 'resonance', '7.83', 'physics', 'earth'],
    links: ['orpheus.org', 'subharmonic-cavity.spec'],
    rawSourceCode: `<!-- Schumann resonance peaks: 7.83, 14.3, 20.8, 27.3, 33.8 Hz -->`,
    contentHtml: `<h2>Schumann Resonance Fundamentals</h2><p>The Earth acts as a giant electric circuit. Global lightning discharges excite the cavity at 7.83 Hz.</p>`,
  },
  {
    url: 'aleutian-wildlife.org',
    title: 'Aleutian Marine Sanctuary & Mammal Survey',
    category: 'news',
    author: 'Alaska Marine Conservation',
    lastUpdated: '2004-07-22',
    description: 'Cetacean migration, sea otter habitats, and acoustic ecology of the Aleutian Islands.',
    searchKeywords: ['aleutian', 'whales', 'marine', 'alaska', 'wildlife'],
    links: ['oceanic-tribune.org', 'trench-geology.edu'],
    rawSourceCode: `<!-- Note: Cetacean stranding events correlate with Station Epsilon transducer tests. -->`,
    contentHtml: `<h2>Aleutian Marine Ecosystems</h2><p>Protecting the fragile northern waters of the Bering Sea and Aleutian Trench.</p>`,
  },
  {
    url: 'binaural-cognition.org',
    title: 'Journal of Binaural Entrainment & Brainwave States',
    category: 'research',
    author: 'Cognitive Science Review',
    lastUpdated: '2004-02-18',
    description: 'Theta rhythm entrainment at 4-8 Hz and psychological effects of low-frequency audio stimulation.',
    searchKeywords: ['binaural', 'theta', 'cognition', 'brainwaves', '7.83', 'entrainment'],
    links: ['luminarydynamics.com', 'orpheus.org'],
    rawSourceCode: `<!-- Sub-harmonic 7.83Hz stimulation triggers shared hypnagogic imagery in 84% of subjects. -->`,
    contentHtml: `<h2>Binaural Entrainment & Neural Resonance</h2><p>How low-frequency acoustic vibrations synchronize neural firing across cerebral hemispheres.</p>`,
  },
  {
    url: 'radio-dx-cluster.net',
    title: 'North Pacific Amateur Radio DX Cluster',
    category: 'forum',
    author: 'Alaska Radio Club',
    lastUpdated: '2004-10-23',
    description: 'Real-time spotting of rare HF and VLF radio signals from the Arctic circle.',
    searchKeywords: ['dx', 'ham radio', 'alaska', 'vlf', 'cluster', 'spots'],
    links: ['netboard99.org', 'usenet-alt-signals.org'],
    rawSourceCode: `<!-- Spot: 14.300 MHz - Station Epsilon emergency beacon heard 59+ in Anchorage. -->`,
    contentHtml: `<h2>DX Cluster Spots (North Pacific)</h2><p>Live spotting of rare propagation openings and mystery radio beacons.</p>`,
  },
  {
    url: 'subsea-cables-map.net',
    title: 'Interactive Submarine Fiber & Telegraph Cable Atlas',
    category: 'tech_docs',
    author: 'Global Cable Survey Group',
    lastUpdated: '2004-04-12',
    description: 'Historical routes of undersea telegraph lines and fiber optic trunks since 1858.',
    searchKeywords: ['subsea', 'cables', 'map', 'fiber', 'telegraph', 'chronowave'],
    links: ['chronowave.com', 'trench-geology.edu'],
    rawSourceCode: `<!-- PAC-1 fiber route laid in 1999 directly touches Station Epsilon anchor point. -->`,
    contentHtml: `<h2>Subsea Cable Infrastructure Atlas</h2><p>Tracing the copper and glass arteries crossing the world's oceans.</p>`,
  },
  {
    url: 'ionosphere-watch.org',
    title: 'Space Weather & Ionospheric Disturbances Monitor',
    category: 'research',
    author: 'Solar Terrestrial Physics Group',
    lastUpdated: '2004-10-20',
    description: 'Solar flares, coronal mass ejections, and geomagnetic storm K-index ratings.',
    searchKeywords: ['ionosphere', 'solar flare', 'space weather', 'geomagnetic', 'k-index'],
    links: ['svalbard-cryo.ac.no', 'deepsky-astrometry.net'],
    rawSourceCode: `<!-- Recalibrated historical solar proton event: Sept 26 1983 was X-12.8 megaflare. -->`,
    contentHtml: `<h2>Space Weather Real-Time Dashboard</h2><p>Monitoring ionospheric absorption and geomagnetic storm activity.</p>`,
  },
  {
    url: 'deepsky-astrometry.net',
    title: 'Deep Sky Astrometry & Pulsar Survey',
    category: 'research',
    author: 'International Astrometric Consortium',
    lastUpdated: '2004-09-14',
    description: 'Pulsar timing arrays, celestial coordinate frames, and stellar aberration tables.',
    searchKeywords: ['astrometry', 'pulsar', 'ephemerides', 'elena', 'deepsky'],
    links: ['svalbard-cryo.ac.no/papers/pulsar-drift', 'sol-chronometry.ch'],
    rawSourceCode: `<!-- Cross-check timing offsets with Dr. Elena Rostova's Svalbard station data. -->`,
    contentHtml: `<h2>Deep Sky Astrometric Standards</h2><p>High-precision stellar positioning and millisecond pulsar timing baselines.</p>`,
  },
  {
    url: 'retrocomputing-museum.org',
    title: 'The Digital Antiquities & Retrocomputing Museum',
    category: 'marketplace',
    author: 'Curator Marcus',
    lastUpdated: '2004-06-30',
    description: 'Preserving operating systems, punch cards, magnetic core memory, and early terminal workstations.',
    searchKeywords: ['retrocomputing', 'museum', 'vt100', 'unix', 'pdp11', 'vax'],
    links: ['silicon-surplus.com', 'clara-antiquarian.co.uk'],
    rawSourceCode: `<!-- Featured display: SomniaOS Terminal Prototype recovered from 1983 testing. -->`,
    contentHtml: `<h2>The Retrocomputing Museum</h2><p>Honoring the machines that birthed the digital age.</p>`,
  },
  {
    url: 'whistleblower-legal.org',
    title: 'National Whistleblower Defense & Freedom Counsel',
    category: 'corporate',
    author: 'Legal Advocacy Group',
    lastUpdated: '2004-08-10',
    description: 'Legal rights, non-disclosure agreement defense, and scientific whistleblower protections.',
    searchKeywords: ['whistleblower', 'legal', 'nda', 'rights', 'defense'],
    links: ['theglitchboard.net', 'globalchronicle.com'],
    rawSourceCode: `<!-- Advisory: Corporate NDAs cannot enforce concealment of criminal data tampering. -->`,
    contentHtml: `<h2>Whistleblower Legal Assistance</h2><p>Protecting researchers and employees who expose institutional falsification.</p>`,
  },
  {
    url: 'tape-restoration-lab.com',
    title: 'Apex Magnetic Tape Restoration Laboratories',
    category: 'marketplace',
    author: 'Apex Audio Labs',
    lastUpdated: '2004-07-04',
    description: 'Sticky-shed syndrome baking, tape azimuth calibration, and forensic audio recovery.',
    searchKeywords: ['tape restoration', 'sticky shed', 'baking', 'audio', 'reels'],
    links: ['clara-antiquarian.co.uk', 'silicon-surplus.com'],
    rawSourceCode: `<!-- Recovered tape reels from Cold War listening posts can be digitized with zero loss. -->`,
    contentHtml: `<h2>Magnetic Tape Forensic Restoration</h2><p>Baking, cleaning, and reading brittle polyester and acetate magnetic tapes.</p>`,
  },
  {
    url: 'pacific-cryptids.org',
    title: 'North Pacific Cryptozoology & Phantom Sounds',
    category: 'personal',
    author: 'Bering Sea Folklore Society',
    lastUpdated: '2003-12-18',
    description: 'Folklore, "The Bloop", anomalous underwater acoustic recordings, and phantom ghost ships of the Aleutians.',
    searchKeywords: ['cryptids', 'bloop', 'folklore', 'phantom', 'aleutian'],
    links: ['marcus-hydrophone.net', 'theglitchboard.net'],
    rawSourceCode: `<!-- Fishermen in Dutch Harbor report hearing metallic humming through their steel hulls. -->`,
    contentHtml: `<h2>Pacific Phantom Sounds & Deep Folklore</h2><p>Strange noises from the abyss that science cannot explain.</p>`,
  },
  {
    url: 'federal-telecom-oversight.gov.mirror',
    title: 'Federal Telecommunications Commission Archive Mirror',
    category: 'news',
    author: 'Public Records Division',
    lastUpdated: '2004-03-15',
    description: 'Public records on frequency spectrum allocations, sub-sea cable permits, and national security directives.',
    searchKeywords: ['telecom', 'oversight', 'fcc', 'regulations', 'frequencies'],
    links: ['luminarydynamics.com', 'chronowave.com'],
    rawSourceCode: `<!-- Directive #83-C classification order issued to Luminary Cognitive Dynamics. -->`,
    contentHtml: `<h2>Federal Telecom Regulatory Archive</h2><p>Public registry of radio spectrum licenses and maritime communication corridors.</p>`,
  },
  {
    url: 'geopages.net/~analog_girl',
    title: "Analog Girl's Polar Notebook",
    category: 'personal',
    author: 'Astrid Lind',
    lastUpdated: '2004-09-09',
    description: 'Living in Longyearbyen, film photography, listening to shortwave radio in the dark, and polar foxes.',
    searchKeywords: ['analog girl', 'polar', 'svalbard', 'photography', 'radio'],
    links: ['northern-herald.no', 'elena-skynotes.net'],
    rawSourceCode: `<!-- Saw Dr. Elena Rostova walking to the radio dishes under the green aurora tonight. -->`,
    contentHtml: `<h2>Life at 78 Degrees North</h2><p>Black and white photos of snow, silence, and radio antennas.</p>`,
  },
  {
    url: 'geopages.net/~phreak_99',
    title: "Phreak_99: 2600 Hz Blue Box & Subsea Line Tap",
    category: 'personal',
    author: 'Phreak_99',
    lastUpdated: '2004-10-02',
    description: 'Telephone network routing, trunk lines, C5 signaling, and tapping forgotten military subsea cables.',
    searchKeywords: ['phreak', '2600', 'blue box', 'subsea', 'routing'],
    links: ['netboard99.org', 'theglitchboard.net'],
    rawSourceCode: `<!-- Dialing 783 on trunk line 4 connects to a continuous data screech in Alaska. -->`,
    contentHtml: `<h2>The Underground Phreaking Manual</h2><p>Exploring the routing architecture of the global telephone system.</p>`,
  },
  {
    url: 'atlantis-trench-expeditions.com',
    title: 'Atlantis Deep Trench Survey Consortia',
    category: 'research',
    author: 'Ocean Survey Team',
    lastUpdated: '2004-01-28',
    description: 'Submersible dives to the Mariana, Kermadec, and Aleutian trenches using robotic ROVs.',
    searchKeywords: ['atlantis', 'trench', 'rov', 'submersible', 'deep sea'],
    links: ['trench-geology.edu', 'orpheus.org/research/station-epsilon'],
    rawSourceCode: `<!-- ROV dive #142 footage showed rectilinear walls at the base of the Aleutian Trench. -->`,
    contentHtml: `<h2>Deep Trench Robotics & Submersibles</h2><p>Pushing unmanned ROVs into the hadal depths of our oceans.</p>`,
  },
  {
    url: 'coldwar-microfilm.org',
    title: 'The Cold War Microfilm Preservation Network',
    category: 'research',
    author: 'Archival Preservation Trust',
    lastUpdated: '2004-06-11',
    description: 'Digitizing declassified Cold War military microfilm before chemical vinegar syndrome destroys the emulsion.',
    searchKeywords: ['microfilm', 'cold war', 'preservation', 'archives', 'declassified'],
    links: ['aethelgard.org', 'petrov-archive.org'],
    rawSourceCode: `<!-- Microfilm reel 1983-09-B shows Stanislav Petrov's official reprimand for hesitation. -->`,
    contentHtml: `<h2>Microfilm Historical Preservation</h2><p>Saving historical records captured on 35mm silver-halide film.</p>`,
  },
  {
    url: 'chronos-failsafe.net',
    title: 'Project Chronos: The Final Fail-Safe Archive',
    category: 'whistleblower',
    author: 'Dr. Arun Kovacs & Dr. Elena Rostova',
    lastUpdated: '2004-10-24',
    description: 'The automated beacon that triggered upon Station Epsilon shutdown. Links directly to SomniaOS recovery.',
    searchKeywords: ['chronos', 'failsafe', 'beacon', 'kovacs', 'rostova', 'somnia'],
    links: ['unboundsomnia.net', 'theglitchboard.net', 'orpheus.org'],
    hiddenClueId: 'CLUE-WEB-FAILSAFE',
    rawSourceCode: `<!-- CONGRATULATIONS: You have reached the core fail-safe site.
The computer you are using contains the complete memory of our timeline.
Pin all 5 narrative arcs in the Investigator workspace to achieve full resolution. -->`,
    contentHtml: `
      <h2>PROJECT CHRONOS: FAIL-SAFE BEACON ACTIVATED</h2>
      <p class="meta">Status: TRANSMITTING ON 7.834 HZ | HOST: TERMINAL STATION EPSILON</p>
      <div class="glow-box">
        <h3>To the Investigator:</h3>
        <p>If you are reading this webpage on the ArcaNet browser, the Somnia operating system has successfully initialized inside your timeline.</p>
        <p>The boundary between what is real and what is recorded is a fiction of the human mind. Stanislav Petrov saved your world, but in ours, the pulse echoed forever.</p>
        <p>Open <strong>Chronos Timeline</strong> to see where the branches divided. Open the <strong>Investigation Board</strong> to link the evidence.</p>
      </div>
    `,
  },
];
