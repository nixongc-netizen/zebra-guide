import { useState, useEffect } from "react";

// ââ CONFIG âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const USE_LOCAL_IMAGES = false;
const CDN_BASE = "https://www.ehlers-danlos.com/wp-content/uploads/";
const LOCAL_BASE = "/beighton/";

const beightonImages = [
  { cdn: `${CDN_BASE}little-finger.jpg`,  local: `${LOCAL_BASE}little-finger.jpg`,  alt: "Little finger extension test" },
  { cdn: `${CDN_BASE}thumb.jpg`,           local: `${LOCAL_BASE}thumb.jpg`,           alt: "Thumb to forearm test" },
  { cdn: `${CDN_BASE}elbow.jpg`,           local: `${LOCAL_BASE}elbow.jpg`,           alt: "Elbow hyperextension test" },
  { cdn: `${CDN_BASE}knee.jpg`,            local: `${LOCAL_BASE}knee.jpg`,            alt: "Knee hyperextension test" },
  { cdn: `${CDN_BASE}forward-fold.jpg`,    local: `${LOCAL_BASE}forward-fold.jpg`,    alt: "Forward fold / palms flat on floor" },
];

// ââ DATA âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const criterion2AItems = [
  { id: "c2a1", label: "Unusually soft or velvety skin", desc: "Your skin feels exceptionally smooth, soft, or velvety to the touch â softer than most people's." },
  { id: "c2a2", label: "Skin that stretches more than normal", desc: "You can pull your skin out further than typical before it feels tight. It snaps back normally when released." },
  { id: "c2a3", label: "Unexplained stretch marks", desc: "You have stretch marks (striae) that appeared without significant weight gain, pregnancy, or growth spurts." },
  { id: "c2a4", label: "Papyraceous or atrophic scarring", desc: "Your scars are unusually thin, papery, or wide â sometimes described as 'cigarette paper' scars." },
  { id: "c2a5", label: "Easy bruising", desc: "You bruise very easily, sometimes without remembering a bump, or bruises appear larger than expected from minor injuries." },
  { id: "c2a6", label: "Piezogenic papules on heels", desc: "Small, soft, flesh-coloured bumps appear on the sides of your heels when you stand. They may be tender." },
  { id: "c2a7", label: "Recurrent or multiple abdominal hernia", desc: "You have been told you have a hernia, or have had multiple hernias (belly button, groin, or abdominal wall)." },
  { id: "c2a8", label: "Epicanthal folds", desc: "You have a small extra fold of skin at the inner corner of your eyes (near the nose)." },
  { id: "c2a9", label: "Dental crowding / high arched palate", desc: "Your dentist has noted crowded or crooked teeth, or you have a noticeably high, narrow roof of your mouth." },
  { id: "c2a10", label: "Arachnodactyly (long, slender fingers)", desc: "Your fingers are notably long and slender. One test: wrap your hand around your opposite wrist â does your thumb and pinky overlap?" },
  { id: "c2a11", label: "Arm span exceeds height", desc: "When you spread your arms wide, the distance from fingertip to fingertip is greater than your height." },
  { id: "c2a12", label: "Mitral valve prolapse (diagnosed)", desc: "A doctor has told you that one of your heart valves 'billows' slightly or you have been diagnosed with MVP." },
  { id: "c2a13", label: "Aortic root dilation (diagnosed)", desc: "An echocardiogram or scan has shown the main artery from your heart is slightly enlarged or at the upper limit of normal." },
];

const criterion2CItems = [
  { id: "c2c1", label: "Musculoskeletal pain in 2+ limbs, daily for 3+ months", desc: "You experience ongoing aching, burning, or soreness in your arms, legs, or both â most days, for at least 3 months." },
  { id: "c2c2", label: "Widespread (all-over) chronic pain for 3+ months", desc: "You have pain in multiple areas of your body simultaneously â is not just one spot â that has lasted at least 3 months." },
  { id: "c2c3", label: "Recurring joint dislocations or subluxations", desc: "Your joints partially or fully slip out of place, either with or without much force. This happens more than once across different joints." },
];

const beightonTests = [
  { id: "lp", label: "Left little finger bends back past 90Â°", side: "left", points: 1, imgIdx: 0 },
  { id: "rp", label: "Right little finger bends back past 90Â°", side: "right", points: 1, imgIdx: 0 },
  { id: "lt", label: "Left thumb touches the forearm", side: "left", points: 1, imgIdx: 1 },
  { id: "rt", label: "Right thumb touches the forearm", side: "right", points: 1, imgIdx: 1 },
  { id: "le", label: "Left elbow bends backwards (hyperextends)", side: "left", points: 1, imgIdx: 2 },
  { id: "re", label: "Right elbow bends backwards (hyperextends)", side: "right", points: 1, imgIdx: 2 },
  { id: "lk", label: "Left knee bends backwards (hyperextends)", side: "left", points: 1, imgIdx: 3 },
  { id: "rk", label: "Right knee bends backwards (hyperextends)", side: "right", points: 1, imgIdx: 3 },
  { id: "ff", label: "Standing forward fold â palms flat on the floor (knees straight)", side: "both", points: 1, imgIdx: 4 },
];

const bpiSeverityItems = [
  { id: "bpi_worst",   label: "Worst pain in last 24 hrs" },
  { id: "bpi_least",   label: "Least pain in last 24 hrs" },
  { id: "bpi_average", label: "Average pain" },
  { id: "bpi_now",     label: "Pain right now" },
];

