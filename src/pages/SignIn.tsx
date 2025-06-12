
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Building, User, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'customer' | 'bank'>('customer');
  const navigate = useNavigate();

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email sign in:', { email, password, userType });
    // Simulate authentication success
    navigate('/');
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in for:', userType);
    // Simulate Google authentication
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">BankWatch</h1>
          </div>
          <p className="text-slate-300">Secure Access Portal</p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-center text-white">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'customer' | 'bank')} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                <TabsTrigger value="customer" className="data-[state=active]:bg-blue-600 text-white">
                  <User className="h-4 w-4 mr-2" />
                  Customer
                </TabsTrigger>
                <TabsTrigger value="bank" className="data-[state=active]:bg-blue-600 text-white">
                  <Building className="h-4 w-4 mr-2" />
                  Bank Staff
                </TabsTrigger>
              </TabsList>

              <TabsContent value="customer" className="space-y-4">
                <div className="text-center text-slate-300 text-sm mb-4">
                  Access your banking dashboard with behavioral authentication
                </div>
                
                {/* Google Sign In */}
                <Button 
                  onClick={handleGoogleSignIn}
                  variant="outline" 
                  className="w-full bg-white text-slate-900 hover:bg-slate-100 border-slate-300"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-800 px-2 text-slate-400">Or continue with</span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-email" className="text-slate-300">Email</Label>
                    <Input
                      id="customer-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-password" className="text-slate-300">Password</Label>
                    <Input
                      id="customer-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Sign In as Customer
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="bank" className="space-y-4">
                <div className="text-center text-slate-300 text-sm mb-4">
                  Bank employee access to administrative dashboard
                </div>
                
                {/* Google Sign In for Bank */}
                <Button 
                  onClick={handleGoogleSignIn}
                  variant="outline" 
                  className="w-full bg-white text-slate-900 hover:bg-slate-100 border-slate-300"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Continue with Google (Bank Domain)
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-800 px-2 text-slate-400">Or continue with</span>
                  </div>
                </div>

                {/* Email/Password Form for Bank */}
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bank-email" className="text-slate-300">Bank Email</Label>
                    <Input
                      id="bank-email"
                      type="email"
                      placeholder="employee@bank.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bank-password" className="text-slate-300">Password</Label>
                    <Input
                      id="bank-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Sign In as Bank Staff
                  </Button>
                </form>

                <div className="text-xs text-slate-400 text-center">
                  Bank staff access requires valid employee credentials
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-slate-400">
              Protected by BankWatch behavioral authentication
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
