
import React from 'react';
import CodeContainer from './components/CodeContainer';
import ResizeableComponent from './components/ResizableDiv';
import StyleContextProvider from './context/StyleContext';

function App() {
 
  
  return (
   <StyleContextProvider>
   
   <ResizeableComponent>
    
    </ResizeableComponent>
   {/* <CodeContainer/> */}
   </StyleContextProvider>
  )
}

export default App
