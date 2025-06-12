
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Shield, Lock, Eye, Clock, Settings } from 'lucide-react';

const AdaptiveResponses = () => {
  const [autoResponse, setAutoResponse] = useState(true);
  const [riskThreshold, setRiskThreshold] = useState([65]);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [sessionLimiting, setSessionLimiting] = useState(true);

  const responseRules = [
    {
      id: 1,
      name: 'High Risk Location',
      trigger: 'User logs in from unusual geographic location',
      action: 'Require additional MFA',
      severity: 'high',
      enabled: true,
      threshold: 80
    },
    {
      id: 2,
      name: 'Behavioral Anomaly',
      trigger: 'Significant deviation in typing or touch patterns',
      action: 'Limit session duration to 15 minutes',
      severity: 'medium',
      enabled: true,
      threshold: 70
    },
    {
      id: 3,
      name: 'Device Change',
      trigger: 'Login from unrecognized device',
      action: 'Send notification and require device registration',
      severity: 'medium',
      enabled: true,
      threshold: 60
    },
    {
      id: 4,
      name: 'Time-based Anomaly',
      trigger: 'Login outside normal hours',
      action: 'Enable enhanced monitoring',
      severity: 'low',
      enabled: false,
      threshold: 50
    },
    {
      id: 5,
      name: 'Multiple Failed Attempts',
      trigger: 'Repeated authentication failures',
      action: 'Temporarily block account',
      severity: 'high',
      enabled: true,
      threshold: 90
    }
  ];

  const recentActions = [
    {
      id: 1,
      timestamp: '2024-06-12 14:23:45',
      user: 'user_2847',
      trigger: 'High Risk Location',
      action: 'MFA Required',
      status: 'success',
      details: 'User successfully completed additional authentication'
    },
    {
      id: 2,
      timestamp: '2024-06-12 13:45:12',
      user: 'user_1923',
      trigger: 'Behavioral Anomaly',
      action: 'Session Limited',
      status: 'active',
      details: 'Session duration reduced to 15 minutes'
    },
    {
      id: 3,
      timestamp: '2024-06-12 12:15:33',
      user: 'user_5641',
      trigger: 'Device Change',
      action: 'Device Registration',
      status: 'pending',
      details: 'User notification sent, awaiting device verification'
    }
  ];

  const privacySettings = [
    {
      category: 'Data Collection',
      setting: 'Behavioral Data Retention',
      value: '30 days',
      description: 'How long to store user behavioral patterns'
    },
    {
      category: 'Analytics',
      setting: 'Anonymization Level',
      value: 'High',
      description: 'Level of user data anonymization for analytics'
    },
    {
      category: 'Sharing',
      setting: 'Third-party Integration',
      value: 'Disabled',
      description: 'Share behavioral insights with partner services'
    },
    {
      category: 'Compliance',
      setting: 'GDPR Compliance',
      value: 'Enabled',
      description: 'Full compliance with data protection regulations'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400';
      case 'active': return 'text-blue-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-green-400" />
            <div>
              <p className="text-slate-400 text-sm">Active Rules</p>
              <p className="text-2xl font-bold text-white">{responseRules.filter(r => r.enabled).length}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <div>
              <p className="text-slate-400 text-sm">Actions Today</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center gap-3">
            <Eye className="h-6 w-6 text-blue-400" />
            <div>
              <p className="text-slate-400 text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-white">94.8%</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-purple-400" />
            <div>
              <p className="text-slate-400 text-sm">Avg Response</p>
              <p className="text-2xl font-bold text-white">1.2s</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="rules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
          <TabsTrigger value="rules" className="data-[state=active]:bg-blue-600">Response Rules</TabsTrigger>
          <TabsTrigger value="actions" className="data-[state=active]:bg-blue-600">Recent Actions</TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-blue-600">Configuration</TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-blue-600">Privacy & Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="rules">
          <Card className="bg-slate-800/50 border-slate-700">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-xl font-semibold text-white">Adaptive Response Rules</h3>
              <p className="text-slate-400 mt-2">Configure automated responses to detected anomalies</p>
            </div>
            <div className="divide-y divide-slate-700">
              {responseRules.map((rule) => (
                <div key={rule.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-white">{rule.name}</h4>
                        <Badge variant={getSeverityBadge(rule.severity)}>
                          {rule.severity.toUpperCase()}
                        </Badge>
                        <Switch 
                          checked={rule.enabled} 
                          onCheckedChange={() => {/* Handle rule toggle */}}
                        />
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{rule.trigger}</p>
                      <p className="text-sm text-slate-300">
                        <strong>Action:</strong> {rule.action}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">Risk Threshold</span>
                        <span className="text-sm text-white">{rule.threshold}%</span>
                      </div>
                      <Slider
                        value={[rule.threshold]}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="actions">
          <Card className="bg-slate-800/50 border-slate-700">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-xl font-semibold text-white">Recent Adaptive Actions</h3>
              <p className="text-slate-400 mt-2">Actions automatically taken by the system</p>
            </div>
            <div className="divide-y divide-slate-700">
              {recentActions.map((action) => (
                <div key={action.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-white">{action.trigger}</h4>
                        <Badge variant="outline" className={getStatusColor(action.status)}>
                          {action.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-1">User: {action.user}</p>
                      <p className="text-sm text-slate-400 mb-2">{action.timestamp}</p>
                      <p className="text-sm text-slate-300">{action.details}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    {action.status === 'pending' && (
                      <Button size="sm" variant="default">Approve</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Global Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Auto Response</p>
                    <p className="text-sm text-slate-400">Enable automatic responses to threats</p>
                  </div>
                  <Switch 
                    checked={autoResponse} 
                    onCheckedChange={setAutoResponse}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Multi-Factor Authentication</p>
                    <p className="text-sm text-slate-400">Require MFA for high-risk scenarios</p>
                  </div>
                  <Switch 
                    checked={mfaEnabled} 
                    onCheckedChange={setMfaEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Session Limiting</p>
                    <p className="text-sm text-slate-400">Limit session duration for anomalies</p>
                  </div>
                  <Switch 
                    checked={sessionLimiting} 
                    onCheckedChange={setSessionLimiting}
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-white font-medium">Global Risk Threshold</span>
                    <span className="text-white">{riskThreshold[0]}%</span>
                  </div>
                  <Slider
                    value={riskThreshold}
                    onValueChange={setRiskThreshold}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-sm text-slate-400 mt-2">
                    Minimum risk level to trigger automated responses
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Performance Optimization</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                  <div>
                    <p className="text-white font-medium">Battery Optimization</p>
                    <p className="text-sm text-slate-400">Reduce power consumption</p>
                  </div>
                  <Badge variant="default">ENABLED</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                  <div>
                    <p className="text-white font-medium">Edge Processing</p>
                    <p className="text-sm text-slate-400">Process data locally when possible</p>
                  </div>
                  <Badge variant="default">ENABLED</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                  <div>
                    <p className="text-white font-medium">Adaptive Sampling</p>
                    <p className="text-sm text-slate-400">Adjust data collection frequency</p>
                  </div>
                  <Badge variant="secondary">OPTIMIZED</Badge>
                </div>

                <Button className="w-full mt-4">
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Configuration
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Privacy & Compliance Settings</h3>
            <div className="space-y-6">
              {privacySettings.map((setting, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Badge variant="outline">{setting.category}</Badge>
                      <p className="text-white font-medium">{setting.setting}</p>
                    </div>
                    <p className="text-sm text-slate-400">{setting.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{setting.value}</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="h-5 w-5 text-blue-400" />
                <h4 className="text-blue-400 font-medium">Data Protection</h4>
              </div>
              <p className="text-slate-300 text-sm">
                All behavioral data is encrypted at rest and in transit. User patterns are anonymized 
                and cannot be traced back to individual users in analytics dashboards.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdaptiveResponses;
