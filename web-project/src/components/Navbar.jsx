import React from "react"

function Navbar(props) {
  return (
    <div className="navdiv">
       <nav class="navbar navbar-light justify-content-between">
          <a class="navbar-brand">Task Manager</a>
          <button onClick={props.handleModal} >+</button>
       </nav>
    </div>
  )
}

export default Navbar
