
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { AlertTriangle, Shield, Eye, MapPin, Clock, Smartphone } from 'lucide-react';

interface RiskAssessmentProps {
  onRiskLevelChange: (level: string) => void;
}

const RiskAssessment = ({ onRiskLevelChange }: RiskAssessmentProps) => {
  const [overallRisk, setOverallRisk] = useState(23);
  const [riskFactors, setRiskFactors] = useState([
    { name: 'Location Anomaly', risk: 15, severity: 'low', icon: MapPin },
    { name: 'Unusual Timing', risk: 8, severity: 'low', icon: Clock },
    { name: 'Device Changes', risk: 0, severity: 'none', icon: Smartphone },
    { name: 'Behavior Deviation', risk: 12, severity: 'low', icon: Eye },
  ]);

  const riskDistribution = [
    { name: 'Low Risk', value: 78, color: '#10b981' },
    { name: 'Medium Risk', value: 19, color: '#f59e0b' },
    { name: 'High Risk', value: 3, color: '#ef4444' },
  ];

  const riskTrends = [
    { hour: '00:00', low: 85, medium: 12, high: 3 },
    { hour: '06:00', low: 82, medium: 15, high: 3 },
    { hour: '12:00', low: 75, medium: 20, high: 5 },
    { hour: '18:00', low: 78, medium: 18, high: 4 },
    { hour: '24:00', low: 83, medium: 14, high: 3 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate risk fluctuations
      const newRisk = Math.max(0, Math.min(100, overallRisk + (Math.random() - 0.5) * 10));
      setOverallRisk(Math.round(newRisk));
      
      // Update risk level based on overall risk
      if (newRisk < 30) {
        onRiskLevelChange('low');
      } else if (newRisk < 70) {
        onRiskLevelChange('medium');
      } else {
        onRiskLevelChange('high');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [overallRisk, onRiskLevelChange]);

  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-400';
    if (risk < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Risk Score */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Overall Risk Score</h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className={`text-4xl font-bold ${getRiskColor(overallRisk)}`}>
                {overallRisk}%
              </div>
              <Progress value={overallRisk} className="mt-4" />
            </div>
            <Badge variant={overallRisk < 30 ? 'default' : overallRisk < 70 ? 'secondary' : 'destructive'}>
              {overallRisk < 30 ? 'LOW RISK' : overallRisk < 70 ? 'MEDIUM RISK' : 'HIGH RISK'}
            </Badge>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Risk Distribution</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
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
            {riskDistribution.map((item, index) => (
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

      {/* Risk Factors */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Active Risk Factors</h3>
          <Button variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Mitigate Risks
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskFactors.map((factor, index) => {
            const IconComponent = factor.icon;
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <IconComponent className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-white font-medium">{factor.name}</p>
                    <p className="text-sm text-slate-400">Risk: {factor.risk}%</p>
                  </div>
                </div>
                <Badge variant={getRiskBadgeVariant(factor.severity)}>
                  {factor.severity.toUpperCase()}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Risk Trends */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Risk Trends (24 Hours)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Bar dataKey="low" stackId="risk" fill="#10b981" name="Low Risk" />
              <Bar dataKey="medium" stackId="risk" fill="#f59e0b" name="Medium Risk" />
              <Bar dataKey="high" stackId="risk" fill="#ef4444" name="High Risk" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Alert Panel */}
      {overallRisk > 50 && (
        <Card className="bg-red-900/20 border-red-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <h3 className="text-xl font-semibold text-red-400">High Risk Alert</h3>
          </div>
          <p className="text-slate-300 mb-4">
            Elevated risk level detected. Consider implementing additional authentication measures.
          </p>
          <div className="flex gap-2">
            <Button variant="destructive" size="sm">
              Trigger MFA
            </Button>
            <Button variant="outline" size="sm">
              Limit Session
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RiskAssessment;
