import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ToastProvider} from './components/common/ToastContext';
import {AuthProvider} from './components/common/AuthContext';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ToastProvider>
            <AuthProvider>
                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    <App/>
                </DevSupport>
            </AuthProvider>
        </ToastProvider>
    </React.StrictMode>,
)
