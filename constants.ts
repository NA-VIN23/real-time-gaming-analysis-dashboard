import { Platform } from './types';

export const MAX_DATA_POINTS = 60;
export const UPDATE_INTERVAL_MS = 2000;
export const EMA_ALPHA = 0.3; // Smoothing factor for EMA calculation

export const PLATFORMS: Platform[] = ['mobile', 'console', 'cloud'];

export const PLATFORM_CONFIG: { [key in Platform]: { name: string; color: string; predictedColor: string; baseUsers: number } } = {
  mobile: { name: 'Mobile', color: '#3b82f6', predictedColor: '#93c5fd', baseUsers: 50000 },
  console: { name: 'Console', color: '#22c55e', predictedColor: '#86efac', baseUsers: 35000 },
  cloud: { name: 'Cloud', color: '#f97316', predictedColor: '#fdba74', baseUsers: 15000 },
};

export const SUGGESTIONS = {
  rising: {
    mobile: "User growth is strong. Prioritize server capacity and monitor for engagement drops.",
    console: "High console engagement. Consider launching targeted promotions or events.",
    cloud: "Cloud gaming is trending up. Ensure low-latency network performance is maintained."
  },
  falling: {
    mobile: "Mobile user count is decreasing. Investigate recent app updates or marketing campaigns.",
    console: "Console activity is declining. Analyze player feedback and consider a content update.",
    cloud: "Cloud usage is down. Check for streaming quality issues or competitor promotions."
  },
  stable: {
    mobile: "Mobile user base is stable. Focus on retention strategies and feature enhancements.",
    console: "Console user count is steady. A good time to poll players for feature requests.",
    cloud: "Cloud platform is stable. Explore partnership opportunities to expand reach."
  }
};
