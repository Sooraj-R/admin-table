import createSagaMiddleware, { END } from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { applyMiddleware, compose, createStore } from 'redux';

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const enhancers = [];
const middleware = [sagaMiddleware];
let inDevEnvironment = true;

if (inDevEnvironment) {
    const devToolsExtension = (typeof window).devToolsExtension;
    if (typeof devToolsExtension === 'function') {
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
export { store };