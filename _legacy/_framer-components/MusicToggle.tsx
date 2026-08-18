import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

/**
 * MUSIC TOGGLE. A little vinyl on a sticker chip. Click plays the track,
 * the record spins, the label tells you what is on the platter. Click
 * again to stop. Never autoplays. If no track is set it wobbles and says
 * so instead.
 *
 * Set the Track control to a licensed or royalty-free audio file. Place
 * the instance where you want it and pin it (bottom left works well) with
 * Fixed position in Framer's layout panel.
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function MusicToggle({
    track = "",
    trackLabel = "on the platter",
    idleLabel = "off",
    volume = 0.6,
    loop = true,
}: {
    track?: string
    trackLabel?: string
    idleLabel?: string
    volume?: number
    loop?: boolean
}) {
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const audioRef = React.useRef<HTMLAudioElement | null>(null)
    const [playing, setPlaying] = React.useState(false)
    const [note, setNote] = React.useState<string | null>(null)
    const noteTimer = React.useRef<number | null>(null)

    React.useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
            if (noteTimer.current != null) window.clearTimeout(noteTimer.current)
        }
    }, [])

    React.useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume
    }, [volume])

    const flash = (msg: string) => {
        setNote(msg)
        if (noteTimer.current != null) window.clearTimeout(noteTimer.current)
        noteTimer.current = window.setTimeout(() => setNote(null), 1800)
    }

    const toggle = () => {
        if (isCanvas) return
        if (!track) {
            flash("no record on the platter")
            return
        }
        if (!audioRef.current) {
            const a = new Audio(track)
            a.loop = loop
            a.volume = volume
            audioRef.current = a
        }
        const a = audioRef.current
        if (playing) {
            a.pause()
            setPlaying(false)
        } else {
            const p = a.play()
            if (p && p.then) {
                p.then(() => setPlaying(true)).catch(() => flash("track would not play"))
            } else {
                setPlaying(true)
            }
        }
    }

    return (
        <button
            className={"smvinyl" + (playing ? " is-playing" : "") + (note ? " is-note" : "")}
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? "Stop music" : "Play music"}
            style={{ position: "relative" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
                .smvinyl { display: inline-flex; align-items: center; gap: 10px; padding: 8px 14px 8px 10px; border: 1.5px solid #1A1713; background: #F4EEE2; box-shadow: 4px 4px 0 #1A1713; transform: rotate(-2deg); cursor: pointer; font-family: 'Space Mono', monospace; color: #1A1713; transition: transform .15s ease, box-shadow .15s ease; }
                .smvinyl:hover { transform: rotate(-2deg) translate(2px, 2px); box-shadow: 2px 2px 0 #1A1713; }
                .smvinyl:focus-visible { outline: 2px solid #E8401B; outline-offset: 3px; }
                .smvinyl .disc { width: 34px; height: 34px; flex: none; }
                .smvinyl.is-playing .disc { animation: smvinyl-spin 1.8s linear infinite; }
                @keyframes smvinyl-spin { to { transform: rotate(360deg); } }
                @keyframes smvinyl-wobble { 0% { transform: rotate(-2deg); } 25% { transform: rotate(-5deg); } 50% { transform: rotate(1deg); } 75% { transform: rotate(-4deg); } 100% { transform: rotate(-2deg); } }
                .smvinyl.is-note { animation: smvinyl-wobble .4s ease 1; }
                .smvinyl .vlabel { display: grid; text-align: left; gap: 1px; }
                .smvinyl .vlabel b { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; font-weight: 700; }
                .smvinyl .vlabel i { font-style: normal; font-size: 9px; letter-spacing: .1em; text-transform: uppercase; color: rgba(26,23,19,.45); white-space: nowrap; }
                .smvinyl.is-playing .vlabel i { color: #E8401B; }
                @media (prefers-reduced-motion: reduce) {
                    .smvinyl.is-playing .disc { animation: none; }
                    .smvinyl { transition: none; }
                    .smvinyl.is-note { animation: none; }
                }
            `}</style>
            <svg className="disc" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <circle cx="20" cy="20" r="19" fill="#1A1713" />
                <circle cx="20" cy="20" r="15" stroke="rgba(244,238,226,.18)" strokeWidth="1" />
                <circle cx="20" cy="20" r="11" stroke="rgba(244,238,226,.18)" strokeWidth="1" />
                <circle cx="20" cy="20" r="6.5" fill="#E8401B" />
                <circle cx="20" cy="20" r="1.5" fill="#F4EEE2" />
            </svg>
            <span className="vlabel">
                <b>Sound</b>
                <i>{note ? note : playing ? trackLabel : idleLabel}</i>
            </span>
        </button>
    )
}

addPropertyControls(MusicToggle, {
    track: {
        type: ControlType.File,
        title: "Track",
        allowedFileTypes: ["mp3", "wav", "ogg", "m4a"],
    },
    trackLabel: { type: ControlType.String, title: "Playing label", defaultValue: "on the platter" },
    idleLabel: { type: ControlType.String, title: "Idle label", defaultValue: "off" },
    volume: { type: ControlType.Number, title: "Volume", min: 0, max: 1, step: 0.05, defaultValue: 0.6 },
    loop: { type: ControlType.Boolean, title: "Loop", defaultValue: true },
})
