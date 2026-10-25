import { VFSNode } from '../types/vfs';

export const INITIAL_VFS_DATA: Record<string, VFSNode> = {
  // Root
  'root': {
    id: 'root',
    name: '/',
    path: '/',
    type: 'directory',
    parentId: null,
    size: 4096,
    createdAt: '1998-04-12T08:00:00Z',
    modifiedAt: '2004-10-18T14:32:00Z',
    permission: 'public',
    tags: ['system', 'root'],
  },

  // /system
  'dir_system': {
    id: 'dir_system',
    name: 'system',
    path: '/system',
    type: 'directory',
    parentId: 'root',
    size: 4096,
    createdAt: '1998-04-12T08:00:00Z',
    modifiedAt: '2004-10-18T14:32:00Z',
    permission: 'confidential',
    tags: ['os', 'system'],
  },
  'file_sys_log': {
    id: 'file_sys_log',
    name: 'sys.log',
    path: '/system/sys.log',
    type: 'file',
    parentId: 'dir_system',
    size: 1420,
    createdAt: '2004-10-15T02:11:00Z',
    modifiedAt: '2004-10-24T22:04:12Z',
    permission: 'confidential',
    tags: ['log', 'kernel', 'telemetry'],
    mimeType: 'text/plain',
    fileType: 'log',
    content: `[02:11:04] SOMNIA-KERNEL v4.81-rel booted on node STATION-EPSILON-ALEUTIAN
[02:11:05] CPU: 4x Neural Resonance Core (Simulated Synchronous)
[02:11:07] VFS mounted read/write on /dev/sd0a
[02:11:09] Initializing Chronos Telemetry Daemon... OK
[02:11:12] Sub-harmonic hydrophone array synced to 7.83 Hz fundamental.
[02:11:14] WARNING: Carrier drift detected on Channel 09 (Aleutian Trench Array 4).
[02:11:15] Signal modulation conforms to non-terrestrial packet structure.
[02:11:18] Warning: Clock drift discrepancy detected between local RTC and satellite time.
[02:11:19] Local RTC: Oct 24 2004 22:04:12 GMT
[02:11:20] Sub-harmonic carrier phase indicates temporal shift: +7692.4 hrs.
[02:11:25] Process chronos-syncd[pid 104] reported memory page divergence at 0x7FFF004B.
[02:11:29] DAEMON: Attempting quantum hash parity check... MISMATCH.
[02:11:32] [ANOMALY] Unregistered remote connection established from internal loopback IP 127.0.83.26
[02:11:33] Received header: "ORPHEUS-PROJECT-ARCHIVE-UNBOUND"`,
    clueId: 'CLUE-SYS-01',
  },
  'file_kernel_conf': {
    id: 'file_kernel_conf',
    name: 'kernel.conf',
    path: '/system/kernel.conf',
    type: 'file',
    parentId: 'dir_system',
    size: 680,
    createdAt: '1999-01-04T12:00:00Z',
    modifiedAt: '2003-08-11T09:21:00Z',
    permission: 'restricted',
    tags: ['config', 'kernel'],
    mimeType: 'text/plain',
    fileType: 'text',
    content: `# SomniaOS Configuration Parameters
CONFIG_TELEMETRY_PORT=7830
CONFIG_SUBHARMONIC_FILTER=BANDPASS_7_83HZ
CONFIG_TEMPORAL_BUFFER_SIZE=65536
CONFIG_ALLOW_PARALLEL_STATE_DIVERGENCE=true
CONFIG_STATION_ID="ALEUTIAN-EPSILON-04"
CONFIG_PRIMARY_SUPERVISOR="dr.arun.kovacs"
CONFIG_DEFAULT_CLEARANCE=2
# Emergency clearance override hash: 783-PETROV-ORPHEUS
CONFIG_FAILSAFE_DUMP_DIR=/archive/failsafe`,
  },

  // /users
  'dir_users': {
    id: 'dir_users',
    name: 'users',
    path: '/users',
    type: 'directory',
    parentId: 'root',
    size: 4096,
    createdAt: '1998-04-12T08:00:00Z',
    modifiedAt: '2004-10-18T14:32:00Z',
    permission: 'public',
    tags: ['users'],
  },

  // /users/investigator
  'dir_investigator': {
    id: 'dir_investigator',
    name: 'investigator',
    path: '/users/investigator',
    type: 'directory',
    parentId: 'dir_users',
    size: 4096,
    createdAt: '2004-10-24T00:00:00Z',
    modifiedAt: '2004-10-24T00:00:00Z',
    permission: 'public',
    tags: ['investigator', 'home'],
  },
  'file_welcome': {
    id: 'file_welcome',
    name: 'WELCOME_INVESTIGATOR.txt',
    path: '/users/investigator/WELCOME_INVESTIGATOR.txt',
    type: 'file',
    parentId: 'dir_investigator',
    size: 1850,
    createdAt: '2004-10-24T00:00:00Z',
    modifiedAt: '2004-10-24T00:00:00Z',
    permission: 'public',
    tags: ['welcome', 'readme', 'critical'],
    mimeType: 'text/plain',
    fileType: 'text',
    content: `======================================================================
               SOMNIA OPERATING SYSTEM - TERMINAL RECOVERY
                 Station Epsilon Recovery Drive [ID: 9A28-FF31]
======================================================================

You have gained access to a reconstructed terminal station belonging to 
the Orpheus Institute for Sub-Harmonic Physics and Luminary Cognitive Dynamics.

This terminal was recovered from the abandoned Aleutian Trench Sub-Borehole
research post. The timestamp on the hardware reads October 2004, yet historical
civil records indicate Station Epsilon was decommissioned in November 1983.

HOW TO OPERATE THIS COMPUTER:
1. EXPLORE THE VIRTUAL FILE SYSTEM:
   Use 'Navigator Pro' (Explorer) or the Terminal to inspect documents,
   incident reports, declassified archives, and deleted records in the Recycle Bin.

2. INVESTIGATE COMMUNICATIONS & WEBSITES:
   - Check 'OmniMail' for archived messages between Dr. Arun Kovacs, 
     Dr. Elena Rostova, and Luminary Director Julian Sterling.
   - Use 'ArcaNet Browser' to navigate over 40 preserved websites, research portals,
     whistleblower forums, and personal web journals. Click 'View Source' on 
     websites to look for hidden developer comments and steganography.
   - Open 'SignalRelay' to read internal chat room transcripts.

3. USE THE INVESTIGATION BOARD:
   Open 'Investigation Board' to pin evidence nodes, link people, documents,
   and contradictory dates, and track your hypotheses as the clue engine
   unlocks hidden records.

4. THE CENTRAL MYSTERY:
   Why do the 1983 radar logs disagree on Stanislav Petrov's report?
   What was the 7.83 Hz signal recorded beneath the Aleutian seabed?
   And who is transmitting messages to this terminal in real-time?

The truth is preserved inside the computer. Begin your inquiry.`,
    clueId: 'CLUE-INIT-01',
  },

  // /users/kovacs
  'dir_kovacs': {
    id: 'dir_kovacs',
    name: 'kovacs',
    path: '/users/kovacs',
    type: 'directory',
    parentId: 'dir_users',
    size: 4096,
    createdAt: '1998-05-10T10:00:00Z',
    modifiedAt: '2004-09-30T18:40:00Z',
    permission: 'restricted',
    tags: ['kovacs', 'research'],
  },
  'file_kovacs_journal': {
    id: 'file_kovacs_journal',
    name: 'personal_journal.txt',
    path: '/users/kovacs/personal_journal.txt',
    type: 'file',
    parentId: 'dir_kovacs',
    size: 2450,
    createdAt: '2004-09-14T23:15:00Z',
    modifiedAt: '2004-10-12T01:05:00Z',
    permission: 'restricted',
    tags: ['diary', 'kovacs', 'evidence'],
    mimeType: 'text/plain',
    fileType: 'text',
    content: `[September 14, 2004]
Elena says I am losing sleep over ghosts. But the hydrophone data doesn't lie.
The Aleutian array is receiving a voice carrier. It is not radio spillover;
it is propagating through the granite at 7.83 Hz—the exact fundamental of
the Schumann cavity. 
When we run the Fast Fourier Transform, it produces ASCII text. The text contains
names of people who work in this building, interspersed with news headlines from
a year that feels completely wrong.

[September 22, 2004]
I compared our meteorological archives with the Global Chronicle website.
According to the Chronicle archives, the Petrov Nuclear Alarm on September 26, 1983,
resulted in a false alarm confirmed within twenty minutes.
Yet in the tape reels from Serpukhov-15 stored in our basement archive,
the alarm was never cleared by command. The tape abruptly ends with electromagnetic
pulse ionization artifacts.
How can two contradictory histories exist on the same magnetic media?

[October 04, 2004]
Director Sterling visited the station today. He did not ask about the acoustic telemetry.
He asked whether we had made external backups to the ArcaNet web cluster.
I lied. I told him our only copy was on the local storage partition.
If Luminary finds out that the whistleblower node 'NullPointer' has mirrored the 
hydrophone recordings onto NetBoard-99, they will terminate the power grid.

[October 12, 2004]
If anyone finds this: Elena hid the decryption key in her astrometric paper.
The password format corresponds to the resonance frequency and the date of the divergence.
Try: 7.83-PETROV-1983`,
    clueId: 'CLUE-KOVACS-01',
  },
  'file_subharmonic_draft': {
    id: 'file_subharmonic_draft',
    name: 'subharmonic_resonance_draft.md',
    path: '/users/kovacs/subharmonic_resonance_draft.md',
    type: 'file',
    parentId: 'dir_kovacs',
    size: 1980,
    createdAt: '2004-08-20T11:00:00Z',
    modifiedAt: '2004-09-28T16:30:00Z',
    permission: 'confidential',
    tags: ['physics', 'draft', 'orpheus'],
    mimeType: 'text/markdown',
    fileType: 'markdown',
    content: `# The Sub-Harmonic Carrier Hypothesis
**Author:** Dr. Arun Kovacs  
**Institution:** Orpheus Institute for Sub-Harmonic Physics  
**Classification:** RESTRICTED - INTERNAL PEER REVIEW ONLY

## Abstract
Recent deep-sea hydrophone measurements in the Aleutian Trench (52°40'N, 173°30'W)
at depths exceeding 6,200 meters have revealed continuous, phase-coherent acoustic
oscillations centered at 7.834 Hz. Unlike conventional tectonic tremors, this emission
exhibits mathematical symmetry indicative of an intentional digital carrier wave.

## The Cognitive Intercept Phenomenon
Laboratory personnel working near the resonant transducer tanks report vivid hypnagogic
phenomena:
1. Auditory sensations resembling synthesized speech.
2. Recall of detailed personal memories belonging to unfamiliar individuals.
3. Sudden spontaneous knowledge of classified military codes from the Cold War era.

We hypothesize that the resonant cavity of the Earth acts as a distributed informational
substrate. Under specific energetic conditions, digital computer networks and human neural
pathways may couple with this substrate, allowing information from adjacent temporal
divergence paths to leak into our hardware.`,
    clueId: 'CLUE-KOVACS-02',
  },

  // /users/elena
  'dir_elena': {
    id: 'dir_elena',
    name: 'elena',
    path: '/users/elena',
    type: 'directory',
    parentId: 'dir_users',
    size: 4096,
    createdAt: '1998-05-10T10:00:00Z',
    modifiedAt: '2004-10-18T12:00:00Z',
    permission: 'confidential',
    tags: ['elena', 'astronomy'],
  },
  'file_astrometric': {
    id: 'file_astrometric',
    name: 'astrometric_divergence.md',
    path: '/users/elena/astrometric_divergence.md',
    type: 'file',
    parentId: 'dir_elena',
    size: 2150,
    createdAt: '2004-10-02T14:20:00Z',
    modifiedAt: '2004-10-16T19:45:00Z',
    permission: 'confidential',
    tags: ['astronomy', 'telemetry', 'evidence'],
    mimeType: 'text/markdown',
    fileType: 'markdown',
    content: `# Astrometric Divergence and Radio Timing Discrepancies
**Observer:** Dr. Elena Rostova  
**Station:** Svalbard Cryo-Acoustic & Radio Observatory

## Summary of Findings
Starting in September 2004, pulsar timing observations of PSR B1937+21 taken from Svalbard
deviated by 43.8 milliseconds from reference ephemerides published by the Greenwich Observatory.

Even more disturbing: when we cross-referenced solar flare data from September 26, 1983,
we discovered that our geomagnetic records report an intense Class X-12 solar proton event
that blinded all high-latitude radar systems for 72 hours.
Yet Luminary's corporate historical database states that September 1983 was "geomagnetically quiet".

## The Hidden Coordinate
The acoustic focal point of the Aleutian signal converges at:
- Lat: 52° 41' 14" N
- Lon: 173° 32' 08" W
- Depth: -6,420 m

At this coordinate, bathymetric sonar reveals an artificial rectilinear structure
measuring 800m by 350m embedded in the basalt trench.
Construction dates precede human offshore drilling capability by at least two centuries.`,
    clueId: 'CLUE-ELENA-01',
  },

  // /shared
  'dir_shared': {
    id: 'dir_shared',
    name: 'shared',
    path: '/shared',
    type: 'directory',
    parentId: 'root',
    size: 4096,
    createdAt: '1998-04-12T08:00:00Z',
    modifiedAt: '2004-10-20T17:00:00Z',
    permission: 'public',
    tags: ['shared'],
  },
  'dir_luminary': {
    id: 'dir_luminary',
    name: 'luminary_memos',
    path: '/shared/luminary_memos',
    type: 'directory',
    parentId: 'dir_shared',
    size: 4096,
    createdAt: '1999-02-14T09:00:00Z',
    modifiedAt: '2004-10-01T15:20:00Z',
    permission: 'restricted',
    tags: ['luminary', 'corporate', 'restricted'],
  },
  'file_directive_83': {
    id: 'file_directive_83',
    name: 'directive_83_redaction.txt',
    path: '/shared/luminary_memos/directive_83_redaction.txt',
    type: 'file',
    parentId: 'dir_luminary',
    size: 1620,
    createdAt: '2004-09-18T10:00:00Z',
    modifiedAt: '2004-09-18T10:00:00Z',
    permission: 'eyes_only',
    tags: ['luminary', 'redacted', 'eyes_only'],
    mimeType: 'text/plain',
    fileType: 'text',
    content: `CONFIDENTIAL // EYES ONLY - LUMINARY COGNITIVE DYNAMICS
MEMORANDUM FOR: Station Directors, Project Somnia
FROM: Julian Sterling, Executive Vice President
SUBJECT: Purge of Non-Conforming 1983 Historical References

It has come to executive attention that research staff at Station Epsilon and
Svalbard have circulating unverified documents regarding the "1983 Divergence Event".

Let this directive be absolute:
1. The official corporate record reflects that Luminary acquired the Orpheus Institute
   patents in 1991 through standard commercial liquidation.
2. Any employee found harboring tape archives labeled "SERPUKHOV-15", "OCTOBER-COLLAPSE",
   or "PROJECT SOMNIA STAGE-0" will face immediate contract termination and prosecution
   under national secrets legislation.
3. The 7.83 Hz carrier is an industrial byproduct of undersea telegraphic cables.
   It is NOT an intelligent transmission. Stop publishing papers claiming otherwise.

All local drive images must be audited by October 31.
Non-compliant files will be sanitized remotely via the Chronos master terminal.`,
    clueId: 'CLUE-LUM-01',
  },

  // /archive
  'dir_archive': {
    id: 'dir_archive',
    name: 'archive',
    path: '/archive',
    type: 'directory',
    parentId: 'root',
    size: 4096,
    createdAt: '1998-04-12T08:00:00Z',
    modifiedAt: '2004-10-15T11:00:00Z',
    permission: 'restricted',
    tags: ['archive', 'historical'],
  },
  'dir_petrov': {
    id: 'dir_petrov',
    name: '1983_petrov',
    path: '/archive/1983_petrov',
    type: 'directory',
    parentId: 'dir_archive',
    size: 4096,
    createdAt: '2000-06-01T08:00:00Z',
    modifiedAt: '2004-10-10T14:00:00Z',
    permission: 'eyes_only',
    tags: ['petrov', 'cold_war', 'classified'],
  },
  'file_petrov_conflict_a': {
    id: 'file_petrov_conflict_a',
    name: 'serpukhov_15_log_STREAM_A.txt',
    path: '/archive/1983_petrov/serpukhov_15_log_STREAM_A.txt',
    type: 'file',
    parentId: 'dir_petrov',
    size: 1540,
    createdAt: '2001-01-15T09:00:00Z',
    modifiedAt: '2001-01-15T09:00:00Z',
    permission: 'confidential',
    tags: ['petrov', 'stream_a', 'contradiction'],
    mimeType: 'text/plain',
    fileType: 'text',
    content: `[ARCHIVE STREAM A - STANDARD TIMELINE DECLASSIFIED 1998]
Date: September 26, 1983 - 00:14 MSK
Location: Serpukhov-15 Bunker, USSR
Officer on Duty: Lt. Col. Stanislav Petrov

00:14:32 - Oko satellite system warns of single ICBM launch from Malmstrom AFB.
00:15:10 - Computer confidence indicator: HIGHEST (Level 5).
00:16:04 - Radar false alarm suspected due to high-altitude sun-reflection on clouds.
00:19:45 - Petrov classifies alert as false alarm. Ground radar fails to confirm.
00:23:00 - Situation resolved without retaliatory launch. World peace preserved.
Status: Verification confirmed by UN Historical Council.`,
    clueId: 'CLUE-PETROV-A',
  },
  'file_petrov_conflict_b': {
    id: 'file_petrov_conflict_b',
    name: 'serpukhov_15_log_STREAM_B.txt',
    path: '/archive/1983_petrov/serpukhov_15_log_STREAM_B.txt',
    type: 'file',
    parentId: 'dir_petrov',
    size: 1890,
    createdAt: '2001-01-15T09:00:00Z',
    modifiedAt: '2004-10-09T21:14:00Z',
    permission: 'eyes_only',
    tags: ['petrov', 'stream_b', 'contradiction', 'anomaly'],
    mimeType: 'text/plain',
    fileType: 'text',
    content: `[ARCHIVE STREAM B - RECOVERED SUB-RESONANT MAGNETIC TAPE]
Date: September 26, 1983 - 00:14 MSK
Source: Hydrophone Cavity Extraction (Aleutian Station Epsilon)

00:14:32 - Oko satellite system triggers simultaneous warning on 5 sectors.
00:15:10 - Lt. Col. Petrov attempts to confirm false alarm with ground radar.
00:16:50 - Ionospheric blackout begins across 60th parallel north. High-altitude EMP
           disrupts landlines to Moscow central command.
00:18:12 - Ground radar stations in Krasnoyarsk report multiple anomalous ionized wakes.
00:21:00 - Communication completely lost.
00:22:15 - [ANOMALY DETECTED]: The sky over northern hemisphere turns violet-white.
           Electromagnetic resonance locks at exactly 7.83 Hz.
00:24:00 - Recording continues with human biometric data leaking into radio frequency
           allocations. Millions of simultaneous voices recorded on VLF emergency bands.
Status: CONTRADICTS STANDARD HISTORY. Physical origin of Stream B tape verified authentic.`,
    clueId: 'CLUE-PETROV-B',
    contradictionWith: 'CLUE-PETROV-A',
  },
  'file_somnia_dat': {
    id: 'file_somnia_dat',
    name: 'somnia.dat',
    path: '/archive/somnia.dat',
    type: 'file',
    parentId: 'dir_archive',
    size: 8192,
    createdAt: '2004-10-24T06:00:00Z',
    modifiedAt: '2004-10-24T06:00:00Z',
    permission: 'eyes_only',
    tags: ['encrypted', 'somnia', 'archive'],
    mimeType: 'application/octet-stream',
    fileType: 'data',
    content: '[ENCRYPTED DATA BLOCK - 8192 BYTES - ALGORITHM: ORPHEUS-CHRONOS-CIPHER-256]',
    clueId: 'CLUE-SOMNIA-DAT',
  },

  // /recycle_bin
  'dir_recycle': {
    id: 'dir_recycle',
    name: 'recycle_bin',
    path: '/recycle_bin',
    type: 'directory',
    parentId: 'root',
    size: 4096,
    createdAt: '1998-04-12T08:00:00Z',
    modifiedAt: '2004-10-24T18:00:00Z',
    permission: 'public',
    tags: ['trash', 'system'],
  },
  'file_deleted_warning': {
    id: 'file_deleted_warning',
    name: 'kovacs_urgent_warning_DELETED.txt',
    path: '/recycle_bin/kovacs_urgent_warning_DELETED.txt',
    type: 'file',
    parentId: 'dir_recycle',
    size: 1420,
    createdAt: '2004-10-21T03:40:00Z',
    modifiedAt: '2004-10-23T04:12:00Z',
    permission: 'public',
    isDeleted: true,
    deletedAt: '2004-10-23T04:15:00Z',
    originalPath: '/users/kovacs/urgent_warning.txt',
    tags: ['deleted', 'warning', 'clue'],
    mimeType: 'text/plain',
    fileType: 'text',
    content: `[RECOVERED DELETED FRAGMENT - RESTORE AVAILABLE]
DO NOT ENGAGE THE PRIMARY TRANSDUCER ON OCTOBER 26!
Julian Sterling has agreed to sell the Somnia interface to the Defense Logistics Agency.
They believe the 7.83 Hz wave can be weaponized to overwrite civilian communications.
They don't understand what this machine really is.
The signal isn't a weapon. It is an echo from a universe where the 1983 war happened,
and the minds of the people who died were preserved in the planetary electromagnetic field!
Every time we run the transducer, we draw our timeline closer to their collapse.

If they wipe this system, search for "Project Somnia Mirror" on ArcaNet via NetBoard-99.
The archive password is: SOMNIA-PETROV-1983`,
    clueId: 'CLUE-TRASH-01',
  },
};
