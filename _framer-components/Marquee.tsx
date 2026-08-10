import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

/**
 * MARQUEE — the cobalt ticker strip. Scrolls forever, pauses on hover,
 * stands still under reduced motion (and on canvas).
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 */
export default function Marquee(props: { items: string; speed: number }) {
    const { items, speed } = props
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const words = items.split(",").map((w) => w.trim()).filter(Boolean)

    const seq = (key: string) => (
        <React.Fragment key={key}>
            {words.map((w, i) => (
                <React.Fragment key={i}>
                    <span>{w}</span>
                    <span>✱</span>
                </React.Fragment>
            ))}
        </React.Fragment>
    )

    return (
        <div className={"smmq" + (isCanvas ? " is-static" : "")} aria-hidden="true" style={{ width: "100%", position: "relative" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&display=swap');
                .smmq { border-top: 1.5px solid #1A1713; border-bottom: 1.5px solid #1A1713; overflow: hidden; background: #E8401B; color: #F4EEE2; padding: 12px 0; }
                .smmq .track { display: flex; gap: 48px; width: max-content; animation: smmq-roll var(--dur, 22s) linear infinite; }
                .smmq:hover .track { animation-play-state: paused; }
                .smmq.is-static .track { animation: none; }
                .smmq span { font-family: Syne, sans-serif; font-weight: 700; font-size: 15px; letter-spacing: .14em; text-transform: uppercase; white-space: nowrap; }
                @keyframes smmq-roll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                @media (prefers-reduced-motion: reduce) { .smmq .track { animation: none; } }
            `}</style>
            <div className="track" style={{ "--dur": `${speed}s` } as React.CSSProperties}>
                {seq("a")}
                {seq("b")}
            </div>
        </div>
    )
}

Marquee.defaultProps = {
    items: "Selected work, Spec disclosed always, One shipped project, No invented numbers",
    speed: 22,
}

addPropertyControls(Marquee, {
    items: {
        type: ControlType.String,
        title: "Items (comma-sep)",
        displayTextArea: true,
        defaultValue: "Selected work, Spec disclosed always, One shipped project, No invented numbers",
    },
    speed: { type: ControlType.Number, title: "Loop secs", min: 8, max: 60, step: 1, defaultValue: 22 },
})
