
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BehavioralDashboard from '@/components/BehavioralDashboard';
import RiskAssessment from '@/components/RiskAssessment';
import AnomalyDetection from '@/components/AnomalyDetection';
import UserPatterns from '@/components/UserPatterns';
import AdaptiveResponses from '@/components/AdaptiveResponses';
import { Shield, Activity, AlertTriangle, Users, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [currentRiskLevel, setCurrentRiskLevel] = useState('low');
  const [activeUsers, setActiveUsers] = useState(1247);
  const [detectedAnomalies, setDetectedAnomalies] = useState(3);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
      if (Math.random() < 0.1) {
        setDetectedAnomalies(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-green-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">BankWatch</h1>
            <div className="ml-auto">
              <Link to="/signin">
                <Button variant="outline" className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-xl text-slate-300 mb-2">Continuous Guard - Behavior-Based Authentication</p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Advanced behavioral analytics and continuous authentication for mobile banking security
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-slate-400 text-sm">Active Sessions</p>
                <p className="text-2xl font-bold text-white">{activeUsers.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center gap-3">
              <Shield className={`h-8 w-8 ${getRiskColor(currentRiskLevel)}`} />
              <div>
                <p className="text-slate-400 text-sm">Risk Level</p>
                <Badge variant={currentRiskLevel === 'low' ? 'default' : currentRiskLevel === 'medium' ? 'secondary' : 'destructive'}>
                  {currentRiskLevel.toUpperCase()}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-orange-400" />
              <div>
                <p className="text-slate-400 text-sm">Active Anomalies</p>
                <p className="text-2xl font-bold text-white">{detectedAnomalies}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-slate-400 text-sm">False Positives</p>
                <p className="text-2xl font-bold text-white">0.12%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600">Dashboard</TabsTrigger>
            <TabsTrigger value="risk" className="data-[state=active]:bg-blue-600">Risk Assessment</TabsTrigger>
            <TabsTrigger value="anomalies" className="data-[state=active]:bg-blue-600">Anomaly Detection</TabsTrigger>
            <TabsTrigger value="patterns" className="data-[state=active]:bg-blue-600">User Patterns</TabsTrigger>
            <TabsTrigger value="responses" className="data-[state=active]:bg-blue-600">Adaptive Responses</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <BehavioralDashboard />
          </TabsContent>

          <TabsContent value="risk">
            <RiskAssessment onRiskLevelChange={setCurrentRiskLevel} />
          </TabsContent>

          <TabsContent value="anomalies">
            <AnomalyDetection />
          </TabsContent>

          <TabsContent value="patterns">
            <UserPatterns />
          </TabsContent>

          <TabsContent value="responses">
            <AdaptiveResponses />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
