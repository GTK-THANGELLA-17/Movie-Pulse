
import { useState, useEffect } from 'react';
import { useVotingPeriod as useVotingPeriodContext } from '@/contexts/VotingPeriodContext';

export const useVotingPeriodWithId = () => {
  const context = useVotingPeriodContext();
  
  // Generate a stable period ID that doesn't change constantly
  const getStablePeriodId = () => {
    // Use the voting period dates to create a stable ID
    if (context.votingPeriod.startDate && context.votingPeriod.endDate) {
      const startDate = new Date(context.votingPeriod.startDate).toISOString().split('T')[0];
      const endDate = new Date(context.votingPeriod.endDate).toISOString().split('T')[0];
      return `${startDate}-${endDate}`;
    }
    
    // Fallback to a monthly period if no specific dates are set
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  return {
    ...context,
    currentPeriodId: getStablePeriodId()
  };
};
