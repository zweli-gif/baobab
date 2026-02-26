import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  Package,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { Link, useLocation } from "wouter";

// Mock delivery projects
const initialProjects = [
  { id: 1, project: "Nedbank App", client: "Nedbank", progress: 75, milestones: "4/5", nextDeadline: "2026-02-15", owner: "Thabo M.", status: "on-track" },
  { id: 2, project: "Standard Bank Brand", client: "Standard Bank", progress: 90, milestones: "8/9", nextDeadline: "2026-02-10", owner: "Mpumi D.", status: "on-track" },
  { id: 3, project: "Discovery UX", client: "Discovery", progress: 30, milestones: "2/6", nextDeadline: "2026-03-01", owner: "Naledi K.", status: "on-track" },
  { id: 4, project: "FNB Website", client: "FNB", progress: 85, milestones: "5/6", nextDeadline: "2026-02-05", owner: "Bongani S.", status: "at-risk" },
  { id: 5, project: "Capitec Portal", client: "Capitec", progress: 45, milestones: "3/7", nextDeadline: "2026-02-28", owner: "Zweli G.", status: "delayed" },
];

export default function Delivery() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [projects, setProjects] = useState(initialProjects);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({ project: "", client: "", owner: "", nextDeadline: "" });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const addProject = () => {
    if (!newProject.project || !newProject.client) {
      toast.error("Please fill in project and client name");
      return;
    }
    const project = {
      id: Math.max(...projects.map(p => p.id)) + 1,
      project: newProject.project,
      client: newProject.client,
      progress: 0,
      milestones: "0/5",
      nextDeadline: newProject.nextDeadline || "2026-06-30",
      owner: newProject.owner || "Unassigned",
      status: "on-track" as const
    };
    setProjects([...projects, project]);
    setNewProject({ project: "", client: "", owner: "", nextDeadline: "" });
    setIsAddDialogOpen(false);
    toast.success("Project added");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "at-risk": return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case "delayed": return <Clock className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getDaysToDeadline = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
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
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Delivery Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium">Project Name</label>
                  <Input 
                    value={newProject.project} 
                    onChange={(e) => setNewProject({...newProject, project: e.target.value})}
                    placeholder="Project name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Client</label>
                  <Input 
                    value={newProject.client} 
                    onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                    placeholder="Client name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Owner</label>
                  <Input 
                    value={newProject.owner} 
                    onChange={(e) => setNewProject({...newProject, owner: e.target.value})}
                    placeholder="Team member"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Next Deadline</label>
                  <Input 
                    type="date"
                    value={newProject.nextDeadline} 
                    onChange={(e) => setNewProject({...newProject, nextDeadline: e.target.value})}
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
            <Package className="h-6 w-6" />
            Delivery Tracker
          </h2>
          <p className="text-muted-foreground">Active project delivery status</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Active Projects</p>
              <p className="text-2xl font-bold">{projects.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">On Track</p>
              <p className="text-2xl font-bold text-green-600">{projects.filter(p => p.status === "on-track").length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">At Risk</p>
              <p className="text-2xl font-bold text-amber-600">{projects.filter(p => p.status === "at-risk").length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Delayed</p>
              <p className="text-2xl font-bold text-red-600">{projects.filter(p => p.status === "delayed").length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 text-sm font-medium">Project</th>
                  <th className="text-left p-3 text-sm font-medium">Client</th>
                  <th className="text-left p-3 text-sm font-medium">Progress</th>
                  <th className="text-left p-3 text-sm font-medium">Milestones</th>
                  <th className="text-left p-3 text-sm font-medium">Next Deadline</th>
                  <th className="text-left p-3 text-sm font-medium">Owner</th>
                  <th className="text-left p-3 text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id} className="border-t hover:bg-muted/30">
                    <td className="p-3 font-medium">{project.project}</td>
                    <td className="p-3 text-muted-foreground">{project.client}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="h-2 w-20" />
                        <span className="text-sm">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{project.milestones}</Badge>
                    </td>
                    <td className="p-3">
                      <span className={`text-sm ${getDaysToDeadline(project.nextDeadline) < 7 ? "text-red-600 font-medium" : ""}`}>
                        {new Date(project.nextDeadline).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}
                        {getDaysToDeadline(project.nextDeadline) < 7 && (
                          <span className="ml-1">({getDaysToDeadline(project.nextDeadline)}d)</span>
                        )}
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground">{project.owner}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        {getStatusIcon(project.status)}
                        <span className="text-sm capitalize">{project.status.replace("-", " ")}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
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
