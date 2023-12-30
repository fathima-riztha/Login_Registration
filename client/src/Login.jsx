import {useState} from 'react'  
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const navigate = useNavigate();


  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/login',{email,password})
    .then((response)=>{
      const token = response.data.token;
       
      localStorage.setItem('token',token);
     // console.log("token:"+token);
      navigate('/home');
    })
    
    .catch((err)=>{
      console.log(err.response.data.message);
    })
}


  return (
    <div className="d-flex justify-content-center  v-100">
            <div className="bg-white p-3 rounded w-25">
                
                    <h2 >Login</h2>
                    <form onSubmit={handleSubmit} >
                        
                        <div className="mb-3">
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input type="text" 
                                placeholder="Enter Email"
                                autoComplete="off" 
                                name="email"
                                className="form-control rounded-0"
                                onChange={(e)=>setEmail(e.target.value)}
                            />    
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email"><strong>Password</strong></label>
                            <input type="password" 
                                placeholder="Enter Password"
                                autoComplete="off" 
                                name="password"
                                className="form-control rounded-0"
                                onChange={(e)=>setPassword(e.target.value)}
                            />    
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                </form>
                        <p>Do not   have an account</p>
                        <Link to="/" className="btn btn-primary border w-100 ">SignUp</Link>
                   

                </div>
            </div>
  )
}

export default Login