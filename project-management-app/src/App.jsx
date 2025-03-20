import { useRef, useState } from "react";

import ProjectsList from "./components/ProjectsList";
import NewProject from "./components/NewProject";
import EditProject from "./components/EditProject";

import noProjectSelectedImg from "./assets/no-projects.png";

const myProjects = [];

function findTargetProjectIndex(targetProject) {
 return myProjects.findIndex(
  (project) =>
   project.title === targetProject.title &&
   project.description === targetProject.description &&
   project.dueDate === targetProject.dueDate
 );
}

function App() {
 const [isProjectSelected, setIsProjectSelected] = useState(false);
 const [targetProject, setTargetProject] = useState(null);

 const taskInputRef = useRef();

 function handleNewProjectButtonClick() {
  setTargetProject(null);
  setIsProjectSelected(true);
 }

 function handleSelectProjectListItemClick(index) {
  setTargetProject(myProjects[index]);
  setIsProjectSelected(true);
  taskInputRef.current.clearInput();
 }

 function handleSaveButtonClick(newProject) {
  myProjects.push(newProject);
  setTargetProject(null);
  setIsProjectSelected(false);
 }

 function handleCancelButtonClick() {
  setTargetProject(null);
  setIsProjectSelected(false);
 }

 function handleDeleteProjectButtonClick() {
  myProjects.splice(findProjectIndex(targetProject), 1);
  setTargetProject(null);
  setIsProjectSelected(false);
 }

 function handleAddTaskButtonClick(newTask) {
  setTargetProject((previousProject) => {
   const updatedProject = {
    ...previousProject,
    tasks: [...previousProject.tasks, newTask],
   };

   myProjects[findTargetProjectIndex(previousProject)] = updatedProject;

   return updatedProject;
  });

  taskInputRef.current.clearInput();
 }

 function handleClearTaskButtonClick(taskIndex) {
  setTargetProject((previousProject) => {
   const updatedProject = {
    ...previousProject,
    tasks: previousProject.tasks.filter((_, index) => index !== taskIndex),
   };

   myProjects[findTargetProjectIndex(previousProject)] = updatedProject;

   return updatedProject;
  });

  taskInputRef.current.clearInput();
 }

 const noProjectSelectedSection = (
  <section className="w-4/5 flex flex-col items-center pt-8">
   <img src={noProjectSelectedImg} alt="" className="w-20 h-20 my-6" />
   <h3 className="text-stone-500 my-6 font-medium text-2xl">
    No project selected
   </h3>
   <p className="my-6 text-stone-500">
    Select a project or get started with a new one
   </p>
   <button
    onClick={handleNewProjectButtonClick}
    className="py-2 px-4 my-6 bg-zinc-700 rounded-md text-gray-400">
    Create new project
   </button>
  </section>
 );

 return (
  <div className="flex flex-row h-screen pt-8">
   <ProjectsList
    projects={myProjects}
    onAddProject={handleNewProjectButtonClick}
    onSelectProject={handleSelectProjectListItemClick}
   />

   {!isProjectSelected && targetProject === null && noProjectSelectedSection}

   {isProjectSelected && targetProject === null && (
    <NewProject
     onSaveNewProject={handleSaveButtonClick}
     onCancelNewProject={handleCancelButtonClick}
    />
   )}

   {isProjectSelected && targetProject !== null && (
    <EditProject
     ref={taskInputRef}
     project={targetProject}
     onDeleteProject={handleDeleteProjectButtonClick}
     onAddTask={handleAddTaskButtonClick}
     onClearTask={handleClearTaskButtonClick}
    />
   )}
  </div>
 );
}

export default App;
