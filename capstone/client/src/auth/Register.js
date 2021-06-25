import {useState} from 'react'; 
import RegisterForm from "../components/RegisterForm";
import axios from 'axios';
import {toast} from 'react-toastify';
import {register} from '../actions/auth'; 
 

const Register =({history}) => {
  const [name, setName] = useState('') ;
  const [email, setEmail] = useState('') ;
  const [password, setPassword] = useState('') ;   
  
  const handleSubmit =  async (e) =>{
      e.preventDefault();

     try {
      const res = await register({
        name,
        email,
        password,
      });
      console.log('REGISTERED USER ===>',res)
      toast.success("Register success. Please login.");
      history.push('/login');
    }catch (err)  {
      console.log(err);
    if(err.response.status=== 400) toast.error(err.response.data);
    }
  };  
  
 
  
    return (
      <>
      <div className="container-fluid pt-5 text-center">
      <h3 class="text-uppercase">Register</h3>
      </div>
      
     

      <div className="container">
      <div className="row no-gutters justify-content-center"> 
      <div className="col-md-7 col-lg-6 col-xl-5">
      <RegisterForm
       handleSubmit={handleSubmit}
       name={name}
       setName={setName}
       email={email}
       setEmail={setEmail}
       password={password}
       setPassword={setPassword}
       />
      </div>
      </div>
      </div>
      </>
    ); 
    
};
export default Register;