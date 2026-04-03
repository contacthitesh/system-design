import { useState } from "react";

const sections = [
  {
    id: "powers",
    icon: "⚡",
    title: "Powers of 2",
    subtitle: "The foundation of everything",
    color: "#00FF94",
    data: [
      { label: "2⁰", value: "1", note: "1 byte" },
      { label: "2⁸", value: "256", note: "1 byte max" },
      { label: "2¹⁰", value: "1,024", note: "~1 Thousand (KB)" },
      { label: "2¹⁶", value: "65,536", note: "64 KB" },
      { label: "2²⁰", value: "1,048,576", note: "~1 Million (MB)" },
      { label: "2³⁰", value: "1,073,741,824", note: "~1 Billion (GB)" },
      { label: "2³²", value: "4,294,967,296", note: "~4 Billion (IPv4 max)" },
      { label: "2⁴⁰", value: "1,099,511,627,776", note: "~1 Trillion (TB)" },
      { label: "2⁶⁴", value: "~1.8 × 10¹⁹", note: "Max 64-bit int" },
    ],
  },
  {
    id: "latency",
    icon: "⏱",
    title: "Latency Numbers",
    subtitle: "Every engineer must know these",
    color: "#FF6B35",
    data: [
      { label: "L1 cache ref", value: "0.5 ns", note: "Fastest possible" },
      { label: "Branch mispredict", value: "5 ns", note: "CPU pipeline flush" },
      { label: "L2 cache ref", value: "7 ns", note: "14× L1 cache" },
      { label: "Mutex lock/unlock", value: "25 ns", note: "Thread sync cost" },
      { label: "Main memory (RAM)", value: "100 ns", note: "200× L1 cache" },
      { label: "SSD random read", value: "100 µs", note: "0.1 ms" },
      { label: "HDD seek", value: "10 ms", note: "80,000× RAM" },
      { label: "Same DC round trip", value: "0.5 ms", note: "LAN network" },
      { label: "Cross-region (US)", value: "~40 ms", note: "US East ↔ West" },
      { label: "Cross-continent", value: "~150 ms", note: "US ↔ Europe" },
      { label: "TCP handshake", value: "1 RTT", note: "1 round trip" },
      { label: "TLS handshake", value: "2 RTT", note: "2 round trips" },
    ],
  },
  {
    id: "storage",
    icon: "💾",
    title: "Storage & Sizes",
    subtitle: "Bytes, fields, and object sizes",
    color: "#A78BFA",
    data: [
      { label: "char / byte", value: "1 B", note: "ASCII character" },
      { label: "int (32-bit)", value: "4 B", note: "Integer field" },
      { label: "long (64-bit)", value: "8 B", note: "ID, timestamp" },
      { label: "UUID / GUID", value: "16 B", note: "128-bit" },
      { label: "SHA-256 hash", value: "32 B", note: "256-bit" },
      { label: "IPv4 address", value: "4 B", note: "32-bit" },
      { label: "IPv6 address", value: "16 B", note: "128-bit" },
      { label: "Tweet (text)", value: "~280 B", note: "280 chars max" },
      { label: "Thumbnail image", value: "~100 KB", note: "JPEG compressed" },
      { label: "Web page (avg)", value: "~2 MB", note: "HTML+assets" },
      { label: "Photo (DSLR)", value: "~5–10 MB", note: "RAW file" },
      { label: "1-min MP4 video", value: "~50 MB", note: "720p compressed" },
      { label: "Movie (HD)", value: "~4 GB", note: "1080p H.264" },
    ],
  },
  {
    id: "throughput",
    icon: "🚀",
    title: "Throughput & Bandwidth",
    subtitle: "How fast data moves",
    color: "#38BDF8",
    data: [
      { label: "1 Gbps LAN", value: "125 MB/s", note: "Standard server NIC" },
      { label: "10 Gbps NIC", value: "1.25 GB/s", note: "High-perf server" },
      { label: "SSD read", value: "500 MB/s – 7 GB/s", note: "SATA vs NVMe" },
      { label: "HDD read", value: "~100–200 MB/s", note: "Sequential" },
      { label: "RAM bandwidth", value: "~50 GB/s", note: "DDR4 dual-channel" },
      { label: "Kafka throughput", value: "~100K–1M msg/s", note: "Per broker" },
      { label: "Redis throughput", value: "~100K ops/s", note: "Single threaded" },
      { label: "MySQL (simple query)", value: "~50K QPS", note: "With indexes" },
      { label: "Postgres (simple)", value: "~30–50K QPS", note: "Tuned config" },
      { label: "Nginx (static)", value: "~200K req/s", note: "Simple files" },
      { label: "gRPC", value: "~100K req/s", note: "Unary calls" },
    ],
  },
  {
    id: "scale",
    icon: "📊",
    title: "Scale & Traffic Math",
    subtitle: "DAU → QPS → Storage conversions",
    color: "#FB923C",
    data: [
      { label: "1M DAU", value: "~12 QPS avg", note: "If 1 req/user/day" },
      { label: "1M DAU", value: "~36 QPS", note: "3 req/user/day" },
      { label: "10M DAU", value: "~360 QPS avg", note: "3 req/user/day" },
      { label: "100M DAU", value: "~3,600 QPS avg", note: "3 req/user/day" },
      { label: "Peak QPS rule", value: "~2–3× avg", note: "Always add headroom" },
      { label: "Write:Read ratio", value: "1:100 typical", note: "Read-heavy systems" },
      { label: "1B rows × 1 KB", value: "~1 TB", note: "DB sizing baseline" },
      { label: "1B users × 10 KB", value: "~10 TB", note: "User profile store" },
      { label: "Twitter-scale", value: "~500M tweets/day", note: "~6K writes/s" },
      { label: "YouTube uploads", value: "~500 hrs video/min", note: "~8 hrs/sec" },
    ],
  },
  {
    id: "availability",
    icon: "✅",
    title: "Availability & SLAs",
    subtitle: "Nines of uptime",
    color: "#4ADE80",
    data: [
      { label: "99% (2 nines)", value: "87.6 hrs/yr", note: "~7.3 hrs/month" },
      { label: "99.9% (3 nines)", value: "8.76 hrs/yr", note: "~44 min/month" },
      { label: "99.99% (4 nines)", value: "52.6 min/yr", note: "~4.4 min/month" },
      { label: "99.999% (5 nines)", value: "5.26 min/yr", note: "~26 sec/month" },
      { label: "99.9999% (6 nines)", value: "31.5 sec/yr", note: "~2.6 sec/month" },
      { label: "Serial availability", value: "A × B", note: "Both must be up" },
      { label: "Parallel availability", value: "1-(1-A)(1-B)", note: "Either can serve" },
    ],
  },
  {
    id: "time",
    icon: "🕐",
    title: "Time Conversions",
    subtitle: "Seconds in everything",
    color: "#F472B6",
    data: [
      { label: "1 minute", value: "60 s", note: "" },
      { label: "1 hour", value: "3,600 s", note: "60 × 60" },
      { label: "1 day", value: "86,400 s", note: "~10⁵ seconds" },
      { label: "1 month", value: "~2.6M s", note: "30 × 86,400" },
      { label: "1 year", value: "~31.5M s", note: "~3.15 × 10⁷" },
      { label: "Shortcut: 10K req/day", value: "~0.12 QPS", note: "Divide by 86,400" },
      { label: "Shortcut: 1M req/day", value: "~12 QPS", note: "Divide by 100K" },
      { label: "Shortcut: 1B req/day", value: "~12K QPS", note: "Divide by 86,400" },
    ],
  },
  {
    id: "network",
    icon: "🌐",
    title: "Networking Essentials",
    subtitle: "Ports, protocols, packet sizes",
    color: "#FBBF24",
    data: [
      { label: "MTU (Ethernet)", value: "1,500 B", note: "Max packet size" },
      { label: "TCP header", value: "20–60 B", note: "Per segment" },
      { label: "UDP header", value: "8 B", note: "Minimal overhead" },
      { label: "HTTP/1.1 overhead", value: "~700 B+", note: "Headers per req" },
      { label: "HTTP/2 header", value: "~50 B", note: "HPACK compressed" },
      { label: "gRPC overhead", value: "~5 B", note: "Protobuf framing" },
      { label: "DNS lookup", value: "~1–10 ms", note: "Cached: ~0 ms" },
      { label: "CDN cache hit", value: "< 5 ms", note: "Edge location" },
      { label: "Load balancer", value: "< 1 ms", note: "L4 is faster" },
      { label: "WebSocket", value: "2 B/frame", note: "Min frame overhead" },
    ],
  },
  {
    id: "formulas",
    icon: "🧮",
    title: "Key Estimation Formulas",
    subtitle: "The interview cheat sheet",
    color: "#C084FC",
    isFormulas: true,
    data: [
      {
        label: "QPS from DAU",
        formula: "QPS = DAU × req_per_user / 86,400",
        example: "10M DAU × 5 req = 578 QPS avg → ~1,500 QPS peak",
      },
      {
        label: "Storage per year",
        formula: "Storage = writes/day × record_size × 365",
        example: "1M writes/day × 1KB × 365 = ~365 GB/year",
      },
      {
        label: "Bandwidth needed",
        formula: "BW = QPS × avg_response_size",
        example: "1000 QPS × 100KB = 100 MB/s = 800 Mbps",
      },
      {
        label: "Servers needed",
        formula: "Servers = Peak QPS / QPS_per_server",
        example: "10K QPS / 1K per server = 10 servers minimum",
      },
      {
        label: "Cache memory",
        formula: "Cache = hot_data_% × total_dataset",
        example: "20% of 1TB hot data = 200GB cache needed",
      },
      {
        label: "DB shards needed",
        formula: "Shards = total_data / shard_size",
        example: "10TB data / 1TB shard = 10 shards",
      },
      {
        label: "Read replicas",
        formula: "Replicas = Read_QPS / DB_read_capacity",
        example: "50K read QPS / 10K per replica = 5 replicas",
      },
    ],
  },
  {
    id: "tricks",
    icon: "🎯",
    title: "Mental Math Tricks",
    subtitle: "Shortcuts interviewers love",
    color: "#34D399",
    isTricks: true,
    data: [
      { trick: "Divide by 10⁵ (≈86,400)", use: "Convert req/day → QPS quickly" },
      { trick: "1KB × 1B = 1TB", use: "1,000 bytes × 1 billion records = 1 TB" },
      { trick: "Multiply QPS × 3 for peak", use: "Account for traffic spikes" },
      { trick: "8 bits = 1 byte (BW calc)", use: "Mbps ÷ 8 = MB/s" },
      { trick: "~1K, ~1M, ~1B shortcuts", use: "Round aggressively — precision isn't the goal" },
      { trick: "1 year ≈ 3 × 10⁷ seconds", use: "Fast storage estimation" },
      { trick: "80/20 rule for caching", use: "20% of data = 80% of traffic" },
      { trick: "Always state assumptions", use: "Interviewers reward clear thinking, not exact numbers" },
      { trick: "Write: 1/10th of reads", use: "Most systems are 90% read-heavy" },
      { trick: "Replication factor = 3", use: "Standard: 1 primary + 2 replicas" },
    ],
  },
];

