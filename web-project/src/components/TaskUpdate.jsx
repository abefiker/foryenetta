import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const initialState = {
  title: "",
  description: "",
  date: ""
}
function TaskUpdate() {
  const [state, setState] = useState(initialState)
  const { title, description, date } = state
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    axios.get(`http://localhost:3002/api/get/${id}`)
      .then((resp) => {
        setState({
          title: resp.data.result[0].task_name,
          description: resp.data.result[0].description,
          date: resp.data.result[0].due_date.split("T")[0]
        })
      })
  }, [id])
  console.log(date)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description || !date) {
      toast.error("please enter ")
    } else {
      axios.put(`http://localhost:3002/api/put/${id}`, {
        title: "",
        description: "",
        date: ""
        }).then((responce) => {
          console.log(responce)
          setState({ ...state })
        }).catch((err) => {
          toast.error(err.responce)
          console.log("heredghruil")
        })
      setTimeout(() => {
        navigate('/')
      }, 500)
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  return (
    <div style={{
      marginTop: "100px", backgroundColor: "#3a3a3a", marginLeft: "400px",
      marginRight: "400px", borderRadius: "9px"
    }}>
      <form style={
        {
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center"
        }
      } onSubmit={handleSubmit}>
        <label htmlFor="title" style={{ fontSize: "20px" }}>title</label>
        <input type="text"
          id="title"
          name='title'
          placeholder='title'
          value={title || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="description" style={{ marginTop: "35px", fontSize: "20px" }}>description</label>
        <input type="text"
          id="description"
          name='description'
          placeholder='description'
          value={description || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="date" style={{ marginTop: "35px", fontSize: "20px" }}>date</label>
        <input type="date"
          id="date"
          name='date'
          placeholder='date'
          value={date || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value="save" />
        <Link to="/">
          <input type="button" value="Go back" />
        </Link>

      </form>

    </div>
  )
}

export default TaskUpdate
