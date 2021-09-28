import React, { useState, useRef } from 'react'
import './Registration.css';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Example() {

    const details = useSelector((state)=>state.details);
    const dispatch = useDispatch();

    const [Details, setDetails] = useState({ username: "", email: '', mobile: '', password: "" });
    const [error, seterror] = useState({ nameError: "", passwordError: "", emailError: "", mobileError: "", confirmpasswordError: "" });
    const Name = useRef();
    const Email = useRef();
    const Password = useRef();
    const Mobile = useRef();
    const confirmPassword = useRef();

    const LoginData = (type) => {
        if (type === 'Name' || type === 'all') {
            if (!Name.current.value) {
                seterror({ nameError: 'Please enter username.' });
            } else {
                seterror({ nameError: '' });
            }
        }

        if (type === 'Email' || type === 'all') {
            if (!Email.current.value) {
                seterror({ emailError: 'Please enter email.' });
            }
            else if ((!Email.current.value.match(/^[a-zA-Z0-9.!#$%&'+/=?^_{|}~-]+@[a-zA-Z0-9-]+.+(?:\.[a-zA-Z0-9-]+)*$/))) {
                seterror({ emailError: 'Please check email strength.' });
            }
            else {
                seterror({ emailError: '' });
            }
        }

        if (type === 'Mobile' || type === 'all') {
            if (!Mobile.current.value) {
                seterror({ mobileError: 'Please enter mobile number.' });
            } else {
                seterror({ mobileError: '' });
            }
        }

        if (type === 'Password' || type === 'all') {
            if (!Password.current.value) {
                seterror({ passwordError: 'Please enter password.' });
            }
            else if ((!Password.current.value.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/))) {
                seterror({ passwordError: 'Please check password strength.' });
            }
            else {
                seterror({ passwordError: "" });
            }
        }

        if (type === 'confirmPassword' || type === 'all') {
            if (!confirmPassword.current.value) {
                seterror({ confirmpasswordError: 'Please enter password.' });
            }
            else if (Password.current.value === confirmPassword.current.value) {
                seterror({ confirmpasswordError: "" });
            }
            else {
                seterror({ confirmpasswordError: "Password and confirm password should match" });
            }
        }
    }

    const onSubmit = () => {
        let details = {
            username: Name.current.value,
            password: Password.current.value,
            email: Email.current.value,
            mobile: Mobile.current.value
        }
        if (!Name.current.value && !Password.current.value && !Email.current.value && !Mobile.current.value && !confirmPassword.current.value) {
            seterror({ nameError: 'Please enter username', passwordError: 'Please enter password.', mobileError: 'Please enter mobile number.', emailError: 'Please enter email.', confirmpasswordError: 'Please enter password.' })
        }
        else {
            setDetails({ username: Name.current.value, password: Password.current.value, email: Email.current.value, mobile: Mobile.current.value })
        }
        axios.post("https://ptchatindia.herokuapp.com/register", details)
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: "SUBMIT_REGISTER",
                        details
                    })
                }
            })
            .catch(err => console.log("error", err))
    }

    return (
        <div className='dark'>
            <div className='login-container'>
                <div className='login-box'>
                    <div className='login-header'>Register</div>
                    <div className='login-input'>
                        <label>Username</label>
                        <input type="text" className="input-change" placeholder="Enter Username..." ref={Name} onBlur={() => LoginData('Name')} />
                        {error && <div className='error-msg'>{error.nameError}</div>}
                    </div>
                    <div className='login-input'>
                        <label>Email</label>
                        <input type="text" className="input-change" placeholder="Enter Email..." ref={Email} onBlur={() => LoginData('Email')} />
                        {error &&  <div className='error-msg'>{error.emailError}</div>}
                    </div>
                    <div className='login-input'>
                        <label>Mobile</label>
                        <input type="number" className="input-change" placeholder="Enter Mobile..." ref={Mobile} onBlur={() => LoginData('Mobile')} />
                        {error &&  <div className='error-msg'>{error.mobileError}</div>}
                    </div>
                    <div className='login-input'>
                        <label>Password</label>
                        <input type="password" placeholder="Enter password..." className="input-change" ref={Password} onBlur={() => LoginData('Password')} />
                        {error &&  <div className='error-msg'>{error.passwordError}</div>}
                    </div>
                    <div className='login-input'>
                        <label>ConfirmPassword</label>
                        <input type="password" placeholder="Enter password..." className="input-change" ref={confirmPassword} onBlur={() => LoginData('confirmPassword')} />
                        {error &&  <div className='error-msg'>{error.confirmpasswordError}</div>}
                    </div>
                    <div className='login-submit'>
                        <button className='login-button' onClick={onSubmit}>Register</button>
                    </div>
                    <div className='register'>
                        <button >Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
