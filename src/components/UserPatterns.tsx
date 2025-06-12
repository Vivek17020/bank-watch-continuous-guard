
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { User, Clock, MapPin, Smartphone, Activity, TrendingUp } from 'lucide-react';

const UserPatterns = () => {
  const [selectedUser, setSelectedUser] = useState('user_2847');
  
  const userProfiles = [
    {
      id: 'user_2847',
      name: 'Sarah Johnson',
      riskLevel: 'low',
      confidence: 94,
      lastActive: '2 minutes ago',
      location: 'New York, NY',
      device: 'iPhone 14 Pro',
      sessions: 47
    },
    {
      id: 'user_1923',
      name: 'Michael Chen',
      riskLevel: 'medium',
      confidence: 78,
      lastActive: '15 minutes ago',
      location: 'San Francisco, CA',
      device: 'Samsung Galaxy S23',
      sessions: 23
    },
    {
      id: 'user_5641',
      name: 'Emily Rodriguez',
      riskLevel: 'low',
      confidence: 96,
      lastActive: '1 hour ago',
      location: 'Austin, TX',
      device: 'iPhone 13',
      sessions: 89
    }
  ];

  const behaviorRadarData = [
    { trait: 'Typing Speed', current: 92, baseline: 88, fullMark: 100 },
    { trait: 'Touch Pressure', current: 85, baseline: 90, fullMark: 100 },
    { trait: 'Swipe Pattern', current: 94, baseline: 91, fullMark: 100 },
    { trait: 'Navigation Flow', current: 87, baseline: 89, fullMark: 100 },
    { trait: 'Session Duration', current: 91, baseline: 86, fullMark: 100 },
    { trait: 'Time Consistency', current: 96, baseline: 94, fullMark: 100 },
  ];

  const usageHeatmap = [
    { hour: '00', Mon: 0, Tue: 0, Wed: 1, Thu: 0, Fri: 2, Sat: 1, Sun: 0 },
    { hour: '06', Mon: 3, Tue: 2, Wed: 4, Thu: 3, Fri: 2, Sat: 1, Sun: 1 },
    { hour: '09', Mon: 8, Tue: 9, Wed: 7, Thu: 8, Fri: 6, Sat: 3, Sun: 2 },
    { hour: '12', Mon: 5, Tue: 6, Wed: 4, Thu: 5, Fri: 7, Sat: 4, Sun: 3 },
    { hour: '15', Mon: 4, Tue: 3, Wed: 5, Thu: 4, Fri: 3, Sat: 2, Sun: 2 },
    { hour: '18', Mon: 6, Tue: 7, Wed: 6, Thu: 5, Fri: 8, Sat: 4, Sun: 3 },
    { hour: '21', Mon: 3, Tue: 2, Wed: 4, Thu: 3, Fri: 5, Sat: 6, Sun: 4 },
  ];

  const learningMetrics = [
    { name: 'Pattern Recognition', accuracy: 94, trend: 'up' },
    { name: 'Anomaly Detection', accuracy: 91, trend: 'up' },
    { name: 'False Positive Rate', accuracy: 2.1, trend: 'down' },
    { name: 'Adaptation Speed', accuracy: 87, trend: 'stable' },
  ];

  const currentUser = userProfiles.find(user => user.id === selectedUser);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '→';
  };

  const getHeatmapColor = (value: number) => {
    if (value === 0) return '#374151';
    if (value <= 2) return '#10b981';
    if (value <= 5) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="space-y-6">
      {/* User Selection */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">User Profile Selection</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userProfiles.map((user) => (
            <div 
              key={user.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedUser === user.id 
                  ? 'border-blue-500 bg-blue-900/20' 
                  : 'border-slate-600 hover:border-slate-500'
              }`}
              onClick={() => setSelectedUser(user.id)}
            >
              <div className="flex items-center gap-3 mb-2">
                <User className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-sm text-slate-400">{user.id}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Badge variant={user.riskLevel === 'low' ? 'default' : 'secondary'}>
                  {user.riskLevel.toUpperCase()}
                </Badge>
                <span className="text-sm text-slate-300">{user.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {currentUser && (
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600">User Profile</TabsTrigger>
            <TabsTrigger value="behavior" className="data-[state=active]:bg-blue-600">Behavior Analysis</TabsTrigger>
            <TabsTrigger value="patterns" className="data-[state=active]:bg-blue-600">Usage Patterns</TabsTrigger>
            <TabsTrigger value="learning" className="data-[state=active]:bg-blue-600">ML Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Profile Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-slate-400 text-sm">User Name</p>
                      <p className="text-white font-medium">{currentUser.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-slate-400 text-sm">Last Active</p>
                      <p className="text-white font-medium">{currentUser.lastActive}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-slate-400 text-sm">Location</p>
                      <p className="text-white font-medium">{currentUser.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-orange-400" />
                    <div>
                      <p className="text-slate-400 text-sm">Device</p>
                      <p className="text-white font-medium">{currentUser.device}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Confidence Score</h3>
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-4 ${getRiskColor(currentUser.riskLevel)}`}>
                    {currentUser.confidence}%
                  </div>
                  <Progress value={currentUser.confidence} className="mb-4" />
                  <Badge variant={currentUser.riskLevel === 'low' ? 'default' : 'secondary'}>
                    {currentUser.riskLevel.toUpperCase()} RISK
                  </Badge>
                </div>
                <div className="mt-6">
                  <p className="text-slate-400 text-sm mb-2">Total Sessions</p>
                  <p className="text-2xl font-bold text-white">{currentUser.sessions}</p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="behavior">
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Behavioral Traits Analysis</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={behaviorRadarData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="trait" className="text-slate-300" />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      className="text-slate-400"
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
                      strokeDasharray="5 5"
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-slate-300">Current Session</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm text-slate-300">Baseline Pattern</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="patterns">
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Weekly Usage Heatmap</h3>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-8 gap-1 min-w-96">
                  <div></div>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="text-center text-sm text-slate-400 p-2">
                      {day}
                    </div>
                  ))}
                  
                  {usageHeatmap.map((row, rowIndex) => (
                    <>
                      <div key={`hour-${rowIndex}`} className="text-sm text-slate-400 p-2">
                        {row.hour}:00
                      </div>
                      {Object.entries(row).slice(1).map(([day, value], colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="aspect-square rounded flex items-center justify-center text-xs text-white"
                          style={{
                            backgroundColor: getHeatmapColor(Number(value))
                          }}
                        >
                          {value || ''}
                        </div>
                      ))}
                    </>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-slate-600" />
                  <span className="text-sm text-slate-300">No Activity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500" />
                  <span className="text-sm text-slate-300">Low (1-2)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-yellow-500" />
                  <span className="text-sm text-slate-300">Medium (3-5)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-red-500" />
                  <span className="text-sm text-slate-300">High (6+)</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="learning">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">ML Model Performance</h3>
                <div className="space-y-4">
                  {learningMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-blue-400" />
                        <span className="text-white">{metric.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">
                          {metric.name === 'False Positive Rate' ? `${metric.accuracy}%` : `${metric.accuracy}%`}
                        </span>
                        <span className="text-lg">{getTrendIcon(metric.trend)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Adaptive Learning Status</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-400">Model Training</span>
                      <span className="text-white">87%</span>
                    </div>
                    <Progress value={87} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-400">Pattern Recognition</span>
                      <span className="text-white">94%</span>
                    </div>
                    <Progress value={94} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-400">Adaptation Rate</span>
                      <span className="text-white">91%</span>
                    </div>
                    <Progress value={91} />
                  </div>
                  
                  <Button className="w-full mt-4">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Retrain Model
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default UserPatterns;
