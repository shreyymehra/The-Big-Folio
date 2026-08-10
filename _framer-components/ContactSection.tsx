import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

/**
 * CONTACT + FOOTER — one line, one big press-button email, no funnel.
 * Below it: the SM crest with the site's one JoJo Easter egg (hold your
 * cursor on it and a quiet aura appears), then the mono status bar.
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

export default function ContactSection(props: {
    sectionId: string
    tabLabel: string
    headline: string
    sub: string
    email: string
    socialLabel: string
    socialUrl: string
    sideNote: string
    easterEgg: boolean
    statusItems: { label: string }[]
    showClock: boolean
}) {
    const {
        sectionId, tabLabel, headline, sub, email,
        socialLabel, socialUrl, sideNote, easterEgg, statusItems, showClock,
    } = props
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const ref = useReveal(isCanvas)
    const [time, setTime] = React.useState("--:--")

    React.useEffect(() => {
        if (isCanvas || !showClock) return
        const tick = () => {
            try {
                setTime(
                    new Date().toLocaleTimeString("en-AU", {
                        timeZone: "Australia/Melbourne",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })
                )
            } catch (e) {
                setTime("")
            }
        }
        tick()
        const t = setInterval(tick, 30000)
        return () => clearInterval(t)
    }, [isCanvas, showClock])

    const auraSpans = [
        { style: { top: -6, left: "4%" }, r: "-14deg", d: ".05s" },
        { style: { top: "22%", right: "-4%" }, r: "10deg", d: ".12s" },
        { style: { top: "58%", left: "-8%" }, r: "-6deg", d: ".2s" },
        { style: { bottom: "2%", right: "6%" }, r: "16deg", d: ".28s" },
        { style: { top: -14, right: "26%" }, r: "6deg", d: ".36s" },
        { style: { bottom: -8, left: "24%" }, r: "-12deg", d: ".44s" },
    ]

    return (
        <section
            ref={ref as any}
            id={sectionId}
            className={"smct" + (isCanvas ? " is-static" : "")}
            aria-label="Contact"
            style={{ width: "100%", position: "relative" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Grotesk:wght@400;500&family=Space+Mono:wght@400;700&display=swap');
                .smct { background: #F4EEE2; color: #1A1713; font-family: 'Space Grotesk', sans-serif; font-size: 17px; line-height: 1.65; -webkit-font-smoothing: antialiased; padding-top: clamp(100px, 15vh, 180px); scroll-margin-top: 92px; }
                .smct ::selection { background: #E8401B; color: #F4EEE2; }
                .smct a { color: inherit; text-decoration: none; }
                .smct a:focus-visible { outline: 2px solid #E8401B; outline-offset: 3px; }
                .smct .wrap { max-width: 1440px; margin: 0 auto; padding: 0 clamp(20px, 6vw, 96px); }
                .smct .tab { display: inline-flex; align-items: center; gap: 10px; font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; border: 1.5px solid #1A1713; background: #F4EEE2; padding: 7px 14px; box-shadow: 3px 3px 0 #1A1713; }
                .smct .tab .dot { width: 8px; height: 8px; border-radius: 50%; background: #E8401B; }
                .smct h2 { font-family: Syne, sans-serif; font-weight: 800; font-size: clamp(34px, 5vw, 72px); line-height: 1.02; letter-spacing: -.01em; max-width: 15ch; margin: clamp(28px, 4.5vh, 48px) 0 0; }
                .smct .sub { margin-top: 18px; max-width: 44ch; color: rgba(25,23,19,.72); }
                .smct .email { display: inline-block; margin-top: clamp(32px, 5.5vh, 52px); font-family: 'Space Mono', monospace; font-weight: 700; font-size: clamp(16px, 2.4vw, 30px); letter-spacing: .02em; padding: clamp(14px, 2vh, 22px) clamp(18px, 3vw, 36px); border: 1.5px solid #1A1713; background: #F4EEE2; box-shadow: 4px 4px 0 #1A1713; transition: transform .15s ease, box-shadow .15s ease, background .2s ease, color .2s ease; }
                .smct .email:hover, .smct .email:focus-visible { transform: translate(2px,2px); box-shadow: 2px 2px 0 #1A1713; background: #E8401B; color: #F4EEE2; }
                .smct .email:active { transform: translate(4px,4px); box-shadow: 0 0 0 #1A1713; }
                .smct .links { margin-top: 26px; display: flex; gap: 22px; align-items: baseline; }
                .smct .blink { font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; padding: 0 2px; transition: color .2s ease; }
                .smct .blink::before { content: "["; opacity: 0; margin-right: 1px; transition: opacity .15s ease; }
                .smct .blink::after { content: "]"; opacity: 0; margin-left: 1px; transition: opacity .15s ease; }
                .smct .blink:hover { color: #E8401B; }
                .smct .blink:hover::before, .smct .blink:hover::after { opacity: 1; }
                .smct .sidenote { font-family: 'Space Mono', monospace; font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; color: rgba(25,23,19,.45); }
                .smct .crest { margin: clamp(72px, 11vh, 120px) auto 0; width: clamp(120px, 13vw, 170px); position: relative; display: block; color: #1A1713; }
                .smct .crest svg.mark { width: 100%; height: auto; display: block; transition: transform .5s cubic-bezier(.34,1.4,.44,1), color .3s ease; }
                .smct .crest:hover svg.mark { transform: rotate(-8deg); color: #0E7B5B; }
                .smct .aura { position: absolute; inset: -46px; pointer-events: none; }
                .smct .aura span { position: absolute; font-family: 'Space Mono', monospace; font-weight: 700; font-size: 20px; color: #0E7B5B; opacity: 0; transform: translateY(8px) rotate(var(--r, 0deg)); transition: opacity .5s ease var(--d, 0s), transform .5s cubic-bezier(.22,1,.36,1) var(--d, 0s); }
                .smct .crest:hover .aura span { opacity: .5; transform: translateY(0) rotate(var(--r, 0deg)); }
                .smct .auracap { position: absolute; left: 50%; bottom: -30px; transform: translateX(-50%); white-space: nowrap; font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: rgba(25,23,19,.45); opacity: 0; transition: opacity .4s ease .35s; }
                .smct .crest:hover .auracap { opacity: 1; }
                .smct .statusbar { margin-top: clamp(56px, 9vh, 96px); border-top: 1.5px solid #1A1713; }
                .smct .statusbar .wrap { display: flex; justify-content: space-between; gap: 10px 24px; flex-wrap: wrap; padding-top: 14px; padding-bottom: 18px; }
                .smct .statusbar span { font-family: 'Space Mono', monospace; font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; color: rgba(25,23,19,.45); }
                .smct [data-reveal] { opacity: 0; transform: translateY(22px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
                .smct [data-reveal].is-in { opacity: 1; transform: none; }
                .smct.is-static [data-reveal] { opacity: 1; transform: none; transition: none; }
                @media (max-width: 560px) { .smct { font-size: 16px; } }
                @media (prefers-reduced-motion: reduce) {
                    .smct [data-reveal] { transition: none; opacity: 1; transform: none; }
                    .smct .email, .smct .crest svg.mark, .smct .aura span { transition: none; }
                }
            `}</style>
            <div className="wrap">
                <span className="tab" data-reveal><span className="dot" />{tabLabel}</span>
                <h2 data-reveal>{headline}</h2>
                <p className="sub" data-reveal>{sub}</p>
                <div data-reveal>
                    <a className="email" href={`mailto:${email}`}>{email}</a>
                </div>
                <div className="links" data-reveal>
                    <a className="blink" href={socialUrl} target="_blank" rel="noopener">{socialLabel}</a>
                    <span className="sidenote">{sideNote}</span>
                </div>

                <a className="crest" href="#top" aria-label="SM crest, back to top">
                    {easterEgg && (
                        <span className="aura" aria-hidden="true">
                            {auraSpans.map((a, i) => (
                                <span key={i} style={{ ...a.style, "--r": a.r, "--d": a.d } as React.CSSProperties}>ゴ</span>
                            ))}
                        </span>
                    )}
                    <svg className="mark" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                        <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="7" />
                        <circle cx="60" cy="21.5" r="4.5" fill="currentColor" />
                        <path d="M32 72 V52 Q32 35 46 35 Q60 35 60 52 V72 M60 52 Q60 35 74 35 Q88 35 88 52 V72" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M32 88 C40 80 52 80 60 88 C68 96 80 96 88 88" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" />
                    </svg>
                    {easterEgg && <span className="auracap" aria-hidden="true">quiet aura</span>}
                </a>
            </div>

            <footer className="statusbar">
                <div className="wrap">
                    {statusItems.map((s, i) => (
                        <span key={i}>{s.label}</span>
                    ))}
                    {showClock && <span>Melbourne {isCanvas ? "10:00" : time}</span>}
                </div>
            </footer>
        </section>
    )
}

ContactSection.defaultProps = {
    sectionId: "contact",
    tabLabel: "04 / Contact",
    headline: "Building something people should belong to?",
    sub: "No form, no calendar link. Just the address.",
    email: "shreyymehraa@gmail.com",
    socialLabel: "LinkedIn ↗",
    socialUrl: "https://www.linkedin.com/in/shreymehraa",
    sideNote: "Melbourne · AEST",
    easterEgg: true,
    statusItems: [
        { label: "SM / Portfolio v3.0" },
        { label: "Set in Syne + Space Grotesk + Space Mono" },
        { label: "No cookies. No tracking." },
    ],
    showClock: true,
}

addPropertyControls(ContactSection, {
    sectionId: { type: ControlType.String, title: "Section id", defaultValue: "contact" },
    tabLabel: { type: ControlType.String, title: "Tab", defaultValue: "04 / Contact" },
    headline: { type: ControlType.String, title: "Headline", displayTextArea: true, defaultValue: "Building something people should belong to?" },
    sub: { type: ControlType.String, title: "Sub-line", displayTextArea: true, defaultValue: "" },
    email: { type: ControlType.String, title: "Email", defaultValue: "shreyymehraa@gmail.com" },
    socialLabel: { type: ControlType.String, title: "Social label", defaultValue: "LinkedIn ↗" },
    socialUrl: { type: ControlType.String, title: "Social URL", defaultValue: "https://www.linkedin.com/in/shreymehraa" },
    sideNote: { type: ControlType.String, title: "Side note", defaultValue: "Melbourne · AEST" },
    easterEgg: { type: ControlType.Boolean, title: "Quiet aura egg", defaultValue: true },
    statusItems: {
        type: ControlType.Array,
        title: "Status bar",
        maxCount: 5,
        control: {
            type: ControlType.Object,
            controls: { label: { type: ControlType.String, defaultValue: "" } },
        },
    },
    showClock: { type: ControlType.Boolean, title: "Clock item", defaultValue: true },
})
