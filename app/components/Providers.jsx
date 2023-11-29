'use client'

import { Provider } from "react-redux"
import configureAppStore from "../redux/store/configurestore"
import LayoutProvider from "./LayoutProvider"
import { AuthContextProvider } from "./context/AuthContext"
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureAppStore();

const Providers = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AuthContextProvider>
                    <LayoutProvider>
                        {children}
                    </LayoutProvider>
                </AuthContextProvider>
            </PersistGate>
        </Provider>
    )
}

export default Providers