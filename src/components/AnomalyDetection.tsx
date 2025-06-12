
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { AlertTriangle, Shield, Eye, MapPin, Clock, Smartphone, User, Battery, Accessibility } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AnomalyDetection = () => {
  const { toast } = useToast();
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [activeAnomalies, setActiveAnomalies] = useState([
    {
      id: 1,
      type: 'Typing Pattern Deviation',
      severity: 'medium',
      confidence: 87,
      timestamp: '14:32:15',
      description: 'Typing speed 40% faster than normal baseline',
      userContext: 'Regular user - possible stress or urgency',
      action: 'Monitor',
      icon: Eye
    },
    {
      id: 2,
      type: 'Unusual Location Access',
      severity: 'high',
      confidence: 94,
      timestamp: '14:25:03',
      description: 'Login from new geographic location (2000km from usual)',
      userContext: 'Business traveler - legitimate travel pattern detected',
      action: 'Step-up Authentication',
      icon: MapPin
    },
    {
      id: 3,
      type: 'Navigation Flow Anomaly',
      severity: 'low',
      confidence: 72,
      timestamp: '14:20:45',
      description: 'Unusual sequence: Direct to transfer without balance check',
      userContext: 'Elderly user - possible confusion or assistance needed',
      action: 'Adaptive UI Support',
      icon: User
    },
    {
      id: 4,
      type: 'Device Handling Pattern',
      severity: 'medium',
      confidence: 83,
      timestamp: '14:18:30',
      description: 'Unusual grip pressure and orientation changes',
      userContext: 'User with motor disability - adapted interaction pattern',
      action: 'Accessibility Mode',
      icon: Accessibility
    }
  ]);

  const anomalyTrends = [
    { time: '00:00', detected: 2, falsePositives: 0, genuine: 2 },
    { time: '04:00', detected: 1, falsePositives: 0, genuine: 1 },
    { time: '08:00', detected: 5, falsePositives: 1, genuine: 4 },
    { time: '12:00', detected: 8, falsePositives: 1, genuine: 7 },
    { time: '16:00', detected: 6, falsePositives: 0, genuine: 6 },
    { time: '20:00', detected: 3, falsePositives: 0, genuine: 3 },
  ];

  const mlPerformance = [
    { metric: 'Accuracy', score: 96.8 },
    { metric: 'Precision', score: 94.2 },
    { metric: 'Recall', score: 91.5 },
    { metric: 'F1-Score', score: 92.8 },
    { metric: 'False Positive Rate', score: 0.12 }
  ];

  const privacyMetrics = [
    { aspect: 'Data Encryption', status: 'Active', level: 'AES-256' },
    { aspect: 'Local Processing', status: 'Enabled', level: '89% Edge Computing' },
    { aspect: 'Data Retention', status: 'Compliant', level: '7 Days Max' },
    { aspect: 'User Consent', status: 'Obtained', level: 'Granular Controls' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'outline';
    }
  };

  const handleAnomalyAction = (anomaly: any, action: string) => {
    toast({
      title: `${action} Triggered`,
      description: `Applied ${action} for ${anomaly.type}`,
    });
  };

  const handleAdaptiveResponse = (anomaly: any) => {
    const responses = {
      'high': 'Step-up Authentication Required',
      'medium': 'Enhanced Monitoring Activated',
      'low': 'Adaptive UI Support Enabled'
    };
    
    toast({
      title: "Adaptive Response",
      description: responses[anomaly.severity as keyof typeof responses],
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">ML-Powered Anomaly Detection</h2>
          <p className="text-slate-400">Intelligent fraud detection with contextual analysis</p>
        </div>
        <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
          <SelectTrigger className="w-32 bg-slate-800 border-slate-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">1 Hour</SelectItem>
            <SelectItem value="24h">24 Hours</SelectItem>
            <SelectItem value="7d">7 Days</SelectItem>
            <SelectItem value="30d">30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ML Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {mlPerformance.map((metric, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 p-4">
            <div className="text-center">
              <p className="text-sm text-slate-400">{metric.metric}</p>
              <p className="text-xl font-bold text-white">{metric.score}%</p>
              <Progress value={metric.score} className="mt-2 h-1" />
            </div>
          </Card>
        ))}
      </div>

      {/* Privacy & Compliance Status */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-400" />
          Privacy & Compliance Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {privacyMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div>
                <p className="text-white font-medium">{metric.aspect}</p>
                <p className="text-sm text-slate-400">{metric.level}</p>
              </div>
              <Badge variant="default">{metric.status}</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Active Anomalies with Context */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Contextual Anomaly Analysis</h3>
          <div className="flex items-center gap-2">
            <Battery className="h-4 w-4 text-green-400" />
            <span className="text-sm text-slate-400">Energy Optimized</span>
          </div>
        </div>

        <div className="space-y-4">
          {activeAnomalies.map((anomaly) => {
            const IconComponent = anomaly.icon;
            return (
              <div key={anomaly.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`h-5 w-5 ${getSeverityColor(anomaly.severity)}`} />
                    <div>
                      <h4 className="text-white font-medium">{anomaly.type}</h4>
                      <p className="text-sm text-slate-400">{anomaly.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getSeverityBadgeVariant(anomaly.severity)}>
                      {anomaly.severity.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-slate-400">{anomaly.confidence}%</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-slate-300">{anomaly.description}</p>
                  <div className="p-2 bg-blue-900/20 border border-blue-700/30 rounded">
                    <p className="text-sm text-blue-300">
                      <strong>Context:</strong> {anomaly.userContext}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleAdaptiveResponse(anomaly)}
                  >
                    {anomaly.action}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleAnomalyAction(anomaly, 'Investigate')}
                  >
                    Investigate
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleAnomalyAction(anomaly, 'Dismiss')}
                  >
                    False Positive
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Anomaly Trends */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Detection Accuracy Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={anomalyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Line type="monotone" dataKey="detected" stroke="#3b82f6" strokeWidth={2} name="Total Detected" />
              <Line type="monotone" dataKey="genuine" stroke="#10b981" strokeWidth={2} name="Genuine Threats" />
              <Line type="monotone" dataKey="falsePositives" stroke="#ef4444" strokeWidth={2} name="False Positives" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Edge Cases & Special Considerations */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-blue-400" />
          Special User Considerations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-900/20 border border-green-700/30 rounded-lg">
            <h4 className="text-green-400 font-medium mb-2">Elderly Users</h4>
            <p className="text-sm text-slate-300">Adaptive sensitivity thresholds for slower interactions and pattern variations</p>
          </div>
          <div className="p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
            <h4 className="text-blue-400 font-medium mb-2">Accessibility</h4>
            <p className="text-sm text-slate-300">Specialized models for users with motor or cognitive disabilities</p>
          </div>
          <div className="p-4 bg-orange-900/20 border border-orange-700/30 rounded-lg">
            <h4 className="text-orange-400 font-medium mb-2">Duress Detection</h4>
            <p className="text-sm text-slate-300">Subtle behavioral markers indicating potential coercion scenarios</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnomalyDetection;
