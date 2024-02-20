import storage from 'redux-persist/lib/storage';

import { createStore, combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist';
import { stayReducer } from './reducers/stay.reducer.js'
import { orderReducer } from './reducers/order.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { reviewReducer } from './reducers/review.reducer.js'
import { systemReducer } from './reducers/system.reducer.js'

const rootReducer = combineReducers({
    orderModule: orderReducer,
    stayModule: stayReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
})


const persistConfig = {
    key: 'root',
    storage,
};


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, middleware);
export const persistor = persistStore(store);


store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})



