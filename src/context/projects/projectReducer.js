import { FORM_PROJECT, GET_PROJECTS, PROJECT_ERROR, ADD_PROJECT, VALIDATE_FORM, 
    ACTUAL_PROJECT, REMOVE_PROJECT } from '../../types';


export default (state, action) => {
    switch(action.type){
        case FORM_PROJECT:
            return{
                ...state,
                form: true
            }
        case GET_PROJECTS:
            return{
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            return{
                ...state,
                projects:[action.payload, ...state.projects ],
                form: false,
                errorform: false
            }
        case VALIDATE_FORM:
            return{
                ...state,
                errorform: true
            }
        case ACTUAL_PROJECT:
            return{
                ...state,
                project: state.projects.filter(project => project._id === action.payload )
            }
        case REMOVE_PROJECT:
            return{
                ...state,
                projects:state.projects.filter(project => project._id !== action.payload ),
                project: null
            }
        case PROJECT_ERROR:
            return{
                ...state,
                message:action.payload
            }


        default:
            return state;
    }
}