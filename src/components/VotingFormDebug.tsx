
import { useEffect } from 'react';
import { checkServerHealth } from '@/api/opinionsApi';

export function VotingFormDebug() {
  useEffect(() => {
    const logDebugInfo = async () => {
      try {
        // Check server health
        const isServerHealthy = await checkServerHealth();
        console.log(`🔄 Server health status: ${isServerHealthy ? 'Healthy' : 'Unhealthy'}`);
        
        // Check if VotingForm has been patched
        const isVotingFormPatched = 
          typeof window !== 'undefined' && 
          window.VotingForm && 
          window.VotingForm.needsPatch === false;
          
        console.log(`🛠️ VotingForm patched: ${isVotingFormPatched ? 'Yes' : 'No'}`);
        
        // Log current form state for debugging
        if (typeof window !== 'undefined' && window.VotingForm?.state) {
          console.log('🔍 Current form state:', window.VotingForm.state);
          
          // Specifically log Television fields
          if (window.VotingForm.state.projectType === 'Television') {
            console.log('📺 Television fields:', {
              country: window.VotingForm.state.country,
              televisionChannel: window.VotingForm.state.televisionChannel,
              televisionContentType: window.VotingForm.state.televisionContentType,
              notes: window.VotingForm.state.notes
            });
          }
          
          // Log OTT fields
          if (window.VotingForm.state.projectType === 'OTTPlatform') {
            console.log('🎬 OTT fields:', {
              country: window.VotingForm.state.country,
              filmIndustry: window.VotingForm.state.filmIndustry,
              ottPlatform: window.VotingForm.state.ottPlatform,
              genre: window.VotingForm.state.genre,
              notes: window.VotingForm.state.notes
            });
          }
          
          // Log YouTube Content fields
          if (window.VotingForm.state.projectType === 'YouTubeContent') {
            console.log('🎥 YouTube Content fields:', {
              country: window.VotingForm.state.country,
              youtubeContentCategory: window.VotingForm.state.youtubeContentCategory,
              notes: window.VotingForm.state.notes
            });
          }
        }
        
        // Log locally stored opinions
        const storedOpinions: any[] = [];
        if (typeof localStorage !== 'undefined') {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('Audience-Pulse-opinion-')) {
              try {
                const opinion = JSON.parse(localStorage.getItem(key) || '{}');
                storedOpinions.push(opinion);
                
                // Log television opinions specifically
                if (opinion.projectType === 'Television') {
                  console.log('📺 Stored TV opinion:', {
                    televisionChannel: opinion.televisionChannel,
                    televisionContentType: opinion.televisionContentType,
                    country: opinion.country
                  });
                }
              } catch (error) {
                console.error(`Error parsing stored opinion at key ${key}:`, error);
              }
            }
          }
        }
        
        console.log(`🗄️ Found ${storedOpinions.length} locally stored opinions`);
        
        // Log vote tracking data
        if (typeof localStorage !== 'undefined') {
          const votesData = localStorage.getItem('Audience-Pulse-votes');
          console.log('📊 Vote tracking data:', votesData ? JSON.parse(votesData) : 'None');
        }
        
        // Check for form validation issues
        const formElement = document.getElementById('voting-form');
        if (formElement) {
          const inputs = formElement.querySelectorAll('select, input, textarea');
          console.log(`📝 Form has ${inputs.length} input elements`);
          
          // Check for television-specific elements
          const tvChannelSelect = document.getElementById('television-channel');
          const tvContentSelect = document.getElementById('television-content-type');
          
          if (tvChannelSelect) {
            console.log('📺 TV Channel select found:', tvChannelSelect.getAttribute('value'));
          } else {
            console.log('❌ TV Channel select NOT found');
          }
          
          if (tvContentSelect) {
            console.log('📺 TV Content Type select found:', tvContentSelect.getAttribute('value'));
          } else {
            console.log('❌ TV Content Type select NOT found');
          }
        }
        
      } catch (error) {
        console.error('❌ Debug info error:', error);
      }
    };
    
    logDebugInfo();
    
    // Set up polling for debug info every 30 seconds
    const interval = setInterval(logDebugInfo, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // This is a debug-only component, doesn't render anything
  return null;
}

export default VotingFormDebug;
