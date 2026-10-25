import { EmailMessage, MailAccount } from '../types/mail';

export const SEED_MAIL_ACCOUNTS: MailAccount[] = [
  {
    id: 'acc_investigator',
    email: 'investigator@somnia.net',
    displayName: 'Lead Investigator (Active Session)',
    role: 'External Auditor / Recovered Station Terminal',
    avatarColor: '#22c55e',
    isUnlocked: true,
  },
  {
    id: 'acc_kovacs',
    email: 'dr.kovacs@orpheus.org',
    displayName: 'Dr. Arun Kovacs',
    role: 'Chief Physicist, Orpheus Institute',
    avatarColor: '#3b82f6',
    isUnlocked: true,
  },
  {
    id: 'acc_elena',
    email: 'elena.rostova@svalbard-cryo.ac.no',
    displayName: 'Dr. Elena Rostova',
    role: 'Astrometry Director, Svalbard Observatory',
    avatarColor: '#a855f7',
    isUnlocked: true,
  },
  {
    id: 'acc_sterling',
    email: 'j.sterling@luminarydynamics.com',
    displayName: 'Julian Sterling',
    role: 'Executive VP, Luminary Cognitive Dynamics',
    avatarColor: '#ef4444',
    isUnlocked: false,
    unlockRequirementHint: 'Elevate clearance to Level 4 or discover password in Luminary Directive memo',
    unlockClueId: 'CLUE-LUM-01',
  },
  {
    id: 'acc_nullpointer',
    email: 'nullpointer@theglitchboard.net',
    displayName: 'NullPointer',
    role: 'Anonymous BBS SysOp & Whistleblower',
    avatarColor: '#eab308',
    isUnlocked: false,
    unlockRequirementHint: 'Unlocked by reading the Pinned Somnia thread on The Glitch Board',
    unlockClueId: 'CLUE-WEB-SOMNIA-TRUTH',
  },
];

