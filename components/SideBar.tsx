import { DragEvent } from "react";

export const SideBar = () => {
    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <aside className="fixed top-0 left-0 z-50 flex flex-col h-screen px-4 py-6 space-y-4 bg-slate-300">
        <div className="p-2 text-center border-2 border-black rounded-lg dndnode startNode cursor-grab" onDragStart={(event) => onDragStart(event, 'startNode')} draggable>
          Start Node
        </div>
        <div className="p-2 text-center border-2 border-black rounded-lg dndnode cursor-grab" onDragStart={(event) => onDragStart(event, 'booleanQuestion')} draggable>
          Boolean Question
        </div>
        <div className="p-2 text-center border-2 border-black rounded-lg dndnode output cursor-grab" onDragStart={(event) => onDragStart(event, 'output')} draggable>
          Output Node
        </div>
      </aside>
    );
  };