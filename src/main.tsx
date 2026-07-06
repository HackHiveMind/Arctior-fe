import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Analytics } from '@vercel/analytics/react'
import App from './App'
import ErrorFallback from './components/ErrorFallback'
import './index.css'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error('App error:', error, info);
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Analytics />
    </ErrorBoundary>
  </React.StrictMode>,
)
