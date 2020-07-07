import React, { Fragment, useContext } from 'react';
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import {CSSTransition, TransitionGroup } from 'react-transition-group';


const ListTasks = () => {

    //Extraer proyectos de state inicial
    const projectsContext = useContext(projectContext);
    const { project, removeProject } = projectsContext;

    //Obtener las tareas del proyecto
    const tasksContext = useContext(taskContext);
    const {tasksproject} = tasksContext;

    //Si no hay un proyecto seleccionado
    if(!project) return <h2>Select a Project</h2>;

    //Array destructuring para extraer el proyecto actual
    const [actualProject] = project;

    //Elimina un proyecto
    const onClickRemove = () => {
        removeProject(actualProject._id)
    }


    return (

        <Fragment>
            <h2>Project: {actualProject.name}</h2>

            <ul className="listado-tareas">
                {tasksproject.length === 0
                    ? (<li className="tarea"><p>There are no tasks</p></li>)
                    : 
                    <TransitionGroup>
                        {
                            tasksproject.map(task => (
                                <CSSTransition
                                    key={task._id}
                                    timeout={200}
                                    classNames="tarea"

                                >
                                    <Task
                                    task={task}
                                />
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickRemove}
            >Delete Project &times;</button>

        </Fragment>

    );
}

export default ListTasks;