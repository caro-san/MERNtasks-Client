import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Task = ({task}) => {

    //Extrae si un proyecto esta activo
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    //Obtener la funcion del context de tarea
    const tasksContext = useContext(taskContext);
    const { removeTask, getTasks, updateTask, saveActualTask } = tasksContext;

    //Extrae el proyecto
    const [actualProject] = project;

    // Funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea
    const taskRemove = id =>{
        removeTask(id, actualProject._id);
        getTasks(actualProject.id);

    }

    //Funcion que modifica el estado de las tareas
    const changeState = task => {
        if(task.state){
            task.state = false;
        }else{
        task.state = true
        }
        updateTask(task);

    }

    //Agrega una tarea actual cuando el usuario desea editarla
    const selectTask = task => {
        saveActualTask(task);
    }


    return ( 
        <li className="tarea sombra">
            <p>{task.name}</p>

            <div className="estado">
                {task.state
                    ?
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => changeState(task)}
                            >Complete</button>
                        )

                    :
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => changeState(task)}
                            >Incomplete</button>
                        )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => selectTask(task) }
                >Edit</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=> taskRemove(task._id)}
                >Remove</button>
            </div>


        </li>
    );
}

export default Task;