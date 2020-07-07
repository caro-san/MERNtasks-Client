import React, { useContext, useEffect } from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import AlertaContext from '../../context/alerts/alertContext';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

const ListProjects = () => {

    // Extraer proyectos de state  inicial
    const projectsContext = useContext(projectContext);
    const { message, projects, getProjects } = projectsContext;

    const alertContext = useContext(AlertaContext);
    const { alert, showAlert } = alertContext;

    //Obtener proyectos cuando carga el componente
    useEffect(() =>{

        //Si hay un error
        if(message){
            showAlert(message.msg, message.category)
        }

        getProjects();
        //eslint-disable-next-line
    }, [message]);
    
    //Revisar si proyectos tiene contenido
    if(projects.length === 0 ) return <p>There are not projects, create your first project</p>;

    return ( 
        <ul className="listado-proyectos">

    {alert ? (<div className={`alert ${alert.category}`}> {alert.msg} </div>) : null}

            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Project
                        project={project}
                    />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ListProjects;