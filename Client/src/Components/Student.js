
import React,{ useEffect, useState} from 'react'
import axios from 'axios'
import {Link }from 'react-router-dom'
import { AiFillDelete } from "react-icons/ai";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";   

export default function Student() {

  const [student, setStudent]=useState([]);
  const [filterstudent, setFilterStudent]=useState([])

useEffect(()=>{
    axios.get('http://localhost:8081/')
      //.then(res => console.log(res))
      .then((res) => {
        setStudent(res.data)
        setFilterStudent(res.data)
      })
      .catch(err => console.log(err))
    },[])

    const handleDelete= async (id)=>{ 
      try {
        await axios.delete('http://localhost:8081/student/'+id)
        .then(res =>
       window.confirm("Are you Sure Want to  Delete Student Data?")
       )} catch (error) {
        console.log(error)
      }
  }
  

    function handleSearch(e){
      const searchText=e.target.value.toLowerCase();
      const filtereduser=student.filter((stu)=>stu.FirstName.toLowerCase().includes(searchText)
     || stu.Location.toLowerCase().includes(searchText));
    setFilterStudent(filtereduser)
    }

  return (
      <div className='d-flex vh-100 bg-light justify-content-centern align-items-center'>
        <div className='w-100 bg-white rounded p-3 m-3 shadow mb-5 '>
          <span className='mb-4'><b><h4><i>STUDENT MANAGEMENT SYSTEM</i></h4></b></span>
            <div className="input-container ">
        <input type="text" className="searchinput" placeholder="Search Text Here" onChange={handleSearch}/>
            <span className='imagefixed' ><IoSearchOutline /></span>
            </div>
            <Link to='/create' className='btn bg-black text-white rounded-5 float-end '>Add {<AiOutlineUserAdd />}</Link>
            {student.length !==0 ? 
          <table className='table'>
            <thead>
              <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Education</th>
              {/* <th>About</th> */}
              <th>Action</th>
              <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {
                filterstudent &&
                filterstudent.map((data,i)=>(
                  <tr key={i}>
                    <td>{data.FirstName}</td>
                    <td>{data.LastName}</td>
                    <td>{data.Location}</td>
                    <td>{data.Email}</td>
                    <td>{data.DOB}</td>
                    <td>{data.Education}</td>
                    {/* <td>{data.About}</td> */}
                    <td>
                      <Link to={`update/${data.ID}`} className='btn'>{<LiaUserEditSolid />} Edit</Link>
                    </td>
                    <td>
                      <button className='btn ' onClick={e=>handleDelete(data.ID)}>{<AiFillDelete />} Delete</button>
                    </td>
                  </tr>
                )
              )
              
              }

            </tbody>

          </table>
             :<h2><i>NO STUDENTS RECORDS</i></h2>
            }
        </div>
      </div>
                    

  )
}
