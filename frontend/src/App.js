import logo from './logo.svg';
import './App.css';
import { ThemeContext } from './react-envelope/contexts/ThemeContext';
import { useAuth } from './react-envelope/hooks/useAuth';
import { AuthContext } from './react-envelope/contexts/AuthContext';

function App() {
  const { user, login, logout, setUser } = useAuth();

  return (
      <ThemeContext.Provider>
        <AuthContext.Provider value={{ user, setUser }}>

        </AuthContext.Provider>
      </ThemeContext.Provider>
  );
}

export default App;
