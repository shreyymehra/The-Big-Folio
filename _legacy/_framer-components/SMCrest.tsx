import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * SM CREST — the mark. A town seal for a one-person city:
 * M as twin arches (the bridge), S as the river under it, sun above,
 * ringed like a municipal stamp. Inspired by the civic-badge grammar
 * of Morioh's street signs; drawn from scratch.
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicWidth 120
 * @framerIntrinsicHeight 120
 */

const INKS: Record<string, string> = {
    ink: "#1A1713",
    green: "#0E7B5B",
    cobalt: "#2B3BE2",
    tangerine: "#E8401B",
    paper: "#F4EEE2",
}

export default function SMCrest(props: {
    variant: "line" | "stamp"
    color: string
    spinOnHover: boolean
}) {
    const { variant, color, spinOnHover } = props
    const ink = INKS[color] || INKS.ink

    const line = (
        <svg viewBox="0 0 120 120" fill="none" style={{ width: "100%", height: "100%", display: "block" }}>
            <circle cx="60" cy="60" r="52" stroke={ink} strokeWidth="7" />
            <circle cx="60" cy="21.5" r="4.5" fill={ink} />
            <path
                d="M32 72 V52 Q32 35 46 35 Q60 35 60 52 V72 M60 52 Q60 35 74 35 Q88 35 88 52 V72"
                stroke={ink} strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round"
            />
            <path d="M32 88 C40 80 52 80 60 88 C68 96 80 96 88 88" stroke={ink} strokeWidth="8.5" strokeLinecap="round" />
        </svg>
    )

    const stamp = (
        <svg viewBox="0 0 120 120" fill="none" style={{ width: "100%", height: "100%", display: "block" }}>
            <circle cx="60" cy="60" r="58" fill={ink} />
            <circle cx="60" cy="60" r="50" stroke={INKS.paper} strokeWidth="3" />
            <circle cx="60" cy="23" r="4" fill={INKS.paper} />
            <path
                d="M34 71 V53 Q34 37 47 37 Q60 37 60 53 V71 M60 53 Q60 37 73 37 Q86 37 86 53 V71"
                stroke={INKS.paper} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
            />
            <path d="M34 86 C42 78.5 52 78.5 60 86 C68 93.5 78 93.5 86 86" stroke={INKS.paper} strokeWidth="8" strokeLinecap="round" />
        </svg>
    )

    return (
        <div className="smcrest" style={{ width: "100%", height: "100%" }}>
            <style>{`
                .smcrest > svg, .smcrest > div { transition: transform .45s cubic-bezier(.34,1.4,.44,1); }
                ${spinOnHover ? ".smcrest:hover > svg, .smcrest:hover > div { transform: rotate(-10deg); }" : ""}
                @media (prefers-reduced-motion: reduce) { .smcrest > svg, .smcrest > div { transition: none; } }
            `}</style>
            {variant === "stamp" ? stamp : line}
        </div>
    )
}

SMCrest.defaultProps = { variant: "line", color: "ink", spinOnHover: true }

addPropertyControls(SMCrest, {
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["line", "stamp"],
        optionTitles: ["Line", "Stamp"],
        defaultValue: "line",
    },
    color: {
        type: ControlType.Enum,
        title: "Ink",
        options: ["ink", "green", "cobalt", "tangerine", "paper"],
        optionTitles: ["Ink", "Morioh green", "Cobalt", "Race red", "Paper"],
        defaultValue: "ink",
    },
    spinOnHover: { type: ControlType.Boolean, title: "Spin on hover", defaultValue: true },
})
