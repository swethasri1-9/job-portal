import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css'; // Tailwind and theming
import './app.css';   // 👈 Add this line for animations and custom styles

import App from './App.jsx';

import { Provider } from 'react-redux';
import store from './redux/store.js';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { Toaster } from './components/ui/sonner.jsx';

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
