import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

/**
 * SITE NAV — the taskbar. Crest + name left, live Melbourne clock and
 * bracket links right. Links grow [brackets] on hover; the active section
 * stays bracketed. Fixed at runtime, static bar on canvas.
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 68
 */
export default function SiteNav(props: {
    name: string
    homeLink: string
    showClock: boolean
    showProgress: boolean
    links: { label: string; link: string; spyId: string }[]
}) {
    const { name, homeLink, showClock, showProgress, links } = props
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [active, setActive] = React.useState<string | null>(null)
    const [time, setTime] = React.useState("--:--")
    const progressRef = React.useRef<HTMLDivElement>(null)

    /* scroll progress hairline riding the nav's bottom edge */
    React.useEffect(() => {
        if (isCanvas || !showProgress) return
        const el = progressRef.current
        if (!el) return
        let raf: number | null = null
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight
            const x = max > 0 ? window.scrollY / max : 0
            el.style.transform = "scaleX(" + Math.min(Math.max(x, 0), 1) + ")"
            raf = null
        }
        const onScroll = () => {
            if (raf == null) raf = requestAnimationFrame(update)
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        update()
        return () => {
            window.removeEventListener("scroll", onScroll)
            if (raf != null) cancelAnimationFrame(raf)
        }
    }, [isCanvas, showProgress])

    React.useEffect(() => {
        if (isCanvas || !("IntersectionObserver" in window)) return
        const ids = links.map((l) => l.spyId).filter(Boolean)
        const inBand: Record<string, boolean> = {}
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => (inBand[e.target.id] = e.isIntersecting))
                let cur: string | null = null
                ids.forEach((id) => { if (inBand[id]) cur = id })
                setActive(cur)
            },
            { rootMargin: "-40% 0px -55% 0px" }
        )
        ids.forEach((id) => {
            const el = document.getElementById(id)
            if (el) io.observe(el)
        })
        return () => io.disconnect()
    }, [isCanvas, links])

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

    return (
        <nav
            className="smnav"
            aria-label="Main"
            style={{ position: "relative", width: "100%", zIndex: 100 }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Grotesk:wght@400;500&family=Space+Mono:wght@400;700&display=swap');
                .smnav { height: 68px; background: #F4EEE2; border-bottom: 1.5px solid #1A1713; -webkit-font-smoothing: antialiased; }
                .smnav ::selection { background: #E8401B; color: #F4EEE2; }
                .smnav .wrap { height: 100%; max-width: 1440px; margin: 0 auto; padding: 0 clamp(20px, 6vw, 96px); display: flex; align-items: center; justify-content: space-between; gap: 16px; }
                .smnav .id { display: flex; align-items: center; gap: 12px; text-decoration: none; color: #1A1713; }
                .smnav .crest { width: 38px; height: 38px; transition: transform .35s cubic-bezier(.34,1.4,.44,1), color .2s ease; color: #1A1713; }
                .smnav .id:hover .crest { transform: rotate(-14deg); color: #E8401B; }
                .smnav .name { font-family: Syne, sans-serif; font-weight: 700; font-size: 17px; }
                .smnav .right { display: flex; align-items: center; gap: clamp(14px, 2.6vw, 30px); }
                .smnav .clock { font-family: 'Space Mono', monospace; font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; color: rgba(25,23,19,.45); display: none; }
                @media (min-width: 720px) { .smnav .clock { display: inline; } }
                .smnav .blink { font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: #1A1713; text-decoration: none; padding: 0 2px; transition: color .2s ease; }
                .smnav .blink::before { content: "["; opacity: 0; margin-right: 1px; transition: opacity .15s ease; }
                .smnav .blink::after { content: "]"; opacity: 0; margin-left: 1px; transition: opacity .15s ease; }
                .smnav .blink:hover, .smnav .blink:focus-visible, .smnav .blink.is-active { color: #E8401B; }
                .smnav .blink:hover::before, .smnav .blink:hover::after,
                .smnav .blink:focus-visible::before, .smnav .blink:focus-visible::after,
                .smnav .blink.is-active::before, .smnav .blink.is-active::after { opacity: 1; }
                .smnav a:focus-visible { outline: 2px solid #E8401B; outline-offset: 3px; }
                @media (max-width: 560px) { .smnav { height: 60px; } .smnav .name { display: none; } }
                .smnav .prog { position: absolute; left: 0; right: 0; bottom: -2px; height: 2px; background: #E8401B; transform: scaleX(0); transform-origin: left; }
                @media (prefers-reduced-motion: reduce) { .smnav .crest, .smnav .blink { transition: none; } }
            `}</style>
            <div className="wrap">
                <a className="id" href={homeLink}>
                    <svg className="crest" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                        <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="7" />
                        <circle cx="60" cy="21.5" r="4.5" fill="currentColor" />
                        <path d="M32 72 V52 Q32 35 46 35 Q60 35 60 52 V72 M60 52 Q60 35 74 35 Q88 35 88 52 V72" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M32 88 C40 80 52 80 60 88 C68 96 80 96 88 88" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" />
                    </svg>
                    <span className="name">{name}</span>
                </a>
                <div className="right">
                    {showClock && (
                        <span className="clock">MEL {isCanvas ? "10:00" : time}</span>
                    )}
                    {links.map((l, i) => (
                        <a key={i} href={l.link} className={"blink" + (active === l.spyId ? " is-active" : "")}>
                            {l.label}
                        </a>
                    ))}
                </div>
            </div>
            {showProgress && <div ref={progressRef} className="prog" aria-hidden="true" />}
        </nav>
    )
}

SiteNav.defaultProps = {
    name: "Shrey Mehra",
    homeLink: "#top",
    showClock: true,
    showProgress: true,
    links: [
        { label: "Work", link: "#work", spyId: "work" },
        { label: "About", link: "#about", spyId: "about" },
        { label: "FAQ", link: "#faq", spyId: "faq" },
        { label: "Contact", link: "#contact", spyId: "contact" },
    ],
}

addPropertyControls(SiteNav, {
    name: { type: ControlType.String, title: "Name", defaultValue: "Shrey Mehra" },
    homeLink: { type: ControlType.String, title: "Home link", defaultValue: "#top" },
    showClock: { type: ControlType.Boolean, title: "Melbourne clock", defaultValue: true },
    showProgress: { type: ControlType.Boolean, title: "Scroll progress", defaultValue: true },
    links: {
        type: ControlType.Array,
        title: "Links",
        maxCount: 5,
        control: {
            type: ControlType.Object,
            controls: {
                label: { type: ControlType.String, defaultValue: "Work" },
                link: { type: ControlType.String, defaultValue: "#work" },
                spyId: { type: ControlType.String, title: "Section id", defaultValue: "work" },
            },
        },
        defaultValue: [
            { label: "Work", link: "#work", spyId: "work" },
            { label: "About", link: "#about", spyId: "about" },
            { label: "FAQ", link: "#faq", spyId: "faq" },
            { label: "Contact", link: "#contact", spyId: "contact" },
        ],
    },
})
