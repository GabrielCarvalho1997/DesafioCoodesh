import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios from 'axios';

export type InboxState = {
    mails: [
        {
            rawSize: number,
            fromAddr: string,
            toAddr: string,
            downloadUrl: string,
            text: string,
            headerSubject: string
        }
    ]
    
}

const initialState: InboxState= {
    mails: [
        {
            rawSize: 0,
            fromAddr: '',
            toAddr: '',
            downloadUrl: '',
            text: '',
            headerSubject: ''
        }
    ]
}

export const inboxSlice = createSlice({
    name: 'inbox',
    initialState,
    reducers: {
        setInbox: (state, action) => {
            state.mails = action.payload.mails;
        }
    }
})

export const searchInbox = createAsyncThunk("email/searchInbox", async (id: string, {dispatch}) => {
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com'; // URL do CORS Anywhere

    const apiUrl = 'https://dropmail.me/api/graphql/MY_TOKEN';

    const query = `
    query ($id: ID!) {
      session(id:$id) {
        mails {
          rawSize
          fromAddr
          toAddr
          downloadUrl
          text
          headerSubject
        }
      }
    }`;

    try {
        const response = await axios.post(
            `${corsAnywhereUrl}/${apiUrl}`,
            { query, variables: { id } },
        );
        dispatch(inboxActions.setInbox(response.data.data.session));
    } catch (error) {
        console.error("Erro ao chamar a API:", error);
    }
});

export default inboxSlice.reducer;

export const inboxActions = inboxSlice.actions;

export const useInboxState = (state: RootState) => state.inbox;
