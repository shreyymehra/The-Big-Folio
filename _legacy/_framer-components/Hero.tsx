import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

/**
 * HERO v3. Big red name on the left, the ID card on the right.
 * The card tilts in 3D with the cursor, a chrome sheen slides across it,
 * and it flips on click or Enter to show the reverse side. A soft aura
 * gradient trails the cursor behind everything. All of it stands still
 * under prefers-reduced-motion, and the aura loop stops repainting the
 * moment it settles.
 *
 * Set the Photo control (or leave it empty for the marked placeholder).
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 */
export default function Hero(props: {
    sectionId: string
    kicker: string
    nameLine1: string
    nameLine2: string
    tagline: string
    taglineHighlight: string
    scrollLabel: string
    photo?: { src?: string }
    cardId: string
    cardType: string
    cardIssued: string
    cardBase: string
    backRows: { label: string; value: string }[]
    showAura: boolean
}) {
    const {
        sectionId, kicker, nameLine1, nameLine2, tagline, taglineHighlight,
        scrollLabel, photo, cardId, cardType, cardIssued, cardBase, backRows, showAura,
    } = props
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const heroRef = React.useRef<HTMLElement>(null)
    const auraRef = React.useRef<HTMLDivElement>(null)
    const cardRef = React.useRef<HTMLDivElement>(null)
    const [flipped, setFlipped] = React.useState(false)
    const [flipping, setFlipping] = React.useState(false)

    /* aura: trails the cursor, then settles and stops repainting */
    React.useEffect(() => {
        if (isCanvas || !showAura) return
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const fine = window.matchMedia("(pointer: fine)").matches
        const hero = heroRef.current
        const aura = auraRef.current
        if (reduced || !fine || !hero || !aura) return
        let ax = 0, ay = 0, tx = 0, ty = 0
        let raf: number | null = null
        const tick = () => {
            const dx = tx - ax
            const dy = ty - ay
            if (Math.abs(dx) + Math.abs(dy) < 0.6) {
                ax = tx; ay = ty
                raf = null
            } else {
                ax += dx * 0.09
                ay += dy * 0.09
                raf = requestAnimationFrame(tick)
            }
            aura.style.setProperty("--ax", ax.toFixed(1) + "px")
            aura.style.setProperty("--ay", ay.toFixed(1) + "px")
        }
        const move = (ev: PointerEvent) => {
            const r = hero.getBoundingClientRect()
            tx = ev.clientX - r.left
            ty = ev.clientY - r.top
            if (!hero.classList.contains("is-awake")) {
                ax = tx; ay = ty
                hero.classList.add("is-awake")
            }
            if (raf == null) raf = requestAnimationFrame(tick)
        }
        const leave = () => {
            hero.classList.remove("is-awake")
            if (raf != null) {
                cancelAnimationFrame(raf)
                raf = null
            }
        }
        hero.addEventListener("pointermove", move)
        hero.addEventListener("pointerleave", leave)
        return () => {
            hero.removeEventListener("pointermove", move)
            hero.removeEventListener("pointerleave", leave)
            if (raf != null) cancelAnimationFrame(raf)
        }
    }, [isCanvas, showAura])

    /* card tilt */
    React.useEffect(() => {
        if (isCanvas) return
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const fine = window.matchMedia("(pointer: fine)").matches
        const card = cardRef.current
        if (reduced || !fine || !card) return
        const zone = card.parentElement
        if (!zone) return
        const move = (ev: PointerEvent) => {
            const r = card.getBoundingClientRect()
            const x = (ev.clientX - r.left) / r.width - 0.5
            const y = (ev.clientY - r.top) / r.height - 0.5
            card.style.setProperty("--rx", (-y * 10).toFixed(2))
            card.style.setProperty("--ry", (x * 13).toFixed(2))
        }
        const leave = () => {
            card.style.setProperty("--rx", "0")
            card.style.setProperty("--ry", "0")
        }
        zone.addEventListener("pointermove", move)
        zone.addEventListener("pointerleave", leave)
        return () => {
            zone.removeEventListener("pointermove", move)
            zone.removeEventListener("pointerleave", leave)
        }
    }, [isCanvas])

    const flip = () => {
        setFlipping(true)
        setFlipped((f) => !f)
        setTimeout(() => setFlipping(false), 650)
    }

    const hlIdx = taglineHighlight ? tagline.indexOf(taglineHighlight) : -1
    const tagBefore = hlIdx >= 0 ? tagline.slice(0, hlIdx) : tagline
    const tagAfter = hlIdx >= 0 ? tagline.slice(hlIdx + taglineHighlight.length) : ""
    const photoSrc = photo && photo.src

    const crestTiny = (
        <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" style={{ width: 20, height: 20 }}>
            <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="9" />
            <path d="M32 72 V52 Q32 35 46 35 Q60 35 60 52 V72 M60 52 Q60 35 74 35 Q88 35 88 52 V72" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M32 88 C40 80 52 80 60 88 C68 96 80 96 88 88" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
        </svg>
    )

    return (
        <header
            ref={heroRef}
            id={sectionId}
            className={"smh3" + (isCanvas ? " is-static is-awake" : "")}
            style={{ width: "100%" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Grotesk:wght@400;500&family=Space+Mono:wght@400;700&display=swap');
                .smh3 { position: relative; min-height: 100svh; display: flex; align-items: center; overflow: hidden; background: #F4EEE2; color: #1A1713; border-bottom: 1.5px solid #1A1713; font-family: 'Space Grotesk', sans-serif; -webkit-font-smoothing: antialiased; }
                .smh3 ::selection { background: #E8401B; color: #F4EEE2; }
                .smh3 .wrap { position: relative; z-index: 1; width: 100%; max-width: 1440px; margin: 0 auto; padding: 84px clamp(20px, 6vw, 96px) 48px; display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: clamp(28px, 4vw, 56px); align-items: center; }
                .smh3 .aura { position: absolute; top: 0; left: 0; width: 520px; height: 520px; border-radius: 50%; background: radial-gradient(circle, rgba(255,138,76,.5), rgba(240,169,183,.35) 45%, transparent 70%); filter: blur(46px); transform: translate3d(var(--ax, 0px), var(--ay, 0px), 0) translate(-50%, -50%); pointer-events: none; z-index: 0; opacity: 0; transition: opacity .8s ease; display: none; }
                .smh3.is-awake .aura { opacity: 1; display: block; }
                .smh3.is-static .aura { display: none; }
                .smh3 .mono { font-family: 'Space Mono', monospace; font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; }
                .smh3 .kicker { color: rgba(26,23,19,.72); margin: 0 0 clamp(18px, 3vh, 32px); }
                .smh3 h1 { font-family: Syne, sans-serif; font-weight: 800; font-size: clamp(44px, 9.2vw, 138px); line-height: .94; letter-spacing: -.02em; text-transform: uppercase; color: #E8401B; margin: 0; }
                .smh3 h1 .line { display: block; }
                .smh3 h1 .line + .line { margin-left: clamp(16px, 3.5vw, 72px); }
                .smh3 .tag { margin: clamp(24px, 4.5vh, 44px) 0 0; font-size: clamp(18px, 1.8vw, 25px); font-weight: 500; max-width: 26ch; line-height: 1.35; }
                .smh3 .tag em { font-style: normal; box-shadow: inset 0 -.34em 0 rgba(240,169,183,.55); }
                .smh3 .foot { margin-top: clamp(32px, 6vh, 64px); }
                .smh3 .scroll { color: rgba(26,23,19,.45); }
                .smh3 .zone { position: relative; z-index: 1; display: flex; justify-content: center; perspective: 1400px; }
                .smh3 .card { position: relative; width: clamp(300px, 30vw, 420px); aspect-ratio: 856 / 540; transform-style: preserve-3d; transform: rotate(3deg) rotateX(calc(var(--rx, 0) * 1deg)) rotateY(calc(var(--ry, 0) * 1deg + var(--flip, 0deg))); transition: transform .18s ease-out; cursor: pointer; }
                .smh3 .card.is-flipping { transition: transform .6s cubic-bezier(.34,1.4,.44,1); }
                .smh3 .card.is-flipped { --flip: 180deg; }
                .smh3 .face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border: 1.5px solid #1A1713; background: #F4EEE2; box-shadow: 9px 9px 0 #1A1713; overflow: hidden; display: flex; flex-direction: column; }
                .smh3 .face.back { transform: rotateY(180deg); }
                .smh3 .face::after { content: ""; position: absolute; inset: 0; background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,.38) 46%, rgba(220,220,226,.22) 52%, transparent 68%); transform: translateX(calc(var(--ry, 0) * 3.2%)); pointer-events: none; }
                .smh3 .bar { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-bottom: 1.5px solid #1A1713; background: #E8401B; color: #F4EEE2; font-family: 'Space Mono', monospace; font-size: 10.5px; letter-spacing: .16em; text-transform: uppercase; }
                .smh3 .cbody { flex: 1; display: flex; gap: 12px; padding: 12px; min-height: 0; }
                .smh3 .photo { position: relative; width: 38%; border: 1.5px solid #1A1713; overflow: hidden; flex: none; background: radial-gradient(circle at 50% 38%, rgba(26,23,19,.16) 0 26%, transparent 27%), radial-gradient(circle at 50% 105%, rgba(26,23,19,.16) 0 42%, transparent 43%), repeating-linear-gradient(0deg, rgba(26,23,19,.05) 0 1px, transparent 1px 4px), #EBE3D2; }
                .smh3 .photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
                .smh3 .photo .note { position: absolute; inset: auto 0 6px; text-align: center; font-family: 'Space Mono', monospace; font-size: 8.5px; letter-spacing: .14em; text-transform: uppercase; color: rgba(26,23,19,.45); }
                .smh3 .fields { flex: 1; display: flex; flex-direction: column; gap: 6px; min-width: 0; }
                .smh3 .cname { font-family: Syne, sans-serif; font-weight: 800; font-size: clamp(17px, 1.7vw, 24px); line-height: 1; text-transform: uppercase; margin: 0; }
                .smh3 .crow { font-family: 'Space Mono', monospace; font-size: clamp(8.5px, .8vw, 10.5px); letter-spacing: .1em; text-transform: uppercase; color: rgba(26,23,19,.72); display: flex; gap: 8px; margin: 0; }
                .smh3 .crow b { color: #1A1713; font-weight: 700; }
                .smh3 .cfoot { margin-top: auto; display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; }
                .smh3 .barcode { height: 26px; flex: 1; background: repeating-linear-gradient(90deg, #1A1713 0 2px, transparent 2px 5px, #1A1713 5px 6px, transparent 6px 8px, #1A1713 8px 11px, transparent 11px 15px, #1A1713 15px 16px, transparent 16px 22px); }
                .smh3 .hint { font-family: 'Space Mono', monospace; font-size: 8.5px; letter-spacing: .12em; text-transform: uppercase; color: rgba(26,23,19,.45); white-space: nowrap; }
                .smh3 .face.back .cbody { flex-direction: column; gap: 0; padding: 14px 16px; position: relative; }
                .smh3 .wm { position: absolute; right: 8px; bottom: 4px; width: 42%; color: #1A1713; opacity: .07; }
                .smh3 .brows { position: relative; z-index: 1; display: grid; gap: 8px; }
                .smh3 .brows .crow { font-size: clamp(9px, .85vw, 11px); }
                .smh3 .bnote { position: relative; z-index: 1; margin-top: auto; font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .12em; text-transform: uppercase; color: rgba(26,23,19,.45); }
                .smh3 .card:focus-visible { outline: 2px solid #E8401B; outline-offset: 4px; }
                @media (max-width: 980px) { .smh3 .wrap { grid-template-columns: 1fr; gap: 40px; padding-top: 96px; } .smh3 .zone { justify-content: flex-start; } }
                @media (max-width: 560px) { .smh3 .card { width: min(86vw, 380px); } }
                @media (prefers-reduced-motion: reduce) {
                    .smh3 .aura { display: none !important; }
                    .smh3 .card, .smh3 .card.is-flipping { transition: none; }
                }
            `}</style>

            {showAura && <div ref={auraRef} className="aura" aria-hidden="true" />}

            <div className="wrap">
                <div>
                    <p className="mono kicker">{kicker}</p>
                    <h1>
                        <span className="line">{nameLine1}</span>
                        {nameLine2 && <span className="line">{nameLine2}</span>}
                    </h1>
                    <p className="tag">
                        {tagBefore}
                        {hlIdx >= 0 && <em>{taglineHighlight}</em>}
                        {tagAfter}
                    </p>
                    <div className="foot">
                        <span className="mono scroll">{scrollLabel}</span>
                    </div>
                </div>

                <div className="zone">
                    <div
                        ref={cardRef}
                        className={"card" + (flipped ? " is-flipped" : "") + (flipping ? " is-flipping" : "")}
                        tabIndex={0}
                        role="button"
                        aria-pressed={flipped}
                        aria-label="Identity card. Press to flip."
                        onClick={flip}
                        onKeyDown={(ev) => {
                            if (ev.key === "Enter" || ev.key === " ") {
                                ev.preventDefault()
                                flip()
                            }
                        }}
                    >
                        <div className="face front">
                            <div className="bar"><span>Photo ID</span>{crestTiny}<span>{cardId}</span></div>
                            <div className="cbody">
                                <div className="photo">
                                    {photoSrc && <img src={photoSrc} alt="" />}
                                    {!photoSrc && <span className="note">photo goes here</span>}
                                </div>
                                <div className="fields">
                                    <p className="cname">{nameLine2 ? `${nameLine2},` : ""}<br />{nameLine1}</p>
                                    <p className="crow"><b>Type</b><span>{cardType}</span></p>
                                    <p className="crow"><b>Issued</b><span>{cardIssued}</span></p>
                                    <p className="crow"><b>Base</b><span>{cardBase}</span></p>
                                    <div className="cfoot">
                                        <div className="barcode" aria-hidden="true" />
                                        <span className="hint">tap to flip</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="face back">
                            <div className="bar"><span>Reverse</span><span>{cardId}</span></div>
                            <div className="cbody">
                                <svg className="wm" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                                    <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="7" />
                                    <circle cx="60" cy="21.5" r="4.5" fill="currentColor" />
                                    <path d="M32 72 V52 Q32 35 46 35 Q60 35 60 52 V72 M60 52 Q60 35 74 35 Q88 35 88 52 V72" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M32 88 C40 80 52 80 60 88 C68 96 80 96 88 88" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" />
                                </svg>
                                <div className="brows">
                                    {backRows.map((r, i) => (
                                        <p className="crow" key={i}><b>{r.label}</b><span>{r.value}</span></p>
                                    ))}
                                </div>
                                <span className="bnote">tap to flip back</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

Hero.defaultProps = {
    sectionId: "top",
    kicker: "Brand, creative and GTM. Melbourne.",
    nameLine1: "Shrey",
    nameLine2: "Mehra",
    tagline: "I build brands people want to belong to.",
    taglineHighlight: "want to belong to",
    scrollLabel: "Scroll ↓",
    cardId: "SM-001",
    cardType: "Brand builder",
    cardIssued: "2026",
    cardBase: "Melbourne, AEST",
    backRows: [
        { label: "Status", value: "Building a culture" },
        { label: "Seeking", value: "Full time, curiosity driven" },
        { label: "Says", value: "Belonging beats reach" },
        { label: "Replies", value: "Fast" },
    ],
    showAura: true,
}

addPropertyControls(Hero, {
    sectionId: { type: ControlType.String, title: "Section id", defaultValue: "top" },
    kicker: { type: ControlType.String, title: "Kicker", defaultValue: "Brand, creative and GTM. Melbourne." },
    nameLine1: { type: ControlType.String, title: "Name line 1", defaultValue: "Shrey" },
    nameLine2: { type: ControlType.String, title: "Name line 2", defaultValue: "Mehra" },
    tagline: { type: ControlType.String, title: "Tagline", displayTextArea: true, defaultValue: "I build brands people want to belong to." },
    taglineHighlight: { type: ControlType.String, title: "Highlight phrase", defaultValue: "want to belong to" },
    scrollLabel: { type: ControlType.String, title: "Scroll label", defaultValue: "Scroll ↓" },
    photo: { type: ControlType.ResponsiveImage, title: "Card photo" },
    cardId: { type: ControlType.String, title: "Card number", defaultValue: "SM-001" },
    cardType: { type: ControlType.String, title: "Card: type", defaultValue: "Brand builder" },
    cardIssued: { type: ControlType.String, title: "Card: issued", defaultValue: "2026" },
    cardBase: { type: ControlType.String, title: "Card: base", defaultValue: "Melbourne, AEST" },
    backRows: {
        type: ControlType.Array,
        title: "Card back rows",
        maxCount: 6,
        control: {
            type: ControlType.Object,
            controls: {
                label: { type: ControlType.String, defaultValue: "" },
                value: { type: ControlType.String, defaultValue: "" },
            },
        },
    },
    showAura: { type: ControlType.Boolean, title: "Cursor aura", defaultValue: true },
})
