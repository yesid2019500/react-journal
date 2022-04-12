import React from 'react';
import {Provider} from 'react-redux'
import { AppRouter } from './routes/AppRouter'
import { store } from './store/store';

export const JournalApp = () => {
  return (
    <Provider store={store}>
         <AppRouter/>
    </Provider>
  )
}

// version que estamos utilizando
// npm i react-router-dom@5.3.0