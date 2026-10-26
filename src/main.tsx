import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Persian UI face (Vazirmatn) first, then the Latin faces used by the brand wordmark.
import '@fontsource/vazirmatn/400.css'
import '@fontsource/vazirmatn/500.css'
import '@fontsource/vazirmatn/600.css'
import '@fontsource/vazirmatn/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'

import App from './App'
import { FavoritesProvider } from './context/FavoritesContext'
import { InquiryProvider } from './context/InquiryContext'
import './index.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root container #root was not found in index.html')
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <InquiryProvider>
          <App />
        </InquiryProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
