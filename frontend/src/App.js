import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from './react-envelope/contexts/ThemeContext';
import { useAuth } from './react-envelope/hooks/useAuth';
import AuthProvider from './react-envelope/contexts/AuthContext';
import { Router } from './components/utils/Router';
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <SnackbarProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router/>
        </AuthProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
