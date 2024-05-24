import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import Layout from './components/Layout';
import AppRouter from './router/AppRouter';
function App() {
  return (
    <div className="App">
      <AppRouter/>
    </div>
  );
}

export default App;
