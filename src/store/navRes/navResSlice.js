import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    navTran: 1,
    isOpen: false
}

const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        changeNav: (state, action) => {
            state.navTran = action.payload
        },
        changeIsOpen: (state, action) => {
            state.isOpen = action.payload
        }
    }
})

export const { changeNav, changeIsOpen } = navSlice.actions;
export default navSlice.reducer;