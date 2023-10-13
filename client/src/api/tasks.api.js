import axios from 'axios'

export const createTaskRequest = async (task)=>{
    return await axios.post('http://localhost:3000/api/tasks', task)
}

export const getTaskRequest = async ( )=>{
    return await axios.get('http://localhost:3000/api/tasks')
}

export const deleteTaskRequest = async (id)=>{
   return await axios.delete(`http://localhost:3000/api/tasks/${id}`)
}

export const getOneTaskRequest = async (id)=>{
    return await axios.get(`http://localhost:3000/api/tasks/${id}`)
 }
 
 export const updateTaskRequest = async (id, newFields)=>{
    return await axios.put(`http://localhost:3000/api/tasks/${id}`, newFields)
 }

 export const toogleTaskDoneRequest = async (id, done)=>{
    return await axios.put(`http://localhost:3000/api/tasks/${id}`,{done})
 }