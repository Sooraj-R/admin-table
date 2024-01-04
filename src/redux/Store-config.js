import createSagaMiddleware, {END} from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import rootSaga from './sagas';
// import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import {applyMiddleware, compose, createStore} from 'redux';

// const sagaMiddleware = createSagaMiddleware();
// const initialState = {};
// const enhancers = [];
// const middleware = [sagaMiddleware];
// let inDevEnvironment = false;

// if (process && process.env.NODE_ENV === 'development') {
//   inDevEnvironment = true;
// }

// if(inDevEnvironment){
//     const devToolsExtension  = ( typeof window ).devToolsExtension;
//     if(typeof devToolsExtension === 'function'){
//         enhancers.push(devToolsExtension);
//     }
//     middleware.push(createLogger());
// }
// export const config = configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       thunk: false,
//       immutableCheck: false,
//       serializableCheck: false
//     }).concat(sagaMiddleware),
//   devTools: process.env.NODE_ENV !== 'production'
// });

// export const store = persistStore(config);
// sagaMiddleware.run(rootSaga);

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const enhancers = [];
const middleware = [sagaMiddleware];
let inDevEnvironment = true;

// if (process && process.env.NODE_ENV === 'development') {
//   inDevEnvironment = true;
// }

if(inDevEnvironment){
    const devToolsExtension  = ( typeof window).devToolsExtension;
    if(typeof devToolsExtension === 'function'){
        enhancers.push(devToolsExtension);
    }
    middleware.push(createLogger());
}

function configureStore() {
    const composeEnhancers = compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
);
const store = createStore(rootReducer, initialState, enhancer);
(store).close = () => store.dispatch(END);
sagaMiddleware.run(rootSaga);
return store;
}

const store = configureStore();
export {store};