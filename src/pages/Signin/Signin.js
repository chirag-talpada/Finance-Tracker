import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Signin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOption } from "../../utils/constant";
import {
  isAlreadyLoggedIn,
  storeToken,
} from "../../services/authentication";
import { useSelector } from "react-redux";

import Cookies from 'js-cookie';

const Signin = () => {
  const location = useLocation();
  const intialvalues = { email: "", password: "" };
  const [formvalues, setFormValues] = useState(intialvalues);
  const [formerr, setFormerr] = useState(intialvalues);
  const navigate = useNavigate();

  const { users } = useSelector((state) => {
    return state;
  });

  const isValidate = () => {
    let err = {};

    if (formvalues.email.trim() === "") {
      err.email = "email is required";
    } else {
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formvalues.email)) {
        err.email = "email is not a valid email";
      }
    }
    if (formvalues.password.trim() === "") {
      err.password = "password is required";
    }

    setFormerr(err);

    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setFormValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = isValidate();

    if (valid) {
      let { email, password } = formvalues;

      let validUser = false;

      for (const data of users) {
        if (data.email === email && data.password === password) {
          let token=storeToken(data.id);
          Cookies.set('token', token, { expires: 1 });
          validUser = true;
        }
      }

      if (validUser) {
        navigate("/transactions");
      } else {
        toast("Username or Password is incorrect", toastOption);
      }
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (isAlreadyLoggedIn(token)) {
      navigate("/transactions");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.state?.toast) {
      toast(location.state?.msg, toastOption);
      navigate(location.pathname, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.msg, location.state?.toast]);

  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="form-container">
        <div className="signin-title">
          <h2>Sign in</h2>
        </div>

        <div className="feilds-container">
          <form onSubmit={handleSubmit}>
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
                placeholder="password"
                className="form-input"
              ></input>
              {<span className="err">{formerr.password}</span>}
            </div>
            <div className="row">
              <input
                type="submit"
                name="signin"
                value="Sign in"
                className="form-input signin-btn"
              ></input>
            </div>
          </form>
          <div className="row" style={{ marginBottom: "0" }}>
            <span>
              Don't have an Account?{" "}
              <Link to="/signup">
                <span className="link">Sign up</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
