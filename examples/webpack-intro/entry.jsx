import { h, render } from 'preact';
import Header from './components/Header';
import Counter from './components/Counter';
import './styles.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <h1>Welcome to Preact App</h1>
        <Counter />
      </main>
    </div>
  );
};

render(<App />, document.getElementById('root')); 