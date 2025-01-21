import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const [user, setUser] = React.useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  })

  const [isModalOpen,setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(user.phone.length !== 10){
      alert('Invalid phone number. Please enter a 10-digit phone number.')
      return;
    }
    if(new Date(user.dob) > new Date()){
      alert('Invalid date of birth. Date of birth cannot be in the future.')
      return;
    }

    setUser({
      username: '',
      email: '',
      phone: '',
      dob: ''
    })
    setIsModalOpen(false);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);
  return (

    <div className="container">
      <h1>User details Modal</h1>
      <button onClick={openModal}>Open Form</button>
      {isModalOpen && (
        <div className="modal">
        <div className="modal-content" ref={modalRef}>
        <h2>Fill details</h2>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" name='username' required value={user.username} onChange={handleChange} id='username'/>
            <label htmlFor="email">Email Address</label>
            <input type="text" name='email' required value={user.email} onChange={handleChange} id='email'/>
            <label htmlFor="phone">Phone number</label>
            <input type="text" name='phone' required value={user.phone} onChange={handleChange} id='phone'/>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" name='dob'required value={user.dob} onChange={handleChange} id='dob'/>
            <button type='submit' className='submit-button'>Submit</button>
          </form>
        </div>
      </div>)}

    </div>
  )
}

export default App