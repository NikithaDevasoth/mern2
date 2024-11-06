import React from 'react'

function TwClasses() {
  return (//h-96:predefined:height:24rem
    //h-screen:height:100vh
    <div className="h-96 w-screen flex flex-row justify-center items-center bg-white-50>
    text-pink-600 text-3xl font-bold ">
        <div className='rounded-md p-10 border-pink-50 hover:shadow-lg hover:shadow-pink-500 hover:bg-pink-100/20 
        '>Hello</div>
        <div className='rounded-md p-10 border-purple-200 hover:shadow-lg hover:shadow-purple-500 hover:bg-pink-100/20 
        '>
        Hello
    </div>
    </div>
  )
}

export default TwClasses