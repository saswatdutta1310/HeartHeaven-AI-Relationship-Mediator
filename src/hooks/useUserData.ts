import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface UserStats {
    conflicts: { date: string; count: number }[];
    emotions: { date: string; positive: number; negative: number }[];
    toxicPatternsFound: number;
    greenFlagsFound: number;
    lastCheckIn: string | null;
    insights: string[];
}

const DEFAULT_STATS: UserStats = {
    conflicts: [],
    emotions: [],
    toxicPatternsFound: 0,
    greenFlagsFound: 0,
    lastCheckIn: null,
    insights: [
        "Welcome to HeartHeaven! Your journey starts here.",
        "Try the 'Safe Space' for your first check-in.",
    ],
};

export function useUserData() {
    const { user } = useAuth();
    const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);

    // Load data on mount or user change
    useEffect(() => {
        if (!user) {
            setStats(DEFAULT_STATS);
            return;
        }

        const key = `heartsync_data_${user.email}`;
        const saved = localStorage.getItem(key);

        if (saved) {
            try {
                setStats(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse user data", e);
                setStats(DEFAULT_STATS);
            }
        } else {
            // New user! Initialize empty stats
            setStats(DEFAULT_STATS);
            localStorage.setItem(key, JSON.stringify(DEFAULT_STATS));
        }
    }, [user]);

    // Helper to save stats
    const saveStats = (newStats: UserStats) => {
        if (!user) return;
        setStats(newStats);
        localStorage.setItem(`heartsync_data_${user.email}`, JSON.stringify(newStats));
    };

    // Actions to update data
    const addConflict = () => {
        const today = new Date().toISOString().split('T')[0];
        const newStats = { ...stats };

        const dayEntry = newStats.conflicts.find(c => c.date === today);
        if (dayEntry) {
            dayEntry.count += 1;
        } else {
            newStats.conflicts.push({ date: today, count: 1 });
        }

        // Keep only last 30 days
        if (newStats.conflicts.length > 30) newStats.conflicts.shift();

        saveStats(newStats);
    };

    const logEmotion = (type: 'positive' | 'negative') => {
        const today = new Date().toISOString().split('T')[0];
        const newStats = { ...stats };

        let dayEntry = newStats.emotions.find(e => e.date === today);
        if (!dayEntry) {
            dayEntry = { date: today, positive: 0, negative: 0 };
            newStats.emotions.push(dayEntry);
        }

        if (type === 'positive') dayEntry.positive += 1;
        else dayEntry.negative += 1;

        newStats.lastCheckIn = new Date().toISOString();
        saveStats(newStats);
    };

    const updateFlags = (toxic: number, green: number) => {
        const newStats = { ...stats };
        newStats.toxicPatternsFound = toxic;
        newStats.greenFlagsFound = green;

        if (toxic > 3) {
            if (!newStats.insights.includes("High count of potential red flags detected.")) {
                newStats.insights.unshift("High count of potential red flags detected.");
            }
        }
        if (green > 3) {
            if (!newStats.insights.includes("Great job identifying healthy patterns!")) {
                newStats.insights.unshift("Great job identifying healthy patterns!");
            }
        }

        // Limit insights to 5
        if (newStats.insights.length > 5) newStats.insights.pop();

        saveStats(newStats);
    };

    return {
        stats,
        addConflict,
        logEmotion,
        updateFlags
    };
}
