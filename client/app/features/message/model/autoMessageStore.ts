import {create} from 'zustand';

interface AutoMessageState {
    isEnabled: boolean;
    toggleAutoMessage: () => void;
    setAutoMessage: (enabled: boolean) => void;
}

export const useAutoMessageStore = create<AutoMessageState>((set) => ({
    isEnabled: false,
    toggleAutoMessage: () => set((state) => ({isEnabled: !state.isEnabled})),
    setAutoMessage: (enabled) => set({isEnabled: enabled}),
})); 