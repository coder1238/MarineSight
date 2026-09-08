import React, { useState } from 'react';
import { 
  Ship, 
  Search, 
  Target, 
  Compass, 
  AlertTriangle, 
  ArrowRight,
  TrendingDown,
  Clock,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import GISMapMock from '../components/gis/GISMapMock';
import { useIncident } from '../context/IncidentContext';
import { CANDIDATE_VESSELS } from '../data/mockData';

export default function Page10VesselIntel({ onNavigate }) {
  const { activeIncident } = useIncident();
  const caseData = activeIncident;
  const candidateList = caseData.candidateVessels || CANDIDATE_VESSELS;
  const [selectedVessel, setSelectedVessel] = useState(caseData.topVessel || candidateList[0]);

  // Sync selected vessel when activeIncident changes
  React.useEffect(() => {
    setSelectedVessel(caseData.topVessel || candidateList[0]);
  }, [caseData.incidentId]);

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-ocean-navy tracking-tight">
              Vessel Intelligence & Profile Dossier
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-status-danger/10 text-status-danger border border-status-danger/30 text-[10px] font-bold font-mono">
              ● PRIORITY TARGET IDENTIFIED ({caseData.region})
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Spatio-temporal AIS vessel correlation, range ring proximity, and transponder transmission integrity analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("trajectory")}
            className="px-4 py-1.5 rounded-lg bg-ocean hover:bg-ocean-deep text-white text-xs font-bold shadow-marine-md flex items-center gap-1.5 transition-all"
          >
            <span>Analyze Trajectory (Bi-LSTM)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Candidate Vessels Quick Selector Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {candidateList.map((v) => {
          const isSelected = selectedVessel.mmsi === v.mmsi;
          return (
            <button
              key={v.mmsi}
              onClick={() => setSelectedVessel(v)}
              className={`px-3 py-2 rounded-xl border text-xs font-mono whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-white border-status-danger/40 text-status-danger shadow-marine-sm font-bold ring-2 ring-red-100'
                  : 'bg-white border-border-marine text-text-secondary hover:bg-ocean-sky'
              }`}
            >
              <span>{v.rank}. {v.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-ocean-sky text-ocean-deep">
                Score: {v.priorityScore}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Range Rings Map (58%) + Vessel Dossier (42%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Map (Col 7) */}
        <div className="lg:col-span-7 bg-white border border-border-marine rounded-2xl p-3 shadow-marine-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-marine text-xs font-bold text-ocean-navy">
              <span>PROXIMITY RANGE RINGS ({caseData.region})</span>
              <span className="text-[10px] font-mono text-status-danger font-bold">CPA: 1.4 nm</span>
            </div>
            <GISMapMock 
              mode="vessel-intel" 
              caseData={caseData}
              height="h-[430px]"
            />
          </div>

          <div className="mt-3 pt-3 border-t border-border-marine grid grid-cols-3 gap-2 text-xs font-mono">
            <div className="p-2 bg-ocean-light rounded border border-border-marine/50">
              <span className="text-text-muted text-[9px] block">CLOSEST POINT OF APPROACH</span>
              <span className="font-bold text-status-danger">1.4 nm (22:42 UTC)</span>
            </div>
            <div className="p-2 bg-ocean-light rounded border border-border-marine/50">
              <span className="text-text-muted text-[9px] block">AIS BLACKOUT DURATION</span>
              <span className="font-bold text-status-danger">38 Minutes Silence</span>
            </div>
            <div className="p-2 bg-ocean-light rounded border border-border-marine/50">
              <span className="text-text-muted text-[9px] block">CURRENT SPEED / COG</span>
              <span className="font-bold text-ocean-navy">12.4 kn · 284° Heading</span>
            </div>
          </div>
        </div>

        {/* Right: Vessel Telemetry Dossier (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Identity Card */}
          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm">
            <div className="flex items-start justify-between pb-2 mb-3 border-b border-border-marine">
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase font-bold">Selected Vessel Profile</span>
                <h3 className="text-base font-extrabold text-ocean-navy mt-0.5">{selectedVessel.name}</h3>
                <p className="text-[11px] text-text-secondary font-mono">{selectedVessel.type} · Flag: {selectedVessel.flag} {selectedVessel.flagEmoji}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-red-50 text-status-danger border border-red-200 text-[10px] font-bold font-mono">
                ● {selectedVessel.status}
              </span>
            </div>

            {/* Vessel Metadata Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 bg-ocean-light rounded border border-border-marine/40">
                <span className="text-[9px] text-text-muted block">MMSI NUMBER</span>
                <span className="font-bold text-ocean-deep">{selectedVessel.mmsi}</span>
              </div>
              <div className="p-2 bg-ocean-light rounded border border-border-marine/40">
                <span className="text-[9px] text-text-muted block">IMO NUMBER</span>
                <span className="font-bold text-text-primary">{selectedVessel.imo}</span>
              </div>
              <div className="p-2 bg-ocean-light rounded border border-border-marine/40">
                <span className="text-[9px] text-text-muted block">LENGTH / BEAM</span>
                <span className="font-bold text-text-primary">{selectedVessel.lengthM}m / {selectedVessel.beamM}m</span>
              </div>
              <div className="p-2 bg-ocean-light rounded border border-border-marine/40">
                <span className="text-[9px] text-text-muted block">DESTINATION & ETA</span>
                <span className="font-bold text-ocean">{selectedVessel.destination}</span>
              </div>
            </div>
          </div>

          {/* Speed & Course Anomaly Chart Widget */}
          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-marine">
              <span className="font-bold text-xs text-ocean-navy uppercase">Speed Profile (24h Timeline)</span>
              <span className="text-[10px] font-bold text-status-danger">ANOMALOUS DROP: 3.8 kn</span>
            </div>

            <p className="text-[11px] text-text-secondary mb-2 font-sans">
              Sharp unlogged deceleration coinciding with origin Zone A transit and transponder blackout:
            </p>

            {/* Simulated Speed Line Chart */}
            <div className="h-24 w-full bg-ocean-light/70 rounded-lg p-2 border border-border-marine flex items-end justify-between gap-1 relative overflow-hidden">
              <span className="absolute top-1 left-2 text-[9px] text-text-muted">14 kn</span>
              <span className="absolute bottom-1 left-2 text-[9px] text-text-muted">0 kn</span>

              {/* Data points */}
              {[13.2, 13.1, 13.0, 12.8, 12.4, 8.5, 4.2, 3.8, 4.0, 8.2, 12.2, 12.4].map((spd, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                  <div 
                    style={{ height: `${(spd / 15) * 100}%` }}
                    className={`w-full rounded-t-sm transition-all ${
                      spd <= 4.2 ? 'bg-status-danger' : 'bg-ocean'
                    }`}
                  />
                  <span className="text-[8px] text-text-muted mt-0.5">{idx * 2}h</span>
                </div>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] text-text-muted">
              <span>Cruising: 13.2 kn</span>
              <span className="text-status-danger font-bold">Blackout Trough: 3.8 kn</span>
              <span>Resumed: 12.4 kn</span>
            </div>
          </div>

          {/* Attribution Score Pill */}
          <div className="p-3.5 rounded-xl border border-status-danger/40 bg-red-50/50 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-status-danger font-mono uppercase block">
                Investigation Priority Score
              </span>
              <span className="text-2xl font-extrabold text-status-danger font-mono">
                {selectedVessel.priorityScore} / 100
              </span>
            </div>
            <button
              onClick={() => onNavigate("attribution")}
              className="px-4 py-2 bg-ocean hover:bg-ocean-deep text-white rounded-lg text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>View Attribution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
