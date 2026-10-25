import { ChatChannel, ChatMessage } from '../types/chat';

export const SEED_CHAT_CHANNELS: ChatChannel[] = [
  {
    id: 'chan_orpheus',
    name: '#orpheus-core',
    topic: 'Official channel for Orpheus Institute staff and Station Epsilon team',
    memberCount: 18,
    unreadCount: 2,
  },
  {
    id: 'chan_telemetry',
    name: '#telemetry-night-shift',
    topic: 'Real-time Aleutian hydrophone monitoring & acoustic FFT traces',
    memberCount: 7,
    unreadCount: 4,
  },
  {
    id: 'chan_watercooler',
    name: '#watercooler',
    topic: 'Casual chat, coffee shortages, and weather in Svalbard',
    memberCount: 24,
    unreadCount: 0,
  },
  {
    id: 'chan_anomaly',
    name: '#anomaly-investigation',
    topic: 'CONFIDENTIAL: 1983 divergence event & clock skew debate',
    isPrivate: true,
    memberCount: 4,
    unreadCount: 3,
  },
];

export const SEED_CHAT_MESSAGES: ChatMessage[] = [
  // #orpheus-core
  {
    id: 'msg_orp_01',
    channelId: 'chan_orpheus',
    sender: 'a.kovacs',
    senderRole: 'Chief Physicist',
    timestamp: '2004-10-23 18:20',
    avatarColor: '#3b82f6',
    text: 'Has anyone seen the updated bathymetry sonar from Eidolon? They claim there is a geometric stone formation directly beneath Array 4.',
    clueId: 'CLUE-CHAT-ORP-01',
  },
  {
    id: 'msg_orp_02',
    channelId: 'chan_orpheus',
    sender: 'm.vance',
    senderRole: 'Hydrophone Tech',
    timestamp: '2004-10-23 18:25',
    avatarColor: '#10b981',
    text: 'I pulled the core samples last Tuesday. The basalt is magnetized in alternating bands, exactly like oceanic spreading ridges, but the polarization oscillates at 7.83 Hz.',
  },
  {
    id: 'msg_orp_03',
    channelId: 'chan_orpheus',
    sender: 'e.rostova',
    senderRole: 'Astrometry Director',
    timestamp: '2004-10-23 18:31',
    avatarColor: '#a855f7',
    text: 'Svalbard atomic clocks just slipped another 1.4 milliseconds. At this rate, by next month our calendar will not match Greenwich.',
  },

  // #telemetry-night-shift
  {
    id: 'msg_tel_01',
    channelId: 'chan_telemetry',
    sender: 'm.vance',
    senderRole: 'Hydrophone Tech',
    timestamp: '2004-10-24 02:14',
    avatarColor: '#10b981',
    text: 'Night shift log: Ambient ocean noise is down to 2 dB. The 7.83 Hz spike is clear across all 16 transducers.',
  },
  {
    id: 'msg_tel_02',
    channelId: 'chan_telemetry',
    sender: 'm.vance',
    senderRole: 'Hydrophone Tech',
    timestamp: '2004-10-24 02:19',
    avatarColor: '#10b981',
    text: 'Wait... I am looking at the waterfall display. There are horizontal lines forming characters. It is spelling out: "SERPUKHOV 1983 - PETROV DID NOT ABORT".',
    clueId: 'CLUE-CHAT-TEL-01',
  },
  {
    id: 'msg_tel_03',
    channelId: 'chan_telemetry',
    sender: 'a.kovacs',
    senderRole: 'Chief Physicist',
    timestamp: '2004-10-24 02:22',
    avatarColor: '#3b82f6',
    text: 'Marcus, do NOT wipe that buffer! Pipe the demodulated audio into AetherWave media player right now.',
  },

  // #watercooler
  {
    id: 'msg_wat_01',
    channelId: 'chan_watercooler',
    sender: 'clara.h',
    senderRole: 'Archivist',
    timestamp: '2004-10-22 11:00',
    avatarColor: '#ec4899',
    text: 'Anyone know why corporate is sending an audit team from Geneva? Sterling was in a terrible mood on the conference call.',
  },
  {
    id: 'msg_wat_02',
    channelId: 'chan_watercooler',
    sender: 'tech_bob',
    senderRole: 'IT Admin',
    timestamp: '2004-10-22 11:15',
    avatarColor: '#6b7280',
    text: 'Rumor is they are selling off our patents to defense contractors. Make personal backups of everything in your home directory.',
  },

  // #anomaly-investigation
  {
    id: 'msg_ano_01',
    channelId: 'chan_anomaly',
    sender: 'a.kovacs',
    senderRole: 'Chief Physicist',
    timestamp: '2004-10-24 04:00',
    avatarColor: '#3b82f6',
    text: 'I have reconstructed the timeline. The divergence began on September 26, 1983. In the official world, Petrov saved everyone. But in the sub-harmonic cavity, the electromagnetic aftermath was permanently trapped.',
    clueId: 'CLUE-CHAT-ANO-01',
  },
  {
    id: 'msg_ano_02',
    channelId: 'chan_anomaly',
    sender: 'e.rostova',
    senderRole: 'Astrometry Director',
    timestamp: '2004-10-24 04:10',
    avatarColor: '#a855f7',
    text: 'And Luminary is trying to weaponize that trapped consciousness to build neural computing chips. That is what SomniaOS was originally built to test.',
  },
  {
    id: 'msg_ano_03',
    channelId: 'chan_anomaly',
    sender: 'nullpointer',
    senderRole: 'BBS SysOp',
    timestamp: '2004-10-24 04:15',
    avatarColor: '#eab308',
    text: 'Do not worry. The terminal has an investigation board. The user who reboots this machine will piece the puzzle together.',
  },
];
