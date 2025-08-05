
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertTriangle, Play, Server, Database, Zap, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { runFullDiagnostic, performBackendHealthCheck, testOpinionSubmission, testDataRetrieval } from '@/utils/backendHealthCheck';

// Hidden component - backend health is only accessible to developers
const BackendDiagnostic = () => {
  // Return null to hide from public users
  return null;
  const [isRunning, setIsRunning] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);
  const [lastRun, setLastRun] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>('online');

  // Auto-refresh functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(() => {
        runDiagnostic();
      }, 30000); // Run every 30 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  // Check network connection
  useEffect(() => {
    const handleOnline = () => setConnectionStatus('online');
    const handleOffline = () => setConnectionStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Run initial diagnostic on component mount
  useEffect(() => {
    runDiagnostic();
  }, []);

  const runDiagnostic = async () => {
    setIsRunning(true);
    try {
      console.log('🚀 Starting comprehensive backend diagnostic...');
      const result = await runFullDiagnostic();
      setDiagnosticResult(result);
      setLastRun(new Date().toLocaleString());
      console.log('✅ Backend Diagnostic Complete:', result);
      
      // Show notification based on result
      if (result.overallStatus === 'PRODUCTION_READY') {
        console.log('🎉 Backend is fully operational!');
      } else {
        console.warn('⚠️ Backend needs attention:', result.recommendations);
      }
    } catch (error) {
      console.error('❌ Diagnostic failed:', error);
      setDiagnosticResult({
        overallStatus: 'ERROR',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        recommendations: ['Check network connection', 'Verify backend server is running']
      });
    }
    setIsRunning(false);
  };

  const runQuickTest = async (testType: 'health' | 'submission' | 'retrieval') => {
    setIsRunning(true);
    try {
      let result;
      switch (testType) {
        case 'health':
          result = await performBackendHealthCheck();
          console.log('Health check result:', result);
          break;
        case 'submission':
          result = await testOpinionSubmission();
          console.log('Submission test result:', result);
          break;
        case 'retrieval':
          result = await testDataRetrieval();
          console.log('Retrieval test result:', result);
          break;
      }
    } catch (error) {
      console.error(`${testType} test failed:`, error);
    }
    setIsRunning(false);
  };

  const getStatusIcon = (status: string | boolean) => {
    if (status === 'healthy' || status === 'PRODUCTION_READY' || status === true) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (status === 'unhealthy' || status === 'NEEDS_ATTENTION' || status === false) {
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    } else if (status === 'error' || status === 'ERROR') {
      return <XCircle className="w-5 h-5 text-red-500" />;
    } else {
      return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string | boolean) => {
    if (status === 'healthy' || status === 'PRODUCTION_READY' || status === true) {
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
    } else if (status === 'unhealthy' || status === 'NEEDS_ATTENTION' || status === false) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
    } else if (status === 'error' || status === 'ERROR') {
      return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
    }
  };

  return (
    <Card className="w-full border-2 border-primary/10 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b">
        <CardTitle className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Server className="w-6 h-6 text-blue-500" />
            <span>Backend Health Diagnostic</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            {connectionStatus === 'online' ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <Badge variant={connectionStatus === 'online' ? 'default' : 'destructive'}>
              {connectionStatus}
            </Badge>
          </div>
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Comprehensive test of backend functionality and API endpoints
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? 'bg-primary/10 border-primary' : ''}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto
            </Button>
            <Button 
              onClick={runDiagnostic} 
              disabled={isRunning}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Play className={`w-4 h-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
              {isRunning ? 'Running...' : 'Run Full Diagnostic'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6">
        {lastRun && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <CheckCircle className="w-4 h-4" />
            Last run: {lastRun}
            {autoRefresh && <Badge variant="outline" className="ml-2">Auto-refresh ON</Badge>}
          </div>
        )}

        {diagnosticResult && (
          <div className="space-y-6">
            {/* Overall Status */}
            <Alert className={`border-2 ${getStatusColor(diagnosticResult.overallStatus)}`}>
              <div className="flex items-center gap-3">
                {getStatusIcon(diagnosticResult.overallStatus)}
                <AlertDescription className="font-medium text-base">
                  Backend Status: <span className="font-bold">{diagnosticResult.overallStatus}</span>
                </AlertDescription>
              </div>
            </Alert>

            {/* Quick Test Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => runQuickTest('health')}
                disabled={isRunning}
                className="flex items-center gap-2"
              >
                <Server className="w-4 h-4" />
                Test Health
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => runQuickTest('submission')}
                disabled={isRunning}
                className="flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Test Submission
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => runQuickTest('retrieval')}
                disabled={isRunning}
                className="flex items-center gap-2"
              >
                <Database className="w-4 h-4" />
                Test Retrieval
              </Button>
            </div>

            {/* Core Tests */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-5 h-5 text-purple-500" />
                    <span className="font-medium">Data Retrieval</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(diagnosticResult.retrievalTest)}
                    <Badge className={getStatusColor(diagnosticResult.retrievalTest)}>
                      {diagnosticResult.retrievalTest ? 'Working' : 'Failed'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">Opinion Submission</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(diagnosticResult.submissionTest)}
                    <Badge className={getStatusColor(diagnosticResult.submissionTest)}>
                      {diagnosticResult.submissionTest ? 'Working' : 'Failed'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Server className="w-5 h-5 text-green-500" />
                    <span className="font-medium">API Health</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(diagnosticResult.healthCheck?.overall)}
                    <Badge className={getStatusColor(diagnosticResult.healthCheck?.overall)}>
                      {diagnosticResult.healthCheck?.overall || 'Unknown'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Endpoint Details */}
            {diagnosticResult.healthCheck?.endpoints && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    API Endpoints Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {diagnosticResult.healthCheck.endpoints.map((endpoint: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border-2 rounded-lg bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(endpoint.status)}
                          <div>
                            <div className="text-sm font-mono font-medium">
                              {endpoint.endpoint.replace(diagnosticResult.healthCheck.apiUrl, '')}
                            </div>
                            {endpoint.error && (
                              <div className="text-xs text-red-500 mt-1">{endpoint.error}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {endpoint.responseTime}ms
                          </Badge>
                          {endpoint.statusCode && (
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                endpoint.statusCode >= 200 && endpoint.statusCode < 300 
                                  ? 'text-green-600 border-green-300' 
                                  : 'text-red-600 border-red-300'
                              }`}
                            >
                              {endpoint.statusCode}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {diagnosticResult.recommendations && diagnosticResult.recommendations.length > 0 && (
              <Card className="border-2 border-yellow-200 dark:border-yellow-800">
                <CardHeader>
                  <CardTitle className="text-lg text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {diagnosticResult.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Configuration */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">API URL:</span>
                    <div className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mt-1 break-all">
                      {diagnosticResult.healthCheck?.apiUrl || 'Not available'}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Environment:</span>
                    <div className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mt-1">
                      {import.meta.env.MODE || 'development'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!diagnosticResult && !isRunning && (
          <div className="text-center py-16 text-gray-500">
            <Server className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">Backend Diagnostic Ready</p>
            <p className="text-sm">Click "Run Full Diagnostic" to test backend functionality</p>
          </div>
        )}

        {isRunning && !diagnosticResult && (
          <div className="text-center py-16">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg font-medium text-primary">Running Comprehensive Tests...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BackendDiagnostic;
