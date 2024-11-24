import { createContext, useContext, useState } from "react";
export interface Style{
    backgroundColor:string|null,
backgroundGradient:string,
codeEditorColor:string,
primaryTextColor:string,
primaryTextFont:string,
width:number,
positionX:number,
positionY:number
height:number,
dropShadow:string,
parentHeight:number,
parentWidth:number,
}
interface StyleContextProps {
style:Style,
setStyle:(style:any)=>void
}
export const StyleContext = createContext<StyleContextProps>({
  style:{
    backgroundColor:null,
    backgroundGradient:'linear-gradient(to right, red, orange, yellow, green, blue)',
    codeEditorColor:'#282C34FF',
    primaryTextColor:'white',
    primaryTextFont:'"Fira code", "Fira Mono", monospace',
    height:300,
    dropShadow:'rgb(38, 57, 77) 0px 20px 30px -10px',
    positionX:100,
    positionY:100,
    width:300,
    parentHeight:700,
    parentWidth:700,
  },
  setStyle:(style:any)=>{}
});

const StyleContextProvider:React.FC<{children:React.ReactNode}> = ({children})=>{
    const [style,setStyle] = useState<Style>({
        backgroundColor:null,
        backgroundGradient:'linear-gradient(to right, #FF6767FF, #FF6767FF, #FF6767FF)',
        codeEditorColor:'#282C34FF',
        primaryTextColor:'white',
        primaryTextFont:'"Fira code", "Fira Mono", monospace',
        height:300,
        dropShadow:'rgb(38, 57, 77) 0px 20px 30px -10px',
        positionX:100,
        positionY:100,
        width:300,
        parentHeight:700,
        parentWidth:700,
    })
return(
    <StyleContext.Provider value={{
        style:style,setStyle:setStyle
  }}>
      {children}
  </StyleContext.Provider>
)
}

export default StyleContextProvider;