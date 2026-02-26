import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Home, Users, Loader2, ArrowLeft, LayoutDashboard, Cog, Calendar, CalendarDays, Settings, TrendingUp, Rocket, Palette, AlertTriangle, DollarSign, Banknote, Receipt } from "lucide-react";
import { Link } from "wouter";
import AppHeader from "@/components/AppHeader";

export default function Dashboard() {
  const { user, loading, isAuthenticated } = useAuth();

  // Queries
  const { data: teamHealth } = trpc.health.getTeamOverview.useQuery();
  const { data: bdPipeline } = trpc.pipelines.getCards.useQuery({ pipelineType: "bd" });
  const { data: venturesPipeline } = trpc.pipelines.getCards.useQuery({ pipelineType: "ventures" });
  const { data: studioPipeline } = trpc.pipelines.getCards.useQuery({ pipelineType: "studio" });
  const { data: clientsPipeline } = trpc.pipelines.getCards.useQuery({ pipelineType: "clients" });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md p-6">
          <h2 className="text-2xl font-bold mb-4">Growth Farm Dashboard</h2>
          <Button asChild className="w-full">
            <a href={getLoginUrl()}>Sign In</a>
          </Button>
        </Card>
      </div>
    );
  }

  // Calculate BD Pipeline metrics by stage
  const bdStages = bdPipeline?.stages || [];
  const bdCards = bdPipeline?.cards || [];
  const getStageMetrics = (stageName: string) => {
    const stage = bdStages.find(s => s.name === stageName);
    const cards = bdCards.filter(c => c.stageId === stage?.id);
    const value = cards.reduce((sum, card) => sum + parseFloat(card.value || "0"), 0);
    return { count: cards.length, value };
  };

  const leadMetrics = getStageMetrics("Lead");
  const qualifiedMetrics = getStageMetrics("Qualified");
  const proposalMetrics = getStageMetrics("Proposal");
  const negotiationMetrics = getStageMetrics("Negotiation");
  const wonMetrics = getStageMetrics("Won");
  const lostMetrics = getStageMetrics("Lost");

  // Finance metrics (mock data - would come from database)
  const ytdRevenue = 1800000; // R1.8M
  const revenueTarget = 24000000; // R24M
  const cashReserves = 410000; // R410k
  const cashTarget = 1000000; // R1M
  const taxLiability = 320000; // R320k

  // Calculate where we should be (2/12 months = ~16.7% of target)
  const monthProgress = new Date().getMonth() + 1; // Current month (1-12)
  const shouldBeRevenue = (revenueTarget / 12) * monthProgress;

  // Ventures metrics
  const venturesCards = venturesPipeline?.cards || [];
  const totalBurnRate = venturesCards.reduce((sum, v) => {
    try {
      const meta = v.metadata ? JSON.parse(v.metadata) : {};
      const burn = parseFloat(meta.burnRate || "0");
      return sum + burn;
    } catch { return sum; }
  }, 0);
  const revenueGenerating = venturesCards.filter(v => {
    try {
      const meta = v.metadata ? JSON.parse(v.metadata) : {};
      return meta.daysToRevenue === "0" || meta.status === "Revenue generating";
    } catch { return false; }
  }).length;

  // Studio metrics
  const studioCards = studioPipeline?.cards || [];
  const onTrackProjects = studioCards.filter(p => {
    try {
      const meta = p.metadata ? JSON.parse(p.metadata) : {};
      return meta.status === "On Track";
    } catch { return false; }
  }).length;
  const atRiskProjects = studioCards.filter(p => {
    try {
      const meta = p.metadata ? JSON.parse(p.metadata) : {};
      return meta.status === "At Risk";
    } catch { return false; }
  }).length;

  // Client relationship types
  const clientStages = clientsPipeline?.stages || [];
  const clientCards = clientsPipeline?.cards || [];
  const getClientsByType = (typeName: string) => {
    const stage = clientStages.find(s => s.name === typeName);
    const cards = clientCards.filter(c => c.stageId === stage?.id);
    const value = cards.reduce((sum, card) => sum + parseFloat(card.value || "0"), 0);
    return { count: cards.length, value };
  };

  const activeClients = getClientsByType("Active");
  const prospectClients = getClientsByType("Prospect");
  const atRiskClients = getClientsByType("At Risk");
  const churnedClients = getClientsByType("Churned");

  // Alerts
  const alerts = [];
  if (atRiskClients.count > 0) {
    alerts.push({ type: "danger", message: `${atRiskClients.count} client(s) at risk - R${(atRiskClients.value / 1000).toFixed(0)}K at stake` });
  }
  if ((teamHealth?.overallScore || 0) < 60) {
    alerts.push({ type: "warning", message: "Team health below 60% - schedule check-ins" });
  }
  if (ytdRevenue < shouldBeRevenue * 0.75) {
    alerts.push({ type: "warning", message: `Revenue behind target - should be R${(shouldBeRevenue / 1000000).toFixed(1)}M` });
  }
  if (atRiskProjects > 0) {
    alerts.push({ type: "warning", message: `${atRiskProjects} studio project(s) at risk` });
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header with Navigation */}
      <AppHeader />

      {/* Main Content - Compact Single Screen */}
      <main className="container py-3 space-y-3">
        {/* Row 1: Team Health + Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Team Health Circle */}
          <Card className="bg-[#d4c4a8]/30 border-0">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="relative">
                <svg className="w-14 h-14 -rotate-90">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#e5ddd0" strokeWidth="4" />
                  <circle 
                    cx="28" cy="28" r="24" fill="none" 
                    stroke="#8b7355" strokeWidth="4"
                    strokeDasharray={`${(teamHealth?.overallScore || 0) * 1.5} 150`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                  {teamHealth?.overallScore || 0}%
                </span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Team Health</p>
                <p className="text-sm font-medium">{teamHealth?.team.filter(m => (m.currentHealthScore || 0) > 0).length || 0} of {teamHealth?.team.length || 0} checked in</p>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="md:col-span-2 border-0 bg-white/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-medium">Alerts</span>
              </div>
              {alerts.length > 0 ? (
                <div className="space-y-1">
                  {alerts.slice(0, 3).map((alert, i) => (
                    <div key={i} className={`text-xs px-2 py-1 rounded ${
                      alert.type === "danger" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {alert.message}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-green-600">All systems healthy ✓</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Row 2: Finance Bars */}
        <Card className="border-0 bg-white/50">
          <CardContent className="p-3 space-y-3">
            {/* YTD Revenue Bar */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-[#8b7355]" />
                  <span className="text-xs font-medium">YTD Revenue</span>
                </div>
                <span className="text-xs text-muted-foreground">Should be R{(shouldBeRevenue / 1000000).toFixed(1)}M</span>
              </div>
              <div className="relative h-6 bg-gray-200 rounded overflow-hidden">
                <div 
                  className="absolute h-full bg-[#8b7355] rounded-r"
                  style={{ width: `${(ytdRevenue / revenueTarget) * 100}%` }}
                />
                <div 
                  className="absolute h-full w-0.5 bg-gray-600"
                  style={{ left: `${(shouldBeRevenue / revenueTarget) * 100}%` }}
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium text-white">
                  R{(ytdRevenue / 1000000).toFixed(1)}M
                </span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600">
                  R{(revenueTarget / 1000000).toFixed(0)}M Annual
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                <span>R0</span>
                <span>R24M</span>
              </div>
            </div>

            {/* Cash Reserves Bar */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1">
                  <Banknote className="h-3 w-3 text-blue-600" />
                  <span className="text-xs font-medium">Cash Reserves</span>
                </div>
                <span className="text-xs text-muted-foreground">Target R1M (Dec)</span>
              </div>
              <div className="relative h-6 bg-gray-200 rounded overflow-hidden">
                <div 
                  className="absolute h-full bg-blue-500 rounded-r"
                  style={{ width: `${(cashReserves / cashTarget) * 100}%` }}
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium text-white">
                  R{(cashReserves / 1000).toFixed(0)}k
                </span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600">
                  R1M target
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                <span>R0</span>
                <span>R1M</span>
              </div>
            </div>

            {/* Tax Liability Bar */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1">
                  <Receipt className="h-3 w-3 text-red-600" />
                  <span className="text-xs font-medium">Tax Liability</span>
                </div>
                <span className="text-xs text-muted-foreground">Target R0</span>
              </div>
              <div className="relative h-6 bg-gray-200 rounded overflow-hidden">
                <div 
                  className="absolute h-full bg-red-500 rounded-r"
                  style={{ width: `${(taxLiability / 500000) * 100}%` }}
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium text-white">
                  R{(taxLiability / 1000).toFixed(0)}k
                </span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600">
                  R0 target
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                <span>R0 (target)</span>
                <span>R500k</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Row 3: BD Pipeline - All stages in one row */}
        <Card className="border-0 bg-white/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-[#8b7355]" />
              <span className="text-xs font-medium">BD Pipeline</span>
              <span className="text-xs text-muted-foreground ml-auto">
                Total: R{((leadMetrics.value + qualifiedMetrics.value + proposalMetrics.value + negotiationMetrics.value) / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {[
                { name: "Lead", ...leadMetrics, color: "bg-blue-100 text-blue-800" },
                { name: "Qualified", ...qualifiedMetrics, color: "bg-cyan-100 text-cyan-800" },
                { name: "Proposal", ...proposalMetrics, color: "bg-purple-100 text-purple-800" },
                { name: "Negotiation", ...negotiationMetrics, color: "bg-amber-100 text-amber-800" },
                { name: "Won", ...wonMetrics, color: "bg-green-100 text-green-800" },
                { name: "Lost", ...lostMetrics, color: "bg-red-100 text-red-800" },
              ].map((stage) => (
                <div key={stage.name} className={`text-center p-2 rounded ${stage.color}`}>
                  <p className="text-[10px] font-medium truncate">{stage.name}</p>
                  <p className="text-lg font-bold">{stage.count}</p>
                  <p className="text-[10px]">R{(stage.value / 1000).toFixed(0)}K</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Row 4: Ventures & Studio */}
        <div className="grid grid-cols-2 gap-3">
          {/* Ventures */}
          <Card className="border-0 bg-white/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="h-4 w-4 text-orange-500" />
                <span className="text-xs font-medium">Ventures</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-center">
                <div className="p-1.5 bg-orange-50 rounded">
                  <p className="text-lg font-bold">{venturesCards.length}</p>
                  <p className="text-[10px] text-muted-foreground">Active</p>
                </div>
                <div className="p-1.5 bg-red-50 rounded">
                  <p className="text-lg font-bold">R{(totalBurnRate / 1000).toFixed(0)}K</p>
                  <p className="text-[10px] text-muted-foreground">Burn/mo</p>
                </div>
                <div className="p-1.5 bg-green-50 rounded">
                  <p className="text-lg font-bold">{revenueGenerating}</p>
                  <p className="text-[10px] text-muted-foreground">Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Studio */}
          <Card className="border-0 bg-white/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="h-4 w-4 text-pink-500" />
                <span className="text-xs font-medium">Studio</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-center">
                <div className="p-1.5 bg-pink-50 rounded">
                  <p className="text-lg font-bold">{studioCards.length}</p>
                  <p className="text-[10px] text-muted-foreground">Projects</p>
                </div>
                <div className="p-1.5 bg-green-50 rounded">
                  <p className="text-lg font-bold">{onTrackProjects}</p>
                  <p className="text-[10px] text-muted-foreground">On Track</p>
                </div>
                <div className="p-1.5 bg-amber-50 rounded">
                  <p className="text-lg font-bold">{atRiskProjects}</p>
                  <p className="text-[10px] text-muted-foreground">At Risk</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 5: Client Relationship Cards - Show ALL types even if 0 */}
        <Card className="border-0 bg-white/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-[#8b7355]" />
              <span className="text-xs font-medium">Client Relationships</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { name: "Active", ...activeClients, color: "bg-green-100 border-green-300" },
                { name: "Prospect", ...prospectClients, color: "bg-blue-100 border-blue-300" },
                { name: "At Risk", ...atRiskClients, color: "bg-red-100 border-red-300" },
                { name: "Churned", ...churnedClients, color: "bg-gray-100 border-gray-300" },
              ].map((type) => (
                <div key={type.name} className={`p-2 rounded border ${type.color}`}>
                  <p className="text-[10px] font-medium text-center">{type.name}</p>
                  <p className="text-xl font-bold text-center">{type.count}</p>
                  <p className="text-[10px] text-center text-muted-foreground">
                    R{(type.value / 1000).toFixed(0)}K
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>


    </div>
  );
}
