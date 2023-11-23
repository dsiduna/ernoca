'use client'

import { Provider } from "react-redux"
import configureAppStore from "../redux/store/configurestore"
import LayoutProvider from "./LayoutProvider"
import { AuthContextProvider } from "./context/AuthContext"

const { store, persistor } = configureAppStore();

const Providers = ({ children }) => {
    return (
        <Provider store={store}>
            <AuthContextProvider>
                <LayoutProvider>
                    {children}
                </LayoutProvider>
            </AuthContextProvider>
        </Provider>
    )
}

export default Providers