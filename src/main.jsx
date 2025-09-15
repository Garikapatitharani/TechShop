import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { HashRouter } from 'react-router-dom'
import { store } from './rtk-store/store.js'
import { Provider } from 'react-redux'
import { ProductsProvider } from './contextAPI/ProductsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </HashRouter>
    </Provider>
  </StrictMode>,
)