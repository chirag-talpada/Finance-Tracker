import React, { useEffect, useState } from "react";
import "./Signup.css";
import { Link,useNavigate } from "react-router-dom";
import { getUsersID } from "../../services/localStorage";
import { isAlreadyLoggedIn } from "../../services/authentication";
import { useDispatch } from "react-redux";
import { addUSer } from "../../redux/usersSlice";

const Signup = () => {
  const intialvalues = { name: "", email: "", password: "", cPassword: "" };
  const [formvalues, setFormValues] = useState(intialvalues);
  const [formerr, setFormerr] = useState(intialvalues);

  const dispatch=useDispatch();
  const navigate=useNavigate();



  useEffect(()=>{
    if(isAlreadyLoggedIn()){
      navigate('/transactions')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const isValidate=()=>{
    let err={};

    if(formvalues.name.trim()===''){
      err.name='name is required';
    }
    if(formvalues.email.trim()===''){
      err.email='email is required';
    }else{
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formvalues.email)) {
        err.email = "email is not a valid email"
      }
    }
    if(formvalues.password.trim()===''){
      err.password='password is required';
    }
    if(formvalues.cPassword.trim()===''){
      err.cPassword='Confirm password is required';
    }else{
      if(!(formvalues.password.trim()===formvalues.cPassword.trim())){
        err.cPassword='Password miss match';
      }
    }

    setFormerr(err);

    return Object.keys(err).length===0;
    
  }

  const handleChange = (e) => {
    setFormValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    let valid=isValidate();
    
    if(valid){
      
      let userID=getUsersID();
      let userData={};

      userData.name=formvalues.name;
      userData.email=formvalues.email;
      userData.password=formvalues.password;
      userData.id=userID;
      
     
      dispatch(addUSer(userData));
      navigate('/',{state:{toast:true,msg:'User added successfully'}})

      
    }
    
  }

  return (
    <div className="container">
      <div className="form-container">
        <div className="signin-title">
          <h2>Sign up</h2>
        </div>

        <div className="feilds-container">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="name"
                className="form-input"
              ></input>
               {<span className="err">{formerr.name}</span>}
            </div>
            <div className="row">
              <input
                type="text"
                name="email"
                onChange={handleChange}
                placeholder="email"
                className="form-input"
              ></input>
               {<span className="err">{formerr.email}</span>}
            </div>
            <div className="row">
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="form-input"
              ></input>
               {<span className="err">{formerr.password}</span>}
            </div>
            <div className="row">
              <input
                type="password"
                name="cPassword"
                onChange={handleChange}
                placeholder="Confirm Password"
                className="form-input"
              ></input>
              {<span className="err">{formerr.cPassword}</span>}
            </div>
            <div className="row">
              <input
                type="submit"
                name="signup"
                value="Sign up"
                className="form-input signin-btn"
              ></input>
            </div>
          </form>
          <div className="row" style={{ marginBottom: "0" }}>
            <span>
              Already have an Account?{" "}
              <Link to="/">
                <span className="link">Sign in</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
