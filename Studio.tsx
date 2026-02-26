import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Palette,
  DollarSign,
  Clock,
  Users,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Link, useLocation } from "wouter";

// Mock studio projects
const initialProjects = [
  { 
    id: 1, 
    client: "Nedbank", 
    project: "Mobile App Redesign", 
    billedAmount: 280000, 
    targetBilling: 350000,
    startDate: "2026-01-15",
    endDate: "2026-03-30",
    status: "on-track",
    team: ["Mpumi D.", "Naledi K."],
    phase: "Design"
  },
  { 
    id: 2, 
    client: "Standard Bank", 
    project: "Brand Identity", 
    billedAmount: 120000, 
    targetBilling: 150000,
    startDate: "2026-01-01",
    endDate: "2026-02-28",
    status: "at-risk",
    team: ["Thabo M."],
    phase: "Review"
  },
  { 
    id: 3, 
    client: "Discovery", 
    project: "UX Research", 
    billedAmount: 45000, 
    targetBilling: 80000,
    startDate: "2026-02-01",
    endDate: "2026-04-15",
    status: "on-track",
    team: ["Bongani S.", "Mpumi D."],
    phase: "Research"
  },
  { 
    id: 4, 
    client: "FNB", 
    project: "Website Refresh", 
    billedAmount: 95000, 
    targetBilling: 100000,
    startDate: "2025-12-01",
    endDate: "2026-02-15",
    status: "delayed",
    team: ["Naledi K."],
    phase: "Development"
  },
];

export default function Studio() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [projects, setProjects] = useState(initialProjects);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({ client: "", project: "", targetBilling: "", endDate: "" });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const addProject = () => {
    if (!newProject.client || !newProject.project) {
      toast.error("Please fill in client and project name");
      return;
    }
    const project = {
      id: Math.max(...projects.map(p => p.id)) + 1,
      client: newProject.client,
      project: newProject.project,
      billedAmount: 0,
      targetBilling: parseInt(newProject.targetBilling) || 100000,
      startDate: new Date().toISOString().split("T")[0],
      endDate: newProject.endDate || "2026-06-30",
      status: "on-track" as const,
      team: [],
      phase: "Kickoff"
    };
    setProjects([...projects, project]);
    setNewProject({ client: "", project: "", targetBilling: "", endDate: "" });
    setIsAddDialogOpen(false);
    toast.success("Project added");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-track":
        return <Badge className="bg-green-100 text-green-700 border-green-300"><CheckCircle className="h-3 w-3 mr-1" />On Track</Badge>;
      case "at-risk":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-300"><AlertCircle className="h-3 w-3 mr-1" />At Risk</Badge>;
      case "delayed":
        return <Badge className="bg-red-100 text-red-700 border-red-300"><Clock className="h-3 w-3 mr-1" />Delayed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTimelineProgress = (start: string, end: string) => {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    const now = Date.now();
    const progress = ((now - startDate) / (endDate - startDate)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const getDaysRemaining = (end: string) => {
    const endDate = new Date(end).getTime();
    const now = Date.now();
    const days = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
    return days;
  };

  const totalBilled = projects.reduce((sum, p) => sum + p.billedAmount, 0);
  const totalTarget = projects.reduce((sum, p) => sum + p.targetBilling, 0);

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
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium">Client</label>
                  <Input 
                    value={newProject.client} 
                    onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                    placeholder="Client name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Project Name</label>
                  <Input 
                    value={newProject.project} 
                    onChange={(e) => setNewProject({...newProject, project: e.target.value})}
                    placeholder="Project name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Target Billing (R)</label>
                  <Input 
                    type="number"
                    value={newProject.targetBilling} 
                    onChange={(e) => setNewProject({...newProject, targetBilling: e.target.value})}
                    placeholder="Target amount"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Input 
                    type="date"
                    value={newProject.endDate} 
                    onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                  />
                </div>
                <Button onClick={addProject} className="w-full">Add Project</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#5C4B3A] flex items-center gap-2">
            <Palette className="h-6 w-6" />
            Studio Projects
          </h2>
          <p className="text-muted-foreground">Design and user acquisition projects</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Active Projects</p>
              <p className="text-2xl font-bold">{projects.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Total Billed</p>
              <p className="text-2xl font-bold text-green-600">R{(totalBilled / 1000).toFixed(0)}k</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Target Billing</p>
              <p className="text-2xl font-bold">R{(totalTarget / 1000).toFixed(0)}k</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Billing Progress</p>
              <p className="text-2xl font-bold">{((totalBilled / totalTarget) * 100).toFixed(0)}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(project => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{project.client}</p>
                    <CardTitle className="text-lg">{project.project}</CardTitle>
                  </div>
                  {getStatusBadge(project.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Billing Progress */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      Billing vs Target
                    </span>
                    <span className="font-medium">
                      R{(project.billedAmount / 1000).toFixed(0)}k / R{(project.targetBilling / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <Progress 
                    value={(project.billedAmount / project.targetBilling) * 100} 
                    className="h-2"
                  />
                </div>

                {/* Timeline Progress */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Timeline
                    </span>
                    <span className={`font-medium ${getDaysRemaining(project.endDate) < 0 ? "text-red-600" : getDaysRemaining(project.endDate) < 14 ? "text-amber-600" : "text-green-600"}`}>
                      {getDaysRemaining(project.endDate) < 0 
                        ? `${Math.abs(getDaysRemaining(project.endDate))} days overdue`
                        : `${getDaysRemaining(project.endDate)} days left`
                      }
                    </span>
                  </div>
                  <Progress 
                    value={getTimelineProgress(project.startDate, project.endDate)} 
                    className="h-2"
                  />
                </div>

                {/* Team & Phase */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {project.team.length > 0 ? project.team.join(", ") : "Unassigned"}
                    </span>
                  </div>
                  <Badge variant="outline">{project.phase}</Badge>
                </div>
              </CardContent>
            </Card>
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
