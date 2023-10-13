import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios from 'axios';

export type EmailState = {
    email: string;
}

const initialState: EmailState = {
    email: ''
}

export const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        }
    }
})

export const fetchEmail = createAsyncThunk("email/fetchEmail", async (_, { dispatch }) => {
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com'; // URL do CORS Anywhere

    const apiUrl = 'https://dropmail.me/api/graphql/MY_TOKEN';

    const graphqlQuery = 'mutation {introduceSession {id, expiresAt, addresses{id, address}}}';

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    try {
        const response = await axios.post(
            `${corsAnywhereUrl}/${apiUrl}`,
            `query=${graphqlQuery}`,
            axiosConfig
        );
        console.log(response.data);
        // Mude o tipo do parâmetro dispatch() para AsyncThunkAction
        dispatch(emailActions.setEmail(response.data.data.introduceSession.addresses[0].address));
    } catch (error) {
        console.error("Erro ao chamar a API GraphQL:", error);
    }
});

export default emailSlice.reducer;

export const emailActions = emailSlice.actions;

export const useEmailState = (state: RootState) => state.email;
