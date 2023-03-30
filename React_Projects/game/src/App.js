import React,{useEffect, useRef, useState} from 'react'
import './App.css';

function App() {
  const [val,setVal]=useState("Start")
  const [top,setTop]=useState("")
  const [left,setLeft]=useState("")
  const [count,setCount]=useState(0);
  const [timer,setTimer]=useState("time left : 20");
  const [score,setScore]=useState("");
  const refEle=useRef(null);
  const handleVal=()=>{
    setVal(String.fromCharCode(65+parseInt(Math.random()*100)%26))
    let h=visualViewport.height;
    let w=visualViewport.width;
    console.log(timer)
    console.log(count)
    setCount(count+1);
    setTop(50+parseInt(Math.random()*1000)%(h-200))
    setLeft(parseInt(Math.random()*10000)%(w-200))
    refEle.current.style.top=top+"px";
    refEle.current.style.left=left+"px";
  }
  
  useEffect(() => {
    const interval = setInterval(
        () => {
          if(count===0 || timer==="Time UP!!"){return clearInterval(interval);}
          if(parseInt(timer.split(" ")[timer.split(" ").length-1])===0){
            setTimer("Time UP!!")
            setScore("your score you bitch : "+ count);
            refEle.current.style.display="none";
            return clearInterval(interval)}
          setTimer("time left : "+parseInt(timer.split(" ")[timer.split(" ").length-1])-1);
          clearInterval(interval);
        },1000);
}, [timer,handleVal,count]);


  useEffect(()=>{
    
    document.addEventListener('keypress',detectKeyDown);
    return ()=>document.removeEventListener('keypress',detectKeyDown);
  })
  const detectKeyDown=(e)=>{
        if(val==="Start"){
          handleVal();
        }
        else if(val!== "Start" && e.code.substring(3)===val)
        {handleVal();}
  }
  return (
    <div className="App" onKeyUp={handleVal}>
      <div className='timer'><h2>{timer}</h2></div>
      <div className='timer'><h1>{score}</h1></div>
      <div className="element" ref={refEle}>{val}</div>
    </div>
  );
}

export default App;
