import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';

import { 
    TASK_PROJECT, 
    ADD_TASK, 
    VALIDATE_TASK, 
    REMOVE_TASK, 
    ACTUAL_TASK, 
    UPDATE_TASK, 
    CLEAN_TASK 
} from '../../types';

import clientAxios from '../../config/axios';

const TaskState = props => {
    const initialState = {
        tasksproject: [],
        errortask: false,
        selectedtask: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer (TaskReducer, initialState);

    //CREAR LAS FUNCIONES

    //Obtener las tareas de un proyecto
    const getTasks = async project => {
        //console.log(project);
        try {
            const reply = await clientAxios.get('/api/tasks', { params: { project }});
            console.log(reply.data.tasks);

            dispatch({
                type: TASK_PROJECT,
                payload: reply.data.tasks
                
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Agregar una tarea al proyecto seleccionado
    const addTask = async task => {
        try {
            const reply = await clientAxios.post('/api/tasks', task);
            console.log(reply);

            dispatch({
                type: ADD_TASK,
                payload: task
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Valida y muestra un error en caso de que sea necesario
    const validateTask = () =>{
        dispatch({
            type: VALIDATE_TASK
        })
    }

    //Eliminar tarea por su ID
    const removeTask = async (id, project) => {
        try {
        await clientAxios.delete(`/api/tasks/${id}`, { params: { project }});

            dispatch({
                type:REMOVE_TASK,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

      //Edita o modifica una tarea
        const updateTask = async task => {
            try {
                const reply= await clientAxios.put(`/api/tasks/${task._id}`, task);
                //console.log(reply);

                dispatch({
                    type: UPDATE_TASK,
                    payload: reply.data.task
                })
            } catch (error) {
                console.log(error)
            }
    }

    // Extrae una tarea para edicion
    const saveActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    }

    // Elimina la tarea seleccionada
    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK,
        })
    }

    return(
        <TaskContext.Provider
            value={{
                tasksproject: state.tasksproject,
                errortask: state.errortask,
                selectedtask: state.selectedtask,
                getTasks,
                addTask,
                validateTask,
                removeTask,
                saveActualTask,
                updateTask,
                cleanTask,
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;