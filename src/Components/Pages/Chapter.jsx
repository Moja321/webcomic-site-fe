import React from 'react';
import { useState, useEffect, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const Chapter = () => {

    const navigate = useNavigate();

    const {id,chapterid} = useParams();

    const [chapterImgs , setChapterImgs] = useState({});

    //TODO1: getChapterImgs(): api function for getting spesific chapter image addresses

    //TODO2: call the above at beggining of this components render, assign acquired payload to chapterImgs

    //TODO3: if chapterImgs has been populated, render the images in jsx below

    useEffect(()=>{
          getChapterImgs().then((data) => {
              if (data) {
                setChapterImgs(data);
              }            
          });
      },[]);
    
      useEffect(()=>{
            console.log("chapterImgs : ");
            console.log(chapterImgs);
      },[chapterImgs]);
    
      const getChapterImgs= async () => {
        console.log("start of getChapterImgs");
    
        try {
    
          const response = await fetch("http://localhost:3001/comics/" + id + "/" + chapterid
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
        <p>Comic id: {id}</p>
        <p>Chapter id: {chapterid}</p>

        

      <h3>Chapters List:</h3>


      <form onSubmit={goToChapter}>
      <label for="chapterid">Choose a comic chapter:</label>
      <select name="chapterid" id="chapterid" required>
      {
          chapterImgs["chapterImgs"] ? 
          chapterImgs["chapterImgs"][0]["comics"]["chapters"].map((chapters)=>(
            <option value={chapters._id}>{chapters.chapterTitle}</option>
          )) 
          : null

      }
      </select>
      {/* if statement and map loop goes here */}
        
      <input type="submit" value="Read chapter"/>
      </form>
      <div className="pages-container">

        <ul>
        {
          chapterImgs["chapterImgs"] ? 
          chapterImgs["chapterImgs"][0]["comics"]["chapters"].map((chapters)=>(
            chapters._id == chapterid ? 
            
            chapters["pageImg"].map((page)=>(

              <p>{page}</p>

            ))

            : null
          )) 
          : null

      }
        </ul>
      </div>
    </div>
  )
}

export default Chapter