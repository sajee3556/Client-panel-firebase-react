import React from 'react';
import {Link} from 'react-router-dom';

export default ()=>{
    return(
        <Link to="/clients/add" >
           <i className="fas fa-plus"/>New
        </Link>
    )
}