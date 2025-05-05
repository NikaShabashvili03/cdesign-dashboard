import { create } from 'zustand';
import { axiosV1 } from '../utils/axios'; // Axios instance with withCredentials enabled
import { persist } from 'zustand/middleware';
import type { SafeRenovation } from '../types';

interface RenovationStore {
    data: SafeRenovation[] | [];
    singleData: SafeRenovation | null
    loading: boolean;
    error: string | null;

    fetchRenovations: () => Promise<void>;
    fetchRenovationSignle: (track: string) => Promise<void>;
}

export const useRenovationStore = create<RenovationStore>()(
    persist(
        (set) => ({
            data: [],
            singleData: null,
            loading: false,
            error: null,

            fetchRenovations: async () => {
                try {
                    set({ loading: true, error: null, singleData: null });
                    const res = await axiosV1.get("/renovation/view");

                    set({ data: res.data })
                } catch (err: any) {
                    set({ error: err.response?.data?.detail || 'Something went wrong.' });
                } finally {
                    set({ loading: false });
                }
            },
            fetchRenovationSignle: async ( track ) => {
                try {
                    set({ loading: true, error: null, data: [] });
                    const res = await axiosV1.get(`/renovation/view/${track}`);

                    set({ singleData: res.data })
                } catch (err: any) {
                    set({ error: err.response?.data?.detail || 'Something went wrong.' });
                } finally {
                    set({ loading: false });
                }
            }
        }),
        {
            name: 'renovation-storage'
        }
    )
)