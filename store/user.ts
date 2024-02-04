import { create } from 'zustand'


interface UserState {
    user_name: string,
    user_email: string,
    setUserName: (user_name: string) => void,
    setUserEmail: (user_email: string) => void,
}
interface Expenses {
    user_name: string;
    created_at: number;
    label: string;
    value: number;
    id: number;
}
interface MockupCardState {
    expenses: Expenses[];
    expensesId:number;
    color: string;
    current_value: number;
    max_value: number;
    title: string;
}
interface MockupCardActions {
    setCurrentValue: (current_value: number) => void;
    setMaxValue: (max_value: number) => void;
    setTitle: (title: string) => void;
    setExpensesId: ()=> void;
    setExpenses: ({ user_name, created_at, label, value, id }: Expenses) => void;
    reset: ()=>void;

}
const initialState: MockupCardState={
    expenses: [],
    expensesId:1,
    color: 'lime',
    current_value: 0,
    max_value: 0,
    title: 'Spend Card'
}
export const useMockupCardState = create<MockupCardState & MockupCardActions>((set) => ({
    ...initialState,
    setCurrentValue: (current_value) => {
        set((state) => ({ current_value: state.current_value + current_value }))
    },
    setMaxValue: (max_value) => {
        set(() => ({ max_value: max_value }))
    },
    setTitle: (title) => {
        set(() => ({ title: title }))
    },
    setExpensesId:()=>{
        set((state)=>({expensesId:state.expensesId + 1}))
    },
    setExpenses: (expense) => {
        set((state) => ({ expenses: [...state.expenses, expense] }))
    },
    reset:()=>{
        set(initialState)
    }
}))

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