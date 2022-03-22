import React, { useEffect, useState } from 'react';
import axios from 'axios';


function ValueTotal(){

    const [posts, setPosts] = useState('');

    useEffect(() => {  
        axios.get("https://financereview.herokuapp.com/total").then((res) => {
            setPosts(res.data)
            console.log(res);       
        }).catch((err) => {
            console.log(err.response)
        })
            
    })

    let formatted = new Intl.NumberFormat("pt-BR", {
        style: 'currency',
        currency: 'BRL'

    }).format(posts  / 100)
    
    return(
        <div>
            <p>{formatted}</p>
        </div>
    )
}

export default ValueTotal;