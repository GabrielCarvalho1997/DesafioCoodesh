import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import emailReducer from "./email";
import inboxReducer from "./inbox";


const emailPersistConfig = {
    key: 'email',
    storage: storage,
}

const rootReducer = combineReducers({
    email: persistReducer(emailPersistConfig, emailReducer),
    inbox: inboxReducer,
})


export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
}, )

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppState: () => RootState = () => store.getState();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;