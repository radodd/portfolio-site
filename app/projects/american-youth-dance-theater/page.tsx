'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ─── Chord data ───────────────────────────────────────────────
const DOMAINS = [
  { name: 'Identity & Accounts',   tables: 4,  color: '#5888c8' },
  { name: 'Semester & Program',    tables: 9,  color: '#e86a20' },
  { name: 'Class Structure',       tables: 13, color: '#8888a8' },
  { name: 'Requirements & Access', tables: 7,  color: '#d49020' },
  { name: 'Enrollment & Reg',      tables: 6,  color: '#2db99b' },
  { name: 'Auditions & Waitlist',  tables: 3,  color: '#9b5fdc' },
  { name: 'Discounts & Pricing',   tables: 7,  color: '#c83488' },
  { name: 'Payments',              tables: 4,  color: '#37c85f' },
  { name: 'Email & Comms',         tables: 10, color: '#41b9dc' },
  { name: 'Media',                 tables: 2,  color: '#73738c' },
];

const MATRIX = [
  [0,0,0,0,6,0,0,2,0,0],
  [0,0,5,0,0,0,4,0,0,0],
  [0,0,0,4,4,3,0,0,0,2],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,4,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,3,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [3,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
];

// ─── Sub-components ───────────────────────────────────────────
function DeepDive({ id, num, title, hook, open, onToggle, children }: {
  id: string; num: string; title: string; hook: string;
  open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className={`aydt-deep-dive${open ? ' open' : ''}`} id={id} style={{ marginBottom: 12 }}>
      <div className="aydt-deep-dive-trigger" onClick={onToggle}>
        <div>
          <div className="aydt-deep-dive-pattern"><span>{num}</span></div>
          <div className="aydt-deep-dive-title">{title}</div>
          <div className="aydt-deep-dive-hook">{hook}</div>
        </div>
        <div className="aydt-deep-dive-chevron">▾</div>
      </div>
      <div className="aydt-deep-dive-body">
        <div className="aydt-deep-dive-content">{children}</div>
      </div>
    </div>
  );
}

function InnerCollapse({ id, title, sub, open, onToggle, children }: {
  id: string; title: string; sub: string;
  open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className={`aydt-inner-collapse${open ? ' open' : ''}`} id={id}>
      <div className="aydt-inner-collapse-trigger" onClick={onToggle}>
        <div>
          <div className="aydt-inner-collapse-title">{title}</div>
          <div className="aydt-inner-collapse-sub">{sub}</div>
        </div>
        <div className="aydt-inner-collapse-chevron">▾</div>
      </div>
      <div className="aydt-inner-collapse-body">
        <div className="aydt-inner-collapse-content">{children}</div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function AYDTCaseStudy() {
  const [openDD, setOpenDD] = useState(new Set<string>());
  const [openIC, setOpenIC] = useState(new Set<string>());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toggleDD = (id: string) => setOpenDD(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const toggleIC = (id: string) => setOpenIC(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });

  // ── Chord canvas ─────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const el = canvas as HTMLCanvasElement;
    const ctx = el.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0;
    let hov: number | null = null;

    const total = DOMAINS.reduce((s, d) => s + d.tables, 0);
    const gap = 0.025;
    const totalAngle = 2 * Math.PI - gap * DOMAINS.length;

    type Arc = typeof DOMAINS[0] & { startAngle: number; endAngle: number; midAngle: number };
    const arcs: Arc[] = [];
    let a = -Math.PI / 2;
    DOMAINS.forEach(d => {
      const sweep = (d.tables / total) * totalAngle;
      arcs.push({ ...d, startAngle: a, endAngle: a + sweep, midAngle: a + sweep / 2 });
      a += sweep + gap;
    });

    function angleInArc(angle: number, start: number, end: number) {
      const n = (x: number) => ((x % (2*Math.PI)) + 2*Math.PI) % (2*Math.PI);
      const an = n(angle), sn = n(start), en = n(end);
      return sn <= en ? an >= sn && an <= en : an >= sn || an <= en;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const cx = W/2, cy = H/2;
      const R = Math.min(W,H)*0.34;
      const arcW = 14;

      for (let i = 0; i < arcs.length; i++) {
        for (let j = i+1; j < arcs.length; j++) {
          const val = MATRIX[i][j] + MATRIX[j][i];
          if (!val) continue;
          const di = arcs[i], dj = arcs[j];
          const x1 = cx + Math.cos(di.midAngle)*(R-arcW/2);
          const y1 = cy + Math.sin(di.midAngle)*(R-arcW/2);
          const x2 = cx + Math.cos(dj.midAngle)*(R-arcW/2);
          const y2 = cy + Math.sin(dj.midAngle)*(R-arcW/2);
          const cpx = cx + (x1+x2-2*cx)*0.12;
          const cpy = cy + (y1+y2-2*cy)*0.12;
          let alpha = 0.11;
          if (hov !== null) alpha = hov===i||hov===j ? 0.55 : 0.025;
          const grad = ctx.createLinearGradient(x1,y1,x2,y2);
          grad.addColorStop(0, di.color); grad.addColorStop(1, dj.color);
          ctx.beginPath();
          ctx.moveTo(x1,y1); ctx.quadraticCurveTo(cpx,cpy,x2,y2);
          ctx.strokeStyle = grad; ctx.globalAlpha = alpha;
          ctx.lineWidth = Math.max(1, val*1.1); ctx.stroke();
          ctx.globalAlpha = 1;
          if (hov !== null && (hov===i||hov===j) && alpha > 0.3) {
            const mx = (x1+cpx*2+x2)/4, my = (y1+cpy*2+y2)/4;
            ctx.font = '600 9px "DM Mono",monospace';
            ctx.fillStyle = 'rgba(232,232,245,0.75)';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(val+' FK', mx, my);
          }
        }
      }

      arcs.forEach((d, i) => {
        const alpha = hov===null ? 0.9 : hov===i ? 1 : 0.18;
        if (hov===i) {
          ctx.beginPath(); ctx.arc(cx,cy,R,d.startAngle,d.endAngle);
          ctx.strokeStyle = d.color; ctx.lineWidth = arcW+14;
          ctx.globalAlpha = 0.07; ctx.stroke();
        }
        ctx.globalAlpha = alpha;
        ctx.beginPath(); ctx.arc(cx,cy,R,d.startAngle,d.endAngle);
        ctx.strokeStyle = d.color; ctx.lineWidth = arcW; ctx.lineCap = 'butt'; ctx.stroke();

        const lr = R+arcW+14;
        const lx = cx + Math.cos(d.midAngle)*lr;
        const ly = cy + Math.sin(d.midAngle)*lr;
        const onRight = Math.cos(d.midAngle) >= 0;
        ctx.globalAlpha = 1;
        ctx.textAlign = onRight ? 'left' : 'right'; ctx.textBaseline = 'middle';
        ctx.font = '600 10px "DM Mono",monospace';
        ctx.fillStyle = hov===i ? d.color : `rgba(176,184,208,${hov===null?0.75:0.22})`;
        ctx.fillText(d.name, lx, ly-6);
        ctx.font = '400 8px "DM Mono",monospace';
        ctx.fillStyle = hov===i ? 'rgba(232,232,245,0.55)' : `rgba(112,128,168,${hov===null?0.45:0.12})`;
        ctx.fillText(d.tables+' tables', lx, ly+7);

        if (hov===i) {
          let fks = 0;
          for (let j=0; j<arcs.length; j++) if(j!==i) fks += MATRIX[i][j]+MATRIX[j][i];
          const txt = fks+' cross-domain FKs';
          ctx.font = '500 9px "DM Mono",monospace';
          const tw = ctx.measureText(txt).width;
          const ph=18, pw=tw+16, pr=4;
          const px = onRight ? lx : lx-pw;
          const py = ly+18;
          ctx.beginPath();
          (ctx as CanvasRenderingContext2D & { roundRect: (x:number,y:number,w:number,h:number,r:number)=>void }).roundRect(px,py,pw,ph,pr);
          ctx.fillStyle = 'rgba(20,24,48,0.92)'; ctx.fill();
          ctx.strokeStyle = d.color; ctx.globalAlpha = 0.35; ctx.lineWidth = 1; ctx.stroke();
          ctx.globalAlpha = 1; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillStyle = d.color; ctx.fillText(txt, px+pw/2, py+ph/2);
        }
      });
    }

    function resize() {
      const r = el.getBoundingClientRect();
      W = r.width; H = r.height;
      el.width = W*dpr; el.height = H*dpr;
      ctx.scale(dpr, dpr); draw();
    }

    function onMove(e: MouseEvent) {
      const r = el.getBoundingClientRect();
      const mx = e.clientX-r.left, my = e.clientY-r.top;
      const cx = W/2, cy = H/2;
      const dx = mx-cx, dy = my-cy;
      const dist = Math.sqrt(dx*dx+dy*dy);
      const R = Math.min(W,H)*0.34;
      let next: number|null = null;
      if (dist > R-18 && dist < R+18) {
        const angle = Math.atan2(dy,dx);
        arcs.forEach((d,i) => { if (angleInArc(angle, d.startAngle, d.endAngle)) next = i; });
      }
      if (next !== hov) { hov = next; draw(); }
    }
    function onLeave() { hov = null; draw(); }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── Scoped styles ─────────────────────────────────────── */}
      <style>{`
        /* ── Tokens ── */
        .aydt-root {
          --bg:       #0d1020;
          --surface:  #141830;
          --surface2: #1a2040;
          --border:   rgba(255,255,255,0.07);
          --border-md:rgba(255,255,255,0.12);
          --orange:   #e86a20;
          --blue:     #5888c8;
          --pink:     #c83488;
          --green:    #2db99b;
          --muted:    #7080a8;
          --text:     #e8e8f5;
          --text-dim: #b0b8d0;
          --grad:     linear-gradient(90deg,#e86a20,#c83488,#5888c8);
          --mono:     var(--font-mono,'DM Mono',monospace);
          --display:  var(--font-display,'Fraunces',serif);
          --body:     var(--font-body,'Switzer',sans-serif);
          font-family: var(--body);
          line-height: 1.6;
        }

        /* ── Layout ── */
        .aydt-page { max-width:1100px; margin:0 auto; padding:0 24px 96px }
        .aydt-section { margin-bottom:72px }

        /* ── Hero ── */
        .aydt-hero {
          position:relative; overflow:hidden;
          padding:56px 24px 56px; margin-bottom:0;
          background:linear-gradient(160deg,#0f1228 0%,#0a0c18 60%,#12081a 100%);
        }
        .aydt-hero-blob {
          position:absolute; border-radius:50%; filter:blur(80px); opacity:0.18; pointer-events:none;
        }
        .aydt-hero-blob-1 { width:480px;height:480px;top:-120px;left:-80px;background:#e86a20 }
        .aydt-hero-blob-2 { width:380px;height:380px;top:-60px;right:80px;background:#c83488 }
        .aydt-hero-blob-3 { width:320px;height:320px;bottom:-80px;left:40%;background:#5888c8 }
        .aydt-hero-inner { position:relative;z-index:1;max-width:1100px;width:100%;margin:0 auto;display:flex;flex-direction:column;gap:16px }
        .aydt-back {
          display:inline-block;font-family:var(--mono);font-size:10px;letter-spacing:0.12em;
          text-transform:uppercase;color:var(--muted);text-decoration:none;
        }
        .aydt-back:hover { color:var(--text) }
        .aydt-hero-eye {
          font-family:var(--mono);font-size:9px;letter-spacing:0.22em;text-transform:uppercase;
          color:var(--muted);margin-bottom:16px;display:flex;align-items:center;gap:10px;
        }
        .aydt-hero-eye-sep { width:24px;height:1px;background:rgba(255,255,255,0.15) }
        .aydt-hero-title { font-family:var(--display);font-weight:900;line-height:1.05;letter-spacing:0.02em;margin-bottom:16px }
        .aydt-hero-title .l1 { display:block;font-size:clamp(2rem,5vw,3.6rem);color:var(--text) }
        .aydt-hero-title .l2 {
          display:block;font-size:clamp(2rem,5vw,3.6rem);
          background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;
        }
        .aydt-hero-oneliner {
          font-family:var(--body);font-size:clamp(1rem,2vw,1.25rem);color:var(--text-dim);line-height:1.7;
        }

        /* ── Stats strip ── */
        .aydt-stats-strip {
          background:var(--surface);border-bottom:1px solid var(--border);padding:32px 24px;
        }
        .aydt-stats-inner {
          max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(5,1fr);gap:24px;
        }
        @media(max-width:760px) { .aydt-stats-inner { grid-template-columns:1fr 1fr;gap:20px } }
        .aydt-stat-block { text-align:center }
        .aydt-stat-num {
          font-family:var(--display);font-size:clamp(1.6rem,3vw,2.2rem);font-weight:900;font-style:italic;
          line-height:1;margin-bottom:4px;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;
        }
        .aydt-stat-label { font-size:12px;font-weight:600;color:var(--text-dim);margin-bottom:2px }
        .aydt-stat-sub { font-size:10px;color:var(--muted);font-family:var(--mono);line-height:1.5 }

        /* ── Grad rule ── */
        .aydt-grad-rule { height:2px;background:var(--grad);margin-bottom:60px }

        /* ── Section labels ── */
        .aydt-eye {
          font-family:var(--mono);font-size:9px;letter-spacing:0.22em;text-transform:uppercase;
          color:var(--orange);margin-bottom:8px;font-weight:600;
        }
        .aydt-section-title {
          font-family:var(--display);font-size:clamp(1.5rem,3vw,2.2rem);font-weight:700;
          color:var(--text);line-height:1.1;margin-bottom:8px;
        }
        .aydt-section-rule { width:48px;height:3px;border-radius:999px;background:var(--grad);margin-bottom:24px }

        /* ── Prose ── */
        .aydt-prose { font-size:14px;color:var(--text-dim);line-height:1.8;margin-bottom:16px }
        .aydt-prose strong { color:var(--text);font-weight:600 }
        .aydt-prose:last-child { margin-bottom:0 }

        /* ── Grids ── */
        .aydt-two-col { display:grid;grid-template-columns:1fr 1fr;gap:48px }
        @media(max-width:760px) { .aydt-two-col { grid-template-columns:1fr } }

        /* ── Mock frames ── */
        .aydt-mock-side-by-side { display:grid;grid-template-columns:1fr 1fr;gap:24px }
        @media(max-width:640px) { .aydt-mock-side-by-side { grid-template-columns:1fr } }
        .aydt-mock-frame { border:1px solid var(--border);border-radius:10px;overflow:hidden }
        .aydt-mock-chrome {
          height:36px;background:#0e0e1a;border-bottom:1px solid var(--border);
          display:flex;align-items:center;gap:8px;padding:0 14px;
        }
        .aydt-mock-dots { display:flex;gap:5px }
        .aydt-mock-dot { width:9px;height:9px;border-radius:50% }
        .aydt-mock-dot-r { background:#ff5f57 }
        .aydt-mock-dot-y { background:#febc2e }
        .aydt-mock-dot-g { background:#28c840 }
        .aydt-mock-url { font-family:var(--mono);font-size:10px;color:var(--muted);margin:0 auto }
        .aydt-mock-img { display:block;width:100%;height:340px;object-fit:cover;object-position:top center }

        /* ── Metadata cards ── */
        .aydt-detail-card { padding:20px;background:var(--surface);border:1px solid var(--border);border-radius:10px }
        .aydt-detail-label {
          font-family:var(--mono);font-size:9px;letter-spacing:0.15em;text-transform:uppercase;
          color:var(--muted);margin-bottom:8px;
        }
        .aydt-tag-row { display:flex;flex-wrap:wrap;gap:6px }
        .aydt-tag {
          font-family:var(--mono);font-size:10px;padding:3px 9px;border-radius:4px;letter-spacing:0.06em;
          background:rgba(88,136,200,0.1);border:1px solid rgba(88,136,200,0.2);color:var(--blue);
        }
        .aydt-tag-orange { background:rgba(232,106,32,0.1);border-color:rgba(232,106,32,0.2);color:var(--orange) }
        .aydt-tag-green { background:rgba(62,207,142,0.1);border-color:rgba(62,207,142,0.25);color:#3ecf8e }

        /* ── Deep dive ── */
        .aydt-deep-dive {
          border:1px solid var(--border);border-radius:14px;overflow:hidden;
          margin-bottom:24px;transition:border-color 0.3s;
        }
        .aydt-deep-dive.open { border-color:var(--border-md) }
        .aydt-deep-dive[id] { scroll-margin-top:32px }
        .aydt-deep-dive-trigger {
          display:grid;grid-template-columns:1fr auto;gap:16px;align-items:center;
          padding:24px 28px;cursor:pointer;user-select:none;
          background:var(--surface);transition:background 0.2s;
        }
        .aydt-deep-dive-trigger:hover { background:var(--surface2) }
        .aydt-deep-dive-pattern {
          font-family:var(--mono);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;
          color:var(--muted);margin-bottom:6px;
        }
        .aydt-deep-dive-pattern span { color:var(--orange);font-weight:700 }
        .aydt-deep-dive-title {
          font-family:var(--display);font-size:clamp(1.1rem,2vw,1.5rem);font-weight:700;
          color:var(--text);line-height:1.2;
        }
        .aydt-deep-dive-hook { font-size:13px;color:var(--text-dim);line-height:1.6;max-width:640px }
        .aydt-deep-dive-chevron {
          width:36px;height:36px;border-radius:8px;flex-shrink:0;
          display:flex;align-items:center;justify-content:center;
          background:rgba(232,106,32,0.08);color:var(--orange);font-size:16px;font-weight:700;
          transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1),background 0.2s;
        }
        .aydt-deep-dive.open .aydt-deep-dive-chevron { transform:rotate(180deg);background:rgba(232,106,32,0.15) }
        .aydt-deep-dive-body { max-height:0;overflow:hidden;transition:max-height 0.5s cubic-bezier(0.4,0,0.2,1) }
        .aydt-deep-dive.open .aydt-deep-dive-body { max-height:8000px }
        .aydt-deep-dive-content { padding:0 28px 32px;border-top:1px solid var(--border) }
        .aydt-deep-dive-content > *:first-child { margin-top:28px }

        /* ── Phase labels ── */
        .aydt-phase-label {
          font-family:var(--mono);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;
          font-weight:700;margin-bottom:16px;margin-top:32px;
        }
        .aydt-phase-label:first-child { margin-top:0 }
        .aydt-pl-context   { color:var(--muted) }
        .aydt-pl-decision  { color:var(--orange) }
        .aydt-pl-proof     { color:var(--green) }

        /* ── Inner collapse ── */
        .aydt-inner-collapse { border:1px solid var(--border);border-radius:10px;overflow:hidden;margin:16px 0 }
        .aydt-inner-collapse-trigger {
          display:flex;align-items:center;justify-content:space-between;
          padding:14px 18px;cursor:pointer;user-select:none;
          background:var(--surface);transition:background 0.2s;
        }
        .aydt-inner-collapse-trigger:hover { background:var(--surface2) }
        .aydt-inner-collapse-title { font-size:13px;font-weight:700;color:var(--text) }
        .aydt-inner-collapse-sub { font-size:11px;color:var(--muted);margin-top:2px }
        .aydt-inner-collapse-chevron {
          width:28px;height:28px;border-radius:6px;flex-shrink:0;
          display:flex;align-items:center;justify-content:center;
          background:rgba(232,106,32,0.08);color:var(--orange);font-size:13px;font-weight:700;
          transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .aydt-inner-collapse.open .aydt-inner-collapse-chevron { transform:rotate(180deg) }
        .aydt-inner-collapse-body { max-height:0;overflow:hidden;transition:max-height 0.5s cubic-bezier(0.4,0,0.2,1) }
        .aydt-inner-collapse.open .aydt-inner-collapse-body { max-height:6000px }
        .aydt-inner-collapse-content { padding:0 18px 20px;border-top:1px solid var(--border) }

        /* ── Callouts ── */
        .aydt-callout {
          margin:12px 0;padding:10px 14px;
          background:rgba(232,106,32,0.05);border-left:2px solid rgba(232,106,32,0.3);
          border-radius:0 6px 6px 0;font-size:11px;color:var(--muted);line-height:1.65;
        }
        .aydt-callout strong { color:var(--text-dim);font-weight:600 }
        .aydt-callout-blue { background:rgba(88,136,200,0.05);border-left-color:rgba(88,136,200,0.3) }
        .aydt-callout-green { background:rgba(45,185,155,0.05);border-left-color:rgba(45,185,155,0.3) }

        /* ── Worked example ── */
        .aydt-example-scenario {
          background:rgba(232,106,32,0.04);border:1px solid rgba(232,106,32,0.12);
          border-radius:10px;padding:20px;margin-bottom:20px;
        }
        .aydt-example-scenario-title {
          font-family:var(--mono);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;
          color:var(--orange);font-weight:700;margin-bottom:12px;
        }
        .aydt-example-family { display:flex;gap:16px;flex-wrap:wrap }
        .aydt-example-dancer {
          flex:1;min-width:200px;
          background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);
          border-radius:8px;padding:14px;
        }
        .aydt-example-dancer-name { font-size:12px;font-weight:700;color:var(--text);margin-bottom:6px }
        .aydt-example-dancer-detail { font-size:11px;color:var(--muted);line-height:1.7;font-family:var(--mono) }
        .aydt-ex-dancer-section { margin-bottom:28px }
        .aydt-ex-dancer-header {
          display:flex;align-items:center;gap:10px;margin-bottom:14px;
          padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.06);
        }
        .aydt-ex-dancer-label { font-family:var(--display);font-size:1rem;font-weight:700;color:var(--text);line-height:1.2 }
        .aydt-ex-dancer-division {
          font-family:var(--mono);font-size:9px;letter-spacing:0.12em;text-transform:uppercase;padding:2px 8px;border-radius:4px;
        }
        .aydt-ex-div-senior { background:rgba(232,106,32,0.1);color:var(--orange) }
        .aydt-ex-div-junior { background:rgba(88,136,200,0.1);color:var(--blue) }
        .aydt-ex-line {
          display:grid;grid-template-columns:1fr auto;gap:12px;align-items:baseline;
          padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.03);font-size:12px;
        }
        .aydt-ex-line:last-child { border-bottom:none }
        .aydt-ex-line-label { color:var(--text-dim) }
        .aydt-ex-line-label span { display:block;font-size:10px;color:var(--muted);font-family:var(--mono);margin-top:1px }
        .aydt-ex-line-val { font-family:var(--mono);font-size:12px;font-weight:600;text-align:right;white-space:nowrap }
        .aydt-ex-val-base { color:var(--text-dim) }
        .aydt-ex-val-add  { color:var(--orange) }
        .aydt-ex-val-exempt { color:var(--muted);font-style:italic;font-weight:400 }
        .aydt-ex-val-sub  { color:var(--green) }
        .aydt-ex-subtotal {
          display:flex;justify-content:space-between;align-items:center;
          padding:10px 0 0;margin-top:4px;border-top:1px solid rgba(255,255,255,0.08);
        }
        .aydt-ex-subtotal-label { font-size:13px;font-weight:600;color:var(--text-dim) }
        .aydt-ex-subtotal-val { font-family:var(--mono);font-size:14px;font-weight:700;color:var(--text) }
        .aydt-ex-family-section { margin-top:28px;padding-top:20px;border-top:2px solid rgba(88,136,200,0.2) }
        .aydt-ex-family-header {
          font-family:var(--mono);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;
          color:var(--blue);font-weight:700;margin-bottom:14px;
        }
        .aydt-ex-grand-total {
          display:flex;justify-content:space-between;align-items:center;
          padding:14px 16px;margin-top:12px;
          background:rgba(88,136,200,0.06);border:1px solid rgba(88,136,200,0.15);border-radius:8px;
        }
        .aydt-ex-grand-label { font-size:14px;font-weight:700;color:var(--text) }
        .aydt-ex-grand-val { font-family:var(--display);font-size:1.5rem;font-weight:900;font-style:italic;color:var(--blue) }

        /* ── Tooltip ── */
        .aydt-tooltip-wrap {
          position:relative;display:inline;cursor:help;
          border-bottom:1px dashed rgba(232,106,32,0.4);
        }
        .aydt-tooltip-wrap:hover .aydt-tooltip-card { opacity:1;visibility:visible;transform:translateY(0) }
        .aydt-tooltip-card {
          position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateY(4px);
          width:280px;margin-left:-140px;padding:12px 14px;
          background:#0a0c18;border:1px solid rgba(232,106,32,0.2);
          border-radius:8px;box-shadow:0 12px 40px rgba(0,0,0,0.5);
          opacity:0;visibility:hidden;transition:opacity 0.15s,transform 0.15s,visibility 0.15s;
          z-index:100;pointer-events:none;
        }
        .aydt-tooltip-card::after {
          content:'';position:absolute;top:100%;left:50%;margin-left:-5px;
          border:5px solid transparent;border-top-color:rgba(232,106,32,0.2);
        }

        /* ── Highlights grid ── */
        .aydt-highlights-grid { display:grid;grid-template-columns:1fr 1fr;gap:16px }
        @media(max-width:760px) { .aydt-highlights-grid { grid-template-columns:1fr } }
        .aydt-highlight-card {
          background:var(--surface);border:1px solid var(--border);
          border-radius:12px;padding:24px;position:relative;overflow:hidden;
        }
        .aydt-highlight-card::before { content:'';position:absolute;top:0;left:0;right:0;height:2px }
        .aydt-hc-pink::before   { background:var(--pink) }
        .aydt-hc-blue::before   { background:var(--blue) }
        .aydt-hc-green::before  { background:var(--green) }
        .aydt-hc-orange::before { background:var(--orange) }
        .aydt-highlight-eye {
          font-family:var(--mono);font-size:8px;letter-spacing:0.2em;text-transform:uppercase;
          font-weight:700;margin-bottom:8px;
        }
        .aydt-hc-pink .aydt-highlight-eye   { color:var(--pink) }
        .aydt-hc-blue .aydt-highlight-eye   { color:var(--blue) }
        .aydt-hc-green .aydt-highlight-eye  { color:var(--green) }
        .aydt-hc-orange .aydt-highlight-eye { color:var(--orange) }
        .aydt-highlight-title { font-family:var(--display);font-size:1.1rem;font-weight:700;color:var(--text);line-height:1.2;margin-bottom:8px }
        .aydt-highlight-body { font-size:12px;color:var(--muted);line-height:1.7 }
        .aydt-highlight-body strong { color:var(--text-dim);font-weight:600 }
        .aydt-highlight-mini-diagram {
          margin-top:14px;padding:14px;background:#0c0c14;border-radius:8px;border:1px solid rgba(255,255,255,0.04);
        }
        .aydt-hl-layer {
          display:flex;align-items:center;gap:10px;padding:8px 12px;
          border-bottom:1px solid rgba(255,255,255,0.03);font-size:11px;
        }
        .aydt-hl-layer:last-child { border-bottom:none }
        .aydt-hl-layer-num { font-family:var(--mono);font-size:9px;font-weight:700;letter-spacing:0.1em;width:20px;flex-shrink:0 }
        .aydt-hl-layer-name { font-weight:600;color:var(--text-dim) }
        .aydt-hl-layer-desc { color:var(--muted);font-size:10px;margin-left:auto;text-align:right }
        .aydt-highlight-stat-row { display:flex;gap:16px;margin-top:14px }
        .aydt-highlight-stat {
          flex:1;text-align:center;padding:10px;background:#0c0c14;border-radius:8px;border:1px solid rgba(255,255,255,0.04);
        }
        .aydt-highlight-stat-num {
          font-family:var(--display);font-size:1.2rem;font-weight:900;font-style:italic;line-height:1;margin-bottom:3px;
        }
        .aydt-highlight-stat-label { font-size:9px;color:var(--muted);font-family:var(--mono);letter-spacing:0.08em }

        /* ── Chord canvas ── */
        .aydt-chord-wrap { background:#0c0c14;border-radius:10px;padding:20px 18px 16px }
        .aydt-chord-eye {
          font-family:var(--mono);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;
          color:var(--orange);font-weight:700;margin-bottom:14px;
        }
        .aydt-chord-canvas { display:block;width:100%;height:480px;cursor:default }
        .aydt-chord-stats { display:flex;gap:28px;justify-content:center;margin-top:14px }
        .aydt-chord-stat-val { font-family:var(--display);font-style:italic;font-size:1.25rem;font-weight:700;line-height:1 }
        .aydt-chord-stat-lbl {
          font-family:var(--mono);font-size:8px;letter-spacing:0.12em;text-transform:uppercase;
          color:var(--muted);font-weight:600;margin-top:4px;
        }

        /* ── Color palettes ── */
        .aydt-palette-block { margin-bottom:48px }
        .aydt-palette-block:last-child { margin-bottom:0 }
        .aydt-swatch-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:20px }
        @media(max-width:600px) { .aydt-swatch-grid { grid-template-columns:1fr 1fr } }
        .aydt-swatch-card { background:var(--surface);border:1px solid var(--border);border-radius:10px;overflow:hidden }
        .aydt-swatch-color { height:72px;width:100% }
        .aydt-swatch-info { padding:12px }
        .aydt-swatch-name { font-size:12px;font-weight:600;color:var(--text);margin-bottom:3px }
        .aydt-swatch-role { font-size:10px;color:var(--muted);line-height:1.5;margin-bottom:6px }
        .aydt-swatch-hex { font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:0.06em }

        /* ── Next card ── */
        .aydt-next-card {
          display:flex;align-items:center;justify-content:space-between;
          background:var(--surface);border:1px solid var(--border);border-radius:14px;
          padding:28px 32px;text-decoration:none;color:inherit;
          transition:border-color 0.2s,background 0.2s;
        }
        .aydt-next-card:hover { border-color:var(--border-md);background:var(--surface2) }
        .aydt-next-label { font-family:var(--mono);font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-bottom:6px }
        .aydt-next-title { font-family:var(--display);font-size:1.4rem;font-weight:700;color:var(--text);margin-bottom:4px }
        .aydt-next-sub { font-size:12px;color:var(--muted) }
        .aydt-next-arrow { font-size:1.5rem;color:var(--muted) }

        /* ── Todo placeholder ── */
        .aydt-todo-placeholder {
          border:2px dashed rgba(232,106,32,0.25);border-radius:10px;
          padding:24px;text-align:center;margin:16px 0;background:rgba(232,106,32,0.03);
        }
        .aydt-todo-placeholder-label {
          font-family:var(--mono);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;
          color:var(--orange);font-weight:700;margin-bottom:6px;
        }
        .aydt-todo-placeholder-desc { font-size:12px;color:var(--muted);line-height:1.6 }

        /* ── Demo embed ── */
        .aydt-demo-embed { border:1px solid var(--border);border-radius:10px;overflow:hidden;background:#0c0c14;margin-bottom:20px }
        .aydt-demo-embed-bar {
          display:flex;align-items:center;gap:10px;padding:10px 16px;
          background:var(--surface);border-bottom:1px solid var(--border);
        }
        .aydt-demo-embed-dot { width:7px;height:7px;border-radius:50%;background:var(--green) }
        .aydt-demo-embed-label { font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase }
        .aydt-demo-embed-body { padding:48px 24px;text-align:center }
      `}</style>

      <div className="aydt-root">

        {/* ══ HERO ════════════════════════════════════════════════ */}
        <section className="aydt-hero">
          <div className="aydt-hero-blob aydt-hero-blob-1" />
          <div className="aydt-hero-blob aydt-hero-blob-2" />
          <div className="aydt-hero-blob aydt-hero-blob-3" />
          <div className="aydt-hero-inner">
            <Link href="/#projects" className="aydt-back">← All Projects</Link>
            <div className="aydt-hero-eye">
              <span>American Youth Dance Theater</span>
              <span className="aydt-hero-eye-sep" />
              <span>2026</span>
            </div>
            <h1 className="aydt-hero-title">
              <span className="l1">Custom-built</span>
              <span className="l2">enrollment system.</span>
            </h1>
            <p className="aydt-hero-oneliner">Frontend, backend, pricing engine, and payments.</p>
          </div>
        </section>

        {/* ══ STATS STRIP ════════════════════════════════════════ */}
        <div className="aydt-stats-strip">
          <div className="aydt-stats-inner">
            {[
              { num: '~80%',    label: 'Net Profit Saved',        sub: '~$13K/yr in annual savings' },
              { num: '1,000+',  label: 'Active Users',            sub: 'During peak registration' },
              { num: '5',       label: 'Third-Party Integrations', sub: 'Payments, SMS, email, error tracking, caching' },
              { num: '3-Layer', label: 'Security Model',          sub: 'RLS, middleware, server-action guards' },
              { num: '65',      label: 'Tables in Production',    sub: '10 domain clusters' },
            ].map(s => (
              <div key={s.label} className="aydt-stat-block">
                <div className="aydt-stat-num">{s.num}</div>
                <div className="aydt-stat-label">{s.label}</div>
                <div className="aydt-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ PAGE CONTENT ═══════════════════════════════════════ */}
        <div className="aydt-page" style={{ paddingTop: 48 }}>

          {/* ── MOCK FRAMES ─────────────────────────────────────── */}
          <div className="aydt-section">
            <div className="aydt-mock-side-by-side">
              <div>
                <div className="aydt-eye" style={{ marginBottom: 12 }}>Client Portal</div>
                <div className="aydt-mock-frame">
                  <div className="aydt-mock-chrome">
                    <div className="aydt-mock-dots">
                      <div className="aydt-mock-dot aydt-mock-dot-r" /><div className="aydt-mock-dot aydt-mock-dot-y" /><div className="aydt-mock-dot aydt-mock-dot-g" />
                    </div>
                    <div className="aydt-mock-url">aydance.org</div>
                  </div>
                  <img className="aydt-mock-img" src="/aydt-portal-hero.png" alt="AYDT enrollment portal" />
                </div>
              </div>
              <div>
                <div className="aydt-eye" style={{ marginBottom: 12 }}>Admin Portal</div>
                <div className="aydt-mock-frame">
                  <div className="aydt-mock-chrome">
                    <div className="aydt-mock-dots">
                      <div className="aydt-mock-dot aydt-mock-dot-r" /><div className="aydt-mock-dot aydt-mock-dot-y" /><div className="aydt-mock-dot aydt-mock-dot-g" />
                    </div>
                    <div className="aydt-mock-url">admin.aydance.org</div>
                  </div>
                  <img className="aydt-mock-img" src="/aydt-admin-hero.png" alt="AYDT admin dashboard" />
                </div>
              </div>
            </div>
          </div>

          {/* ── METADATA ─────────────────────────────────────────── */}
          <div className="aydt-section aydt-two-col">
            <div className="aydt-detail-card">
              <div className="aydt-detail-label">Stack</div>
              <div className="aydt-tag-row">
                <span className="aydt-tag aydt-tag-orange">Next.js</span>
                <span className="aydt-tag">TypeScript</span>
                <span className="aydt-tag aydt-tag-green">Supabase</span>
                <span className="aydt-tag">Tailwind</span>
              </div>
            </div>
            <div className="aydt-detail-card">
              <div className="aydt-detail-label">Integrations</div>
              <div className="aydt-tag-row">
                {['Twilio SMS','Resend','Elavon','Sentry','Upstash Redis'].map(t => (
                  <span key={t} className="aydt-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── OVERVIEW HEADING ─────────────────────────────────── */}
          <div className="aydt-section">
            <div className="aydt-eye">Overview</div>
            <h2 className="aydt-section-title" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.5rem)' }}>Four engineering problems defined this build.</h2>
            <div className="aydt-section-rule" />
          </div>

          {/* ══ DEEP DIVES ════════════════════════════════════════ */}
          <div className="aydt-section">

            {/* 01 — Domain Model */}
            <DeepDive
              id="dd-refactor" num="01"
              title="Getting the Domain Model Right"
              hook="5 schema migrations in days. Pricing rules and enrollment constraints co-evolved faster than anticipated."
              open={openDD.has('dd-refactor')}
              onToggle={() => toggleDD('dd-refactor')}
            >
              <div className="aydt-phase-label aydt-pl-context" style={{ marginTop: 24 }}>Context</div>
              <p className="aydt-prose" style={{ maxWidth: 720, marginBottom: 20 }}>
                The client&apos;s domain understanding was still evolving during the build. Pricing rules, enrollment constraints, and fee configuration all shifted within a compressed window. Every migration had to leave existing data valid.
              </p>

              {/* Migration timeline */}
              <div style={{ background: '#0c0c14', borderRadius: 12, padding: 28, marginBottom: 24 }}>
                <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1rem,2vw,1.4rem)', fontWeight: 700, color: 'var(--orange)', marginBottom: 18 }}>Migration Trail</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 1, background: 'rgba(232,106,32,0.15)' }} />
                  {[
                    { name: 'hybrid_pricing_model', color: 'var(--orange)', bg: 'rgba(232,106,32,0.15)', desc: 'Added progressive discount bands alongside fixed-cost programs. Required updating the computation engine to handle both paths.' },
                    { name: 'per_day_enrollment', color: 'var(--orange)', bg: 'rgba(232,106,32,0.15)', desc: 'Shifted the registrable unit from sessions to classes with per-day scheduling. Required updating time-conflict trigger logic.' },
                    { name: 'fix_discount_rule_sessions_fk_conflict', color: 'var(--pink)', bg: 'rgba(200,52,136,0.2)', desc: 'First attempt at linking discount rules to sessions created an ambiguous FK path. See callout below.' },
                    { name: 'tuition_engine', color: 'var(--orange)', bg: 'rgba(232,106,32,0.15)', desc: "Rewired the pricing computation to read from the new hybrid model. Can't add discount bands without also updating the engine." },
                    { name: 'extended_fee_config', color: 'var(--orange)', bg: 'rgba(232,106,32,0.15)', desc: 'Added conditional fee rules (costume per-class, video by level, registration exemptions). Depended on the corrected discount FK structure.' },
                  ].map(m => (
                    <div key={m.name} style={{ display: 'grid', gridTemplateColumns: '16px 1fr', gap: 14, padding: '10px 0', alignItems: 'start' }}>
                      <div style={{ width: 15, height: 15, borderRadius: '50%', background: m.bg, border: `2px solid ${m.color}`, marginTop: 2, position: 'relative', zIndex: 1 }} />
                      <div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: m.color, fontWeight: 700, marginBottom: 3 }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text)', lineHeight: 1.6 }}>{m.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FK conflict callout */}
              <div style={{ background: 'rgba(200,52,136,0.04)', border: '1px solid rgba(200,52,136,0.15)', borderRadius: 10, padding: 20, marginBottom: 24, maxWidth: 720 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--pink)', fontWeight: 700, letterSpacing: '0.12em', marginBottom: 10 }}>FK CONFLICT — THE TWO-STEP FIX</div>
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7, marginBottom: 12 }}>The first migration linking discount rules to sessions created an ambiguous foreign key path — two different routes from discount rules to the same sessions table. Postgres accepted it, but queries became unpredictable depending on which path the planner chose.</div>
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7, marginBottom: 12 }}>A follow-up migration (<code style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--pink)' }}>fix_discount_rule_sessions_duplicate_fk</code>) resolved the ambiguity by collapsing to a single FK path. In a live system, the first migration would have meant silent data corruption. In a migration-driven schema, it was a recoverable two-step correction with a full audit trail.</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.6, paddingTop: 8, borderTop: '1px solid rgba(200,52,136,0.1)' }}><strong style={{ color: 'var(--pink)' }}>The lesson:</strong> The cost of being wrong is determined by your tooling, not your planning. RLS policies continued enforcing data boundaries through every migration. The schema evolved; the security guarantees didn&apos;t.</div>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                {[
                  { num: '5', color: 'var(--orange)', label: 'Schema Migrations',     sub: 'Within days of each other' },
                  { num: '0', color: 'var(--green)',  label: 'Data Integrity Breaks', sub: 'Every migration left existing data valid' },
                  { num: '65',color: 'var(--blue)',   label: 'Tables in Production',  sub: 'RLS enforced through every change' },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center', padding: 20, background: '#0c0c14', borderRadius: 10, border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ fontFamily: 'var(--display)', fontSize: '2rem', fontWeight: 900, fontStyle: 'italic', color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dim)', marginBottom: 2 }}>{s.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </DeepDive>

            <div style={{ maxWidth: 720, margin: '8px 0 20px', paddingLeft: 4 }}>
              <p className="aydt-prose" style={{ fontStyle: 'italic', color: 'var(--muted)' }}>Once the schema was stable, the pricing engine could be built.</p>
            </div>

            {/* 02 — Pricing Engine */}
            <DeepDive
              id="dd-fee" num="02"
              title="A Complex Pricing Engine"
              hook="Server-side pricing for 1,000+ families. Three calculation paths, no room for error."
              open={openDD.has('dd-fee')}
              onToggle={() => toggleDD('dd-fee')}
            >
              <div className="aydt-phase-label aydt-pl-context">Context</div>
              <p className="aydt-prose" style={{ maxWidth: 720, marginBottom: 12 }}>Before checkout completes, every item in the cart runs through a multi-step pricing pipeline:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20, maxWidth: 720 }}>
                {[
                  <>Calculated <strong style={{ color: 'var(--text)' }}>per student</strong>, across <strong style={{ color: 'var(--text)' }}>three possible pricing paths</strong></>,
                  <>Combined at the <strong style={{ color: 'var(--text)' }}>family level</strong> with additional discounts and fees</>,
                  <>Runs entirely <strong style={{ color: 'var(--text)' }}>server-side</strong></>,
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--orange)', fontWeight: 700, flexShrink: 0 }}>•</span>
                    <span style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Flow diagram */}
              <div style={{ background: '#0c0c14', borderRadius: 12, padding: 28, marginBottom: 24, overflowX: 'auto' }}>
                <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1rem,2vw,1.4rem)', fontWeight: 700, color: 'var(--orange)', marginBottom: 14 }}>Step 1 · Per-student calculation</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 0 }}>
                  {[
                    { path: 'Path 1', color: 'var(--orange)', bg: 'rgba(232,106,32,0.06)', border: 'rgba(232,106,32,0.18)', title: 'Tiered Rate Table', desc: 'By level and days per week. More days = lower per-class cost.' },
                    { path: 'Path 2', color: 'var(--pink)',   bg: 'rgba(200,52,136,0.06)', border: 'rgba(200,52,136,0.18)', title: 'Set Price for the Term', desc: 'Flat cost for specialty programs. Independent of rate tables.' },
                    { path: 'Path 3', color: 'var(--blue)',   bg: 'rgba(88,136,200,0.06)', border: 'rgba(88,136,200,0.18)', title: 'Admin Override', desc: 'Manual dollar amount. Bypasses all rate tables.' },
                  ].map(p => (
                    <div key={p.path} style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: 8, padding: 14, textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: p.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>{p.path}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{p.title}</div>
                      <div style={{ fontSize: 10, color: 'var(--muted)', lineHeight: 1.5 }}>{p.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, margin: '2px 0' }}>
                  {['rgba(232,106,32,0.3)','rgba(200,52,136,0.3)','rgba(88,136,200,0.3)'].map((c,i) => (
                    <div key={i} style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 18, color: c }}>↓</div>
                  ))}
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--muted)', textAlign: 'center', margin: '0 0 6px' }}>One student can hit multiple paths in the same checkout</div>
                <div style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 18, color: 'rgba(255,255,255,0.2)', padding: '2px 0' }}>↓</div>

                <div style={{ maxWidth: 420, margin: '0 auto' }}>
                  {[
                    { icon: '⤵', label: 'Student Tuition Resolved', bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.06)', color: 'var(--orange)', sub: null, badge: null },
                    { icon: '+', label: 'Fees', bg: 'rgba(232,106,32,0.04)', border: 'rgba(232,106,32,0.1)', color: 'var(--orange)', sub: 'Costume · Video · Registration', badge: 'exemptions' },
                    { icon: '−', label: 'Session Discounts', bg: 'rgba(45,185,155,0.04)', border: 'rgba(45,185,155,0.1)', color: 'var(--green)', sub: '% first, then $ on reduced amount', badge: 'order matters' },
                    { icon: '=', label: 'Student Subtotal', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.1)', color: 'var(--text)', sub: null, badge: null },
                  ].map((row, i) => (
                    <div key={i}>
                      {i > 0 && <div style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 18, color: 'rgba(255,255,255,0.2)', padding: '1px 0' }}>↓</div>}
                      <div style={{ background: row.bg, border: `1px solid ${row.border}`, borderRadius: 8, padding: '8px 14px', marginBottom: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 14, color: row.color, fontWeight: 700 }}>{row.icon}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)' }}>{row.label}</div>
                            {row.sub && <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 1 }}>{row.sub}</div>}
                          </div>
                          {row.badge && <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: `rgba(${row.color === 'var(--orange)' ? '232,106,32' : '45,185,155'},0.4)` }}>{row.badge}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ textAlign: 'center', marginTop: 10, padding: 6, borderTop: '1px dashed rgba(232,106,32,0.15)' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)' }}>↻ Repeat for next student in cart</div>
                  </div>
                </div>

                <div style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 20, color: 'rgba(255,255,255,0.2)', padding: '8px 0' }}>↓</div>

                <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1rem,2vw,1.4rem)', fontWeight: 700, color: 'var(--blue)', marginBottom: 14 }}>Step 2 · Family calculation</div>
                <div style={{ maxWidth: 420, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    { icon: 'Σ', color: 'var(--blue)',   bg: 'rgba(88,136,200,0.04)', border: 'rgba(88,136,200,0.1)',  label: 'Sum all student subtotals',      sub: null, badge: null },
                    { icon: '−', color: 'var(--green)',  bg: 'rgba(45,185,155,0.04)', border: 'rgba(45,185,155,0.1)', label: 'Family Discount',               sub: '$50 if 2+ students, once per term', badge: 'cross-txn' },
                    { icon: '+', color: 'var(--orange)', bg: 'rgba(232,106,32,0.04)', border: 'rgba(232,106,32,0.1)', label: 'Auto-Pay Admin Fee',             sub: '$5/month × installments, if auto-pay', badge: null },
                    { icon: '−', color: 'var(--green)',  bg: 'rgba(45,185,155,0.04)', border: 'rgba(45,185,155,0.1)', label: 'Coupon',                        sub: 'Applied last, validates caps + stackability', badge: 'gated' },
                  ].map((row, i) => (
                    <div key={i}>
                      {i > 0 && <div style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 18, color: 'rgba(255,255,255,0.2)' }}>↓</div>}
                      <div style={{ background: row.bg, border: `1px solid ${row.border}`, borderRadius: 8, padding: '8px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 14, color: row.color, fontWeight: 700 }}>{row.icon}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)' }}>{row.label}</div>
                            {row.sub && <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 1 }}>{row.sub}</div>}
                          </div>
                          {row.badge && <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'rgba(45,185,155,0.4)' }}>{row.badge}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 18, color: 'rgba(255,255,255,0.2)' }}>↓</div>
                  <div style={{ background: 'rgba(88,136,200,0.08)', border: '1px solid rgba(88,136,200,0.25)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--blue)', fontWeight: 700 }}>=</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', flex: 1 }}>Grand Total</div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--blue)', letterSpacing: '0.1em' }}>→ PAYMENT SCHEDULE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Worked example */}
              <div className="aydt-phase-label aydt-pl-proof">Example</div>
              <InnerCollapse
                id="ic-example"
                title="See the pricing engine in action"
                sub="A two-student, multi-path checkout walked through step by step."
                open={openIC.has('ic-example')}
                onToggle={() => toggleIC('ic-example')}
              >
                <div className="aydt-example-scenario" style={{ marginTop: 16 }}>
                  <div className="aydt-example-scenario-title">Scenario</div>
                  <div className="aydt-example-family">
                    <div className="aydt-example-dancer">
                      <div className="aydt-example-dancer-name">Sofia, 15 — Senior Division</div>
                      <div className="aydt-example-dancer-detail">3 standard classes: Ballet (Tue), Contemporary (Wed), Jazz (Thu)<br />1 special program: Technique<br />Enrollment: Full semester</div>
                    </div>
                    <div className="aydt-example-dancer">
                      <div className="aydt-example-dancer-name">Mateo, 9 — Junior Division</div>
                      <div className="aydt-example-dancer-detail">2 standard classes: Hip-Hop (Mon), Tap (Wed)<br />Enrollment: Full semester</div>
                    </div>
                  </div>
                </div>

                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 700, marginBottom: 16 }}>Engine evaluation — step by step</div>

                {/* Sofia */}
                <div className="aydt-ex-dancer-section">
                  <div className="aydt-ex-dancer-header">
                    <div className="aydt-ex-dancer-label">Sofia</div>
                    <div className="aydt-ex-dancer-division aydt-ex-div-senior">Senior</div>
                  </div>
                  <div className="aydt-ex-line">
                    <div className="aydt-ex-line-label">Tuition — tiered rate table<span>Senior, 3 distinct days — weekly_class_count = 3</span></div>
                    <div className="aydt-ex-line-val aydt-ex-val-base">$2,269.83</div>
                  </div>
                  <div className="aydt-callout"><strong>Why distinct days, not class count?</strong> The engine counts unique days of the week across all enrolled schedules. If Sofia took two classes on the same Tuesday, that&apos;s still weekly_class_count = 1 for pricing purposes. This prevents a student from being penalized with a higher rate tier for schedule density on a single day.</div>
                  <div className="aydt-callout aydt-callout-blue"><strong>Progressive pricing is real.</strong> 3× the single-class Senior rate would be 3 × $796.43 = $2,389.29. The tiered rate for weekly_class_count = 3 charges $2,269.83, a built-in $119.46 savings. The more classes per week, the lower the effective per-class cost.</div>
                  <div className="aydt-ex-line">
                    <div className="aydt-ex-line-label">Technique — fixed-cost program<span>Set price for the term. Bypasses rate tables and discounts entirely.</span></div>
                    <div className="aydt-ex-line-val aydt-ex-val-add">+$716.78</div>
                  </div>
                  <div className="aydt-callout"><strong>Two code paths, one student.</strong> Sofia&apos;s standard classes hit the tiered rate table path. Her Technique enrollment hits the fixed-cost program path. Both fire within the same per-student loop.</div>
                  <div className="aydt-ex-line">
                    <div className="aydt-ex-line-label">Costume fee<span>$65/class × 3 standard classes · Technique is exempt</span></div>
                    <div className="aydt-ex-line-val aydt-ex-val-add">+$195.00</div>
                  </div>
                  <div className="aydt-ex-line">
                    <div className="aydt-ex-line-label">Recital video fee<span>$15 flat · Senior only</span></div>
                    <div className="aydt-ex-line-val aydt-ex-val-add">+$15.00</div>
                  </div>
                  <div className="aydt-ex-line">
                    <div className="aydt-ex-line-label">Registration fee<span>$40/student · not discountable · not waived (has standard classes)</span></div>
                    <div className="aydt-ex-line-val aydt-ex-val-add">+$40.00</div>
                  </div>
                  <div className="aydt-ex-subtotal">
                    <div className="aydt-ex-subtotal-label">Sofia subtotal</div>
                    <div className="aydt-ex-subtotal-val">$3,236.61</div>
                  </div>
                </div>

                {/* Mateo */}
                <div className="aydt-ex-dancer-section">
                  <div className="aydt-ex-dancer-header">
                    <div className="aydt-ex-dancer-label">Mateo</div>
                    <div className="aydt-ex-dancer-division aydt-ex-div-junior">Junior</div>
                  </div>
                  <div className="aydt-ex-line">
                    <div className="aydt-ex-line-label">Tuition — tiered rate table<span>Junior, 2 distinct days — weekly_class_count = 2</span></div>
                    <div className="aydt-ex-line-val aydt-ex-val-base">$1,513.06</div>
                  </div>
                  <div className="aydt-callout aydt-callout-blue"><strong>Same progressive model.</strong> 2× the Junior single-class rate would be 2 × $775.93 = $1,551.86. The tiered rate charges $1,513.06, saving $38.80.</div>
                  <div className="aydt-ex-line">
                    <div className="aydt-ex-line-label">Costume fee<span>$55/class × 2 standard classes</span></div>
                    <div className="aydt-ex-line-val aydt-ex-val-add">+$110.00</div>
                  </div>
                  <div className="aydt-ex-line">
                    <div className="aydt-ex-line-label">Recital video fee<span>Junior division — not applicable</span></div>
                    <div className="aydt-ex-line-val aydt-ex-val-exempt">—</div>
                  </div>
                  <div className="aydt-ex-line">
                    <div className="aydt-ex-line-label">Registration fee<span>$40/student · not discountable</span></div>
                    <div className="aydt-ex-line-val aydt-ex-val-add">+$40.00</div>
                  </div>
                  <div className="aydt-ex-subtotal">
                    <div className="aydt-ex-subtotal-label">Mateo subtotal</div>
                    <div className="aydt-ex-subtotal-val">$1,663.06</div>
                  </div>
                </div>

                {/* Family aggregation */}
                <div className="aydt-ex-family-section">
                  <div className="aydt-ex-family-header">Family-level aggregation</div>
                  <div className="aydt-ex-line">
                    <div className="aydt-ex-line-label">Combined dancer subtotals<span>$3,236.61 + $1,663.06</span></div>
                    <div className="aydt-ex-line-val aydt-ex-val-base">$4,899.67</div>
                  </div>
                  <div className="aydt-ex-line">
                    <div className="aydt-ex-line-label">Family discount<span>2+ dancers enrolled · first confirmed registration this semester</span></div>
                    <div className="aydt-ex-line-val aydt-ex-val-sub">−$50.00</div>
                  </div>
                  <div className="aydt-callout aydt-callout-green"><strong>Cross-transaction eligibility check.</strong> The family discount isn&apos;t just &ldquo;2+ dancers in cart.&rdquo; Before applying, the engine queries all prior confirmed registration batches for this family and semester. If any prior batch already received the discount, it&apos;s not awarded again. This is enforced at the database level, not the cart level.</div>
                  <div className="aydt-ex-line">
                    <div className="aydt-ex-line-label">Coupon / promo code<span>None applied · validated last, after all other discounts</span></div>
                    <div className="aydt-ex-line-val aydt-ex-val-exempt">—</div>
                  </div>
                  <div className="aydt-ex-grand-total">
                    <div className="aydt-ex-grand-label">Cart total — server-validated</div>
                    <div className="aydt-ex-grand-val">$4,849.67</div>
                  </div>
                </div>
              </InnerCollapse>

              <div className="aydt-phase-label aydt-pl-proof" style={{ marginTop: 24 }}>Code · Demo</div>
              <div className="aydt-todo-placeholder">
                <div className="aydt-todo-placeholder-label">Annotated code snippet + screen recording</div>
                <div className="aydt-todo-placeholder-desc">The convergence point where rate tables, fees, and discounts resolve into a cart total. 60–90 second screen capture in demo environment.</div>
              </div>
            </DeepDive>

            <div style={{ maxWidth: 720, margin: '8px 0 20px', paddingLeft: 4 }}>
              <p className="aydt-prose" style={{ fontStyle: 'italic', color: 'var(--muted)' }}>A deterministic pricing engine is only useful if you can actually collect the money.</p>
            </div>

            {/* 03 — Secure Payments */}
            <DeepDive
              id="dd-security" num="03"
              title="Secure Payments"
              hook="Real payments, concurrent webhooks, children's data. A four-layer flow with security at every checkpoint."
              open={openDD.has('dd-security')}
              onToggle={() => toggleDD('dd-security')}
            >
              <div className="aydt-phase-label aydt-pl-context" style={{ marginTop: 24 }}>Context</div>
              <p className="aydt-prose" style={{ maxWidth: 720, marginBottom: 16 }}>
                This isn&apos;t a Stripe integration. The payment processor is <strong>Elavon&apos;s EPG</strong>, a bank-grade gateway used by enterprise and institutional clients. No SDK. HTTP Basic auth with a merchant alias.{' '}
                <span className="aydt-tooltip-wrap">HATEOAS
                  <span className="aydt-tooltip-card">
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--orange)', fontWeight: 700, letterSpacing: '0.08em', display: 'block', marginBottom: 4 }}>Hypermedia as the Engine of Application State</span>
                    <span style={{ fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.5, display: 'block' }}>A REST pattern where API responses include links to related resources. The client navigates by following those links rather than constructing URLs. Each step returns the href needed for the next.</span>
                  </span>
                </span>-style resource references.
              </p>

              <div style={{ background: '#0c0c14', borderRadius: 10, padding: '18px 20px', marginBottom: 28, maxWidth: 720 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 700, marginBottom: 10 }}>Why this matters</div>
                {[
                  'No SDK. Every API call is a raw HTTP request.',
                  <>Stored payment methods are live <code style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)' }}>href</code> pointers into Elavon&apos;s system.</>,
                  'Strict creation order: shopper → stored method → transaction. Partial failures require rollback.',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginBottom: i < 2 ? 6 : 0 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--orange)', fontWeight: 700, flexShrink: 0 }}>•</span>
                    <span style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* 4-layer horizontal overview */}
              <div className="aydt-phase-label aydt-pl-decision">Payment flow</div>
              <p className="aydt-prose" style={{ maxWidth: 720, marginBottom: 20 }}>The payment flow is four layers deep. Each layer has a security checkpoint.</p>
              <div style={{ background: '#0c0c14', borderRadius: 12, padding: 28, marginBottom: 32 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr', gap: 0, alignItems: 'stretch' }}>
                  {[
                    { layer: 'Layer 1', title: 'API Client',        color: 'var(--green)',  bg: 'rgba(45,185,155,0.04)',  border: 'rgba(45,185,155,0.12)' },
                    { layer: 'Layer 2', title: 'Session Creation',  color: 'var(--orange)', bg: 'rgba(232,106,32,0.04)', border: 'rgba(232,106,32,0.12)' },
                    { layer: 'Layer 3', title: 'Webhook Handler',   color: 'var(--pink)',   bg: 'rgba(200,52,136,0.04)', border: 'rgba(200,52,136,0.12)' },
                    { layer: 'Layer 4', title: 'Auto-Charge',       color: 'var(--blue)',   bg: 'rgba(88,136,200,0.04)', border: 'rgba(88,136,200,0.12)' },
                  ].flatMap((l, i) => [
                    <div key={l.layer} style={{ position: 'relative', background: l.bg, border: `1px solid ${l.border}`, borderRadius: 8, padding: '14px 12px', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: l.color }} />
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: l.color, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>{l.layer}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{l.title}</div>
                    </div>,
                    ...(i < 3 ? [<div key={`arr-${i}`} style={{ display: 'flex', alignItems: 'center', padding: '0 6px', fontFamily: 'var(--mono)', fontSize: 14, color: 'rgba(255,255,255,0.15)' }}>→</div>] : []),
                  ])}
                </div>
              </div>

              {/* Layer details */}
              {[
                {
                  num: 'Layer 1', title: 'API Client', color: 'var(--green)', badge: 'CREDENTIALS NEVER LEAVE SERVER',
                  badgeBg: 'rgba(45,185,155,0.1)', badgeBorder: 'rgba(45,185,155,0.2)',
                  body: 'Server-only. Auth built fresh per-request from env vars. Structured error parsing for processor-specific failure codes.',
                },
                {
                  num: 'Layer 2', title: 'Session Creation', color: 'var(--orange)', badge: 'SERVER-SIDE AMOUNT VALIDATION',
                  badgeBg: 'rgba(232,106,32,0.1)', badgeBorder: 'rgba(232,106,32,0.2)',
                  body: <>Server re-reads the batch from the database and rejects any mismatch &gt; $0.01. Client-submitted total is never trusted. Existing pending sessions are reused, not duplicated.<br /><br /><span style={{ fontSize: 10, color: 'var(--text-dim)', display: 'block', marginTop: 8, padding: '8px 12px', background: 'rgba(232,106,32,0.04)', borderLeft: '2px solid rgba(232,106,32,0.3)', borderRadius: '0 6px 6px 0' }}><strong style={{ color: 'var(--orange)' }}>Key decision:</strong> <code style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--orange)' }}>doCapture: false</code> on installments. Separates card collection from charging.</span></>,
                },
              ].map(l => (
                <div key={l.num} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, marginBottom: 24 }}>
                  <div style={{ textAlign: 'center', paddingTop: 2 }}>
                    <div style={{ fontFamily: 'var(--display)', fontSize: '1.3rem', fontWeight: 900, fontStyle: 'italic', color: l.color, lineHeight: 1 }}>{l.num}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginTop: 4 }}>{l.title}</div>
                  </div>
                  <div>
                    <div style={{ display: 'inline-block', padding: '3px 10px', background: l.badgeBg, border: `1px solid ${l.badgeBorder}`, borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 9, color: l.color, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 8 }}>{l.badge}</div>
                    <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7 }}>{l.body}</div>
                  </div>
                </div>
              ))}

              {/* Layer 3 — webhook */}
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, marginBottom: 8 }}>
                <div style={{ textAlign: 'center', paddingTop: 2 }}>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '1.3rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--pink)', lineHeight: 1 }}>Layer 3</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginTop: 4 }}>Webhook Handler</div>
                </div>
                <div>
                  <div style={{ display: 'inline-block', padding: '3px 10px', background: 'rgba(200,52,136,0.1)', border: '1px solid rgba(200,52,136,0.2)', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--pink)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 8 }}>FOUR SECURITY CHECKS BEFORE BUSINESS LOGIC</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                    {[
                      <><strong style={{ color: 'var(--pink)' }}>Timing-safe auth.</strong> <code style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)' }}>crypto.timingSafeEqual</code> prevents credential brute-forcing via response time.</>,
                      <><strong style={{ color: 'var(--pink)' }}>Never trusts the payload.</strong> Re-fetches full transaction from processor&apos;s API with server credentials.</>,
                      <><strong style={{ color: 'var(--pink)' }}>Replay protection.</strong> Terminal-state webhooks acknowledged with 200, zero side effects.</>,
                      <><strong style={{ color: 'var(--pink)' }}>HTTP 201 ≠ approval.</strong> Processor returns 201 on declines. Handler checks <code style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--orange)' }}>isAuthorized</code>, not status code.</>,
                    ].map((item, i) => (
                      <div key={i} style={{ fontSize: 11, color: 'var(--text)', lineHeight: 1.6 }}>{item}</div>
                    ))}
                  </div>
                  <InnerCollapse
                    id="ic-webhook-code"
                    title="See the webhook handler code"
                    sub="Timing-safe auth, payload re-fetch, and replay protection from route.ts"
                    open={openIC.has('ic-webhook-code')}
                    onToggle={() => toggleIC('ic-webhook-code')}
                  >
                    <div style={{ background: '#080a14', borderRadius: 8, padding: 20, marginTop: 16, overflowX: 'auto' }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', color: 'var(--pink)', fontWeight: 700, marginBottom: 14 }}>app/api/webhooks/epg/route.ts</div>
                      <pre style={{ fontFamily: 'var(--mono)', fontSize: 11, lineHeight: 1.85, whiteSpace: 'pre', color: 'var(--text-dim)', tabSize: 2, margin: 0 }}>{`// Node.js runtime enforced — edge lacks crypto.timingSafeEqual
export const runtime = "nodejs";

// Timing-safe auth comparison
const expectedBuf = Buffer.from(expected);
const actualBuf = Buffer.from(
  authHeader.padEnd(expected.length, "\\0").slice(0, expected.length),
);
authValid =
  expectedBuf.length === Buffer.from(authHeader).length &&
  crypto.timingSafeEqual(expectedBuf, actualBuf);

// Never trust the notification body — always re-fetch
let transaction;
try {
  transaction = await fetchEpgTransaction(resource);
} catch (err) {
  return NextResponse.json(
    { error: "Failed to fetch transaction" },
    { status: 500 }
  );
}

// Terminal state replay protection
const terminalStates = [
  "authorized", "captured", "settled",
  "declined", "voided", "refunded"
];
if (terminalStates.includes(payment.state)) {
  return NextResponse.json({ ok: true });
}`}</pre>
                    </div>
                  </InnerCollapse>
                  <div style={{ background: 'rgba(232,106,32,0.04)', border: '1px solid rgba(232,106,32,0.12)', borderRadius: 10, padding: 14, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 12, alignItems: 'center', marginTop: 12 }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 18, color: 'var(--orange)', fontWeight: 700 }}>⚡</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Webhook as Sole Writer</div>
                      <div style={{ fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.6 }}>The browser redirect is <strong style={{ color: 'var(--text)' }}>untrusted</strong>. No registration can be confirmed without an authorized payment event from the processor.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 18, color: 'rgba(255,255,255,0.12)', margin: '4px 0 12px 60px' }}>↓</div>

              {/* Layer 4 */}
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, marginBottom: 24 }}>
                <div style={{ textAlign: 'center', paddingTop: 2 }}>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '1.3rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--blue)', lineHeight: 1 }}>Layer 4</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginTop: 4 }}>Auto-Charge</div>
                </div>
                <div>
                  <div style={{ display: 'inline-block', padding: '3px 10px', background: 'rgba(88,136,200,0.1)', border: '1px solid rgba(88,136,200,0.2)', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--blue)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 8 }}>3-STRIKE CAP · ADMIN ESCALATION</div>
                  <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7 }}>Deno edge function finds overdue installments, attempts auto-charge, sends admin summaries. After 3 failed attempts, escalates to admin review. SMS notifications to opted-in parents via Twilio.</div>
                </div>
              </div>

              {/* Test stats */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
                {[
                  { num: '42',   label: 'Unit tests',               color: 'var(--green)' },
                  { num: '100%', label: 'Payment path coverage',    color: 'var(--green)' },
                  { num: '0',    label: 'Duplicate confirmations',   color: 'var(--green)' },
                ].map(s => (
                  <div key={s.label} style={{ flex: 1, textAlign: 'center', padding: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
                    <div style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 900, fontStyle: 'italic', color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Security model */}
              <InnerCollapse
                id="ic-security"
                title="Three-layer data security model"
                sub="Defense-in-depth for children's enrollment data. Three independent enforcement points."
                open={openIC.has('ic-security')}
                onToggle={() => toggleIC('ic-security')}
              >
                <div style={{ background: '#0c0c14', borderRadius: 12, padding: 28, marginTop: 16 }}>
                  {[
                    { level: 'L1', sub: 'DATABASE',   color: 'var(--pink)',   bg: 'rgba(200,52,136,0.04)', border: 'rgba(200,52,136,0.12)', title: 'Postgres Row-Level Security', desc: "Parents only query their own family's rows. Admins only access their studio's data.", catchLabel: 'catches\nbad queries', radius: '10px 10px 0 0', borderBottom: 'none' },
                    { level: 'L2', sub: 'MIDDLEWARE', color: 'var(--orange)', bg: 'rgba(232,106,32,0.04)', border: 'rgba(232,106,32,0.12)', title: 'Next.js Navigation Guards', desc: 'Every route transition verifies role and session before the page renders.', catchLabel: 'catches\nURL manipulation', radius: 0, borderBottom: 'none' },
                    { level: 'L3', sub: 'ACTION',     color: 'var(--blue)',   bg: 'rgba(88,136,200,0.04)', border: 'rgba(88,136,200,0.12)', title: 'Server-Action Guards', desc: 'Every sensitive mutation re-verifies identity and permissions before executing.', catchLabel: 'catches\nprivilege escalation', radius: '0 0 10px 10px', borderBottom: undefined },
                  ].map(l => (
                    <div key={l.level} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 16, alignItems: 'center', padding: '16px 18px', background: l.bg, border: `1px solid ${l.border}`, borderRadius: l.radius, borderBottom: l.borderBottom }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--display)', fontSize: '1.3rem', fontWeight: 900, fontStyle: 'italic', color: l.color, lineHeight: 1 }}>{l.level}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 7, color: l.color, letterSpacing: '0.12em', marginTop: 2 }}>{l.sub}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{l.title}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>{l.desc}</div>
                      </div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: `rgba(${l.color === 'var(--pink)' ? '200,52,136' : l.color === 'var(--orange)' ? '232,106,32' : '88,136,200'},0.4)`, textAlign: 'right', whiteSpace: 'pre' }}>{l.catchLabel}</div>
                    </div>
                  ))}
                  <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 8, fontSize: 10, color: 'var(--muted)', lineHeight: 1.7 }}>
                    <strong style={{ color: 'var(--text-dim)' }}>Why not just one?</strong> Middleware alone doesn&apos;t protect against direct API calls. RLS alone doesn&apos;t prevent unauthorized navigation. Server-action guards alone don&apos;t stop data leakage through read paths.
                  </div>
                </div>
              </InnerCollapse>
            </DeepDive>

            <div style={{ maxWidth: 720, margin: '8px 0 20px', paddingLeft: 4 }}>
              <p className="aydt-prose" style={{ fontStyle: 'italic', color: 'var(--muted)' }}>Pricing and payments solved, the hardest concurrency problem remained.</p>
            </div>

            {/* 04 — Seat Reservation */}
            <DeepDive
              id="dd-concurrency" num="04"
              title="A Multi-Step Registration Flow"
              hook="Concurrent enrollment without race conditions. Seat integrity lives in the database."
              open={openDD.has('dd-concurrency')}
              onToggle={() => toggleDD('dd-concurrency')}
            >
              <div className="aydt-phase-label aydt-pl-context" style={{ marginTop: 24 }}>Context</div>
              <p className="aydt-prose" style={{ maxWidth: 720, marginBottom: 20 }}>
                Registration is a multi-step flow. A family shouldn&apos;t lose their spot while filling out a payment form. But you can&apos;t reserve spots indefinitely — abandoned carts would lock out real registrations. And two families can&apos;t both hold the last spot in a class.
              </p>

              {/* 4-layer seat protection */}
              <div style={{ background: '#0c0c14', borderRadius: 12, padding: 28, marginBottom: 24 }}>
                <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1rem,2vw,1.4rem)', fontWeight: 700, color: 'var(--orange)', marginBottom: 18 }}>Four-Layer Seat Protection</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    { num: 'Layer 1', title: 'Timed Holds',    color: 'var(--orange)', bg: 'rgba(232,106,32,0.04)', border: 'rgba(232,106,32,0.12)', badge: '15-MINUTE CHECKOUT WINDOW', badgeBg: 'rgba(232,106,32,0.1)', badgeBorder: 'rgba(232,106,32,0.2)', radius: '10px 10px 0 0', body: <><code style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)' }}>pending_payment</code> status and a <code style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)' }}>hold_expires_at</code> timestamp written at checkout start. The spot is theirs while they&apos;re in the flow.</> },
                    { num: 'Layer 2', title: 'Overlap Trigger', color: 'var(--pink)', bg: 'rgba(200,52,136,0.04)', border: 'rgba(200,52,136,0.12)', badge: 'POSTGRES TRIGGER ON EVERY INSERT', badgeBg: 'rgba(200,52,136,0.1)', badgeBorder: 'rgba(200,52,136,0.2)', radius: 0, body: 'Checks for schedule overlap (same day, overlapping time) against confirmed registrations and non-expired holds. If it only checked confirmed rows, two families could both get holds on the same spot simultaneously.' },
                    { num: 'Layer 3', title: 'Hold Expiry',    color: 'var(--blue)',   bg: 'rgba(88,136,200,0.04)', border: 'rgba(88,136,200,0.12)',  badge: 'PG_CRON EVERY 5 MINUTES',          badgeBg: 'rgba(88,136,200,0.1)',  badgeBorder: 'rgba(88,136,200,0.2)',  radius: 0, body: 'Expires stale holds and cascade-fails their parent batches atomically. Abandoned checkouts free their spots within 5 minutes.' },
                    { num: 'Layer 4', title: 'Waitlist',        color: 'var(--green)',  bg: 'rgba(45,185,155,0.04)', border: 'rgba(45,185,155,0.12)', badge: 'AUTO-PROMOTE + NOTIFY',             badgeBg: 'rgba(45,185,155,0.1)', badgeBorder: 'rgba(45,185,155,0.2)', radius: '0 0 10px 10px', body: 'Detects newly freed spots, promotes the next waitlist entry, sets an invitation window, and notifies the family via email and SMS.' },
                  ].map(l => (
                    <div key={l.num} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, padding: '16px 18px', background: l.bg, border: `1px solid ${l.border}`, borderRadius: l.radius, borderBottom: l.radius === '0 0 10px 10px' ? undefined : 'none', alignItems: 'start' }}>
                      <div style={{ textAlign: 'center', paddingTop: 2 }}>
                        <div style={{ fontFamily: 'var(--display)', fontSize: '1.3rem', fontWeight: 900, fontStyle: 'italic', color: l.color, lineHeight: 1 }}>{l.num}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginTop: 4 }}>{l.title}</div>
                      </div>
                      <div>
                        <div style={{ display: 'inline-block', padding: '3px 10px', background: l.badgeBg, border: `1px solid ${l.badgeBorder}`, borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 9, color: l.color, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6 }}>{l.badge}</div>
                        <div style={{ fontSize: 11, color: 'var(--text)', lineHeight: 1.6 }}>{l.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 8, fontSize: 10, color: 'var(--muted)', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--text-dim)' }}>Each layer depends on the others.</strong> The trigger&apos;s correctness depends on the hold model. The cron job depends on the trigger being the sole gatekeeper. The waitlist depends on stale holds being cleaned up first. Remove any layer and the system degrades.
                </div>
              </div>

              {/* Validation engine */}
              <div className="aydt-phase-label aydt-pl-decision">Enrollment validation</div>
              <p className="aydt-prose" style={{ maxWidth: 720, marginBottom: 16 }}>Before a registration is written, every enrollment is validated against a configurable rule engine:</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16, maxWidth: 720 }}>
                {[
                  { title: 'Schedule Conflicts',   desc: 'Same day, overlapping time, against confirmed rows and active holds.' },
                  { title: 'Prerequisites',         desc: 'Cross-term prerequisite checks before advanced classes.' },
                  { title: 'Concurrent Enrollment', desc: 'Some classes require co-enrollment in another class.' },
                  { title: 'Teacher Gates',         desc: 'Instructor approval required before enrollment is confirmed.' },
                ].map(r => (
                  <div key={r.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{r.title}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.5 }}>{r.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(232,106,32,0.04)', borderLeft: '2px solid rgba(232,106,32,0.3)', borderRadius: '0 6px 6px 0', padding: '8px 12px', fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: 720, marginBottom: 24 }}>
                Each rule is configurable as <strong style={{ color: 'var(--text)' }}>hard-block</strong> or <strong style={{ color: 'var(--text)' }}>soft-warn</strong> with admin waiver support. Rules change between terms without code changes.
              </div>

              <div style={{ background: 'rgba(232,106,32,0.04)', border: '1px solid rgba(232,106,32,0.12)', borderRadius: 10, padding: 16, maxWidth: 720 }}>
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7 }}><strong>No application-level locking.</strong> No polling loop in the frontend. Failure recovery is fully automatic. The complexity lives where it belongs: in the database.</div>
              </div>
            </DeepDive>

            {/* Through-line */}
            <div style={{ maxWidth: 720, margin: '32px 0 0', padding: '32px 0', borderTop: '1px solid var(--border)' }}>
              <div className="aydt-eye">Through Line</div>
              <h2 className="aydt-section-title" style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', marginBottom: 16 }}>The database is the source of truth for everything that matters.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                {[
                  <>Pricing <strong style={{ color: 'var(--text)' }}>validated at the database on write</strong>, never trusted from the client</>,
                  <>Seat availability enforced by <strong style={{ color: 'var(--text)' }}>triggers and timed holds</strong>, not application locks</>,
                  <>Schema changes are <strong style={{ color: 'var(--text)' }}>versioned migrations</strong> with RLS enforced through every one</>,
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--orange)', fontWeight: 700, flexShrink: 0 }}>•</span>
                    <span style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <p className="aydt-prose">The alternative (trust the client, compute on the frontend, use application-level locks) would have been faster to build initially. But every one of these features has a failure mode that client-side logic can&apos;t catch: stale quotes, race conditions, partial payment failures, abandoned checkouts. Building at the database layer made each failure mode explicit, testable, and recoverable.</p>
            </div>

          </div>{/* end .aydt-section */}

          <div className="aydt-grad-rule" />

          {/* ── ENGINEERING HIGHLIGHTS ───────────────────────────── */}
          <div className="aydt-section">
            <div className="aydt-eye">Engineering Snapshots</div>
            <p className="aydt-prose" style={{ maxWidth: 720, marginBottom: 24, marginTop: 4 }}>Key technical implementations from the challenges above.</p>
            <div className="aydt-highlights-grid">

              <div className="aydt-highlight-card aydt-hc-green">
                <div className="aydt-highlight-eye">Payments · Reliability</div>
                <div className="aydt-highlight-title">Dual-Guard Idempotency</div>
                <div className="aydt-highlight-body">
                  Duplicate webhooks are caught by two independent guards: an application-level terminal state check and a database-level conditional UPDATE (<code style={{ fontFamily: 'var(--mono)', fontSize: 10 }}>WHERE status = &apos;pending&apos;</code>). The webhook is the sole writer of confirmation state.
                </div>
                <div className="aydt-highlight-stat-row">
                  <div className="aydt-highlight-stat"><div className="aydt-highlight-stat-num" style={{ color: 'var(--green)' }}>2</div><div className="aydt-highlight-stat-label">Guards</div></div>
                  <div className="aydt-highlight-stat"><div className="aydt-highlight-stat-num" style={{ color: 'var(--green)' }}>0</div><div className="aydt-highlight-stat-label">Duplicate confirmations</div></div>
                </div>
              </div>

              <div className="aydt-highlight-card aydt-hc-pink">
                <div className="aydt-highlight-eye">Security · Defense-in-Depth</div>
                <div className="aydt-highlight-title">Three-Layer Security Model</div>
                <div className="aydt-highlight-body">Three independent enforcement points for children&apos;s enrollment data. If any one layer is bypassed, the other two prevent unauthorized exposure.</div>
                <div className="aydt-highlight-mini-diagram">
                  <div className="aydt-hl-layer"><div className="aydt-hl-layer-num" style={{ color: 'var(--pink)' }}>L1</div><div className="aydt-hl-layer-name">Postgres RLS</div><div className="aydt-hl-layer-desc">Data isolation at the row level</div></div>
                  <div className="aydt-hl-layer"><div className="aydt-hl-layer-num" style={{ color: 'var(--orange)' }}>L2</div><div className="aydt-hl-layer-name">Next.js Middleware</div><div className="aydt-hl-layer-desc">Navigation guards per route</div></div>
                  <div className="aydt-hl-layer"><div className="aydt-hl-layer-num" style={{ color: 'var(--blue)' }}>L3</div><div className="aydt-hl-layer-name">Server-Action Guards</div><div className="aydt-hl-layer-desc">Permission re-check per mutation</div></div>
                </div>
              </div>

              <div className="aydt-highlight-card aydt-hc-orange">
                <div className="aydt-highlight-eye">Enrollment · Business Logic</div>
                <div className="aydt-highlight-title">Configurable Validation Engine</div>
                <div className="aydt-highlight-body">Every enrollment is validated against schedule conflicts, prerequisites, concurrent enrollment requirements, and teacher gates. Each rule is configurable as hard-block or soft-warn, with admin waiver support. Rules change between terms without code changes.</div>
                <div className="aydt-highlight-stat-row">
                  <div className="aydt-highlight-stat"><div className="aydt-highlight-stat-num" style={{ color: 'var(--orange)' }}>4</div><div className="aydt-highlight-stat-label">Rule types</div></div>
                  <div className="aydt-highlight-stat"><div className="aydt-highlight-stat-num" style={{ color: 'var(--orange)' }}>2</div><div className="aydt-highlight-stat-label">Enforcement modes</div></div>
                </div>
              </div>

              <div className="aydt-highlight-card aydt-hc-blue">
                <div className="aydt-highlight-eye">Quality · Testing</div>
                <div className="aydt-highlight-title">Payment Path Coverage</div>
                <div className="aydt-highlight-body">42 unit tests covering all payment terminal states, concurrent webhook delivery, and end-to-end confirmation flows. No untested path exists between a family&apos;s payment and their enrollment confirmation.</div>
                <div className="aydt-highlight-stat-row">
                  <div className="aydt-highlight-stat"><div className="aydt-highlight-stat-num" style={{ color: 'var(--blue)' }}>42</div><div className="aydt-highlight-stat-label">Unit tests</div></div>
                  <div className="aydt-highlight-stat"><div className="aydt-highlight-stat-num" style={{ color: 'var(--blue)' }}>100%</div><div className="aydt-highlight-stat-label">Payment paths</div></div>
                </div>
              </div>

            </div>
          </div>

          <div className="aydt-grad-rule" />

          {/* ── SCHEMA CHORD DIAGRAM ─────────────────────────────── */}
          <div className="aydt-section">
            <div className="aydt-eye">Architecture</div>
            <h2 className="aydt-section-title" style={{ marginBottom: 8 }}>Full Schema — 65 Tables, 10 Domains</h2>
            <div className="aydt-section-rule" style={{ marginBottom: 16 }} />
            <p className="aydt-prose" style={{ maxWidth: 720 }}>Every table in the production schema, organized by domain. Arcs are sized by table count. Chords show cross-domain foreign key coupling. Hover any arc to explore.</p>
            <div className="aydt-chord-wrap">
              <div className="aydt-chord-eye">65 tables · 10 domains · 40 cross-domain FK flows</div>
              <canvas ref={canvasRef} className="aydt-chord-canvas" />
              <div className="aydt-chord-stats">
                <div style={{ textAlign: 'center' }}><div className="aydt-chord-stat-val" style={{ color: 'var(--orange)' }}>65</div><div className="aydt-chord-stat-lbl">Tables</div></div>
                <div style={{ textAlign: 'center' }}><div className="aydt-chord-stat-val" style={{ color: 'var(--pink)' }}>10</div><div className="aydt-chord-stat-lbl">Domains</div></div>
                <div style={{ textAlign: 'center' }}><div className="aydt-chord-stat-val" style={{ color: 'var(--blue)' }}>40</div><div className="aydt-chord-stat-lbl">Cross-domain FKs</div></div>
              </div>
            </div>
          </div>

          {/* ── COLOR PALETTES ───────────────────────────────────── */}
          <div className="aydt-section">
            <div className="aydt-eye">Design Decisions</div>
            <h2 className="aydt-section-title" style={{ marginBottom: 8 }}>Palette &amp; Design Rationale</h2>
            <div className="aydt-section-rule" style={{ marginBottom: 24 }} />

            <div className="aydt-palette-block">
              <div className="aydt-eye" style={{ marginBottom: 10 }}>Client Portal</div>
              <p className="aydt-prose">The client portal leads with a near-black hero — it reads as a stage before the first word registers, placing the studio&apos;s 30-year identity front and center. The violet-to-rose gradient on &lsquo;Center Stage&rsquo; is the only decorative moment. Below, a cool lavender-tinted off-white grounds the enrollment flows.</p>
              <div className="aydt-swatch-grid">
                {[
                  { hex: '#18141c', name: 'Stage Black',   role: 'Hero background' },
                  { hex: '#b89af0', name: 'Stage Violet',  role: 'Gradient start' },
                  { hex: '#e882c2', name: 'Stage Rose',    role: 'Gradient end' },
                  { hex: '#f4f2f9', name: 'Portal Surface',role: 'Content background' },
                ].map(s => (
                  <div key={s.hex} className="aydt-swatch-card">
                    <div className="aydt-swatch-color" style={{ background: s.hex, border: s.hex === '#f4f2f9' ? '1px solid #ddd' : undefined }} />
                    <div className="aydt-swatch-info">
                      <div className="aydt-swatch-name">{s.name}</div>
                      <div className="aydt-swatch-role">{s.role}</div>
                      <div className="aydt-swatch-hex">{s.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="aydt-palette-block">
              <div className="aydt-eye" style={{ marginBottom: 10 }}>Admin Portal</div>
              <p className="aydt-prose">The admin surface flips to a light, high-contrast environment. Staff spending hours in the dashboard need legibility over atmosphere. Deep crimson anchors primary actions without competing with data-dense tables.</p>
              <div className="aydt-swatch-grid">
                {[
                  { hex: '#8b1a2c', name: 'Deep Crimson', role: 'Primary actions' },
                  { hex: '#f5f4f1', name: 'Light Bone',   role: 'Table backgrounds' },
                  { hex: '#1e2530', name: 'Dark Slate',   role: 'Data typography' },
                  { hex: '#ffffff', name: 'Clean White',  role: 'Content surfaces' },
                ].map(s => (
                  <div key={s.hex} className="aydt-swatch-card">
                    <div className="aydt-swatch-color" style={{ background: s.hex, border: (s.hex === '#f5f4f1' || s.hex === '#ffffff') ? '1px solid #ddd' : undefined }} />
                    <div className="aydt-swatch-info">
                      <div className="aydt-swatch-name">{s.name}</div>
                      <div className="aydt-swatch-role">{s.role}</div>
                      <div className="aydt-swatch-hex">{s.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="aydt-grad-rule" />

          {/* ── NEXT PROJECT ─────────────────────────────────────── */}
          <div className="aydt-section">
            <div className="aydt-eye" style={{ marginBottom: 20 }}>Up Next</div>
            <Link href="/projects/coaching-consulting-website" className="aydt-next-card">
              <div>
                <div className="aydt-next-label">Back to First · Web Design</div>
                <div className="aydt-next-title">Coaching &amp; Consulting</div>
                <div className="aydt-next-sub">Private practice website — Next.js · TypeScript · Tailwind · Sass</div>
              </div>
              <div className="aydt-next-arrow">→</div>
            </Link>
          </div>

        </div>{/* end .aydt-page */}
      </div>{/* end .aydt-root */}
    </>
  );
}
