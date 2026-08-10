import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

/**
 * HALFTONE AIR. The print texture over everything.
 * Place once per page and set the INSTANCE to Fixed position, full width
 * and height, in Framer's layout panel (components must not use fixed
 * positioning internally). On the canvas it renders as a small chip so it
 * never blocks editing.
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicWidth 160
 * @framerIntrinsicHeight 40
 */
export default function Halftone(props: { opacity: number; dot: number }) {
    const { opacity, dot } = props
    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    if (isCanvas) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#F4EEE2",
                    border: "1.5px dashed #1A1713",
                    color: "#1A1713",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase" as const,
                    fontFamily: "'Space Mono', monospace",
                }}
            >
                Halftone — live on publish
            </div>
        )
    }

    return (
        <div
            aria-hidden="true"
            style={{
                position: "absolute",
                inset: 0,
                zIndex: 300,
                pointerEvents: "none",
                opacity,
                backgroundImage: "radial-gradient(circle, #1A1713 1px, transparent 1px)",
                backgroundSize: `${dot}px ${dot}px`,
            }}
        />
    )
}

Halftone.defaultProps = { opacity: 0.05, dot: 5 }

addPropertyControls(Halftone, {
    opacity: { type: ControlType.Number, title: "Opacity", min: 0, max: 0.2, step: 0.005, defaultValue: 0.05 },
    dot: { type: ControlType.Number, title: "Dot grid", min: 3, max: 12, step: 1, defaultValue: 5 },
})
