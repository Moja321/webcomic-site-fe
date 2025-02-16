import React from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//import App from './App';

import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(

    // <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>            
    // </React.StrictMode>

);

// ReactDOM.render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
        
//     </React.StrictMode>
    
    
//     , document.getElementById('root')
// );