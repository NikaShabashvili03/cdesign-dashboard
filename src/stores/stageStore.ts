import { create } from 'zustand';
import { axiosV1 } from '../utils/axios'; // Axios instance with withCredentials enabled
import { persist } from 'zustand/middleware';
import type { SafeRenovation, SafeStage } from '../types';


interface StageStore {
    data: SafeStage[] | [];
    loading: boolean;
    error: string | null;

    fetchStages: (serviceId: number) => Promise<void>;
    completeStage: (stageId: number, formData: FormData, onClose: () => void) => Promise<void>;
}



export const useStageStore = create<StageStore>()(
    persist(
        (set) => ({
            data: [],
            loading: false,
            error: null,

            fetchStages: async (serviceId) => {
                try {
                    set({ loading: true, error: null });
                    const res = await axiosV1.get(`/stage/view?serviceId=${serviceId}`);

                    set({ data: res.data })
                } catch (err: any) {
                    set({ error: err.response?.data?.detail || 'Something went wrong.' });
                } finally {
                    set({ loading: false });
                }
            },

            completeStage: async (stageId, formData, onClose) => {
                try {
                    set({ loading: true, error: null });
                    const res = await axiosV1.patch(`/stage/complete/${stageId}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    
                    const updatedStage = res.data;

                    set((state) => ({
                        data: state.data.map((stage) =>
                            stage.id === updatedStage.id ? updatedStage : stage
                        )
                    }));
                    onClose()
                } catch (err: any) {
                    set({ error: err.response?.data?.detail || 'Something went wrong.' });
                } finally {
                    set({ loading: false });
                }
            }
        }),
        {
            name: 'stage-storage'
        }
    )
)