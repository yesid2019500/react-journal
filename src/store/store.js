import thunk from 'redux-thunk'

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { authReducer } from '../reducers/authReducer';
import { uidReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';

// vamos a poder aplicar midelwares con esta constante
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;



// este si puede recibir varios reducers
// es mejor utilizar el combineReducers ya que este recibe 
// muchos reducers y solo le pasamos este a el createStore
// auth es mi primer reducer
const reducers = combineReducers({
    auth: authReducer,
    ui: uidReducer,
    notes: notesReducer
})

// puede recibir solo un reducer
export const store = createStore(
    reducers,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    composeEnhancers(
    // este es un midelware para las peticiones asincronas
        applyMiddleware(thunk)
    )
);