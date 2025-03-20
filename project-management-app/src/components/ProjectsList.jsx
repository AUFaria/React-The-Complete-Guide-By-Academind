export default function ProjectsList({
 projects,
 onAddProject,
 onSelectProject,
}) {
 return (
  <section className="bg-stone-900 w-1/5 rounded-tr-xl flex flex-col items-start px-8 py-12">
   <h2 className="uppercase text-3xl font-semibold text-slate-50 py-4">
    Your Projects
   </h2>
   <button
    onClick={onAddProject}
    className="py-2 px-4 my-6 bg-zinc-700 rounded-md text-gray-400">
    + Add Project
   </button>
   <ul className="mt-4 w-full">
    {projects.map((project, index) => (
     <li key={index} className="w-full">
      <button
       onClick={() => onSelectProject(index)}
       className="w-full py-2 ps-3 text-start text-gray-400 hover:bg-stone-700 focus:bg-stone-700 hover:text-gray-200 focus:text-gray-200">
       {project.title}
      </button>
     </li>
    ))}
   </ul>
  </section>
 );
}
