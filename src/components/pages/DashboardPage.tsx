import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Users,
  Server,
  Wifi,
  Eye,
  Clock,
  MoreHorizontal,
  Filter,
  Download
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Enhanced SOC-specific mock data
const securityMetrics = [
  { 
    title: "Active Threats", 
    value: "23", 
    change: "+8% vs last hour", 
    trending: "up", 
    icon: AlertTriangle,
    color: "text-red-500"
  },
  { 
    title: "Blocked Attacks", 
    value: "1,847", 
    change: "+15% vs yesterday", 
    trending: "up", 
    icon: Shield,
    color: "text-green-500"
  },
  { 
    title: "Mean Time to Detect", 
    value: "2.4m", 
    change: "-12% improvement", 
    trending: "down", 
    icon: Clock,
    color: "text-blue-500"
  },
  { 
    title: "Assets Monitored", 
    value: "2,847", 
    change: "+5 new assets", 
    trending: "up", 
    icon: Server,
    color: "text-purple-500"
  },
];

const threatLandscapeData = [
  { time: '00:00', malware: 12, phishing: 8, ddos: 3, intrusion: 5, total: 28 },
  { time: '02:00', malware: 18, phishing: 12, ddos: 1, intrusion: 7, total: 38 },
  { time: '04:00', malware: 25, phishing: 15, ddos: 4, intrusion: 9, total: 53 },
  { time: '06:00', malware: 31, phishing: 22, ddos: 6, intrusion: 12, total: 71 },
  { time: '08:00', malware: 28, phishing: 18, ddos: 2, intrusion: 8, total: 56 },
  { time: '10:00', malware: 35, phishing: 25, ddos: 7, intrusion: 15, total: 82 },
  { time: '12:00', malware: 42, phishing: 28, ddos: 5, intrusion: 18, total: 93 },
  { time: '14:00', malware: 38, phishing: 24, ddos: 3, intrusion: 14, total: 79 },
  { time: '16:00', malware: 29, phishing: 19, ddos: 4, intrusion: 11, total: 63 },
  { time: '18:00', malware: 33, phishing: 21, ddos: 6, intrusion: 13, total: 73 },
  { time: '20:00', malware: 26, phishing: 16, ddos: 2, intrusion: 9, total: 53 },
  { time: '22:00', malware: 19, phishing: 11, ddos: 1, intrusion: 6, total: 37 },
];

const attackVectorData = [
  { name: 'Email Phishing', value: 342, color: '#ef4444' },
  { name: 'Malware', value: 287, color: '#f97316' },
  { name: 'Network Intrusion', value: 156, color: '#eab308' },
  { name: 'DDoS', value: 89, color: '#22c55e' },
  { name: 'Insider Threat', value: 34, color: '#3b82f6' },
  { name: 'Social Engineering', value: 67, color: '#8b5cf6' },
];

const geographicThreats = [
  { country: 'Russia', threats: 234, blocked: 229 },
  { country: 'China', threats: 189, blocked: 185 },
  { country: 'North Korea', threats: 156, blocked: 152 },
  { country: 'Iran', threats: 98, blocked: 96 },
  { country: 'Unknown', threats: 87, blocked: 84 },
];

const topAlertsData = [
  { id: 1, title: "Advanced Persistent Threat Detected", severity: "critical", time: "3 min ago", source: "EDR", ip: "192.168.1.100" },
  { id: 2, title: "Suspicious PowerShell Execution", severity: "high", time: "7 min ago", source: "Endpoint", ip: "10.0.1.45" },
  { id: 3, title: "Lateral Movement Detected", severity: "high", time: "12 min ago", source: "Network", ip: "172.16.0.23" },
  { id: 4, title: "Data Exfiltration Attempt", severity: "critical", time: "15 min ago", source: "DLP", ip: "10.0.2.67" },
  { id: 5, title: "Credential Stuffing Attack", severity: "medium", time: "18 min ago", source: "WAF", ip: "203.0.113.45" },
];

const recentIncidents = [
  { id: "INC-2024-001", title: "Ransomware Attack on File Server", assignee: "Alice Johnson", status: "In Progress", priority: "Critical", created: "Jan 30, 14:30", sla: "2h remaining" },
  { id: "INC-2024-002", title: "Phishing Campaign Targeting Finance", assignee: "Bob Smith", status: "Investigating", priority: "High", created: "Jan 30, 13:15", sla: "4h remaining" },
  { id: "INC-2024-003", title: "Unauthorized API Access", assignee: "Carol Davis", status: "Resolved", priority: "Medium", created: "Jan 30, 11:45", sla: "Completed" },
  { id: "INC-2024-004", title: "Suspicious Network Traffic", assignee: "David Wilson", status: "Open", priority: "Low", created: "Jan 30, 10:20", sla: "1d remaining" },
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
    case 'Resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'Investigating': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'Open': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Security Operations Center</h1>
          <p className="text-muted-foreground">Real-time security monitoring and threat intelligence</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Activity className="w-4 h-4 mr-2" />
            Live View
          </Button>
        </div>
      </div>

      {/* Key Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trending === 'up' ? TrendingUp : TrendingDown;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1">{metric.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendIcon className={`h-3 w-3 mr-1 ${
                    metric.trending === 'up' ? 'text-red-500' : 'text-green-500'
                  }`} />
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Large Charts */}
        <div className="xl:col-span-2 space-y-6">
          {/* Threat Landscape Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Threat Landscape (24h)</CardTitle>
              <CardDescription>Real-time threat detection by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={threatLandscapeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="malware" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="phishing" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="intrusion" stackId="1" stroke="#eab308" fill="#eab308" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="ddos" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.8} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Geographic Threat Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Top Threat Origins</CardTitle>
              <CardDescription>Threats detected and blocked by country</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={geographicThreats} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="country" type="category" width={80} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="threats" fill="#ef4444" name="Threats Detected" />
                  <Bar dataKey="blocked" fill="#22c55e" name="Threats Blocked" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Incidents Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Security Incidents</CardTitle>
                <CardDescription>Active and recent security incidents</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Incident ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>SLA</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentIncidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-mono">{incident.id}</TableCell>
                      <TableCell>{incident.title}</TableCell>
                      <TableCell>{incident.assignee}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(incident.priority.toLowerCase())}>
                          {incident.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{incident.sla}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="space-y-6">
          {/* Real-time Critical Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Critical Alerts
              </CardTitle>
              <CardDescription>Requires immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="space-y-3">
                  {topAlertsData.map((alert) => (
                    <div key={alert.id} className="p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                      <h4 className="text-sm mb-1">{alert.title}</h4>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Source: {alert.source}</span>
                        <span>IP: {alert.ip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Attack Vector Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Attack Vectors (7 days)</CardTitle>
              <CardDescription>Distribution of attack types</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={attackVectorData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {attackVectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* System Health Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Security tool operational status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'SIEM Platform', status: 'operational', uptime: '99.9%' },
                  { name: 'EDR Agents', status: 'operational', uptime: '99.7%' },
                  { name: 'Network IDS', status: 'warning', uptime: '98.2%' },
                  { name: 'Email Security', status: 'operational', uptime: '99.8%' },
                  { name: 'WAF', status: 'operational', uptime: '99.9%' },
                ].map((system, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        system.status === 'operational' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <span className="text-sm">{system.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{system.uptime}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}