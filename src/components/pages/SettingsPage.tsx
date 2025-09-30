import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Monitor, 
  Database, 
  Zap, 
  Key,
  Globe,
  Server,
  AlertTriangle,
  CheckCircle,
  Save,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    weeklyReports: true,
    criticalOnly: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '5',
  });

  const [monitoring, setMonitoring] = useState({
    realTimeMonitoring: true,
    logRetention: '365',
    alertThreshold: 'medium',
    autoResponse: true,
  });

  const [showApiKey, setShowApiKey] = useState(false);

  const connectedSources = [
    { name: 'Splunk SIEM', type: 'SIEM', status: 'connected', lastSync: '2 min ago' },
    { name: 'CrowdStrike EDR', type: 'EDR', status: 'connected', lastSync: '5 min ago' },
    { name: 'Palo Alto Firewall', type: 'Firewall', status: 'connected', lastSync: '1 min ago' },
    { name: 'Microsoft Sentinel', type: 'SIEM', status: 'error', lastSync: '2 hours ago' },
    { name: 'Okta Identity', type: 'IAM', status: 'connected', lastSync: '10 min ago' },
    { name: 'AWS CloudTrail', type: 'Cloud', status: 'connected', lastSync: '3 min ago' },
  ];

  const apiEndpoints = [
    { name: 'Alerts API', endpoint: '/api/v1/alerts', method: 'GET', description: 'Retrieve security alerts' },
    { name: 'Incidents API', endpoint: '/api/v1/incidents', method: 'POST', description: 'Create new incidents' },
    { name: 'Threats API', endpoint: '/api/v1/threats', method: 'GET', description: 'Get threat intelligence' },
    { name: 'Reports API', endpoint: '/api/v1/reports', method: 'GET', description: 'Generate security reports' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'error': return AlertTriangle;
      default: return Monitor;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            System Settings
          </h1>
          <p className="text-muted-foreground">Configure your SOC environment and security preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync All
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Settings
                </CardTitle>
                <CardDescription>Manage your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@company.com" />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="analyst">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analyst">SOC Analyst</SelectItem>
                      <SelectItem value="engineer">Security Engineer</SelectItem>
                      <SelectItem value="manager">SOC Manager</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="cet">Central European Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Dashboard Preferences
                </CardTitle>
                <CardDescription>Customize your dashboard experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="refreshRate">Auto Refresh Rate</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Advanced Metrics</Label>
                    <p className="text-sm text-muted-foreground">Display detailed technical metrics</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing and widget sizes</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Authentication & Access
                </CardTitle>
                <CardDescription>Configure security settings for your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch 
                    checked={security.twoFactor}
                    onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, twoFactor: checked }))}
                  />
                </div>
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input 
                    id="sessionTimeout" 
                    type="number" 
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input 
                    id="passwordExpiry" 
                    type="number" 
                    value={security.passwordExpiry}
                    onChange={(e) => setSecurity(prev => ({ ...prev, passwordExpiry: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                  <Input 
                    id="loginAttempts" 
                    type="number" 
                    value={security.loginAttempts}
                    onChange={(e) => setSecurity(prev => ({ ...prev, loginAttempts: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Keys & Tokens
                </CardTitle>
                <CardDescription>Manage your API access credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Primary API Key</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      type={showApiKey ? "text" : "password"}
                      value="sk-1234567890abcdef..."
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Regenerate Key
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Create New Key
                  </Button>
                </div>
                <Separator />
                <div>
                  <Label>Webhook Token</Label>
                  <Input 
                    value="wh_token_abcdef123456..."
                    readOnly
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Alert Preferences
                </CardTitle>
                <CardDescription>Configure how you receive security alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                  </div>
                  <Switch 
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailAlerts: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                  </div>
                  <Switch 
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, smsAlerts: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Browser push notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Automated weekly summaries</p>
                  </div>
                  <Switch 
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReports: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Critical Only Mode</Label>
                    <p className="text-sm text-muted-foreground">Only critical severity alerts</p>
                  </div>
                  <Switch 
                    checked={notifications.criticalOnly}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, criticalOnly: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>Configure notification delivery methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="emailAddress">Email Address</Label>
                  <Input id="emailAddress" type="email" defaultValue="john.doe@company.com" />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input id="phoneNumber" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
                  <Input id="slackWebhook" placeholder="https://hooks.slack.com/..." />
                </div>
                <div>
                  <Label htmlFor="teamsWebhook">Teams Webhook URL</Label>
                  <Input id="teamsWebhook" placeholder="https://outlook.office.com/webhook/..." />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monitoring Settings */}
        <TabsContent value="monitoring">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Monitoring Configuration
                </CardTitle>
                <CardDescription>Configure monitoring and alerting parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Real-time Monitoring</Label>
                    <p className="text-sm text-muted-foreground">Enable continuous threat monitoring</p>
                  </div>
                  <Switch 
                    checked={monitoring.realTimeMonitoring}
                    onCheckedChange={(checked) => setMonitoring(prev => ({ ...prev, realTimeMonitoring: checked }))}
                  />
                </div>
                <div>
                  <Label htmlFor="logRetention">Log Retention (days)</Label>
                  <Input 
                    id="logRetention" 
                    type="number" 
                    value={monitoring.logRetention}
                    onChange={(e) => setMonitoring(prev => ({ ...prev, logRetention: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="alertThreshold">Alert Threshold</Label>
                  <Select 
                    value={monitoring.alertThreshold}
                    onValueChange={(value) => setMonitoring(prev => ({ ...prev, alertThreshold: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-Response</Label>
                    <p className="text-sm text-muted-foreground">Automatically respond to known threats</p>
                  </div>
                  <Switch 
                    checked={monitoring.autoResponse}
                    onCheckedChange={(checked) => setMonitoring(prev => ({ ...prev, autoResponse: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data & Storage
                </CardTitle>
                <CardDescription>Manage data retention and storage settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl text-blue-500 mb-1">847 GB</div>
                    <div className="text-sm text-muted-foreground">Total Storage Used</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl text-green-500 mb-1">2.1 TB</div>
                    <div className="text-sm text-muted-foreground">Available Space</div>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label>Alert Data Retention</Label>
                  <Select defaultValue="1year">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="2years">2 Years</SelectItem>
                      <SelectItem value="5years">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Log Data Retention</Label>
                  <Select defaultValue="90days">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">30 Days</SelectItem>
                      <SelectItem value="90days">90 Days</SelectItem>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Connected Data Sources
              </CardTitle>
              <CardDescription>Manage integrations with security tools and platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedSources.map((source, index) => {
                  const StatusIcon = getStatusIcon(source.status);
                  return (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <StatusIcon className={`w-5 h-5 ${
                          source.status === 'connected' ? 'text-green-500' : 'text-red-500'
                        }`} />
                        <div>
                          <h4>{source.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {source.type} • Last sync: {source.lastSync}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(source.status)}>
                          {source.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Integration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  API Endpoints
                </CardTitle>
                <CardDescription>Available API endpoints for integration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4>{endpoint.name}</h4>
                        <Badge variant="outline">{endpoint.method}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
                      <code className="text-xs bg-muted p-1 rounded">{endpoint.endpoint}</code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  API Configuration
                </CardTitle>
                <CardDescription>Configure API access and rate limiting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="baseUrl">Base URL</Label>
                  <Input id="baseUrl" defaultValue="https://api.soc-dashboard.com/v1" readOnly />
                </div>
                <div>
                  <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
                  <Input id="rateLimit" type="number" defaultValue="1000" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable CORS</Label>
                    <p className="text-sm text-muted-foreground">Allow cross-origin requests</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>API Logging</Label>
                    <p className="text-sm text-muted-foreground">Log API requests and responses</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div>
                  <Label>Allowed Origins</Label>
                  <Textarea 
                    placeholder="https://app.company.com&#10;https://dashboard.company.com"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}