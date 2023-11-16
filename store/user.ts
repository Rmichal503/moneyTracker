import { create } from 'zustand'


interface UserState {
    user_name: string,
    user_email: string,
    setUserName: (user_name: string) => void,
    setUserEmail: (user_email: string) => void,
}

export const useUserState = create<UserState>((set) => ({
    user_email: '',
    user_name: '',
    setUserEmail: (user_email) => {
        set(() => ({ user_email: user_email }))
    },
    setUserName: (user_name) => {
        set(() => ({ user_name: user_name }))
    },
}))