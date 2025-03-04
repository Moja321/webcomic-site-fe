import React from 'react'
import { useState, useContext } from 'react';
import { Context } from '../../App';
//import { data } from 'react-router-dom';

const Upload = () => {

    const [loggedinUser, setLoggedinUser] = useContext(Context);

    var createdUser;

    const [formData, setFormData] = useState({ username: 'Zack', password: 'Zack123' });
    const handleChange = (event) => {
        //notice the 2 different forms of deconstructuring used below*
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const [regData, setRegData] = useState({ username:'Brock', password:'Brock123', email:'Brock@yahoo.com' });
    const handleRegChange = (event) => {
        const { name, value } = event.target;
        setRegData({ ...regData, [name]: value});
    }

    
    //const [name, setName] = React.useState('');
    const handleSubmit = (event) => {
        console.log("Start of handleSubmit():");
        event.preventDefault();
        alert('Submitted Name: ' + formData.username + ', Submitted Password: ' + formData.password);
        login(formData);
    }

    const handleLogout = (event) => {
        console.log("Logging out...");
        event.preventDefault();
        alert('Logging out user : ' + loggedinUser["username"]);
        logout().then((data) => {setLoggedinUser(data)});
    }

    const handleRegister = (event) => {
        console.log("Start of handleRegister():");
        event.preventDefault();
        alert('Submitted Name for registration: ' + regData.username + ', Submitted Password: ' + regData.password + ', Submitted Email: ' + regData.email);
        register(regData).then((data) => {
            alert('User :' + data.createdUser + ' has been registered!');
        });
    } 

    const register = async (input) => { 
        console.log("start of register()");

        const response = await fetch("http://localhost:3001/signup", {

            method: "POST",
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',      
            },
            body: JSON.stringify(input),

        });
        const data = await response.json();

        console.log("signup request result:");
        console.log(data);
        //setLoggedinUser(data);
        return data;
    }

    const login = async (input) => { 
        console.log("start of login()");

        const response = await fetch("http://localhost:3001/login", {

            method: "POST",
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',      
            },
            body: JSON.stringify(input),

        });
        const data = await response.json();

        console.log("login request result:");
        console.log(data);
        setLoggedinUser(data);
    }

    const logout = async () => {
        console.log("start of auth");

        const response = await fetch("http://localhost:3001/login/logout"
        , {

            method: "GET",
            credentials: 'include',

        }
        );
        
        const data = await response.json();

        return data;
    }

  return (
    <div className="upload">
        <div>Upload</div>
        <div className="register" style={{marginBottom:"20px"}}>
            <h2>Register</h2>
    
            <form onSubmit={handleRegister}>
                <label for="reg-username">Username:</label><br/>
                <input type="text" id="reg-username" name="username" value={regData.username} onChange={handleRegChange} required/><br/>
                <label for="reg-password">Password:</label><br/>
                <input type="password" id="reg-password" name="password" value={regData.password} onChange={handleRegChange} required/><br/>
                <label for="reg-email">Email:</label><br/>
                <input type="email" id="reg-email" name="email" value={regData.email} onChange={handleRegChange} required/><br/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
            <p>User created: {createdUser || "none"}  </p> 
        </div>

        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label for="login-username">Username:</label><br/>
                <input type="text" id="login-username" name="username" value={formData.username} onChange={handleChange} required/><br/>
                <label for="login-password">Password:</label><br/>
                <input type="password" id="login-password" name="password" value={formData.password} onChange={handleChange} required/><br/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
            <p>User logged-in: {loggedinUser["username"] || "none"}  </p>
        </div>
        { loggedinUser["username"] ? 
            <form onSubmit={handleLogout} method="GET">
                <button type="submit">Logout</button>
            </form> 
            : null
        }   
        </div>
    
  )
}

export default Upload