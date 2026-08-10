import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

/**
 * ABOUT — marker-highlighted headline and plain-spoken body on the left,
 * honest segmented skill meters and a till-receipt record on the right.
 * No invented numbers anywhere; the meters are opinions, clearly drawn.
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 */

function useReveal(disabled: boolean) {
    const ref = React.useRef<HTMLElement>(null)
    React.useEffect(() => {
        if (disabled) return
        const root = ref.current
        if (!root) return
        const els = Array.from(root.querySelectorAll("[data-reveal]"))
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (reduced || !("IntersectionObserver" in window)) {
            els.forEach((el) => el.classList.add("is-in"))
            return
        }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-in")
                        io.unobserve(e.target)
                    }
                })
            },
            { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
        )
        els.forEach((el) => io.observe(el))
        return () => io.disconnect()
    }, [disabled])
    return ref
}

export default function AboutSection(props: {
    sectionId: string
    tabLabel: string
    headline: string
    headlineHighlight: string
    body1: string
    body2: string
    skills: { name: string; note: string; level: number }[]
    coda: string
    receiptLeft: string
    receiptRight: string
    record: { org: string; detail: string }[]
}) {
    const {
        sectionId, tabLabel, headline, headlineHighlight,
        body1, body2, skills, coda, receiptLeft, receiptRight, record,
    } = props
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const ref = useReveal(isCanvas)

    const hlIdx = headlineHighlight ? headline.indexOf(headlineHighlight) : -1
    const hBefore = hlIdx >= 0 ? headline.slice(0, hlIdx) : headline
    const hAfter = hlIdx >= 0 ? headline.slice(hlIdx + headlineHighlight.length) : ""

    return (
        <section
            ref={ref as any}
            id={sectionId}
            className={"smabout" + (isCanvas ? " is-static" : "")}
            aria-label="About"
            style={{ width: "100%", position: "relative" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Grotesk:wght@400;500&family=Space+Mono:wght@400;700&display=swap');
                .smabout { background: #F4EEE2; color: #1A1713; font-family: 'Space Grotesk', sans-serif; font-size: 17px; line-height: 1.65; -webkit-font-smoothing: antialiased; padding-top: clamp(100px, 15vh, 180px); scroll-margin-top: 92px; }
                .smabout ::selection { background: #E8401B; color: #F4EEE2; }
                .smabout .wrap { max-width: 1440px; margin: 0 auto; padding: 0 clamp(20px, 6vw, 96px); }
                .smabout .tab { display: inline-flex; align-items: center; gap: 10px; font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; border: 1.5px solid #1A1713; background: #F4EEE2; padding: 7px 14px; box-shadow: 3px 3px 0 #1A1713; }
                .smabout .tab .dot { width: 8px; height: 8px; border-radius: 50%; background: #E8401B; }
                .smabout .grid { display: grid; grid-template-columns: repeat(12, 1fr); column-gap: clamp(18px, 2.2vw, 30px); row-gap: 48px; margin-top: clamp(40px, 6vh, 72px); }
                .smabout .left { grid-column: 1 / span 7; }
                .smabout .right { grid-column: 9 / span 4; }
                .smabout h2 { font-family: Syne, sans-serif; font-weight: 800; font-size: clamp(30px, 3.9vw, 56px); line-height: 1.06; letter-spacing: -.01em; max-width: 20ch; margin: 0; }
                .smabout h2 .hl { box-shadow: inset 0 -.3em 0 rgba(240,169,183,.55); }
                .smabout .body { margin-top: clamp(24px, 4vh, 40px); }
                .smabout .body p { max-width: 58ch; color: rgba(25,23,19,.72); margin: 0; }
                .smabout .body p + p { margin-top: 1.3em; }
                .smabout .skills { display: grid; gap: 22px; }
                .smabout .skill { display: grid; gap: 8px; }
                .smabout .stop { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
                .smabout .sname { font-weight: 500; font-size: 15px; }
                .smabout .snote { font-family: 'Space Mono', monospace; font-size: 10.5px; letter-spacing: .06em; text-transform: uppercase; color: rgba(25,23,19,.45); transition: color .2s ease; }
                .smabout .skill:hover .snote { color: #E8401B; }
                .smabout .meter { display: flex; gap: 5px; }
                .smabout .meter i { flex: 1; height: 12px; border: 1.5px solid #1A1713; background: #F4EEE2; transition: background .3s ease; }
                .smabout .meter i.on { background: #1A1713; }
                .smabout .skill:hover .meter i.on { background: #E8401B; }
                .smabout .coda { margin: 6px 0 0; font-family: 'Space Mono', monospace; font-size: 11.5px; letter-spacing: .06em; text-transform: uppercase; color: rgba(25,23,19,.45); }
                .smabout .receipt { margin-top: clamp(36px, 5vh, 52px); border: 1.5px solid #1A1713; background: #F4EEE2; box-shadow: 5px 5px 0 #1A1713; }
                .smabout .rbar { padding: 8px 12px; border-bottom: 1.5px solid #1A1713; font-family: 'Space Mono', monospace; font-size: 10.5px; letter-spacing: .14em; text-transform: uppercase; display: flex; justify-content: space-between; }
                .smabout .receipt ul { list-style: none; margin: 0; padding: 0; }
                .smabout .receipt li { display: flex; justify-content: space-between; gap: 16px; padding: 12px; font-family: 'Space Mono', monospace; font-size: 12px; border-bottom: 1.5px dashed rgba(25,23,19,.45); transition: background .15s ease, padding-left .2s cubic-bezier(.22,1,.36,1); }
                .smabout .receipt li:last-child { border-bottom: 0; }
                .smabout .receipt li:hover { background: #EBE3D2; padding-left: 20px; }
                .smabout .receipt li b { font-weight: 700; }
                .smabout .receipt li span { color: rgba(25,23,19,.72); text-align: right; }
                .smabout [data-reveal] { opacity: 0; transform: translateY(22px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
                .smabout [data-reveal].is-in { opacity: 1; transform: none; }
                .smabout.is-static [data-reveal] { opacity: 1; transform: none; transition: none; }
                @media (max-width: 900px) { .smabout .left, .smabout .right { grid-column: 1 / -1; } .smabout .right { max-width: 520px; } }
                @media (max-width: 560px) { .smabout { font-size: 16px; } }
                @media (prefers-reduced-motion: reduce) { .smabout [data-reveal] { transition: none; opacity: 1; transform: none; } }
            `}</style>
            <div className="wrap">
                <span className="tab" data-reveal><span className="dot" />{tabLabel}</span>
                <div className="grid">
                    <div className="left">
                        <h2 data-reveal>
                            {hBefore}
                            {hlIdx >= 0 && <span className="hl">{headlineHighlight}</span>}
                            {hAfter}
                        </h2>
                        <div className="body">
                            <p data-reveal>{body1}</p>
                            <p data-reveal>{body2}</p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="skills" data-reveal>
                            {skills.map((s, i) => (
                                <div className="skill" key={i}>
                                    <div className="stop">
                                        <span className="sname">{s.name}</span>
                                        <span className="snote">{s.note}</span>
                                    </div>
                                    <div className="meter" aria-label={`${s.name}: ${s.level} of 5`}>
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <i key={n} className={n <= s.level ? "on" : ""} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <p className="coda">{coda}</p>
                        </div>
                        <div className="receipt" data-reveal>
                            <div className="rbar"><span>{receiptLeft}</span><span>{receiptRight}</span></div>
                            <ul>
                                {record.map((r, i) => (
                                    <li key={i}><b>{r.org}</b><span>{r.detail}</span></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

AboutSection.defaultProps = {
    sectionId: "about",
    tabLabel: "02 / About",
    headline: "If you appeal to everyone, you tie yourself to no one.",
    headlineHighlight: "you tie yourself to no one.",
    body1: "I'm based in Melbourne. Master of Management (Marketing) at the University of Melbourne, First Class Honours. Then three years at iSelect and Compare the Market, writing for everyone from the C-suite to the call centre. You learn fast what survives contact with a real organisation. Before that I wrote ad scripts for Tickertape, a fintech that had to make strangers care about markets.",
    body2: "My taste comes from fashion, music and design. My spine is commercial. Positioning, messaging, the brief behind the brief. The companies I'm most useful to are building things so new there's no culture to borrow from yet, and my job is to give them one.",
    skills: [
        { name: "Copy & creative strategy", note: "sharpest tool", level: 4 },
        { name: "Visual & art direction", note: "taste ahead of tooling", level: 3 },
        { name: "Canva · Notion · Jira · Office", note: "corporate fluent", level: 4 },
        { name: "Framer", note: "honest. improving", level: 2 },
    ],
    coda: "Rated honestly. The gaps are the plan.",
    receiptLeft: "The record",
    receiptRight: "No padding",
    record: [
        { org: "Uni of Melbourne", detail: "MMgmt (Marketing), First Class Hons" },
        { org: "iSelect / CTM", detail: "Marketing, two brands" },
        { org: "Tickertape", detail: "Ad scripts" },
        { org: "VRL", detail: "Identity, shipped" },
    ],
}

addPropertyControls(AboutSection, {
    sectionId: { type: ControlType.String, title: "Section id", defaultValue: "about" },
    tabLabel: { type: ControlType.String, title: "Tab", defaultValue: "02 / About" },
    headline: { type: ControlType.String, title: "Headline", displayTextArea: true, defaultValue: "If you appeal to everyone, you tie yourself to no one." },
    headlineHighlight: { type: ControlType.String, title: "Highlight phrase", defaultValue: "you tie yourself to no one." },
    body1: { type: ControlType.String, title: "Body ¶1", displayTextArea: true, defaultValue: "" },
    body2: { type: ControlType.String, title: "Body ¶2", displayTextArea: true, defaultValue: "" },
    skills: {
        type: ControlType.Array,
        title: "Skills",
        maxCount: 8,
        control: {
            type: ControlType.Object,
            controls: {
                name: { type: ControlType.String, defaultValue: "Skill" },
                note: { type: ControlType.String, defaultValue: "" },
                level: { type: ControlType.Number, min: 1, max: 5, step: 1, defaultValue: 3 },
            },
        },
    },
    coda: { type: ControlType.String, title: "Coda", defaultValue: "Rated honestly. The gaps are the plan." },
    receiptLeft: { type: ControlType.String, title: "Receipt label L", defaultValue: "The record" },
    receiptRight: { type: ControlType.String, title: "Receipt label R", defaultValue: "No padding" },
    record: {
        type: ControlType.Array,
        title: "Record rows",
        maxCount: 8,
        control: {
            type: ControlType.Object,
            controls: {
                org: { type: ControlType.String, defaultValue: "" },
                detail: { type: ControlType.String, defaultValue: "" },
            },
        },
    },
})
