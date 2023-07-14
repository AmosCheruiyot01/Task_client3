import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ContextProvider } from './components/context/userContext/context.jsx'
// import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   {/* <Provider */}
    <ContextProvider>
      <App />
    </ContextProvider>
    {/* </Provider> */}
  </React.StrictMode>,
)
