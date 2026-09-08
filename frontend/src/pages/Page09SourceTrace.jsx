import React from 'react';
import { 
  Compass, 
  Target, 
  Clock, 
  Wind, 
  Waves, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import GISMapMock from '../components/gis/GISMapMock';
import { useIncident } from '../context/IncidentContext';

export default function Page09SourceTrace({ onNavigate }) {
  const { activeIncident } = useIncident();
  const caseData = activeIncident;
  const hindcast = caseData.hindcast || {
    originZoneA: { coordinates: caseData.coordinates?.display || "14.82°N, 68.21°E", confidence: 74 },
    originZoneB: { coordinates: caseData.coordinates?.display || "14.82°N, 68.21°E", confidence: 18 },
    originZoneC: { coordinates: caseData.coordinates?.display || "14.82°N, 68.21°E", confidence: 8 },
    backwardDurationHours: 40,
    estimatedReleaseTimeUTC: "T-40h",
    uncertaintyRadiusKm: 6.4,
    currentContribution: 62,
    windContribution: 38
  };

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-ocean-navy tracking-tight">
              Probable Spill Origin (Backward Hindcast)
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-status-success border border-emerald-200 text-[10px] font-bold font-mono">
              ● REVERSAL CONVERGED
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Trace the slick backward through oceanographic and meteorological conditions to estimate probable source locations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("vessel-intel")}
            className="px-5 py-2 rounded-xl bg-ocean hover:bg-ocean-deep text-white text-xs font-bold shadow-marine-md flex items-center gap-2 transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Historical AIS Traffic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Backward Map (65%) + Source Diagnostics (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Origin Hindcast Map (Col 8) */}
        <div className="lg:col-span-8 bg-white border border-border-marine rounded-2xl p-3 shadow-marine-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-marine text-xs font-bold text-ocean-navy">
              <span>BACKWARD LAGRANGIAN TRAJECTORY RECONSTRUCTION ({caseData.region})</span>
              <span className="text-[10px] font-mono text-ocean">T-{hindcast.backwardDurationHours}.0 HOURS ELAPSED</span>
            </div>
            <GISMapMock 
              mode="source-trace" 
              caseData={caseData}
              height="h-[440px]"
              onSelectVessel={() => onNavigate("vessel-intel")}
            />
          </div>

          <div className="mt-3 pt-3 border-t border-border-marine grid grid-cols-3 gap-2 text-xs font-mono">
            <div className="p-2 bg-ocean-light rounded border border-border-marine/50">
              <span className="text-text-muted text-[9px] block">OBSERVED SLICK (T-0)</span>
              <span className="font-bold text-ocean-navy">{caseData.coordinates?.display || "14.82°N, 68.21°E"}</span>
            </div>
            <div className="p-2 bg-ocean-sky/50 rounded border border-ocean/40">
              <span className="text-ocean-deep text-[9px] font-bold block">PRIMARY TARGET ZONE A</span>
              <span className="font-bold text-ocean">{hindcast.originZoneA.coordinates}</span>
            </div>
            <div className="p-2 bg-ocean-light rounded border border-border-marine/50">
              <span className="text-text-muted text-[9px] block">UNCERTAINTY ENVELOPE</span>
              <span className="font-bold text-text-primary">±{hindcast.uncertaintyRadiusKm} km Radius</span>
            </div>
          </div>
        </div>

        {/* Right: Origin Probability Clusters (Col 4) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Probable Source Clusters */}
          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-marine">
              <span className="font-bold text-xs text-ocean-navy uppercase">Probable Source Zones</span>
              <span className="text-[10px] font-mono text-ocean font-bold">HINDCAST CLUSTERS</span>
            </div>

            <div className="space-y-2.5">
              {/* Zone A */}
              <div className="p-3 rounded-xl border border-ocean bg-ocean-sky/40 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ocean-deep flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-ocean animate-ping"></span>
                    ZONE A (Primary Target)
                  </span>
                  <span className="text-sm font-extrabold text-ocean">{hindcast.originZoneA.confidence}%</span>
                </div>
                <div className="text-[11px] text-text-secondary mt-1">
                  Centroid: <strong className="text-ocean-navy">{hindcast.originZoneA.coordinates}</strong>
                </div>
                <div className="text-[10px] text-text-muted mt-0.5">
                  Bathymetry: Depth 2,140m · International Shipping Lane
                </div>
              </div>

              {/* Zone B */}
              <div className="p-2.5 rounded-xl border border-border-marine bg-ocean-light/40 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-text-primary">ZONE B (Secondary)</span>
                  <span className="font-bold text-text-secondary">{hindcast.originZoneB.confidence}%</span>
                </div>
                <div className="text-[10px] text-text-muted mt-0.5">
                  Centroid: {hindcast.originZoneB.coordinates}
                </div>
              </div>

              {/* Zone C */}
              <div className="p-2.5 rounded-xl border border-border-marine bg-ocean-light/40 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-text-primary">ZONE C (Marginal)</span>
                  <span className="font-bold text-text-secondary">{hindcast.originZoneC.confidence}%</span>
                </div>
                <div className="text-[10px] text-text-muted mt-0.5">
                  Centroid: {hindcast.originZoneC.coordinates}
                </div>
              </div>
            </div>
          </div>

          {/* Temporal Estimation */}
          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm font-mono text-xs">
            <span className="font-bold text-xs text-ocean-navy uppercase block mb-3 pb-2 border-b border-border-marine">
              Temporal Estimation
            </span>

            <div className="space-y-2">
              <div className="p-2 bg-ocean-light rounded border border-border-marine/40">
                <span className="text-[9px] text-text-muted block">ESTIMATED DISCHARGE TIME</span>
                <span className="font-bold text-text-primary text-sm">{hindcast.estimatedReleaseTimeUTC}</span>
              </div>
              <div className="p-2 bg-ocean-light rounded border border-border-marine/40">
                <span className="text-[9px] text-text-muted block">BACKWARD INTEGRATION DURATION</span>
                <span className="font-bold text-ocean-deep">{hindcast.backwardDurationHours} Hours Elapsed</span>
              </div>
            </div>
          </div>

          {/* Environmental Force Contribution */}
          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm font-mono text-xs">
            <span className="font-bold text-xs text-ocean-navy uppercase block mb-2 pb-2 border-b border-border-marine">
              Environmental Forcing Contribution
            </span>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-ocean font-bold">Ocean Currents (Copernicus CMEMS)</span>
                  <span className="font-bold">{hindcast.currentContribution}%</span>
                </div>
                <div className="h-2 w-full bg-ocean-light rounded-full overflow-hidden">
                  <div className="bg-ocean h-full w-[61%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-ocean-deep font-bold">Atmospheric Wind Drag (ECMWF)</span>
                  <span className="font-bold">{hindcast.windContribution}%</span>
                </div>
                <div className="h-2 w-full bg-ocean-light rounded-full overflow-hidden">
                  <div className="bg-ocean-deep h-full w-[39%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Action Trigger */}
          <button
            onClick={() => onNavigate("vessel-intel")}
            className="w-full py-3 rounded-xl bg-ocean hover:bg-ocean-deep text-white text-xs font-bold transition-all shadow-marine-sm flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Historical AIS (142 Vessels)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
