const express = require('express');
const router = express.Router();

// Get current voting period information
router.get('/current', (req, res) => {
  try {
    const currentPeriod = {
      id: 'voting-period-august-2025',
      name: 'August 2025 Global Opinion Collection',
      startDate: '2025-08-01T00:00:00Z',
      endDate: '2025-08-15T23:59:59Z',
      isActive: true,
      description: 'Collecting global audience preferences for entertainment content',
      phase: 'active',
      totalDays: 15,
      remainingDays: Math.max(0, Math.ceil((new Date('2025-08-15T23:59:59Z') - new Date()) / (1000 * 60 * 60 * 24)))
    };

    const nextPeriod = {
      id: 'voting-period-september-2025',
      name: 'September 2025 Global Opinion Collection',
      startDate: '2025-09-01T00:00:00Z',
      endDate: '2025-09-15T23:59:59Z',
      isActive: false,
      description: 'Next phase of global entertainment insights collection',
      phase: 'upcoming',
      totalDays: 15
    };

    res.json({
      success: true,
      data: {
        current: currentPeriod,
        next: nextPeriod,
        timezone: 'UTC',
        serverTime: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching voting period:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch voting period information'
    });
  }
});

// Get voting period status
router.get('/status', (req, res) => {
  try {
    const now = new Date();
    const currentEnd = new Date('2025-08-15T23:59:59Z');
    const nextStart = new Date('2025-09-01T00:00:00Z');
    
    let status = 'active';
    let message = 'Voting is currently active';
    
    if (now > currentEnd && now < nextStart) {
      status = 'break';
      message = 'Voting period is on break. Next period starts September 1st';
    } else if (now >= nextStart) {
      status = 'next-active';
      message = 'Next voting period is now active';
    }

    res.json({
      success: true,
      data: {
        status,
        message,
        currentPeriodActive: status === 'active' || status === 'next-active',
        nextPeriodDate: '2025-09-01',
        serverTime: now.toISOString()
      }
    });
  } catch (error) {
    console.error('Error checking voting period status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check voting period status'
    });
  }
});

module.exports = router;