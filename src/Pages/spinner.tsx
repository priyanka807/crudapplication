import React from 'react'

const Spinner = () => {
 

  const keyframes = {
    '@keyframes spin':{
    '0%':{
  transform:'rotate(0deg)'
    },
    '100%':{
   transform :'rotate(360deg)'
    }

    }
  }
 
  return (
    <div className='d-flex justify-content-center'>
<div className='spinner-border text-primary role="status"  style={{width: "3rem", height: "3rem"}}'></div>
{/* <div style={{border:'4px solid blue',borderRadius:'50%',animation:'spin 6s linear infinite',height:'3rem',width:'3rem'}}> */}



</div>
  )
}

export default Spinner