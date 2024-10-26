import Navbar from "./componets/Navbar"


const App = () => {
    const data={
        appname:"Hello"
        

    }
    const logo="mylogo"
    var myName="NIKITHA"
  return (
    <>
    <h1 className="font-serif">{myName}</h1>
    <p className="text-red-800">{logo}</p>    
    <Navbar appdata={data} logo={logo} />
</>

  )
}

export default App 