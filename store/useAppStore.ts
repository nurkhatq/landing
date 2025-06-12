// store/useAppStore.ts - UPDATED (исправлена проблема с темой)
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { NotificationState } from '@/types';

interface AppState {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  initializeTheme: () => void;
  
  // Navigation
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  
  // Notifications
  notifications: NotificationState[];
  addNotification: (notification: Omit<NotificationState, 'id'>) => void;
  removeNotification: (id: string) => void;
  
  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Demo states
  activeDemo: string;
  setActiveDemo: (demo: string) => void;
  demoProgress: Record<string, number>;
  setDemoProgress: (demo: string, progress: number) => void;
  
  // Contact form
  contactFormData: {
    name: string;
    email: string;
    company: string;
    phone: string;
    service: string;
    message: string;
    budget: string;
    urgency: string;
  };
  updateContactForm: (data: Partial<AppState['contactFormData']>) => void;
  resetContactForm: () => void;
  
  // Services filter
  selectedServiceCategory: string;
  setSelectedServiceCategory: (category: string) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Theme
      theme: 'dark', // значение по умолчанию
      
      initializeTheme: () => {
        if (typeof window === 'undefined') return;
        
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        set({ theme: initialTheme as 'light' | 'dark' });
        document.documentElement.classList.toggle('dark', initialTheme === 'dark');
      },
      
      toggleTheme: () => {
        if (typeof window === 'undefined') return;
        
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        set({ theme: newTheme });
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      },

      // Navigation
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      activeSection: 'home',
      setActiveSection: (section) => set({ activeSection: section }),

      // Notifications
      notifications: [],
      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification = { ...notification, id };
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));
        
        // Auto remove after duration
        setTimeout(() => {
          get().removeNotification(id);
        }, notification.duration || 5000);
      },
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      // Loading states
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),

      // Demo states
      activeDemo: 'excel',
      setActiveDemo: (demo) => set({ activeDemo: demo }),
      demoProgress: {},
      setDemoProgress: (demo, progress) =>
        set((state) => ({
          demoProgress: { ...state.demoProgress, [demo]: progress },
        })),

      // Contact form
      contactFormData: {
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: '',
        budget: '',
        urgency: '',
      },
      updateContactForm: (data) =>
        set((state) => ({
          contactFormData: { ...state.contactFormData, ...data },
        })),
      resetContactForm: () =>
        set({
          contactFormData: {
            name: '',
            email: '',
            company: '',
            phone: '',
            service: '',
            message: '',
            budget: '',
            urgency: '',
          },
        }),

      // Services filter
      selectedServiceCategory: 'all',
      setSelectedServiceCategory: (category) =>
        set({ selectedServiceCategory: category }),
    }),
    {
      name: 'nurkhattech-store',
    }
  )
);