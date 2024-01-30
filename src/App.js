import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Sudoku from './components/sudoku';
import nosize from './pictures/nosize.png';

function App() {
  
  let [mode,setMode]=useState("Dark");
  let [matrixSize,setMatrixSize]=useState(0);
  
  
  
  return (
    <div className="App">
      <Navbar mode={mode} setMode={setMode} matrixSize={matrixSize} setMatrixSize={setMatrixSize} />
      {matrixSize===0 && <div className='NOSIZE'><p>Kindly select Sudoku size</p><img src={nosize} alt="" /></div>}
      {matrixSize!==0 && <Sudoku mode={mode} setMode={setMode} matrixSize={matrixSize} />}
    </div>
  );
}

export default App;
