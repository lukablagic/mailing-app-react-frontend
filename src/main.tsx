import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ToastProvider} from './utility/contexts/ToastContext';
import {AuthProvider} from './utility/contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ToastProvider>
            <AuthProvider>
                    <App />
            </AuthProvider>
        </ToastProvider>
    </React.StrictMode>,
)
