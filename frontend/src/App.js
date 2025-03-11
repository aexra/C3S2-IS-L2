import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from './react-envelope/contexts/ThemeContext';
import { useAuth } from './react-envelope/hooks/useAuth';
import { AuthContext } from './react-envelope/contexts/AuthContext';
import { Router } from './components/utils/Router';
import { SnackbarProvider } from 'notistack'

function App() {
  const { user, login, logout, setUser } = useAuth();

  return (
    <SnackbarProvider>
      <ThemeProvider>
        <AuthContext.Provider value={{ user, setUser }}>
          <Router/>
        </AuthContext.Provider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
