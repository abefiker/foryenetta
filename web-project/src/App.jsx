import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Task from './components/Task';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import AuthenticationPage from './components/AuthenticationPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import axios from 'axios';
import TaskKList from './components/TaskKList';
import TaskUpdate from './components/TaskUpdate';
function App() {
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    setShowModal(!showModal);
  };


  const [task_name, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [due_date, setDueDate] = useState('')

  const handletitle = (e) => {
    setTitle(e.target.value)
  }
  const handledescription = (e) => {
    setDescription(e.target.value)
  }
  const handleDueDate = (e) => {
    setDueDate(e.target.value)
  }
  const user_id = localStorage.getItem("id")
  const addTask = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3002/", {
      task_name, task_name,
      description: description,
      due_date: due_date,
      user_id: user_id
    })
      .then(response => {
        console.log(task_name, description);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const modal = (
    <Modal show={showModal} onHide={handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form >
          <input type="text" placeholder='task title' onChange={handletitle} />
          <textarea name="descript" id="" cols="23.999" rows="6" placeholder='description'
            onChange={handledescription}
          >
          </textarea>
          <input type="date" id="start-date" defaultValue="Start Date" onChange={handleDueDate} />

        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Close
        </Button>
        <Button variant="primary" onClick={addTask}>
          add task
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <div>
            <Navbar modal={modal} handleModal={handleModal} />
            <TaskKList onClick={addTask} />
            <Task modal={modal} handleModal={handleModal} />
          </div>} />
        <Route path="TaskUpdate/:id" element={<TaskUpdate/>}/>  
        <Route path='sign-up' element={<AuthenticationPage />} />
        <Route path='Login' element={<Login />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App
