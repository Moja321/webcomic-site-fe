import React from 'react'
import { useState, useContext } from 'react';
import { Context } from '../../App';

const Upload = () => {

    const [loggedinUser, setLoggedinUser] = useContext(Context);

    var createdUser;

    const [formData, setFormData] = useState({ username: 'Zack', password: 'Zack123' });
    const handleChange = (event) => {
        //notice the 2 different forms of deconstructuring used below*
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    
    //const [name, setName] = React.useState('');
    const handleSubmit = (event) => {
        console.log("Start of handleSubmit:");
        event.preventDefault();
        alert('Submitted Name: ' + formData.username + ', Submitted Password: ' + formData.password);
        login (formData);
    }

    const handleLogout = (event) => {
        console.log("Logging out...");
        event.preventDefault();
        alert('Logging out user : ' + loggedinUser["username"]);
        logout().then((data) => {setLoggedinUser(data)});
    }

    const login = async (input) => { 
        console.log("start of handleLogin");

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
    
            <form action="" method="POST">
                <label for="username">Username:</label><br/>
                <input type="text" id="username" name="username" defaultValue="John"/><br/>
                <label for="email">E-mail:</label><br/>
                <input type="email" id="email" name="email" defaultValue="John@yahoo.com"/><br/>
                <label for="password">Password:</label><br/>
                <input type="password" id="password" name="password" defaultValue="John123"/><br/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
            <p>User created: {createdUser || "none"}  </p> 
        </div>

        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label for="username">Username:</label><br/>
                <input type="text" id="loginusername" name="username" value={formData.username} onChange={handleChange}/><br/>
                <label for="password">Password:</label><br/>
                <input type="password" id="loginpassword" name="password" value={formData.password} onChange={handleChange}/><br/>
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