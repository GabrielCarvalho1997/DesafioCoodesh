import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "store/index";

export type ConfigState = {
    nome: string;
}


const initialState: ConfigState = {
    nome: 'teste'

}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        
     }
})

export default configSlice.reducer;

export const configActions = configSlice.actions;


export const useConfigState = (state: RootState) => state.config;
