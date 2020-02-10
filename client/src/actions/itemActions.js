import { ADD_ITEM, GET_ITEMS, DELETE_ITEMS, MODULES_LOADING} from "./types";
import axios from 'axios'

let fetchModuleData = async () => {
    let data = await axios.get('/api/modules')
    return data
}


export const getModules = () => dispatch => {
    dispatch(setModulesLoading());
    dispatch({
        type: GET_ITEMS,
        payload: fetchModuleData()
    })
}
export const deleteModule = id => {
    return{
        type: DELETE_ITEMS,
        payload: id
    }
}
export const addModule = module => {
    return{
        type: ADD_ITEM,
        payload: module
    }
}
export const setModulesLoading = () => {
    return{
        type: MODULES_LOADING,
    }
}