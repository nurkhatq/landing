// types/index.ts
export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'bots' | 'integration' | 'parsing' | 'ai' | 'automation';
  features: string[];
  demoType?: string;
  popular?: boolean;
  roi: string;
  timeline: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  size: string;
  problem: string;
  solution: string[];
  results: {
    savings: string;
    time: string;
    efficiency: string;
    roi: string;
  };
  quote: {
    text: string;
    author: string;
    position: string;
  };
  timeline: string;
  type: 'integration' | 'bot' | 'automation' | 'ai';
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  project: {
    type: string;
    duration: string;
    result: string;
  };
}

export interface DemoStep {
  id: string;
  title: string;
  description: string;
  delay: number;
  animation?: string;
}

export interface NotificationState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}