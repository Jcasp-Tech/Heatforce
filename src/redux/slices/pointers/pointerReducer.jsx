import { createSlice } from '@reduxjs/toolkit';

const pointerslices=createSlice({
    name:'pointer',
    initialState:{mapDrawingModePointer:'none'}
    ,
    reducers:{
        setPointers:(state,action)=>{
            console.log("action.payload",action.payload,{...state,...action.payload})
            return {...state,...action.payload}
        }
    }
})
export const {setPointers}=pointerslices.actions
export default pointerslices.reducer