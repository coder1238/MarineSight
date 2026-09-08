import React, { useState } from 'react';
import { 
  LifeBuoy, 
  ShieldAlert, 
  Ship, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle,
  Clock,
  Send,
  Download
} from 'lucide-react';
import GISMapMock from '../components/gis/GISMapMock';
import { useIncident } from '../context/IncidentContext';

export default function Page14ResponsePlan({ onNavigate }) {
  const { activeIncident } = useIncident();
  const caseData = activeIncident;
  const [planGenerated, setPlanGenerated] = useState(false);

  const directives = [
    { num: "01", title: "Deploy Containment Booms", priority: "CRITICAL", badge: "bg-red-100 text-status-danger", desc: `Deploy ocean curtain boom barriers across ${caseData.region} shoreline sectors to shield vulnerable habitats.` },
    { num: "02", title: "Monitor Coastal Shoreline Sector", priority: "HIGH", badge: "bg-amber-100 text-status-warning", desc: "Deploy shore-based rapid response teams and thermal drone monitoring along vulnerable coastal zones." },
    { num: "03", title: "Dispatch Specialized Response Vessels", priority: "HIGH", badge: "bg-amber-100 text-status-warning", desc: "Mobilize ICGS response cutters and high-capacity weir skimmer vessels to intercept slick centroid." },
    { num: "04", title: "Notify Maritime & Port Authorities", priority: "HIGH", badge: "bg-amber-100 text-status-warning", desc: "Transmit forensic attribution dossier to DG Shipping, Coast Guard MRCC, and State Pollution Control Board." },
    { num: "05", title: "Increase Satellite Constellation Tasking", priority: "MEDIUM", badge: "bg-blue-100 text-ocean", desc: "Request optical high-resolution imagery tasking for next morning satellite pass." },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-ocean-navy tracking-tight">
              Emergency Response Planner & Tactical Containment
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-status-success border border-emerald-200 text-[10px] font-bold font-mono">
              ● DECISION SUPPORT ACTIVE
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Automated boom deployment strategy, offshore skimmer mobilization, and multi-agency containment coordination for Incident {caseData.incidentId} ({caseData.region}).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("report-system")}
            className="px-4 py-2 rounded-xl bg-ocean hover:bg-ocean-deep text-white text-xs font-bold shadow-marine-md flex items-center gap-2 transition-all"
          >
            <span>Final Forensic Report & Intelligence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Response Map (60%) + Tactics & Allocations (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Tactical Map (Col 7) */}
        <div className="lg:col-span-7 bg-white border border-border-marine rounded-2xl p-3 shadow-marine-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-marine text-xs font-bold text-ocean-navy">
              <span>TACTICAL BOOM PLACEMENT & VESSEL STAGING ({caseData.region})</span>
              <span className="text-[10px] font-mono text-status-warning font-bold">CONTAINMENT ACTIVE</span>
            </div>
            <GISMapMock 
              mode="response-plan" 
              caseData={caseData}
              height="h-[440px]"
            />
          </div>

          <div className="mt-3 pt-3 border-t border-border-marine grid grid-cols-4 gap-2 text-center text-xs font-mono">
            <div className="p-2 bg-ocean-light rounded border border-border-marine/40">
              <span className="text-text-muted text-[9px] block">RESPONSE VESSELS</span>
              <span className="font-bold text-ocean">3 Dispatched</span>
            </div>
            <div className="p-2 bg-ocean-light rounded border border-border-marine/40">
              <span className="text-text-muted text-[9px] block">BOOMS DEPLOYED</span>
              <span className="font-bold text-status-warning">2.4 km Barrier</span>
            </div>
            <div className="p-2 bg-ocean-light rounded border border-border-marine/40">
              <span className="text-text-muted text-[9px] block">PATROL AIRCRAFT</span>
              <span className="font-bold text-text-primary">1 Dornier-228</span>
            </div>
            <div className="p-2 bg-ocean-light rounded border border-border-marine/40">
              <span className="text-text-muted text-[9px] block">CREW MOBILIZED</span>
              <span className="font-bold text-status-success">24 Specialists</span>
            </div>
          </div>
        </div>

        {/* Right: Directives & Actions (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Prioritized Action Directives */}
          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-marine">
              <span className="font-bold text-xs text-ocean-navy uppercase font-mono">
                AI-Recommended Response Actions
              </span>
              <span className="text-[10px] font-mono text-ocean font-bold">5 DIRECTIVES</span>
            </div>

            <div className="space-y-2.5">
              {directives.map((dir) => (
                <div key={dir.num} className="p-2.5 rounded-xl border border-border-marine bg-ocean-light/30 hover:bg-ocean-sky/20 transition-all text-xs">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-ocean-navy">{dir.num}. {dir.title}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${dir.badge}`}>
                      {dir.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary mt-1 font-sans leading-relaxed">
                    {dir.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Response Timeline */}
          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm font-mono text-xs">
            <span className="font-bold text-xs text-ocean-navy uppercase block mb-2 pb-2 border-b border-border-marine">
              Incident Action Timeline
            </span>

            <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
              <div className="p-1 bg-ocean text-white rounded font-bold">NOW: Orders</div>
              <div className="p-1 bg-ocean-light rounded border border-border-marine">+6h: On-Scene</div>
              <div className="p-1 bg-ocean-light rounded border border-border-marine">+12h: Booms</div>
              <div className="p-1 bg-ocean-light rounded border border-border-marine">+24h: Skim</div>
              <div className="p-1 bg-ocean-light rounded border border-border-marine">+48h: Secured</div>
            </div>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => {
              setPlanGenerated(true);
              setTimeout(() => onNavigate("report-system"), 1200);
            }}
            className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-marine-md flex items-center justify-center gap-2 ${
              planGenerated 
                ? 'bg-status-success text-white' 
                : 'bg-ocean hover:bg-ocean-deep text-white'
            }`}
          >
            {planGenerated ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Response Plan Transmitted to Coast Guard!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Generate & Transmit Incident Action Plan (IAP)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
