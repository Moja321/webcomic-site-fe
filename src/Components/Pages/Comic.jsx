import React from 'react'
import { useState, useEffect, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const Comic = () => {

  const {id} = useParams();

  const chapterid = 123;

  const navigate = useNavigate();

  const [chapters, setChapters] = useState({});

  useEffect(()=>{
      getChapters().then((data) => {
          if (data) {
              setChapters(data);
          }            
      });
  },[]);

  useEffect(()=>{
        console.log("chapters : ");
        console.log(chapters);
  },[chapters]);

  const getChapters= async () => {
    console.log("start of getChapters");

    try {

      const response = await fetch("http://localhost:3001/comics/" + id + "/comic"
        , {
    
            method: "GET",
    
          }
        );
        
        const data = await response.json();
    
        //data should be chapter id chosen
        console.log("data:");
        console.log(data);
        //setChapters(data);
        return data;

    } catch (error) {
      //setError(error.message);
      console.log(error);
    }

    
  }

  const goToChapter = (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);

      console.log("id is :" + id);
      navigate("/comics/" + id + "/" + formData.get("chapterid"));
  }

  return (
    <div>
      <h3>Comic id : {id}</h3>

      <h3>Chapters List:</h3>


      <form onSubmit={goToChapter}>
      <label for="chapterid">Choose a comic chapter:</label>
      <select name="chapterid" id="chapterid" required>
      {
          chapters["comic"] ? 
          chapters["comic"]["chapters"].map((chapters)=>(
            <option value={chapters._id}>{chapters.chapterTitle}</option>
          )) 
          : null

      }
      </select>
      {/* if statement and map loop goes here */}
        
      <input type="submit" value="Read chapter"/>
      <p>locals.errorMsg || "Choose a chapter and click 'read chapter' to start reading"</p>



      </form>
      

    </div>
  )
}

export default Comic

