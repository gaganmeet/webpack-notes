import { h } from 'preact';
import { useState } from 'preact/hooks';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <div className="counter-buttons">
        <button onClick={() => setCount(count - 1)} className="btn">-</button>
        <button onClick={() => setCount(count + 1)} className="btn">+</button>
      </div>
    </div>
  );
};

export default Counter; 