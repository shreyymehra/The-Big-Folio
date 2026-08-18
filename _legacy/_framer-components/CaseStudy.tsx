import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

/**
 * CASE STUDY — Problem → Hypothesis → Approach → Result → Learning.
 * Disclosure chip before the title (spec always says so), sticky tab
 * labels, dashed paste-zones where real artwork goes, readable in five
 * minutes. First fill: Brand World. Duplicate the page and edit props
 * for each further study.
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
            { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
        )
        els.forEach((el) => io.observe(el))
        return () => io.disconnect()
    }, [disabled])
    return ref
}

function Paras(props: { text: string }) {
    const paras = (props.text || "").split(/\n\s*\n/).filter(Boolean)
    return (
        <>
            {paras.map((p, i) => (
                <p key={i}>{p}</p>
            ))}
        </>
    )
}

const ROMAN = ["i.", "ii.", "iii.", "iv.", "v.", "vi.", "vii.", "viii."]

export default function CaseStudy(props: {
    backLabel: string
    backLink: string
    disclosure: string
    title: string
    standfirst: string
    meta: { label: string }[]
    problem: { lede: string; body: string; dropLabel: string; showDrop: boolean }
    hypothesis: { lede: string; body: string }
    approach: { lede: string; items: { text: string }[]; dropLabel: string; showDrop: boolean }
    result: { lede: string; body: string; dropLabel: string; showDrop: boolean }
    learning: { quote: string; highlight: string }
    nextLabel: string
    nextTitle: string
    nextLink: string
}) {
    const {
        backLabel, backLink, disclosure, title, standfirst, meta,
        problem, hypothesis, approach, result, learning,
        nextLabel, nextTitle, nextLink,
    } = props
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const ref = useReveal(isCanvas)

    const titleLines = title.split("\n")
    const lIdx = learning.highlight ? learning.quote.indexOf(learning.highlight) : -1
    const lBefore = lIdx >= 0 ? learning.quote.slice(0, lIdx) : learning.quote
    const lAfter = lIdx >= 0 ? learning.quote.slice(lIdx + learning.highlight.length) : ""

    const blocks: { tab: string; content: React.ReactNode }[] = [
        {
            tab: "01 / Problem",
            content: (
                <>
                    <p className="lede">{problem.lede}</p>
                    <Paras text={problem.body} />
                    {problem.showDrop && <div className="drop"><span>{problem.dropLabel}</span></div>}
                </>
            ),
        },
        {
            tab: "02 / Hypothesis",
            content: (
                <>
                    <p className="lede">{hypothesis.lede}</p>
                    <Paras text={hypothesis.body} />
                </>
            ),
        },
        {
            tab: "03 / Approach",
            content: (
                <>
                    <p className="lede">{approach.lede}</p>
                    <ul>
                        {approach.items.map((it, i) => (
                            <li key={i}>
                                <span className="idx">{ROMAN[i] || `${i + 1}.`}</span>
                                <span>{it.text}</span>
                            </li>
                        ))}
                    </ul>
                    {approach.showDrop && <div className="drop"><span>{approach.dropLabel}</span></div>}
                </>
            ),
        },
        {
            tab: "04 / Result",
            content: (
                <>
                    <p className="lede">{result.lede}</p>
                    <Paras text={result.body} />
                    {result.showDrop && <div className="drop"><span>{result.dropLabel}</span></div>}
                </>
            ),
        },
        {
            tab: "05 / Learning",
            content: (
                <p className="learning">
                    {lBefore}
                    {lIdx >= 0 && <span className="hl">{learning.highlight}</span>}
                    {lAfter}
                </p>
            ),
        },
    ]

    return (
        <main
            ref={ref as any}
            className={"smcase" + (isCanvas ? " is-static" : "")}
            style={{ width: "100%", position: "relative" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Grotesk:wght@400;500&family=Space+Mono:wght@400;700&display=swap');
                .smcase { background: #F4EEE2; color: #1A1713; font-family: 'Space Grotesk', sans-serif; font-size: 17px; line-height: 1.65; -webkit-font-smoothing: antialiased; padding-top: clamp(120px, 17vh, 190px); }
                .smcase ::selection { background: #E8401B; color: #F4EEE2; }
                .smcase a { color: inherit; text-decoration: none; }
                .smcase a:focus-visible { outline: 2px solid #E8401B; outline-offset: 3px; }
                .smcase .wrap { max-width: 1440px; margin: 0 auto; padding: 0 clamp(20px, 6vw, 96px); }
                .smcase .mono { font-family: 'Space Mono', monospace; font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; }
                .smcase .tab { display: inline-flex; align-items: center; gap: 10px; font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; border: 1.5px solid #1A1713; background: #F4EEE2; padding: 7px 14px; box-shadow: 3px 3px 0 #1A1713; }
                .smcase .back { display: inline-flex; align-items: center; gap: 8px; margin-bottom: clamp(36px, 6vh, 60px); font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; transition: color .2s ease; }
                .smcase .back .arr { transition: transform .3s cubic-bezier(.22,1,.36,1); display: inline-block; }
                .smcase .back:hover { color: #E8401B; }
                .smcase .back:hover .arr { transform: translateX(-5px); }
                .smcase .disclosure { display: inline-block; font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: .14em; text-transform: uppercase; border: 1.5px solid #1A1713; padding: 8px 14px; background: #EBE3D2; transform: rotate(-1deg); }
                .smcase h1 { font-family: Syne, sans-serif; font-weight: 800; text-transform: uppercase; font-size: clamp(46px, 8.5vw, 120px); line-height: .94; letter-spacing: -.02em; margin: clamp(20px, 3.5vh, 36px) 0; color: #E8401B; }
                .smcase .standfirst { max-width: 54ch; color: rgba(25,23,19,.72); font-size: clamp(17px, 1.4vw, 20px); margin: 0; }
                .smcase .metarow { display: flex; flex-wrap: wrap; gap: 10px; margin-top: clamp(24px, 4vh, 40px); }
                .smcase .chip { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: .1em; text-transform: uppercase; border: 1.5px solid #1A1713; padding: 7px 12px; background: #F4EEE2; transition: background .2s ease, color .2s ease; }
                .smcase .chip:hover { background: #1A1713; color: #F4EEE2; }
                .smcase .sections { margin-top: clamp(56px, 9vh, 104px); display: grid; gap: clamp(64px, 10vh, 116px); }
                .smcase .block { display: grid; grid-template-columns: repeat(12, 1fr); column-gap: clamp(18px, 2.2vw, 30px); row-gap: 24px; }
                .smcase .label { grid-column: 1 / span 3; }
                .smcase .label .sticky { position: sticky; top: 100px; }
                .smcase .content { grid-column: 5 / span 8; }
                .smcase .lede { font-family: Syne, sans-serif; font-weight: 700; font-size: clamp(22px, 2.5vw, 34px); line-height: 1.16; max-width: 26ch; margin: 0 0 20px; }
                .smcase .content p { max-width: 60ch; color: rgba(25,23,19,.72); }
                .smcase .content p + p { margin-top: 1.3em; }
                .smcase .content p.lede { color: #1A1713; }
                .smcase .content ul { margin: 1.3em 0 0; max-width: 60ch; list-style: none; padding: 0; }
                .smcase .content li { padding: 12px 0 12px 6px; border-top: 1.5px solid #1A1713; display: flex; gap: 16px; color: rgba(25,23,19,.72); transition: padding-left .2s cubic-bezier(.22,1,.36,1), background .15s ease; }
                .smcase .content li:hover { padding-left: 14px; background: #EBE3D2; }
                .smcase .content .idx { font-family: 'Space Mono', monospace; font-weight: 700; color: #1A1713; flex: none; }
                .smcase .drop { margin-top: 26px; border: 2px dashed rgba(25,23,19,.45); aspect-ratio: 16 / 9; display: grid; place-items: center; transition: border-color .25s ease, background .25s ease; }
                .smcase .drop:hover { border-color: #E8401B; background: rgba(232,64,27,.04); }
                .smcase .drop span { font-family: 'Space Mono', monospace; font-size: 10.5px; letter-spacing: .22em; text-transform: uppercase; color: rgba(25,23,19,.45); }
                .smcase .learning { font-family: Syne, sans-serif; font-weight: 700; font-size: clamp(21px, 2.3vw, 31px); line-height: 1.3; max-width: 32ch; margin: 0; }
                .smcase .learning .hl { box-shadow: inset 0 -.3em 0 rgba(14,123,91,.25); }
                .smcase .next { margin-top: clamp(72px, 11vh, 128px); border-top: 1.5px solid #1A1713; padding: clamp(32px, 5.5vh, 56px) 0 clamp(64px, 10vh, 110px); display: flex; align-items: baseline; justify-content: space-between; gap: 20px; }
                .smcase .next a { font-family: Syne, sans-serif; font-weight: 800; text-transform: uppercase; font-size: clamp(26px, 3.6vw, 48px); transition: color .2s ease, letter-spacing .3s cubic-bezier(.22,1,.36,1); }
                .smcase .next a:hover { color: #E8401B; letter-spacing: .01em; }
                .smcase [data-reveal] { opacity: 0; transform: translateY(22px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
                .smcase [data-reveal].is-in { opacity: 1; transform: none; }
                .smcase.is-static [data-reveal] { opacity: 1; transform: none; transition: none; }
                @media (max-width: 900px) {
                    .smcase .label { grid-column: 1 / -1; }
                    .smcase .label .sticky { position: static; }
                    .smcase .content { grid-column: 1 / -1; }
                }
                @media (max-width: 560px) { .smcase { font-size: 16px; } }
                @media (prefers-reduced-motion: reduce) { .smcase [data-reveal] { transition: none; opacity: 1; transform: none; } }
            `}</style>
            <div className="wrap">
                <a className="back" href={backLink}><span className="arr">←</span> {backLabel}</a>

                <div data-reveal>
                    <span className="disclosure">{disclosure}</span>
                </div>
                <h1 data-reveal>
                    {titleLines.map((l, i) => (
                        <React.Fragment key={i}>
                            {i > 0 && <br />}
                            {l}
                        </React.Fragment>
                    ))}
                </h1>
                <p className="standfirst" data-reveal>{standfirst}</p>

                <div className="metarow" data-reveal>
                    {meta.map((m, i) => (
                        <span className="chip" key={i}>{m.label}</span>
                    ))}
                </div>

                <div className="sections">
                    {blocks.map((b, i) => (
                        <div className="block" data-reveal key={i}>
                            <div className="label">
                                <div className="sticky"><span className="tab">{b.tab}</span></div>
                            </div>
                            <div className="content">{b.content}</div>
                        </div>
                    ))}
                </div>

                <div className="next" data-reveal>
                    <span className="mono">{nextLabel}</span>
                    <a href={nextLink}>{nextTitle}</a>
                </div>
            </div>
        </main>
    )
}

CaseStudy.defaultProps = {
    backLabel: "All work",
    backLink: "./#work",
    disclosure: "Spec: a made-up company, built to show the thinking",
    title: "Brand\nWorld",
    standfirst: "A complete brand universe for a made-up AI company. Name, voice, identity, world. Built from a blank page so you can watch every decision get made.",
    meta: [
        { label: "Lead: Brand" },
        { label: "Support: Creative Strategy" },
        { label: "2026" },
        { label: "5 min read" },
    ],
    problem: {
        lede: "Every AI company is selling the same future.",
        body: "Capability claims, cosmic gradients, the word intelligence doing all the work. The category talks about what the technology can do and almost never about who you become by using it. So there's nothing to belong to. People join tribes, not feature lists.\n\nThe brief I set myself: build a full brand world for a fictional AI company, blank page to finished system, and be ready to defend every choice in an interview.",
        dropLabel: "Paste artwork 01 — category audit",
        showDrop: true,
    },
    hypothesis: {
        lede: "People adopt what their people adopt.",
        body: "The category sells capability, so the gap is belonging. Build the brand like a world. Put one human tension at the centre and let everything grow from it: the name, the voice, the look, and the list of things the brand refuses to do.",
    },
    approach: {
        lede: "One tension, then everything in its orbit.",
        items: [
            { text: "Pick the tension. The human ache this product actually answers. No visuals allowed yet." },
            { text: "Name it. The routes I tried, the one that survived, and why the others died." },
            { text: "Write the voice. What it always says. What it never says." },
            { text: "Build the system. Identity, type, colour, and artifacts this world would really produce." },
            { text: "Prove it. A manifesto, a launch film script, product copy written for real." },
        ],
        dropLabel: "Paste artwork 02 — identity system",
        showDrop: true,
    },
    result: {
        lede: "What exists now.",
        body: "A named company with a voice, an identity system, a manifesto and a launch script. Nothing shipped to market, and no numbers pretending otherwise. What the piece proves is simpler: I can start with nothing and end with a world that survives questioning.",
        dropLabel: "Paste artwork 03 — world artifacts",
        showDrop: true,
    },
    learning: {
        quote: "Worlds don't come from mood boards. They come from one tension held long enough to organise everything else.",
        highlight: "one tension",
    },
    nextLabel: "Next study",
    nextTitle: "The Repositioning",
    nextLink: "./#work",
}

addPropertyControls(CaseStudy, {
    backLabel: { type: ControlType.String, title: "Back label", defaultValue: "All work" },
    backLink: { type: ControlType.String, title: "Back link", defaultValue: "./#work" },
    disclosure: { type: ControlType.String, title: "Disclosure", displayTextArea: true, defaultValue: "Spec: a made-up company, built to show the thinking" },
    title: { type: ControlType.String, title: "Title (\\n = break)", displayTextArea: true, defaultValue: "Brand\nWorld" },
    standfirst: { type: ControlType.String, title: "Standfirst", displayTextArea: true, defaultValue: "" },
    meta: {
        type: ControlType.Array,
        title: "Meta chips",
        maxCount: 6,
        control: { type: ControlType.Object, controls: { label: { type: ControlType.String, defaultValue: "" } } },
    },
    problem: {
        type: ControlType.Object,
        title: "01 Problem",
        controls: {
            lede: { type: ControlType.String, displayTextArea: true, defaultValue: "" },
            body: { type: ControlType.String, title: "Body (blank line = ¶)", displayTextArea: true, defaultValue: "" },
            showDrop: { type: ControlType.Boolean, title: "Paste zone", defaultValue: true },
            dropLabel: { type: ControlType.String, title: "Zone label", defaultValue: "Paste artwork 01" },
        },
    },
    hypothesis: {
        type: ControlType.Object,
        title: "02 Hypothesis",
        controls: {
            lede: { type: ControlType.String, displayTextArea: true, defaultValue: "" },
            body: { type: ControlType.String, displayTextArea: true, defaultValue: "" },
        },
    },
    approach: {
        type: ControlType.Object,
        title: "03 Approach",
        controls: {
            lede: { type: ControlType.String, displayTextArea: true, defaultValue: "" },
            items: {
                type: ControlType.Array,
                title: "Steps",
                maxCount: 8,
                control: { type: ControlType.Object, controls: { text: { type: ControlType.String, displayTextArea: true, defaultValue: "" } } },
            },
            showDrop: { type: ControlType.Boolean, title: "Paste zone", defaultValue: true },
            dropLabel: { type: ControlType.String, title: "Zone label", defaultValue: "Paste artwork 02" },
        },
    },
    result: {
        type: ControlType.Object,
        title: "04 Result",
        controls: {
            lede: { type: ControlType.String, displayTextArea: true, defaultValue: "" },
            body: { type: ControlType.String, displayTextArea: true, defaultValue: "" },
            showDrop: { type: ControlType.Boolean, title: "Paste zone", defaultValue: true },
            dropLabel: { type: ControlType.String, title: "Zone label", defaultValue: "Paste artwork 03" },
        },
    },
    learning: {
        type: ControlType.Object,
        title: "05 Learning",
        controls: {
            quote: { type: ControlType.String, displayTextArea: true, defaultValue: "" },
            highlight: { type: ControlType.String, title: "Highlight phrase", defaultValue: "" },
        },
    },
    nextLabel: { type: ControlType.String, title: "Next label", defaultValue: "Next study" },
    nextTitle: { type: ControlType.String, title: "Next title", defaultValue: "The Repositioning" },
    nextLink: { type: ControlType.String, title: "Next link", defaultValue: "./#work" },
})
