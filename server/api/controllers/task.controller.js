import { pool } from "../db.js";


export const getAllTasks = async (req, resp) => {
  try {

    const [result] = await pool.query('SELECT * FROM tasks ORDER BY createdAt ASC')

    resp.json(result)

  } catch (error) {
    return resp.status(500).json({message:error.message})
  }

}

export const getOneTask = async (req, resp) => {
  try {
    let id = req.params.id
    const [result] = await pool.query('SELECT id, title , description, done, createdAt FROM tasks WHERE id = ?', [id])

    if (result.length === 0) { return resp.status(404).json({ message: 'Element Not Found' }) }

    resp.json(result[0])

  } catch (error) {
    return resp.status(500).json({message:error.message})
  }

}

export const createOneTask = async (req, resp) => {
  try {
    const { title, description } = req.body
    const result = await pool.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description])

    resp.json({
      id: result.insertId,
      title,
      description
    })
  } catch (error) {
    return resp.status(500).json({message:error.message})
  }
}

export const updateTask = async (req, resp) => {
  try {
    let id = req.params.id;
    
    //const {title, description, done} = req.body  
    //const [result] = await pool.query('UPDATE tasks SET title = ?, description = ? , done = ? WHERE id = ?', [title, description,done, id])

    const [result] = await pool.query('UPDATE tasks SET  ? WHERE id = ?', [req.body, id])
   
    resp.status(200).json(result)
  } catch (error) {
    return resp.status(500).json({message:error.message})
  }

}

export const deleteTask = async (req, resp) => {
  try {
    let id = req.params.id;
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id])

    if (result.affectedRows === 0){ return resp.status(404).json({message:"Element Not Found"})}

    resp.status(204).json({ message: 'Delete task sussesfully' })

  } catch (error) {
    return resp.status(500).json({message:error.message})
  }

} 