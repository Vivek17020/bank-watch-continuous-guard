
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Shield, Lock, AlertTriangle, Smartphone, Battery, Zap, Users, Eye, Settings } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AdaptiveResponses = () => {
  const { toast } = useToast();
  const [responseSettings, setResponseSettings] = useState({
    autoResponse: true,
    stepUpAuth: true,
    sessionLimiting: true,
    adaptiveUI: true,
    riskThreshold: [65],
    energyOptimization: true
  });

  const responseActions = [
    {
      id: 1,
      trigger: 'High Risk Score (>80%)',
      action: 'Immediate Session Termination',
      frequency: 12,
      successRate: 98,
      impact: 'High Security',
      energyCost: 'Low',
      icon: Lock
    },
    {
      id: 2,
      trigger: 'Medium Risk Score (50-80%)',
      action: 'Step-up Authentication (MFA)',
      frequency: 45,
      successRate: 94,
      impact: 'Balanced',
      energyCost: 'Medium',
      icon: Shield
    },
    {
      id: 3,
      trigger: 'Location Anomaly',
      action: 'Limited Feature Access',
      frequency: 23,
      successRate: 89,
      impact: 'User Friendly',
      energyCost: 'Low',
      icon: Smartphone
    },
    {
      id: 4,
      trigger: 'Behavioral Deviation',
      action: 'Enhanced Monitoring',
      frequency: 67,
      successRate: 92,
      impact: 'Non-intrusive',
      energyCost: 'Very Low',
      icon: Eye
    }
  ];

  const responseEffectiveness = [
    { method: 'Session Termination', prevented: 98, falsePositives: 2 },
    { method: 'Step-up Auth', prevented: 94, falsePositives: 6 },
    { method: 'Feature Limiting', prevented: 89, falsePositives: 11 },
    { method: 'Enhanced Monitoring', prevented: 85, falsePositives: 15 }
  ];

  const energyOptimization = [
    { component: 'ML Processing', current: 23, optimized: 18 },
    { component: 'Sensor Monitoring', current: 15, optimized: 12 },
    { component: 'Data Transmission', current: 8, optimized: 6 },
    { component: 'UI Updates', current: 5, optimized: 4 }
  ];

  const privacyCompliance = [
    { regulation: 'GDPR', status: 'Compliant', score: 98 },
    { regulation: 'DPDP Act', status: 'Compliant', score: 96 },
    { regulation: 'Local IT Laws', status: 'Compliant', score: 94 },
    { regulation: 'Banking Regulations', status: 'Compliant', score: 99 }
  ];

  const userExperience = [
    { name: 'Seamless', value: 78, color: '#10b981' },
    { name: 'Minor Friction', value: 18, color: '#f59e0b' },
    { name: 'Significant Friction', value: 4, color: '#ef4444' }
  ];

  const handleSettingChange = (setting: string, value: any) => {
    setResponseSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: "Settings Updated",
      description: `${setting} has been ${typeof value === 'boolean' ? (value ? 'enabled' : 'disabled') : 'updated'}`,
    });
  };

  const triggerResponse = (action: any) => {
    toast({
      title: "Response Triggered",
      description: `${action.action} has been activated`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Adaptive Security Responses</h2>
          <p className="text-slate-400">Privacy-preserving, energy-efficient security automation</p>
        </div>
        <div className="flex items-center gap-2">
          <Battery className="h-4 w-4 text-green-400" />
          <span className="text-sm text-slate-400">Energy Optimized</span>
        </div>
      </div>

      {/* Response Configuration */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-400" />
          Response Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Automatic Responses</span>
              <Switch 
                checked={responseSettings.autoResponse}
                onCheckedChange={(value) => handleSettingChange('autoResponse', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Step-up Authentication</span>
              <Switch 
                checked={responseSettings.stepUpAuth}
                onCheckedChange={(value) => handleSettingChange('stepUpAuth', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Session Limiting</span>
              <Switch 
                checked={responseSettings.sessionLimiting}
                onCheckedChange={(value) => handleSettingChange('sessionLimiting', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Adaptive UI Support</span>
              <Switch 
                checked={responseSettings.adaptiveUI}
                onCheckedChange={(value) => handleSettingChange('adaptiveUI', value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-white block mb-2">Risk Threshold: {responseSettings.riskThreshold[0]}%</label>
              <Slider
                value={responseSettings.riskThreshold}
                onValueChange={(value) => handleSettingChange('riskThreshold', value)}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Energy Optimization</span>
              <Switch 
                checked={responseSettings.energyOptimization}
                onCheckedChange={(value) => handleSettingChange('energyOptimization', value)}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Response Actions */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Active Response Strategies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {responseActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <div key={action.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5 text-blue-400" />
                    <div>
                      <h4 className="text-white font-medium">{action.action}</h4>
                      <p className="text-sm text-slate-400">{action.trigger}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => triggerResponse(action)}
                  >
                    Test
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Success Rate</p>
                    <p className="text-white font-medium">{action.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Frequency</p>
                    <p className="text-white font-medium">{action.frequency}/day</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Impact</p>
                    <Badge variant="outline">{action.impact}</Badge>
                  </div>
                  <div>
                    <p className="text-slate-400">Energy Cost</p>
                    <Badge variant="secondary">{action.energyCost}</Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Response Effectiveness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Response Effectiveness</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseEffectiveness}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="method" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Bar dataKey="prevented" fill="#10b981" name="Threats Prevented %" />
                <Bar dataKey="falsePositives" fill="#ef4444" name="False Positives %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">User Experience Impact</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userExperience}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userExperience.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {userExperience.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-300">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Energy Optimization */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          Energy Optimization Performance
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={energyOptimization}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="component" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Bar dataKey="current" fill="#64748b" name="Current Usage (mAh)" />
              <Bar dataKey="optimized" fill="#10b981" name="Optimized Usage (mAh)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Privacy Compliance */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-400" />
          Privacy & Compliance Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {privacyCompliance.map((item, index) => (
            <div key={index} className="text-center p-4 bg-slate-700/50 rounded-lg">
              <h4 className="text-white font-medium mb-2">{item.regulation}</h4>
              <Progress value={item.score} className="mb-2" />
              <div className="flex items-center justify-between">
                <Badge variant="default">{item.status}</Badge>
                <span className="text-sm text-slate-400">{item.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdaptiveResponses;
