import React ,{useEffect, useState}from 'react'

const Navbar = ({appdata,logo}) => {
    // const [data,setDataState]=useState(2)
    // const [stringdata,setStringState]=useState("b")
    // const [arraystate,setArrayState]=useState([89,"true","a"])
    // console.log(data)
    // console.log(stringdata)
    // console.log(arraystate)
    const [count,setCount]=useState(6)
    
    useEffect(()=>{ alert('effect rendered')
      // console.log('effect rendered')
      console.log("Count is" + count)
    },[count])
  return (
    <>
    {/* {appdata.appname} {logo} */}
    <button className='w-[6rem] h-[6rem] bg-blue-500 text-white' onClick={()=>{setCount(count+1)}}>
    Count{count}
    </button>
    </>
  )
}

export default Navbar