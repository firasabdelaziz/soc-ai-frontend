import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { ScrollArea } from '../ui/scroll-area';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Shield, 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  Users, 
  FileText, 
  Search,
  Plus,
  Edit,
  Copy,
  MoreHorizontal,
  AlertTriangle,
  Zap,
  Target,
  List,
  Calendar,
  User
} from 'lucide-react';

const playbooksData = [
  {
    id: 1,
    name: "Phishing Email Response",
    description: "Comprehensive response to phishing email incidents",
    category: "Email Security",
    severity: "High",
    estimatedTime: "30-45 minutes",
    lastUpdated: "2024-01-28",
    status: "active",
    runCount: 47,
    successRate: 94,
    steps: [
      { id: 1, title: "Isolate affected mailbox", completed: false, assigned: "SOC Analyst", duration: "5 min" },
      { id: 2, title: "Analyze email headers and content", completed: false, assigned: "Security Engineer", duration: "10 min" },
      { id: 3, title: "Check for similar emails across organization", completed: false, assigned: "SOC Analyst", duration: "10 min" },
      { id: 4, title: "Extract and analyze IOCs", completed: false, assigned: "Threat Analyst", duration: "15 min" },
      { id: 5, title: "Update security controls", completed: false, assigned: "Security Admin", duration: "10 min" },
      { id: 6, title: "User notification and training", completed: false, assigned: "IT Support", duration: "5 min" }
    ]
  },
  {
    id: 2,
    name: "Malware Containment",
    description: "Rapid containment and analysis of malware infections",
    category: "Endpoint Security",
    severity: "Critical",
    estimatedTime: "45-60 minutes",
    lastUpdated: "2024-01-25",
    status: "active",
    runCount: 23,
    successRate: 91,
    steps: [
      { id: 1, title: "Isolate infected endpoint", completed: false, assigned: "SOC Analyst", duration: "2 min" },
      { id: 2, title: "Collect forensic evidence", completed: false, assigned: "Forensics Analyst", duration: "15 min" },
      { id: 3, title: "Analyze malware sample", completed: false, assigned: "Malware Analyst", duration: "20 min" },
      { id: 4, title: "Check for lateral movement", completed: false, assigned: "Network Analyst", duration: "15 min" },
      { id: 5, title: "Update detection rules", completed: false, assigned: "Security Engineer", duration: "10 min" },
      { id: 6, title: "Clean and restore endpoint", completed: false, assigned: "IT Support", duration: "30 min" }
    ]
  },
  {
    id: 3,
    name: "Data Breach Response",
    description: "Comprehensive data breach investigation and response",
    category: "Data Protection",
    severity: "Critical",
    estimatedTime: "2-4 hours",
    lastUpdated: "2024-01-20",
    status: "active",
    runCount: 8,
    successRate: 100,
    steps: [
      { id: 1, title: "Activate incident response team", completed: false, assigned: "CISO", duration: "15 min" },
      { id: 2, title: "Assess scope of breach", completed: false, assigned: "Incident Commander", duration: "30 min" },
      { id: 3, title: "Preserve evidence", completed: false, assigned: "Forensics Team", duration: "45 min" },
      { id: 4, title: "Contain the breach", completed: false, assigned: "Security Team", duration: "60 min" },
      { id: 5, title: "Notify stakeholders", completed: false, assigned: "Legal Team", duration: "30 min" },
      { id: 6, title: "Regulatory notification", completed: false, assigned: "Compliance Officer", duration: "2 hours" }
    ]
  },
  {
    id: 4,
    name: "DDoS Attack Mitigation",
    description: "Rapid response to distributed denial of service attacks",
    category: "Network Security",
    severity: "High",
    estimatedTime: "20-30 minutes",
    lastUpdated: "2024-01-15",
    status: "active",
    runCount: 15,
    successRate: 87,
    steps: [
      { id: 1, title: "Identify attack vectors", completed: false, assigned: "Network Analyst", duration: "5 min" },
      { id: 2, title: "Activate DDoS protection", completed: false, assigned: "Security Engineer", duration: "3 min" },
      { id: 3, title: "Implement rate limiting", completed: false, assigned: "Network Admin", duration: "5 min" },
      { id: 4, title: "Blacklist attacking IPs", completed: false, assigned: "Security Analyst", duration: "10 min" },
      { id: 5, title: "Monitor traffic patterns", completed: false, assigned: "SOC Analyst", duration: "15 min" },
      { id: 6, title: "Document and report", completed: false, assigned: "Incident Analyst", duration: "10 min" }
    ]
  },
  {
    id: 5,
    name: "Insider Threat Investigation",
    description: "Investigation procedures for suspected insider threats",
    category: "User Behavior",
    severity: "Medium",
    estimatedTime: "1-2 hours",
    lastUpdated: "2024-01-10",
    status: "draft",
    runCount: 3,
    successRate: 67,
    steps: [
      { id: 1, title: "Gather initial evidence", completed: false, assigned: "HR Security", duration: "30 min" },
      { id: 2, title: "Monitor user activities", completed: false, assigned: "SOC Analyst", duration: "45 min" },
      { id: 3, title: "Analyze access patterns", completed: false, assigned: "Data Analyst", duration: "30 min" },
      { id: 4, title: "Interview relevant personnel", completed: false, assigned: "HR Manager", duration: "60 min" },
      { id: 5, title: "Coordinate with legal", completed: false, assigned: "Legal Counsel", duration: "30 min" },
      { id: 6, title: "Take appropriate action", completed: false, assigned: "Management", duration: "Variable" }
    ]
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical': return 'bg-red-500 text-white';
    case 'High': return 'bg-orange-500 text-white';
    case 'Medium': return 'bg-yellow-500 text-black';
    case 'Low': return 'bg-green-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'deprecated': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export default function PlaybooksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlaybook, setSelectedPlaybook] = useState<typeof playbooksData[0] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [executionProgress, setExecutionProgress] = useState(0);

  const filteredPlaybooks = playbooksData.filter(playbook =>
    playbook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playbook.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playbook.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startPlaybook = (playbook: typeof playbooksData[0]) => {
    setSelectedPlaybook(playbook);
    setIsRunning(true);
    setCurrentStep(0);
    setExecutionProgress(0);
    
    // Reset all steps
    const resetPlaybook = {
      ...playbook,
      steps: playbook.steps.map(step => ({ ...step, completed: false }))
    };
    setSelectedPlaybook(resetPlaybook);
  };

  const completeStep = (stepIndex: number) => {
    if (!selectedPlaybook) return;
    
    const updatedPlaybook = {
      ...selectedPlaybook,
      steps: selectedPlaybook.steps.map((step, index) => 
        index === stepIndex ? { ...step, completed: true } : step
      )
    };
    
    setSelectedPlaybook(updatedPlaybook);
    
    // Update progress
    const completedSteps = updatedPlaybook.steps.filter(step => step.completed).length;
    const progress = (completedSteps / updatedPlaybook.steps.length) * 100;
    setExecutionProgress(progress);
    
    // Move to next step if available
    if (stepIndex === currentStep && currentStep < selectedPlaybook.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    
    // Check if all steps are completed
    if (completedSteps === updatedPlaybook.steps.length) {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Security Playbooks
          </h1>
          <p className="text-muted-foreground">Automated response procedures for security incidents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export All
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Playbook
          </Button>
        </div>
      </div>

      {/* Playbook Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Playbooks', value: playbooksData.length, icon: FileText, color: 'text-blue-500' },
          { label: 'Active', value: playbooksData.filter(p => p.status === 'active').length, icon: CheckCircle, color: 'text-green-500' },
          { label: 'Total Executions', value: playbooksData.reduce((sum, p) => sum + p.runCount, 0), icon: Play, color: 'text-purple-500' },
          { label: 'Avg Success Rate', value: `${Math.round(playbooksData.reduce((sum, p) => sum + p.successRate, 0) / playbooksData.length)}%`, icon: Target, color: 'text-orange-500' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`text-2xl ${stat.color}`}>{stat.value}</p>
                  </div>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Playbooks List */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Available Playbooks</CardTitle>
                  <CardDescription>{filteredPlaybooks.length} playbooks available</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search playbooks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredPlaybooks.map((playbook) => (
                    <Card key={playbook.id} className="hover:bg-accent/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg">{playbook.name}</h3>
                              <Badge className={getSeverityColor(playbook.severity)}>
                                {playbook.severity}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(playbook.status)}>
                                {playbook.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{playbook.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {playbook.estimatedTime}
                              </span>
                              <span className="flex items-center gap-1">
                                <List className="w-3 h-3" />
                                {playbook.steps.length} steps
                              </span>
                              <span className="flex items-center gap-1">
                                <Play className="w-3 h-3" />
                                {playbook.runCount} runs
                              </span>
                              <span className="flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                {playbook.successRate}% success
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startPlaybook(playbook)}
                              disabled={isRunning}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Category:</span>
                            <span className="ml-1">{playbook.category}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Last Updated:</span>
                            <span className="ml-1">{playbook.lastUpdated}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Playbook Execution Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isRunning ? (
                  <Pause className="w-5 h-5 text-orange-500" />
                ) : (
                  <Play className="w-5 h-5 text-green-500" />
                )}
                Playbook Execution
              </CardTitle>
              <CardDescription>
                {selectedPlaybook ? `Executing: ${selectedPlaybook.name}` : 'Select a playbook to start execution'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedPlaybook ? (
                <div className="space-y-4">
                  {/* Execution Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Overall Progress</span>
                      <span className="text-sm">{Math.round(executionProgress)}%</span>
                    </div>
                    <Progress value={executionProgress} className="w-full" />
                  </div>

                  {/* Execution Steps */}
                  <div>
                    <h4 className="mb-3">Execution Steps</h4>
                    <ScrollArea className="h-96">
                      <div className="space-y-3">
                        {selectedPlaybook.steps.map((step, index) => (
                          <div
                            key={step.id}
                            className={`p-3 border rounded-lg transition-colors ${
                              step.completed 
                                ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
                                : index === currentStep && isRunning
                                ? 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800'
                                : 'bg-muted/50'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {step.completed ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  ) : index === currentStep && isRunning ? (
                                    <Clock className="w-4 h-4 text-blue-500 animate-pulse" />
                                  ) : (
                                    <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                                  )}
                                  <span className="text-sm">{step.title}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground ml-6">
                                  <span className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {step.assigned}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {step.duration}
                                  </span>
                                </div>
                              </div>
                              {!step.completed && index <= currentStep && isRunning && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => completeStep(index)}
                                >
                                  Complete
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    {isRunning ? (
                      <Button
                        variant="outline"
                        onClick={() => setIsRunning(false)}
                        className="flex-1"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setIsRunning(true)}
                        className="flex-1"
                        disabled={executionProgress === 100}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {executionProgress > 0 ? 'Resume' : 'Start'}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedPlaybook(null);
                        setIsRunning(false);
                        setCurrentStep(0);
                        setExecutionProgress(0);
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a playbook from the list to start execution</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}