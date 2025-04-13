import { h, render } from 'preact';
import './styles.css';

const App = () => {
  return (
    <div className="app">
      <h1>{HELLO} World!</h1>
      <p>This is a simple example using webpack with:</p>
      <ul>
        <li>SWC for fast JavaScript compilation</li>
        <li>CSS loading with style-loader and css-loader</li>
        <li>Preact as a lightweight React alternative</li>
        <li>Webpack DefinePlugin for global constants</li>
      </ul>
    </div>
  );
};

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('root'));
}); 