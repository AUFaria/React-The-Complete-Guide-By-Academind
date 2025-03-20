import { useImperativeHandle, useRef } from "react";

import formatDate from "../helpers/dateFormatter";

export default function EditProject({
 ref,
 project,
 onDeleteProject,
 onAddTask,
 onClearTask,
}) {
 const taskInputRef = useRef();

 useImperativeHandle(ref, () => {
  return {
   clearInput() {
    taskInputRef.current.value = "";
   },
  };
 });

 return (
  <section className="w-3/5 mx-auto flex flex-col pt-8">
   <div className="flex flex-row justify-between">
    <h2 className="text-4xl font-semibold text-stone-600">{project.title}</h2>
    <button
     onClick={onDeleteProject}
     className="border-2 border-red-400 rounded-lg text-red-400 hover:bg-red-400 hover:text-white px-4 py-2">
     Delete
    </button>
   </div>
   <p className="text-zinc-400 py-8">{formatDate(project.dueDate)}</p>
   <p className="py-4">{project.description}</p>
   <div id="separator" className="w-full border-2 border-gray-600 my-4"></div>
   <h2 className="text-4xl font-semibold text-stone-600">Tasks</h2>
   <div className="flex flex-row my-6">
    <input
     ref={taskInputRef}
     type="text"
     className="w-1/3 border-b-4 border-b-zinc-500 bg-zinc-300 h-8 p-4"
    />
    <button
     onClick={() => onAddTask(taskInputRef.current.value)}
     className="ps-4">
     Add Task
    </button>
   </div>
   {project.tasks.length > 0 && (
    <div className="w-1/2 rounded-md bg-slate-100">
     <ul className="p-4">
      {project.tasks.map((task, index) => (
       <li key={index} className="flex flex-row justify-between items-center">
        <span>{task}</span>
        <button
         onClick={() => onClearTask(index)}
         className="text-stone-400 px-3 py-4">
         Clear
        </button>
       </li>
      ))}
     </ul>
    </div>
   )}
  </section>
 );
}
