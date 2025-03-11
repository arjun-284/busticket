import './App.css'
import Layout from "./components/Layouts/Layout.jsx";
import AuthProvider from './components/context/AuthContext.jsx';

function App() {
    return (
        <AuthProvider>
            <Layout />
        </AuthProvider>
    )
}

export default App