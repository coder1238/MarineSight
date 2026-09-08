import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  FileText,
  Activity,
  MapPin,
  Eye,
  Compass,
  Waves,
  Wind,
  Trash2,
  CheckCheck,
  Satellite,
  Ship,
  Sparkles
} from 'lucide-react';
import { INCIDENTS_REGISTRY } from '../data/mockData';
import { api } from '../services/api';
import { useIncident } from '../context/IncidentContext';

export default function Page04Incidents({ onNavigate }) {
  const { activeIncidentId, selectIncident } = useIncident();
  
  // 1. Data & Filter State
  const [incidents, setIncidents] = useState(INCIDENTS_REGISTRY);
  const [activeTab, setActiveTab] = useState("all"); // all, investigating, active, resolved
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all"); // all, critical, high, medium, low
  const [regionFilter, setRegionFilter] = useState("all");
  
  // 2. Sorting & Pagination State
  const [sortConfig, setSortConfig] = useState({ key: 'time', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // 3. Selection & Batch State
  const [selectedIds, setSelectedIds] = useState(new Set());
  
  // 4. Modal & Drawer State
  const [isCreating, setIsCreating] = useState(false);
  const [inspectingIncident, setInspectingIncident] = useState(null);
  
  // New Case Form State
  const [formData, setFormData] = useState({
    title: "",
    region: "Arabian Sea",
    coordinates: "14.82°N, 68.21°E",
    spillAreaKm2: "12.4",
    perimeterKm: "18.2",
    riskLevel: "CRITICAL",
    confidence: "96.5",
    status: "Investigating",
    satellite: "Sentinel-1 SAR",
    topCandidate: "M/V Unknown Vessel",
    vesselsCount: 6
  });

  // Load backend or fallback data
  useEffect(() => {
    let isMounted = true;
    api.getIncidents().then(data => {
      if (isMounted && data && Array.isArray(data) && data.length > 0) {
        setIncidents(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, riskFilter, regionFilter]);

  // Dynamic Regions List
  const availableRegions = useMemo(() => {
    const set = new Set();
    incidents.forEach(inc => {
      if (inc.regionShort) set.add(inc.regionShort);
      else if (inc.region) set.add(inc.region.split('(')[0].trim());
    });
    return Array.from(set);
  }, [incidents]);

  // Calculate Dynamic Metrics for Summary Cards
  const metrics = useMemo(() => {
    const total = incidents.length;
    const investigating = incidents.filter(i => (i.status || "").toLowerCase().includes("investigat")).length;
    const critical = incidents.filter(i => (i.risk || i.riskLevel || "").toUpperCase() === "CRITICAL").length;
    const activeDrift = incidents.filter(i => (i.status || "").toLowerCase().includes("drift") || (i.status || "").toLowerCase().includes("active")).length;
    const resolved = incidents.filter(i => (i.status || "").toLowerCase().includes("resolved") || (i.status || "").toLowerCase().includes("closed")).length;
    return { total, investigating, critical, activeDrift, resolved };
  }, [incidents]);

  // Tab definitions
  const tabs = [
    { id: "all", label: "All Incidents", count: incidents.length },
    { id: "investigating", label: "Under Investigation", count: metrics.investigating },
    { id: "active", label: "Active Drift", count: metrics.activeDrift },
    { id: "resolved", label: "Resolved", count: metrics.resolved },
  ];

  // Filtering Engine
  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      // 1. Tab Status Filter
      const status = (inc.status || "").toLowerCase();
      if (activeTab === "investigating" && !status.includes("investigat")) return false;
      if (activeTab === "active" && !status.includes("drift") && !status.includes("active")) return false;
      if (activeTab === "resolved" && !status.includes("resolved") && !status.includes("closed")) return false;

      // 2. Search Query
      const candidateName = inc.topCandidate || inc.topVessel?.name || "";
      const id = inc.id || "";
      const region = inc.region || "";
      const satellite = inc.satellite || "";
      const query = searchQuery.toLowerCase();

      const matchesSearch = !query || 
        id.toLowerCase().includes(query) ||
        region.toLowerCase().includes(query) ||
        candidateName.toLowerCase().includes(query) ||
        satellite.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // 3. Risk Filter
      const risk = (inc.risk || inc.riskLevel || "").toLowerCase();
      if (riskFilter !== "all" && risk !== riskFilter.toLowerCase()) return false;

      // 4. Region Filter
      if (regionFilter !== "all") {
        const reg = (inc.regionShort || inc.region || "").toLowerCase();
        if (!reg.includes(regionFilter.toLowerCase())) return false;
      }

      return true;
    });
  }, [incidents, activeTab, searchQuery, riskFilter, regionFilter]);

  // Sorting Engine
  const sortedIncidents = useMemo(() => {
    const list = [...filteredIncidents];
    if (!sortConfig.key) return list;

    list.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // Normalized field access
      if (sortConfig.key === 'areaKm2') {
        aVal = a.areaKm2 || a.spillAreaKm2 || 0;
        bVal = b.areaKm2 || b.spillAreaKm2 || 0;
      } else if (sortConfig.key === 'confidence') {
        aVal = a.confidence || a.detectionConfidence || 0;
        bVal = b.confidence || b.detectionConfidence || 0;
      } else if (sortConfig.key === 'vessels') {
        aVal = a.vesselsCount ?? a.candidateCount ?? 0;
        bVal = b.vesselsCount ?? b.candidateCount ?? 0;
      } else if (sortConfig.key === 'risk') {
        const rank = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
        aVal = rank[(a.risk || a.riskLevel || '').toUpperCase()] || 0;
        bVal = rank[(b.risk || b.riskLevel || '').toUpperCase()] || 0;
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [filteredIncidents, sortConfig]);

  // Pagination Calculations
  const totalItems = sortedIncidents.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedIncidents = sortedIncidents.slice(startIndex, endIndex);

  // Sorting handler
  const handleSort = (key) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'desc' };
    });
  };

  // Selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(paginatedIncidents.map(i => i.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (id, e) => {
    e.stopPropagation();
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Batch Status Update
  const handleBatchStatusUpdate = (newStatus) => {
    if (selectedIds.size === 0) return;
    setIncidents(prev => prev.map(inc => {
      if (selectedIds.has(inc.id)) {
        return { ...inc, status: newStatus };
      }
      return inc;
    }));
    setSelectedIds(new Set());
  };

  // Batch Delete
  const handleBatchDelete = () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Delete ${selectedIds.size} selected incident(s) from registry?`)) return;
    setIncidents(prev => prev.filter(inc => !selectedIds.has(inc.id)));
    setSelectedIds(new Set());
  };

  // Export Registry to CSV
  const handleExportCSV = () => {
    const listToExport = selectedIds.size > 0 
      ? incidents.filter(i => selectedIds.has(i.id))
      : sortedIncidents;

    const headers = ["Incident ID", "Timestamp (UTC)", "Region", "Coordinates", "Area (km2)", "Perimeter (km)", "AI Confidence (%)", "Vessels Tracked", "Risk Level", "Status", "Satellite Source", "Lead Candidate"];
    
    const rows = listToExport.map(i => [
      `"${i.id}"`,
      `"${i.time || i.detectionTimeUTC || ''}"`,
      `"${i.region || i.regionShort || ''}"`,
      `"${i.location || (i.coordinates ? `${i.coordinates.lat}, ${i.coordinates.lng}` : '')}"`,
      i.areaKm2 || i.spillAreaKm2 || 0,
      i.perimeterKm || i.spillPerimeterKm || 0,
      i.confidence || i.detectionConfidence || 0,
      i.vesselsCount ?? i.candidateCount ?? 0,
      `"${i.risk || i.riskLevel || 'HIGH'}"`,
      `"${i.status || 'Investigating'}"`,
      `"${i.satellite || 'Sentinel-1 SAR'}"`,
      `"${i.topCandidate || i.topVessel?.name || 'Unknown'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `oceanforensics_incidents_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Create New Manual Case
  const handleCreateCase = async (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const newId = `OF-2026-${Math.floor(Math.random() * 8999 + 1000)}`;
    const newIncident = {
      id: newId,
      internalId: `INC-${Math.floor(Math.random() * 899 + 100)}`,
      time: new Date().toUTCString().split(' ').slice(1, 5).join(' ') + ' UTC',
      location: formData.coordinates,
      region: `${formData.region} (Maritime EEZ)`,
      regionShort: formData.region,
      flagEmoji: formData.region.includes("Mannar") ? "🇱🇰" : "🇮🇳",
      areaKm2: parseFloat(formData.spillAreaKm2) || 12.4,
      perimeterKm: parseFloat(formData.perimeterKm) || 18.2,
      confidence: parseFloat(formData.confidence) || 96.5,
      vesselsCount: parseInt(formData.vesselsCount) || 4,
      risk: formData.riskLevel,
      riskColor: formData.riskLevel === 'CRITICAL' ? 'text-status-danger bg-red-50 border-red-200' : formData.riskLevel === 'HIGH' ? 'text-status-warning bg-amber-50 border-amber-200' : 'text-status-info bg-blue-50 border-blue-200',
      status: formData.status,
      satellite: formData.satellite,
      topCandidate: formData.topCandidate
    };

    try {
      await api.createIncident(newIncident);
    } catch (err) {
      // Local fallback handled
    }

    setIncidents(prev => [newIncident, ...prev]);
    selectIncident(newId);
    setIsCreating(false);
    setFormData({
      title: "",
      region: "Arabian Sea",
      coordinates: "14.82°N, 68.21°E",
      spillAreaKm2: "12.4",
      perimeterKm: "18.2",
      riskLevel: "CRITICAL",
      confidence: "96.5",
      status: "Investigating",
      satellite: "Sentinel-1 SAR",
      topCandidate: "M/V Unknown Vessel",
      vesselsCount: 6
    });
  };

  // Reset Filters
  const handleResetFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
    setRiskFilter("all");
    setRegionFilter("all");
  };

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-ocean-navy tracking-tight">
              Marine Incidents & Investigation Registry
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-ocean-light text-ocean border border-ocean/20 text-[10px] font-mono font-bold">
              {incidents.length} TOTAL DOSSIERS
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Comprehensive forensic database of classified hydrocarbon discharges, satellite SAR detections, and candidate vessel attributions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg border border-border-marine bg-white hover:bg-ocean-sky text-ocean-navy text-xs font-semibold flex items-center gap-1.5 shadow-marine-sm transition-colors"
            title="Download registry data as CSV"
          >
            <Download className="w-3.5 h-3.5 text-ocean" />
            <span>{selectedIds.size > 0 ? `Export (${selectedIds.size})` : 'Export Registry'}</span>
          </button>

          <button 
            onClick={() => setIsCreating(true)}
            className="px-3.5 py-1.5 rounded-lg bg-ocean hover:bg-ocean-deep text-white text-xs font-bold flex items-center gap-1.5 shadow-marine-sm transition-all hover:scale-[1.02]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Manual Case</span>
          </button>
        </div>
      </div>

      {/* 4 Interactive Summary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div 
          onClick={() => { setActiveTab("investigating"); setRiskFilter("all"); }}
          className={`p-3.5 bg-white border rounded-xl shadow-marine-sm cursor-pointer transition-all hover:border-ocean ${
            activeTab === "investigating" ? 'border-ocean ring-2 ring-ocean/20 bg-ocean-light/20' : 'border-border-marine'
          }`}
        >
          <span className="text-[10px] font-bold text-text-muted font-mono uppercase">Active Investigations</span>
          <div className="text-2xl font-extrabold font-mono text-ocean-deep mt-1">
            {metrics.investigating} Cases
          </div>
          <span className="text-[10px] text-ocean font-medium mt-1 block flex items-center gap-1">
            <Activity className="w-3 h-3" /> Full trajectory modeling
          </span>
        </div>

        <div 
          onClick={() => { setRiskFilter("critical"); setActiveTab("all"); }}
          className={`p-3.5 bg-white border rounded-xl shadow-marine-sm cursor-pointer transition-all hover:border-red-400 ${
            riskFilter === "critical" ? 'border-red-500 ring-2 ring-red-200 bg-red-50/20' : 'border-border-marine'
          }`}
        >
          <span className="text-[10px] font-bold text-text-muted font-mono uppercase">High Priority Threats</span>
          <div className="text-2xl font-extrabold font-mono text-status-danger mt-1">
            {metrics.critical} Critical
          </div>
          <span className="text-[10px] text-status-danger font-medium mt-1 block flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Requires response booms
          </span>
        </div>

        <div 
          onClick={() => { setActiveTab("active"); setRiskFilter("all"); }}
          className={`p-3.5 bg-white border rounded-xl shadow-marine-sm cursor-pointer transition-all hover:border-amber-400 ${
            activeTab === "active" ? 'border-amber-500 ring-2 ring-amber-200 bg-amber-50/20' : 'border-border-marine'
          }`}
        >
          <span className="text-[10px] font-bold text-text-muted font-mono uppercase">Active Drift Dispersion</span>
          <div className="text-2xl font-extrabold font-mono text-status-warning mt-1">
            {metrics.activeDrift} Active
          </div>
          <span className="text-[10px] text-amber-700 font-medium mt-1 block flex items-center gap-1">
            <Waves className="w-3 h-3" /> Real-time hydrodynamics
          </span>
        </div>

        <div 
          onClick={() => { setActiveTab("resolved"); setRiskFilter("all"); }}
          className={`p-3.5 bg-white border rounded-xl shadow-marine-sm cursor-pointer transition-all hover:border-emerald-400 ${
            activeTab === "resolved" ? 'border-emerald-500 ring-2 ring-emerald-200 bg-emerald-50/20' : 'border-border-marine'
          }`}
        >
          <span className="text-[10px] font-bold text-text-muted font-mono uppercase">Resolved Dossiers</span>
          <div className="text-2xl font-extrabold font-mono text-status-success mt-1">
            {metrics.resolved} Closed
          </div>
          <span className="text-[10px] text-status-success font-medium mt-1 block flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Forensic reports archived
          </span>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white border border-border-marine rounded-2xl p-3 shadow-marine-sm space-y-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-2 border-b border-border-marine pb-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === tab.id 
                  ? 'bg-ocean text-white font-bold shadow-sm' 
                  : 'text-text-secondary hover:text-ocean-deep hover:bg-ocean-sky'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-ocean-sky text-ocean-deep'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Incident ID, Region, Candidate Vessel, Satellite..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-border-marine bg-ocean-light/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-ocean text-text-primary placeholder:text-text-muted font-mono"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-ocean-navy"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs flex-wrap">
            {/* Risk Filter */}
            <select 
              value={riskFilter} 
              onChange={(e) => setRiskFilter(e.target.value)}
              className="border border-border-marine bg-white rounded-lg px-2.5 py-1.5 text-text-secondary font-medium focus:outline-none focus:border-ocean text-xs"
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">Critical Only</option>
              <option value="high">High Only</option>
              <option value="medium">Medium Only</option>
              <option value="low">Low Only</option>
            </select>

            {/* Region Filter */}
            <select 
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="border border-border-marine bg-white rounded-lg px-2.5 py-1.5 text-text-secondary font-medium focus:outline-none focus:border-ocean text-xs"
            >
              <option value="all">All Regions ({availableRegions.length})</option>
              {availableRegions.map(reg => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>

            {/* Clear Filters Button */}
            {(activeTab !== 'all' || searchQuery || riskFilter !== 'all' || regionFilter !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="px-2.5 py-1.5 rounded-lg border border-border-marine bg-slate-50 hover:bg-slate-100 text-text-secondary font-bold text-xs flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Batch Actions Bar (when items selected) */}
      {selectedIds.size > 0 && (
        <div className="bg-ocean-deep text-white px-4 py-2 rounded-xl shadow-marine-lg flex items-center justify-between text-xs font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{selectedIds.size} incident(s) selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBatchStatusUpdate("Resolved")}
              className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 font-bold transition-colors"
            >
              Mark as Resolved
            </button>
            <button
              onClick={() => handleBatchStatusUpdate("Investigating")}
              className="px-2.5 py-1 rounded-md bg-ocean hover:bg-ocean-sky/30 font-bold transition-colors"
            >
              Mark Investigating
            </button>
            <button
              onClick={handleExportCSV}
              className="px-2.5 py-1 rounded-md bg-white/20 hover:bg-white/30 font-bold transition-colors flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>Export Selected</span>
            </button>
            <button
              onClick={handleBatchDelete}
              className="px-2.5 py-1 rounded-md bg-red-600 hover:bg-red-500 font-bold transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Delete</span>
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-white/70 hover:text-white ml-2 text-xs"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Incident Table */}
      <div className="bg-white border border-border-marine rounded-2xl shadow-marine-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ocean-light border-b border-border-marine text-[10px] font-mono text-text-muted uppercase">
              <tr>
                <th className="px-4 py-3 w-8">
                  <input
                    type="checkbox"
                    checked={paginatedIncidents.length > 0 && paginatedIncidents.every(i => selectedIds.has(i.id))}
                    onChange={handleSelectAll}
                    className="rounded border-border-marine text-ocean focus:ring-ocean"
                  />
                </th>
                <th 
                  onClick={() => handleSort('id')} 
                  className="px-4 py-3 cursor-pointer hover:text-ocean-deep select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>INCIDENT ID</span>
                    {sortConfig.key === 'id' ? (
                      sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 text-ocean" /> : <ArrowDown className="w-3 h-3 text-ocean" />
                    ) : <ArrowUpDown className="w-3 h-3 opacity-40" />}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('time')} 
                  className="px-4 py-3 cursor-pointer hover:text-ocean-deep select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>DETECTION TIME</span>
                    {sortConfig.key === 'time' ? (
                      sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 text-ocean" /> : <ArrowDown className="w-3 h-3 text-ocean" />
                    ) : <ArrowUpDown className="w-3 h-3 opacity-40" />}
                  </div>
                </th>
                <th className="px-4 py-3">COORDINATES & REGION</th>
                <th 
                  onClick={() => handleSort('areaKm2')} 
                  className="px-4 py-3 cursor-pointer hover:text-ocean-deep select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>AREA (KM²)</span>
                    {sortConfig.key === 'areaKm2' ? (
                      sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 text-ocean" /> : <ArrowDown className="w-3 h-3 text-ocean" />
                    ) : <ArrowUpDown className="w-3 h-3 opacity-40" />}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('confidence')} 
                  className="px-4 py-3 cursor-pointer hover:text-ocean-deep select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>CONFIDENCE</span>
                    {sortConfig.key === 'confidence' ? (
                      sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 text-ocean" /> : <ArrowDown className="w-3 h-3 text-ocean" />
                    ) : <ArrowUpDown className="w-3 h-3 opacity-40" />}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('vessels')} 
                  className="px-4 py-3 cursor-pointer hover:text-ocean-deep select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>VESSELS</span>
                    {sortConfig.key === 'vessels' ? (
                      sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 text-ocean" /> : <ArrowDown className="w-3 h-3 text-ocean" />
                    ) : <ArrowUpDown className="w-3 h-3 opacity-40" />}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('risk')} 
                  className="px-4 py-3 cursor-pointer hover:text-ocean-deep select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>RISK LEVEL</span>
                    {sortConfig.key === 'risk' ? (
                      sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 text-ocean" /> : <ArrowDown className="w-3 h-3 text-ocean" />
                    ) : <ArrowUpDown className="w-3 h-3 opacity-40" />}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('status')} 
                  className="px-4 py-3 cursor-pointer hover:text-ocean-deep select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>STATUS</span>
                    {sortConfig.key === 'status' ? (
                      sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 text-ocean" /> : <ArrowDown className="w-3 h-3 text-ocean" />
                    ) : <ArrowUpDown className="w-3 h-3 opacity-40" />}
                  </div>
                </th>
                <th className="px-4 py-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-marine/60">
              {paginatedIncidents.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-4 py-8 text-center text-text-muted font-mono">
                    <AlertTriangle className="w-6 h-6 text-amber-500 mx-auto mb-2 opacity-60" />
                    <div>No marine incidents found matching the selected filter criteria.</div>
                    <button 
                      onClick={handleResetFilters}
                      className="mt-2 text-ocean font-bold underline hover:text-ocean-deep text-xs"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedIncidents.map((inc) => {
                  const isSelected = selectedIds.has(inc.id);
                  const isCurrentActive = inc.id === activeIncidentId;

                  return (
                    <tr 
                      key={inc.id}
                      onClick={() => selectIncident(inc.id)}
                      className={`hover:bg-ocean-sky/40 transition-colors cursor-pointer ${
                        isCurrentActive ? 'bg-ocean-sky/40 font-semibold border-l-4 border-l-ocean' : ''
                      } ${isSelected ? 'bg-ocean-sky/30' : ''}`}
                    >
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(inc.id, e)}
                          className="rounded border-border-marine text-ocean focus:ring-ocean"
                        />
                      </td>

                      <td className="px-4 py-3 font-mono font-bold text-ocean-deep">
                        <div className="flex items-center gap-1.5">
                          {isCurrentActive && (
                            <span className="w-2 h-2 rounded-full bg-ocean animate-ping" title="Active Incident in Session"></span>
                          )}
                          <span>{inc.id}</span>
                        </div>
                        {inc.internalId && (
                          <div className="text-[9px] font-normal text-text-muted font-mono">{inc.internalId}</div>
                        )}
                      </td>

                      <td className="px-4 py-3 font-mono text-text-secondary whitespace-nowrap">
                        {inc.time || inc.detectionTimeUTC}
                      </td>

                      <td className="px-4 py-3">
                        <div className="font-mono text-[11px] text-ocean-navy flex items-center gap-1">
                          <span>{inc.flagEmoji || "🇮🇳"}</span>
                          <span>{inc.location || (inc.coordinates ? `${inc.coordinates.lat?.toFixed(2)}°N, ${inc.coordinates.lng?.toFixed(2)}°E` : "14.82°N, 68.21°E")}</span>
                        </div>
                        <div className="text-[10px] text-text-muted truncate max-w-[200px]">{inc.region}</div>
                      </td>

                      <td className="px-4 py-3 font-mono text-ocean-deep font-bold">
                        {(inc.areaKm2 || inc.spillAreaKm2 || 0)} km²
                      </td>

                      <td className="px-4 py-3 font-mono text-status-success font-bold">
                        {inc.confidence || inc.detectionConfidence || 95}%
                      </td>

                      <td className="px-4 py-3 font-mono text-text-secondary">
                        <div>{inc.vesselsCount ?? inc.candidateCount ?? 4} tracked</div>
                        {inc.topCandidate && (
                          <div className="text-[9px] text-ocean font-sans truncate max-w-[130px]" title={inc.topCandidate}>
                            Top: {inc.topCandidate}
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                          (inc.risk || inc.riskLevel) === 'CRITICAL' 
                            ? 'text-status-danger bg-red-50 border-red-200' 
                            : (inc.risk || inc.riskLevel) === 'HIGH' 
                            ? 'text-status-warning bg-amber-50 border-amber-200' 
                            : 'text-status-info bg-blue-50 border-blue-200'
                        }`}>
                          {inc.risk || inc.riskLevel || 'HIGH'}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                          (inc.status || "").toLowerCase().includes("resolved")
                            ? 'bg-emerald-50 text-status-success border border-emerald-200'
                            : (inc.status || "").toLowerCase().includes("investigat")
                            ? 'bg-blue-50 text-ocean-deep border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {inc.status || "Investigating"}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setInspectingIncident(inc)}
                            className="p-1.5 rounded-lg border border-border-marine hover:bg-ocean-sky text-ocean-navy transition-colors"
                            title="Inspect Detailed Dossier"
                          >
                            <Eye className="w-3.5 h-3.5 text-ocean" />
                          </button>

                          <button
                            onClick={() => {
                              selectIncident(inc.id);
                              onNavigate("live-monitor");
                            }}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-ocean-light hover:bg-ocean-sky text-ocean border border-ocean/30 transition-all"
                            title="Monitor in Live GIS Map"
                          >
                            Live Map
                          </button>

                          <button
                            onClick={() => {
                              selectIncident(inc.id);
                              onNavigate("workspace");
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-xs ${
                              isCurrentActive
                                ? 'bg-ocean text-white hover:bg-ocean-deep'
                                : 'border border-border-marine hover:bg-ocean-sky text-ocean-navy'
                            }`}
                          >
                            Workspace →
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Working Pagination */}
        <div className="p-3 border-t border-border-marine bg-ocean-light/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-muted font-mono">
          <div>
            Showing <span className="font-bold text-ocean-navy">{totalItems > 0 ? startIndex + 1 : 0}</span> to <span className="font-bold text-ocean-navy">{endIndex}</span> of <span className="font-bold text-ocean-navy">{totalItems}</span> incidents
          </div>

          <div className="flex items-center gap-1.5">
            {/* Page Size Selector */}
            <div className="flex items-center gap-1 mr-2 text-[11px]">
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-border-marine rounded px-1.5 py-0.5 text-ocean-navy"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
              </select>
            </div>

            {/* Pagination Buttons */}
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 border border-border-marine rounded-lg bg-white hover:bg-ocean-sky disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ‹ Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  currentPage === pageNum
                    ? 'bg-ocean text-white shadow-xs'
                    : 'bg-white border border-border-marine text-ocean-navy hover:bg-ocean-sky'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 border border-border-marine rounded-lg bg-white hover:bg-ocean-sky disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next ›
            </button>
          </div>
        </div>
      </div>

      {/* New Manual Incident Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateCase} className="bg-white rounded-2xl p-6 max-w-lg w-full border border-border-marine shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-2.5 border-b border-border-marine">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-ocean" />
                <h3 className="font-bold text-ocean-navy text-sm">Register New Hydrocarbon Incident</h3>
              </div>
              <button type="button" onClick={() => setIsCreating(false)} className="text-text-muted hover:text-text-primary p-1 rounded-md">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="font-semibold text-text-secondary block mb-1">Incident Title / Descriptor *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Sikka Anchorage Heavy Bunker Discharge"
                  className="w-full px-3 py-2 border border-border-marine rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean/40"
                />
              </div>

              <div>
                <label className="font-semibold text-text-secondary block mb-1">Maritime Region</label>
                <select
                  value={formData.region}
                  onChange={e => {
                    const reg = e.target.value;
                    let coords = "14.82°N, 68.21°E";
                    if (reg === "Bay of Bengal") coords = "17.45°N, 83.85°E";
                    else if (reg === "Gulf of Kutch") coords = "22.52°N, 69.18°E";
                    else if (reg === "Gulf of Mannar") coords = "09.18°N, 79.32°E";
                    else if (reg === "Strait of Malacca") coords = "06.85°N, 93.95°E";
                    else if (reg === "Laccadive Sea") coords = "08.35°N, 73.15°E";
                    setFormData({ ...formData, region: reg, coordinates: coords });
                  }}
                  className="w-full px-3 py-2 border border-border-marine rounded-lg focus:outline-none"
                >
                  <option value="Arabian Sea">Arabian Sea</option>
                  <option value="Bay of Bengal">Bay of Bengal</option>
                  <option value="Gulf of Kutch">Gulf of Kutch</option>
                  <option value="Gulf of Mannar">Gulf of Mannar</option>
                  <option value="Strait of Malacca">Strait of Malacca</option>
                  <option value="Laccadive Sea">Laccadive Sea</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-text-secondary block mb-1">Coordinates (Lat, Lng)</label>
                <input
                  type="text"
                  required
                  value={formData.coordinates}
                  onChange={e => setFormData({ ...formData, coordinates: e.target.value })}
                  className="w-full px-3 py-2 border border-border-marine rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean/40 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-text-secondary block mb-1">Estimated Slick Area (km²)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={formData.spillAreaKm2}
                  onChange={e => setFormData({ ...formData, spillAreaKm2: e.target.value })}
                  className="w-full px-3 py-2 border border-border-marine rounded-lg focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-text-secondary block mb-1">Initial Risk Level</label>
                <select
                  value={formData.riskLevel}
                  onChange={e => setFormData({ ...formData, riskLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-border-marine rounded-lg focus:outline-none font-bold text-ocean-navy"
                >
                  <option value="CRITICAL">CRITICAL (Tier 3)</option>
                  <option value="HIGH">HIGH (Tier 2)</option>
                  <option value="MEDIUM">MEDIUM (Tier 1)</option>
                  <option value="LOW">LOW (Minor Sheen)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-text-secondary block mb-1">Satellite Sensor</label>
                <select
                  value={formData.satellite}
                  onChange={e => setFormData({ ...formData, satellite: e.target.value })}
                  className="w-full px-3 py-2 border border-border-marine rounded-lg focus:outline-none"
                >
                  <option value="Sentinel-1 SAR">Sentinel-1 SAR (Dual-Pol VV/VH)</option>
                  <option value="Sentinel-2 MSI">Sentinel-2 MSI (Multispectral)</option>
                  <option value="Landsat-8">Landsat-8 OLI/TIRS</option>
                  <option value="MODIS Aqua/Terra">MODIS Thermal Infrared</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-text-secondary block mb-1">Lead Suspect Vessel (Optional)</label>
                <input
                  type="text"
                  value={formData.topCandidate}
                  onChange={e => setFormData({ ...formData, topCandidate: e.target.value })}
                  placeholder="e.g. M/V Ocean Star"
                  className="w-full px-3 py-2 border border-border-marine rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-marine">
              <button 
                type="button" 
                onClick={() => setIsCreating(false)} 
                className="px-3.5 py-1.5 rounded-lg border border-border-marine text-xs text-text-secondary hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-1.5 rounded-lg bg-ocean text-white font-bold text-xs hover:bg-ocean-deep shadow-sm transition-all"
              >
                Register & Initialize Case
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Incident Quick Detail Inspection Slide-Over Drawer */}
      {inspectingIncident && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex justify-end animate-fade-in">
          <div className="bg-white w-full max-w-md h-full shadow-2xl p-5 overflow-y-auto flex flex-col justify-between border-l border-border-marine">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border-marine">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-ocean-navy">{inspectingIncident.id}</span>
                    <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold border ${
                      (inspectingIncident.risk || inspectingIncident.riskLevel) === 'CRITICAL'
                        ? 'text-status-danger bg-red-50 border-red-200'
                        : 'text-status-warning bg-amber-50 border-amber-200'
                    }`}>
                      {inspectingIncident.risk || inspectingIncident.riskLevel}
                    </span>
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">{inspectingIncident.region}</div>
                </div>

                <button 
                  onClick={() => setInspectingIncident(null)}
                  className="p-1 rounded-lg hover:bg-ocean-sky text-text-muted hover:text-ocean-navy"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Switcher */}
              <div className="bg-ocean-light/50 p-2.5 rounded-xl border border-border-marine flex items-center justify-between text-xs">
                <span className="font-bold text-ocean-navy">Case Lifecycle:</span>
                <select
                  value={inspectingIncident.status || "Investigating"}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    setIncidents(prev => prev.map(i => i.id === inspectingIncident.id ? { ...i, status: newStatus } : i));
                    setInspectingIncident(prev => ({ ...prev, status: newStatus }));
                  }}
                  className="bg-white border border-border-marine rounded-lg px-2 py-1 text-xs font-bold text-ocean-deep focus:outline-none"
                >
                  <option value="Investigating">Investigating</option>
                  <option value="Active Drift">Active Drift</option>
                  <option value="Monitoring">Monitoring</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              {/* Forensic Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[9px] text-text-muted block">SPILL AREA</span>
                  <span className="font-bold text-ocean-deep text-sm">{inspectingIncident.areaKm2 || inspectingIncident.spillAreaKm2} km²</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[9px] text-text-muted block">AI CONFIDENCE</span>
                  <span className="font-bold text-status-success text-sm">{inspectingIncident.confidence || inspectingIncident.detectionConfidence}%</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[9px] text-text-muted block">DETECTION TIME</span>
                  <span className="font-bold text-ocean-navy text-xs">{inspectingIncident.time || inspectingIncident.detectionTimeUTC}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[9px] text-text-muted block">COORDINATES</span>
                  <span className="font-bold text-ocean-navy text-xs">{inspectingIncident.location || "14.82°N, 68.21°E"}</span>
                </div>
              </div>

              {/* Satellite & Sensor Specs */}
              <div className="p-3 bg-ocean-light/30 border border-border-marine rounded-xl space-y-1 text-xs">
                <div className="font-bold text-ocean-navy flex items-center gap-1.5 text-xs mb-1">
                  <Satellite className="w-3.5 h-3.5 text-ocean" />
                  <span>EARTH OBSERVATION TELEMETRY</span>
                </div>
                <div className="flex justify-between text-text-secondary text-[11px]">
                  <span>Primary Sensor:</span>
                  <span className="font-mono font-bold text-ocean-navy">{inspectingIncident.satellite || "Sentinel-1 SAR C-Band"}</span>
                </div>
                <div className="flex justify-between text-text-secondary text-[11px]">
                  <span>Polarization:</span>
                  <span className="font-mono">Dual-Pol (VV + VH)</span>
                </div>
                <div className="flex justify-between text-text-secondary text-[11px]">
                  <span>Spatial Resolution:</span>
                  <span className="font-mono">10m / px (High Resolution)</span>
                </div>
              </div>

              {/* Suspect Attribution Summary */}
              <div className="p-3 bg-red-50/50 border border-red-200 rounded-xl space-y-1.5 text-xs">
                <div className="font-bold text-status-danger flex items-center gap-1.5 text-xs">
                  <Ship className="w-3.5 h-3.5" />
                  <span>LEAD SUSPECT ATTRIBUTION</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-secondary">Target Vessel:</span>
                  <span className="font-bold text-ocean-navy">{inspectingIncident.topCandidate || inspectingIncident.topVessel?.name || "MV Ocean Star"}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-secondary">Candidates in Corridor:</span>
                  <span className="font-mono font-bold text-ocean-deep">{inspectingIncident.vesselsCount || inspectingIncident.candidateCount || 4} vessels</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-border-marine space-y-2">
              <button
                onClick={() => {
                  selectIncident(inspectingIncident.id);
                  onNavigate("live-monitor");
                }}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-ocean to-ocean-deep text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.01] transition-all"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Open in Live GIS Surveillance Monitor</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    selectIncident(inspectingIncident.id);
                    onNavigate("workspace");
                  }}
                  className="py-1.5 px-2 rounded-lg border border-border-marine bg-white hover:bg-ocean-sky text-ocean-navy font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Full Workspace</span>
                </button>

                <button
                  onClick={() => {
                    selectIncident(inspectingIncident.id);
                    onNavigate("trajectory");
                  }}
                  className="py-1.5 px-2 rounded-lg border border-border-marine bg-white hover:bg-ocean-sky text-ocean-navy font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <Compass className="w-3 h-3" />
                  <span>AIS Trajectory</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