export const SEED_EMAILS: EmailMessage[] = [
  // Kovacs Account Inbox
  {
    id: 'mail_kov_01',
    accountId: 'acc_kovacs',
    folder: 'inbox',
    from: 'elena.rostova@svalbard-cryo.ac.no',
    to: 'dr.kovacs@orpheus.org',
    date: '2004-10-21 14:10',
    subject: 'URGENT: Sterling is preparing to sever the Aleutian fiber',
    body: `Arun,

I received an encrypted telex from a contact at Luminary headquarters in Geneva.
Julian Sterling signed off on Directive 83 yesterday afternoon. They are sending a technical team to Dutch Harbor with orders to remotely overwrite the firmware on your hydrophone transducers and disconnect Station Epsilon from the ArcaNet gateway.

Sterling claims the 7.83 Hz signal is an "industrial liability" because it proves their cognitive computing patents were stolen from the planetary resonance phenomenon.

Do not let them delete the tape reels. Make sure your local terminal has mirrored everything to the offline virtual file system.

The password I set on the astrometric divergence paper is: 7.83-PETROV-1983.
Use it in the terminal if you need to decrypt the failsafe file in /archive.

Stay safe in the deep,
Elena`,
    isRead: false,
    isFlagged: true,
    labels: ['Urgent', 'Classified', 'Evidence'],
    clueId: 'CLUE-MAIL-KOV-01',
    attachments: [
      {
        name: 'astrometric_divergence.md',
        size: '2.1 KB',
        type: 'text/markdown',
        targetApp: 'explorer',
        targetPath: '/users/elena/astrometric_divergence.md',
      },
    ],
  },
  {
    id: 'mail_kov_02',
    accountId: 'acc_kovacs',
    folder: 'inbox',
    from: 'j.sterling@luminarydynamics.com',
    to: 'dr.kovacs@orpheus.org',
    date: '2004-10-18 09:30',
    subject: 'NOTICE OF CONTRACT TERMINATION & MANDATORY ARCHIVE AUDIT',
    body: `Dr. Kovacs,

Effective October 31, 2004, Luminary Cognitive Dynamics is terminating all sponsored research grants for Station Epsilon.

Our legal department has reviewed your recent preprint submission concerning "Parallel Timeline Signals in the Schumann Cavity". You are in direct violation of Section 9 of your Non-Disclosure Agreement. There is no parallel timeline. There are no "voices in the bedrock".

You are hereby instructed to package all magnetic tapes, logbooks, and hard drive platters and surrender them to the courier arriving in Adak on Friday.

Any attempt to transmit data outside the local network will result in immediate legal prosecution.

Julian Sterling
Executive Vice President
Luminary Cognitive Dynamics`,
    isRead: true,
    labels: ['Corporate', 'Legal', 'Directive 83'],
    clueId: 'CLUE-MAIL-KOV-02',
  },
  {
    id: 'mail_kov_03',
    accountId: 'acc_kovacs',
    folder: 'sent',
    from: 'dr.kovacs@orpheus.org',
    to: 'j.sterling@luminarydynamics.com',
    date: '2004-10-18 11:45',
    subject: 'Re: NOTICE OF CONTRACT TERMINATION',
    body: `Julian,

You know as well as I do why you want those tapes destroyed.
We digitized Reel #4 from Serpukhov-15. The radar log shows that on September 26, 1983, the world we are standing on was supposed to end. The only reason we exist is because the sub-harmonic cavity absorbed the electromagnetic pulse and created an interference pattern that allowed our timeline to continue.

Now the cavity is breaking down. The clock drift at Svalbard (+43.8ms) proves the phase coherence is failing.

If we shut down the transducers, both timelines will collapse into noise. I will not hand over the archives.

Dr. Arun Kovacs`,
    isRead: true,
    labels: ['Sent', 'Contradiction'],
    clueId: 'CLUE-MAIL-KOV-03',
  },
  {
    id: 'mail_kov_04',
    accountId: 'acc_kovacs',
    folder: 'inbox',
    from: 'nullpointer@theglitchboard.net',
    to: 'dr.kovacs@orpheus.org',
    date: '2004-10-23 22:05',
    subject: 'The Glitch Board has your back',
    body: `Dr. Kovacs,

We mirrored your hydrophone logs to NetBoard-99 and the underground Glitch Board servers. Over 40 amateur radio operators across the Pacific are recording the 7.83 Hz carrier right now.

Even if Luminary cuts the subsea power lines to Station Epsilon, the data is already loose.

Remember: the Somnia terminal has a built-in state manager. Anyone investigating this machine can branch the timeline, test different hypotheses on the Investigation Board, and preserve the evidence.

Keep the beacon broadcasting.
- NullPointer`,
    isRead: false,
    labels: ['BBS', 'Whistleblower'],
    clueId: 'CLUE-MAIL-KOV-04',
  },

  // Elena Account Inbox
  {
    id: 'mail_ele_01',
    accountId: 'acc_elena',
    folder: 'inbox',
    from: 'dr.kovacs@orpheus.org',
    to: 'elena.rostova@svalbard-cryo.ac.no',
    date: '2004-10-22 01:15',
    subject: 'The Voices in Channel 4',
    body: `Elena,

Marcus and I stayed up all night running the Fast Fourier Transform on Channel 4.
It is no longer just static. When we converted the 7.83 Hz carrier into an audio signal by pitch-shifting it up by 6 octaves, we could clearly hear a radio broadcast in Russian.

The announcer was reading casualty statistics from the Ural mountains. The date mentioned in the broadcast was November 14, 1983.

It's the world where Petrov followed protocol. Their world died in nuclear winter, but their communications—their radio waves, their telephone exchanges—became trapped in the Earth's standing wave cavity.

When our transducers activate, we are literally eavesdropping on their ghosts.

I placed the audio recording into the AetherWave media player library under the title "Tape Reel #4: The 1983 Ghost Broadcast". Listen to it with headphones.

Arun`,
    isRead: false,
    isFlagged: true,
    labels: ['Audio', 'Anomaly', 'Critical'],
    clueId: 'CLUE-MAIL-ELE-01',
    attachments: [
      {
        name: 'tape_reel_04_ghost.rec',
        size: '4.8 MB',
        type: 'audio/x-somnia-rec',
        targetApp: 'media',
      },
    ],
  },

  // Sterling Account (Unlocked via Clearance/Clue)
  {
    id: 'mail_ster_01',
    accountId: 'acc_sterling',
    folder: 'inbox',
    from: 'director.operations@dla.mil.defense',
    to: 'j.sterling@luminarydynamics.com',
    date: '2004-10-14 16:00',
    subject: 'CLASSIFIED: Project Somnia Phase-2 Acquisition Agreement',
    body: `Julian,

The Undersecretary has signed off on the $400M allocation for Project Somnia.

Our interest remains strictly focused on the cognitive overwrite potential of the 7.83 Hz carrier wave. If Luminary can demonstrate that civilian radio frequencies can be modulated with synthetic neural memories, we will proceed with the immediate deployment of the Arctic transmitter towers.

Ensure the Orpheus scientists are completely cleared from Station Epsilon before the inspection team lands in November. We cannot afford leaks regarding the 1983 Petrov discrepancy.

DLA Contracting Division`,
    isRead: false,
    isFlagged: true,
    labels: ['EYES ONLY', 'Defense', 'Coverup'],
    clueId: 'CLUE-MAIL-STER-01',
  },

  // Investigator Session Inbox
  {
    id: 'mail_inv_01',
    accountId: 'acc_investigator',
    folder: 'inbox',
    from: 'system.daemon@somnia.os',
    to: 'investigator@somnia.net',
    date: '2004-10-24 22:15',
    subject: 'Station Epsilon Terminal Session Initialized',
    body: `WELCOME TO SOMNIA INVESTIGATION SESSION.

Terminal Node: ALEUTIAN-EPSILON-04
Virtual Storage: MOUNTED (/dev/sd0a)
Clue Engine: ARMED & TRACKING DISCOVERY CONDITIONS
Local Network: ARCANET (40+ Fictional Sites Cached)

YOUR MISSION:
Uncover why Station Epsilon was erased from the historical record, resolve the contradiction between the 1983 Petrov archives, and trace the 5 narrative arcs to complete the Somnia Protocol.

All emails, files, websites, and chat logs are real simulated data within this machine. Progress is automatically persisted.

Good hunting.`,
    isRead: false,
    labels: ['System', 'Briefing'],
  },
];
