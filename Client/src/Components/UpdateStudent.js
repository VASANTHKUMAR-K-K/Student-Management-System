
import axios from 'axios'
import React, { useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateStudent() {

   
    const [values,setValues]=useState({
        fname:"",
        lname:"",
        location:"",
        email:"",
        education:"",
        dob:"",
    })


    const navigate = useNavigate();
    const{id}=useParams();

function handleSubmit(e){
    e.preventDefault();    
    axios.put('http://localhost:8081/update/'+id, values)
        .then(res =>{  
         console.log(res);
         navigate('/')
     }).catch(err => console.log(err))
}


function handlecancle(e){
  navigate("/")
}

  return (
    <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3 shadow-lg mb-5'>
            <form onSubmit={handleSubmit} >          
                <h3>UPDATE STUDENT</h3>
                <div className='d-flex justify-content-evenly'>
                <div className='mb-2 w-50 m-1'>
                    <label>FirstName:</label>
                    <input type='text' value={values.fname} name="fname" placeholder='FirstName' className='form-control' onChange={e => setValues({...values,fname:e.target.value})} />
                </div>
                <div className='mb-2 w-50 m-1'>
                    <label>LastName:</label>
                    <input type='text' value={values.lname} placeholder='LastName' className='form-control' onChange={e => setValues({...values,lname:e.target.value})}/>
                </div>
                </div>
                
                <div className='mb-2 w-50'>
                    <label>Location:</label>
                    <input type='text'value={values.location} placeholder='Location' className='form-control'onChange={e => setValues({...values,location:e.target.value})}/>
                </div>
                <div className='mb-2 w-50'>
                    <label>Email:</label>
                    <input type='email' value={values.email} placeholder='abc123@gmail.com' className='form-control' onChange={e => setValues({...values,email:e.target.value})}/>
                </div>
                <div className='mb-2 w-50'>
                    <label>DOB:</label>
                    <input type='date' value={values.dob} className='form-control' onChange={e => setValues({...values,dob:e.target.value})}/>
                </div>
                <div className='mb-2 w-50'>
                    <label>Education:</label>
                    <input type='text' value={values.education} placeholder='MCA, MBA, B.E, B.Sc., etc..,' className='form-control' onChange={e => setValues({...values,education:e.target.value})}/>
                </div>
                <div className="mb-3 w-50 ">
                    <label className="form-label">About:</label>
                    <textarea className="form-control" 
                    placeholder='Comments' rows="3" onChange={e => setValues({...values,about:e.target.value})}></textarea>
                </div>
                <button  className='btn bg-black text-white rounded-5 w-25 m-2'> Submit</button>
                <button type="button" className="btn bg-black text-white rounded-5 w-25 m-2" onClick={handlecancle}>Close</button>

            </form>
        </div>
    </div>
  )
}
