import { create } from 'zustand';
import { axiosV1 } from '../utils/axios'; // Axios instance with withCredentials enabled
import { persist } from 'zustand/middleware';
import type { SafeRenovation, SafeStage } from '../types';
import toast from 'react-hot-toast';
import i18n from '../i18n';

interface StageStore {
    data: SafeStage[] | [];
    loading: boolean;
    error: string | null;

    fetchStages: (serviceId: number) => Promise<void>;
    uploadStageImages: (stageId: number, formData: FormData, setSelectedStage: any) => Promise<void>;
    completeStage: (stageId: number, setSelectedStage: any) => Promise<void>;
    deleteStageImage: (imageId: number, setSelectedStage: any) => Promise<void>;
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

            deleteStageImage: async (imageId, setSelectedStage) => {
                try {
                    set({ loading: true, error: null });
                    const res = await axiosV1.delete(`/stage/image/${imageId}`);
                    
                    const updatedStage = res.data;
                    
                    set((state) => ({
                        data: state.data.map((stage) =>
                            stage.id === updatedStage.id ? updatedStage : stage
                        )
                    }));
                    
                    toast.success(i18n.t("success"))
                    setSelectedStage(updatedStage)
                } catch (err: any) {
                    toast.error(i18n.t("something_went_wrong"))
                    set({ error: err.response?.data?.detail || 'Something went wrong.' });
                } finally {
                    set({ loading: false });
                }
            },

            completeStage: async (stageId, setSelectedStage) => {
                try {
                    set({ loading: true, error: null });
                    const res = await axiosV1.post(`/stage/complete/${stageId}`);
                    
                    const updatedStage = res.data;
                    set((state) => ({
                        data: state.data.map((stage) =>
                            stage.id === updatedStage.id ? updatedStage : stage
                        )
                    }));
                    toast.success(i18n.t("success"))
                    
                    setSelectedStage(null)
                } catch (err: any) {
                    toast.error(i18n.t("something_went_wrong"))
                    set({ error: err.response?.data?.detail || 'Something went wrong.' });
                } finally {
                    set({ loading: false });
                }
            },

            uploadStageImages: async (stageId, formData, setSelectedStage) => {
                try {
                    set({ loading: true, error: null });
                    const res = await axiosV1.post(`/stage/upload/image/${stageId}`, formData, {
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
                    toast.success(i18n.t("success"))
                    setSelectedStage(updatedStage || null)
                } catch (err: any) {
                    toast.error(i18n.t("something_went_wrong"))
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