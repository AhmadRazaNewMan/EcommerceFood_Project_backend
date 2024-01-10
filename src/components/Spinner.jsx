import React from 'react'

function Spinner() {
  return (
    <>
    {/* <div><p>Loading.....</p></div> */}
    <div className='spinner'>
      <div className='spinner-border' role='status'>
        {/* <span className='visually-hidden'>Loading....</span> */}

      </div>
    </div>
    </>
  )
}

export default Spinner
