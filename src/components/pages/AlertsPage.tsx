import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Download,
  Eye,
  MoreHorizontal,
  Clock,
  MapPin,
  User,
  Shield,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const alertsData = [
  {
    id: "ALT-2024-00234",
    title: "Advanced Persistent Threat Detected",
    description: "Suspicious network communication patterns consistent with APT group activities",
    severity: "critical",
    category: "Malware",
    source: "EDR",
    sourceIP: "192.168.1.100",
    targetIP: "10.0.1.45",
    timestamp: "2024-01-30T14:32:15Z",
    status: "open",
    assignee: "Alice Johnson",
    tags: ["APT", "C2", "Persistence"],
    details: "Multiple suspicious processes detected with network callbacks to known C2 infrastructure"
  },
  {
    id: "ALT-2024-00235",
    title: "Brute Force Attack on SSH Service",
    description: "Multiple failed authentication attempts from external IP",
    severity: "high",
    category: "Intrusion",
    source: "Network IDS",
    sourceIP: "203.0.113.45",
    targetIP: "172.16.0.100",
    timestamp: "2024-01-30T14:28:42Z",
    status: "investigating",
    assignee: "Bob Smith",
    tags: ["Brute Force", "SSH", "External"],
    details: "Over 1000 failed login attempts detected in the last 10 minutes"
  },
  {
    id: "ALT-2024-00236",
    title: "Suspicious PowerShell Execution",
    description: "Obfuscated PowerShell script with potential malicious content",
    severity: "high",
    category: "Execution",
    source: "Endpoint",
    sourceIP: "10.0.2.67",
    targetIP: "-",
    timestamp: "2024-01-30T14:25:18Z",
    status: "acknowledged",
    assignee: "Carol Davis",
    tags: ["PowerShell", "Obfuscation", "Script"],
    details: "Base64 encoded PowerShell execution with suspicious string patterns"
  },
  {
    id: "ALT-2024-00237",
    title: "Data Exfiltration Attempt",
    description: "Large volume of data transferred to external destination",
    severity: "critical",
    category: "Exfiltration",
    source: "DLP",
    sourceIP: "10.0.3.25",
    targetIP: "198.51.100.200",
    timestamp: "2024-01-30T14:20:33Z",
    status: "blocked",
    assignee: "David Wilson",
    tags: ["Data Loss", "Exfiltration", "Network"],
    details: "Attempted transfer of 2.5GB of sensitive data to unauthorized external server"
  },
  {
    id: "ALT-2024-00238",
    title: "Phishing Email Detected",
    description: "Malicious email with credential harvesting attempt",
    severity: "medium",
    category: "Phishing",
    source: "Email Security",
    sourceIP: "mail.suspicious-domain.com",
    targetIP: "-",
    timestamp: "2024-01-30T14:15:07Z",
    status: "resolved",
    assignee: "Eve Martinez",
    tags: ["Phishing", "Email", "Credentials"],
    details: "Email containing fake login page attempting to harvest Office 365 credentials"
  },
  {
    id: "ALT-2024-00239",
    title: "Lateral Movement Detected",
    description: "Unusual network access patterns suggesting lateral movement",
    severity: "high",
    category: "Lateral Movement",
    source: "Network Monitor",
    sourceIP: "10.0.1.45",
    targetIP: "10.0.2.0/24",
    timestamp: "2024-01-30T14:10:22Z",
    status: "open",
    assignee: "Frank Brown",
    tags: ["Lateral Movement", "Network", "Scanning"],
    details: "Compromised host attempting to access multiple systems in different network segments"
  },
  {
    id: "ALT-2024-00240",
    title: "Malware Signature Detected",
    description: "Known malware signature found in file system",
    severity: "medium",
    category: "Malware",
    source: "Antivirus",
    sourceIP: "10.0.4.88",
    targetIP: "-",
    timestamp: "2024-01-30T14:05:41Z",
    status: "quarantined",
    assignee: "Grace Lee",
    tags: ["Malware", "File", "Signature"],
    details: "TrojanDownloader.Win32.Agent variant detected and quarantined"
  },
  {
    id: "ALT-2024-00241",
    title: "Privilege Escalation Attempt",
    description: "Unauthorized attempt to escalate user privileges",
    severity: "high",
    category: "Privilege Escalation",
    source: "Host Monitor",
    sourceIP: "10.0.1.33",
    targetIP: "-",
    timestamp: "2024-01-30T14:00:15Z",
    status: "investigating",
    assignee: "Henry Clark",
    tags: ["Privilege Escalation", "Admin", "Exploit"],
    details: "Standard user account attempting to gain administrative privileges through exploitation"
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-red-500 text-white';
    case 'high': return 'bg-orange-500 text-white';
    case 'medium': return 'bg-yellow-500 text-black';
    case 'low': return 'bg-green-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'investigating': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'acknowledged': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'blocked': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'quarantined': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'open': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'resolved': return CheckCircle;
    case 'blocked': return XCircle;
    case 'quarantined': return Shield;
    case 'investigating': return Eye;
    case 'acknowledged': return AlertCircle;
    default: return AlertTriangle;
  }
};

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState<typeof alertsData[0] | null>(null);

  const filteredAlerts = alertsData.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Security Alerts</h1>
          <p className="text-muted-foreground">Monitor and manage security alerts across your infrastructure</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Create Rule
          </Button>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Critical', count: alertsData.filter(a => a.severity === 'critical').length, color: 'text-red-500' },
          { label: 'High', count: alertsData.filter(a => a.severity === 'high').length, color: 'text-orange-500' },
          { label: 'Medium', count: alertsData.filter(a => a.severity === 'medium').length, color: 'text-yellow-500' },
          { label: 'Open', count: alertsData.filter(a => a.status === 'open').length, color: 'text-blue-500' },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl ${stat.color}`}>{stat.count}</p>
                </div>
                <AlertTriangle className={`h-6 w-6 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Alerts List */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Security Alerts</CardTitle>
                  <CardDescription>
                    {filteredAlerts.length} of {alertsData.length} alerts
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Advanced Filter
                  </Button>
                </div>
              </div>
              
              {/* Search and Filters */}
              <div className="flex gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="acknowledged">Acknowledged</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                  {filteredAlerts.map((alert) => {
                    const StatusIcon = getStatusIcon(alert.status);
                    return (
                      <div
                        key={alert.id}
                        className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedAlert(alert)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(alert.status)}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {alert.status}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{formatTimestamp(alert.timestamp)}</span>
                        </div>
                        
                        <h4 className="mb-2">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span>ID: {alert.id}</span>
                            <span>Source: {alert.source}</span>
                            <span>Category: {alert.category}</span>
                          </div>
                          <span>Assignee: {alert.assignee}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {alert.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Alert Details Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Alert Details</CardTitle>
              <CardDescription>
                {selectedAlert ? 'Detailed information about the selected alert' : 'Select an alert to view details'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedAlert ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2">{selectedAlert.title}</h4>
                    <div className="flex gap-2 mb-3">
                      <Badge className={getSeverityColor(selectedAlert.severity)}>
                        {selectedAlert.severity}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(selectedAlert.status)}>
                        {selectedAlert.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedAlert.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {formatTimestamp(selectedAlert.timestamp)} ({new Date(selectedAlert.timestamp).toLocaleString()})
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Assigned to {selectedAlert.assignee}</span>
                    </div>
                    
                    {selectedAlert.sourceIP !== '-' && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Source: {selectedAlert.sourceIP}</span>
                      </div>
                    )}
                    
                    {selectedAlert.targetIP !== '-' && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Target: {selectedAlert.targetIP}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h5 className="mb-2">Technical Details</h5>
                    <p className="text-sm text-muted-foreground p-3 bg-muted rounded">
                      {selectedAlert.details}
                    </p>
                  </div>

                  <div>
                    <h5 className="mb-2">Tags</h5>
                    <div className="flex flex-wrap gap-1">
                      {selectedAlert.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Investigate
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Resolve
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Click on an alert to view detailed information</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}