import React from 'react';
import { 
  Target, 
  ShieldCheck, 
  AlertOctagon, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  HelpCircle,
  FileText
} from 'lucide-react';
import GISMapMock from '../components/gis/GISMapMock';
import { useIncident } from '../context/IncidentContext';
import { CANDIDATE_VESSELS } from '../data/mockData';

export default function Page12Attribution({ onNavigate }) {
  const { activeIncident } = useIncident();
  const caseData = activeIncident;
  const candidateList = caseData.candidateVessels || CANDIDATE_VESSELS;
  const leadVessel = candidateList[0] || caseData.topVessel;

  const funnelStages = [
    { label: "Historical AIS Targets", count: "142 vessels", desc: "Corridor ingest" },
    { label: "Spatial Corridor Filter", count: "37 vessels", desc: "Within 25 nm buffer" },
    { label: "Temporal Overlap Filter", count: "19 vessels", desc: "±4h release window" },
    { label: "Trajectory Match Filter", count: "12 candidates", desc: "DTW similarity" },
    { label: "High-Priority Candidates", count: `${candidateList.length} priority`, desc: "Score > 60/100", highlight: true },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-ocean-navy tracking-tight">
              Vessel Attribution Intelligence & Priority Ranking
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-status-success border border-emerald-200 text-[10px] font-bold font-mono">
              ● ATTRIBUTION CONVERGED
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Multi-evidence fusion combining Siamese Trajectory Similarity Networks and Gradient-Boosted Decision Trees (XGBoost).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("evidence-risk")}
            className="px-4 py-2 rounded-xl bg-ocean hover:bg-ocean-deep text-white text-xs font-bold shadow-marine-md flex items-center gap-2 transition-all"
          >
            <span>Evidence Fusion & Risk Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mandatory Legal Forensic Disclaimer Banner */}
      <div className="bg-ocean-sky/60 border border-ocean/30 rounded-xl p-3 flex items-start gap-2.5 text-xs text-ocean-navy">
        <ShieldCheck className="w-5 h-5 text-ocean flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold uppercase tracking-wider text-[10px] text-ocean-deep block font-mono">
            Analytical Forensic Disclaimer
          </span>
          <p className="text-[11px] leading-relaxed text-text-secondary mt-0.5">
            Analytical ranking indicates vessels requiring further investigation based on available scientific and kinematic evidence. It does not establish legal responsibility or prove guilt.
          </p>
        </div>
      </div>

      {/* Section A: Multi-Stage Candidate Funnel Filtering */}
      <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm">
        <span className="text-[10px] font-bold text-text-muted font-mono uppercase block mb-3">
          Multi-Stage Spatio-Temporal Candidate Funnel
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {funnelStages.map((stg, i) => (
            <div 
              key={i} 
              className={`p-3 rounded-xl border text-center font-mono ${
                stg.highlight ? 'bg-red-50/70 border-red-200 text-status-danger' : 'bg-ocean-light/50 border-border-marine text-ocean-navy'
              }`}
            >
              <span className="text-[10px] text-text-muted block">{stg.label}</span>
              <span className="text-base font-extrabold mt-1 block">{stg.count}</span>
              <span className="text-[10px] text-text-muted font-sans mt-0.5 block">{stg.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section B: Siamese Trajectory Similarity Comparison & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Trajectory Similarity Visual (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm flex flex-col justify-between font-mono text-xs">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-marine">
              <span className="font-bold text-xs text-ocean-navy uppercase">Siamese Trajectory Similarity</span>
              <span className="text-[10px] font-bold text-ocean">STSN v2.8</span>
            </div>

            <p className="text-[11px] text-text-secondary font-sans mb-3">
              Deep embedding cosine similarity comparing backward oil drift trajectory vs MV Ocean Star reconstructed track:
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-ocean-sky/40 border border-ocean/30 rounded-xl">
                <div className="flex justify-between items-baseline">
                  <span className="text-ocean-deep font-bold">Overall Trajectory Similarity:</span>
                  <span className="text-xl font-extrabold text-ocean">93.4%</span>
                </div>
                <div className="h-2 w-full bg-white rounded-full overflow-hidden mt-1.5">
                  <div className="bg-ocean h-full w-[93.4%]"></div>
                </div>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Spatial Compatibility (Fréchet 1.4 nm):</span>
                  <span className="font-bold text-ocean-deep">94.0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Temporal Alignment (Delta t 12 min):</span>
                  <span className="font-bold text-ocean-deep">91.0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Route Curvature Match (DTW 0.12):</span>
                  <span className="font-bold text-ocean-deep">88.0%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border-marine text-[11px] font-sans text-text-muted">
            Algorithm: Dual-Stream Bidirectional GRU with Mahalanobis Distance Metric.
          </div>
        </div>

        {/* Section C: XGBoost Attribution Table (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-marine">
            <span className="font-bold text-xs text-ocean-navy uppercase font-mono">
              XGBoost Vessel Attribution Ranking Table
            </span>
            <span className="text-[10px] font-mono text-text-muted">24 Features Evaluated</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-ocean-light border-b border-border-marine text-[9px] text-text-muted uppercase">
                <tr>
                  <th className="px-2 py-2">RANK</th>
                  <th className="px-2 py-2">VESSEL</th>
                  <th className="px-2 py-2">SPATIAL</th>
                  <th className="px-2 py-2">TEMPORAL</th>
                  <th className="px-2 py-2">TRAJECTORY</th>
                  <th className="px-2 py-2">GAP</th>
                  <th className="px-2 py-2">PRIORITY SCORE</th>
                  <th className="px-2 py-2 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-marine/50">
                {candidateList.map((v) => (
                  <tr 
                    key={v.mmsi} 
                    className={`hover:bg-ocean-sky/30 transition-colors ${
                      v.rank === '01' ? 'bg-red-50/40 border-l-4 border-l-status-danger font-semibold' : ''
                    }`}
                  >
                    <td className="px-2 py-2.5 font-bold text-ocean-navy">{v.rank}</td>
                    <td className="px-2 py-2.5">
                      <div className="font-bold text-ocean-navy">{v.name}</div>
                      <div className="text-[9px] text-text-muted">{v.type}</div>
                    </td>
                    <td className="px-2 py-2.5 text-text-secondary">{v.spatialMatch}</td>
                    <td className="px-2 py-2.5 text-text-secondary">{v.temporalMatch}</td>
                    <td className="px-2 py-2.5 text-text-secondary">{v.trajectoryMatch}</td>
                    <td className="px-2 py-2.5">
                      <span className={v.aisGapScore > 80 ? 'text-status-danger font-bold' : 'text-text-muted'}>
                        {v.aisGapScore}
                      </span>
                    </td>
                    <td className="px-2 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        v.priorityScore > 80 
                          ? 'bg-status-danger text-white' 
                          : v.priorityScore > 60 
                          ? 'bg-amber-100 text-status-warning' 
                          : 'bg-slate-100 text-text-muted'
                      }`}>
                        {v.priorityScore}
                      </span>
                    </td>
                    <td className="px-2 py-2.5 text-right">
                      <button
                        onClick={() => onNavigate("evidence-risk")}
                        className="px-2 py-1 rounded text-[10px] bg-ocean hover:bg-ocean-deep text-white font-bold transition-colors"
                      >
                        Evidence
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 pt-2.5 border-t border-border-marine flex items-center justify-between text-[11px] text-text-secondary">
            <span>Primary Driver for {leadVessel.name}: Transponder silence & origin pass.</span>
            <span className="font-bold text-status-danger font-mono">Score: {leadVessel.priorityScore} / 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
