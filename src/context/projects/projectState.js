import React, { useReducer } from 'react';


import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
    FORM_PROJECT, 
    GET_PROJECTS,
    ADD_PROJECT,
    PROJECT_ERROR,
    VALIDATE_FORM,
    ACTUAL_PROJECT,
    REMOVE_PROJECT
} from '../../types';

import clientAxios from '../../config/axios';


const ProjectState = props => {

    const initialState = {
        projects : [],
        form : false,
        errorform : false,
        project: null,
        message: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer (projectReducer, initialState)

    //Serie de funciones para el CRUD de proyectos

    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    //Obtener los proyectos
    const getProjects = async () =>{
        try {
            const result = await clientAxios.get('/api/projects');

            dispatch({
                type: GET_PROJECTS,
                payload: result.data.projects
            })
        } catch (error) {
            const alert = {
                msg: 'There was a mistake',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload:alert
            })
        }
    }

    //Agregar nuevo proyecto
    const addProject = async project => {
        try {
            const result = await clientAxios.post('/api/projects', project);
            console.log(result);

            //Insertar el proyecto en el state
            dispatch({
                type: ADD_PROJECT,
                payload: result.data
            })
        } catch (error) {
            const alert = {
                msg: 'There was a mistake',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload:alert
            })
        }
    }

    //Valida el formulario por errores
    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    }

    //Selecciona el proyecto que el usuario dió click
    const actualProject = projectId => {
        dispatch({
            type:ACTUAL_PROJECT,
            payload: projectId
        })
    }

    //Elimina un proyecto
    const removeProject = async projectId => {
        try {
            await clientAxios.delete(`/api/projects/${projectId}`);

            dispatch({
                type: REMOVE_PROJECT,
                payload: projectId
            })
        } catch (error) {
            const alert = {
                msg: 'There was a mistake',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload:alert
            })
        }
    }

    return(
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                errorform: state.errorform,
                project:state.project,
                message: state.message,
                showForm,
                getProjects,
                addProject,
                showError,
                actualProject,
                removeProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )

}

export default ProjectState;