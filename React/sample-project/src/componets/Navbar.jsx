import React ,{useState}from 'react'

const Navbar = ({appdata,logo}) => {
    const [data,setDataState]=useState(2)
    const [stringdata,setStringState]=useState("b")
    const [arraystate,setArrayState]=useState([89,"true","a"])
    console.log(data)
    console.log(stringdata)
    console.log(arraystate)
  return (
    <>
    {appdata.appname} {logo}
    </>
  )
}

export default Navbar