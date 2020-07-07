import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const FormTask = () => {

    //Extraer si un proyecto esta activo
    const projectsContext = useContext(projectContext);
    const  { project } = projectsContext;

    //Obtener la funcion del context de tarea
    const tasksContext = useContext(taskContext);
    const { selectedtask, errortask, addTask, 
        validateTask, getTasks, updateTask, cleanTask} = tasksContext;

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(selectedtask !== null){
            saveTask(selectedtask)
        }else{
            saveTask({
                name:''
            })
        }

    }, [selectedtask]);

    //State del formulario
    const [task, saveTask] = useState({
        name: ''
    })

    //Extraer el nombre del proyecto
    const { name } = task;

    //Si no hay proyecto seleccionado
    if(!project) return null;

    //Array destructuring para extraer el proyecto actual
    const [ actualProject ] = project;

    //Leer los valores del formulario
    const handleChange = e => {
        saveTask({
            ...task,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        // Validar
        if(name.trim() === ''){
            validateTask();
            return;
        }

        //Si es edicion o si es nueva tarea
        if(selectedtask === null){
            //Agregar la nueva tarea al state de tareas
            task.project = actualProject._id;
            addTask(task);
        }else{
            //Actualizar tarea existente
            updateTask(task);

            //Elimina selectedtask del state
            cleanTask();
        }

        //Obtener y filtrar las tareas del proyecto actual
        getTasks(actualProject.id);

        //Reiniciar el form
        saveTask({
            name:''
        })
    }


    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task name..."
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={selectedtask ? 'Edit Task' : 'Add Task'}
                    />
                </div>

            </form>

            {errortask ? <p className="mensaje error">The Project Name is Required</p>  : null}
        </div>
    );
}

export default FormTask;