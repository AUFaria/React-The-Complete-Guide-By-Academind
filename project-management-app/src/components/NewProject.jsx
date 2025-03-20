import { useRef } from "react";

import CustomInput from "./CustomInput";

export default function NewProject({ onSaveNewProject, onCancelNewProject }) {
 const titleRef = useRef();
 const descriptionRef = useRef();
 const dueDateRef = useRef();

 function buildNewProjectObj(title, description, dueDate) {
  return {
   title: title,
   description: description,
   dueDate: dueDate,
   tasks: [],
  };
 }

 return (
  <section className="w-3/5 mx-auto flex flex-col pt-8">
   <div className="flex flex-row-reverse">
    <button
     onClick={() =>
      onSaveNewProject(
       buildNewProjectObj(
        titleRef.current.value,
        descriptionRef.current.value,
        dueDateRef.current.value
       )
      )
     }
     className="py-2 px-4 rounded-lg bg-stone-900 text-white">
     Save
    </button>
    <button onClick={onCancelNewProject} className="py-2 px-4 font-medium">
     Cancel
    </button>
   </div>

   <CustomInput ref={titleRef} label="Title" type="text" />

   <CustomInput ref={descriptionRef} label="Description" type="textarea" />

   <CustomInput ref={dueDateRef} label="Due Date" type="date" />
  </section>
 );
}
