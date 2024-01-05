import React, { useState, useEffect } from "react";
import { Provider } from 'react-redux';
import { store } from './redux/Store-config';
import AdminContainer from './container/AdminContainer'
import './App.css'

const App = () => {

  return (
    <Provider store={store}>
      <AdminContainer />
    </Provider>

  );
};

export default App;