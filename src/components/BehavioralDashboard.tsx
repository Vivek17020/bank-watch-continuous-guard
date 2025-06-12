
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Smartphone, Fingerprint, MapPin, Clock, MousePointer, Keyboard } from 'lucide-react';

const BehavioralDashboard = () => {
  const behaviorData = [
    { time: '00:00', typing: 85, touch: 92, navigation: 78, location: 95 },
    { time: '04:00', typing: 87, touch: 89, navigation: 82, location: 94 },
    { time: '08:00', typing: 91, touch: 94, navigation: 85, location: 92 },
    { time: '12:00', typing: 89, touch: 91, navigation: 88, location: 96 },
    { time: '16:00', typing: 93, touch: 95, navigation: 91, location: 94 },
    { time: '20:00', typing: 88, touch: 90, navigation: 83, location: 93 },
  ];

  const realtimeData = [
    { timestamp: '14:30:00', confidence: 96 },
    { timestamp: '14:30:15', confidence: 94 },
    { timestamp: '14:30:30', confidence: 97 },
    { timestamp: '14:30:45', confidence: 95 },
    { timestamp: '14:31:00', confidence: 98 },
    { timestamp: '14:31:15', confidence: 96 },
  ];

  const behaviorMetrics = [
    { 
      icon: Keyboard, 
      name: 'Typing Pattern', 
      confidence: 94, 
      status: 'Normal',
      description: 'Keystroke dynamics and timing'
    },
    { 
      icon: MousePointer, 
      name: 'Touch Gestures', 
      confidence: 91, 
      status: 'Normal',
      description: 'Swipe patterns and pressure'
    },
    { 
      icon: Smartphone, 
      name: 'Device Handling', 
      confidence: 96, 
      status: 'Normal',
      description: 'Movement and orientation'
    },
    { 
      icon: MapPin, 
      name: 'Location Pattern', 
      confidence: 88, 
      status: 'Verified',
      description: 'Geolocation consistency'
    },
    { 
      icon: Clock, 
      name: 'Usage Timing', 
      confidence: 92, 
      status: 'Normal',
      description: 'Session patterns and frequency'
    },
    { 
      icon: Fingerprint, 
      name: 'Biometric Sync', 
      confidence: 98, 
      status: 'Verified',
      description: 'Cross-reference with biometrics'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Real-time Confidence Score */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Real-time Authentication Confidence</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={realtimeData}>
              <defs>
                <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="timestamp" stroke="#9ca3af" />
              <YAxis domain={[80, 100]} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Area 
                type="monotone" 
                dataKey="confidence" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#confidenceGradient)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Behavioral Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {behaviorMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="bg-slate-800/50 border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <IconComponent className="h-6 w-6 text-blue-400" />
                  <h4 className="font-semibold text-white">{metric.name}</h4>
                </div>
                <Badge variant={metric.status === 'Normal' ? 'default' : 'secondary'}>
                  {metric.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Confidence</span>
                  <span className="text-sm font-medium text-white">{metric.confidence}%</span>
                </div>
                <Progress value={metric.confidence} className="h-2" />
                <p className="text-xs text-slate-500">{metric.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Behavioral Trends */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">24-Hour Behavioral Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={behaviorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis domain={[70, 100]} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Line type="monotone" dataKey="typing" stroke="#3b82f6" strokeWidth={2} name="Typing Pattern" />
              <Line type="monotone" dataKey="touch" stroke="#10b981" strokeWidth={2} name="Touch Gestures" />
              <Line type="monotone" dataKey="navigation" stroke="#f59e0b" strokeWidth={2} name="Navigation" />
              <Line type="monotone" dataKey="location" stroke="#8b5cf6" strokeWidth={2} name="Location" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default BehavioralDashboard;
