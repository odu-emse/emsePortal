import axios from 'axios'

const fetchModuleData = () => {
    console.log('Fetching Module Data...')
    return axios.get('/api/modules')
        .then(res => res.data)
        .catch(err => console.log(err))
}

const wrapPromise = promise => {
    let status = 'pending'
    let result;
    let suspender = promise.then(
        res => {
            status = 'success'
            result = res
        },
        err => {
            status = 'error'
            result = err
        }
    )
    return{
        read(){
            if (status === "pending"){
                throw suspender
            }
            else if(status === 'error'){
                throw result
            }
            else if(status === 'success'){
                return result
            }
        }
    }
}

export const fetchData = () => {
    const modulePromise = fetchModuleData()
    return {
        module: wrapPromise(modulePromise)
    }
}