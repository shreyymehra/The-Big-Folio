import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

/**
 * WORK INDEX. Six files as big list rows on the left; hovering or focusing
 * a row swaps the artwork in a sticky preview window on the right, with a
 * one-frame misprint jitter. Rows flood red on hover. On narrow screens
 * the preview sits above the stacked rows. A green crest stamps the
 * section head when it scrolls in.
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 */

type Row = {
    no: string
    title: string
    meta: string
    link: string
    file: string
    big: string
    cap: string
    tags: string
    year: string
    ink: "red" | "ink" | "green"
    real: boolean
}

const INKS: Record<string, string> = { red: "#E8401B", ink: "#1A1713", green: "#0E7B5B" }

export default function WorkIndex({
    sectionId = "work",
    tabLabel = "01 / Work",
    note = "Six files. Hover to peek.",
    rows = [
        { no: "01", title: "Brand World", meta: "Brand · Spec · 2026", link: "/brand-world", file: "01_BRAND_WORLD.CASE", big: "A world\nfrom nothing", cap: "Full brand universe for a made-up AI company", tags: "Brand · Creative Strategy · Spec", year: "2026", ink: "red" as const, real: false },
        { no: "02", title: "The Repositioning", meta: "Strategy · Spec · 2026", link: "/brand-world", file: "02_REPO.CASE", big: "Again,\nproperly", cap: "Real brand, public data. Spec, and it says so", tags: "Creative Strategy · Comms · Spec", year: "2026", ink: "ink" as const, real: false },
        { no: "03", title: "The Launch", meta: "PMM, GTM · Spec · 2026", link: "/brand-world", file: "03_LAUNCH.GTM", big: "Say this\nfirst", cap: "Positioning → message → launch", tags: "PMM · GTM · Spec", year: "2026", ink: "green" as const, real: false },
        { no: "04", title: "Cut The Noise", meta: "Comms · Spec · 2026", link: "/brand-world", file: "04_CUT_THE_NOISE.CASE", big: "Cut the\nnoise.", cap: "The category shouts. This one declines", tags: "Comms · Campaign · Spec", year: "2026", ink: "red" as const, real: false },
        { no: "05", title: "The Teardown", meta: "Commercial · Spec · 2026", link: "/brand-world", file: "05_TEARDOWN.TXT", big: "No design.\nJust thinking", cap: "One real acquisition engine, taken apart", tags: "Commercial · PMM · Spec", year: "2026", ink: "ink" as const, real: false },
        { no: "A", title: "VRL Identity", meta: "Identity · Shipped", link: "/brand-world", file: "A_VRL.SHIPPED", big: "VRL", cap: "Logo and identity for a family logistics company", tags: "Brand Identity · Real Client", year: "Shipped", ink: "green" as const, real: true },
    ],
}: {
    sectionId?: string
    tabLabel?: string
    note?: string
    rows?: Row[]
}) {
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const rootRef = React.useRef<HTMLElement>(null)
    const pvBodyRef = React.useRef<HTMLDivElement>(null)
    const [active, setActive] = React.useState(0)
    const swapTimer = React.useRef<number | null>(null)

    /* reveals + stamp */
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

    const pick = (i: number) => {
        if (i === active) return
        setActive(i)
        const body = pvBodyRef.current
        if (!body || isCanvas) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        body.classList.remove("is-swap")
        void body.offsetWidth
        body.classList.add("is-swap")
        if (swapTimer.current != null) window.clearTimeout(swapTimer.current)
        swapTimer.current = window.setTimeout(() => body.classList.remove("is-swap"), 300)
    }

    const d = rows[active] || rows[0]
    const bigLines = (d ? d.big : "").split("\n")

    return (
        <section
            ref={rootRef}
            id={sectionId}
            className={"smwi" + (isCanvas ? " is-static" : "")}
            aria-label="Selected work"
            style={{ width: "100%", position: "relative" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Grotesk:wght@400;500&family=Space+Mono:wght@400;700&display=swap');
                .smwi { background: #F4EEE2; color: #1A1713; font-family: 'Space Grotesk', sans-serif; -webkit-font-smoothing: antialiased; padding-top: clamp(84px, 12vh, 150px); scroll-margin-top: 96px; }
                .smwi ::selection { background: #E8401B; color: #F4EEE2; }
                .smwi a { color: inherit; text-decoration: none; }
                .smwi a:focus-visible { outline: 2px solid #E8401B; outline-offset: 3px; }
                .smwi .wrap { max-width: 1440px; margin: 0 auto; padding: 0 clamp(20px, 6vw, 96px); }
                .smwi .mono { font-family: 'Space Mono', monospace; font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; }
                .smwi .tab { display: inline-flex; align-items: center; gap: 10px; font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; border: 1.5px solid #1A1713; background: #F4EEE2; padding: 7px 14px; box-shadow: 3px 3px 0 #1A1713; }
                .smwi .tab .dot { width: 8px; height: 8px; border-radius: 50%; background: #E8401B; }
                .smwi .head { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: clamp(40px, 5.5vh, 68px); }
                .smwi .lead { display: flex; align-items: center; gap: 14px; }
                .smwi .note { color: rgba(26,23,19,.45); }
                .smwi .stampmini { width: 30px; height: 30px; color: #0E7B5B; opacity: 0; transform: scale(1.6) rotate(14deg); transition: transform .4s cubic-bezier(.34,1.4,.44,1), opacity .25s ease; }
                .smwi .stampmini.is-stamped { opacity: 1; transform: scale(1) rotate(-7deg); }
                .smwi.is-static .stampmini { opacity: 1; transform: scale(1) rotate(-7deg); }
                .smwi .index { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: clamp(24px, 3.5vw, 56px); align-items: start; }
                .smwi .rows { border-top: 1.5px solid #1A1713; }
                .smwi .row { position: relative; display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: baseline; gap: clamp(12px, 2vw, 24px); padding: clamp(16px, 2.6vh, 24px) 10px; border-bottom: 1.5px solid #1A1713; z-index: 0; transition: color .22s ease; }
                .smwi .row::before { content: ""; position: absolute; inset: 0; background: #E8401B; transform: scaleY(0); transform-origin: bottom; transition: transform .28s cubic-bezier(.22,1,.36,1); z-index: -1; }
                .smwi .row:hover::before, .smwi .row:focus-visible::before, .smwi .row.is-active::before { transform: scaleY(1); }
                .smwi .row:hover, .smwi .row:focus-visible, .smwi .row.is-active { color: #F4EEE2; }
                .smwi .no { font-family: 'Space Mono', monospace; font-weight: 700; font-size: 13px; }
                .smwi .ttl { font-family: Syne, sans-serif; font-weight: 800; text-transform: uppercase; font-size: clamp(22px, 2.8vw, 40px); line-height: 1.02; letter-spacing: -.01em; transition: transform .25s cubic-bezier(.22,1,.36,1); }
                .smwi .row:hover .ttl, .smwi .row.is-active .ttl { transform: translateX(8px); }
                .smwi .rmeta { font-family: 'Space Mono', monospace; font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; text-align: right; opacity: .75; }
                .smwi .go { position: absolute; right: 10px; bottom: 8px; font-family: 'Space Mono', monospace; font-size: 11px; opacity: 0; transform: translateX(-8px); transition: opacity .2s ease, transform .25s cubic-bezier(.22,1,.36,1); }
                .smwi .row:hover .go, .smwi .row.is-active .go { opacity: 1; transform: none; }
                .smwi .chipreal { font-family: 'Space Mono', monospace; font-size: 9.5px; letter-spacing: .14em; text-transform: uppercase; border: 1.5px solid currentColor; border-radius: 999px; padding: 3px 8px; margin-left: 10px; color: #0E7B5B; vertical-align: middle; display: inline-block; transform: rotate(-3deg); }
                .smwi .row:hover .chipreal, .smwi .row.is-active .chipreal { color: #F4EEE2; }
                .smwi .pv { position: sticky; top: 110px; border: 1.5px solid #1A1713; background: #F4EEE2; box-shadow: 8px 8px 0 #1A1713; }
                .smwi .pvbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 9px 12px; border-bottom: 1.5px solid #1A1713; font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: .06em; text-transform: uppercase; }
                .smwi .lights { display: flex; gap: 5px; }
                .smwi .lights i { width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid currentColor; }
                .smwi .pvbody { position: relative; aspect-ratio: 4 / 3.1; display: grid; place-items: center; overflow: hidden; container-type: inline-size; background: radial-gradient(circle at 30% 20%, rgba(26,23,19,.05) 1px, transparent 1px); background-size: 6px 6px; }
                @keyframes smwi-jit { 0% { transform: translate(0,0); opacity: .4; } 40% { transform: translate(-2px,1px); } 70% { transform: translate(2px,-1px); } 100% { transform: translate(0,0); opacity: 1; } }
                .smwi .pvbody.is-swap .pvart { animation: smwi-jit .24s steps(2) 1; }
                .smwi .pvart { text-align: center; padding: 8%; width: 100%; }
                .smwi .pvbig { font-family: Syne, sans-serif; font-weight: 800; font-size: clamp(20px, 9cqi, 52px); line-height: 1.02; text-transform: uppercase; letter-spacing: -.01em; margin: 0; }
                .smwi .pvcap { margin: 13px 0 0; font-family: 'Space Mono', monospace; font-size: 10.5px; letter-spacing: .18em; text-transform: uppercase; color: rgba(26,23,19,.45); }
                .smwi .pvfoot { border-top: 1.5px solid #1A1713; padding: 9px 12px; display: flex; justify-content: space-between; font-family: 'Space Mono', monospace; font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; color: rgba(26,23,19,.45); }
                .smwi [data-reveal] { opacity: 0; transform: translateY(22px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
                .smwi [data-reveal].is-in { opacity: 1; transform: none; }
                .smwi.is-static [data-reveal] { opacity: 1; transform: none; transition: none; }
                @media (max-width: 980px) { .smwi .index { grid-template-columns: 1fr; } .smwi .pv { position: relative; top: 0; order: -1; } }
                @media (max-width: 560px) { .smwi .row { grid-template-columns: auto minmax(0, 1fr); } .smwi .rmeta { display: none; } .smwi .head { flex-direction: column; align-items: flex-start; gap: 12px; } }
                @media (prefers-reduced-motion: reduce) {
                    .smwi [data-reveal] { transition: none; opacity: 1; transform: none; }
                    .smwi .row, .smwi .row::before, .smwi .ttl, .smwi .go { transition: none; }
                    .smwi .pvbody.is-swap .pvart { animation: none; }
                    .smwi .stampmini { transition: none; opacity: 1; transform: scale(1) rotate(-7deg); }
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

                <div className="index">
                    <div className="rows" data-reveal>
                        {rows.map((r, i) => (
                            <a
                                key={i}
                                className={"row" + (i === active ? " is-active" : "")}
                                href={r.link}
                                onMouseEnter={() => pick(i)}
                                onFocus={() => pick(i)}
                            >
                                <span className="no">{r.no}</span>
                                <span className="ttl">
                                    {r.title}
                                    {r.real && <span className="chipreal">Real ✓</span>}
                                </span>
                                <span className="rmeta">{r.meta}</span>
                                <span className="go">Open →</span>
                            </a>
                        ))}
                    </div>

                    <div className="pv" data-reveal aria-hidden="true">
                        <div className="pvbar">
                            <span className="lights"><i /><i /><i /></span>
                            <span>{d ? d.file : ""}</span>
                            <span>Preview</span>
                        </div>
                        <div className="pvbody" ref={pvBodyRef}>
                            <div className="pvart">
                                <p className="pvbig" style={{ color: d ? INKS[d.ink] || INKS.red : INKS.red }}>
                                    {bigLines.map((l, i) => (
                                        <React.Fragment key={i}>
                                            {i > 0 && <br />}
                                            {l}
                                        </React.Fragment>
                                    ))}
                                </p>
                                <p className="pvcap">{d ? d.cap : ""}</p>
                            </div>
                        </div>
                        <div className="pvfoot">
                            <span>{d ? d.tags : ""}</span>
                            <span>{d ? d.year : ""}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

addPropertyControls(WorkIndex, {
    sectionId: { type: ControlType.String, title: "Section id", defaultValue: "work" },
    tabLabel: { type: ControlType.String, title: "Tab", defaultValue: "01 / Work" },
    note: { type: ControlType.String, title: "Head note", defaultValue: "Six files. Hover to peek." },
    rows: {
        type: ControlType.Array,
        title: "Rows",
        maxCount: 8,
        control: {
            type: ControlType.Object,
            controls: {
                no: { type: ControlType.String, title: "Number", defaultValue: "01" },
                title: { type: ControlType.String, title: "Title", defaultValue: "" },
                meta: { type: ControlType.String, title: "Row meta", defaultValue: "" },
                link: { type: ControlType.String, title: "Link", defaultValue: "/brand-world" },
                file: { type: ControlType.String, title: "Window label", defaultValue: "" },
                big: { type: ControlType.String, title: "Preview line", displayTextArea: true, defaultValue: "" },
                cap: { type: ControlType.String, title: "Preview caption", defaultValue: "" },
                tags: { type: ControlType.String, title: "Preview tags", defaultValue: "" },
                year: { type: ControlType.String, title: "Year", defaultValue: "2026" },
                ink: { type: ControlType.Enum, title: "Ink", options: ["red", "ink", "green"], optionTitles: ["Red", "Ink", "Green"], defaultValue: "red" },
                real: { type: ControlType.Boolean, title: "Real ✓ chip", defaultValue: false },
            },
        },
    },
})
