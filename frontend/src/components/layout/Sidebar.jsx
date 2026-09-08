import React from 'react';
import { 
  Radar, 
  Activity, 
  AlertTriangle, 
  FolderKanban, 
  Satellite, 
  Layers, 
  Waves, 
  Compass, 
  Ship, 
  GitBranch, 
  Target, 
  ShieldAlert, 
  LifeBuoy, 
  FileText, 
  Database, 
  Cpu, 
  ChevronLeft, 
  ChevronRight,
  Home
} from 'lucide-react';

import MarineSightLogo from '../common/MarineSightLogo';

export default function Sidebar({ currentPage, setCurrentPage, collapsed, setCollapsed }) {
  const navSections = [
    {
      title: "OPERATIONS",
      items: [
        { id: "command-center", label: "Overview", icon: Radar, pageNum: "02" },
        { id: "live-monitor", label: "Live Monitor", icon: Activity, pageNum: "03" },
        { id: "incidents", label: "Incidents", icon: AlertTriangle, pageNum: "04" },
        { id: "workspace", label: "Investigation Hub", icon: FolderKanban, pageNum: "05" },
      ]
    },
    {
      title: "ANALYSIS",
      items: [
        { id: "satellite", label: "Satellite SAR", icon: Satellite, pageNum: "06" },
        { id: "characterize", label: "Spill Profiling", icon: Layers, pageNum: "07" },
        { id: "simulation", label: "Drift Simulation", icon: Waves, pageNum: "08" },
        { id: "source-trace", label: "Source Hindcast", icon: Compass, pageNum: "09" },
        { id: "vessel-intel", label: "Vessel Intelligence", icon: Ship, pageNum: "10" },
        { id: "trajectory", label: "Trajectory Analysis", icon: GitBranch, pageNum: "11" },
        { id: "attribution", label: "Attribution Score", icon: Target, pageNum: "12" },
      ]
    },
    {
      title: "RESPONSE",
      items: [
        { id: "evidence-risk", label: "Risk Assessment", icon: ShieldAlert, pageNum: "13" },
        { id: "response-plan", label: "Response Planning", icon: LifeBuoy, pageNum: "14" },
        { id: "report-system", label: "Forensic Report", icon: FileText, pageNum: "15" },
      ]
    },
    {
      title: "PLATFORM",
      items: [
        { id: "landing", label: "Product Landing", icon: Home, pageNum: "01" },
      ]
    }
  ];

  return (
    <aside className={`bg-white border-r border-border-marine flex flex-col transition-all duration-300 z-30 select-none shadow-marine-sm ${collapsed ? 'w-16' : 'w-64'} h-screen sticky top-0`}>
      {/* Brand Header */}
      <div className="p-3 border-b border-border-marine flex items-center justify-between min-h-[64px]">
        <a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage("landing");
          }} 
          className="flex items-center gap-2 text-left focus:outline-none overflow-hidden cursor-pointer flex-1 min-w-0"
          title="MarineSight Platform"
        >
          <MarineSightLogo collapsed={collapsed} />
        </a>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-text-muted hover:text-ocean p-1.5 rounded-md hover:bg-ocean-sky transition-colors flex-shrink-0"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {navSections.map((sec, idx) => (
          <div key={idx}>
            {!collapsed && (
              <h2 className="px-3 text-[10px] font-bold text-text-muted tracking-wider uppercase mb-1.5">
                {sec.title}
              </h2>
            )}
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <a
                    key={item.id}
                    href={`/${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(item.id);
                    }}
                    title={collapsed ? `${item.pageNum} - ${item.label}` : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-ocean text-white shadow-marine-sm font-semibold' 
                        : 'text-text-secondary hover:text-ocean-deep hover:bg-ocean-sky'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-ocean'}`} />
                    {!collapsed && (
                      <span className="truncate flex-1 text-left flex items-center justify-between">
                        <span>{item.label}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-ocean-sky text-ocean-deep'}`}>
                          {item.pageNum}
                        </span>
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Status Pill */}
      <div className="p-3 border-t border-border-marine bg-ocean-light/60">
        {!collapsed ? (
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
              <span className="text-text-secondary font-medium">Sentinel-1 Ingest</span>
            </div>
            <span className="font-mono text-ocean text-[10px] font-semibold">LIVE</span>
          </div>
        ) : (
          <div className="flex justify-center" title="Systems Online">
            <span className="w-2.5 h-2.5 rounded-full bg-status-success"></span>
          </div>
        )}
      </div>
    </aside>
  );
}
