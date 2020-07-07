import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {
    //Obtener el state de proyectos
    const projectsContext = useContext(projectContext);
    const { actualProject } = projectsContext;

    //obtener la funcion del context de tarea
    const tasksContext = useContext(taskContext);
    const {getTasks} = tasksContext;

    //Funcion para agregar el proyecto actual
    const selectProject = id => {
        actualProject(id); //Fijar un proyecto actual
        getTasks(id); //Filtrar las tareas cuando se de click
    }


    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => selectProject(project._id) }
            >{project.name}</button>
        </li>

    );
}

export default Project;