import React from 'react';
import { 
  GitBranch, 
  Clock, 
  Activity, 
  AlertTriangle, 
  Compass, 
  ArrowRight, 
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import GISMapMock from '../components/gis/GISMapMock';
import { useIncident } from '../context/IncidentContext';

export default function Page11Trajectory({ onNavigate }) {
  const { activeIncident } = useIncident();
  const caseData = activeIncident;
  const vessel = caseData.topVessel || caseData.candidateVessels?.[0] || { name: "Lead Suspect Vessel" };

  const anomalyTimeline = [
    { time: "22:10 UTC", step: "Baseline Transit", desc: "Stable speed 13.2 kn on course 284° within lane", status: "normal" },
    { time: "22:20 UTC", step: "Sudden Deceleration", desc: "Speed dropped from 12.8 kn to 4.2 kn (-67% drop)", status: "warning" },
    { time: "22:24 UTC", step: "AIS Blackout Initiated", desc: "Transponder shutoff. Transmission gap begins.", status: "critical" },
    { time: "22:42 UTC", step: "Origin Zone A Intersection", desc: "Bi-LSTM placed vessel 1.4 nm from spill origin at 3.8 kn", status: "critical" },
    { time: "23:02 UTC", step: "AIS Signal Restored", desc: "Transponder back online. Vessel accelerated to 12.4 kn", status: "normal" },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-ocean-navy tracking-tight">
              AIS Trajectory Reconstruction & Neural Anomaly Forensics
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-status-success border border-emerald-200 text-[10px] font-bold font-mono">
              ● BF-BiLSTM CONVERGED
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Bidirectional LSTM gap interpolation for unobserved transponder blackout periods and recurrent trajectory forecasting for {vessel.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("attribution")}
            className="px-4 py-2 rounded-xl bg-ocean hover:bg-ocean-deep text-white text-xs font-bold shadow-marine-md flex items-center gap-2 transition-all"
          >
            <span>Proceed to Vessel Attribution Ranking</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Reconstruction Badges Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-border-marine rounded-xl shadow-marine-sm font-mono text-xs">
          <span className="text-[10px] text-text-muted block">TOTAL AIS POINTS</span>
          <span className="text-xl font-bold text-ocean-navy">2,481 Messages</span>
          <span className="text-[10px] text-text-muted block">Recorded in transit corridor</span>
        </div>
        <div className="p-3.5 bg-white border border-border-marine rounded-xl shadow-marine-sm font-mono text-xs">
          <span className="text-[10px] text-text-muted block">BLACKOUT DURATION</span>
          <span className="text-xl font-bold text-status-danger">38 Minutes</span>
          <span className="text-[10px] text-status-danger font-medium block">174 Missing transponder pings</span>
        </div>
        <div className="p-3.5 bg-white border border-border-marine rounded-xl shadow-marine-sm font-mono text-xs">
          <span className="text-[10px] text-text-muted block">RECONSTRUCTION CONFIDENCE</span>
          <span className="text-xl font-bold text-status-success">94.2%</span>
          <span className="text-[10px] text-text-muted block">Mean error: ±0.18 nm</span>
        </div>
        <div className="p-3.5 bg-white border border-border-marine rounded-xl shadow-marine-sm font-mono text-xs">
          <span className="text-[10px] text-text-muted block">ANOMALY SCORE</span>
          <span className="text-xl font-bold text-status-warning">87 / 100</span>
          <span className="text-[10px] text-status-warning font-semibold block">High Risk Behavioral Signature</span>
        </div>
      </div>

      {/* Main Grid: Multi-Trajectory Map (62%) + Diagnostics (38%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Map (Col 7) */}
        <div className="lg:col-span-7 bg-white border border-border-marine rounded-2xl p-3 shadow-marine-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-marine text-xs font-bold text-ocean-navy">
              <span>MULTI-LAYER TRAJECTORY MAPPING ({caseData.region})</span>
              <span className="text-[10px] font-mono text-ocean">BF-BiLSTM v4.1</span>
            </div>
            <GISMapMock 
              mode="trajectory" 
              caseData={caseData}
              height="h-[440px]"
            />
          </div>

          <div className="mt-3 pt-3 border-t border-border-marine flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-[#8295A3]"></span> Observed
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-[#D9534F] border-b border-dashed"></span> Missing Gap (38m)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-[#1597C7]"></span> Bi-LSTM Recon
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-[#1597C7] border-b border-dotted"></span> RNN Forecast
              </span>
            </div>
            <span className="text-ocean font-bold text-[10px]">Intersection: 1.4 nm from Zone A</span>
          </div>
        </div>

        {/* Right: Anomaly Decomposition & Step-by-Step Breakdown (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Anomaly Decomposition */}
          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-marine">
              <span className="font-bold text-xs text-ocean-navy uppercase">Vessel Anomaly Detector</span>
              <span className="text-[10px] font-bold text-status-danger px-2 py-0.5 rounded bg-red-50 border border-red-200">
                SCORE: 87 / 100
              </span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-status-danger font-bold">AIS Transponder Silence</span>
                  <span className="font-bold">95%</span>
                </div>
                <div className="h-1.5 w-full bg-ocean-light rounded-full overflow-hidden">
                  <div className="bg-status-danger h-full w-[95%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-status-warning font-bold">Abrupt Kinematic Deceleration</span>
                  <span className="font-bold">89%</span>
                </div>
                <div className="h-1.5 w-full bg-ocean-light rounded-full overflow-hidden">
                  <div className="bg-status-warning h-full w-[89%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-ocean font-bold">Course Deviation (Off-Lane)</span>
                  <span className="font-bold">84%</span>
                </div>
                <div className="h-1.5 w-full bg-ocean-light rounded-full overflow-hidden">
                  <div className="bg-ocean h-full w-[84%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-text-secondary">Loitering / Drifting Signature</span>
                  <span className="font-bold">80%</span>
                </div>
                <div className="h-1.5 w-full bg-ocean-light rounded-full overflow-hidden">
                  <div className="bg-ocean-deep h-full w-[80%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Anomaly Timeline */}
          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm text-xs">
            <span className="font-bold text-xs text-ocean-navy uppercase block mb-3 pb-2 border-b border-border-marine font-mono">
              Chronological Anomaly Progression
            </span>

            <div className="space-y-2 font-mono">
              {anomalyTimeline.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px]">
                  <span className="text-text-muted text-[10px] w-14 shrink-0 font-bold">{item.time}</span>
                  <div className="flex-1">
                    <span className={`text-[10px] font-bold ${
                      item.status === 'critical' ? 'text-status-danger' : item.status === 'warning' ? 'text-status-warning' : 'text-ocean'
                    }`}>
                      {item.step}
                    </span>
                    <p className="text-[10px] text-text-secondary leading-tight mt-0.5 font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RNN Multi-Horizon Route Forecast */}
          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm font-mono text-xs">
            <span className="font-bold text-xs text-ocean-navy uppercase block mb-2 pb-2 border-b border-border-marine">
              RNN Future Trajectory Predictions
            </span>

            <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
              <div className="p-1.5 bg-ocean-light rounded border border-border-marine/50">
                <span className="text-text-muted block text-[9px]">T+10m</span>
                <span className="font-bold text-ocean">98.4%</span>
              </div>
              <div className="p-1.5 bg-ocean-light rounded border border-border-marine/50">
                <span className="text-text-muted block text-[9px]">T+30m</span>
                <span className="font-bold text-ocean">94.1%</span>
              </div>
              <div className="p-1.5 bg-ocean-light rounded border border-border-marine/50">
                <span className="text-text-muted block text-[9px]">T+60m</span>
                <span className="font-bold text-text-primary">89.5%</span>
              </div>
              <div className="p-1.5 bg-ocean-light rounded border border-border-marine/50">
                <span className="text-text-muted block text-[9px]">T+2h</span>
                <span className="font-bold text-status-warning">82.3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