const TabButton = ({ section, active, onClick }) => (
  <button
    onClick={() => onClick(section.id)}
    style={{
      background: active ? section.color : "transparent",
      color: active ? "#0A0A0F" : "#888",
      border: `1px solid ${active ? section.color : "#222"}`,
      borderRadius: "8px",
      padding: "6px 12px",
      fontSize: "12px",
      fontFamily: "'Courier New', monospace",
      cursor: "pointer",
      transition: "all 0.2s",
      whiteSpace: "nowrap",
      fontWeight: active ? "700" : "400",
    }}
  >
    {section.icon} {section.title.split(" ")[0]}
  </button>
);

const FormulaCard = ({ item, color }) => (
  <div style={{
    background: "#0F0F1A",
    border: `1px solid ${color}33`,
    borderLeft: `3px solid ${color}`,
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "12px",
  }}>
    <div style={{ color: color, fontSize: "13px", fontWeight: "700", marginBottom: "8px", fontFamily: "'Courier New', monospace" }}>
      {item.label}
    </div>
    <div style={{
      background: "#1A1A2E",
      borderRadius: "6px",
      padding: "10px 14px",
      fontFamily: "'Courier New', monospace",
      fontSize: "13px",
      color: "#E8E8FF",
      marginBottom: "8px",
    }}>
      {item.formula}
    </div>
    <div style={{ color: "#666", fontSize: "12px", fontStyle: "italic" }}>
      → {item.example}
    </div>
  </div>
);

