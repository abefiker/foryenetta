import { useState } from 'react';
import React from 'react'
import axios from 'axios';

function Task(props) {
  
  return (
    <div className='addList'>
          <button onClick={props.handleModal}>+
            <h6>add task</h6>
          </button>
        {props.modal}
    </div>
  )
}

export default Task
