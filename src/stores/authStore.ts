import { create } from 'zustand';
import { axiosV3 } from '../utils/axios'; // Axios instance with withCredentials enabled
import { persist } from 'zustand/middleware';
import type { SafeUser } from '../types';
import i18n from '../i18n';
import toast from 'react-hot-toast';


interface AuthState {
  user: SafeUser | null;
  loading: boolean;
  error: string | null;
  isAuth: boolean;

  login: (email: string, password: string) => Promise<void>;
  resetPassword: ({ currentPassword, newPassword }: { currentPassword: string, newPassword: string}) => Promise<void>;
  fetchProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      isAuth: false,

      login: async (email, password) => {
        try {
          set({ loading: true, error: null });
          await axiosV3.post('supervisor/login', { email, password });

          await get().fetchProfile();
          set({ isAuth: true });
          toast.success(i18n.t("success"))
        } catch (err: any) {
          toast.error(i18n.t("something_went_wrong"))
          set({ error: err.response?.data?.detail || 'Login failed', isAuth: false });
        } finally {
          set({ loading: false });
        }
      },

      resetPassword: async ({ currentPassword, newPassword }) => {
        try {
          set({ loading: true, error: null });
          await axiosV3.post('supervisor/change-password', { 
              prev_password: currentPassword,
              new_password: newPassword
          });

          toast.success(i18n.t("success"))
        } catch (err: any) {
          toast.error(i18n.t("something_went_wrong"))
          set({ error: err.response?.data?.detail || 'Something went wrong' });
        } finally {
          set({ loading: false });
        }

      },

      fetchProfile: async () => {
        try {
          set({ loading: true, error: null });
          const res = await axiosV3.get('supervisor/profile');

          set({ user: res.data, isAuth: true });
        } catch (err: any) {
          set({ error: err.response?.data?.detail || 'Failed to fetch profile', isAuth: false });
        } finally {
          set({ loading: false, error: null });
        }
      },

      logout: async () => {
        try {
          set({ loading: true })
          await axiosV3.post('supervisor/logout');
          toast.success(i18n.t("success"))
        } catch (err) {
          console.warn('Logout request failed');
          toast.error(i18n.t("something_went_wrong"))
        } finally {
          set({ user: null, isAuth: false, loading: false, error: null });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ isAuth: state.isAuth }),
    }
  )
);