const bpiInterferenceItems = [
  { id: "bpi_ga",   label: "General activity" },
  { id: "bpi_mood", label: "Mood" },
  { id: "bpi_walk", label: "Walking ability" },
  { id: "bpi_work", label: "Normal work (including housework)" },
  { id: "bpi_rel",  label: "Relationships with other people" },
  { id: "bpi_slp",  label: "Sleep" },
  { id: "bpi_enj",  label: "Enjoyment of life" },
];

const fssItems = [
  { id: "fss1", label: "My motivation is lower when I am fatigued." },
  { id: "fss2", label: "Exercise brings on my fatigue." },
  { id: "fss3", label: "I am easily fatigued." },
  { id: "fss4", label: "Fatigue interferes with my physical functioning." },
  { id: "fss5", label: "Fatigue causes frequent problems for me." },
  { id: "fss6", label: "My fatigue prevents sustained physical functioning." },
  { id: "fss7", label: "Fatigue interferes with carrying out certain duties and responsibilities." },
  { id: "fss8", label: "Fatigue is among my three most disabling symptoms." },
  { id: "fss9", label: "Fatigue interferes with my work, family, or social life." },
];

const potsQItems = [
  { id: "pots1", label: "Lightheadedness or dizziness when standing up" },
  { id: "pots2", label: "Heart racing or pounding when upright" },
  { id: "pots3", label: "Fainting or near-fainting episodes" },
  { id: "pots4", label: "Fatigue that is worse when standing or sitting upright" },
  { id: "pots5", label: "Brain fog or difficulty thinking clearly" },
  { id: "pots6", label: "Nausea, especially when standing" },
  { id: "pots7", label: "Trembling or shakiness on standing" },
  { id: "pots8", label: "Blurred vision when changing positions" },
];

const mcasQItems = [
  { id: "mcas1", label: "Flushing, hives, or unexplained rashes" },
  { id: "mcas2", label: "Severe reactions to insect stings, foods, or medications" },
  { id: "mcas3", label: "Chronic nasal congestion or runny nose" },
  { id: "mcas4", label: "Abdominal pain, cramping, nausea, or diarrhoea" },
  { id: "mcas5", label: "Bone or joint pain that flares unpredictably" },
  { id: "mcas6", label: "Brain fog or fatigue after eating" },
  { id: "mcas7", label: "Unexplained itching without a rash" },
];

const otherCondItems = [
  { id: "oc_fibro",   label: "Fibromyalgia (diagnosed)" },
  { id: "oc_cfs",     label: "Chronic Fatigue Syndrome / ME (diagnosed)" },
  { id: "oc_ibs",     label: "Irritable Bowel Syndrome (diagnosed)" },
  { id: "oc_anx",     label: "Anxiety or panic disorder (diagnosed)" },
  { id: "oc_dep",     label: "Depression (diagnosed)" },
  { id: "oc_chiari",  label: "Chiari malformation (diagnosed)" },
  { id: "oc_craniocx",label: "Craniocervical instability (diagnosed)" },
  { id: "oc_tethered",label: "Tethered cord syndrome (diagnosed)" },
];

const ptResources = [
  {
    name: "EDS Society â Find a Healthcare Provider",
    url: "https://www.ehlers-danlos.com/healthcare-professionals-directory/",
    desc: "Directory of EDS-knowledgeable clinicians including PTs, OTs, and physicians worldwide.",
    type: "Directory",
  },
  {
    name: "Bendy Bodies Podcast",
    url: "https://www.bendybodies.org/",
    desc: "Patient-led resource for hypermobility, EDS, and related conditions â includes PT/rehab guidance.",
    type: "Resource",
  },
  {
    name: "EDNF PT Guidelines",
    url: "https://www.ehlers-danlos.com/rehabilitation/",
    desc: "Official EDS Society rehabilitation and physical therapy recommendations.",
    type: "Guidelines",
  },
  {
    name: "Bracing for Hypermobility â EDS Society",
    url: "https://www.ehlers-danlos.com/eds-types/",
    desc: "Overview of orthotics and bracing options commonly used in hEDS management.",
    type: "Bracing",
  },
  {
    name: "Mast Cell Action",
    url: "https://www.mastcellaction.org/",
    desc: "Specialist charity for MCAS â useful if you screen positive for mast cell symptoms.",
    type: "MCAS",
  },
  {
    name: "Dysautonomia International",
    url: "https://www.dysautonomiainternational.org/",
    desc: "POTS, dysautonomia, and autonomic disorder support and physician directory.",
    type: "POTS",
  },
  {
    name: "The Hypermobility Connect",
    url: "https://thehypermobilityconnect.com/",
    desc: "Online community and education hub for hypermobility spectrum and hEDS patients.",
    type: "Community",
  },
];

