import React from 'react';
import { 
  Layers, 
  Wind, 
  Waves, 
  Thermometer, 
  Activity, 
  Compass, 
  ArrowRight,
  Download,
  CheckCircle2
} from 'lucide-react';
import GISMapMock from '../components/gis/GISMapMock';
import { useIncident } from '../context/IncidentContext';

export default function Page07Characterize({ onNavigate }) {
  const { activeIncident } = useIncident();
  const caseData = activeIncident;

  // Radar chart metrics
  const radarDimensions = [
    { label: "Backscatter Contrast", value: 92 },
    { label: "Elongation Index", value: 88 },
    { label: "Edge Complexity", value: 84 },
    { label: "Texture Homogeneity", value: 78 },
    { label: "Fragmentation", value: 65 }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-ocean-navy tracking-tight">
              Oil Spill Characterization & Morphology
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-status-success border border-emerald-200 text-[10px] font-bold font-mono">
              ● PROFILE VERIFIED
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Quantitative geometric modeling, GLCM SAR texture decomposition, and ocean-atmosphere coupling for Incident {caseData.incidentId}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-border-marine bg-white hover:bg-ocean-sky text-ocean-navy text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors">
            <Download className="w-3.5 h-3.5 text-ocean" />
            <span>Export Spectral Profile</span>
          </button>
          <button
            onClick={() => onNavigate("simulation")}
            className="px-4 py-1.5 rounded-lg bg-ocean hover:bg-ocean-deep text-white text-xs font-bold shadow-marine-md flex items-center gap-1.5 transition-all"
          >
            <span>Run Drift Simulation Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top 6 Geometric Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3 bg-white border border-border-marine rounded-xl shadow-marine-sm font-mono">
          <span className="text-[10px] text-text-muted block">MEASURED AREA</span>
          <span className="text-lg font-bold text-ocean-deep">{caseData.spillAreaKm2} km²</span>
          <span className="text-[9px] text-text-muted block">±0.4 km² error</span>
        </div>
        <div className="p-3 bg-white border border-border-marine rounded-xl shadow-marine-sm font-mono">
          <span className="text-[10px] text-text-muted block">PERIMETER</span>
          <span className="text-lg font-bold text-ocean-deep">{caseData.spillPerimeterKm} km</span>
          <span className="text-[9px] text-text-muted block">Fractal Dim: 1.34</span>
        </div>
        <div className="p-3 bg-white border border-border-marine rounded-xl shadow-marine-sm font-mono">
          <span className="text-[10px] text-text-muted block">LENGTH / WIDTH</span>
          <span className="text-lg font-bold text-text-primary">{caseData.lengthKm} / {caseData.widthKm} km</span>
          <span className="text-[9px] text-text-muted block">Aspect: 4.0:1</span>
        </div>
        <div className="p-3 bg-white border border-border-marine rounded-xl shadow-marine-sm font-mono">
          <span className="text-[10px] text-text-muted block">ORIENTATION</span>
          <span className="text-lg font-bold text-ocean">{caseData.orientationDeg}° Azimuth</span>
          <span className="text-[9px] text-text-muted block">Aligned with current</span>
        </div>
        <div className="p-3 bg-white border border-border-marine rounded-xl shadow-marine-sm font-mono">
          <span className="text-[10px] text-text-muted block">ESTIMATED AGE</span>
          <span className="text-lg font-bold text-status-warning">{caseData.estimatedAgeHours}h</span>
          <span className="text-[9px] text-text-muted block">Weathering: Emulsified</span>
        </div>
        <div className="p-3 bg-white border border-border-marine rounded-xl shadow-marine-sm font-mono">
          <span className="text-[10px] text-text-muted block">CONFIDENCE</span>
          <span className="text-lg font-bold text-status-success">{caseData.detectionConfidence}%</span>
          <span className="text-[9px] text-text-muted block">Mineral oil</span>
        </div>
      </div>

      {/* Main Grid: Morphology GIS Viewport (55%) + Scientific Radar & Context (45%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Spill Polygon High-Res View (Col 7) */}
        <div className="lg:col-span-7 bg-white border border-border-marine rounded-2xl p-3 shadow-marine-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-marine text-xs font-bold text-ocean-navy">
              <span>SPILL MORPHOLOGICAL BOUNDARY ({caseData.region})</span>
              <span className="text-[10px] font-mono text-ocean">{caseData.coordinates?.display || "14.82°N, 68.21°E"}</span>
            </div>
            <GISMapMock 
              mode="characterize" 
              caseData={caseData}
              height="h-[420px]"
            />
          </div>

          <div className="mt-3 pt-3 border-t border-border-marine grid grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-ocean-light p-2 rounded border border-border-marine/50">
              <span className="text-text-muted text-[9px] block">COMPACTNESS FACTOR</span>
              <span className="font-bold text-ocean-navy">{caseData.compactness} (Elongated)</span>
            </div>
            <div className="bg-ocean-light p-2 rounded border border-border-marine/50">
              <span className="text-text-muted text-[9px] block">THICK CORE FRACTION</span>
              <span className="font-bold text-ocean-deep">38% Heavy Sheen</span>
            </div>
            <div className="bg-ocean-light p-2 rounded border border-border-marine/50">
              <span className="text-text-muted text-[9px] block">TAIL DISPERSION</span>
              <span className="font-bold text-status-warning">62% Thin Film</span>
            </div>
          </div>
        </div>

        {/* Right: Scientific Radar & Coupled Environment (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Scientific Radar Chart */}
          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-marine">
              <span className="font-bold text-xs text-ocean-navy uppercase">Scientific Radar Signature</span>
              <span className="text-[10px] font-mono text-ocean font-bold">5 DIMENSIONS</span>
            </div>

            {/* Simulated Radar Spider Chart via SVG */}
            <div className="flex items-center justify-center my-2">
              <svg width="240" height="180" viewBox="0 0 240 180" className="overflow-visible">
                {/* Concentric Polygons */}
                <polygon points="120,20 200,60 170,150 70,150 40,60" fill="none" stroke="#D9EAF0" strokeWidth="1" />
                <polygon points="120,45 175,75 155,135 85,135 65,75" fill="none" stroke="#D9EAF0" strokeWidth="1" />
                <polygon points="120,70 150,90 140,120 100,120 90,90" fill="none" stroke="#D9EAF0" strokeWidth="1" />
                {/* Spoke lines */}
                <line x1="120" y1="95" x2="120" y2="20" stroke="#D9EAF0" />
                <line x1="120" y1="95" x2="200" y2="60" stroke="#D9EAF0" />
                <line x1="120" y1="95" x2="170" y2="150" stroke="#D9EAF0" />
                <line x1="120" y1="95" x2="70" y2="150" stroke="#D9EAF0" />
                <line x1="120" y1="95" x2="40" y2="60" stroke="#D9EAF0" />
                {/* Filled Signature Polygon */}
                <polygon 
                  points="120,24 190,65 160,140 75,135 50,68" 
                  fill="rgba(8, 126, 164, 0.3)" 
                  stroke="#087EA4" 
                  strokeWidth="2" 
                />
                {/* Labels */}
                <text x="120" y="12" textAnchor="middle" fill="#0B2942" fontSize="9" fontFamily="monospace" fontWeight="bold">Contrast 92%</text>
                <text x="205" y="65" fill="#0B2942" fontSize="9" fontFamily="monospace">Elongation 88%</text>
                <text x="175" y="162" fill="#0B2942" fontSize="9" fontFamily="monospace">Complexity 84%</text>
                <text x="35" y="162" fill="#0B2942" fontSize="9" fontFamily="monospace">Homogeneity 78%</text>
                <text x="5" y="65" fill="#0B2942" fontSize="9" fontFamily="monospace">Fragmentation 65%</text>
              </svg>
            </div>

            {/* GLCM Texture Metrics */}
            <div className="pt-2 border-t border-border-marine grid grid-cols-4 gap-1.5 text-center text-[10px] font-mono">
              <div className="bg-ocean-light p-1 rounded">Contrast: 0.34</div>
              <div className="bg-ocean-light p-1 rounded">Homogeneity: 0.81</div>
              <div className="bg-ocean-light p-1 rounded">Energy: 0.45</div>
              <div className="bg-ocean-light p-1 rounded">Entropy: 2.18</div>
            </div>
          </div>

          {/* Coupled Environmental Context */}
          <div className="bg-white border border-border-marine rounded-2xl p-4 shadow-marine-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-marine">
              <span className="font-bold text-xs text-ocean-navy uppercase">Coupled Environmental Context</span>
              <span className="text-[10px] font-mono text-status-success font-semibold">ECMWF + CMEMS</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 bg-ocean-light rounded-lg border border-border-marine/40">
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-ocean" />
                  <span>Wind Velocity & Heading:</span>
                </div>
                <span className="font-bold text-ocean-deep">{caseData.environment.windSpeedKn} kn · {caseData.environment.windDirectionText}</span>
              </div>

              <div className="flex items-center justify-between p-2 bg-ocean-light rounded-lg border border-border-marine/40">
                <div className="flex items-center gap-2">
                  <Waves className="w-4 h-4 text-ocean" />
                  <span>Surface Ocean Current:</span>
                </div>
                <span className="font-bold text-ocean-deep">{caseData.environment.currentSpeedMs} m/s · {caseData.environment.currentDirectionText}</span>
              </div>

              <div className="flex items-center justify-between p-2 bg-ocean-light rounded-lg border border-border-marine/40">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-ocean" />
                  <span>Significant Wave Height:</span>
                </div>
                <span className="font-bold text-text-primary">{caseData.environment.waveHeightM}m (Hs) · {caseData.environment.wavePeriodSec}s</span>
              </div>

              <div className="flex items-center justify-between p-2 bg-ocean-light rounded-lg border border-border-marine/40">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-ocean" />
                  <span>Sea Surface Temperature:</span>
                </div>
                <span className="font-bold text-text-primary">{caseData.environment.seaSurfaceTempC}°C · Salinity {caseData.environment.salinityPsu} PSU</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
