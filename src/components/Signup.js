// Imports
import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const { REACT_APP_SERVER_URL } = process.env;

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //make sure password and confirmPassword are equal
        //password length is greater than or equal to 8 chars
        if (password === confirmPassword && password.length >= 8) {
            const newUser = { name, email, password };
            axios.post(`${REACT_APP_SERVER_URL}/users/register`, newUser)
            .then(response => {
                console.log('====> Yay, new user')
                console.log(response)
                setRedirect(true)
            })
            .catch(error => console.log('===> Error in Signup', error))
        }else {
            if(password !== confirmPassword) return alert('Passwords do not match')
            alert('Password needs to be at lease 8 characters, Please try again')
        }
    }

    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Signup</h2>
                    <from onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={name} onChange={handleName} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" value={email} onChange={handleEmail} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" value={password} onChange={handlePassword} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="text" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} className="form-control"></input>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </from>
                </div>
            </div>
        </div>
    )
}

export default Signup;
