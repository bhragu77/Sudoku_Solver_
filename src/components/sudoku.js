import React, { useEffect } from 'react';
import './sudoku.css';

function Sudoku({mode,matrixSize}) {

    let divs=[];
    let time=0;


    const handleReset=()=>{
        let report=document.getElementById("report");
        report.innerHTML="";
        let errors=document.getElementById("errors");
        errors.innerHTML="";
        let inputs=document.querySelectorAll(".sudukoInput");
        for(let i=0;i<inputs.length;i++){
            inputs[i].value='';
            inputs[i].disabled=false;
            if(inputs[i].classList.contains("fixedNumber")) inputs[i].classList.remove("fixedNumber");
        }
    }




    function isValidSudoku(board,N){
    let unique = Array(N+1).fill(false);
    // console.log(board);
    for(let i = 0; i < N; i++)
    {
        unique = Array(N+1).fill(false);
        for(let j = 0; j < N; j++)
        {
            let Z = board[i][j].value;
            // console.log(Z);
            if (Z!=="" && unique[Z])
            {
                return false;
            }
            unique[Z] = true;
        }
    }
    // console.log("ok");
    for(let i = 0; i < N; i++)
    {
        unique = Array(N+1).fill(false);
        for(let j = 0; j < N; j++)
        {
            let Z = board[j][i].value;
            if (Z!=="" && unique[Z])
            {
                return false;
            }
            unique[Z] = true;
        }
    }

    let root=(N===9)?3:2;
    for(let i = 0; i < root; i += 1)
    {
        for(let j = 0; j < root; j += 1)
        {
            unique = Array(N+1).fill(false);
            for(let k = 0; k < root; k++)
            {
                for(let l = 0; l < root; l++)
                {
                    let X = i*root + k;
                    let Y = j*root + l;
                    let Z = board[X][Y].value;
                    if (Z!=="" && unique[Z])
                    {
                        return false;
                    }
                    unique[Z] = true;
                }
            }
        }
    }
    return true;
}

    const isValid=(board, row, col, k,root)=> {
        for (let i = 0; i < matrixSize; i++) {
            const m = root * Math.floor(row / root) + Math.floor(i / root);
            const n = root * Math.floor(col / root) + i % root;

            if((board[row][i].value!=='' && parseInt(board[row][i].value) === k) || (board[i][col].value!=='' && parseInt(board[i][col].value) === k) || (board[m][n].value!=='' && parseInt(board[m][n].value) === k)) return false;
        }
        return true;
    }
    
    
    const sudokuSolver=(data,root)=> {
      for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
          if (data[i][j].value === '') {
            for (let k = 1; k <= matrixSize; k++) {
              if (isValid(data, i, j, k,root)) {
                data[i][j].value = `${k}`;
              if (sudokuSolver(data,root)=== true) {
               return true;
              } else {
               data[i][j].value = '';
              }
             }
           }
           return false;
         }
       }
     }
     return true;
    }

    const solveSudoku=()=>{
        time=0;
        let report=document.getElementById("report");
        report.innerHTML="";
        let errors=document.getElementById("errors");
        errors.innerHTML="";
        let inputs=document.querySelectorAll(".sudukoInput");
        let check=false;
        let newInputs=Array(matrixSize).fill().map(() => Array(matrixSize));
        // let matrix=Array(matrixSize).fill().map(() => Array(matrixSize));
        for(let i=0;i<inputs.length;i++){
            if(inputs[i].value!=='' && (parseInt(inputs[i].value)>matrixSize || parseInt(inputs[i].value)<1)) {
              check=true;
            } else if(inputs[i].value!==''){
              inputs[i].classList.add("fixedNumber");
            }
            newInputs[parseInt(i/matrixSize)][i%matrixSize]=inputs[i];
            inputs[i].disabled=true;
        }
        let blockSize=(matrixSize===9)?3:2;
        if(check===true){
            errors.innerHTML=`Kindly enter numbers between 1-${(matrixSize===9)?"9":"4"}`;
            return;
        }

        
        let flag=isValidSudoku(newInputs,matrixSize);
        // console.log(flag);
        // for(let i=0;i<matrixSize;i++){
        //   for(let j=0;j<matrixSize;j++){
        //     console.log(newInputs[i][j].value);
        //   }
        // }
        if(flag===false){
          handleReset();
          errors.innerHTML="Sudoku not solvable";
          return;
        } else{
        sudokuSolver(newInputs,blockSize);
        for(let i=0;i<matrixSize;i++){
          for(let j=0;j<matrixSize;j++){
            if(!newInputs[i][j].classList.contains("fixedNumber")){
            let temp=newInputs[i][j].value;
            newInputs[i][j].value="";
            
            setTimeout(()=>{
              newInputs[i][j].value=temp;
            },100*time);
            time+=1;
          }
        }
      }
      setTimeout(()=>{
        report.innerHTML="Suduko Solved!!";
      },100*time);
    }
    }


  useEffect(()=>{
    let errors=document.getElementById("errors");
        errors.innerHTML="";
    let cont=document.getElementById("emptyMat");
    cont.innerHTML="";
    divs=[];
    for(let i=0;i<matrixSize;i++){
        divs[i]=document.createElement("div");
        for(let j=0;j<matrixSize;j++){
            let x = document.createElement("INPUT");
            x.setAttribute("type", "number");
            x.setAttribute("min", "1");
            x.setAttribute("placeholder","-");
            x.setAttribute("class","sudukoInput")
            x.setAttribute("max",matrixSize);
            divs[i].appendChild(x);
        }
        cont.appendChild(divs[i]);
    }
  },[matrixSize])
  return (
    <div className='sudoku'>
        <div id="emptyMat"></div>
        <div className='btns'>
        <button onClick={solveSudoku}>Submit</button>
        <button onClick={handleReset}>Reset</button>
        </div>
        <div id="errors"></div>
        <div id="report"></div>
    </div>
  )
}

export default Sudoku
