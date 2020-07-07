import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {

    //Obtener el state del formulario
    const projectsContext = useContext(projectContext);
    const { form, errorform, showForm, addProject, showError } = projectsContext;

    //State para el proyecto
    const [project, saveProject] = useState({
        name:'',
    });

    // Extraer nombre de proyecto
    const { name } = project;

    //Lee los contenidos del input
    const onChangeProject = e => {
        saveProject({
            ...project,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario envía un proyecto
    const onSubmitProject = e => {
        e.preventDefault();

        //Validar el proyecto
        if(name === ''){ 
            showError();
            return; }

        //Agregar al state
        addProject(project)


        //Reiniciar el form
        saveProject({
            name:''
        })
    }

    //Mostrar el formulario
    const onClickForm = () => {
        showForm();
    }


    return ( 

        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickForm}
            >New Project</button>

            {
                form ?
                (
                    <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProject}
                    >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Project Name"
                            name="name"
                            onChange={onChangeProject}
                            value={name}
                        />

                        <input
                            type="submit"
                            className="btn btn-block btn-primario"
                            value="Add Project"
                        />
                    </form>
                ) : null }

                {
                    errorform ? <p className="mensaje error">The project name is required</p>

                    : null
                }
        </Fragment>
    );
}

export default NewProject;