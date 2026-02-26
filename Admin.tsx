import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Home as HomeIcon, 
  LayoutDashboard, 
  Cog, 
  Calendar, 
  CalendarDays, 
  Settings, 
  Loader2,
  ArrowLeft,
  Users,
  FileCheck,
  CalendarClock,
  Shield,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Link, useLocation } from "wouter";

// Mock admin data
const teamMembers = [
  { name: "Zweli Gwebityala", role: "CEO", status: "active", lastActive: "Today" },
  { name: "Thabo Mokoena", role: "COO", status: "active", lastActive: "Today" },
  { name: "Naledi Khumalo", role: "Head of Design", status: "active", lastActive: "Yesterday" },
  { name: "Mpumi Dlamini", role: "Head of Ventures", status: "active", lastActive: "Today" },
  { name: "Bongani Sithole", role: "Head of Finance", status: "active", lastActive: "2 days ago" },
];

const complianceItems = [
  { id: 1, item: "Annual CIPC Return", dueDate: "2026-03-31", status: "pending" },
  { id: 2, item: "BBBEE Certificate Renewal", dueDate: "2026-06-30", status: "pending" },
  { id: 3, item: "Tax Clearance Certificate", dueDate: "2026-02-28", status: "urgent" },
  { id: 4, item: "Professional Indemnity Insurance", dueDate: "2026-04-15", status: "pending" },
  { id: 5, item: "POPIA Compliance Audit", dueDate: "2026-05-01", status: "completed" },
];

const keyDates = [
  { date: "2026-02-15", event: "Q1 Board Meeting", type: "meeting" },
  { date: "2026-02-28", event: "Tax Filing Deadline", type: "deadline" },
  { date: "2026-03-01", event: "Team Offsite", type: "event" },
  { date: "2026-03-15", event: "Investor Update", type: "meeting" },
  { date: "2026-03-31", event: "Q1 Close", type: "deadline" },
];

const documents = [
  { name: "Company Registration", status: "valid", expiry: "N/A" },
  { name: "Tax Clearance", status: "expiring", expiry: "2026-02-28" },
  { name: "BBBEE Certificate", status: "valid", expiry: "2026-06-30" },
  { name: "Insurance Policy", status: "valid", expiry: "2026-04-15" },
  { name: "Shareholder Agreement", status: "valid", expiry: "N/A" },
];

export default function Admin() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [compliance, setCompliance] = useState(complianceItems);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const toggleCompliance = (id: number) => {
    setCompliance(compliance.map(item => 
      item.id === id ? { ...item, status: item.status === "completed" ? "pending" : "completed" } : item
    ));
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
          <Badge variant="outline">Admin</Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#5C4B3A] flex items-center gap-2">
            <Cog className="h-6 w-6" />
            Admin & Operations
          </h2>
          <p className="text-muted-foreground">Team, compliance, and document management</p>
        </div>

        {/* Team Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {teamMembers.map((member, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8B4513] flex items-center justify-center text-white font-bold">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={member.status === "active" ? "default" : "secondary"} className="mb-1">
                      {member.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{member.lastActive}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Compliance Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {compliance.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      checked={item.status === "completed"}
                      onCheckedChange={() => toggleCompliance(item.id)}
                    />
                    <div>
                      <p className={`font-medium ${item.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                        {item.item}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(item.dueDate).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={item.status === "completed" ? "default" : item.status === "urgent" ? "destructive" : "outline"}
                  >
                    {item.status === "completed" ? <CheckCircle className="h-3 w-3 mr-1" /> : item.status === "urgent" ? <AlertCircle className="h-3 w-3 mr-1" /> : null}
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Dates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarClock className="h-5 w-5" />
              Key Dates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {keyDates.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border-l-4 border-[#8B4513] bg-muted/30 rounded-r-lg">
                  <div>
                    <p className="font-medium">{item.event}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.date).toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short" })}
                    </p>
                  </div>
                  <Badge variant="outline">{item.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Document Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Document Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-2 text-sm font-medium">Document</th>
                    <th className="text-left p-2 text-sm font-medium">Status</th>
                    <th className="text-left p-2 text-sm font-medium">Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2 font-medium">{doc.name}</td>
                      <td className="p-2">
                        <Badge variant={doc.status === "valid" ? "default" : "destructive"}>
                          {doc.status}
                        </Badge>
                      </td>
                      <td className="p-2 text-muted-foreground">{doc.expiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
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
