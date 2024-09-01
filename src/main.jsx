import React from 'react'
import ReactDOM from 'react-dom';
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "./redux/store.js"
import MainLayout from "./components/MainLayout.jsx"

ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
    <MainLayout>
      <App />
    </MainLayout>
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);