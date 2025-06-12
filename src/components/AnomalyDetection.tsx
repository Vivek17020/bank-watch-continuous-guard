
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { AlertTriangle, CheckCircle, XCircle, Clock, MapPin, Smartphone, Activity } from 'lucide-react';

const AnomalyDetection = () => {
  const [anomalies] = useState([
    {
      id: 1,
      type: 'Location',
      description: 'Login from unusual location (London, UK)',
      severity: 'high',
      timestamp: '2024-06-12 14:23:45',
      status: 'active',
      confidence: 87,
      user: 'user_2847',
      action: 'blocked'
    },
    {
      id: 2,
      type: 'Typing Pattern',
      description: 'Significant deviation in keystroke dynamics',
      severity: 'medium',
      timestamp: '2024-06-12 13:45:12',
      status: 'investigating',
      confidence: 72,
      user: 'user_1923',
      action: 'mfa_required'
    },
    {
      id: 3,
      type: 'Device Handling',
      description: 'Unusual accelerometer patterns detected',
      severity: 'low',
      timestamp: '2024-06-12 12:15:33',
      status: 'resolved',
      confidence: 64,
      user: 'user_5641',
      action: 'flagged'
    },
    {
      id: 4,
      type: 'Session Timing',
      description: 'Login outside normal hours (3:30 AM)',
      severity: 'medium',
      timestamp: '2024-06-12 03:30:15',
      status: 'active',
      confidence: 78,
      user: 'user_7829',
      action: 'monitoring'
    }
  ]);

  const anomalyTrends = [
    { time: '00:00', detected: 2, resolved: 1, falsePositive: 0 },
    { time: '04:00', detected: 5, resolved: 3, falsePositive: 1 },
    { time: '08:00', detected: 8, resolved: 6, falsePositive: 1 },
    { time: '12:00', detected: 12, resolved: 10, falsePositive: 2 },
    { time: '16:00', detected: 15, resolved: 12, falsePositive: 1 },
    { time: '20:00', detected: 9, resolved: 8, falsePositive: 0 },
  ];

  const behaviorScatter = [
    { x: 45, y: 23, confidence: 95, type: 'normal' },
    { x: 67, y: 34, confidence: 92, type: 'normal' },
    { x: 23, y: 78, confidence: 45, type: 'anomaly' },
    { x: 89, y: 12, confidence: 88, type: 'normal' },
    { x: 34, y: 89, confidence: 32, type: 'anomaly' },
    { x: 56, y: 45, confidence: 91, type: 'normal' },
    { x: 78, y: 67, confidence: 94, type: 'normal' },
    { x: 12, y: 56, confidence: 28, type: 'anomaly' },
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return AlertTriangle;
      case 'resolved': return CheckCircle;
      case 'investigating': return Clock;
      default: return XCircle;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Location': return MapPin;
      case 'Device Handling': return Smartphone;
      case 'Typing Pattern': return Activity;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Detection Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <div>
              <p className="text-slate-400 text-sm">Active Anomalies</p>
              <p className="text-2xl font-bold text-white">8</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <div>
              <p className="text-slate-400 text-sm">Resolved Today</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center gap-3">
            <XCircle className="h-6 w-6 text-yellow-400" />
            <div>
              <p className="text-slate-400 text-sm">False Positives</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-blue-400" />
            <div>
              <p className="text-slate-400 text-sm">Detection Rate</p>
              <p className="text-2xl font-bold text-white">97.8%</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
          <TabsTrigger value="list" className="data-[state=active]:bg-blue-600">Anomaly List</TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-blue-600">Detection Trends</TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-600">Behavior Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card className="bg-slate-800/50 border-slate-700">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-xl font-semibold text-white">Recent Anomalies</h3>
            </div>
            <div className="divide-y divide-slate-700">
              {anomalies.map((anomaly) => {
                const StatusIcon = getStatusIcon(anomaly.status);
                const TypeIcon = getTypeIcon(anomaly.type);
                
                return (
                  <div key={anomaly.id} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <TypeIcon className="h-5 w-5 text-slate-400" />
                        <div>
                          <h4 className="font-medium text-white">{anomaly.type} Anomaly</h4>
                          <p className="text-sm text-slate-400">{anomaly.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getSeverityBadge(anomaly.severity)}>
                          {anomaly.severity.toUpperCase()}
                        </Badge>
                        <StatusIcon className={`h-4 w-4 ${getSeverityColor(anomaly.severity)}`} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500">User ID</p>
                        <p className="text-slate-300">{anomaly.user}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Timestamp</p>
                        <p className="text-slate-300">{anomaly.timestamp}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Confidence</p>
                        <p className="text-slate-300">{anomaly.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Status</p>
                        <p className="text-slate-300 capitalize">{anomaly.status}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Action</p>
                        <p className="text-slate-300 capitalize">{anomaly.action.replace('_', ' ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">Investigate</Button>
                      <Button size="sm" variant="outline">Mark False Positive</Button>
                      {anomaly.status === 'active' && (
                        <Button size="sm" variant="destructive">Block User</Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">24-Hour Detection Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={anomalyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#f3f4f6' }}
                  />
                  <Line type="monotone" dataKey="detected" stroke="#ef4444" strokeWidth={2} name="Detected" />
                  <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} name="Resolved" />
                  <Line type="monotone" dataKey="falsePositive" stroke="#f59e0b" strokeWidth={2} name="False Positives" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Behavioral Pattern Analysis</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" dataKey="x" name="Behavior Score A" stroke="#9ca3af" />
                  <YAxis type="number" dataKey="y" name="Behavior Score B" stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#f3f4f6' }}
                    cursor={{ strokeDasharray: '3 3' }}
                  />
                  <Scatter 
                    name="Normal Behavior" 
                    data={behaviorScatter.filter(d => d.type === 'normal')} 
                    fill="#10b981" 
                  />
                  <Scatter 
                    name="Anomalous Behavior" 
                    data={behaviorScatter.filter(d => d.type === 'anomaly')} 
                    fill="#ef4444" 
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-slate-300">Normal Behavior</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm text-slate-300">Anomalous Behavior</span>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnomalyDetection;
