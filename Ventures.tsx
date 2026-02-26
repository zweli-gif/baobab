import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  Home as HomeIcon, 
  LayoutDashboard, 
  Cog, 
  Calendar, 
  CalendarDays, 
  Settings, 
  Loader2,
  Plus,
  ArrowLeft,
  Rocket,
  TrendingDown,
  Clock,
  GripVertical
} from "lucide-react";
import { Link, useLocation } from "wouter";

// Kanban stages for Ventures
const STAGES = [
  { id: "ideation", name: "Ideation", color: "bg-slate-100 border-slate-300" },
  { id: "validation", name: "Validation", color: "bg-blue-100 border-blue-300" },
  { id: "mvp", name: "MVP", color: "bg-purple-100 border-purple-300" },
  { id: "scale", name: "Scale", color: "bg-green-100 border-green-300" },
  { id: "exit", name: "Exit", color: "bg-amber-100 border-amber-300" },
];

// Mock ventures data
const initialVentures = [
  { id: 1, name: "FinTech App", stage: "mvp", burnRate: 85000, targetBurn: 100000, daysToRevenue: 45, currentStage: "Beta testing", owner: "Thabo M." },
  { id: 2, name: "AgriTech Platform", stage: "validation", burnRate: 45000, targetBurn: 50000, daysToRevenue: 120, currentStage: "Customer interviews", owner: "Naledi K." },
  { id: 3, name: "EdTech Solution", stage: "ideation", burnRate: 15000, targetBurn: 30000, daysToRevenue: 180, currentStage: "Market research", owner: "Mpumi D." },
  { id: 4, name: "HealthTech", stage: "scale", burnRate: 150000, targetBurn: 200000, daysToRevenue: 0, currentStage: "Revenue generating", owner: "Bongani S." },
  { id: 5, name: "LogiTech", stage: "ideation", burnRate: 10000, targetBurn: 25000, daysToRevenue: 200, currentStage: "Concept design", owner: "Zweli G." },
];

