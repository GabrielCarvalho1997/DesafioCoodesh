import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios from 'axios';

export type EmailState = {
    id: string,
    expiresAt: string,
    addresses: [
        {
            id: string,
            address: string
        }
    ]
    
}

const initialState: EmailState = {
    id: '',
    expiresAt: '',
    addresses: [
        {
            id: '',
            address: ''
        }
    ]
}

export const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.id = action.payload.id;
            state.expiresAt = action.payload.expiresAt;
            state.addresses = action.payload.addresses;
        }
    }
})

export const fetchEmail = createAsyncThunk("email/fetchEmail", async (_, { dispatch }) => {
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com'; // URL do CORS Anywhere

    const apiUrl = 'https://dropmail.me/api/graphql/MY_TOKEN';

    const query = 'mutation {introduceSession {id, expiresAt, addresses{id, address}}}';

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    try {
        const response = await axios.post(
            `${corsAnywhereUrl}/${apiUrl}`,
            `query=${query}`,
            axiosConfig
        );
        dispatch(emailActions.setEmail(response.data.data.introduceSession));
    } catch (error) {
        console.error("Erro ao chamar a API:", error);
    }
});

export default emailSlice.reducer;

export const emailActions = emailSlice.actions;

export const useEmailState = (state: RootState) => state.email;
