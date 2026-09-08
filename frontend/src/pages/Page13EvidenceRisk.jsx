import React from 'react';
import { 
  ShieldAlert, 
  Layers, 
  Fish, 
  Anchor, 
  ArrowRight, 
  CheckCircle2, 
  Download,
  AlertTriangle,
  Compass
} from 'lucide-react';
import GISMapMock from '../components/gis/GISMapMock';
import { useIncident } from '../context/IncidentContext';

export default function Page13EvidenceRisk({ onNavigate }) {
  const { activeIncident } = useIncident();
  const caseData = activeIncident;
  const vessel = caseData.topVessel || caseData.candidateVessels?.[0] || { name: "Lead Suspect Vessel", mmsi: "N/A", priorityScore: 88 };

  const evidenceRows = [
    { name: "Spatial Proximity to Origin", value: "1.4 nm from Origin Zone", strength: "VERY HIGH", conf: 94, weight: "22%", source: "Copernicus + AIS" },
    { name: "Temporal Release Coincidence", value: "Transit coincident with discharge", strength: "VERY HIGH", conf: 91, weight: "18%", source: "Hindcast Model" },
    { name: "Siamese Trajectory Similarity", value: "93.4% curve alignment", strength: "HIGH", conf: 88, weight: "16%", source: "Siamese STSN" },
    { name: "AIS Transponder Blackout", value: "Deliberate transmission silence gap", strength: "VERY HIGH", conf: 92, weight: "15%", source: "Terrestrial AIS" },
    { name: "Kinematic Deceleration Anomaly", value: "Anomalous speed trough detected", strength: "HIGH", conf: 86, weight: "14%", source: "Anomaly Model" },
    { name: "SAR Radar Target Match", value: "Radar signature matches vessel class", strength: "HIGH", conf: 89, weight: "10%", source: "Sentinel-1 SAR" },
    { name: "Historical Route Deviation", value: "Corridor boundary deviation", strength: "MODERATE", conf: 75, weight: "5%", source: "Historical Route DB" },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-ocean-navy tracking-tight">
              Evidence Fusion & Environmental Risk Intelligence
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-status-danger/10 text-status-danger border border-status-danger/30 text-[10px] font-bold font-mono">
              ● HIGH ECOLOGICAL VULNERABILITY ({caseData.region})
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Unified forensic evidence provenance for {vessel.name} alongside AI-driven ecological vulnerability modeling for {caseData.region}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("response-plan")}
            className="px-4 py-2 rounded-xl bg-ocean hover:bg-ocean-deep text-white text-xs font-bold shadow-marine-md flex items-center gap-2 transition-all"
          >
            <span>Proceed to Emergency Response Planner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 50/50 Split: Left Evidence Matrix + Right Ecological Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Evidence Fusion Matrix (Col 6) */}
        <div className="lg:col-span-6 bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-marine">
              <div>
                <span className="text-[10px] font-bold text-text-muted font-mono uppercase">EVIDENCE PROVENANCE</span>
                <h3 className="text-sm font-extrabold text-ocean-navy mt-0.5">{vessel.name} · {vessel.mmsi}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-text-muted font-mono block">INVESTIGATION PRIORITY</span>
                <span className="text-xl font-extrabold text-status-danger font-mono">{vessel.priorityScore} / 100</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-ocean-light border-b border-border-marine text-[9px] text-text-muted uppercase">
                  <tr>
                    <th className="px-2 py-2">EVIDENCE ITEM</th>
                    <th className="px-2 py-2">FINDING</th>
                    <th className="px-2 py-2">STRENGTH</th>
                    <th className="px-2 py-2">CONF</th>
                    <th className="px-2 py-2 text-right">WEIGHT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-marine/50">
                  {evidenceRows.map((row, i) => (
                    <tr key={i} className="hover:bg-ocean-sky/20">
                      <td className="px-2 py-2 font-bold text-ocean-navy">{row.name}</td>
                      <td className="px-2 py-2 text-[11px] text-text-secondary">{row.value}</td>
                      <td className="px-2 py-2">
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                          row.strength === 'VERY HIGH' ? 'bg-red-100 text-status-danger' : row.strength === 'HIGH' ? 'bg-amber-100 text-status-warning' : 'bg-slate-100 text-text-secondary'
                        }`}>
                          {row.strength}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-status-success font-bold">{row.conf}%</td>
                      <td className="px-2 py-2 text-right font-bold text-ocean">{row.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border-marine flex items-center justify-between text-[11px] font-mono text-text-muted">
            <span>PROVENANCE: SENTINEL-1 + AIS + CMEMS + XGBOOST</span>
            <span className="text-status-success font-bold">100% AUDITABLE</span>
          </div>
        </div>

        {/* Right: Environmental Risk Prediction (Col 6) */}
        <div className="lg:col-span-6 bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-marine">
              <div>
                <span className="text-[10px] font-bold text-text-muted font-mono uppercase">ECOLOGICAL RISK GIS VIEWPORT</span>
                <h3 className="text-sm font-extrabold text-ocean-navy mt-0.5">{caseData.region} Vulnerable Shorelines</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-text-muted font-mono block">OVERALL RISK SCORE</span>
                <span className="text-xl font-extrabold text-status-warning font-mono">78 / 100</span>
              </div>
            </div>

            {/* Real GIS Risk Map */}
            <div className="mb-3">
              <GISMapMock 
                mode="evidence-risk" 
                caseData={caseData}
                height="h-[210px]"
              />
            </div>

            {/* Risk Category Progress Bars */}
            <div className="space-y-2 text-xs font-mono">
              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-ocean-navy font-semibold">Marine Fisheries & Aquaculture Exposure</span>
                  <span className="text-status-danger font-bold">HIGH (88/100)</span>
                </div>
                <div className="h-1.5 w-full bg-ocean-light rounded-full overflow-hidden">
                  <div className="bg-status-danger h-full w-[88%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-ocean-navy font-semibold">Marine Ecosystem & Mangrove Estuaries</span>
                  <span className="text-status-danger font-bold">HIGH (84/100)</span>
                </div>
                <div className="h-1.5 w-full bg-ocean-light rounded-full overflow-hidden">
                  <div className="bg-status-danger h-full w-[84%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-ocean-navy font-semibold">Coastal Tourism & Port Operations (Mormugao)</span>
                  <span className="text-status-warning font-bold">MODERATE (62/100)</span>
                </div>
                <div className="h-1.5 w-full bg-ocean-light rounded-full overflow-hidden">
                  <div className="bg-status-warning h-full w-[62%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-ocean-navy font-semibold">Netrani Island Sanctuary Vulnerability</span>
                  <span className="text-status-success font-bold">LOW (24/100 · 18 nm buffer)</span>
                </div>
                <div className="h-1.5 w-full bg-ocean-light rounded-full overflow-hidden">
                  <div className="bg-status-success h-full w-[24%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border-marine flex items-center justify-between text-[11px] font-mono text-text-muted">
            <span>MODEL: GEOSPATIAL GNN v2.4</span>
            <button 
              onClick={() => onNavigate("response-plan")}
              className="text-ocean font-bold hover:underline"
            >
              Configure Boom Strategy →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
