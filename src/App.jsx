
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [user, setuser] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/user')
      .then(res => res.json())
      .then(data => setuser(data))
  }, [])


  const handelformSubmit = event => {
    event.preventDefault()
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    console.log('event clicked');
    const users = { name, email };
    form.reset();
    //set it on server side 
    fetch('http://localhost:3000/user' ,{
      method : 'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify(users)
    }).then(res => res.json())
    .then(data => {
     const newUsers = [...user , data]
     setuser(newUsers)
    })
  }
  return (
    <>



      <h1>User Management System </h1>
      <h3>Total User {user.length}</h3>
      <form onSubmit={handelformSubmit}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <button>Submit</button>
      </form>

{
  user.map(users => <h3 key={users.id}> Users-id : { users.id}  Name : {users.name} Email : {users.email} </h3>)
}



    </>
  )
}

export default App
