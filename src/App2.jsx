import React, { useEffect, useState } from 'react'; //import React object from 'react' library

//require("dotenv").config();

import './App.css';

import DarkMode from './DarkMode/DarkMode';
import Navbar from './Components/Navbar/Navbar';
import AllComics from './Components/Comics/AllComics';

const App2 = () => {
    const numbers = [{value1: 1, value2: 2, value3: 3},{value1: 4, value2: 5, value3: 6},{value1: 7, value2: 8, value3: 9}];
    var createdUser;
    //var loggedinUser;
    const [loggedinUser, setLoggedinUser] = useState({user : "none"});

    useEffect(()=>{
        auth().then((data) => {
            if (data) {
                setLoggedinUser(data);
            }
            
        });
        //auth();         //console.log("auth() was called");
    },[]);

    useEffect(()=>{
        console.log(loggedinUser);
    },[loggedinUser]);

    const auth = async () => { 
        console.log("start of auth");
        try {

            const response = await fetch("http://localhost:3001/"
                , {
        
                  method: "GET",
                  credentials: 'include',
                //   headers: {
                //     'Content-Type': 'application/json',      
                //   },
                //   body: JSON.stringify(input),
        
                }
                );
                
                const data = await response.json();
                //setLoggedinUser(data, ()=>{console.log("Hello!")});
        
                return data;

        } catch (error) {
            //setError(error.message);
            console.log(error);
        }
        

        

        //console.log(data);
        // if (loggedinUser == {}) {
        //     setLoggedinUser(data);
        // }
        //setLoggedinUser(data);
        // console.log(data);
        // console.log(loggedinUser);
        
        
        //console.log(data.Plot);

        //never do this:
        //movies = data.search;

        //instead, state can only be modified using the setState function:
        //setMovies(data.Search);
    }

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
        //console.log(data.Plot);

        //never do this:
        //movies = data.search;

        //instead, state can only be modified using the setState function:
        //setMovies(data.Search);
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
        <div className="app">

            <DarkMode />
            <Navbar username = {loggedinUser["username"] || "none"}/>
            <h1>Content...</h1>
            
            <div className="content">

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

                <div className="upload">
                    <form action="/editcomics" method="POST" enctype="multipart/form-data">
                        <label for="title">Title:</label><br/>
                        <input type="text" id="title" name="title" value="One Piece" required/><br/>

                        <p>Upload thumbnail image for comic here:</p>
                        <input type="file" accept="image/*" id="comicImg" name="comicImg" required/><br/>
                        <output id="preview"></output><br/>

                        <label for="synopsis">Synopsis:</label><br/>
                        <textarea id="synopsis" name="synopsis" rows="4" cols="50" required>blablabla</textarea><br/>
                        
                        <input type="submit" value="Submit"/>
                    </form>
                </div>

                

                {/* { loggedinUser["username"] ? 
               
                loggedinUser["comics"].map((comics)=>{
                    return (
                        <p>{comics["title"]}</p>
                    )
                
                })
                    
                    
                    : null
                } */}

                { loggedinUser["username"] ? 
                    
                    <ul>
                        {loggedinUser["comics"].map((comics)=>{
                            return (
                            <li>
                                <p>{comics["title"]}</p>
                                <p>comic id: {comics["_id"]}</p>
                                <img src={comics["mainImg"]} width="200px" alt="comic main image"/>
                                <a href="/"><button >EDIT</button></a>
                                <form style={{display: "inline"}} >
                                    <input type="submit" value="DELETE" />
                                    
                                </form>
                            </li> )
                        })}
                     </ul>
                    
                    : null
                }

                    <ul>
                        {numbers.map((number) =>
                        <il>
                            <div>{number.value1}</div>
                            <div>{number.value2}</div>
                            <div>{number.value3}</div>
                        </il>
                        )}
                    </ul>

                    <h3>Comics by : {loggedinUser["username"]}</h3>

                    {loggedinUser["username"] ? 

                        <ul>
                            {loggedinUser["comics"].map((comics)=>{
                                return (
                                    <li>
                                    <p>{comics.title}</p>
                                    <img src={comics.mainImg} width="200px" alt="comic main image"/><br/>
                                    <p>Synopsis: {comics.synopsis}</p>
                                    <p>Likes: {comics.likes}</p>
                                    <a href="/"><button>Go to comic</button></a>
                                </li>)
                            })}
                        </ul>

                        : null
                    
                    }
                    
                
                    <AllComics/>

            </div>

        </div>
            
    )
    
}

export default App2;