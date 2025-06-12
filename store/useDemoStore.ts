// store/useDemoStore.ts - UPDATED (исправляем проблему с временем)
import { create } from 'zustand';

interface DemoState {
  // Excel Demo
  excelData: Array<{
    branch: string;
    jan: number;
    feb: number;
    mar: number;
    total: number;
    percentage: number;
  }>;
  excelProgress: number;
  excelLogs: Array<{
    timestamp: string;
    message: string;
    type: 'info' | 'success' | 'error';
  }>;
  
  // Kaspi Demo
  kaspiProducts: Array<{
    id: string;
    name: string;
    price: number;
    rating: number;
    seller: string;
  }>;
  kaspiProgress: number;
  kaspiStats: {
    found: number;
    avgPrice: number;
    speed: number;
  };
  
  // WhatsApp Demo
  whatsappMessages: Array<{
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: string;
  }>;
  whatsappStats: {
    messages: number;
    responseTime: number;
    orders: number;
    satisfaction: number;
  };
  botActive: boolean;
  
  // AI Demo
  aiAnalysisResults: Array<{
    type: 'insight' | 'recommendation' | 'metric';
    title: string;
    description: string;
    priority?: 'high' | 'medium' | 'low';
    impact?: string;
  }>;
  aiProgress: number;
  
  // Integration Demo
  integrationProgress: number;
  syncStats: {
    products: number;
    prices: number;
    stock: number;
    customers: number;
  };
  
  // Actions
  updateExcelData: (data: DemoState['excelData']) => void;
  setExcelProgress: (progress: number) => void;
  addExcelLog: (log: Omit<DemoState['excelLogs'][0], 'timestamp'>) => void;
  
  addKaspiProduct: (product: DemoState['kaspiProducts'][0]) => void;
  updateKaspiStats: (stats: Partial<DemoState['kaspiStats']>) => void;
  
  addWhatsappMessage: (message: Omit<DemoState['whatsappMessages'][0], 'id' | 'timestamp'>) => void;
  updateWhatsappStats: (stats: Partial<DemoState['whatsappStats']>) => void;
  setBotActive: (active: boolean) => void;
  
  setAiResults: (results: DemoState['aiAnalysisResults']) => void;
  setAiProgress: (progress: number) => void;
  
  setIntegrationProgress: (progress: number) => void;
  updateSyncStats: (stats: Partial<DemoState['syncStats']>) => void;
  
  resetDemo: (demoType: string) => void;
}

// Функция для получения времени только на клиенте
const getClientTime = () => {
  if (typeof window === 'undefined') return '--:--:--';
  return new Date().toLocaleTimeString('ru-RU');
};

const getClientTimeShort = () => {
  if (typeof window === 'undefined') return '--:--';
  return new Date().toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const useDemoStore = create<DemoState>((set, get) => ({
  // Initial states
  excelData: [
    { branch: 'Алматы', jan: 0, feb: 0, mar: 0, total: 0, percentage: 0 },
    { branch: 'Астана', jan: 0, feb: 0, mar: 0, total: 0, percentage: 0 },
    { branch: 'Шымкент', jan: 0, feb: 0, mar: 0, total: 0, percentage: 0 },
  ],
  excelProgress: 0,
  excelLogs: [
    {
      timestamp: '--:--:--',
      message: 'Система готова к автоматизации...',
      type: 'info',
    },
  ],
  
  kaspiProducts: [],
  kaspiProgress: 0,
  kaspiStats: { found: 0, avgPrice: 0, speed: 0 },
  
  whatsappMessages: [],
  whatsappStats: { messages: 0, responseTime: 2.3, orders: 0, satisfaction: 97 },
  botActive: false,
  
  aiAnalysisResults: [],
  aiProgress: 0,
  
  integrationProgress: 0,
  syncStats: { products: 0, prices: 0, stock: 0, customers: 0 },
  
  // Actions
  updateExcelData: (data) => set({ excelData: data }),
  setExcelProgress: (progress) => set({ excelProgress: progress }),
  addExcelLog: (log) =>
    set((state) => ({
      excelLogs: [
        ...state.excelLogs,
        {
          ...log,
          timestamp: getClientTime(),
        },
      ],
    })),
    
  addKaspiProduct: (product) =>
    set((state) => ({
      kaspiProducts: [...state.kaspiProducts, product],
    })),
  updateKaspiStats: (stats) =>
    set((state) => ({
      kaspiStats: { ...state.kaspiStats, ...stats },
    })),
    
  addWhatsappMessage: (message) => {
    const id = Math.random().toString(36).substr(2, 9);
    const timestamp = getClientTimeShort();
    
    set((state) => ({
      whatsappMessages: [
        ...state.whatsappMessages,
        { ...message, id, timestamp },
      ],
      whatsappStats: {
        ...state.whatsappStats,
        messages: state.whatsappStats.messages + 1,
      },
    }));
  },
  updateWhatsappStats: (stats) =>
    set((state) => ({
      whatsappStats: { ...state.whatsappStats, ...stats },
    })),
  setBotActive: (active) => set({ botActive: active }),
  
  setAiResults: (results) => set({ aiAnalysisResults: results }),
  setAiProgress: (progress) => set({ aiProgress: progress }),
  
  setIntegrationProgress: (progress) => set({ integrationProgress: progress }),
  updateSyncStats: (stats) =>
    set((state) => ({
      syncStats: { ...state.syncStats, ...stats },
    })),
    
  resetDemo: (demoType) => {
    switch (demoType) {
      case 'excel':
        set({
          excelData: [
            { branch: 'Алматы', jan: 0, feb: 0, mar: 0, total: 0, percentage: 0 },
            { branch: 'Астана', jan: 0, feb: 0, mar: 0, total: 0, percentage: 0 },
            { branch: 'Шымкент', jan: 0, feb: 0, mar: 0, total: 0, percentage: 0 },
          ],
          excelProgress: 0,
          excelLogs: [
            {
              timestamp: getClientTime(),
              message: 'Система готова к автоматизации...',
              type: 'info',
            },
          ],
        });
        break;
      case 'kaspi':
        set({
          kaspiProducts: [],
          kaspiProgress: 0,
          kaspiStats: { found: 0, avgPrice: 0, speed: 0 },
        });
        break;
      case 'whatsapp':
        set({
          whatsappMessages: [],
          whatsappStats: { messages: 0, responseTime: 2.3, orders: 0, satisfaction: 97 },
          
        });
        break;
      case 'ai':
        set({
          aiAnalysisResults: [],
          aiProgress: 0,
        });
        break;
      case 'integration':
        set({
          integrationProgress: 0,
          syncStats: { products: 0, prices: 0, stock: 0, customers: 0 },
        });
        break;
    }
  },
}));