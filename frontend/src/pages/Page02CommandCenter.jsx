import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Activity, 
  Waves, 
  Ship, 
  ShieldAlert, 
  ArrowUpRight, 
  Compass, 
  Clock, 
  TrendingUp,
  Filter,
  CheckCircle2,
  ExternalLink,
  Globe
} from 'lucide-react';
import GISMapMock from '../components/gis/GISMapMock';
import { useIncident } from '../context/IncidentContext';

export default function Page02CommandCenter({ onNavigate }) {
  const { activeIncidentId, activeIncident, selectIncident, allIncidents } = useIncident();

  const kpiCards = [
    { title: "ACTIVE REGIONS", value: `${allIncidents.length}`, change: "6 live maritime zones", alert: false, color: "text-ocean-deep" },
    { title: "CURRENT SLICK AREA", value: `${activeIncident.spillAreaKm2} km²`, change: `${activeIncident.regionShort}`, alert: true, color: "text-status-danger" },
    { title: "VESSELS MONITORED", value: `${activeIncident.candidateCount * 120 + 380}`, change: "AIS + SAR sync", alert: false, color: "text-ocean" },
    { title: "LEAD ATTRIBUTION", value: `${activeIncident.topVessel?.priorityScore || 91.4}/100`, change: activeIncident.topVessel?.name, alert: true, color: "text-status-warning" },
    { title: "HINDCAST ORIGIN", value: `${activeIncident.hindcast?.originZoneA?.confidence || 72.4}%`, change: "Zone A converged", alert: false, color: "text-ocean-bright" },
  ];

  const liveEvents = [
    { time: "14:42 UTC", text: `Active spill detected (${activeIncident.internalId}, ${activeIncident.spillAreaKm2} km² in ${activeIncident.regionShort})`, badge: "DETECTION", type: "critical" },
    { time: "14:39 UTC", text: `AIS blackout interval flagged (${activeIncident.topVessel?.name}, ${activeIncident.topVessel?.aisBlackoutDurationMin} min)`, badge: "ANOMALY", type: "warning" },
    { time: "14:35 UTC", text: `Backward Lagrangian hindcast completed (${activeIncident.hindcast?.originZoneA?.name})`, badge: "HINDCAST", type: "info" },
    { time: "14:31 UTC", text: `Vessel speed drop detected (${activeIncident.topVessel?.speedDropKn})`, badge: "KINEMATICS", type: "warning" },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-ocean-navy tracking-tight">
              Maritime Intelligence Command Center
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-status-success border border-emerald-200 text-[10px] font-bold font-mono">
              ● REAL GIS TILES ACTIVE
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Real-time orbital SAR radar surveillance, automated hydrocarbon segmentation, and AIS forensic tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate("workspace")}
            className="px-3.5 py-1.5 rounded-lg bg-ocean hover:bg-ocean-deep text-white text-xs font-bold shadow-marine-sm transition-all flex items-center gap-1.5"
          >
            <span>Open Case {activeIncidentId}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5 Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpiCards.map((kpi, idx) => (
          <div key={idx} className="p-3.5 bg-white border border-border-marine rounded-xl shadow-marine-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold text-text-muted font-mono uppercase tracking-wider">
              {kpi.title}
            </span>
            <div className={`text-2xl font-extrabold font-mono mt-1 ${kpi.color}`}>
              {kpi.value}
            </div>
            <span className="text-[10px] text-text-secondary mt-1 font-medium truncate">
              {kpi.change}
            </span>
          </div>
        ))}
      </div>

      {/* Main Grid: GIS Viewport (65%) + Right Panel (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Map (Col 8) */}
        <div className="lg:col-span-8 bg-white border border-border-marine rounded-2xl p-3 shadow-marine-sm flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-marine text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-ocean-navy">Operational Surface GIS Canvas</span>
              <span className="text-[10px] font-mono text-ocean-deep bg-ocean-sky/60 px-2 py-0.5 rounded border border-ocean/30 font-semibold flex items-center gap-1">
                <span>{activeIncident.flagEmoji}</span>
                <span>{activeIncident.region} · {activeIncident.coordinates?.display}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onNavigate("live-monitor")}
                className="text-xs text-ocean hover:text-ocean-deep font-semibold flex items-center gap-1"
              >
                <span>Full Monitor</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Map Viewport */}
          <div className="flex-1">
            <GISMapMock 
              mode="general" 
              caseData={activeIncident}
              height="h-[460px]"
              onSelectSpill={() => onNavigate("workspace")}
              onSelectVessel={() => onNavigate("vessel-intel")}
            />
          </div>

          {/* Bottom Analytics Strip inside map container */}
          <div className="grid grid-cols-3 gap-3 pt-3 mt-3 border-t border-border-marine text-xs">
            <div className="bg-ocean-light p-2.5 rounded-lg border border-border-marine">
              <span className="text-[10px] text-text-muted font-mono block">OIL SPILL DETECTION</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-sm font-bold text-ocean-navy font-mono">{activeIncident.spillAreaKm2} km²</span>
                <span className="text-[10px] text-status-danger font-semibold">● {activeIncident.riskLevel}</span>
              </div>
              <div className="h-4 flex items-end gap-1 mt-1">
                <span className="w-2 h-1 bg-ocean/40 rounded-sm"></span>
                <span className="w-2 h-1.5 bg-ocean/40 rounded-sm"></span>
                <span className="w-2 h-2 bg-ocean/60 rounded-sm"></span>
                <span className="w-2 h-2.5 bg-ocean/60 rounded-sm"></span>
                <span className="w-2 h-3.5 bg-ocean rounded-sm"></span>
                <span className="w-2 h-4 bg-status-danger rounded-sm"></span>
              </div>
            </div>

            <div className="bg-ocean-light p-2.5 rounded-lg border border-border-marine">
              <span className="text-[10px] text-text-muted font-mono block">VESSEL CORRIDOR DENSITY</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-sm font-bold text-ocean-navy font-mono">{activeIncident.candidateCount} Tracked</span>
                <span className="text-[10px] text-status-warning font-semibold">1 Suspect</span>
              </div>
              <div className="w-full bg-border-marine/60 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-ocean h-full w-3/4"></div>
              </div>
            </div>

            <div className="bg-ocean-light p-2.5 rounded-lg border border-border-marine">
              <span className="text-[10px] text-text-muted font-mono block">COUPLED HYDRODYNAMICS</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-sm font-bold text-ocean-deep font-mono">{activeIncident.environment?.currentSpeedMs} m/s</span>
                <span className="text-[10px] text-text-muted font-semibold">{activeIncident.environment?.currentDirectionText}</span>
              </div>
              <div className="w-full bg-border-marine/60 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-ocean-deep h-full w-[65%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Intelligence Panel (Col 4) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Priority Incidents List & Region Switcher */}
          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-marine">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-status-danger" />
                <h3 className="font-bold text-xs text-ocean-navy">REGIONAL SCENARIOS</h3>
              </div>
              <span className="text-[10px] font-mono text-ocean font-bold">{allIncidents.length} Active</span>
            </div>

            <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-0.5">
              {allIncidents.map((inc) => (
                <div 
                  key={inc.id}
                  onClick={() => selectIncident(inc.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    inc.id === activeIncidentId 
                      ? 'bg-ocean-sky/60 border-ocean shadow-sm ring-1 ring-ocean/30' 
                      : 'bg-ocean-light/40 border-border-marine hover:bg-ocean-sky/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold font-mono text-ocean-navy flex items-center gap-1.5">
                      <span>{inc.flagEmoji}</span>
                      <span>{inc.regionShort}</span>
                      <span className="text-[10px] text-text-muted font-normal">({inc.id})</span>
                    </span>
                    <span className={`text-[9px] font-bold font-mono px-1.5 py-0.2 rounded-full border ${inc.riskColor}`}>
                      {inc.risk}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5 text-[11px] text-text-secondary">
                    <span>Target: <strong>{inc.topCandidate}</strong></span>
                    <span className="font-mono font-semibold text-ocean-deep">{inc.areaKm2} km²</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-text-muted font-mono">
                    <span>Conf: {inc.confidence}%</span>
                    <span className="text-ocean font-semibold hover:underline">
                      {inc.id === activeIncidentId ? '● Active Region' : 'Select Region →'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Real-time Event Feed */}
          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-marine">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-ocean" />
                <h3 className="font-bold text-xs text-ocean-navy">LIVE EVENT STREAM</h3>
              </div>
              <span className="text-[10px] font-mono text-status-success font-semibold">ACTIVE</span>
            </div>

            <div className="space-y-3">
              {liveEvents.map((evt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs">
                  <span className="font-mono text-[10px] text-text-muted whitespace-nowrap mt-0.5">
                    {evt.time}
                  </span>
                  <div className="flex-1">
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold mr-1.5 ${
                      evt.type === 'critical' ? 'bg-red-100 text-status-danger' : evt.type === 'warning' ? 'bg-amber-100 text-status-warning' : 'bg-blue-100 text-ocean'
                    }`}>
                      {evt.badge}
                    </span>
                    <span className="text-text-primary text-[11px] leading-tight">
                      {evt.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