const TrickCard = ({ item, color }) => (
  <div style={{
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    background: "#0F0F1A",
    border: "1px solid #222",
    borderRadius: "10px",
    padding: "14px 16px",
    marginBottom: "10px",
  }}>
    <div style={{
      width: "8px", height: "8px", borderRadius: "50%",
      background: color, marginTop: "5px", flexShrink: 0,
    }} />
    <div>
      <div style={{ color: "#E8E8FF", fontSize: "13px", fontWeight: "600", marginBottom: "4px", fontFamily: "'Courier New', monospace" }}>
        {item.trick}
      </div>
      <div style={{ color: "#888", fontSize: "12px" }}>{item.use}</div>
    </div>
  </div>
);

const DataTable = ({ section }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {["ITEM", "VALUE", "NOTES"].map((h, i) => (
            <th key={h} style={{
              textAlign: i === 1 ? "right" : "left",
              padding: "10px 14px", color: "#555", fontSize: "11px",
              letterSpacing: "1.5px", fontFamily: "'Courier New', monospace",
              borderBottom: "1px solid #1A1A2E", textTransform: "uppercase",
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {section.data.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "#0A0A12" }}
            onMouseEnter={e => e.currentTarget.style.background = `${section.color}0D`}
            onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "#0A0A12"}
          >
            <td style={{ padding: "11px 14px", color: "#B0B0C8", fontSize: "13px", fontFamily: "'Courier New', monospace", borderBottom: "1px solid #111" }}>{row.label}</td>
            <td style={{ padding: "11px 14px", color: section.color, fontSize: "14px", fontWeight: "700", textAlign: "right", fontFamily: "'Courier New', monospace", borderBottom: "1px solid #111", whiteSpace: "nowrap" }}>{row.value}</td>
            <td style={{ padding: "11px 14px", color: "#555", fontSize: "12px", fontStyle: "italic", borderBottom: "1px solid #111" }}>{row.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const tips = {
  powers: "Always round to the nearest power of 2. 1 KB ≈ 10³, 1 MB ≈ 10⁶, 1 GB ≈ 10⁹. Interviewers don't expect precision — they want to see systematic thinking.",
  latency: "Memorize the orders of magnitude: L1 (ns) → RAM (100ns) → SSD (µs) → HDD/Network (ms). Each level is ~1,000× slower. Use this to justify your architecture choices.",
  storage: "In interviews, always estimate metadata separately from payload. A tweet is 280 bytes of text, but with metadata (user_id, timestamp, likes) it's ~500B–1KB per record.",
  throughput: "Rule of thumb: a single commodity server handles ~10K–100K RPS depending on task complexity. Always validate with your estimated QPS to know how many servers you need.",
  scale: "The most common formula: QPS = DAU × requests_per_user ÷ 86,400. Then multiply peak by 3×. This single pattern answers most capacity questions.",
  availability: "Remember: each additional '9' is 10× harder to achieve. Going from 99.9% to 99.99% requires fundamentally different architecture (no single points of failure, multi-region, etc.).",
  time: "The golden shortcut: divide req/day by 100,000 to get approximate QPS. 1M req/day ≈ 12 QPS. Fast, accurate enough, and impressive to interviewers.",
  network: "When calculating bandwidth: QPS × avg_payload_size = bytes/sec. Then multiply by 8 for bits/sec. Always check if your estimated bandwidth fits within NIC capacity (~1–10 Gbps).",
  formulas: "State assumptions before calculating. Say: 'I'll assume 10M DAU, each making 50 requests per day, so that's 500M requests/day...' This shows structured thinking.",
  tricks: "Interviewers don't want exact numbers — they want to see that you know which numbers matter, can reason through trade-offs, and can communicate clearly under pressure.",
};

export default function App() {
  const [active, setActive] = useState("powers");
  const section = sections.find(s => s.id === active);

  return (
    <div style={{ minHeight: "100vh", background: "#07070F", color: "#E8E8FF", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0D0D1F 0%, #070711 100%)", borderBottom: "1px solid #1A1A30", padding: "28px 32px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "#00FF9420", border: "1px solid #00FF9444", borderRadius: "6px", padding: "3px 10px", fontSize: "11px", color: "#00FF94", letterSpacing: "2px", fontFamily: "'Courier New', monospace", marginBottom: "12px", textTransform: "uppercase" }}>
            System Design Interview
          </div>
          <h1 style={{ margin: "0 0 6px", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: "800", letterSpacing: "-0.5px", color: "#FFFFFF" }}>
            Back-of-the-Envelope Math
          </h1>
          <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
            The numbers every engineer must memorize. Master these, and no estimation question will catch you off guard.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid #111", padding: "14px 32px", background: "#09090F", overflowX: "auto" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {sections.map(s => <TabButton key={s.id} section={s} active={active === s.id} onClick={setActive} />)}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "28px 32px" }}>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
            <span style={{ fontSize: "28px" }}>{section.icon}</span>
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "800", color: section.color }}>{section.title}</h2>
          </div>
          <p style={{ margin: 0, color: "#666", fontSize: "13px", paddingLeft: "42px" }}>{section.subtitle}</p>
        </div>

        <div style={{ background: "#0B0B18", border: `1px solid ${section.color}22`, borderRadius: "14px", overflow: "hidden" }}>
          {section.isFormulas ? (
            <div style={{ padding: "20px" }}>{section.data.map((item, i) => <FormulaCard key={i} item={item} color={section.color} />)}</div>
          ) : section.isTricks ? (
            <div style={{ padding: "20px" }}>{section.data.map((item, i) => <TrickCard key={i} item={item} color={section.color} />)}</div>
          ) : (
            <DataTable section={section} />
          )}
        </div>

        {/* Tip */}
        <div style={{ marginTop: "20px", background: "#0F0F1A", border: "1px solid #1F1F35", borderRadius: "10px", padding: "16px 20px", display: "flex", gap: "12px" }}>
          <span style={{ fontSize: "18px", flexShrink: 0 }}>💡</span>
          <div>
            <div style={{ color: "#AAA", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "5px", fontFamily: "'Courier New', monospace" }}>Interview Pro Tip</div>
            <p style={{ margin: 0, color: "#888", fontSize: "13px" }}>{tips[section.id]}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ maxWidth: "900px", margin: "0 auto 40px", padding: "0 32px" }}>
        <div style={{ background: "#0A0A12", border: "1px solid #111", borderRadius: "10px", padding: "16px 20px", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#444", fontSize: "12px", fontFamily: "'Courier New', monospace" }}>
            {sections.length} CATEGORIES · {sections.reduce((a, s) => a + s.data.length, 0)} NUMBERS TO KNOW
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
            {["🧠 Memorize latency", "📐 QPS formula", "💾 Storage sizing", "🔢 Powers of 2"].map(t => (
              <span key={t} style={{ color: "#333", fontSize: "11px" }}>{t}</span>
            ))}
            {/* ✅ Link to System Design Guide */}
            <a
              href="/system_design_guide.html"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#00FF9415",
                border: "1px solid #00FF9440",
                color: "#00FF94",
                fontSize: "11px",
                fontFamily: "'Courier New', monospace",
                padding: "4px 12px",
                borderRadius: "6px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              📐 System Design Guide →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
