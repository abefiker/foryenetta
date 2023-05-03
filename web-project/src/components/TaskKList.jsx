import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TaskUpdate from './TaskUpdate'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
function TaskKList(props) {
    const [tasks, settasks] = useState([])
    const fetchTasks = () => {
        const id = localStorage.getItem("id")
        axios.post(`http://localhost:3002/api/${id}`)
            .then((res) => {
                settasks(res.data.tasks)
            }).catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        fetchTasks()
    }, [props.onClick])
    const deleteContact = (id) => {
        if (window.confirm("are you sure you want to delete this task ? ")) {
            axios.delete(`http://localhost:3002/api/removed/${id}`)
                .then(res => console.log(res))
                .catch((error => console.log(error)))
            toast.success("task is successfull deleted")
            setTimeout(() => fetchTasks(), 500);
            console.log("delete")
        }
    }
    return (

        <div className='all'>

            {
                tasks.map((task) => <>
                    <div className='hole' key={task.id}>
                        <h2>{task.task_name} </h2>
                        <p>{task.description}</p>
                        <p>{task.due_date.split("T")[0]}</p>
                        <Link to={`/TaskUpdate/${task.id}`}>
                            <button className="btn btn-edit">Edit</button>
                        </Link>
                        <button className="btn btn-delete" onClick={() => deleteContact(task.id)}>Delete</button>
                    </div>
                </>
                )
            }
            
        </div>
    )
}

export default TaskKList
