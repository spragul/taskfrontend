import React from 'react';

export function Loading(){
   
    return(
        <div className="text-center">
            <h1>Loading..</h1>
      <div
        className="spinner-border"
        role="status"
        style={{ height: "150px", width: "150px", marginTop: "100px", color:"green"}}
      >
      </div>
    </div>

    )
}