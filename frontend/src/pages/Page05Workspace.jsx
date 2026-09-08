import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Share2, 
  Download, 
  AlertOctagon, 
  Clock, 
  Layers, 
  Compass, 
  Ship, 
  ArrowRight, 
  Target, 
  ExternalLink, 
  CheckCircle2,
  AlertTriangle,
  Wind,
  Waves,
  Satellite,
  Check,
  Plus,
  Copy,
  X,
  Sparkles,
  Activity,
  Sliders,
  ShieldCheck,
  CheckSquare,
  Square,
  HelpCircle,
  Eye,
  Radio
} from 'lucide-react';
import PipelineStepper from '../components/common/PipelineStepper';
import GISMapMock from '../components/gis/GISMapMock';
import { useIncident } from '../context/IncidentContext';
import { INCIDENTS_REGISTRY } from '../data/mockData';

export default function Page05Workspace({ onNavigate }) {
  const { activeIncidentId, selectIncident, activeIncident, allIncidents } = useIncident();
  const caseData = activeIncident;

  // 1. Workspace Sub-Tab State
  const [activeTab, setActiveTab] = useState("overview"); // overview, fleet, environment, timeline, checklist
  
  // 2. Case Lifecycle Status State
  const [caseStatus, setCaseStatus] = useState(caseData.status || "Investigating");

  // 3. Export Modal State
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);

  // 4. Timeline Events State (with Dynamic Analyst Log)
  const [timelineEvents, setTimelineEvents] = useState([
    { id: 1, time: "15:01 UTC", category: "ai", title: "Trajectory analysis started", desc: `BF-BiLSTM model active on candidate ${caseData.topVessel?.name || 'suspect'} blackout gap.`, page: "trajectory" },
    { id: 2, time: "14:53 UTC", category: "radar", title: `${caseData.candidateCount || 12} candidate vessels identified`, desc: `Spatio-temporal corridor filtering isolated vessels from historical AIS.`, page: "vessel-intel" },
    { id: 3, time: "14:48 UTC", category: "ai", title: "Backward hindcast completed", desc: `${caseData.hindcast?.originZoneA?.name || 'Origin Zone A'} isolated with ${caseData.hindcast?.originZoneA?.confidence || 72}% confidence.`, page: "source-trace" },
    { id: 4, time: "14:41 UTC", category: "ai", title: "Spill segmentation completed", desc: `${caseData.spillAreaKm2} km² slick polygon delineated. Orientation: ${caseData.orientationDeg || 37}° azimuth.`, page: "characterize" },
    { id: 5, time: "14:36 UTC", category: "ai", title: "Hydrocarbon classification verified", desc: `Dual-Pol ResNet-50 confirmed mineral oil signature (${caseData.detectionConfidence || 96}% confidence).`, page: "satellite" },
    { id: 6, time: "14:32 UTC", category: "satellite", title: "Sentinel-1 SAR scene ingested", desc: `Acquisition ingested and pre-processed in ${caseData.regionShort || 'Coastal Waters'}.`, page: "satellite" }
  ]);
  const [timelineFilter, setTimelineFilter] = useState("all");
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteAuthor, setNewNoteAuthor] = useState("Lead Analyst");

  // 5. Forensic Verification Checklist State
  const [checklist, setChecklist] = useState([
    { id: 1, label: "SAR Scene False-Positive Spectral Check", desc: "Dual-pol VV/VH ratio confirmed non-biogenic crude film.", checked: true },
    { id: 2, label: "Spill Boundary & Fay Viscous Dispersion Model", desc: "Slick perimeter and spreading rate validated against hydrodynamic field.", checked: true },
    { id: 3, label: "Backward Lagrangian Origin Zone Identification", desc: "Reverse drift trajectory localized Origin Zone A coordinates.", checked: true },
    { id: 4, label: "AIS Transponder Blackout Duration Corroboration", desc: "Target vessel gap window synchronized with calculated release time.", checked: false },
    { id: 5, label: "Bi-LSTM Kinematic Deceleration Corridor Verification", desc: "Speed drop anomaly matched to slick origin approach point.", checked: false },
    { id: 6, label: "Formulate Legal Affidavit & Coast Guard Directive", desc: "Generate court-admissible MARPOL Annex I violation dossier.", checked: false }
  ]);

  // Checklist completion calculation
  const verifiedCount = checklist.filter(c => c.checked).length;
  const verifiedPercent = Math.round((verifiedCount / checklist.length) * 100);

  // Filtered Timeline Events
  const filteredTimeline = useMemo(() => {
    if (timelineFilter === "all") return timelineEvents;
    return timelineEvents.filter(e => e.category === timelineFilter);
  }, [timelineEvents, timelineFilter]);

  // Handle Add Analyst Log Note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const timeStr = new Date().toUTCString().split(' ')[4].substring(0, 5) + ' UTC';
    const newEntry = {
      id: Date.now(),
      time: timeStr,
      category: "analyst",
      title: `Analyst Log (${newNoteAuthor})`,
      desc: newNoteText.trim(),
      page: "workspace"
    };

    setTimelineEvents(prev => [newEntry, ...prev]);
    setNewNoteText("");
  };

  // Toggle checklist item
  const handleToggleChecklist = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  // Generate Forensic Report Text for Dossier Export
  const generateReportText = () => {
    return `# FORENSIC INVESTIGATION DOSSIER — ${caseData.incidentId}
CONFIDENTIAL // MARITIME LAW ENFORCEMENT SENSITIVE

## 1. CASE IDENTIFICATION
- Case ID: ${caseData.incidentId} (Internal Ref: ${caseData.internalId || 'N/A'})
- Maritime Region: ${caseData.region}
- Target Centroid Coordinates: ${caseData.coordinates.display}
- Detection Timestamp: ${caseData.detectionTimeUTC}
- Lead Analyst: ${caseData.assignedAnalyst || 'Lead Maritime Forensics'}
- Current Status: ${caseStatus.toUpperCase()}
- Priority Tier: ${caseData.riskLevel}

## 2. HYDROCARBON SPILL MORPHOLOGY
- Surface Area: ${caseData.spillAreaKm2} km²
- Slick Perimeter: ${caseData.spillPerimeterKm} km
- Delineated Length / Width: ${caseData.lengthKm || '8.4'} km x ${caseData.widthKm || '2.1'} km
- Spatial Orientation: ${caseData.orientationDeg || '37'}° Azimuth
- AI Classification Confidence: ${caseData.detectionConfidence}% (Sentinel-1 SAR Dual-Pol VV/VH)

## 3. PROBABLE ORIGIN & HINDCAST
- Primary Origin Target: ${caseData.hindcast?.originZoneA?.name || 'Zone A'}
- Hindcast Confidence: ${caseData.hindcast?.originZoneA?.confidence || '72.4'}%
- Estimated Release Time: ${caseData.hindcast?.estimatedReleaseTimeUTC || '03 SEP 2026, 22:40 UTC'}
- Backward Duration: ${caseData.hindcast?.backwardDurationHours || '40'} Hours

## 4. ATTRIBUTION & SUSPECT VESSEL
- Top Suspect: ${caseData.topVessel?.name || 'MV Ocean Star'}
- MMSI: ${caseData.topVessel?.mmsi || '419001248'} | IMO: ${caseData.topVessel?.imo || '9876543'}
- Flag State: ${caseData.topVessel?.flag || 'India'}
- Priority Score: ${caseData.topVessel?.priorityScore || '91.4'} / 100
- AIS Blackout Window: ${caseData.topVessel?.aisBlackoutRange || '03 SEP 22:24 - 23:02 UTC'} (${caseData.topVessel?.aisBlackoutDurationMin || '38'} min)
- Speed Drop: ${caseData.topVessel?.speedDropKn || '13.2 → 3.8 kn'}

## 5. ENVIRONMENTAL COUPLING
- Atmospheric Wind: ${caseData.environment?.windSpeedKn || '14.2'} kn @ ${caseData.environment?.windDirectionText || '310° (NW)'}
- Ocean Surface Current: ${caseData.environment?.currentSpeedMs || '0.42'} m/s @ ${caseData.environment?.currentDirectionText || '128° (SE)'}
- Wave Dynamics: ${caseData.environment?.waveHeightM || '1.8'}m Significant Height (${caseData.environment?.wavePeriodSec || '6.4'}s period)

Report certified and generated by MarineSight Automated Platform.
Timestamp: ${new Date().toUTCString()}
`;
  };

  // Download Report File
  const handleDownloadDossier = () => {
    const reportText = generateReportText();
    const blob = new Blob([reportText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `MarineSight_${caseData.incidentId}_DOSSIER.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy Report to Clipboard
  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateReportText());
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  // Candidate Vessels in Corridor
  const candidateFleet = caseData.candidateVessels || [caseData.topVessel];

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Top Status & Case Header with Active Case Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-border-marine p-4 rounded-2xl shadow-marine-sm">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Case Switcher Dropdown */}
            <div className="flex items-center gap-1.5 bg-ocean-light border border-ocean/30 px-2.5 py-1 rounded-lg">
              <span className="text-[10px] font-mono font-bold text-ocean uppercase">CASE:</span>
              <select
                value={activeIncidentId}
                onChange={(e) => selectIncident(e.target.value)}
                className="bg-transparent text-xs font-mono font-black text-ocean-navy focus:outline-none cursor-pointer"
              >
                {(allIncidents || INCIDENTS_REGISTRY).map(inc => (
                  <option key={inc.id} value={inc.id}>
                    {inc.id} — {inc.regionShort || inc.region}
                  </option>
                ))}
              </select>
            </div>

            {/* Lifecycle Status Switcher */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-status-danger animate-pulse"></span>
              <select
                value={caseStatus}
                onChange={(e) => setCaseStatus(e.target.value)}
                className="bg-red-50 border border-red-200 text-status-danger text-[11px] font-bold font-mono px-2 py-0.5 rounded-full focus:outline-none cursor-pointer"
              >
                <option value="Investigating">● ACTIVE INVESTIGATION</option>
                <option value="Active Drift">● ACTIVE DRIFT MODELING</option>
                <option value="Evidence Confirmed">● EVIDENCE CONFIRMED</option>
                <option value="Response Deployed">● RESPONSE DEPLOYED</option>
                <option value="Resolved">● RESOLVED / ARCHIVED</option>
              </select>
            </div>

            <span className="text-xs font-mono text-text-muted">
              PRIORITY: <strong className="text-status-danger">{caseData.riskLevel}</strong>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-ocean-navy mt-1">
            Investigation {caseData.incidentId} — {caseData.region}
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Target Centroid: <span className="font-mono text-ocean-deep font-semibold">{caseData.coordinates.display}</span> · Assigned Analyst: {caseData.assignedAnalyst || "Lead Maritime Forensics"}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => setExportModalOpen(true)}
            className="px-3.5 py-1.5 rounded-lg border border-border-marine bg-white hover:bg-ocean-sky text-ocean-navy text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            title="Export Case Dossier Report"
          >
            <Download className="w-3.5 h-3.5 text-ocean" />
            <span>Export Dossier</span>
          </button>
          
          <button 
            onClick={() => onNavigate("attribution")}
            className="px-4 py-1.5 rounded-lg bg-ocean hover:bg-ocean-deep text-white text-xs font-bold shadow-marine-md flex items-center gap-1.5 transition-all hover:scale-[1.02]"
          >
            <Target className="w-3.5 h-3.5" />
            <span>Run Attribution Engine</span>
          </button>
        </div>
      </div>

      {/* Investigation Progress Pipeline Stepper */}
      <PipelineStepper currentStep={5} onStepClick={onNavigate} />

      {/* Workspace Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 border-b border-border-marine pb-2 overflow-x-auto text-xs font-mono">
        {[
          { id: "overview", label: "Forensic Overview & Telemetry", icon: Activity },
          { id: "fleet", label: `Candidate Fleet Corridor (${candidateFleet.length})`, icon: Ship },
          { id: "environment", label: "MetOcean & Sensor Telemetry", icon: Wind },
          { id: "timeline", label: `Investigation Log (${timelineEvents.length})`, icon: Clock },
          { id: "checklist", label: `Verification Checklist (${verifiedPercent}%)`, icon: CheckSquare }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === id 
                ? 'bg-ocean text-white font-bold shadow-xs' 
                : 'bg-white text-text-secondary hover:bg-ocean-sky hover:text-ocean-navy border border-border-marine/50'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: FORENSIC OVERVIEW (Classic 3-Column Enhanced) */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fade-in">
          {/* Left: Investigation Map (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-border-marine rounded-2xl p-3.5 shadow-marine-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-marine text-xs font-bold text-ocean-navy">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-ocean" />
                  <span>CASE GEOSPATIAL CORRIDOR</span>
                </span>
                <span className="text-[10px] font-mono text-ocean font-bold">{caseData.spillAreaKm2} km² SLICK</span>
              </div>
              <GISMapMock 
                mode="workspace" 
                caseData={caseData}
                height="h-[360px]"
                onSelectSpill={() => onNavigate("characterize")}
                onSelectVessel={() => onNavigate("vessel-intel")}
              />
            </div>

            <div className="mt-3 pt-2.5 border-t border-border-marine grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div 
                onClick={() => onNavigate("characterize")}
                className="p-2 bg-ocean-light rounded-xl border border-border-marine/50 cursor-pointer hover:bg-ocean-sky/40 transition-colors"
              >
                <span className="text-text-muted text-[9px] block">DETECTED SLICK</span>
                <span className="font-bold text-ocean-navy">{caseData.spillAreaKm2} km² · {caseData.detectionConfidence}% Conf</span>
                <span className="text-[9px] text-ocean hover:underline block mt-0.5">Morphology Details →</span>
              </div>
              <div 
                onClick={() => onNavigate("source-trace")}
                className="p-2 bg-ocean-light rounded-xl border border-border-marine/50 cursor-pointer hover:bg-ocean-sky/40 transition-colors"
              >
                <span className="text-text-muted text-[9px] block">PROBABLE SOURCE</span>
                <span className="font-bold text-ocean-deep">Zone A · {caseData.hindcast?.originZoneA?.confidence || 72}% Conf</span>
                <span className="text-[9px] text-ocean hover:underline block mt-0.5">Reverse Hindcast →</span>
              </div>
            </div>
          </div>

          {/* Center: Quick Timeline Events (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-marine text-xs font-bold text-ocean-navy">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-ocean" />
                  <span>FORENSIC PIPELINE CHRONOLOGY</span>
                </div>
                <button
                  onClick={() => setActiveTab("timeline")}
                  className="text-[10px] font-mono text-ocean hover:underline font-bold"
                >
                  View All Log
                </button>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {timelineEvents.slice(0, 5).map((evt) => (
                  <div 
                    key={evt.id} 
                    onClick={() => onNavigate(evt.page)}
                    className="relative pl-5 border-l-2 border-ocean/30 pb-3 cursor-pointer group last:border-transparent last:pb-0"
                  >
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-ocean group-hover:scale-125 transition-transform" />
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="font-bold text-ocean">{evt.time}</span>
                      <span className="text-text-muted group-hover:text-ocean flex items-center gap-0.5">
                        Inspect <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-ocean-navy mt-0.5 group-hover:text-ocean-deep transition-colors">
                      {evt.title}
                    </h4>
                    <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
                      {evt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTab("timeline")}
              className="mt-3 w-full py-1.5 rounded-lg border border-border-marine bg-slate-50 hover:bg-slate-100 text-text-secondary text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>Add Field Note to Case Log</span>
            </button>
          </div>

          {/* Right: Incident Evidence Summary (3 cols) */}
          <div className="lg:col-span-3 bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-marine text-xs font-bold text-ocean-navy">
                <span>INCIDENT EVIDENCE</span>
                <span className="text-[10px] font-mono text-status-danger font-bold">{caseData.riskLevel}</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 bg-ocean-light rounded-xl border border-border-marine/40">
                  <span className="text-[9px] text-text-muted block">DETECTION TIME</span>
                  <span className="font-semibold text-text-primary">{caseData.detectionTimeUTC}</span>
                </div>
                <div className="p-2 bg-ocean-light rounded-xl border border-border-marine/40">
                  <span className="text-[9px] text-text-muted block">COORDINATES</span>
                  <span className="font-semibold text-ocean-deep">{caseData.coordinates.display}</span>
                </div>
                <div className="p-2 bg-ocean-light rounded-xl border border-border-marine/40">
                  <span className="text-[9px] text-text-muted block">SPILL AREA / PERIMETER</span>
                  <span className="font-bold text-ocean">{caseData.spillAreaKm2} km² / {caseData.spillPerimeterKm} km</span>
                </div>
                <div className="p-2 bg-ocean-light rounded-xl border border-border-marine/40 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-text-muted block">CANDIDATE FLEET</span>
                    <span className="font-semibold text-text-primary">{candidateFleet.length} in Corridor</span>
                  </div>
                  <button 
                    onClick={() => setActiveTab("fleet")}
                    className="text-[10px] text-ocean hover:underline font-bold"
                  >
                    View Fleet →
                  </button>
                </div>

                {/* Top Suspect Card */}
                <div 
                  onClick={() => onNavigate("vessel-intel")}
                  className="p-2.5 bg-red-50/70 rounded-xl border border-red-200 cursor-pointer hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-status-danger font-bold uppercase">LEAD SUSPECT ATTRIBUTION</span>
                    <span className="text-[9px] font-mono px-1 rounded bg-red-200 text-status-danger font-bold">RANK 01</span>
                  </div>
                  <span className="font-black text-xs text-ocean-navy block mt-0.5">{caseData.topVessel?.name || 'MV Ocean Star'}</span>
                  <div className="text-[10px] text-text-secondary mt-0.5 flex items-center justify-between">
                    <span>MMSI: {caseData.topVessel?.mmsi || '419001248'}</span>
                    <strong className="text-status-danger font-bold">Score: {caseData.topVessel?.priorityScore || '91.4'}/100</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border-marine space-y-2">
              <button 
                onClick={() => onNavigate("live-monitor")}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-ocean to-ocean-deep hover:from-ocean-deep hover:to-ocean-navy text-white text-xs font-bold transition-all flex items-center justify-between px-3 shadow-xs"
              >
                <span>Live GIS Surveillance Monitor</span>
                <Radio className="w-3.5 h-3.5" />
              </button>

              <button 
                onClick={() => onNavigate("satellite")}
                className="w-full py-1.5 rounded-lg border border-border-marine hover:bg-ocean-sky text-ocean-navy text-xs font-semibold transition-colors flex items-center justify-between px-3"
              >
                <span>Satellite SAR Ingest & Segmentation</span>
                <ArrowRight className="w-3.5 h-3.5 text-ocean" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CANDIDATE VESSELS FLEET CORRIDOR */}
      {activeTab === "fleet" && (
        <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border-marine">
            <div>
              <h2 className="text-sm font-bold text-ocean-navy flex items-center gap-2">
                <Ship className="w-4 h-4 text-ocean" />
                <span>SPATIO-TEMPORAL CANDIDATE VESSELS CORRIDOR</span>
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                AIS transponder tracks intersecting origin release window ({caseData.hindcast?.estimatedReleaseTimeUTC || '03 SEP 22:40 UTC'}).
              </p>
            </div>

            <button
              onClick={() => onNavigate("vessel-intel")}
              className="px-3 py-1.5 rounded-lg bg-ocean text-white font-bold text-xs hover:bg-ocean-deep flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Full Vessel Intelligence Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-ocean-light border-b border-border-marine text-[10px] font-mono text-text-muted uppercase">
                <tr>
                  <th className="px-3 py-2.5">RANK</th>
                  <th className="px-3 py-2.5">VESSEL NAME</th>
                  <th className="px-3 py-2.5">MMSI / IMO</th>
                  <th className="px-3 py-2.5">VESSEL TYPE & FLAG</th>
                  <th className="px-3 py-2.5">SPEED / SOG</th>
                  <th className="px-3 py-2.5">AIS GAP</th>
                  <th className="px-3 py-2.5">CPA TO SLICK</th>
                  <th className="px-3 py-2.5">ATTRIBUTION SCORE</th>
                  <th className="px-3 py-2.5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-marine/60 font-mono">
                {candidateFleet.map((v, idx) => {
                  const isLead = idx === 0 || v.rank === "01" || v.priorityScore > 85;
                  return (
                    <tr 
                      key={v.mmsi || v.name}
                      className={`hover:bg-ocean-sky/40 transition-colors ${
                        isLead ? 'bg-red-50/40 font-semibold' : ''
                      }`}
                    >
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isLead ? 'bg-red-100 text-status-danger' : 'bg-slate-100 text-text-secondary'
                        }`}>
                          {v.rank || `0${idx + 1}`}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span className="font-bold text-ocean-navy text-xs font-sans block">{v.name}</span>
                        {isLead && <span className="text-[9px] text-status-danger font-mono font-bold">LEAD SUSPECT</span>}
                      </td>
                      <td className="px-3 py-3 text-text-secondary">
                        <div>{v.mmsi || '419001248'}</div>
                        <div className="text-[10px] text-text-muted">{v.imo || '9876543'}</div>
                      </td>
                      <td className="px-3 py-3 font-sans">
                        <div>{v.type || 'Crude Oil Tanker'}</div>
                        <div className="text-[10px] text-text-muted font-mono">{v.flag || 'India 🇮🇳'}</div>
                      </td>
                      <td className="px-3 py-3 text-ocean-deep font-bold">
                        {v.speedKn || 12.4} kn
                      </td>
                      <td className="px-3 py-3">
                        <span className={`font-bold ${v.gapDuration ? 'text-status-danger' : 'text-text-muted'}`}>
                          {v.gapDuration || 'None recorded'}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-status-warning font-bold">
                        {v.cpaNm || '1.4'} NM
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-black ${isLead ? 'text-status-danger' : 'text-ocean-deep'}`}>
                            {v.priorityScore || 91.4}%
                          </span>
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${isLead ? 'bg-red-500' : 'bg-ocean'}`}
                              style={{ width: `${v.priorityScore || 91}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right font-sans">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onNavigate("trajectory")}
                            className="px-2 py-1 rounded bg-white border border-border-marine hover:bg-ocean-sky text-ocean-navy text-[11px] font-semibold"
                          >
                            Trajectory
                          </button>
                          <button
                            onClick={() => onNavigate("vessel-intel")}
                            className="px-2.5 py-1 rounded bg-ocean hover:bg-ocean-deep text-white text-[11px] font-bold"
                          >
                            Dossier →
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: METOCEAN & EARTH OBSERVATION TELEMETRY */}
      {activeTab === "environment" && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Atmospheric Wind */}
            <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-ocean-navy">
                <span className="flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-sky-500" />
                  <span>ATMOSPHERIC WIND</span>
                </span>
                <span className="text-[10px] font-mono text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded">ECMWF</span>
              </div>
              <div className="text-2xl font-black font-mono text-ocean-navy">
                {caseData.environment?.windSpeedKn || '14.2'} kn
              </div>
              <div className="text-xs text-text-secondary space-y-1 font-mono">
                <div className="flex justify-between">
                  <span>Direction:</span>
                  <strong className="text-ocean-deep">{caseData.environment?.windDirectionText || '310° (NW)'}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Windage Drag Factor:</span>
                  <span>3.0% (Coriolis +15°)</span>
                </div>
                <div className="flex justify-between">
                  <span>Atmospheric Pressure:</span>
                  <span>{caseData.environment?.atmosphericPressureHpa || '1012.4'} hPa</span>
                </div>
              </div>
            </div>

            {/* Ocean Current */}
            <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-ocean-navy">
                <span className="flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-teal-500" />
                  <span>OCEAN CURRENTS</span>
                </span>
                <span className="text-[10px] font-mono text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">CMEMS</span>
              </div>
              <div className="text-2xl font-black font-mono text-ocean-navy">
                {caseData.environment?.currentSpeedMs || '0.42'} m/s
              </div>
              <div className="text-xs text-text-secondary space-y-1 font-mono">
                <div className="flex justify-between">
                  <span>Advective Flow:</span>
                  <strong className="text-teal-700">{caseData.environment?.currentDirectionText || '128° (SE)'}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Knots Velocity:</span>
                  <span>{( (caseData.environment?.currentSpeedMs || 0.42) * 1.94384 ).toFixed(2)} kn</span>
                </div>
                <div className="flex justify-between">
                  <span>Stokes Drift Share:</span>
                  <span>61% Current / 39% Wind</span>
                </div>
              </div>
            </div>

            {/* Wave Dynamics */}
            <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-ocean-navy">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-ocean" />
                  <span>WAVE SPECTRUM</span>
                </span>
                <span className="text-[10px] font-mono text-ocean bg-ocean-light px-1.5 py-0.5 rounded">HYCOM</span>
              </div>
              <div className="text-2xl font-black font-mono text-ocean-navy">
                {caseData.environment?.waveHeightM || '1.8'} m
              </div>
              <div className="text-xs text-text-secondary space-y-1 font-mono">
                <div className="flex justify-between">
                  <span>Peak Wave Period:</span>
                  <span>{caseData.environment?.wavePeriodSec || '6.4'} seconds</span>
                </div>
                <div className="flex justify-between">
                  <span>Sea Surface Temp (SST):</span>
                  <strong className="text-ocean-deep">{caseData.environment?.seaSurfaceTempC || '28.4'}°C</strong>
                </div>
                <div className="flex justify-between">
                  <span>Salinity Index:</span>
                  <span>{caseData.environment?.salinityPsu || '36.2'} PSU</span>
                </div>
              </div>
            </div>

            {/* Satellite Scene Specs */}
            <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-ocean-navy">
                <span className="flex items-center gap-1.5">
                  <Satellite className="w-4 h-4 text-purple-500" />
                  <span>SATELLITE SAR</span>
                </span>
                <span className="text-[10px] font-mono text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">ESA COPERNICUS</span>
              </div>
              <div className="text-lg font-black font-mono text-ocean-navy truncate">
                Sentinel-1 SAR
              </div>
              <div className="text-xs text-text-secondary space-y-1 font-mono">
                <div className="flex justify-between">
                  <span>Polarization:</span>
                  <strong className="text-purple-700">Dual-Pol (VV + VH)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Pixel Spacing:</span>
                  <span>10m / px (IW GRD)</span>
                </div>
                <div className="flex justify-between">
                  <span>Acquisition Time:</span>
                  <span>{caseData.detectionTimeUTC}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm flex items-center justify-between">
            <div>
              <h3 className="font-bold text-xs text-ocean-navy">Coupled Hydrodynamic & Atmospheric Dispersion</h3>
              <p className="text-xs text-text-secondary mt-0.5">
                OpenDrift Euler-Lagrangian particle advection engine coupling CMEMS currents with ECMWF surface 10m wind drag.
              </p>
            </div>
            <button
              onClick={() => onNavigate("simulation")}
              className="px-4 py-2 rounded-xl bg-ocean hover:bg-ocean-deep text-white text-xs font-bold flex items-center gap-1.5"
            >
              <span>Launch 72h Dispersion Simulation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE INVESTIGATION LOG & TIMELINE */}
      {activeTab === "timeline" && (
        <div className="bg-white border border-border-marine rounded-2xl p-5 shadow-marine-sm space-y-5 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-marine">
            <div>
              <h2 className="text-sm font-bold text-ocean-navy flex items-center gap-2">
                <Clock className="w-4 h-4 text-ocean" />
                <span>CHRONOLOGICAL INVESTIGATION LOG & CASE NOTEBOOK</span>
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Audit trail of AI detection models, AIS correlation events, and analyst field findings.
              </p>
            </div>

            {/* Filter Log Categories */}
            <div className="flex items-center gap-1 text-xs font-mono">
              {["all", "ai", "radar", "satellite", "analyst"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTimelineFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-colors ${
                    timelineFilter === cat
                      ? 'bg-ocean text-white'
                      : 'bg-ocean-light text-text-secondary hover:bg-ocean-sky'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Add Analyst Note Form */}
          <form onSubmit={handleAddNote} className="bg-ocean-light/40 border border-border-marine p-3 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-ocean-navy font-mono flex items-center gap-1">
              <Plus className="w-3 h-3 text-ocean" />
              <span>RECORD NEW ANALYST FINDING / FIELD REPORT</span>
            </span>

            <div className="flex gap-2">
              <input
                type="text"
                value={newNoteText}
                onChange={e => setNewNoteText(e.target.value)}
                placeholder="Log observation, Coast Guard VHF hail summary, or evidence update..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-border-marine bg-white focus:outline-none focus:ring-1 focus:ring-ocean"
              />
              <input
                type="text"
                value={newNoteAuthor}
                onChange={e => setNewNoteAuthor(e.target.value)}
                placeholder="Analyst Name"
                className="w-36 px-2.5 py-1.5 text-xs rounded-lg border border-border-marine bg-white focus:outline-none text-ocean-navy font-medium"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-lg bg-ocean hover:bg-ocean-deep text-white text-xs font-bold flex items-center gap-1 shrink-0"
              >
                <span>Add Entry</span>
              </button>
            </div>
          </form>

          {/* Timeline List */}
          <div className="space-y-4 pt-2">
            {filteredTimeline.map((evt) => (
              <div 
                key={evt.id}
                onClick={() => evt.page !== "workspace" && onNavigate(evt.page)}
                className={`p-3 rounded-xl border transition-all ${
                  evt.category === 'analyst' 
                    ? 'bg-amber-50/60 border-amber-200' 
                    : 'bg-white border-border-marine hover:bg-ocean-sky/30 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] ${
                    evt.category === 'analyst' ? 'bg-amber-100 text-amber-800' :
                    evt.category === 'ai' ? 'bg-blue-100 text-ocean-deep' :
                    evt.category === 'radar' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {evt.category}
                  </span>
                  <span className="text-text-muted font-bold">{evt.time}</span>
                </div>
                <h4 className="font-bold text-xs text-ocean-navy">{evt.title}</h4>
                <p className="text-xs text-text-secondary mt-1">{evt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FORENSIC VERIFICATION CHECKLIST */}
      {activeTab === "checklist" && (
        <div className="bg-white border border-border-marine rounded-2xl p-5 shadow-marine-sm space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-marine">
            <div>
              <h2 className="text-sm font-bold text-ocean-navy flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-status-success" />
                <span>LEGAL & FORENSIC VERIFICATION AUDIT TRAIL</span>
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Standard Operational Procedure (SOP) criteria required for Coast Guard affidavit prosecution under MARPOL Annex I.
              </p>
            </div>

            {/* Verification Progress Badge */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] font-mono text-text-muted block">COMPLETION</span>
                <span className="text-sm font-black text-ocean-navy">{verifiedCount} / {checklist.length} Verified</span>
              </div>
              <div className="w-20 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-status-success transition-all duration-300"
                  style={{ width: `${verifiedPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-2.5">
            {checklist.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleToggleChecklist(item.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  item.checked 
                    ? 'bg-emerald-50/50 border-emerald-200' 
                    : 'bg-white border-border-marine hover:bg-slate-50'
                }`}
              >
                <button type="button" className="mt-0.5 text-ocean focus:outline-none">
                  {item.checked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs font-bold ${item.checked ? 'text-emerald-900 line-through opacity-85' : 'text-ocean-navy'}`}>
                      {item.label}
                    </h4>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      item.checked ? 'bg-emerald-100 text-status-success' : 'bg-slate-100 text-text-muted'
                    }`}>
                      {item.checked ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-border-marine flex items-center justify-between">
            <span className="text-xs text-text-secondary">
              {verifiedPercent === 100 
                ? "✓ All SOP criteria satisfied. Case ready for formal legal prosecution."
                : `Complete ${checklist.length - verifiedCount} remaining task(s) to finalize prosecution dossier.`
              }
            </span>

            <button
              onClick={() => onNavigate("evidence-risk")}
              className="px-3.5 py-1.5 rounded-lg bg-ocean hover:bg-ocean-deep text-white text-xs font-bold flex items-center gap-1.5"
            >
              <span>Inspect Legal Evidence Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Export Dossier Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full border border-border-marine shadow-2xl space-y-4 animate-fade-in flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-border-marine">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-ocean" />
                <h3 className="font-bold text-ocean-navy text-sm">
                  Official Maritime Investigation Dossier — {caseData.incidentId}
                </h3>
              </div>
              <button 
                onClick={() => setExportModalOpen(false)}
                className="p-1 rounded-lg text-text-muted hover:text-ocean-navy"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dossier Textarea Preview */}
            <div className="flex-1 min-h-[300px] overflow-y-auto bg-slate-900 text-emerald-300 p-4 rounded-xl font-mono text-xs border border-border-marine/50 leading-relaxed whitespace-pre-wrap select-all">
              {generateReportText()}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border-marine">
              <div className="text-xs text-text-muted font-mono">
                Format: MARPOL Annex I Forensic Standard (.MD)
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyReport}
                  className="px-3 py-1.5 rounded-lg border border-border-marine hover:bg-ocean-sky text-ocean-navy text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedReport ? "Copied!" : "Copy Report"}</span>
                </button>

                <button
                  onClick={handleDownloadDossier}
                  className="px-4 py-1.5 rounded-lg bg-ocean hover:bg-ocean-deep text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Dossier (.MD)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
