import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  TrendingUp, 
  Shield, 
  AlertTriangle,
  Search,
  Clock,
  BarChart3,
  FileText,
  Brain,
  Zap,
  MessageSquare
} from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'assistant' | 'system';
  message: string;
  timestamp: Date;
  suggestions?: string[];
  data?: any;
}

const quickActions = [
  { icon: AlertTriangle, label: "Show critical alerts", query: "Show me all critical alerts from the last 24 hours" },
  { icon: TrendingUp, label: "Threat trends", query: "What are the current threat trends and patterns?" },
  { icon: Shield, label: "Security posture", query: "Analyze our current security posture and vulnerabilities" },
  { icon: BarChart3, label: "Generate report", query: "Generate a security summary report for the last week" },
  { icon: Search, label: "Threat hunting", query: "Help me hunt for APT indicators in our environment" },
  { icon: Brain, label: "Risk assessment", query: "Perform a risk assessment of our current threats" },
];

const predefinedResponses: { [key: string]: { message: string; suggestions?: string[]; data?: any } } = {
  "critical alerts": {
    message: "I found 3 critical alerts in the last 24 hours:\n\n1. **Advanced Persistent Threat Detected** (3 min ago)\n   - Source: EDR\n   - IP: 192.168.1.100\n   - Status: Active investigation\n\n2. **Data Exfiltration Attempt** (15 min ago)\n   - Source: DLP\n   - Volume: 2.5GB attempted\n   - Status: Blocked\n\n3. **Ransomware Signature** (45 min ago)\n   - Source: Endpoint Protection\n   - Host: WS-FINANCE-01\n   - Status: Quarantined\n\nRecommendation: Prioritize the APT investigation as it shows signs of lateral movement.",
    suggestions: ["Show me details about the APT alert", "What's the timeline of the data exfiltration?", "Are there any related incidents?"]
  },
  "threat trends": {
    message: "Based on the last 7 days of data, here are the key threat trends:\n\n📈 **Increasing Trends:**\n- Phishing attacks: +34% (287 attempts)\n- PowerShell-based attacks: +28%\n- Credential stuffing: +22%\n\n📉 **Decreasing Trends:**\n- DDoS attempts: -15%\n- SQL injection: -8%\n\n🎯 **Top Attack Vectors:**\n1. Email phishing (42%)\n2. Network intrusion (28%)\n3. Malware execution (18%)\n4. Social engineering (12%)\n\n**Geographic Distribution:**\nMost threats originating from Russia (34%), China (22%), and unknown sources (18%).",
    suggestions: ["Show phishing campaign details", "Analyze PowerShell attack patterns", "What's our blocking effectiveness?"]
  },
  "security posture": {
    message: "## Current Security Posture Analysis\n\n**Overall Security Score: 87/100** ✅\n\n**Strengths:**\n- Endpoint protection coverage: 99.7%\n- Network monitoring: Comprehensive\n- Incident response time: 2.4 min average\n- Patch compliance: 94%\n\n**Areas for Improvement:**\n- User security training completion: 78% (target: 95%)\n- Multi-factor authentication adoption: 82%\n- Vulnerability remediation: 23 high-risk pending\n\n**Recommendations:**\n1. Mandatory MFA rollout for remaining 18% of users\n2. Accelerate patching for 23 high-risk vulnerabilities\n3. Conduct phishing simulation training\n4. Review and update incident response playbooks",
    suggestions: ["Show vulnerability details", "MFA rollout timeline", "Schedule security training"]
  },
  "security report": {
    message: "## Weekly Security Summary Report\n**Period:** January 23-30, 2024\n\n### Key Metrics\n- **Total Threats Detected:** 1,847\n- **Threats Blocked:** 1,791 (97% success rate)\n- **Critical Incidents:** 5\n- **Mean Time to Detection:** 2.1 minutes\n- **Mean Time to Response:** 4.3 minutes\n\n### Incident Breakdown\n- Critical: 5 incidents (all resolved)\n- High: 23 incidents (21 resolved, 2 in progress)\n- Medium: 67 incidents (59 resolved)\n- Low: 142 incidents (138 resolved)\n\n### Top Threats\n1. Phishing attempts: 342 blocked\n2. Malware detections: 287 quarantined\n3. Network intrusions: 156 prevented\n4. DDoS attacks: 89 mitigated\n\n### Recommendations\n- Enhance email security filters\n- Update endpoint protection signatures\n- Review network segmentation policies",
    suggestions: ["Export detailed report", "Show incident timelines", "Compare with previous week"]
  }
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'system',
      message: 'AI Assistant activated. I\'m here to help with security analysis, threat hunting, and operational tasks.',
      timestamp: new Date(),
    },
    {
      id: 2,
      type: 'assistant',
      message: 'Hello! I\'m your SOC AI Assistant. I can help you with:\n\n• Analyzing security alerts and incidents\n• Threat hunting and investigation\n• Generating security reports\n• Risk assessment and recommendations\n• Operational guidance and best practices\n\nWhat would you like to explore today?',
      timestamp: new Date(),
      suggestions: ["Show critical alerts", "Analyze threat trends", "Security posture review"]
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      message: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let response = {
        message: "I'm analyzing your request. Let me gather the relevant security data and provide you with a comprehensive response.",
        suggestions: ["Can you be more specific?", "Show me related alerts", "Generate a report"]
      };

      // Check for predefined responses
      const lowerMessage = messageText.toLowerCase();
      for (const [key, predefinedResponse] of Object.entries(predefinedResponses)) {
        if (lowerMessage.includes(key)) {
          response = predefinedResponse;
          break;
        }
      }

      const assistantMessage: Message = {
        id: Date.now() + 1,
        type: 'assistant',
        message: response.message,
        timestamp: new Date(),
        suggestions: response.suggestions,
        data: response.data
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (message: string) => {
    return message.split('\n').map((line, index) => {
      if (line.startsWith('##')) {
        return <h3 key={index} className="text-lg mb-2">{line.replace('##', '').trim()}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="mb-2"><strong>{line.replace(/\*\*/g, '')}</strong></p>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 mb-1">{line.replace('- ', '')}</li>;
      }
      if (line.match(/^\d+\./)) {
        return <li key={index} className="ml-4 mb-1 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
      }
      return line ? <p key={index} className="mb-2">{line}</p> : <br key={index} />;
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl flex items-center gap-3">
            <Bot className="w-8 h-8 text-primary" />
            AI Security Assistant
          </h1>
          <p className="text-muted-foreground">Intelligent security analysis and operational support</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export Chat
          </Button>
          <Button>
            <Sparkles className="w-4 h-4 mr-2" />
            New Session
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="xl:col-span-3">
          <Card className="h-[700px] flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <CardTitle>AI Assistant Chat</CardTitle>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Brain className="w-3 h-3" />
                  GPT-4 Turbo
                </Badge>
              </div>
              <CardDescription>
                Ask questions about security alerts, threats, or get operational guidance
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type !== 'user' && (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          {message.type === 'assistant' ? (
                            <Bot className="w-4 h-4 text-primary-foreground" />
                          ) : (
                            <Sparkles className="w-4 h-4 text-primary-foreground" />
                          )}
                        </div>
                      )}
                      
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : ''}`}>
                        <div className={`p-3 rounded-lg ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : message.type === 'system'
                            ? 'bg-muted/50 border border-muted-foreground/20'
                            : 'bg-muted'
                        }`}>
                          <div className="prose prose-sm max-w-none dark:prose-invert">
                            {formatMessage(message.message)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                        </div>
                        
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSendMessage(suggestion)}
                                className="text-xs h-6"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {message.type === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
              
              <Separator className="my-4" />
              
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about security alerts, threats, or get operational guidance..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isTyping}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common security analysis tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => handleSendMessage(action.query)}
                    >
                      <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span className="text-sm">{action.label}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <Card>
            <CardHeader>
              <CardTitle>AI Capabilities</CardTitle>
              <CardDescription>What I can help you with</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { icon: AlertTriangle, title: "Alert Analysis", desc: "Deep dive into security alerts and incidents" },
                  { icon: Search, title: "Threat Hunting", desc: "Hunt for IOCs and suspicious activities" },
                  { icon: BarChart3, title: "Risk Assessment", desc: "Evaluate security risks and vulnerabilities" },
                  { icon: FileText, title: "Report Generation", desc: "Create comprehensive security reports" },
                  { icon: Brain, title: "Predictive Analysis", desc: "Forecast threats and recommend actions" },
                  { icon: Shield, title: "Compliance Check", desc: "Assess compliance with security frameworks" },
                ].map((capability, index) => {
                  const Icon = capability.icon;
                  return (
                    <div key={index} className="flex gap-3 p-2 rounded hover:bg-accent/50 transition-colors">
                      <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm">{capability.title}</h4>
                        <p className="text-xs text-muted-foreground">{capability.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Chat Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Session Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Messages</span>
                  <span className="text-sm">{messages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Session time</span>
                  <span className="text-sm">8m 32s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Queries resolved</span>
                  <span className="text-sm">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg response time</span>
                  <span className="text-sm">1.2s</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}