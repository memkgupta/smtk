import { useEffect, useRef, useState } from 'react'
import Editor from 'react-simple-code-editor';
import download from "downloadjs"
import { toPng } from 'html-to-image';
//@ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism.css';
import '../App.css'

const CodeContainer = ({onMouseDown}:{onMouseDown:any}) => {
    const [code, setCode] = useState(
        `function add(a, b) {\n  return a + b;\n}`
      );
      const fileNameRef = useRef<HTMLDivElement>(null)
    const [fileName,setFileName] = useState('untitled');
    const [isEditingFileName,setIsEditingFileName] = useState(false);
      const [lines,setLines] = useState(1);
      // const [bgColor,setBgColor] = useState<string>("#282C34FF");
      const [style,setStyle] = useState<any>(
        {
          backgroundColor : "#282C34FF",
        
          marginTop:"10px",
          
          overflowY:"visible",
          fontFamily: '"Fira code", "Fira Mono", monospace',
          color:'white',
         
          fontSize:'17.5px',
        }
      )
      const downloadPng = ()=>{
        toPng(document.getElementById('main')!!)
      .then(function (dataUrl:any) {
      download(dataUrl)
      });
      }
      useEffect(()=>{
        // console.log(code.split("\n").length)
        setLines(code.split('\n').length);
      },[code])
  return (
    
    <div id='main' className='h-full w-full grid overflow-y-clip'style={{ gridTemplateRows: "auto 1fr" }} >
    <div className='head row-span-1 max-h-[150px]' onMouseDown={fileNameRef.current!==document.activeElement?onMouseDown:()=>{}}>
  <div className='file-name' onMouseDown={(e)=>{e.stopPropagation()}} ref={fileNameRef} >
{ <input type='text' className='bg-transparent w-auto font-bold text-sm px-2 focus:outline-none' value={fileName} onChange={(e)=>{setFileName(e.target.value)}}></input>}
  </div>
  <div className='plus-icon'>+</div>
  <div className='t-dots'>
    <div className='red-dot'></div>
    <div className='yellow-dot'></div>
    <div className='green-dot'></div>
  </div>
</div>
<div className='code-container flex-grow'>
  <div className='line-numbers ' style={
    {
        textAlign: "left",
        paddingRight: "10px",
        paddingLeft:"10px",
        color: "#888",
        userSelect: "none",
        fontFamily: "monospace",
    }
  }>
{
 Array.from({length:lines},(v:any,index)=>(
  <div key={index}className='mt-2' ><div  style={{fontSize:"17.5px",maxHeight:'20px',paddingTop:'1px',paddingBottom:'1px'}}>{index+1}</div></div>
 ))

}
  </div>
  <div className='editor'>
  <Editor 
  
      value={code}
      maxLength={200}
      onValueChange={code => {setCode(code)}}
      highlight={code => highlight(code, languages.java)}
      padding={5}
      style={style}
    />
  </div>

</div>
    </div>

   
    
  )
}

export default CodeContainer