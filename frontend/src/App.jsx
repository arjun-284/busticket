import './App.css'
import Layout from "./components/Layouts/Layout.jsx";
import AuthProvider from './components/context/AuthContext.jsx';
import { LanguageProvider } from './components/context/LanguageContext.jsx'; // Correct: use curly braces and full path!

function App() {
    return (
        <LanguageProvider>
            <AuthProvider>
                <Layout />
            </AuthProvider>
        </LanguageProvider>
    );
}

export default App;
