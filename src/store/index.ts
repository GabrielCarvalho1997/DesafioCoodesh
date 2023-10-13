import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import configReducer from "./config";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const configPersistConfig = {
    key: 'config',
    storage: storage,
    blacklist: ['auth']
}

const rootReducer = combineReducers({
    config: persistReducer(configPersistConfig, configReducer),
})


export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
}, )

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppState: () => RootState = () => store.getState();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;