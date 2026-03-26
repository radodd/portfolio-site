"use client";

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
        {FEE_STEPS.map((step, i) => (
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

// ─── Full Schema Constellation (all 65 tables) ────────────
// 10 domain clusters · 3-row layout · 8 cross-domain FK flows
//
// Row 1: Identity · Semester & Program · Class Structure · Requirements & Access
// Row 2:           Enrollment & Reg  ·  Auditions & Waitlist
// Row 3: Discounts · Payments · Email & Comms · Media

const CW = 870;    // canvas width
const CH = 740;    // canvas height
const ROW_H = 17;  // px per table row
const HDR_H = 36;  // card header height
const C_PAD = 16;  // card bottom padding
const cH = (n: number) => HDR_H + n * ROW_H + C_PAD;

// Domain color palette
const DC = {
  identity:   { b: "rgba(88,136,200,0.32)",   bg: "rgba(88,136,200,0.05)",   lb: "#5888c8",  ln: "rgba(88,136,200,0.5)"   },
  semester:   { b: "rgba(232,106,32,0.32)",   bg: "rgba(232,106,32,0.05)",   lb: "#e86a20",  ln: "rgba(232,106,32,0.5)"   },
  classes:    { b: "rgba(185,185,215,0.20)",  bg: "rgba(185,185,215,0.03)",  lb: "#8888a8",  ln: "rgba(185,185,215,0.38)" },
  reqs:       { b: "rgba(255,185,50,0.32)",   bg: "rgba(255,185,50,0.04)",   lb: "#d49020",  ln: "rgba(255,185,50,0.48)"  },
  enrollment: { b: "rgba(45,185,155,0.32)",   bg: "rgba(45,185,155,0.05)",   lb: "#2db99b",  ln: "rgba(45,185,155,0.48)"  },
  auditions:  { b: "rgba(155,95,220,0.32)",   bg: "rgba(155,95,220,0.05)",   lb: "#9b5fdc",  ln: "rgba(155,95,220,0.48)"  },
  discounts:  { b: "rgba(200,52,136,0.32)",   bg: "rgba(200,52,136,0.05)",   lb: "#c83488",  ln: "rgba(200,52,136,0.5)"   },
  payments:   { b: "rgba(55,200,95,0.32)",    bg: "rgba(55,200,95,0.05)",    lb: "#37c85f",  ln: "rgba(55,200,95,0.48)"   },
  comms:      { b: "rgba(65,185,220,0.32)",   bg: "rgba(65,185,220,0.05)",   lb: "#41b9dc",  ln: "rgba(65,185,220,0.48)"  },
  media:      { b: "rgba(115,115,140,0.25)",  bg: "rgba(115,115,140,0.03)",  lb: "#73738c",  ln: "rgba(115,115,140,0.3)"  },
} as const;
type DK = keyof typeof DC;

interface Domain { id: DK; label: string; tables: string[]; pos: [number, number]; w: number }

// Card heights (computed): cH(n) = 36 + n*17 + 16
// identity(4)=120  semester(9)=205  classes(13)=273  reqs(7)=171
// enrollment(6)=154  auditions(3)=103
// discounts(7)=171  payments(4)=120  comms(10)=222  media(2)=86
//
// Row gaps: row1 bottom = 20+273 = 293 → row2 top = 313
//           row2 bottom = 313+154 = 467 → row3 top = 487

const DOMAINS: Domain[] = [
  {
    id: "identity", label: "Identity & Accounts",
    tables: ["users", "families", "dancers", "authorized_pickups"],
    pos: [20, 20], w: 185,
  },
  {
    id: "semester", label: "Semester & Program",
    tables: ["semesters", "semester_fee_config", "semester_payment_plans",
             "semester_payment_installments", "semester_audit_logs",
             "special_program_tuition", "tuition_rate_bands",
             "semester_coupons", "semester_discounts"],
    pos: [220, 20], w: 195,
  },
  {
    id: "classes", label: "Class Structure",
    tables: ["classes", "class_schedules", "class_sessions",
             "class_schedule_excluded_dates", "class_session_excluded_dates",
             "class_session_options", "class_session_price_rows",
             "schedule_price_tiers", "session_groups", "session_group_sessions",
             "session_group_tags", "session_tags", "session_occurrence_dates"],
    pos: [430, 20], w: 215,
  },
  {
    id: "reqs", label: "Requirements & Access",
    tables: ["class_requirements", "class_requirement_approved_dancers",
             "requirement_waivers", "concurrent_enrollment_groups",
             "concurrent_enrollment_options", "class_invites", "invite_events"],
    pos: [660, 20], w: 185,
  },
  {
    id: "enrollment", label: "Enrollment & Registration",
    tables: ["registrations", "registration_batches", "registration_line_items",
             "registration_days", "schedule_enrollments", "batch_payment_installments"],
    pos: [220, 313], w: 200,
  },
  {
    id: "auditions", label: "Auditions & Waitlist",
    tables: ["audition_sessions", "audition_bookings", "waitlist_entries"],
    pos: [435, 313], w: 210,
  },
  {
    id: "discounts", label: "Discounts & Pricing",
    tables: ["discounts", "discount_rules", "discount_rule_schedules",
             "discount_rule_sessions", "discount_coupons",
             "coupon_redemptions", "coupon_session_restrictions"],
    pos: [20, 487], w: 195,
  },
  {
    id: "payments", label: "Payments",
    tables: ["payments", "stored_payment_methods", "shoppers", "family_account_credits"],
    pos: [230, 487], w: 185,
  },
  {
    id: "comms", label: "Email & Comms",
    tables: ["emails", "email_templates", "email_deliveries", "email_recipients",
             "email_recipient_selections", "email_activity_logs",
             "email_subscribers", "email_subscriptions",
             "notification_subscription_emails", "sms_notifications"],
    pos: [430, 487], w: 215,
  },
  {
    id: "media", label: "Media",
    tables: ["media_images", "media_folders"],
    pos: [660, 487], w: 170,
  },
];

// 8 cross-domain FK flows — hardcoded bezier paths + badge positions
// Each path: source domain → target domain, arrow at end
interface Flow { color: DK; path: string; badge: [number, number]; label: string }

const FLOWS: Flow[] = [
  // Semester.semester_id → Class Structure (5 FK refs: classes, schedules, sessions, etc.)
  { color: "semester",   path: "M 415,122 C 422,125 423,153 430,156", badge: [422, 140], label: "5 FK" },
  // Class Structure → Requirements & Access (4 FK refs: requirements, invites, etc.)
  { color: "classes",    path: "M 645,156 C 652,155 653,106 660,105", badge: [652, 131], label: "4 FK" },
  // Identity → Enrollment (6 FK refs: users, families, dancers → batches, registrations)
  { color: "identity",   path: "M 112,140 C 112,226 250,226 250,313", badge: [172, 220], label: "6 FK" },
  // Class Structure → Enrollment (4 FK refs: session_id, schedule_id)
  { color: "classes",    path: "M 520,293 C 520,303 380,303 380,313", badge: [448, 300], label: "4 FK" },
  // Class Structure → Auditions (3 FK refs: audition_sessions.class_id, etc.)
  { color: "auditions",  path: "M 548,293 C 548,303 540,303 540,313", badge: [544, 300], label: "3 FK" },
  // Enrollment → Payments (4 FK refs: batch_id, payment_method, etc.)
  { color: "payments",   path: "M 320,467 L 322,487",                  badge: [321, 477], label: "4 FK" },
  // Semester → Discounts (4 FK refs: semester_coupons, semester_discounts, rate_bands)
  // Routes left of Identity to avoid passing through Enrollment card
  { color: "semester",   path: "M 220,225 C 110,230 20,380 30,487",   badge: [88, 347],  label: "4 FK" },
  // Discounts → Enrollment (3 FK refs: coupon_redemptions.registration_batch_id)
  { color: "discounts",  path: "M 180,487 C 180,477 250,477 250,467", badge: [215, 481], label: "3 FK" },
];

/* ── Full Schema Constellation ──────────────────────────── */
export function AydtSchemaConstellationDemo() {
  return (
    <div style={{ background: "#0c0c14", padding: "22px 20px 18px", fontFamily: "var(--font-body)" }}>

      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14, gap: 12, flexWrap: "wrap" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e86a20", fontWeight: 700, fontFamily: "var(--font-mono)", flexShrink: 0 }}>
          65 tables &nbsp;·&nbsp; 10 domains &nbsp;·&nbsp; 8 cross-domain FK flows
        </div>
        {/* Legend */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px 12px", justifyContent: "flex-end" }}>
          {(Object.entries(DC) as [DK, typeof DC[DK]][]).map(([id, c]) => (
            <div key={id} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: c.lb, opacity: 0.8, flexShrink: 0 }} />
              <span style={{ fontSize: 9, color: "#404055", fontFamily: "var(--font-mono)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                {DOMAINS.find(d => d.id === id)?.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable canvas */}
      <div style={{ overflowX: "auto" }}>
        <div style={{ position: "relative", width: CW, height: CH, flexShrink: 0 }}>

          {/* SVG connection layer */}
          <svg width={CW} height={CH} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
            <defs>
              {(Object.entries(DC) as [DK, typeof DC[DK]][]).map(([id, c]) => (
                <marker key={id} id={`mk-${id}`} markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                  <path d="M 0 0.5 L 4.5 2.5 L 0 4.5 z" fill={c.lb} opacity="0.75" />
                </marker>
              ))}
            </defs>
            {FLOWS.map((f, i) => (
              <g key={i}>
                <path
                  d={f.path}
                  fill="none"
                  stroke={DC[f.color].ln}
                  strokeWidth={1.5}
                  markerEnd={`url(#mk-${f.color})`}
                />
                <g transform={`translate(${f.badge[0]}, ${f.badge[1]})`}>
                  <rect x="-14" y="-8" width="28" height="16" rx="3" fill="#0e0e1a" opacity="0.95" />
                  <text x="0" y="5" textAnchor="middle" fontSize="8" fill={DC[f.color].lb} fontFamily="monospace" fontWeight="700">
                    {f.label}
                  </text>
                </g>
              </g>
            ))}
          </svg>

          {/* Domain cluster cards */}
          {DOMAINS.map(d => {
            const c = DC[d.id];
            return (
              <div
                key={d.id}
                style={{
                  position: "absolute",
                  left: d.pos[0],
                  top: d.pos[1],
                  width: d.w,
                  background: c.bg,
                  border: `1px solid ${c.b}`,
                  borderRadius: 8,
                  overflow: "hidden",
                  zIndex: 2,
                }}
              >
                {/* Card header */}
                <div style={{
                  height: HDR_H,
                  padding: "0 9px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: `1px solid ${c.b}`,
                  gap: 5,
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, color: c.lb, letterSpacing: "0.05em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {d.label}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: c.lb, opacity: 0.55, background: `${c.lb}18`, padding: "2px 5px", borderRadius: 3, flexShrink: 0 }}>
                    {d.tables.length}
                  </span>
                </div>
                {/* Table list */}
                <div style={{ padding: "3px 9px 6px" }}>
                  {d.tables.map(t => (
                    <div key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#3a3a52", lineHeight: `${ROW_H}px`, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
