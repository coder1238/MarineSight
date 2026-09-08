import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Share2, 
  Printer, 
  Cpu, 
  Database, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  Target, 
  Compass, 
  Ship,
  ExternalLink,
  Layers
} from 'lucide-react';
import ModelStatusCard from '../components/common/ModelStatusCard';
import { 
  CASE_OF_2026_0912, 
  AI_MODELS, 
  DATA_SOURCES, 
  SYSTEM_HEALTH 
} from '../data/mockData';

export default function Page15ReportSystem({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("report"); // "report" | "evidence" | "models" | "sources" | "health"
  const [exported, setExported] = useState(false);

  const caseData = CASE_OF_2026_0912;
  const vessel = caseData.topVessel;

  const handleExportPDF = () => {
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-ocean-navy tracking-tight">
              Forensic Investigation Dossier & System Intelligence
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-status-success border border-emerald-200 text-[10px] font-bold font-mono">
              ● DOSSIER VERIFIED
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Official multi-evidence forensic report for Incident {caseData.incidentId}, full 10-model operational matrix, and data ingestion telemetry.
          </p>
        </div>

        {/* Report Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleExportPDF}
            className="px-3.5 py-2 rounded-xl bg-ocean hover:bg-ocean-deep text-white text-xs font-bold shadow-marine-sm flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exported ? "Exported Certified PDF!" : "Export PDF Dossier"}</span>
          </button>
          <button 
            onClick={handleExportPDF}
            className="px-3 py-2 rounded-xl border border-border-marine bg-white hover:bg-ocean-sky text-ocean-navy text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-ocean" />
            <span>Share</span>
          </button>
          <button 
            onClick={() => window.print()}
            className="px-3 py-2 rounded-xl border border-border-marine bg-white hover:bg-ocean-sky text-ocean-navy text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-ocean" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="bg-white border border-border-marine p-1.5 rounded-2xl shadow-marine-sm flex items-center gap-2 overflow-x-auto">
        {[
          { id: "report", label: "FORENSIC REPORT DOSSIER", icon: FileText },
          { id: "evidence", label: "EVIDENCE AUDIT MATRIX", icon: ShieldCheck },
          { id: "models", label: "AI MODEL MATRIX (10 MODELS)", icon: Cpu },
          { id: "sources", label: "DATA SOURCES (7)", icon: Database },
          { id: "health", label: "SYSTEM & GPU HEALTH", icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-ocean text-white shadow-sm' 
                  : 'text-text-secondary hover:text-ocean-deep hover:bg-ocean-sky'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Formal Forensic Report */}
      {activeTab === "report" && (
        <div className="bg-white border border-border-marine rounded-2xl p-6 sm:p-8 shadow-marine-sm space-y-6 max-w-5xl mx-auto">
          {/* Document Header */}
          <div className="border-b-2 border-ocean-navy pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-ocean uppercase tracking-widest font-bold block">
                OFFICIAL MARITIME ENVIRONMENTAL ENFORCEMENT DOSSIER
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ocean-navy mt-1">
                Marine Oil Spill Forensic Investigation Report
              </h2>
              <p className="text-xs text-text-secondary font-mono mt-0.5">
                Case ID: {caseData.incidentId} · Registration: Republic Maritime Forensics Division
              </p>
            </div>
            <div className="p-2.5 bg-ocean-light rounded-xl border border-border-marine text-right font-mono text-xs">
              <span className="text-text-muted text-[10px] block">SECURITY LEVEL</span>
              <span className="font-bold text-status-danger">CRITICAL / CONFIDENTIAL</span>
              <span className="text-text-secondary block text-[10px] mt-0.5">{caseData.detectionTimeUTC}</span>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="p-3 bg-ocean-sky/40 border border-ocean/30 rounded-xl text-xs text-text-secondary leading-relaxed">
            <strong>LEGAL NOTICE:</strong> This document contains technical and scientific evidence compiled through automated satellite SAR, hydrodynamic drift hindcast, and machine learning telemetry correlation. Analytical priority ranking indicates candidate vessels requiring investigation by maritime law enforcement and does not constitute formal legal judgment.
          </div>

          {/* Section 1: Executive Summary */}
          <div>
            <h3 className="text-xs font-bold font-mono text-ocean uppercase tracking-wider mb-2 border-b border-border-marine pb-1">
              1. Executive Summary
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              On <strong>05 SEP 2026 at 14:32 UTC</strong>, an orbital Synthetic Aperture Radar (SAR) acquisition from Sentinel-1A delineated a substantial mineral hydrocarbon release spanning <strong>14.7 km²</strong> with a perimeter of <strong>22.4 km</strong> centered at <strong>14.8214°N, 68.2108°E</strong> in the Arabian Sea offshore Western India.
            </p>
            <p className="text-xs text-text-secondary leading-relaxed font-sans mt-2">
              Coupled backward hydrodynamic hindcast integration (40.0 hours elapsed) converged on a high-confidence release origin at <strong>14.6521°N, 67.9015°E (Zone A, 72.4% confidence)</strong> at <strong>03 SEP 2026, 22:40 UTC</strong>. Spatio-temporal filtering across 142 corridor vessels isolated crude oil tanker <strong>{vessel.name} (MMSI: {vessel.mmsi})</strong> as the primary candidate, with an <strong>Investigation Priority Score of 91.4 / 100</strong> driven by a 38-minute unannounced AIS transponder blackout coinciding within 1.4 nm of the origin centroid.
            </p>
          </div>

          {/* Section 2: Key Telemetry Summary Table */}
          <div>
            <h3 className="text-xs font-bold font-mono text-ocean uppercase tracking-wider mb-2 border-b border-border-marine pb-1">
              2. Forensic Telemetry & Attribution Matrix
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-2.5 bg-ocean-light rounded-lg border border-border-marine">
                <span className="text-[10px] text-text-muted block">DETECTED AREA</span>
                <span className="font-bold text-ocean-deep">{caseData.spillAreaKm2} km²</span>
              </div>
              <div className="p-2.5 bg-ocean-light rounded-lg border border-border-marine">
                <span className="text-[10px] text-text-muted block">HINDCAST ORIGIN</span>
                <span className="font-bold text-ocean-deep">Zone A (72.4%)</span>
              </div>
              <div className="p-2.5 bg-ocean-light rounded-lg border border-border-marine">
                <span className="text-[10px] text-text-muted block">LEAD CANDIDATE</span>
                <span className="font-bold text-status-danger">{vessel.name}</span>
              </div>
              <div className="p-2.5 bg-ocean-light rounded-lg border border-border-marine">
                <span className="text-[10px] text-text-muted block">PRIORITY SCORE</span>
                <span className="font-bold text-status-danger">{vessel.priorityScore} / 100</span>
              </div>
            </div>
          </div>

          {/* Section 3: Priority Recommendations */}
          <div>
            <h3 className="text-xs font-bold font-mono text-ocean uppercase tracking-wider mb-2 border-b border-border-marine pb-1">
              3. Prioritized Response Recommendations
            </h3>
            <ul className="text-xs text-text-secondary space-y-1.5 list-disc pl-4">
              <li>Deploy 2.4 km ocean curtain containment booms across Zuari Estuary and Karwar Bay to defend sensitive mangrove spawning habitats.</li>
              <li>Mobilize Pollution Control Vessel <em>ICGS Samudra Prahari</em> for surface skimming operations.</li>
              <li>Issue formal investigation notice to vessel master and flag state maritime administration (India DG Shipping).</li>
            </ul>
          </div>

          {/* Signatures */}
          <div className="pt-6 border-t border-border-marine grid grid-cols-2 gap-6 text-xs font-mono text-text-secondary">
            <div>
              <p className="text-[10px] text-text-muted">LEAD SCIENTIFIC INVESTIGATOR</p>
              <p className="font-bold text-ocean-navy mt-1">Dr. E. Vance, PhD</p>
              <p className="text-[10px] text-text-muted">Chief Maritime Forensics Officer</p>
              <div className="mt-2 text-status-success font-semibold text-[10px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Cryptographically Certified (SHA-256)
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-text-muted">ENFORCEMENT DIRECTORATE</p>
              <p className="font-bold text-ocean-navy mt-1">Capt. R. Malhotra</p>
              <p className="text-[10px] text-text-muted">Director of Coastline Environmental Protection</p>
              <span className="text-[10px] text-text-muted block mt-2">Dossier ID: OF-2026-0912-DOC</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Evidence Registry */}
      {activeTab === "evidence" && (
        <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border-marine">
            <span className="font-bold text-xs text-ocean-navy font-mono uppercase">Full Chain of Custody & Evidence Registry</span>
            <span className="text-[10px] font-mono text-ocean font-bold">CASE: OF-2026-0912</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-ocean-light/50 border border-border-marine rounded-xl space-y-2 text-xs font-mono">
              <h4 className="font-bold text-ocean-deep text-xs uppercase">1. Satellite Radar Backscatter (Sentinel-1)</h4>
              <p className="text-[11px] text-text-secondary font-sans">Dual-polarization VV/VH backscatter profile exhibits -22.4 dB capillary wave dampening characteristic of crude hydrocarbons.</p>
              <div className="text-[10px] text-text-muted">Sensor: C-SAR · Resolution: 10m/px · Scene: S1A_IW_GRDH_1SDV</div>
            </div>
            <div className="p-4 bg-ocean-light/50 border border-border-marine rounded-xl space-y-2 text-xs font-mono">
              <h4 className="font-bold text-ocean-deep text-xs uppercase">2. Lagrangian Reverse Drift Hindcast</h4>
              <p className="text-[11px] text-text-secondary font-sans">40-hour backward dispersion with OpenDrift/GNOME engine shows 72.4% cluster convergence at 14.65°N, 67.90°E.</p>
              <div className="text-[10px] text-text-muted">Coupled: HYCOM 1/12° currents (61%) + ECMWF 10m winds (39%)</div>
            </div>
            <div className="p-4 bg-ocean-light/50 border border-border-marine rounded-xl space-y-2 text-xs font-mono">
              <h4 className="font-bold text-ocean-deep text-xs uppercase">3. Bi-LSTM Trajectory Reconstruction</h4>
              <p className="text-[11px] text-text-secondary font-sans">Resolves 38-minute AIS silence (174 missing messages) directly across the hindcast origin zone with ±0.18 nm precision.</p>
              <div className="text-[10px] text-text-muted">Target: MV Ocean Star · MMSI: 419001248 · Gap: 22:24 - 23:02 UTC</div>
            </div>
            <div className="p-4 bg-ocean-light/50 border border-border-marine rounded-xl space-y-2 text-xs font-mono">
              <h4 className="font-bold text-ocean-deep text-xs uppercase">4. XGBoost Multi-Feature Attribution</h4>
              <p className="text-[11px] text-text-secondary font-sans">Fuses 24 kinematic and environmental features into a 91.4/100 Investigation Priority Score for MV Ocean Star.</p>
              <div className="text-[10px] text-text-muted">Rank 1 Target · Funnel filtered from 142 vessels</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Models Matrix (All 10 Models!) */}
      {activeTab === "models" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white border border-border-marine p-3 rounded-xl">
            <div>
              <h3 className="font-bold text-xs text-ocean-navy font-mono uppercase">All 10 Specialized AI/ML Models</h3>
              <p className="text-[11px] text-text-secondary">Fully operational pipeline running real-time inferences.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-status-success border border-emerald-200 text-xs font-bold font-mono">
              ● ALL 10 OPERATIONAL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {AI_MODELS.map((model) => (
              <ModelStatusCard 
                key={model.id} 
                model={model} 
                onInspect={() => {
                  if (model.id === "M01" || model.id === "M02" || model.id === "M03") onNavigate("satellite");
                  else if (model.id === "M04") onNavigate("simulation");
                  else if (model.id === "M05" || model.id === "M06" || model.id === "M07") onNavigate("trajectory");
                  else if (model.id === "M08" || model.id === "M09") onNavigate("attribution");
                  else if (model.id === "M10") onNavigate("evidence-risk");
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Data Sources */}
      {activeTab === "sources" && (
        <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border-marine">
            <span className="font-bold text-xs text-ocean-navy font-mono uppercase">Connected Data Feeds & Sensors</span>
            <span className="text-[10px] font-mono text-status-success font-bold">7 CONNECTED</span>
          </div>

          <div className="divide-y divide-border-marine/50">
            {DATA_SOURCES.map((src, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="font-bold text-ocean-navy">{src.name}</div>
                  <div className="text-[10px] text-text-muted">{src.type} · Coverage: {src.coverage}</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-status-success border border-emerald-200 text-[10px] font-bold">
                    ● {src.status}
                  </span>
                  <div className="text-[10px] text-text-muted mt-0.5">Sync: {src.update} · Quality: {src.quality}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: System Health */}
      {activeTab === "health" && (
        <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border-marine">
            <span className="font-bold text-xs text-ocean-navy font-mono uppercase">Infrastructure Health & Compute Allocation</span>
            <span className="text-[10px] font-mono text-status-success font-bold">● ALL SYSTEMS HEALTHY</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-ocean-light rounded-xl border border-border-marine">
              <span className="text-[10px] text-text-muted block">API LATENCY</span>
              <span className="text-2xl font-bold text-status-success">{SYSTEM_HEALTH.apiLatencyMs} ms</span>
              <span className="text-[9px] text-text-muted block">Sub-50ms SLA met</span>
            </div>
            <div className="p-3 bg-ocean-light rounded-xl border border-border-marine">
              <span className="text-[10px] text-text-muted block">GPU UTILIZATION</span>
              <span className="text-2xl font-bold text-ocean">{SYSTEM_HEALTH.gpuUtilization}%</span>
              <span className="text-[9px] text-text-muted block truncate">{SYSTEM_HEALTH.gpuName}</span>
            </div>
            <div className="p-3 bg-ocean-light rounded-xl border border-border-marine">
              <span className="text-[10px] text-text-muted block">CPU WORKLOAD</span>
              <span className="text-2xl font-bold text-ocean-deep">{SYSTEM_HEALTH.cpuUtilization}%</span>
              <span className="text-[9px] text-text-muted block truncate">{SYSTEM_HEALTH.cpuName}</span>
            </div>
            <div className="p-3 bg-ocean-light rounded-xl border border-border-marine">
              <span className="text-[10px] text-text-muted block">MEMORY / STORAGE</span>
              <span className="text-2xl font-bold text-text-primary">{SYSTEM_HEALTH.memoryUsedGb}/{SYSTEM_HEALTH.memoryTotalGb} GB</span>
              <span className="text-[9px] text-text-muted block">{SYSTEM_HEALTH.storageUsedTb} TB Archive Used</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
