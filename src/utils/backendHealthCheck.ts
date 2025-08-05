// Backend Health Check and Diagnostic Tool
import { API_URL } from '@/api/core/apiClient';

interface HealthCheckResult {
  status: 'healthy' | 'unhealthy' | 'error';
  endpoint: string;
  responseTime: number;
  statusCode?: number;
  data?: any;
  error?: string;
}

interface BackendHealth {
  overall: 'healthy' | 'unhealthy' | 'error';
  endpoints: HealthCheckResult[];
  timestamp: string;
  apiUrl: string;
}

const checkEndpoint = async (endpoint: string, method: string = 'GET'): Promise<HealthCheckResult> => {
  const startTime = Date.now();
  
  try {
    console.log(`🔍 Testing endpoint: ${endpoint}`);
    
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    const responseTime = Date.now() - startTime;
    const data = response.ok ? await response.json() : null;
    
    const result: HealthCheckResult = {
      status: response.ok ? 'healthy' : 'unhealthy',
      endpoint,
      responseTime,
      statusCode: response.status,
      data,
      error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`
    };
    
    console.log(`✅ Endpoint ${endpoint}: ${result.status} (${responseTime}ms)`);
    return result;
    
  } catch (error) {
    const responseTime = Date.now() - startTime;
    const result: HealthCheckResult = {
      status: 'error',
      endpoint,
      responseTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    
    console.error(`❌ Endpoint ${endpoint}: ${result.error} (${responseTime}ms)`);
    return result;
  }
};

export const performBackendHealthCheck = async (): Promise<BackendHealth> => {
  console.log('🏥 Starting comprehensive backend health check...');
  console.log('📍 API Base URL:', API_URL);
  
  const endpoints = [
    // Basic health endpoints
    `${API_URL}/health`,
    `${API_URL}/opinions/health`,
    
    // Core functionality endpoints
    `${API_URL}/opinions`,
    `${API_URL}/opinions/stats/local`,
    `${API_URL}/opinions/stats/films`,
    `${API_URL}/opinions/stats/television`,
    `${API_URL}/opinions/stats/music`,
    `${API_URL}/opinions/stats/ott`,
    `${API_URL}/opinions/stats/youtube-content`,
    `${API_URL}/opinions/stats/instagram-content`,
    
    // Enhanced endpoints
    `${API_URL}/opinions/v2/enhanced-stats`,
    
    // Analytics endpoints
    `${API_URL}/opinions/analytics`,
    `${API_URL}/exclusive`,
    `${API_URL}/insights`,
  ];
  
  const results = await Promise.all(
    endpoints.map(endpoint => checkEndpoint(endpoint))
  );
  
  const healthyCount = results.filter(r => r.status === 'healthy').length;
  const overall = healthyCount > results.length / 2 ? 'healthy' : 
                  healthyCount > 0 ? 'unhealthy' : 'error';
  
  const healthReport: BackendHealth = {
    overall,
    endpoints: results,
    timestamp: new Date().toISOString(),
    apiUrl: API_URL
  };
  
  console.log('🏥 Backend health check completed:', {
    overall: healthReport.overall,
    healthy: healthyCount,
    total: results.length,
    successRate: `${((healthyCount / results.length) * 100).toFixed(1)}%`
  });
  
  return healthReport;
};

export const testOpinionSubmission = async (): Promise<boolean> => {
  console.log('📝 Testing opinion submission functionality...');
  
  try {
    // Test opinion submission with sample data
    const testOpinion = {
      projectType: 'Films',
      category: 'Films',
      filmIndustry: 'Hollywood',
      genre: 'Action',
      country: 'USA',
      demographics: {
        gender: 'Male',
        age: '25-34',
        region: 'North America'
      },
      notes: 'Test opinion for health check',
      question: 'What type of films do you prefer?',
      answer: 'Action films from Hollywood',
      userId: 'health-check-test-user',
      deviceInfo: {
        browser: 'Test Browser',
        os: 'Test OS',
        device: 'desktop'
      }
    };
    
    const response = await fetch(`${API_URL}/opinions/v2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testOpinion)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Opinion submission test: SUCCESS', result);
      return true;
    } else {
      const error = await response.text();
      console.log('⚠️ Opinion submission test: FAILED', response.status, error);
      return false;
    }
    
  } catch (error) {
    console.error('❌ Opinion submission test: ERROR', error);
    return false;
  }
};

export const testDataRetrieval = async (): Promise<boolean> => {
  console.log('📊 Testing data retrieval functionality...');
  
  try {
    // Test basic opinions retrieval
    const response = await fetch(`${API_URL}/opinions`);
    
    if (response.ok) {
      const opinions = await response.json();
      console.log('✅ Data retrieval test: SUCCESS', {
        opinionsCount: opinions.length,
        sample: opinions.slice(0, 3)
      });
      
      // Test if opinions have required fields
      if (opinions.length > 0) {
        const sampleOpinion = opinions[0];
        const hasRequiredFields = sampleOpinion.projectType && 
                                  sampleOpinion.country && 
                                  sampleOpinion.createdAt;
        
        if (hasRequiredFields) {
          console.log('✅ Opinion data structure: VALID');
          return true;
        } else {
          console.log('⚠️ Opinion data structure: MISSING FIELDS', sampleOpinion);
          return false;
        }
      }
      
      return true;
    } else {
      console.log('⚠️ Data retrieval test: FAILED', response.status);
      return false;
    }
    
  } catch (error) {
    console.error('❌ Data retrieval test: ERROR', error);
    return false;
  }
};

// Run full diagnostic
export const runFullDiagnostic = async () => {
  console.log('🔧 Running full backend diagnostic...');
  
  const healthCheck = await performBackendHealthCheck();
  const submissionTest = await testOpinionSubmission();
  const retrievalTest = await testDataRetrieval();
  
  const diagnosticResult = {
    healthCheck,
    submissionTest,
    retrievalTest,
    overallStatus: healthCheck.overall === 'healthy' && submissionTest && retrievalTest ? 'PRODUCTION_READY' : 'NEEDS_ATTENTION',
    recommendations: []
  };
  
  // Generate recommendations
  if (healthCheck.overall !== 'healthy') {
    diagnosticResult.recommendations.push('Backend endpoints are not responding correctly');
  }
  
  if (!submissionTest) {
    diagnosticResult.recommendations.push('Opinion submission functionality needs fixing');
  }
  
  if (!retrievalTest) {
    diagnosticResult.recommendations.push('Data retrieval functionality needs fixing');
  }
  
  console.log('🔧 Full diagnostic completed:', diagnosticResult);
  return diagnosticResult;
};