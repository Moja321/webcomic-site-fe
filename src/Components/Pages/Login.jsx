import React from 'react';
import { useState, useContext } from 'react';
import { Context } from '../../App';

const Login = () => {

  const [loggedinUser, setLoggedinUser] = useContext(Context);

  const [formValues, setFormValues] = useState({ title: 'One Piece'});
  const handleChange = (event) => {
      //notice the 2 different forms of deconstructuring used below*
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
  };

  const handleCreateComic = (event) => {
    console.log("Start of handleCreateComic():");
    event.preventDefault();

    let formData = new FormData();
    formData.append('title', event.target.title.value);
    formData.append('comicImg', event.target.comicImg.files[0]);
    formData.append('synopsis', event.target.synopsis.value);

    //const form = new FormData(event.target);

    alert('Submitted comic details for creation: Title:' + formValues.title);
    console.log("formData : ");
    //Display the key/value pairs
    for (var pair of formData.entries())
    {
      console.log(pair[0]+ ', '+ pair[1]); 
    }
    // console.log(formData);
    // console.log(formData.title);
    createComic(formData).then((data) => {
        alert('Comic :' + data.title + ' has been created!');
    });
} 

  const createComic = async (input) => { 
    console.log("start of register()");

    // const formData = new FormData();
 
    // formData.append("files", input.comicImg[0]);
    // input = { ...input, comicImg: input.comicImg[0].name };
    // formData.append("recipe", JSON.stringify(input));

    const response = await fetch("http://localhost:3001/editcomics", {

        method: "POST",
        credentials: 'include',
        
        body: input,

    });
    const data = await response.json();

    console.log("createComic result:");
    console.log(data);
    //setLoggedinUser(data);
    return data;

    //maybe need to refresh the page after succesful api call to update edit comics list
}

  return (
    <div className="">

      <div>Login</div>
      <p>Logged in user page of:  {loggedinUser["username"] || "none"} </p> 
      <p>This is where users can create or update comics/series</p>

      <h2>Create comic</h2>
      <form onSubmit={handleCreateComic} encType="multipart/form-data">
        <label for="title">Title:</label><br/>
        <input type="text" id="title" name="title" onChange={handleChange} value={formValues.title} required/><br/>

        <p>Upload thumbnail image for comic here:</p>
        <input type="file" accept="image/jpeg" id="comicImg" name="comicImg" required/><br/>
        <output id="preview"></output><br/>

        <label for="synopsis">Synopsis:</label><br/>
        <textarea id="synopsis" name="synopsis" rows="4" cols="50" required>blablabla</textarea><br/>
        
        <input type="submit" value="Submit"/>
      </form>
      <br/>

      <p>Click on a comic to edit/update</p>
      <h2>Comics List</h2>
      <ul>
          
        { loggedinUser["username"] ? 
            loggedinUser["comics"].map((comic)=>(
              <li>

                <p>{comic.title}</p>
                <img src={comic.mainImg} width="200px" alt="comic main image"/>
                <br/>
                <br/>
                <a href=""><button>EDIT</button></a>
                <form
                  style={{display: "inline"}}
                  action=""
                  method="POST"
                >
                  <input type="submit" value="DELETE" />
                </form>


              </li>
            ))
            
            : null
        }   

      </ul>




    </div>
    
  )
}

export default Login