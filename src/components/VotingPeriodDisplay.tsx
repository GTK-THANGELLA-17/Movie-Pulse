import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VotingPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  description: string;
  phase: string;
  totalDays: number;
  remainingDays?: number;
}

interface VotingPeriodData {
  current: VotingPeriod;
  next: VotingPeriod;
  timezone: string;
  serverTime: string;
}

const VotingPeriodDisplay = () => {
  const [periodData, setPeriodData] = useState<VotingPeriodData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVotingPeriod = async () => {
      try {
        const response = await fetch('/api/voting-period/current');
        const data = await response.json();
        if (data.success) {
          setPeriodData(data.data);
        }
      } catch (error) {
        console.error('Error fetching voting period:', error);
        // Fallback data
        setPeriodData({
          current: {
            id: 'current-period',
            name: 'Global Opinion Collection',
            startDate: '2025-08-01T00:00:00Z',
            endDate: '2025-08-15T23:59:59Z',
            isActive: true,
            description: 'Collecting global audience preferences',
            phase: 'active',
            totalDays: 15,
            remainingDays: 5
          },
          next: {
            id: 'next-period',
            name: 'Next Collection Phase',
            startDate: '2025-09-01T00:00:00Z',
            endDate: '2025-09-15T23:59:59Z',
            isActive: false,
            description: 'Next phase of insights collection',
            phase: 'upcoming',
            totalDays: 15
          },
          timezone: 'UTC',
          serverTime: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVotingPeriod();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!periodData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid md:grid-cols-2 gap-6 mb-8"
    >
      {/* Current Period */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Current Voting Period
            </CardTitle>
            <Badge variant={periodData.current.isActive ? "default" : "secondary"}>
              {periodData.current.isActive ? "Active" : "Ended"}
            </Badge>
          </div>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            {periodData.current.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">
              {formatDate(periodData.current.startDate)} - {formatDate(periodData.current.endDate)}
            </span>
          </div>
          
          {periodData.current.remainingDays !== undefined && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">
                {periodData.current.remainingDays > 0 
                  ? `${periodData.current.remainingDays} days remaining`
                  : 'Period has ended'
                }
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-purple-500" />
            <span className="text-gray-700 dark:text-gray-300">
              Global participation across all platforms
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Next Period */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Next Voting Period
            </CardTitle>
            <Badge variant="outline">
              Upcoming
            </Badge>
          </div>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            {periodData.next.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-green-500" />
            <span className="text-gray-700 dark:text-gray-300">
              {formatDate(periodData.next.startDate)} - {formatDate(periodData.next.endDate)}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-teal-500" />
            <span className="text-gray-700 dark:text-gray-300">
              Enhanced features and expanded categories
            </span>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 p-3 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Get ready for the next phase of global entertainment insights collection with improved analytics and more content categories.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VotingPeriodDisplay;