"use client";
import { useRef, useEffect } from "react";

const FEE_STEPS = [
  { id: "01", label: "Division",         note: "Base tier lookup" },
  { id: "02", label: "Class Count",      note: "Volume adjustments" },
  { id: "03", label: "Semester Type",    note: "Annual vs. semester rate" },
  { id: "04", label: "Family Discounts", note: "Multi-dancer rules" },
  { id: "05", label: "Coupons",          note: "Promotional overrides" },
  { id: "06", label: "Auto Fees",        note: "Reg / recital / costume" },
];

const BACKEND_STATS = [
  { num: "65",   label: "Tables",           sub: "Purpose-built domain model" },
  { num: "3",    label: "Migration phases",  sub: "Clean → Seed → Email" },
  { num: "6",    label: "Fee rule layers",   sub: "Server-side resolution chain" },
];

/* ── Fee Engine ─────────────────────────────────────────── */
export function AydtFeeEngineDemo() {
  return (
    <div
      style={{
        background: "#0c0c14",
        padding: "28px 28px 24px",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Chain label */}
      <div
        style={{
          fontSize: 9,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#e86a20",
          fontWeight: 700,
          fontFamily: "var(--font-mono)",
          marginBottom: 20,
        }}
      >
        Resolution order — evaluated server-side before cart confirms
      </div>

      {/* Step chain */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 0,
          marginBottom: 28,
        }}
      >
        {FEE_STEPS.map((step) => (
          <div key={step.id} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                background: "rgba(232, 106, 32, 0.05)",
                border: "1px solid rgba(232, 106, 32, 0.15)",
                borderRadius: 8,
                padding: "10px 14px",
              }}
            >
              <div
                style={{
                  fontSize: 8,
                  color: "#e86a20",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                  marginBottom: 5,
                }}
              >
                {step.id}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#d8d8e8",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {step.label}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#55556a",
                  marginTop: 3,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {step.note}
              </div>
            </div>
            {/* Arrow */}
            <div
              style={{
                color: "#2a2a3c",
                fontSize: 13,
                padding: "0 7px",
                flexShrink: 0,
              }}
            >
              →
            </div>
          </div>
        ))}

        {/* Final node */}
        <div
          style={{
            background: "rgba(88, 136, 200, 0.06)",
            border: "1px solid rgba(88, 136, 200, 0.18)",
            borderRadius: 8,
            padding: "10px 14px",
          }}
        >
          <div
            style={{
              fontSize: 8,
              color: "#5888c8",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.12em",
              marginBottom: 5,
            }}
          >
            TOTAL
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#d8d8e8",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Cart Confirmed
          </div>
          <div
            style={{
              fontSize: 10,
              color: "#55556a",
              marginTop: 3,
              fontFamily: "var(--font-mono)",
            }}
          >
            Pre-checkout
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.04)",
          marginBottom: 22,
        }}
      />

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
        }}
      >
        {BACKEND_STATS.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: 8,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 900,
                fontStyle: "italic",
                fontFamily: "var(--font-display)",
                color: "#d8d8e8",
                lineHeight: 1,
                marginBottom: 5,
              }}
            >
              {stat.num}
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#7a7a90",
                marginBottom: 2,
              }}
            >
              {stat.label}
            </div>
            <div style={{ fontSize: 11, color: "#48485c" }}>{stat.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Schema Chord Diagram ───────────────────────────────── */
// 10 domain arcs sized by table count · chords = cross-domain FK weight

const CHORD_DOMAINS = [
  { name: "Identity & Accounts",    tables: 4,  color: "#5888c8" },
  { name: "Semester & Program",     tables: 9,  color: "#e86a20" },
  { name: "Class Structure",        tables: 13, color: "#8888a8" },
  { name: "Requirements & Access",  tables: 7,  color: "#d49020" },
  { name: "Enrollment & Reg",       tables: 6,  color: "#2db99b" },
  { name: "Auditions & Waitlist",   tables: 3,  color: "#9b5fdc" },
  { name: "Discounts & Pricing",    tables: 7,  color: "#c83488" },
  { name: "Payments",               tables: 4,  color: "#37c85f" },
  { name: "Email & Comms",          tables: 10, color: "#41b9dc" },
  { name: "Media",                  tables: 2,  color: "#73738c" },
];

// Cross-domain FK matrix [from][to] — derived from schema flows
const CHORD_MATRIX = [
  // iden  sem  cls  req  enr  aud  dis  pay  com  med
  [  0,    0,   0,   0,   6,   0,   0,   2,   0,   0  ], // Identity
  [  0,    0,   5,   0,   0,   0,   4,   0,   0,   0  ], // Semester
  [  0,    0,   0,   4,   4,   3,   0,   0,   0,   2  ], // Classes
  [  0,    0,   0,   0,   0,   0,   0,   0,   0,   0  ], // Requirements
  [  0,    0,   0,   0,   0,   0,   0,   4,   0,   0  ], // Enrollment
  [  0,    0,   0,   0,   0,   0,   0,   0,   0,   0  ], // Auditions
  [  0,    0,   0,   0,   3,   0,   0,   0,   0,   0  ], // Discounts
  [  0,    0,   0,   0,   0,   0,   0,   0,   0,   0  ], // Payments
  [  3,    0,   0,   0,   0,   0,   0,   0,   0,   0  ], // Comms
  [  0,    0,   0,   0,   0,   0,   0,   0,   0,   0  ], // Media
];

export function AydtSchemaConstellationDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoveredRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0;

    const totalTables = CHORD_DOMAINS.reduce((s, d) => s + d.tables, 0);
    const gap = 0.025;
    const totalAngle = 2 * Math.PI - gap * CHORD_DOMAINS.length;

    type Arc = typeof CHORD_DOMAINS[0] & {
      startAngle: number; endAngle: number; midAngle: number;
    };
    const arcs: Arc[] = [];
    let a = -Math.PI / 2;
    CHORD_DOMAINS.forEach(d => {
      const sweep = (d.tables / totalTables) * totalAngle;
      arcs.push({ ...d, startAngle: a, endAngle: a + sweep, midAngle: a + sweep / 2 });
      a += sweep + gap;
    });

    function angleInArc(angle: number, start: number, end: number) {
      const n = (x: number) => ((x % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const an = n(angle), sn = n(start), en = n(end);
      return sn <= en ? an >= sn && an <= en : an >= sn || an <= en;
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const R = Math.min(W, H) * 0.34;
      const arcW = 14;
      const hov = hoveredRef.current;

      // Chords
      for (let i = 0; i < arcs.length; i++) {
        for (let j = i + 1; j < arcs.length; j++) {
          const val = CHORD_MATRIX[i][j] + CHORD_MATRIX[j][i];
          if (!val) continue;
          const di = arcs[i], dj = arcs[j];
          const x1 = cx + Math.cos(di.midAngle) * (R - arcW / 2);
          const y1 = cy + Math.sin(di.midAngle) * (R - arcW / 2);
          const x2 = cx + Math.cos(dj.midAngle) * (R - arcW / 2);
          const y2 = cy + Math.sin(dj.midAngle) * (R - arcW / 2);
          const cpx = cx + (x1 + x2 - 2 * cx) * 0.12;
          const cpy = cy + (y1 + y2 - 2 * cy) * 0.12;

          let alpha = 0.11;
          if (hov !== null) alpha = hov === i || hov === j ? 0.55 : 0.025;

          const grad = ctx!.createLinearGradient(x1, y1, x2, y2);
          grad.addColorStop(0, di.color);
          grad.addColorStop(1, dj.color);
          ctx!.beginPath();
          ctx!.moveTo(x1, y1);
          ctx!.quadraticCurveTo(cpx, cpy, x2, y2);
          ctx!.strokeStyle = grad;
          ctx!.globalAlpha = alpha;
          ctx!.lineWidth = Math.max(1, val * 1.1);
          ctx!.stroke();
          ctx!.globalAlpha = 1;

          // FK count label on hovered chord
          if (hov !== null && (hov === i || hov === j) && alpha > 0.3) {
            const mx = (x1 + cpx * 2 + x2) / 4;
            const my = (y1 + cpy * 2 + y2) / 4;
            ctx!.font = '600 9px var(--font-mono, monospace)';
            ctx!.fillStyle = "rgba(232,232,245,0.75)";
            ctx!.textAlign = "center";
            ctx!.textBaseline = "middle";
            ctx!.fillText(`${val} FK`, mx, my);
          }
        }
      }

      // Arcs + labels
      arcs.forEach((d, i) => {
        const alpha = hov === null ? 0.9 : hov === i ? 1 : 0.18;

        if (hov === i) {
          ctx!.beginPath();
          ctx!.arc(cx, cy, R, d.startAngle, d.endAngle);
          ctx!.strokeStyle = d.color;
          ctx!.lineWidth = arcW + 14;
          ctx!.globalAlpha = 0.07;
          ctx!.stroke();
        }

        ctx!.globalAlpha = alpha;
        ctx!.beginPath();
        ctx!.arc(cx, cy, R, d.startAngle, d.endAngle);
        ctx!.strokeStyle = d.color;
        ctx!.lineWidth = arcW;
        ctx!.lineCap = "butt";
        ctx!.stroke();

        // Horizontal label — aligned left/right based on which half of circle
        const lr = R + arcW + 14;
        const lx = cx + Math.cos(d.midAngle) * lr;
        const ly = cy + Math.sin(d.midAngle) * lr;
        const onRight = Math.cos(d.midAngle) >= 0;
        ctx!.globalAlpha = 1;
        ctx!.textAlign = onRight ? "left" : "right";
        ctx!.textBaseline = "middle";
        ctx!.font = '600 10px var(--font-mono, monospace)';
        ctx!.fillStyle = hov === i ? d.color : `rgba(176,184,208,${hov === null ? 0.75 : 0.22})`;
        ctx!.fillText(d.name, lx, ly - 6);
        ctx!.font = '400 8px var(--font-mono, monospace)';
        ctx!.fillStyle = hov === i ? "rgba(232,232,245,0.55)" : `rgba(112,128,168,${hov === null ? 0.45 : 0.12})`;
        ctx!.fillText(`${d.tables} tables`, lx, ly + 7);

        // Info pill — only for hovered arc
        if (hov === i) {
          let fks = 0;
          for (let j = 0; j < arcs.length; j++) {
            if (j !== i) fks += CHORD_MATRIX[i][j] + CHORD_MATRIX[j][i];
          }
          const pillText = `${fks} cross-domain FKs`;
          ctx!.font = '500 9px var(--font-mono, monospace)';
          const tw = ctx!.measureText(pillText).width;
          const ph = 18, pw = tw + 16, pr = 4;
          const px = onRight ? lx : lx - pw;
          const py = ly + 18;
          // Background
          ctx!.beginPath();
          ctx!.roundRect(px, py, pw, ph, pr);
          ctx!.fillStyle = "rgba(20,24,48,0.92)";
          ctx!.fill();
          ctx!.strokeStyle = d.color;
          ctx!.globalAlpha = 0.35;
          ctx!.lineWidth = 1;
          ctx!.stroke();
          ctx!.globalAlpha = 1;
          // Text
          ctx!.textAlign = "center";
          ctx!.textBaseline = "middle";
          ctx!.fillStyle = d.color;
          ctx!.fillText(pillText, px + pw / 2, py + ph / 2);
        }
      });

    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.scale(dpr, dpr);
      draw();
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      const cx = W / 2, cy = H / 2;
      const dx = mx - cx, dy = my - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const R = Math.min(W, H) * 0.34;

      let next: number | null = null;
      if (dist > R - 18 && dist < R + 18) {
        const angle = Math.atan2(dy, dx);
        arcs.forEach((d, i) => { if (angleInArc(angle, d.startAngle, d.endAngle)) next = i; });
      }
      if (next !== hoveredRef.current) { hoveredRef.current = next; draw(); }
    }

    function onMouseLeave() { hoveredRef.current = null; draw(); }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    return () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <div style={{ background: "#0c0c14", padding: "20px 18px 16px", fontFamily: "var(--font-body)" }}>
      {/* Top label */}
      <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e86a20", fontWeight: 700, fontFamily: "var(--font-mono)", marginBottom: 14 }}>
        65 tables &nbsp;·&nbsp; 10 domains &nbsp;·&nbsp; 40 cross-domain FK flows — thicker chord = more coupling
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: 480, cursor: "default" }}
      />

      {/* Stats row */}
      <div style={{ display: "flex", gap: 28, justifyContent: "center", marginTop: 14 }}>
        {[
          { val: "65", label: "Tables",           color: "#e86a20" },
          { val: "10", label: "Domains",           color: "#c83488" },
          { val: "40", label: "Cross-domain FKs",  color: "#5888c8" },
        ].map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.25rem", fontWeight: 700, color: s.color, lineHeight: 1 }}>
              {s.val}
            </div>
            <div style={{ fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7080a8", fontWeight: 600, marginTop: 4 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
