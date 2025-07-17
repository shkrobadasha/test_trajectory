import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    carIdForRemove: undefined,
    isActive: false
};

const removeModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setRemoveModalActive(){},
        setIdForRemove(){},
    }
})

export const {setRemoveModalActive, setIdForRemove} = removeModalSlice.actions
export default removeModalSlice.reducer
