import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
  Building2,
  DollarSign,
  User,
  GripVertical
} from "lucide-react";
import { Link, useLocation } from "wouter";

// Kanban stages for BD Pipeline
const STAGES = [
  { id: "lead", name: "Lead", color: "bg-slate-100 border-slate-300" },
  { id: "qualified", name: "Qualified", color: "bg-blue-100 border-blue-300" },
  { id: "proposal", name: "Proposal", color: "bg-purple-100 border-purple-300" },
  { id: "negotiation", name: "Negotiation", color: "bg-amber-100 border-amber-300" },
  { id: "closed-won", name: "Closed Won", color: "bg-green-100 border-green-300" },
  { id: "closed-lost", name: "Closed Lost", color: "bg-red-100 border-red-300" },
];

// Mock deals data
const initialDeals = [
  { id: 1, company: "Nedbank", contact: "Sarah M.", value: 450000, stage: "negotiation", probability: 75, nextStep: "Final presentation" },
  { id: 2, company: "Standard Bank", contact: "John K.", value: 320000, stage: "proposal", probability: 50, nextStep: "Send revised proposal" },
  { id: 3, company: "FNB", contact: "Lisa T.", value: 180000, stage: "qualified", probability: 30, nextStep: "Discovery call" },
  { id: 4, company: "Absa", contact: "Mike R.", value: 550000, stage: "lead", probability: 10, nextStep: "Initial outreach" },
  { id: 5, company: "Capitec", contact: "Anna P.", value: 280000, stage: "closed-won", probability: 100, nextStep: "Kickoff meeting" },
  { id: 6, company: "Discovery", contact: "Peter L.", value: 200000, stage: "lead", probability: 15, nextStep: "Schedule intro call" },
];

export default function BDPipeline() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [deals, setDeals] = useState(initialDeals);
  const [draggedDeal, setDraggedDeal] = useState<number | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDeal, setNewDeal] = useState({ company: "", contact: "", value: "", stage: "lead", nextStep: "" });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const handleDragStart = (dealId: number) => {
    setDraggedDeal(dealId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (stageId: string) => {
    if (draggedDeal) {
      setDeals(deals.map(deal => 
        deal.id === draggedDeal ? { ...deal, stage: stageId } : deal
      ));
      toast.success("Deal moved to " + STAGES.find(s => s.id === stageId)?.name);
    }
    setDraggedDeal(null);
  };

  const addDeal = () => {
    if (!newDeal.company || !newDeal.value) {
      toast.error("Please fill in company and value");
      return;
    }
    const deal = {
      id: Math.max(...deals.map(d => d.id)) + 1,
      company: newDeal.company,
      contact: newDeal.contact,
      value: parseInt(newDeal.value),
      stage: newDeal.stage,
      probability: newDeal.stage === "lead" ? 10 : 30,
      nextStep: newDeal.nextStep,
    };
    setDeals([...deals, deal]);
    setNewDeal({ company: "", contact: "", value: "", stage: "lead", nextStep: "" });
    setIsAddDialogOpen(false);
    toast.success("Deal added");
  };

  const getDealsForStage = (stageId: string) => deals.filter(d => d.stage === stageId);
  const getStageValue = (stageId: string) => getDealsForStage(stageId).reduce((sum, d) => sum + d.value, 0);

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
                Add Deal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Deal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium">Company</label>
                  <Input 
                    value={newDeal.company} 
                    onChange={(e) => setNewDeal({...newDeal, company: e.target.value})}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Contact</label>
                  <Input 
                    value={newDeal.contact} 
                    onChange={(e) => setNewDeal({...newDeal, contact: e.target.value})}
                    placeholder="Contact person"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Value (R)</label>
                  <Input 
                    type="number"
                    value={newDeal.value} 
                    onChange={(e) => setNewDeal({...newDeal, value: e.target.value})}
                    placeholder="Deal value"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Stage</label>
                  <Select value={newDeal.stage} onValueChange={(v) => setNewDeal({...newDeal, stage: v})}>
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
                <div>
                  <label className="text-sm font-medium">Next Step</label>
                  <Input 
                    value={newDeal.nextStep} 
                    onChange={(e) => setNewDeal({...newDeal, nextStep: e.target.value})}
                    placeholder="Next action"
                  />
                </div>
                <Button onClick={addDeal} className="w-full">Add Deal</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#5C4B3A]">BD Pipeline</h2>
          <p className="text-muted-foreground">Drag deals between stages to update their status</p>
        </div>

        {/* Pipeline Summary */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
          {STAGES.map(stage => (
            <Card key={stage.id} className={`${stage.color} border`}>
              <CardContent className="p-3 text-center">
                <p className="text-xs text-muted-foreground">{stage.name}</p>
                <p className="text-lg font-bold">R{(getStageValue(stage.id) / 1000).toFixed(0)}k</p>
                <p className="text-xs text-muted-foreground">{getDealsForStage(stage.id).length} deals</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto">
          {STAGES.map(stage => (
            <div
              key={stage.id}
              className={`min-h-[400px] rounded-lg border-2 ${stage.color} p-2`}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(stage.id)}
            >
              <h3 className="font-semibold text-sm mb-3 text-center">{stage.name}</h3>
              <div className="space-y-2">
                {getDealsForStage(stage.id).map(deal => (
                  <Card
                    key={deal.id}
                    draggable
                    onDragStart={() => handleDragStart(deal.id)}
                    className={`cursor-grab active:cursor-grabbing bg-white shadow-sm hover:shadow-md transition-shadow ${
                      draggedDeal === deal.id ? "opacity-50" : ""
                    }`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-1">
                          <GripVertical className="h-3 w-3 text-muted-foreground" />
                          <Building2 className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <Badge variant="outline" className="text-[10px]">
                          {deal.probability}%
                        </Badge>
                      </div>
                      <p className="font-semibold text-sm">{deal.company}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <User className="h-3 w-3" />
                        {deal.contact}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-green-600 mt-1">
                        <DollarSign className="h-3 w-3" />
                        R{(deal.value / 1000).toFixed(0)}k
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-2 italic">
                        Next: {deal.nextStep}
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
