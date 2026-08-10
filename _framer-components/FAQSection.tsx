import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

/**
 * FAQ. One question open at a time, plus icon rotates to a minus, open
 * item gets a red rule down its left edge. Written to build trust first
 * and curiosity second. Answers are plain text props.
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 */
export default function FAQSection({
    sectionId = "faq",
    tabLabel = "03 / FAQ",
    note = "Short answers, honest ones",
    items = [
        { q: "Is any of this work real?", a: "The thinking is real. The clients are not, except VRL, which shipped. Spec work says so in its first line, every time. And if a number is not real, it does not appear. That is the whole policy." },
        { q: "What do you actually do?", a: "Brand and creative strategy with a commercial spine. I find the idea, write the words, then build the case for why it moves a number. Three years at iSelect and Compare the Market taught me the corporate part. Taste handled the rest." },
        { q: "What are you looking for right now?", a: "A place to build a culture and take my curiosity for a drive. Full time preferred. If your team is making something new and needs it to mean something, we should talk." },
        { q: "Why hire a culture person for a tech company?", a: "Shipping is the easy half. Making strangers feel the thing was built for them is the hard half, and that is a culture problem. I make technical products feel necessary." },
        { q: "What is the round logo about?", a: "A personal seal. The M is a bridge, the S is the river under it. If you recognise the town that inspired it, we are already friends. Try holding the one in the footer." },
        { q: "How fast do you reply?", a: "Fast. The inbox is the only funnel on this site." },
    ],
}: {
    sectionId?: string
    tabLabel?: string
    note?: string
    items?: { q: string; a: string }[]
}) {
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const rootRef = React.useRef<HTMLElement>(null)
    const [open, setOpen] = React.useState<number>(isCanvas ? 0 : -1)

    React.useEffect(() => {
        if (isCanvas) return
        const root = rootRef.current
        if (!root) return
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const els = Array.from(root.querySelectorAll("[data-reveal]"))
        const stamp = root.querySelector(".stampmini")
        if (reduced || !("IntersectionObserver" in window)) {
            els.forEach((el) => el.classList.add("is-in"))
            if (stamp) stamp.classList.add("is-stamped")
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
        let stObs: IntersectionObserver | null = null
        if (stamp) {
            stObs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (e.isIntersecting && stObs) {
                            e.target.classList.add("is-stamped")
                            stObs.unobserve(e.target)
                        }
                    })
                },
                { threshold: 0.6 }
            )
            stObs.observe(stamp)
        }
        return () => {
            io.disconnect()
            if (stObs) stObs.disconnect()
        }
    }, [isCanvas])

    return (
        <section
            ref={rootRef}
            id={sectionId}
            className={"smfaq" + (isCanvas ? " is-static" : "")}
            aria-label="Questions"
            style={{ width: "100%", position: "relative" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Grotesk:wght@400;500&family=Space+Mono:wght@400;700&display=swap');
                .smfaq { background: #F4EEE2; color: #1A1713; font-family: 'Space Grotesk', sans-serif; font-size: 17px; line-height: 1.65; -webkit-font-smoothing: antialiased; padding-top: clamp(100px, 15vh, 180px); scroll-margin-top: 96px; }
                .smfaq ::selection { background: #E8401B; color: #F4EEE2; }
                .smfaq .wrap { max-width: 1440px; margin: 0 auto; padding: 0 clamp(20px, 6vw, 96px); }
                .smfaq .mono { font-family: 'Space Mono', monospace; font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; }
                .smfaq .tab { display: inline-flex; align-items: center; gap: 10px; font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; border: 1.5px solid #1A1713; background: #F4EEE2; padding: 7px 14px; box-shadow: 3px 3px 0 #1A1713; }
                .smfaq .tab .dot { width: 8px; height: 8px; border-radius: 50%; background: #E8401B; }
                .smfaq .head { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
                .smfaq .lead { display: flex; align-items: center; gap: 14px; }
                .smfaq .note { color: rgba(26,23,19,.45); }
                .smfaq .stampmini { width: 30px; height: 30px; color: #0E7B5B; opacity: 0; transform: scale(1.6) rotate(14deg); transition: transform .4s cubic-bezier(.34,1.4,.44,1), opacity .25s ease; }
                .smfaq .stampmini.is-stamped { opacity: 1; transform: scale(1) rotate(-7deg); }
                .smfaq.is-static .stampmini { opacity: 1; transform: scale(1) rotate(-7deg); }
                .smfaq .list { margin-top: clamp(36px, 5.5vh, 64px); border-top: 1.5px solid #1A1713; max-width: 880px; }
                .smfaq .item { border-bottom: 1.5px solid #1A1713; }
                .smfaq .q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: clamp(16px, 2.4vh, 22px) 6px; background: none; border: 0; cursor: pointer; font: inherit; color: inherit; text-align: left; transition: padding-left .2s cubic-bezier(.22,1,.36,1); }
                .smfaq .q:hover { padding-left: 14px; }
                .smfaq .q:focus-visible { outline: 2px solid #E8401B; outline-offset: -2px; }
                .smfaq .qno { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: .1em; color: rgba(26,23,19,.45); flex: none; }
                .smfaq .qtext { font-family: Syne, sans-serif; font-weight: 700; font-size: clamp(17px, 1.7vw, 23px); flex: 1; }
                .smfaq .x { position: relative; width: 16px; height: 16px; flex: none; }
                .smfaq .x::before, .smfaq .x::after { content: ""; position: absolute; background: #1A1713; transition: transform .3s cubic-bezier(.34,1.4,.44,1), background .2s ease; }
                .smfaq .x::before { left: 0; right: 0; top: 7px; height: 2px; }
                .smfaq .x::after { top: 0; bottom: 0; left: 7px; width: 2px; }
                .smfaq .item.open .x::after { transform: rotate(90deg) scaleY(.1); }
                .smfaq .item.open .x::before { background: #E8401B; }
                .smfaq .a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .4s cubic-bezier(.22,1,.36,1); }
                .smfaq .item.open .a { grid-template-rows: 1fr; }
                .smfaq .ainner { overflow: hidden; }
                .smfaq .a p { max-width: 60ch; color: rgba(26,23,19,.72); padding: 0 6px clamp(18px, 2.6vh, 24px) 6px; margin: 0; }
                .smfaq .item.open { box-shadow: inset 3px 0 0 #E8401B; }
                .smfaq .item.open .q { padding-left: 14px; }
                .smfaq [data-reveal] { opacity: 0; transform: translateY(22px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
                .smfaq [data-reveal].is-in { opacity: 1; transform: none; }
                .smfaq.is-static [data-reveal] { opacity: 1; transform: none; transition: none; }
                @media (max-width: 560px) { .smfaq { font-size: 16px; } .smfaq .head { flex-direction: column; align-items: flex-start; gap: 12px; } }
                @media (prefers-reduced-motion: reduce) {
                    .smfaq [data-reveal] { transition: none; opacity: 1; transform: none; }
                    .smfaq .a, .smfaq .x::before, .smfaq .x::after, .smfaq .q { transition: none; }
                    .smfaq .stampmini { transition: none; opacity: 1; transform: scale(1) rotate(-7deg); }
                }
            `}</style>
            <div className="wrap">
                <div className="head" data-reveal>
                    <span className="lead">
                        <span className="tab"><span className="dot" />{tabLabel}</span>
                        <svg className="stampmini" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                            <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="7" />
                            <circle cx="60" cy="21.5" r="4.5" fill="currentColor" />
                            <path d="M32 72 V52 Q32 35 46 35 Q60 35 60 52 V72 M60 52 Q60 35 74 35 Q88 35 88 52 V72" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M32 88 C40 80 52 80 60 88 C68 96 80 96 88 88" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" />
                        </svg>
                    </span>
                    <span className="mono note">{note}</span>
                </div>

                <div className="list" data-reveal>
                    {items.map((it, i) => (
                        <div className={"item" + (open === i ? " open" : "")} key={i}>
                            <button
                                className="q"
                                aria-expanded={open === i}
                                onClick={() => setOpen(open === i ? -1 : i)}
                            >
                                <span className="qno">Q.{String(i + 1).padStart(2, "0")}</span>
                                <span className="qtext">{it.q}</span>
                                <span className="x" aria-hidden="true" />
                            </button>
                            <div className="a">
                                <div className="ainner">
                                    <p>{it.a}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

addPropertyControls(FAQSection, {
    sectionId: { type: ControlType.String, title: "Section id", defaultValue: "faq" },
    tabLabel: { type: ControlType.String, title: "Tab", defaultValue: "03 / FAQ" },
    note: { type: ControlType.String, title: "Head note", defaultValue: "Short answers, honest ones" },
    items: {
        type: ControlType.Array,
        title: "Questions",
        maxCount: 10,
        control: {
            type: ControlType.Object,
            controls: {
                q: { type: ControlType.String, title: "Question", defaultValue: "" },
                a: { type: ControlType.String, title: "Answer", displayTextArea: true, defaultValue: "" },
            },
        },
    },
})
