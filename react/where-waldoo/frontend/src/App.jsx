import Game from './components/Game';
import ThemeSwitcher from './components/ThemeSwitcher';
import './App.css';

function App() {
  return (
    <div className="app">
      <ThemeSwitcher />
      <Game />
    </div>
  );
}

export default App;