export default function Ventures() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [ventures, setVentures] = useState(initialVentures);
  const [draggedVenture, setDraggedVenture] = useState<number | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newVenture, setNewVenture] = useState({ name: "", stage: "ideation", burnRate: "", targetBurn: "", daysToRevenue: "", currentStage: "", owner: "" });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const handleDragStart = (ventureId: number) => {
    setDraggedVenture(ventureId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (stageId: string) => {
    if (draggedVenture) {
      setVentures(ventures.map(v => 
        v.id === draggedVenture ? { ...v, stage: stageId } : v
      ));
      toast.success("Venture moved to " + STAGES.find(s => s.id === stageId)?.name);
    }
    setDraggedVenture(null);
  };

  const addVenture = () => {
    if (!newVenture.name) {
      toast.error("Please enter venture name");
      return;
    }
    const venture = {
      id: Math.max(...ventures.map(v => v.id)) + 1,
      name: newVenture.name,
      stage: newVenture.stage,
      burnRate: parseInt(newVenture.burnRate) || 0,
      targetBurn: parseInt(newVenture.targetBurn) || 50000,
      daysToRevenue: parseInt(newVenture.daysToRevenue) || 180,
      currentStage: newVenture.currentStage || "Getting started",
      owner: newVenture.owner || "Unassigned",
    };
    setVentures([...ventures, venture]);
    setNewVenture({ name: "", stage: "ideation", burnRate: "", targetBurn: "", daysToRevenue: "", currentStage: "", owner: "" });
    setIsAddDialogOpen(false);
    toast.success("Venture added");
  };

  const getVenturesForStage = (stageId: string) => ventures.filter(v => v.stage === stageId);
  const getBurnRateStatus = (burn: number, target: number) => {
    const ratio = burn / target;
    if (ratio <= 0.7) return "text-green-600";
    if (ratio <= 0.9) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/engine")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <img src="/GFlogov1.jpg" alt="Growth Farm" className="h-8 w-auto" />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Venture
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Venture</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium">Venture Name</label>
                  <Input 
                    value={newVenture.name} 
                    onChange={(e) => setNewVenture({...newVenture, name: e.target.value})}
                    placeholder="Venture name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Stage</label>
                  <Select value={newVenture.stage} onValueChange={(v) => setNewVenture({...newVenture, stage: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STAGES.map(stage => (
                        <SelectItem key={stage.id} value={stage.id}>{stage.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Burn Rate (R/mo)</label>
                    <Input 
                      type="number"
                      value={newVenture.burnRate} 
                      onChange={(e) => setNewVenture({...newVenture, burnRate: e.target.value})}
                      placeholder="Monthly burn"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Target Burn (R/mo)</label>
                    <Input 
                      type="number"
                      value={newVenture.targetBurn} 
                      onChange={(e) => setNewVenture({...newVenture, targetBurn: e.target.value})}
                      placeholder="Target burn"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Days to First Revenue</label>
                  <Input 
                    type="number"
                    value={newVenture.daysToRevenue} 
                    onChange={(e) => setNewVenture({...newVenture, daysToRevenue: e.target.value})}
                    placeholder="Days"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Owner</label>
                  <Input 
                    value={newVenture.owner} 
                    onChange={(e) => setNewVenture({...newVenture, owner: e.target.value})}
                    placeholder="Team member"
                  />
                </div>
                <Button onClick={addVenture} className="w-full">Add Venture</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#5C4B3A]">Ventures Pipeline</h2>
          <p className="text-muted-foreground">Track venture progress from ideation to exit</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Total Ventures</p>
              <p className="text-2xl font-bold">{ventures.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Total Burn Rate</p>
              <p className="text-2xl font-bold">R{(ventures.reduce((sum, v) => sum + v.burnRate, 0) / 1000).toFixed(0)}k</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Revenue Generating</p>
              <p className="text-2xl font-bold">{ventures.filter(v => v.daysToRevenue === 0).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">In Scale Phase</p>
              <p className="text-2xl font-bold">{ventures.filter(v => v.stage === "scale").length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto">
          {STAGES.map(stage => (
            <div
              key={stage.id}
              className={`min-h-[400px] rounded-lg border-2 ${stage.color} p-2`}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(stage.id)}
            >
              <h3 className="font-semibold text-sm mb-3 text-center flex items-center justify-center gap-2">
                <Rocket className="h-4 w-4" />
                {stage.name}
              </h3>
              <div className="space-y-2">
                {getVenturesForStage(stage.id).map(venture => (
                  <Card
                    key={venture.id}
                    draggable
                    onDragStart={() => handleDragStart(venture.id)}
                    className={`cursor-grab active:cursor-grabbing bg-white shadow-sm hover:shadow-md transition-shadow ${
                      draggedVenture === venture.id ? "opacity-50" : ""
                    }`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <GripVertical className="h-3 w-3 text-muted-foreground" />
                        <Badge variant="outline" className="text-[10px]">
                          {venture.owner.split(" ")[0]}
                        </Badge>
                      </div>
                      <p className="font-semibold text-sm">{venture.name}</p>
                      
                      {/* Burn Rate */}
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="flex items-center gap-1">
                            <TrendingDown className="h-3 w-3" />
                            Burn
                          </span>
                          <span className={getBurnRateStatus(venture.burnRate, venture.targetBurn)}>
                            R{(venture.burnRate / 1000).toFixed(0)}k / R{(venture.targetBurn / 1000).toFixed(0)}k
                          </span>
                        </div>
                        <Progress 
                          value={(venture.burnRate / venture.targetBurn) * 100} 
                          className="h-1 mt-1"
                        />
                      </div>
                      
                      {/* Days to Revenue */}
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-2">
                        <Clock className="h-3 w-3" />
                        {venture.daysToRevenue === 0 ? (
                          <span className="text-green-600 font-medium">Revenue generating</span>
                        ) : (
                          <span>{venture.daysToRevenue} days to revenue</span>
                        )}
                      </div>
                      
                      <p className="text-[10px] text-muted-foreground mt-2 italic">
                        {venture.currentStage}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card md:hidden">
        <div className="grid grid-cols-6 h-16">
          <Link href="/" className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground">
            <HomeIcon className="h-5 w-5" />
            <span className="text-[10px]">Home</span>
          </Link>
          <Link href="/dashboard" className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground">
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-[10px]">Dashboard</span>
          </Link>
          <Link href="/engine" className="flex flex-col items-center justify-center gap-1 text-primary">
            <Cog className="h-5 w-5" />
            <span className="text-[10px] font-medium">Engine</span>
          </Link>
          <Link href="/monthly" className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground">
            <Calendar className="h-5 w-5" />
            <span className="text-[10px]">Monthly</span>
          </Link>
          <Link href="/weekly" className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground">
            <CalendarDays className="h-5 w-5" />
            <span className="text-[10px]">Weekly</span>
          </Link>
          <Link href="/settings" className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
            <span className="text-[10px]">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
