import React, { useEffect, useState } from 'react'; //import React object from 'react' library

//require("dotenv").config();

import './App.css';

import DarkMode from './DarkMode/DarkMode';
import Navbar from './Components/Navbar/Navbar';

const App2 = () => {
    var createdUser;
    //var loggedinUser;
    const [loggedinUser, setLoggedinUser] = useState({});

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

        console.log(data);
        setLoggedinUser(data);
        //console.log(data.Plot);

        //never do this:
        //movies = data.search;

        //instead, state can only be modified using the setState function:
        //setMovies(data.Search);
    }
    

    return (
        <div className="app">

            <DarkMode />
            <Navbar />
            <h1>Content...</h1>
            
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


        </div>
    )
    
}

export default App2;