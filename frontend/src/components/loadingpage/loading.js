import React from 'react';
import ReactLoading from 'react-loading';
import './loading.css'

function Loading() {

    return (
        <div className="loading">
            <ReactLoading type={'spin'} color={'rgb(211, 223, 225)'} height={'10%'} width={'10%'} />
        </div>
    );
  }
  
  export default Loading;