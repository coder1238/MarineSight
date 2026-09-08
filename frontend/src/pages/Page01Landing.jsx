import React, { useState } from 'react';
import { 
  Radar, 
  Satellite, 
  Ship, 
  Waves, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Compass, 
  FileText, 
  Cpu,
  Layers,
  Database,
  Radio,
  Clock,
  Zap,
  MapPin,
  ExternalLink,
  Shield,
  Eye,
  Check,
  ChevronRight,
  Sparkles,
  Scale,
  Wind,
  Anchor,
  Droplet,
  BarChart3,
  AlertCircle
} from 'lucide-react';
import { AI_MODELS, INCIDENTS_REGISTRY } from '../data/mockData';
import { useIncident } from '../context/IncidentContext';
import MarineSightLogo from '../components/common/MarineSightLogo';

export default function Page01Landing({ onNavigate }) {
  const { selectIncident } = useIncident();

  // 1. Regional Corridors Tab State (6 Strategic Indian EEZ Corridors)
  const [activeCorridorId, setActiveCorridorId] = useState("OF-2026-0912");

  // 2. AI Models Category Filter
  const [modelCategory, setModelCategory] = useState("all");

  // 6 Core Forensic Capabilities
  const capabilities = [
    {
      title: "Satellite SAR Oil Spill Detection",
      icon: Satellite,
      page: "satellite",
      tag: "Sentinel-1 / 2 GRD",
      desc: "Synthetic aperture radar ingestion with Dual-Pol VV/VH ratio analysis and sub-pixel Attention U-Net slick segmentation."
    },
    {
      title: "Terrestrial & Satellite AIS Intelligence",
      icon: Ship,
      page: "vessel-intel",
      tag: "MMSI / IMO Tracking",
      desc: "Real-time streaming transponder decoding, historical track synthesis, and SAR dark-vessel backscatter detection."
    },
    {
      title: "Hydrodynamic Drift & Hindcast",
      icon: Waves,
      page: "source-trace",
      tag: "CMEMS + HYCOM",
      desc: "Coupled Lagrangian hydrodynamic reverse origin tracking and 72-hour forward coastal threat dispersion physics."
    },
    {
      title: "Bi-LSTM Trajectory Reconstruction",
      icon: Compass,
      page: "trajectory",
      tag: "Deep Kinematics",
      desc: "Bidirectional LSTM gap interpolation recovering suspicious AIS transponder blackout windows and abrupt course deviations."
    },
    {
      title: "Evidence Fusion & Vessel Attribution",
      icon: Target,
      page: "attribution",
      tag: "XGBoost Ranking",
      desc: "Siamese trajectory similarity network establishing court-admissible Investigation Priority Scores for lead suspects."
    },
    {
      title: "Environmental Risk & Response",
      icon: ShieldCheck,
      page: "response-plan",
      tag: "MARPOL Containment",
      desc: "Automated coastal vulnerability mapping, marine protected area buffering, and tactical containment boom optimization."
    }
  ];

  // 7-Step Forensic Investigation Lifecycle
  const workflowSteps = [
    { num: "01", name: "Detect", tech: "Sentinel-1 SAR VV/VH", desc: "Spaceborne radar dark-formation acquisition", page: "satellite" },
    { num: "02", name: "Characterize", tech: "Attention U-Net", desc: "Morphology, area, perimeter, and Fay spreading", page: "characterize" },
    { num: "03", name: "Trace", tech: "Lagrangian Hindcast", desc: "Stokes drift & ocean current reverse trajectory", page: "source-trace" },
    { num: "04", name: "Reconstruct", tech: "Bi-LSTM Interpolation", desc: "Recovers transponder blackout gaps & speed drops", page: "trajectory" },
    { num: "05", name: "Attribute", tech: "Siamese + XGBoost", desc: "Ranks candidate tankers by analytical priority", page: "attribution" },
    { num: "06", name: "Predict", tech: "OpenDrift Coupled", desc: "72-hour forward shoreline impact forecast", page: "simulation" },
    { num: "07", name: "Respond", tech: "Containment Booms", desc: "Coast Guard interceptor dispatch & skimming", page: "response-plan" }
  ];

  // 6 Strategic Regional Corridors in Indian EEZ
  const regionalCorridors = [
    {
      id: "OF-2026-0912",
      name: "Arabian Sea Corridor",
      subtext: "Offshore Goa / Karnataka EEZ",
      coords: "14.82°N, 68.21°E",
      areaKm2: 14.7,
      risk: "CRITICAL",
      topVessel: "MV Ocean Star (VLCC)",
      flag: "🇮🇳 India",
      sensor: "Sentinel-1 SAR C-Band",
      oilType: "Heavy Crude Oil (API 29.4°)",
      estVolume: "420 MT (3,150 bbls)",
      hindcastHours: "40h Reverse Hindcast",
      priorityScore: "91.4%",
      driftVector: "1.2 kn @ 135° SE Current",
      blackoutDuration: "38 min intentional AIS blackout",
      shorelineThreat: "Projected Landfall in 74h (Goa Marine Coast)",
      evidenceHash: "SHA-256 e8f12...49a1",
      description: "Major offshore tanker lane discharge with a 38-minute intentional AIS transponder blackout during origin transit."
    },
    {
      id: "OF-2026-0918",
      name: "Bay of Bengal Corridor",
      subtext: "Visakhapatnam / Paradip Approach",
      coords: "17.45°N, 83.85°E",
      areaKm2: 8.2,
      risk: "HIGH",
      topVessel: "Golden Apex (Chemical Tanker)",
      flag: "🇮🇳 India",
      sensor: "Sentinel-1 SAR VV/VH",
      oilType: "Chemical Slops & NLS Cargo Wash",
      estVolume: "180 MT (1,320 bbls)",
      hindcastHours: "24h Reverse Hindcast",
      priorityScore: "88.7%",
      driftVector: "0.9 kn @ 295° NW Current",
      blackoutDuration: "45 min low-rate transponder ping",
      shorelineThreat: "Landfall in 36h (AP Olive Ridley Turtle Habitats)",
      evidenceHash: "SHA-256 a1b94...3c82",
      description: "Illegal tank-cleaning discharge drifting northwest toward ecologically sensitive coastal turtle nesting grounds."
    },
    {
      id: "OF-2026-0925",
      name: "Gulf of Kutch Corridor",
      subtext: "Sikka / Kandla Oil Terminals",
      coords: "22.52°N, 69.18°E",
      areaKm2: 11.3,
      risk: "CRITICAL",
      topVessel: "Al-Baraka (Crude Carrier)",
      flag: "🇮🇳 India",
      sensor: "Sentinel-1 SAR C-Band",
      oilType: "Kuwait Heavy Export Crude",
      estVolume: "310 MT (2,280 bbls)",
      hindcastHours: "18h Reverse Hindcast",
      priorityScore: "94.2%",
      driftVector: "1.6 kn @ 045° NE Tidal Drift",
      blackoutDuration: "28 min blackout near SPM buoy",
      shorelineThreat: "Landfall in 14h (Marine National Park Coral Sanctuary)",
      evidenceHash: "SHA-256 79de2...990f",
      description: "High-density crude oil slick near refinery offshore single-point mooring (SPM) buoy anchorages."
    },
    {
      id: "OF-2026-0922",
      name: "Gulf of Mannar & Palk Strait",
      subtext: "Rameswaram Coral Biosphere",
      coords: "09.18°N, 79.32°E",
      areaKm2: 4.6,
      risk: "HIGH",
      topVessel: "Lanka Pioneer (Bulk Carrier)",
      flag: "🇱🇰 Sri Lanka",
      sensor: "Sentinel-2 MSI Optical",
      oilType: "Low Sulfur Marine Gas Oil (MGO)",
      estVolume: "95 MT (710 bbls)",
      hindcastHours: "32h Reverse Hindcast",
      priorityScore: "86.1%",
      driftVector: "0.7 kn @ 210° SW Current",
      blackoutDuration: "Course deviation without transponder ping drop",
      shorelineThreat: "Threat to Dugong Seagrass & Coral Reefs (48h)",
      evidenceHash: "SHA-256 3f281...cb5e",
      description: "Bunker fuel discharge threatening sensitive marine national park coral reefs and dugong seagrass habitats."
    },
    {
      id: "OF-2026-0930",
      name: "Strait of Malacca (Six Degree Channel)",
      subtext: "Great Nicobar International Shipping Lane",
      coords: "06.85°N, 93.95°E",
      areaKm2: 19.8,
      risk: "CRITICAL",
      topVessel: "Pacific Vanguard (ULCC)",
      flag: "🇮🇳 India",
      sensor: "Sentinel-1 SAR C-Band",
      oilType: "Heavy Crude Sludge / Wash",
      estVolume: "680 MT (5,030 bbls)",
      hindcastHours: "48h Reverse Hindcast",
      priorityScore: "93.8%",
      driftVector: "2.1 kn @ 095° E Current",
      blackoutDuration: "52 min dark vessel gap recorded by coastal radar",
      shorelineThreat: "Deep oceanic dispersion across Great Nicobar Biosphere",
      evidenceHash: "SHA-256 bb902...71e4",
      description: "Massive 19.8 km² slick in the world's busiest chokepoint; non-AIS dark vessel echo detected by coastal radar."
    },
    {
      id: "OF-2026-0909",
      name: "Laccadive Sea Corridor",
      subtext: "Minicoy Nine Degree Channel",
      coords: "08.35°N, 73.15°E",
      areaKm2: 6.5,
      risk: "MEDIUM",
      topVessel: "Poseidon Trader (Container)",
      flag: "🇮🇳 India",
      sensor: "Landsat-8 OLI/TIRS",
      oilType: "Machinery Bilge & Oily Water",
      estVolume: "120 MT (890 bbls)",
      hindcastHours: "14h Reverse Hindcast",
      priorityScore: "79.5%",
      driftVector: "1.1 kn @ 110° ESE Current",
      blackoutDuration: "19 min speed drop during nighttime passage",
      shorelineThreat: "Dispersing east towards Lakshadweep Atolls (88h)",
      evidenceHash: "SHA-256 50cc1...34a0",
      description: "Dispersed hydrocarbon sheen wake identified along east-west trans-oceanic container shipping route."
    }
  ];

  const activeCorridor = regionalCorridors.find(c => c.id === activeCorridorId) || regionalCorridors[0];

  // Filtered AI Models
  const filteredAiModels = AI_MODELS.filter(m => {
    if (modelCategory === "all") return true;
    if (modelCategory === "vision") return m.id === "M01" || m.id === "M02" || m.id === "M03" || m.id === "M04";
    if (modelCategory === "kinematics") return m.id === "M05" || m.id === "M06" || m.id === "M07";
    if (modelCategory === "hydro") return m.id === "M08" || m.id === "M09" || m.id === "M10";
    return true;
  });

  // Handle Launching a Regional Case
  const handleLaunchCorridorCase = (caseId, targetPage = "workspace") => {
    selectIncident(caseId);
    onNavigate(targetPage);
  };

  return (
    <div className="min-h-screen bg-white text-text-primary selection:bg-ocean-sky selection:text-ocean-deep">
      
      {/* Sticky Top Navigation Bar */}
      <nav className="border-b border-border-marine px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <MarineSightLogo showTagline={false} />
          <div className="hidden sm:block border-l border-border-marine pl-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-status-success text-[10px] font-mono font-bold">
                ● LIVE RADAR & SAR INGEST
              </span>
            </div>
            <p className="text-[11px] text-text-muted">
              AI Marine Oil Spill & Vessel Attribution Intelligence Platform
            </p>
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
          <button 
            onClick={() => onNavigate("live-monitor")}
            className="px-3 py-1.5 rounded-lg text-ocean-navy hover:text-ocean hover:bg-ocean-sky transition-colors flex items-center gap-1.5"
          >
            <Radio className="w-3.5 h-3.5 text-ocean" />
            <span className="hidden sm:inline">Live Monitor</span>
          </button>
          
          <button 
            onClick={() => onNavigate("incidents")}
            className="px-3 py-1.5 rounded-lg text-ocean-navy hover:text-ocean hover:bg-ocean-sky transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-ocean" />
            <span className="hidden sm:inline">Registry</span>
          </button>

          <button 
            onClick={() => onNavigate("command-center")}
            className="px-3 py-1.5 rounded-lg text-ocean-navy hover:text-ocean hover:bg-ocean-sky transition-colors"
          >
            Command Portal
          </button>

          <button 
            onClick={() => onNavigate("workspace")}
            className="px-4 py-2 rounded-xl bg-ocean hover:bg-ocean-deep text-white font-bold shadow-marine-sm transition-all flex items-center gap-1.5 hover:scale-[1.02]"
          >
            <span>Start Investigation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 px-4 sm:px-6 bg-gradient-to-b from-ocean-light via-white to-ocean-light/30 border-b border-border-marine">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          
          {/* Government & Research Grade Badge */}
          <div className="inline-flex items-center gap-2 bg-ocean-sky/70 border border-ocean/30 px-4 py-1.5 rounded-full text-xs font-bold text-ocean-deep mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-status-success animate-ping"></span>
            <span>INTELLIGENCE-GRADE MARINE FORENSICS · COPENHAGEN & SIH 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-ocean-navy tracking-tight leading-tight max-w-4xl mx-auto">
            AUTONOMOUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean to-ocean-bright">OIL SPILL FORENSICS</span> & VESSEL ATTRIBUTION
          </h1>

          <p className="mt-5 text-sm sm:text-base lg:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Delineate illegal hydrocarbon discharges from Sentinel-1 SAR imagery, reconstruct hydrodynamic drift backwards in time to pinpoint Origin Zone A, and formulate court-admissible AIS vessel attribution affidavits.
          </p>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => onNavigate("workspace")}
              className="px-6 py-3 rounded-xl bg-ocean hover:bg-ocean-deep text-white text-sm font-bold shadow-marine-md transition-all flex items-center gap-2 group hover:scale-[1.02]"
            >
              <span>Launch Investigation Workspace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => onNavigate("live-monitor")}
              className="px-6 py-3 rounded-xl border border-border-marine bg-white hover:bg-ocean-sky text-ocean-navy text-sm font-bold shadow-marine-sm transition-all flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-ocean" />
              <span>Open Live GIS Monitor</span>
            </button>

            <button
              onClick={() => onNavigate("incidents")}
              className="px-5 py-3 rounded-xl border border-border-marine bg-white hover:bg-ocean-sky text-ocean-navy text-sm font-semibold transition-all"
            >
              Browse 6 EEZ Cases
            </button>
          </div>

          {/* Clean Operational Multi-Sensor Forensic Intelligence Showcase (Replaces fake radar simulator) */}
          <div className="mt-12 max-w-5xl mx-auto bg-[#071E30] p-4 sm:p-6 rounded-3xl shadow-2xl border border-border-marine/50 text-left relative overflow-hidden">
            
            {/* Top Tactical Status Bar */}
            <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs font-mono text-white/90 gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-bold text-white tracking-wide">OPERATIONAL FORENSIC DOSSIER · CASE OF-2026-0912</span>
                <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-500/60 text-red-300 font-bold text-[10px]">
                  CRITICAL INCIDENT
                </span>
              </div>

              {/* Mission Station Telemetry */}
              <div className="flex items-center gap-3 text-[11px] text-slate-300">
                <span className="font-mono">Arabian Sea Corridor · 14.8214°N, 68.2108°E</span>
                <span className="px-2.5 py-0.5 rounded bg-ocean/80 text-white font-bold text-[10px]">
                  SENTINEL-1 C-BAND SAR
                </span>
              </div>
            </div>

            {/* Tri-Sensor Multi-Domain Forensic Evidence Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Card 1: SAR Spaceborne Delineation */}
              <div className="bg-[#0B2538] p-4 rounded-2xl border border-white/10 flex flex-col justify-between space-y-3 hover:border-ocean transition-all">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#00E5FF] font-bold flex items-center gap-1.5">
                      <Satellite className="w-3.5 h-3.5 text-[#00E5FF]" />
                      SAR RADAR DELINEATION
                    </span>
                    <span className="text-slate-400">10m Res</span>
                  </div>

                  <div className="mt-3 p-2.5 bg-[#051522] rounded-xl border border-white/5 space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Delineated Area:</span>
                      <span className="text-white font-bold">14.72 km² (Perim: 28.4 km)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Segmentation:</span>
                      <span className="text-emerald-400 font-bold">Attention U-Net (96.8%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Polarization:</span>
                      <span className="text-white">Dual-Pol VV/VH (8.4 dB)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Volume Estimate:</span>
                      <span className="text-amber-400 font-bold">~420 Metric Tons</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    Continuous dark formation trailing 128° SE. Biogenic false-positive filter applied; wind speed 4.2 m/s confirms surface tension damping.
                  </p>
                </div>

                <button
                  onClick={() => onNavigate("satellite")}
                  className="mt-2 text-xs font-bold text-[#00E5FF] hover:text-white flex items-center gap-1 group pt-2 border-t border-white/10"
                >
                  <span>Inspect SAR Decompositions</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Card 2: Coupled Hydrodynamic Reverse Hindcast */}
              <div className="bg-[#0B2538] p-4 rounded-2xl border border-white/10 flex flex-col justify-between space-y-3 hover:border-ocean transition-all">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-amber-400 font-bold flex items-center gap-1.5">
                      <Waves className="w-3.5 h-3.5 text-amber-400" />
                      DRIFT & ORIGIN HINDCAST
                    </span>
                    <span className="text-slate-400">T-40h Runge-Kutta</span>
                  </div>

                  <div className="mt-3 p-2.5 bg-[#051522] rounded-xl border border-white/5 space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Origin Zone:</span>
                      <span className="text-amber-300 font-bold">Zone A (14.821°N, 68.211°E)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Drift Vector:</span>
                      <span className="text-white font-bold">1.2 kn @ 135° SE Current</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Windage Coefficient:</span>
                      <span className="text-white">3.1% Stokes Drift</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Shoreline Threat:</span>
                      <span className="text-red-400 font-bold">74h Landfall (Goa Coast)</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    Coupled CMEMS hydrodynamic hindcast converges 5,000 backward particles to a single transit lane point at T-38h with 1.8 NM circular error.
                  </p>
                </div>

                <button
                  onClick={() => onNavigate("source-trace")}
                  className="mt-2 text-xs font-bold text-amber-400 hover:text-white flex items-center gap-1 group pt-2 border-t border-white/10"
                >
                  <span>Trace Lagrangian Origins</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Card 3: AIS Kinematics & Vessel Attribution */}
              <div className="bg-[#0B2538] p-4 rounded-2xl border border-white/10 flex flex-col justify-between space-y-3 hover:border-ocean transition-all">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-rose-400 font-bold flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-rose-400" />
                      VESSEL ATTRIBUTION
                    </span>
                    <span className="text-emerald-400 font-bold">91.4% Priority</span>
                  </div>

                  <div className="mt-3 p-2.5 bg-[#051522] rounded-xl border border-white/5 space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Primary Suspect:</span>
                      <span className="text-rose-300 font-bold">MV Ocean Star (VLCC)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">IMO / MMSI:</span>
                      <span className="text-white">IMO 9418201 · Flag: India</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">AIS Transponder Gap:</span>
                      <span className="text-rose-400 font-bold">38 min Intentional Blackout</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Kinematic Shift:</span>
                      <span className="text-amber-400">13.2 kn → 3.8 kn in Zone A</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    Bi-LSTM interpolation recovered transponder blackout window. Spatial intersection with Origin Zone A during speed drop establishes prime liability.
                  </p>
                </div>

                <button
                  onClick={() => onNavigate("attribution")}
                  className="mt-2 text-xs font-bold text-rose-400 hover:text-white flex items-center gap-1 group pt-2 border-t border-white/10"
                >
                  <span>View Court-Admissible Dossier</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Tactical Action Bar */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400 flex-wrap">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Forensic Chain-of-Custody Verified
                </span>
                <span className="hidden md:inline">|</span>
                <span className="hidden md:inline text-slate-400">
                  MARPOL Annex I & UNCLOS 211 Formatted
                </span>
                <span className="hidden md:inline">|</span>
                <span className="hidden md:inline text-slate-400 font-mono text-[11px]">
                  SHA-256: 4b29f0...c9a1
                </span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  onClick={() => onNavigate("live-monitor")}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Activity className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Real-Time GIS View</span>
                </button>

                <button
                  onClick={() => onNavigate("workspace")}
                  className="px-4 py-2 rounded-xl bg-ocean hover:bg-ocean-deep text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <span>Open Full Case Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Operational Statistics Strip */}
      <section className="py-12 bg-white border-b border-border-marine px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-4 rounded-2xl bg-ocean-light/50 border border-border-marine/60 shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-ocean-deep font-mono">12,840+</div>
            <p className="text-xs text-text-secondary font-bold mt-1">Satellite Scenes Ingested</p>
            <span className="text-[10px] text-ocean font-mono mt-0.5 block">Sentinel-1, 2, Landsat-8</span>
          </div>

          <div className="p-4 rounded-2xl bg-ocean-light/50 border border-border-marine/60 shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-ocean-deep font-mono">4,280+</div>
            <p className="text-xs text-text-secondary font-bold mt-1">Discharges Classified</p>
            <span className="text-[10px] text-status-success font-mono mt-0.5 block">96.8% AI True Positive</span>
          </div>

          <div className="p-4 rounded-2xl bg-ocean-light/50 border border-border-marine/60 shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-ocean-deep font-mono">8,421+</div>
            <p className="text-xs text-text-secondary font-bold mt-1">Vessels Monitored 24/7</p>
            <span className="text-[10px] text-ocean font-mono mt-0.5 block">Indian EEZ & International Lanes</span>
          </div>

          <div className="p-4 rounded-2xl bg-ocean-light/50 border border-border-marine/60 shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-ocean font-mono">Sub-Second</div>
            <p className="text-xs text-text-secondary font-bold mt-1">Attribution Inference</p>
            <span className="text-[10px] text-status-success font-mono mt-0.5 block">10 Active AI Models</span>
          </div>
        </div>
      </section>

      {/* 6 Strategic Maritime Corridors Showcase (Indian EEZ) */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white via-ocean-light/30 to-white border-b border-border-marine">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-ocean tracking-wider uppercase font-mono">National Maritime Surveillance</h2>
            <p className="text-2xl sm:text-3xl font-black text-ocean-navy mt-1.5">
              6 Strategic Indian EEZ Maritime Corridors
            </p>
            <p className="text-xs sm:text-sm text-text-secondary mt-2">
              Explore active satellite forensic cases across Arabian Sea, Bay of Bengal, Gulf of Kutch, Gulf of Mannar, Strait of Malacca, and Laccadive Sea.
            </p>
          </div>

          {/* Corridor Selection Pills */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {regionalCorridors.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCorridorId(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCorridorId === c.id
                    ? 'bg-ocean text-white shadow-marine-sm scale-105'
                    : 'bg-white border border-border-marine text-ocean-navy hover:bg-ocean-sky'
                }`}
              >
                <span>{c.name.split('(')[0].trim()}</span>
              </button>
            ))}
          </div>

          {/* Featured Corridor Showcase Card */}
          <div className="bg-white border-2 border-ocean/30 rounded-3xl p-5 sm:p-7 shadow-marine-md grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-fade-in">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-status-danger font-mono font-bold text-[10px]">
                  {activeCorridor.risk} TIER INCIDENT
                </span>
                <span className="text-xs font-mono text-ocean-deep font-bold">{activeCorridor.id}</span>
                <span className="text-xs font-mono text-text-muted">· {activeCorridor.coords}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-ocean-navy">
                {activeCorridor.name} — {activeCorridor.subtext}
              </h3>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {activeCorridor.description}
              </p>

              {/* Corridor Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono">
                <div className="p-2.5 bg-ocean-light/60 rounded-xl border border-border-marine/50">
                  <span className="text-[9px] text-text-muted block">DETECTED AREA</span>
                  <span className="font-bold text-ocean-navy">{activeCorridor.areaKm2} km²</span>
                </div>
                <div className="p-2.5 bg-ocean-light/60 rounded-xl border border-border-marine/50">
                  <span className="text-[9px] text-text-muted block">PRIMARY SENSOR</span>
                  <span className="font-bold text-ocean-deep truncate block">{activeCorridor.sensor.split(' ')[0]}</span>
                </div>
                <div className="p-2.5 bg-ocean-light/60 rounded-xl border border-border-marine/50">
                  <span className="text-[9px] text-text-muted block">LEAD SUSPECT</span>
                  <span className="font-bold text-status-danger truncate block">{activeCorridor.topVessel.split('(')[0]}</span>
                </div>
                <div className="p-2.5 bg-ocean-light/60 rounded-xl border border-border-marine/50">
                  <span className="text-[9px] text-text-muted block">FLAG STATE</span>
                  <span className="font-bold text-ocean-navy truncate block">{activeCorridor.flag}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => handleLaunchCorridorCase(activeCorridor.id, "workspace")}
                  className="px-5 py-2.5 rounded-xl bg-ocean hover:bg-ocean-deep text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
                >
                  <span>Open Investigation ({activeCorridor.id})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleLaunchCorridorCase(activeCorridor.id, "live-monitor")}
                  className="px-4 py-2.5 rounded-xl border border-border-marine hover:bg-ocean-sky text-ocean-navy text-xs font-bold transition-colors"
                >
                  Monitor on Live Map
                </button>
              </div>
            </div>

            {/* High-Fidelity Forensic Telemetry Dossier for Active Corridor */}
            <div className="lg:col-span-5 bg-[#0B2538] p-4 sm:p-5 rounded-2xl border border-border-marine/40 text-white font-mono text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px]">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  RADAR & SATELLITE TELEMETRY
                </span>
                <span className="text-slate-400">{activeCorridor.coords}</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="p-2 bg-[#051522] rounded-lg border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Hydrocarbon Classification:</span>
                  <span className="text-[#00E5FF] font-bold">{activeCorridor.oilType}</span>
                </div>

                <div className="p-2 bg-[#051522] rounded-lg border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Estimated Total Volume:</span>
                  <span className="text-amber-300 font-bold">{activeCorridor.estVolume}</span>
                </div>

                <div className="p-2 bg-[#051522] rounded-lg border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Hydrodynamic Drift:</span>
                  <span className="text-white">{activeCorridor.driftVector}</span>
                </div>

                <div className="p-2 bg-[#051522] rounded-lg border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">AIS Kinematics:</span>
                  <span className="text-red-300 font-bold">{activeCorridor.blackoutDuration}</span>
                </div>

                <div className="p-2 bg-[#051522] rounded-lg border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Ecological Shore Threat:</span>
                  <span className="text-rose-400 font-bold">{activeCorridor.shorelineThreat}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Chain of Custody: <strong className="text-white font-mono">{activeCorridor.evidenceHash}</strong></span>
                <span className="text-emerald-400 font-bold">Attribution: {activeCorridor.priorityScore}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Step Forensic Workflow */}
      <section className="py-20 px-4 sm:px-6 bg-white border-b border-border-marine">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-ocean tracking-wider uppercase font-mono">Investigation Architecture</h2>
            <p className="text-2xl sm:text-3xl font-black text-ocean-navy mt-1.5">
              The Seven-Step Forensic Attribution Lifecycle
            </p>
            <p className="text-xs sm:text-sm text-text-secondary mt-2">
              Click any stage below to inspect its dedicated neural network or hydrodynamic physics module.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {workflowSteps.map((step) => (
              <div 
                key={step.num}
                onClick={() => onNavigate(step.page)}
                className="p-3.5 rounded-2xl bg-ocean-light/40 border border-border-marine hover:border-ocean hover:bg-ocean-sky/40 transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-marine-sm"
              >
                <div>
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-xs font-black text-ocean">{step.num}</span>
                    <ArrowRight className="w-3 h-3 text-text-muted group-hover:text-ocean group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h4 className="text-sm font-bold text-ocean-navy mt-1 group-hover:text-ocean-deep">
                    {step.name}
                  </h4>
                  <span className="text-[10px] font-mono text-ocean-deep font-semibold block mt-0.5">
                    {step.tech}
                  </span>
                </div>
                <p className="text-[11px] text-text-secondary mt-3 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Source Data Ingestion & Sensor Fusion Architecture */}
      <section className="py-16 px-4 sm:px-6 bg-ocean-light/30 border-b border-border-marine">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-ocean tracking-wider uppercase font-mono">Sensory Backbone</h2>
            <p className="text-2xl sm:text-3xl font-black text-ocean-navy mt-1.5">
              Multi-Source Ingestion & Fusion Architecture
            </p>
            <p className="text-xs sm:text-sm text-text-secondary mt-2">
              Synthesizing orbital radar satellites, terrestrial transponders, coastal radar, and numerical ocean models into a unified intelligence pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-border-marine shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-ocean flex items-center justify-center font-bold">
                <Satellite className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-ocean-navy">Spaceborne SAR Constellation</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Automated Copernicus Open Access Hub polling for Sentinel-1 C-Band SAR (IW Mode, 250km swath) with all-weather, day-and-night sea surface penetration.
              </p>
              <div className="pt-2 border-t border-border-marine/50 text-[10px] font-mono text-ocean font-bold">
                10m GSD · VV/VH Dual-Pol
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border-marine shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-status-success flex items-center justify-center font-bold">
                <Ship className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-ocean-navy">Terrestrial & Satellite AIS</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Ingests 8,400+ simultaneous Class-A vessel transponders via DGLL coastal VTS antennas and satellite constellation feeds with AIVDM stream parsing.
              </p>
              <div className="pt-2 border-t border-border-marine/50 text-[10px] font-mono text-status-success font-bold">
                156.025 - 162.025 MHz RX
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border-marine shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-status-warning flex items-center justify-center font-bold">
                <Waves className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-ocean-navy">MetOcean & Current Dynamics</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                INCOIS Coastal Ocean Dynamics Applications Radar (CODAR) coupled with CMEMS 0.083° global currents and NOAA GFS 10m wind stress vectors.
              </p>
              <div className="pt-2 border-t border-border-marine/50 text-[10px] font-mono text-status-warning font-bold">
                4th-Order Runge-Kutta Advection
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border-marine shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-ocean-navy">Evidence Hash & Legal Integrity</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Every satellite granule, raw AIS message packet, and backward trajectory calculation is stamped with SHA-256 cryptographic signatures.
              </p>
              <div className="pt-2 border-t border-border-marine/50 text-[10px] font-mono text-purple-600 font-bold">
                Indian Evidence Act Sec 65B
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Grid */}
      <section className="py-20 px-4 sm:px-6 bg-white border-b border-border-marine">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-ocean tracking-wider uppercase font-mono">System Capabilities</h2>
            <p className="text-2xl sm:text-3xl font-black text-ocean-navy mt-1.5">
              End-to-End Maritime Intelligence Engine
            </p>
            <p className="text-xs sm:text-sm text-text-secondary mt-2">
              Coupling high-resolution spaceborne radar, terrestrial AIS feeds, and numerical ocean dynamics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div 
                  key={i} 
                  onClick={() => onNavigate(cap.page)}
                  className="p-6 rounded-3xl bg-white border border-border-marine shadow-marine-sm hover:shadow-marine-md hover:border-ocean transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-ocean-sky text-ocean flex items-center justify-center group-hover:bg-ocean group-hover:text-white transition-colors shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ocean-light text-ocean font-bold border border-ocean/20">
                        {cap.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-ocean-navy mb-2 group-hover:text-ocean transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border-marine/50 flex items-center justify-between text-xs font-bold text-ocean">
                    <span>Launch Module</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10 Specialized AI Models Section */}
      <section className="py-20 px-4 sm:px-6 bg-white border-b border-border-marine">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-ocean tracking-wider uppercase font-mono">Neural Architecture</h2>
            <p className="text-2xl sm:text-3xl font-black text-ocean-navy mt-1.5">
              10 Specialized AI & Hydrodynamic Models
            </p>
            <p className="text-xs sm:text-sm text-text-secondary mt-2">
              Every stage of the investigation runs specialized neural networks and hydrodynamic equations.
            </p>
          </div>

          {/* Model Category Tabs */}
          <div className="flex items-center justify-center gap-1.5 overflow-x-auto text-xs font-mono">
            {[
              { id: "all", label: "All 10 Models" },
              { id: "vision", label: "Computer Vision & SAR" },
              { id: "kinematics", label: "Kinematic AIS LSTM" },
              { id: "hydro", label: "Hydrodynamic Drift & Weathering" }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setModelCategory(id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                  modelCategory === id
                    ? 'bg-ocean text-white shadow-xs'
                    : 'bg-ocean-light text-text-secondary hover:bg-ocean-sky'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {filteredAiModels.map((model) => (
              <div 
                key={model.id} 
                className="p-4 bg-white border border-border-marine rounded-2xl shadow-marine-sm flex flex-col justify-between hover:border-ocean transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1.5">
                    <span className="text-ocean">{model.id}</span>
                    <span className="text-status-success flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      <span>{model.status}</span>
                    </span>
                  </div>

                  <h5 className="text-xs font-black text-ocean-navy leading-tight">{model.name}</h5>
                  <p className="text-[10px] text-ocean-deep font-mono font-semibold mt-1">{model.architecture}</p>
                  <p className="text-[10px] text-text-muted mt-1.5 line-clamp-2">{model.purpose}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-border-marine/50 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-text-muted">Inference: {model.latencySec}s</span>
                  <span className="font-bold text-status-success">{model.confidence}% Conf</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maritime Legal Admissibility & Coastal Protection Standards */}
      <section className="py-16 px-4 sm:px-6 bg-white border-b border-border-marine">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-ocean tracking-wider uppercase font-mono">Prosecution & Compliance</h2>
            <p className="text-2xl sm:text-3xl font-black text-ocean-navy mt-1.5">
              Court-Admissible Legal Standards & Environmental Protection
            </p>
            <p className="text-xs sm:text-sm text-text-secondary mt-2">
              Bridging spaceborne detection and international maritime environmental law with unassailable digital forensics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="p-5 rounded-2xl bg-ocean-light/40 border border-border-marine shadow-xs space-y-2.5">
              <div className="flex items-center gap-2 text-ocean font-bold">
                <Scale className="w-4 h-4 text-ocean" />
                <span>MARPOL 73/78 ANNEX I & REGULATION 34</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Calculates instantaneous discharge rates exceeding 30 liters per nautical mile and 15 ppm effluent thresholds for machinery bilge and tanker ballast tank washings in accordance with IMO standards.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-ocean-light/40 border border-border-marine shadow-xs space-y-2.5">
              <div className="flex items-center gap-2 text-ocean font-bold">
                <Shield className="w-4 h-4 text-ocean" />
                <span>UNCLOS ARTICLE 194 & 211 ENFORCEMENT</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Empowers coastal state jurisdiction across territorial waters (12 NM) and the Exclusive Economic Zone (200 NM) to detain violating flag vessels and petition international maritime tribunals.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-ocean-light/40 border border-border-marine shadow-xs space-y-2.5">
              <div className="flex items-center gap-2 text-ocean font-bold">
                <FileText className="w-4 h-4 text-ocean" />
                <span>INDIAN EVIDENCE ACT SEC 65B AUDIT</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Cryptographic SHA-256 hashing of raw Sentinel-1 SAR scenes and NMEA AIS transponder logs guarantees tamper-proof chain of custody, ensuring admissibility in National Green Tribunal proceedings.
              </p>
            </div>
          </div>

          {/* Coastal Ecological Vulnerability Matrix */}
          <div className="bg-ocean-light/60 border border-border-marine rounded-3xl p-5 sm:p-7 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-status-danger" />
                <h4 className="font-bold text-sm text-ocean-navy uppercase tracking-wide">
                  Indian Coastal Ecological Vulnerability & Response Index
                </h4>
              </div>
              <span className="text-xs font-mono text-ocean-deep font-bold">
                INCOIS Vulnerability Mapping Integration
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-white rounded-xl border border-border-marine space-y-1.5">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-ocean-navy">Western Seabed (Goa & Malvan)</span>
                  <span className="text-status-danger font-mono text-[10px]">ESI Tier 1 (Critical)</span>
                </div>
                <p className="text-text-secondary text-[11px] leading-relaxed">
                  Coral reefs, mangrove estuaries, and tourism coastline. 4,200m offshore containment boom pre-staged with Fast Patrol Vessel ICGS Varaha.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-border-marine space-y-1.5">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-ocean-navy">Eastern Seabed (Gahirmatha & Vizag)</span>
                  <span className="text-status-warning font-mono text-[10px]">ESI Tier 2 (High)</span>
                </div>
                <p className="text-text-secondary text-[11px] leading-relaxed">
                  Olive Ridley sea turtle mass nesting grounds and mangrove sanctuaries. High-capacity disc skimmers deployed to deflect northwestward drift.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-border-marine space-y-1.5">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-ocean-navy">Southern Gulf of Mannar Biosphere</span>
                  <span className="text-status-danger font-mono text-[10px]">ESI Tier 1 (Critical)</span>
                </div>
                <p className="text-text-secondary text-[11px] leading-relaxed">
                  UNESCO Biosphere Reserve with endemic Dugong habitats and fragile fringing coral reefs. Specialized sorbent booms and chemical dispersant ban in effect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer with Live System Heartbeat */}
      <footer className="py-12 px-4 sm:px-6 bg-[#071927] text-white text-xs border-t border-border-marine/30">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Top Heartbeat Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs font-mono">
            <MarineSightLogo variant="dark" />

            {/* System Status Indicators */}
            <div className="flex items-center gap-3 flex-wrap text-[10px]">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>ESA COPERNICUS: CONNECTED</span>
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>COASTAL RADAR VTS: 48 NM ACTIVE</span>
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>AIS CH-16/70 DSC: 156.8 MHz RX</span>
              </span>
            </div>
          </div>

          {/* Sitemap Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-[11px]">
            <div>
              <h5 className="font-bold text-white uppercase mb-2 font-mono text-ocean-bright">Surveillance Hub</h5>
              <ul className="space-y-1.5 text-white/70">
                <li><button onClick={() => onNavigate("live-monitor")} className="hover:text-white">03 · Live GIS Monitor</button></li>
                <li><button onClick={() => onNavigate("command-center")} className="hover:text-white">02 · Command Center</button></li>
                <li><button onClick={() => onNavigate("incidents")} className="hover:text-white">04 · Incidents Registry</button></li>
                <li><button onClick={() => onNavigate("workspace")} className="hover:text-white">05 · Investigation Hub</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase mb-2 font-mono text-ocean-bright">Sensor & Vision</h5>
              <ul className="space-y-1.5 text-white/70">
                <li><button onClick={() => onNavigate("satellite")} className="hover:text-white">06 · Satellite SAR Ingest</button></li>
                <li><button onClick={() => onNavigate("characterize")} className="hover:text-white">07 · Spill Characterization</button></li>
                <li><button onClick={() => onNavigate("source-trace")} className="hover:text-white">09 · Backward Hindcast</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase mb-2 font-mono text-ocean-bright">Vessel Intelligence</h5>
              <ul className="space-y-1.5 text-white/70">
                <li><button onClick={() => onNavigate("vessel-intel")} className="hover:text-white">10 · Vessel Intel Dossier</button></li>
                <li><button onClick={() => onNavigate("trajectory")} className="hover:text-white">11 · Trajectory Bi-LSTM</button></li>
                <li><button onClick={() => onNavigate("attribution")} className="hover:text-white">12 · Forensic Attribution</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase mb-2 font-mono text-ocean-bright">Risk & Legal</h5>
              <ul className="space-y-1.5 text-white/70">
                <li><button onClick={() => onNavigate("simulation")} className="hover:text-white">08 · Drift Simulation</button></li>
                <li><button onClick={() => onNavigate("evidence-risk")} className="hover:text-white">13 · Legal Evidence Risk</button></li>
                <li><button onClick={() => onNavigate("response-plan")} className="hover:text-white">14 · Containment Response</button></li>
                <li><button onClick={() => onNavigate("report-system")} className="hover:text-white">15 · Dossier Generator</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-white/50 text-[10px] gap-2">
            <p>© 2026 MarineSight Platform. Smart India Hackathon (SIH 2026) Maritime Environmental Intelligence.</p>
            <p>Compatible with Sentinel-1/2 Copernicus, Terrestrial AIS, and NOAA GNOME.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