// ââ STYLES ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const S = {
  app: { maxWidth: 480, margin: "0 auto", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8f9fa", minHeight: "100dvh", paddingBottom: 72 },
  header: { background: "linear-gradient(135deg, #6a0dad 0%, #9c27b0 100%)", color: "#fff", padding: "18px 16px 14px", position: "sticky", top: 0, zIndex: 100 },
  headerTitle: { margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.3px" },
  headerSub: { margin: "2px 0 0", fontSize: 12, opacity: 0.85 },
  nav: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#fff", borderTop: "1px solid #e0e0e0", display: "flex", zIndex: 200 },
  navBtn: (active) => ({ flex: 1, border: "none", background: "none", padding: "8px 4px 10px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: active ? "#6a0dad" : "#666", borderTop: active ? "2px solid #6a0dad" : "2px solid transparent", fontSize: 10, fontWeight: active ? 600 : 400 }),
  section: { padding: "16px 16px 8px" },
  card: { background: "#fff", borderRadius: 12, padding: 16, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  cardTitle: { fontSize: 15, fontWeight: 700, color: "#333", marginBottom: 8 },
  badge: (color) => ({ display: "inline-block", background: color || "#6a0dad", color: "#fff", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600 }),
  btn: { background: "#6a0dad", color: "#fff", border: "none", borderRadius: 8, padding: "12px 20px", fontSize: 15, fontWeight: 600, cursor: "pointer", width: "100%" },
  btnOutline: { background: "#fff", color: "#6a0dad", border: "2px solid #6a0dad", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  check: (checked) => ({ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: "1px solid #f0f0f0", cursor: "pointer" }),
  checkBox: (checked) => ({ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked ? "#6a0dad" : "#ccc"}`, background: checked ? "#6a0dad" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }),
  input: { width: "100%", border: "1px solid #ddd", borderRadius: 8, padding: "10px 12px", fontSize: 14, boxSizing: "border-box", outline: "none" },
  label: { fontSize: 13, color: "#555", marginBottom: 4, display: "block", fontWeight: 500 },
  numberRow: { display: "flex", gap: 4, flexWrap: "wrap", marginTop: 6 },
  numBtn: (sel) => ({ width: 30, height: 30, borderRadius: 6, border: `1px solid ${sel ? "#6a0dad" : "#ddd"}`, background: sel ? "#6a0dad" : "#fff", color: sel ? "#fff" : "#444", fontSize: 12, fontWeight: sel ? 700 : 400, cursor: "pointer" }),
  alert: (type) => ({ background: type === "warn" ? "#fff8e1" : type === "success" ? "#e8f5e9" : "#f3e5f5", border: `1px solid ${type === "warn" ? "#ffca28" : type === "success" ? "#66bb6a" : "#ce93d8"}`, borderRadius: 10, padding: "12px 14px", marginBottom: 12, fontSize: 13 }),
  tagBadge: (t) => { const cols = { Directory: "#1976d2", Resource: "#388e3c", Guidelines: "#f57c00", Bracing: "#7b1fa2", MCAS: "#c62828", POTS: "#00838f", Community: "#5d4037" }; return { background: cols[t] || "#666", color: "#fff", borderRadius: 12, padding: "2px 8px", fontSize: 10, fontWeight: 600 }; },
};

// ââ SMALL COMPONENTS ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function BeightonImg({ imgIdx }) {
  const [err, setErr] = useState(false);
  const src = USE_LOCAL_IMAGES ? beightonImages[imgIdx]?.local : beightonImages[imgIdx]?.cdn;
  if (err || !src) return (
    <div style={{ width: "100%", height: 120, background: "#f0e6ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#9c27b0" }}>
      {beightonImages[imgIdx]?.alt || "Illustration"}
    </div>
  );
  return <img src={src} alt={beightonImages[imgIdx]?.alt} onError={() => setErr(true)} style={{ width: "100%", borderRadius: 8, maxHeight: 180, objectFit: "cover" }} />;
}

function NumerRow({ value, onChange, min = 0, max = 10 }) {
  return (
    <div style={S.numberRow}>
      {Array.from({ length: max - min + 1 }, (_, i) => i + min).map(n => (
        <button key={n} style={S.numBtn(value === n)} onClick={() => onChange(n)}>{n}</button>
      ))}
    </div>
  );
}

function CheckItem({ checked, onToggle, label, desc }) {
  return (
    <div style={S.check(checked)} onClick={onToggle}>
      <div style={S.checkBox(checked)}>
        {checked && <span style={{ color: "#fff", fontSize: 14, lineHeight: 1 }}>â</span>}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#222" }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{desc}</div>}
      </div>
    </div>
  );
}

// ToolkitInput MUST be defined outside DoctorToolkit to prevent remount on keystroke
function ToolkitInput({ label, value, onChange, placeholder, multiline }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={S.label}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...S.input, minHeight: 80, resize: "vertical" }} />
        : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={S.input} />
      }
    </div>
  );
}

// ââ SYMPTOM CHECKER âââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function SymptomChecker({ onSave }) {
  const [step, setStep] = useState(0);
  const [beighton, setBeighton] = useState({});
  const [c2a, setC2a] = useState({});
  const [c2b, setC2b] = useState(false);
  const [c2c, setC2c] = useState({});
  const [bpiSev, setBpiSev] = useState({});
  const [bpiInt, setBpiInt] = useState({});
  const [fss, setFss] = useState({});
  const [pots, setPots] = useState({});
  const [mcas, setMcas] = useState({});
  const [otherCond, setOtherCond] = useState({});
  const [saved, setSaved] = useState(false);

  const beightonScore = Object.values(beighton).filter(Boolean).length;
  const c2aCount = Object.values(c2a).filter(Boolean).length;
  const c2cCount = Object.values(c2c).filter(Boolean).length;
  const potsCount = Object.values(pots).filter(Boolean).length;
  const mcasCount = Object.values(mcas).filter(Boolean).length;

  const bpiSevScores = bpiSeverityItems.map(i => bpiSev[i.id] ?? null).filter(v => v !== null);
  const bpiSevAvg = bpiSevScores.length ? (bpiSevScores.reduce((a, b) => a + b, 0) / bpiSevScores.length).toFixed(1) : null;
  const bpiIntScores = bpiInterferenceItems.map(i => bpiInt[i.id] ?? null).filter(v => v !== null);
  const bpiIntAvg = bpiIntScores.length ? (bpiIntScores.reduce((a, b) => a + b, 0) / bpiIntScores.length).toFixed(1) : null;

  const fssScores = fssItems.map(i => fss[i.id] ?? null).filter(v => v !== null);
  const fssMean = fssScores.length === 9 ? (fssScores.reduce((a, b) => a + b, 0) / 9).toFixed(2) : null;

  const crit1Met = beightonScore >= 5;
  const crit2Met = (c2aCount >= 5) && (c2cCount >= 1 || c2b);
  const possibleHeds = crit1Met && crit2Met;

  const toggleMap = (map, setMap, key) => setMap(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    const results = {
      beightonScore, c2aCount, c2b, c2cCount,
      crit1Met, crit2Met, possibleHeds,
      bpiSevAvg, bpiIntAvg, fssMean,
      potsCount, mcasCount,
      bpiSev, bpiInt, fss, pots, mcas, otherCond, c2a, c2c,
      autonomic: [...Object.keys(pots).filter(k => pots[k]), ...Object.keys(mcas).filter(k => mcas[k])],
    };
    onSave(results);
    setSaved(true);
  };

  const steps = [
    // STEP 0: BEIGHTON
    <div key="beighton">
      <div style={S.card}>
        <div style={S.cardTitle}>ð¦´ Beighton Score</div>
        <p style={{ fontSize: 13, color: "#555", margin: "0 0 12px" }}>
          This 9-point test checks how flexible your joints are. Try each movement carefully. Stop if it causes pain.
        </p>
        <div style={{ ...S.alert("success"), marginBottom: 12 }}>
          <strong>Score â¥ 5 / 9</strong> suggests generalised joint hypermobility. Each item is worth 1 point.
        </div>
        {beightonTests.map((t, idx) => (
          <div key={t.id}>
            {(idx === 0 || beightonTests[idx].imgIdx !== beightonTests[idx - 1].imgIdx) && (
              <div style={{ margin: "12px 0 8px" }}>
                <BeightonImg imgIdx={t.imgIdx} />
              </div>
            )}
            <CheckItem
              checked={!!beighton[t.id]}
              onToggle={() => toggleMap(beighton, setBeighton, t.id)}
              label={t.label}
            />
          </div>
        ))}
        <div style={{ marginTop: 14, padding: "10px 14px", background: beightonScore >= 5 ? "#e8f5e9" : "#f5f5f5", borderRadius: 8, fontWeight: 600, fontSize: 15 }}>
          Score: {beightonScore} / 9 {beightonScore >= 5 ? "â Criterion 1 likely met" : "â need â¥5 for Criterion 1"}
        </div>
      </div>
    </div>,

    // STEP 1: CRITERION 2A
    <div key="c2a">
      <div style={S.card}>
        <div style={S.cardTitle}>ð§¬ Connective Tissue Signs</div>
        <p style={{ fontSize: 13, color: "#555", margin: "0 0 12px" }}>
          These are physical signs seen in connective tissue disorders. Check any that apply to you. You need <strong>5 or more</strong> for this criterion.
        </p>
        {criterion2AItems.map(item => (
          <CheckItem
            key={item.id}
            checked={!!c2a[item.id]}
            onToggle={() => toggleMap(c2a, setC2a, item.id)}
            label={item.label}
            desc={item.desc}
          />
        ))}
        <div style={{ marginTop: 14, padding: "10px 14px", background: c2aCount >= 5 ? "#e8f5e9" : "#f5f5f5", borderRadius: 8, fontWeight: 600, fontSize: 15 }}>
          {c2aCount} of 13 selected {c2aCount >= 5 ? "â" : `â need ${5 - c2aCount} more`}
        </div>
      </div>
    </div>,

    // STEP 2: CRITERION 2B + 2C
    <div key="c2bc">
      <div style={S.card}>
        <div style={S.cardTitle}>ðª Family History</div>
        <p style={{ fontSize: 13, color: "#555", margin: "0 0 8px" }}>
          Does a first-degree relative (parent, sibling, or child) have a confirmed hEDS diagnosis?
        </p>
        <CheckItem
          checked={c2b}
          onToggle={() => setC2b(!c2b)}
          label="Yes â a first-degree relative has hEDS"
        />
      </div>
      <div style={S.card}>
        <div style={S.cardTitle}>ð¦¿ Musculoskeletal Complications</div>
        <p style={{ fontSize: 13, color: "#555", margin: "0 0 8px" }}>
          These are ongoing musculoskeletal problems common in hEDS. Check any that apply to you (need at least 1).
        </p>
        {criterion2CItems.map(item => (
          <CheckItem
            key={item.id}
            checked={!!c2c[item.id]}
            onToggle={() => toggleMap(c2c, setC2c, item.id)}
            label={item.label}
            desc={item.desc}
          />
        ))}
        <div style={{ marginTop: 14, padding: "10px 14px", background: (c2cCount >= 1 || c2b) ? "#e8f5e9" : "#f5f5f5", borderRadius: 8, fontWeight: 600, fontSize: 14 }}>
          {c2cCount >= 1 || c2b ? "â Criterion 2 conditions met" : "â need family history OR â¥1 complication"}
        </div>
      </div>
    </div>,

    // STEP 3: BPI SEVERITY
    <div key="bpiSev">
      <div style={S.card}>
        <div style={S.cardTitle}>ð Pain Severity (BPI)</div>
        <p style={{ fontSize: 13, color: "#555", margin: "0 0 12px" }}>
          The Brief Pain Inventory measures how bad your pain has been. Rate each item from 0 (no pain) to 10 (worst imaginable pain).
        </p>
        {bpiSeverityItems.map(item => (
          <div key={item.id} style={{ marginBottom: 16 }}>
            <label style={S.label}>{item.label}</label>
            <NumerRow value={bpiSev[item.id] ?? null} onChange={v => setBpiSev(prev => ({ ...prev, [item.id]: v }))} />
          </div>
        ))}
        {bpiSevAvg && <div style={{ padding: "10px 14px", background: "#f3e5f5", borderRadius: 8, fontWeight: 600 }}>
          Severity average: {bpiSevAvg} / 10 {parseFloat(bpiSevAvg) >= 7 ? "(Severe)" : parseFloat(bpiSevAvg) >= 4 ? "(Moderate)" : "(Mild)"}
        </div>}
      </div>
    </div>,

    // STEP 4: BPI INTERFERENCE
    <div key="bpiInt">
      <div style={S.card}>
        <div style={S.cardTitle}>ð Pain Interference (BPI)</div>
        <p style={{ fontSize: 13, color: "#555", margin: "0 0 12px" }}>
          How much has pain interfered with these areas in the last 24 hours? Rate 0 (no interference) to 10 (complete interference).
        </p>
        {bpiInterferenceItems.map(item => (
          <div key={item.id} style={{ marginBottom: 16 }}>
            <label style={S.label}>{item.label}</label>
            <NumerRow value={bpiInt[item.id] ?? null} onChange={v => setBpiInt(prev => ({ ...prev, [item.id]: v }))} />
          </div>
        ))}
        {bpiIntAvg && <div style={{ padding: "10px 14px", background: "#f3e5f5", borderRadius: 8, fontWeight: 600 }}>
          Interference average: {bpiIntAvg} / 10 {parseFloat(bpiIntAvg) >= 7 ? "(Severe)" : parseFloat(bpiIntAvg) >= 4 ? "(Moderate)" : "(Mild)"}
        </div>}
      </div>
    </div>,

    // STEP 5: FSS
    <div key="fss">
      <div style={S.card}>
        <div style={S.cardTitle}>ð´ Fatigue Severity Scale (FSS)</div>
        <p style={{ fontSize: 13, color: "#555", margin: "0 0 12px" }}>
          For each statement, rate how much you agree: 1 = strongly disagree, 7 = strongly agree. Think about the past week.
        </p>
        {fssItems.map(item => (
          <div key={item.id} style={{ marginBottom: 16 }}>
            <label style={S.label}>{item.label}</label>
            <NumerRow value={fss[item.id] ?? null} onChange={v => setFss(prev => ({ ...prev, [item.id]: v }))} min={1} max={7} />
          </div>
        ))}
        {fssMean && <div style={{ padding: "10px 14px", background: "#f3e5f5", borderRadius: 8, fontWeight: 600 }}>
          FSS mean: {fssMean} {parseFloat(fssMean) >= 4 ? "â consistent with significant fatigue" : "â below clinical fatigue threshold"}
        </div>}
      </div>
    </div>,

    // STEP 6: POTS / DYSAUTONOMIA
    <div key="pots">
      <div style={S.card}>
        <div style={S.cardTitle}>ð Dysautonomia / POTS Screening</div>
        <p style={{ fontSize: 13, color: "#555", margin: "0 0 12px" }}>
          POTS (Postural Orthostatic Tachycardia Syndrome) is common in hEDS. Check any symptoms you experience regularly.
        </p>
        {potsQItems.map(item => (
          <CheckItem
            key={item.id}
            checked={!!pots[item.id]}
            onToggle={() => toggleMap(pots, setPots, item.id)}
            label={item.label}
          />
        ))}
        <div style={{ marginTop: 12, padding: "10px 14px", background: potsCount >= 4 ? "#fff8e1" : "#f5f5f5", borderRadius: 8, fontWeight: 600, fontSize: 14 }}>
          {potsCount} / 8 symptoms {potsCount >= 4 ? "â ï¸ Consider autonomic evaluation" : ""}
        </div>
      </div>
    </div>,

    // STEP 7: MCAS
    <div key="mcas">
      <div style={S.card}>
        <div style={S.cardTitle}>ð¡ï¸ MCAS Screening</div>
        <p style={{ fontSize: 13, color: "#555", margin: "0 0 12px" }}>
          Mast Cell Activation Syndrome can co-occur with hEDS. Check any you experience.
        </p>
        {mcasQItems.map(item => (
          <CheckItem
            key={item.id}
            checked={!!mcas[item.id]}
            onToggle={() => toggleMap(mcas, setMcas, item.id)}
            label={item.label}
          />
        ))}
        <div style={{ marginTop: 12, padding: "10px 14px", background: mcasCount >= 3 ? "#fff8e1" : "#f5f5f5", borderRadius: 8, fontWeight: 600, fontSize: 14 }}>
          {mcasCount} / 7 symptoms {mcasCount >= 3 ? "â ï¸ Consider mast cell evaluation" : ""}
        </div>
      </div>
    </div>,

    // STEP 8: OTHER CONDITIONS
    <div key="other">
      <div style={S.card}>
        <div style={S.cardTitle}>ð Other Diagnoses</div>
        <p style={{ fontSize: 13, color: "#555", margin: "0 0 12px" }}>
          These conditions frequently co-occur with hEDS. Check any that you have been diagnosed with.
        </p>
        {otherCondItems.map(item => (
          <CheckItem
            key={item.id}
            checked={!!otherCond[item.id]}
            onToggle={() => toggleMap(otherCond, setOtherCond, item.id)}
            label={item.label}
          />
        ))}
      </div>
      <div style={S.card}>
        <div style={S.cardTitle}>ð Summary</div>
        <div style={{ fontSize: 13, lineHeight: 1.7 }}>
          <div>ð¦´ Beighton Score: <strong>{beightonScore} / 9</strong> {crit1Met ? "â" : "â"}</div>
          <div>ð§¬ Connective Tissue Signs: <strong>{c2aCount} / 13</strong></div>
          <div>ðª Family History: <strong>{c2b ? "Yes â" : "No"}</strong></div>
          <div>ð¦¿ MSK Complications: <strong>{c2cCount} / 3</strong></div>
          {bpiSevAvg && <div>ð£ Pain Severity (BPI): <strong>{bpiSevAvg} / 10</strong></div>}
          {bpiIntAvg && <div>ð Pain Interference (BPI): <strong>{bpiIntAvg} / 10</strong></div>}
          {fssMean && <div>ð´ Fatigue (FSS): <strong>{fssMean} / 7</strong></div>}
          <div>ð POTS symptoms: <strong>{potsCount} / 8</strong></div>
          <div>ð¡ï¸ MCAS symptoms: <strong>{mcasCount} / 7</strong></div>
        </div>
        <div style={{ ...S.alert(possibleHeds ? "success" : "warn"), marginTop: 12 }}>
          {possibleHeds
            ? "â ï¸ Your responses are consistent with possible hEDS criteria. This is not a diagnosis â please discuss with a physician."
            : "Your responses do not fully meet hEDS criteria at this time. Consider discussing hypermobility spectrum disorder (HSD) with your doctor."}
        </div>
        <button style={S.btn} onClick={handleSave}>
          {saved ? "â Results Saved â Go to Toolkit" : "Save & Generate Clinical Letter"}
        </button>
      </div>
    </div>,
  ];

  const stepTitles = ["Beighton Score", "Connective Tissue", "Family & MSK", "Pain Severity", "Pain Interference", "Fatigue", "POTS Screen", "MCAS Screen", "Summary"];

  return (
    <div>
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: "#666" }}>{stepTitles[step]}</span>
          <span style={{ fontSize: 12, color: "#666" }}>Step {step + 1} of {steps.length}</span>
        </div>
        <div style={{ height: 4, background: "#e0d0f0", borderRadius: 2 }}>
          <div style={{ height: 4, background: "#6a0dad", borderRadius: 2, width: `${((step + 1) / steps.length) * 100}%`, transition: "width 0.3s" }} />
        </div>
      </div>
      <div style={S.section}>
        {steps[step]}
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          {step > 0 && <button style={{ ...S.btnOutline, flex: 1 }} onClick={() => setStep(s => s - 1)}>â Back</button>}
          {step < steps.length - 1 && <button style={{ ...S.btn, flex: 1 }} onClick={() => setStep(s => s + 1)}>Next â</button>}
        </div>
      </div>
    </div>
  );
}

// ââ DOCTOR TOOLKIT ââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function DoctorToolkit({ savedResults }) {
  const [patientName, setPatientName] = useState("");
  const [dob, setDob] = useState("");
  const [providerName, setProviderName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [letterVisible, setLetterVisible] = useState(false);

  const r = savedResults;
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const severityLabel = (v) => v >= 7 ? "Severe" : v >= 4 ? "Moderate" : "Mild";
  const fssLabel = (v) => v >= 5 ? "Severe" : v >= 4 ? "Clinically significant" : "Subclinical";

  const summaryPara = r ? (() => {
    const parts = [];
    if (r.possibleHeds) parts.push(`screening responses consistent with possible hEDS (Beighton ${r.beightonScore}/9, ${r.c2aCount} connective tissue signs)`);
    else parts.push(`Beighton score ${r.beightonScore}/9 with ${r.c2aCount} connective tissue signs noted`);
    if (r.bpiSevAvg) parts.push(`${severityLabel(parseFloat(r.bpiSevAvg)).toLowerCase()} pain (BPI severity ${r.bpiSevAvg}/10, interference ${r.bpiIntAvg}/10)`);
    if (r.fssMean && parseFloat(r.fssMean) >= 4) parts.push(`clinically significant fatigue (FSS ${r.fssMean}/7)`);
    if (r.potsCount >= 4) parts.push(`${r.potsCount}/8 dysautonomia symptoms suggesting POTS evaluation`);
    if (r.mcasCount >= 3) parts.push(`${r.mcasCount}/7 MCAS-consistent symptoms`);
    return parts.length ? `This patient presents with ${parts.join(", ")}.` : "Please see structured screening data below.";
  })() : "";

  const letter = r ? `
âââââââââââââââââââââââââââââââââââââââââââââââââââââ
STRUCTURED hEDS SELF-ASSESSMENT SUMMARY
Prepared for clinical review  Â·  ${today}
âââââââââââââââââââââââââââââââââââââââââââââââââââââ

Patient: ${patientName || "[Patient Name]"}  ${dob ? `   DOB: ${dob}` : ""}
To: ${providerName || "[Provider Name]"}${clinicName ? `, ${clinicName}` : ""}

SUMMARYsummaryPara}

ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
CRITERION 1 â JOINT HYPERMOBILITY (Beighton Score)
ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
Ncore: ${r.beightonScore} / 9   ${r.crit1Met ? "[MEETS threshold â¥5]" : "[Below threshold of 5]"}

Tests positive: ${Object.entries(r.beightonScore > 0 ? beightonTests.reduce((acc, t) => { acc[t.id] = t.label; return acc; }, {}) : {})
    .filter(([k]) => false).map(([, v]) => v).join(", ") || beightonTests.filter(t => r.beightonScore > 0).slice(0, r.beightonScore).map(t => t.label).join("\n  Â· ") || "See selected items above"}

ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
CRITERION 2 â SYSTEMIC FEATURES
ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
2A â Connective Tissue Signs: ${r.c2aCount} / 13  ${r.c2aCount >= 5 ? "[â¥5 met]" : "[<5]"}
${criterion2AItems.filter(i => r.c2a?.[i.id]).map(i => `  Â· ${i.label}`).join("\n") || "  None selected"}

2B â First-degree relative with hEDS: ${r.c2b ? "Yes" : "No"}

2C â MSK Complications: ${r.c2cCount} / 3  ${r.c2cCount >= 1 ? "[â¥1 met]" : ""}
${criterion2CItems.filter(i => r.c2c?.[i.id]).map(i => `  Â· ${i.label}`).join("\n") || "  None selected"}

Criterion 2 status: ${r.crit2Met ? "[MET]" : "[Not fully met]"}

ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
PAIN ASSESSMENT â Brief Pain Inventory (BPI)
ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
Severity subscale (0â10):
  Worst: ${r.bpiSev?.bpi_worst ?? "â"}  |  Least: ${r.bpiSev?.bpi_least ?? "â"}  |  Average: ${r.bpiSev?.bpi_average ?? "â"}  |  Now: ${r.bpiSev?.bpi_now ?? "â"}
  Subscale mean: ${r.bpiSevAvg ?? "â"}  (${r.bpiSevAvg ? severityLabel(parseFloat(r.bpiSevAvg)) : "â"})

Interference subscale (0â10):
  Activity: ${r.bpiInt?.bpi_ga ?? "â"}  |  Mood: ${r.bpiInt?.bpi_mood ?? "â"}  |  Walking: ${r.bpiInt?.bpi_walk ?? "â"}
  Work: ${r.bpiInt?.bpi_work ?? "â"}  |  Relations: ${r.bpiInt?.bpi_rel ?? "â"}  |  Sleep: ${r.bpiInt?.bpi_slp ?? "â"}  |  Enjoyment: ${r.bpiInt?.bpi_enj ?? "â"}
  Subscale mean: ${r.bpiIntAvg ?? "â"}  (${r.bpiIntAvg ? severityLabel(parseFloat(r.bpiIntAvg)) : "â"})

ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
FATIGUE â Fatigue Severity Scale (FSS, 9-item)
ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
Mean score: ${r.fssMean ?? "Incomplete"}  /  7.0
${r.fssMean ? `  ${fssLabel(parseFloat(r.fssMean))} fatigue  (clinical threshold â¥4.0)` : ""}

ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
AUTONOMIC / ASSOCIATED CONDITIONS
ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
POTS/Dysautonomia symptoms: ${r.potsCount} / 8 ${r.potsCount >= 4 ? " â recommend tilt-table or NASA lean test" : ""}
MCAS symptoms: ${r.mcasCount} / 7 ${r.mcasCount >= 3 ? " â consider mast cell workup (serum tryptase, 24hr urine)" : ""}

Other diagnoses reported:
${otherCondItems.filter(i => r.otherCond?.[i.id]).map(i => `  Â· ${i.label}`).join("\n") || "  None reported"}

ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
AREFERRAL CONSIDERATIONS
ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
${r.possibleHeds ? "  Â· Genetics/connective tissue specialist for formal hEDS evaluation" : ""}
${r.crit1Met ? "  Â· Physiotherapy: EDQ-specific hypermobility rehabilitation programme" : ""}
${r.bpiSevAvg && parseFloat(r.bpiSevAvg) >= 4 ? " Â· Pain management / rheumatology for chronic pain evaluation" : ""}
${r.potsCount >= 4 ? "  Â· Cardiology or autonomic neurology: POTS/dysautonomia workup" : ""}
${r.mcasCount >= 3 ? " Â· Allergy/immunology or haematology: MCAS evaluation" : ""}
${r.fssMean && parseFloat(r.fssMean) >= 4 ? "  Â· Fatigue management / occupational therapy" : ""}

ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
NOTES
ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
${additionalNotes || "None provided."}

âââââââââââââââââââââââââââââââââââââââââââââââââââââ
This report was generated using ZebraGuide, a structured
patient self-assessment tool based on the 2017 International
hEDS Classification Criteria (Malfait et al., Am J Med Genet).
It is intended to facilitate clinical discussion and does not
constitute a formal diagnosis.
âââââââââââââââââââââââââââââââââââââââââââââââââââââ
  `.trim() : "";

  return (
    <div style={S.section}>
      {!r && (
        <div style={S.alert("warn")}>
          â ï¸ Complete the Symptom Checker first to generate a clinical letter.
        </div>
      )}
      <div style={S.card}>
        <div style={S.cardTitle}>âï¸ Personalise Your Letter</div>
        <ToolkitInput label="Your Name" value={patientName} onChange={setPatientName} placeholder="e.g. Jane Smith" />
        <ToolkitInput label="Date of Birth (optional)" value={dob} onChange={setDob} placeholder="e.g. January 1, 1990" />
        <ToolkitInput label="Doctor / Provider Name" value={providerName} onChange={setProviderName} placeholder="e.g. Dr. Williams" />
        <ToolkitInput label="Clinic / Hospital Name (optional)" value={clinicName} onChange={setClinicName} placeholder="e.g. City Medical Centre" />
        <ToolkitInput label="Additional Notes (optional)" value={additionalNotes} onChange={setAdditionalNotes} placeholder="Any other symptoms, concerns, or context you want included..." multiline />
        {r && (
          <button style={S.btn} onClick={() => setLetterVisible(v => !v)}>
            {letterVisible ? "Hide Letter" : "ð Generate Clinical Letter"}
          </button>
        )}
      </div>

      {letterVisible && r && (
        <div style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={S.cardTitle}>Clinical Summary Letter</div>
            <button style={S.btnOutline} onClick={() => { const w = window.open("", "_blank"); w.document.write(`<pre style="font-family:Georgia,serif;font-size:13px;line-height:1.7;max-width:700px;margin:40px auto;white-space:pre-wrap">${letter}</pre>`); w.print(); }}>
              ð¨ï¸ Print
            </button>
          </div>
          <pre style={{ fontFamily: "Georgia, serif", fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-wrap", color: "#222", background: "#fafafa", padding: 14, borderRadius: 8, overflowX: "auto", margin: 0 }}>
            {letter}
          </pre>
        </div>
      )}
    </div>
  );
}

// ââ RESOURCE FINDER âââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function ResourceFinder() {
  const [filter, setFilter] = useState("All");
  const types = ["All", ...Array.from(new Set(ptResources.map(r => r.type)))];
  const filtered = filter === "All" ? ptResources : ptResources.filter(r => r.type === filter);

  return (
    <div style={S.section}>
      <div style={S.card}>
        <div style={S.cardTitle}>ð Filter by Type</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{ border: `1px solid ${filter === t ? "#6a0dad" : "#ddd"}`, background: filter === t ? "#6a0dad" : "#fff", color: filter === t ? "#fff" : "#444", borderRadius: 20, padding: "4px 12px", fontSize: 12, cursor: "pointer" }}>
              {t}
            </button>
          ))}
        </div>
      </div>
      {filtered.map((res, i) => (
        <div key={i} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#222", flex: 1, paddingRight: 8 }}>{res.name}</div>
            <span style={S.tagBadge(res.type)}>{res.type}</span>
          </div>
          <div style={{ fontSize: 13, color: "#555", marginBottom: 10 }}>{res.desc}</div>
          <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ color: "#6a0dad", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
            Visit â
          </a>
        </div>
      ))}
    </div>
  );
}

// ââ FLARE TRACKER âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function FlareTracker() {
  const [entries, setEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem("zg_flares") || "[]"); } catch { return []; }
  });
  const [pain, setPain] = useState(null);
  const [fatigue, setFatigue] = useState(null);
  const [notes, setNotes] = useState("");
  const [showLog, setShowLog] = useState(false);

  const save = () => {
    if (pain === null) return;
    const entry = {
      date: new Date().toLocaleString(),
      pain,
      fatigue: fatigue ?? "â",
      notes,
    };
    const updated = [entry, ...entries].slice(0, 90);
    setEntries(updated);
    localStorage.setItem("zg_flares", JSON.stringify(updated));
    setPain(null);
    setFatigue(null);
    setNotes("");
  };

  return (
    <div style={S.section}>
      <div style={S.card}>
        <div style={S.cardTitle}>ð Log Today's Symptoms</div>
        <label style={S.label}>Pain level (0â10)</label>
        <NumerRow value={pain} onChange={setPain} />
        <label style={{ ...S.label, marginTop: 16 }}>Fatigue level (0â10)</label>
        <NumerRow value={fatigue} onChange={setFatigue} />
        <label style={{ ...S.label, marginTop: 16 }}>Notes (optional)</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Triggers, activities, symptoms, bracing used..." style={{ ...S.input, minHeight: 72, resize: "vertical" }} />
        <button style={{ ...S.btn, marginTop: 14 }} onClick={save} disabled={pain === null}>
          {pain === null ? "Select a pain level to log" : "Save Entry"}
        </button>
      </div>

      {entries.length > 0 && (
        <div style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={S.cardTitle}>ð Log History ({entries.length} entries)</div>
            <button style={{ background: "none", border: "none", color: "#6a0dad", fontSize: 13, cursor: "pointer", fontWeight: 600 }} onClick={() => setShowLog(v => !v)}>
              {showLog ? "Hide" : "Show"}
            </button>
          </div>
          {showLog && entries.map((e, i) => (
            <div key={i} style={{ borderBottom: "1px solid #f0f0f0", padding: "10px 0", fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>{e.date}</span>
                <span>Pain: <strong>{e.pain}</strong>  Fatigue: <strong>{e.fatigue}</strong></span>
              </div>
              {e.notes && <div style={{ color: "#555", marginTop: 4 }}>{e.notes}</div>}
            </div>
          ))}
        </div>
      )}

      <div style={{ ...S.alert("success"), fontSize: 12 }}>
        ð¡ Tip: Log daily for 2â4 weeks before appointments. Your flare log helps physicians see patterns and supports requests for referrals.
      </div>
    </div>
  );
}

// ââ APP ROOT ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const navItems = [
  { id: "checker", label: "Checker", icon: "ð©º" },
  { id: "toolkit", label: "Toolkit", icon: "ð" },
  { id: "resources", label: "Resources", icon: "ð" },
  { id: "tracker", label: "Tracker", icon: "ð" },
];

export default function App() {
  const [tab, setTab] = useState("checker");
  const [savedResults, setSavedResults] = useState(null);

  const handleSave = (results) => {
    setSavedResults(results);
    setTimeout(() => setTab("toolkit"), 400);
  };

  return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={S.headerTitle}>ð¦ ZebraGuide</div>
        <div style={S.headerSub}>hEDS Self-Assessment & Doctor Advocacy Tool</div>
      </div>

      {tab === "checker" && <SymptomChecker onSave={handleSave} />}
      {tab === "toolkit" && <DoctorToolkit savedResults={savedResults} />}
      {tab === "resources" && <ResourceFinder />}
      {tab === "tracker" && <FlareTracker />}

      <nav style={S.nav}>
        {navItems.map(n => (
          <button key={n.id} style={S.navBtn(tab === n.id)} onClick={() => setTab(n.id)}>
            <span style={{ fontSize: 20 }}>{n.icon}</span>
            <span>{n.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
