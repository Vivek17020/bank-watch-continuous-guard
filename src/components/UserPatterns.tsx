
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';
import { User, Clock, MapPin, Smartphone, TrendingUp, Brain, Users, Accessibility } from 'lucide-react';

const UserPatterns = () => {
  const [selectedUser, setSelectedUser] = useState('user_12345');
  const [timeframe, setTimeframe] = useState('7d');

  const userProfiles = [
    { id: 'user_12345', name: 'Regular User', type: 'Standard', risk: 'Low' },
    { id: 'user_67890', name: 'Business Traveler', type: 'Mobile', risk: 'Medium' },
    { id: 'user_54321', name: 'Elderly User', type: 'Adaptive', risk: 'Low' },
    { id: 'user_98765', name: 'Accessibility User', type: 'Assisted', risk: 'Low' }
  ];

  const behaviorBaseline = [
    { trait: 'Typing Speed', current: 94, baseline: 90, variance: 8 },
    { trait: 'Touch Pressure', current: 87, baseline: 85, variance: 12 },
    { trait: 'Navigation Speed', current: 91, baseline: 88, variance: 15 },
    { trait: 'Session Duration', current: 78, baseline: 82, variance: 18 },
    { trait: 'Feature Usage', current: 96, baseline: 94, variance: 5 },
    { trait: 'Location Consistency', current: 88, baseline: 92, variance: 22 }
  ];

  const learningProgress = [
    { week: 'Week 1', accuracy: 72, confidence: 65, adaptations: 15 },
    { week: 'Week 2', accuracy: 81, confidence: 78, adaptations: 12 },
    { week: 'Week 3', accuracy: 87, confidence: 85, adaptations: 8 },
    { week: 'Week 4', accuracy: 92, confidence: 91, adaptations: 5 },
    { week: 'Week 5', accuracy: 95, confidence: 94, adaptations: 3 },
    { week: 'Week 6', accuracy: 97, confidence: 96, adaptations: 2 }
  ];

  const contextualFactors = [
    { factor: 'Time of Day', influence: 85, pattern: 'Consistent morning usage' },
    { factor: 'Device Type', influence: 92, pattern: 'Primary device preference' },
    { factor: 'Location', influence: 78, pattern: 'Home/office pattern' },
    { factor: 'App Version', influence: 95, pattern: 'Updated within 24h' },
    { factor: 'Network Type', influence: 88, pattern: 'WiFi preferred' },
    { factor: 'Battery Level', influence: 73, pattern: 'Usage decreases <20%' }
  ];

  const generateHeatmapData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return days.map(day => ({
      day,
      data: hours.map(hour => ({
        hour,
        value: Math.floor(Math.random() * 100)
      }))
    }));
  };

  const heatmapData = generateHeatmapData();

  const specialConsiderations = [
    {
      type: 'Elderly Users',
      adaptations: ['Slower interaction tolerance', 'Larger touch targets', 'Extended session times'],
      icon: User,
      color: 'text-green-400'
    },
    {
      type: 'Accessibility Needs',
      adaptations: ['Screen reader compatibility', 'Motor disability patterns', 'Cognitive assistance'],
      icon: Accessibility,
      color: 'text-blue-400'
    },
    {
      type: 'Duress Scenarios',
      adaptations: ['Subtle behavioral markers', 'Emergency protocols', 'Silent alerts'],
      icon: Users,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">ML-Powered User Pattern Analysis</h2>
          <p className="text-slate-400">Adaptive learning with contextual behavioral insights</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-48 bg-slate-800 border-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {userProfiles.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} ({user.type})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32 bg-slate-800 border-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ML Learning Progress */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          Machine Learning Adaptation Progress
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={learningProgress}>
              <defs>
                <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Area 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#8b5cf6" 
                fillOpacity={1} 
                fill="url(#accuracyGradient)"
                name="Model Accuracy %"
              />
              <Area 
                type="monotone" 
                dataKey="confidence" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#confidenceGradient)"
                name="Confidence %"
              />
              <Line type="monotone" dataKey="adaptations" stroke="#f59e0b" strokeWidth={2} name="Adaptations Made" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Behavioral Baseline Analysis */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Behavioral Baseline vs Current</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={behaviorBaseline}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="trait" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <PolarRadiusAxis 
                angle={0} 
                domain={[0, 100]} 
                tick={{ fill: '#9ca3af', fontSize: 10 }}
              />
              <Radar 
                name="Current" 
                dataKey="current" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar 
                name="Baseline" 
                dataKey="baseline" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Usage Heatmap */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-yellow-400" />
          Weekly Usage Pattern Heatmap
        </h3>
        <div className="grid grid-cols-8 gap-1 text-xs">
          <div></div>
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} className="text-center text-slate-400 p-1">
              {i.toString().padStart(2, '0')}
            </div>
          ))}
          {heatmapData.map((dayData, dayIndex) => (
            <>
              <div key={`day-${dayIndex}`} className="text-slate-400 p-1 text-right">
                {dayData.day}
              </div>
              {dayData.data.map((hourData, hourIndex) => (
                <div
                  key={`${dayIndex}-${hourIndex}`}
                  className="h-6 rounded-sm"
                  style={{
                    backgroundColor: `rgba(59, 130, 246, ${hourData.value / 100})`,
                  }}
                  title={`${dayData.day} ${hourData.hour}:00 - Activity: ${hourData.value}%`}
                />
              ))}
            </>
          ))}
        </div>
      </Card>

      {/* Contextual Factors */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Contextual Influence Factors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contextualFactors.map((factor, index) => (
            <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">{factor.factor}</h4>
                <Badge variant="outline">{factor.influence}%</Badge>
              </div>
              <p className="text-sm text-slate-400 mb-2">{factor.pattern}</p>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full" 
                  style={{ width: `${factor.influence}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Special User Considerations */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Special User Considerations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialConsiderations.map((consideration, index) => {
            const IconComponent = consideration.icon;
            return (
              <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent className={`h-6 w-6 ${consideration.color}`} />
                  <h4 className="text-white font-medium">{consideration.type}</h4>
                </div>
                <ul className="space-y-2">
                  {consideration.adaptations.map((adaptation, adaptIndex) => (
                    <li key={adaptIndex} className="text-sm text-slate-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      {adaptation}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Model Performance Metrics */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-400" />
          Continuous Learning Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-slate-700/50 rounded-lg">
            <p className="text-2xl font-bold text-green-400">97.3%</p>
            <p className="text-sm text-slate-400">Pattern Recognition Accuracy</p>
          </div>
          <div className="text-center p-4 bg-slate-700/50 rounded-lg">
            <p className="text-2xl font-bold text-blue-400">2.1s</p>
            <p className="text-sm text-slate-400">Average Adaptation Time</p>
          </div>
          <div className="text-center p-4 bg-slate-700/50 rounded-lg">
            <p className="text-2xl font-bold text-purple-400">0.08%</p>
            <p className="text-sm text-slate-400">False Positive Rate</p>
          </div>
          <div className="text-center p-4 bg-slate-700/50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-400">89%</p>
            <p className="text-sm text-slate-400">Energy Efficiency</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserPatterns;
