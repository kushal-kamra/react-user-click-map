import './App.css';
import React, { useState } from "react";

function App() {
  const [points, setPoints] = useState([]);
  const [popped, setPopped] = useState([]);

  function handlePlaceCircle(e) {
    const { clientX, clientY } = e;
    setPoints([
      ...points,
      {
        clientX,
        clientY
      }
    ]);
  }

  function handleUndo() {
    let newPoints = [...points];
    const poppedPoint = newPoints.pop();
    if (!poppedPoint) return;
    setPopped([...popped, poppedPoint]);
    setPoints([
      ...newPoints
    ])
  }

  function handleRedo() {
    const newPopped = [...popped];
    const poppedPoint = newPopped.pop();
    setPopped([...newPopped]);
    setPoints([...points, poppedPoint]);
  }

  return (
    <div>
      <button onClick={handleUndo}>Undo</button>
      <button disabled={popped.length == 0} onClick={handleRedo}>Redo</button>
      <div className="App"
        onClick={handlePlaceCircle}
      >
        {
          points.map((point, idx) => (
            <div key={idx} className='point' style={{
              left: point.clientX + 'px',
              top: point.clientY + 'px',
            }}>
              
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
