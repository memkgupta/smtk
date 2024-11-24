import React, { useState, useCallback, useEffect, memo, useContext, Children, useRef } from "react";
import { Style, StyleContext } from "../context/StyleContext";
import CodeContainer from "./CodeContainer";

interface Position {
  x: number;
  y: number;
}

interface Dimensions {
  width: number;
  height: number;
}

interface DragStart {
  x: number;
  y: number;
}

interface ResizableMovableDivProps {
  initialWidth?: number;
  initialHeight?: number;
  initialX?: number;
  initialY?: number;
  minSize?: number;
  maxSize?: number;
  containerSize?: number;

}

const ResizableMovableDiv: React.FC<ResizableMovableDivProps> = ({
  minSize = 100,
  maxSize = 700,

  
}) => {
    const {style,setStyle} = useContext(StyleContext)
    const parentRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: style.width,
    height: style.height,
  });
  const [position, setPosition] = useState<Position>({
    x: style.positionX,
    y: style.positionY,
  });
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<DragStart>({ x: 0, y: 0 });
  // Add resizeStart state to track the initial dimensions when resizing begins
  const [resizeStart, setResizeStart] = useState<{ width: number; height: number; mouseX: number; mouseY: number } | null>(null);

  const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  };

  const handleMouseDownResize = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsResizing(true);
    // Store initial dimensions and mouse position when starting resize
    setResizeStart({
      width: style.width,
      height: style.height,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
    e.preventDefault();
  }, [style.width,style.height]);

  const handleMouseDownDrag = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - style.positionX,
      y: e.clientY - style.positionY,
    });
    e.preventDefault();
  }, [style.positionX,style.positionY]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing && resizeStart) {
      // Calculate the delta from the initial resize position
      const deltaX = e.clientX - resizeStart.mouseX;
      const deltaY = e.clientY - resizeStart.mouseY;
      const childRect = childRef.current?.getBoundingClientRect()
      const parentRect = parentRef.current?.getBoundingClientRect()
      
const nw = clamp(resizeStart.width + deltaX, minSize, maxSize);
const nh = clamp(resizeStart.height + deltaY, minSize, maxSize);
      setStyle((prev:Style)=>({...prev,width: ((deltaX<0?(childRect!.left>parentRect!.left+20):true) && (deltaX>0?childRect!.right<parentRect!.right-20:true))?nw:style.width,
        height: ((deltaY>0 ? childRect!.bottom<parentRect!.bottom-20 : true) && (deltaY<0?childRect!.top>parentRect!.top+20:true)?nh:style.height)}))
    } else if (isDragging) {
      setStyle((prev:Style)=>({...prev, positionX: clamp(e.clientX - dragStart.x, 0, style.parentWidth - style.width),
        positionY: clamp(e.clientY - dragStart.y, 0, style.parentHeight - style.height),}))
    }
  }, [isResizing, isDragging, dragStart, resizeStart, style.width,style.height, style.parentWidth,style.parentHeight, minSize, maxSize]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setIsDragging(false);
    setResizeStart(null);  // Clear resize start state
  }, []);

  useEffect(() => {
    const shouldAddListeners = isResizing || isDragging;

    if (shouldAddListeners) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className="relative mx-auto my-auto bg-gray-100 border border-gray-300 mt-12 rounded-md"
      style={{
        background:style.backgroundGradient,
        width: `${style.parentWidth}px`,
        height: `${style.parentHeight}px`,
        position: "relative",
      }}
      ref={parentRef}
    >
      <div
      ref={childRef}
        className="absolute border border-gray-400 bg-white shadow-lg overflow-hidden rounded-[40px]"
        style={{
          width: `${style.width}px`,
          boxShadow:style.dropShadow,
          height: `${style.height}px`,
          transform: `translate(${style.positionX}px, ${style.positionY}px)`,
          cursor: isDragging ? "grabbing" : "grab",
          transition: !isDragging && !isResizing ? 'transform 0.1s ease-out' : 'none',
        }}
      >
      

       
        <CodeContainer onMouseDown = {handleMouseDownDrag}/>
        <div
          className="absolute bottom-1 right-0 w-4 h-4 bg-blue-500 cursor-se-resize 
                     hover:bg-blue-600 transition-colors"
          onMouseDown={handleMouseDownResize}
        />
        </div>

       
      </div>

  );
};

export default memo(ResizableMovableDiv);