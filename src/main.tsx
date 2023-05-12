import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ToastProvider} from './components/common/ToastContext';
import {AuthProvider} from './components/common/AuthContext';
import {Container} from "react-bootstrap";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ToastProvider>
            <AuthProvider>
                    <App />
            </AuthProvider>
        </ToastProvider>
    </React.StrictMode>,
)
