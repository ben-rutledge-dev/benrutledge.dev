'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

const TRACKS = [
  { name: 'kick',    key: '1', initialMuted: false },
  { name: 'snare',   key: '2', initialMuted: false },
  { name: 'clap',    key: '3', initialMuted: false },
  { name: 'ohh',     key: '4', initialMuted: false },
  { name: 'chh',     key: 'q', initialMuted: false },
  { name: 'piano',   key: 'w', initialMuted: true  },
  { name: 'rhodes',  key: 'e', initialMuted: true  },
  { name: 'rhodes2', key: 'r', initialMuted: true  },
  { name: 'conga',   key: 'a', initialMuted: true  },
  { name: 'bass1',   key: 's', initialMuted: true  },
  { name: 'bass2',   key: 'd', initialMuted: true  },
  { name: 'vox1',    key: 'f', initialMuted: true  },
  { name: 'vox2',    key: 'z', initialMuted: true  },
  { name: 'vox3',    key: 'x', initialMuted: true  },
  { name: 'vox4',    key: 'c', initialMuted: true  },
  { name: 'vox5',    key: 'v', initialMuted: true  },
];

const LOOP_END = 7.577;

interface TrackData {
  source: AudioBufferSourceNode;
  gainNode: GainNode;
}

export default function CtrlLoopPlayer() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState<Record<string, boolean>>(
    Object.fromEntries(TRACKS.map(t => [t.name, t.initialMuted]))
  );
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [frequency, setFrequency] = useState(3500);

  const ctxRef = useRef<AudioContext | null>(null);
  const buffersRef = useRef<Record<string, AudioBuffer>>({});
  const sourcesRef = useRef<Record<string, TrackData>>({});
  const filterRef = useRef<BiquadFilterNode | null>(null);

  // Keep refs in sync for use inside callbacks without stale closures
  const mutedRef = useRef(muted);
  const filterEnabledRef = useRef(filterEnabled);
  useEffect(() => { mutedRef.current = muted; }, [muted]);
  useEffect(() => { filterEnabledRef.current = filterEnabled; }, [filterEnabled]);

  const handleStart = useCallback(async () => {
    setLoading(true);
    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) {
      alert('Web Audio API not supported in this browser');
      setLoading(false);
      return;
    }
    const ctx = new AudioContextCtor();
    ctxRef.current = ctx;

    await Promise.all(
      TRACKS.map(async ({ name }) => {
        const res = await fetch(`/ctrl-loop/audio/${name}.mp3`);
        const ab = await res.arrayBuffer();
        buffersRef.current[name] = await ctx.decodeAudioData(ab);
      })
    );

    setLoaded(true);
    setLoading(false);
  }, []);

  const stopPlayback = useCallback(() => {
    for (const { name } of TRACKS) {
      try { sourcesRef.current[name]?.source.stop(0); } catch { /* already stopped */ }
    }
    sourcesRef.current = {};
    setPlaying(false);
  }, []);

  const startPlayback = useCallback(() => {
    const ctx = ctxRef.current!;

    // Create a single shared filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = frequency;
    filterRef.current = filter;

    // Create sources and gain nodes
    const newSources: Record<string, TrackData> = {};
    for (const { name } of TRACKS) {
      const source = ctx.createBufferSource();
      const gainNode = ctx.createGain();
      source.buffer = buffersRef.current[name];
      source.loop = true;
      source.loopEnd = LOOP_END;
      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      newSources[name] = { source, gainNode };
    }
    sourcesRef.current = newSources;

    // Apply mute states
    for (const { name } of TRACKS) {
      newSources[name].gainNode.gain.setValueAtTime(
        mutedRef.current[name] ? 0 : 1,
        ctx.currentTime
      );
    }

    // Apply filter if enabled
    if (filterEnabledRef.current) {
      for (const { name } of TRACKS) {
        newSources[name].gainNode.disconnect();
        newSources[name].gainNode.connect(filter);
      }
      filter.connect(ctx.destination);
    }

    for (const { name } of TRACKS) {
      newSources[name].source.start(0);
    }
    setPlaying(true);
  }, [frequency]);

  const handlePlayStop = useCallback(() => {
    if (playing) stopPlayback();
    else startPlayback();
  }, [playing, stopPlayback, startPlayback]);

  const handleMuteToggle = useCallback((trackName: string) => {
    const ctx = ctxRef.current;
    setMuted(prev => {
      const newMuted = !prev[trackName];
      if (ctx && sourcesRef.current[trackName]) {
        sourcesRef.current[trackName].gainNode.gain.setValueAtTime(
          newMuted ? 0 : 1,
          ctx.currentTime
        );
      }
      return { ...prev, [trackName]: newMuted };
    });
  }, []);

  const handleFilterToggle = useCallback(() => {
    const ctx = ctxRef.current;
    setFilterEnabled(prev => {
      const newEnabled = !prev;
      if (ctx && Object.keys(sourcesRef.current).length > 0 && filterRef.current) {
        const filter = filterRef.current;
        for (const { name } of TRACKS) {
          sourcesRef.current[name].gainNode.disconnect();
        }
        try { filter.disconnect(); } catch { /* not connected */ }
        if (newEnabled) {
          for (const { name } of TRACKS) {
            sourcesRef.current[name].gainNode.connect(filter);
          }
          filter.connect(ctx.destination);
        } else {
          for (const { name } of TRACKS) {
            sourcesRef.current[name].gainNode.connect(ctx.destination);
          }
        }
      }
      return newEnabled;
    });
  }, []);

  const handleFrequencyChange = useCallback((value: number) => {
    setFrequency(value);
    if (filterRef.current) {
      filterRef.current.frequency.value = value;
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const keyMap = Object.fromEntries(TRACKS.map(t => [t.key, t.name]));
    const handleKeyDown = (e: KeyboardEvent) => {
      const trackName = keyMap[e.key];
      if (trackName) handleMuteToggle(trackName);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMuteToggle]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPlayback();
      ctxRef.current?.close();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!loaded) {
    return (
      <div className="flex flex-col items-center gap-10 py-16">
        <img
          src="/ctrl-loop/img/ctrl_loop.png"
          alt="ctrl_loop"
          className="w-64 invert"
        />
        <button
          onClick={handleStart}
          disabled={loading}
          className="px-8 py-4 text-xl border-4 border-white rounded-full text-white bg-transparent hover:text-gray-300 hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading…' : 'Start'}
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Logo */}
      <img
        src="/ctrl-loop/img/ctrl_loop.png"
        alt="ctrl_loop"
        className="w-64 invert mb-8"
      />

      {/* Controls row */}
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <button
          onClick={handlePlayStop}
          className="w-14 h-14 flex items-center justify-center hover:opacity-70 transition-opacity"
        >
          <img
            src={playing ? '/ctrl-loop/img/stop.png' : '/ctrl-loop/img/play.png'}
            alt={playing ? 'Stop' : 'Play'}
            className="w-full h-full invert"
          />
        </button>

        <span className="text-sm tracking-widest">FILTER:</span>
        <label className="relative inline-block w-[50px] h-[27px] cursor-pointer">
          <input
            type="checkbox"
            checked={filterEnabled}
            onChange={handleFilterToggle}
            className="opacity-0 absolute w-0 h-0"
          />
          <span className="absolute inset-0 rounded-full bg-white hover:bg-gray-300 transition-colors cursor-pointer">
            <span
              className={`absolute top-[3.5px] left-[4px] w-5 h-5 bg-black rounded-full transition-transform ${
                filterEnabled ? 'translate-x-[21px]' : 'translate-x-0'
              }`}
            />
          </span>
        </label>

        <span className="text-sm tracking-widest">FREQ:</span>
        <input
          type="range"
          min="0"
          max="7000"
          step="0.01"
          value={frequency}
          onChange={e => handleFrequencyChange(Number(e.target.value))}
          className="w-36 h-[27px] rounded-full bg-white outline-none cursor-pointer accent-black"
          style={{ WebkitAppearance: 'none' }}
        />
      </div>

      {/* Pads grid — 4×4 */}
      <div className="grid grid-cols-4 gap-3" style={{ width: '300px' }}>
        {TRACKS.map(({ name, key }) => (
          <button
            key={name}
            onClick={() => handleMuteToggle(name)}
            title={`${name} [${key}]`}
            className={`w-[60px] h-[60px] border-4 border-white transition-colors hover:opacity-80 ${
              muted[name] ? 'bg-black' : 'bg-white'
            }`}
          />
        ))}
      </div>

      <p className="text-gray-500 text-xs mt-4 font-mono">
        keyboard: 1-4, q r a-f z-v · white = playing · black = muted
      </p>
    </div>
  );
}
