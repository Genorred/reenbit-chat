import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

interface State {
    value: string
}

type Actions = {
    set: (value: string) => void
}

export const useSearchStore = create<State & Actions>()(
    immer((set) => ({
            value: '',
            set: (value: string) =>
                set((state: State & Actions) => {
                    state.value = value
                }),
        })
    )
)
