import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {persist} from 'zustand/middleware'

type State = {
    user: {
        username: string,
        email: string,
    } | null
}

type Actions = {
    set: (user: State['user']) => void
}

export const useUserStore = create<State & Actions>()(
    persist(immer((set) => ({
            user: null,
            set: (user: State['user']) =>
                set((state) => {
                    state.user += user
                }),
        })),
        {
            name: 'user',
            onRehydrateStorage: (state) => {
                return (state, error) => {
                    if (error) {
                        console.log('an error happened during hydration', error)
                    } else {
                        console.log('hydration finished')
                    }
                }
            },
        },
    ),
)
