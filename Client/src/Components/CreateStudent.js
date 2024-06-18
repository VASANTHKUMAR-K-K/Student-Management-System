import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateStudent() {


    const [values,setValues]=useState({
        fname:"",
        lname:"",
        location:"",
        email:"",
        education:"",
        dob:"",
        about:"",
    })

    const navigate = useNavigate();

function handleSubmit(e){
    e.preventDefault();
    axios.post('http://localhost:8081/create',values)
    .then(res =>{
        console.log(res);
        navigate('/')
    }).catch(err => console.log(err))
}


 function handlecancle(){
    navigate('/')
 }

  return (
    <div className='d-flex vh-100 bg-light justify-content-center align-items-center '>
        <div className='w-50 bg-white rounded p-3 shadow-lg mb-5 mt-3'>
            <form onSubmit={handleSubmit}>
                <h3>ADD STUDENT</h3>
                <div className='d-flex justify-content-evenly'>
                <div className='mb-2 w-50 m-1'>
                    <label>FirstName:</label>
                    <input type='text' placeholder='Enter FirstName' className='form-control' name='fname' onChange={e => setValues({...values,fname:e.target.value})} required />
                </div>
                <div className='mb-2 w-50 m-1'>
                    <label>LastName:</label>
                    <input type='text' placeholder='Enter LastName' className='form-control' name='lname' onChange={e => setValues({...values,lname:e.target.value})} required/>
                </div>
                </div>
                <div className='mb-2 w-50'>
                    <label >Location:</label>
                    <input type='text' placeholder='Location' className='form-control'onChange={e => setValues({...values,location:e.target.value})}  required/>
                </div>
                <div className='mb-2 w-50 '>
                    <label>Email:</label>
                    <input type='email' placeholder='abc123@gmail.com' className='form-control' onChange={e => setValues({...values,email:e.target.value})} required/>
                </div>
                <div className='mb-2 w-50'>
                    <label >DOB:</label>
                    <input type='date' className='form-control' onChange={e => setValues({...values,dob:e.target.value})} required/>
                </div>
                <div className='mb-2 w-50'>
                    <label >Education:</label>
                    <input type='text' placeholder='MCA, B.E, B.Sc., etc..,' className='form-control' onChange={e => setValues({...values,education:e.target.value})} required/>
                </div>
                 <div className="mb-3 w-50 ">
                    <label className="form-label">About:</label>
                    <textarea className="form-control" 
                    placeholder='Comments' rows="3" onChange={e => setValues({...values,about:e.target.value})}></textarea>
                </div>
                <button className='btn bg-black text-white rounded-5 w-25 m-2'> Submit</button>
                <button type="button" className="btn bg-black text-white rounded-5 w-25 m-2" onClick={handlecancle}>Close</button>
            </form>
        </div>
    </div>
  )
}
