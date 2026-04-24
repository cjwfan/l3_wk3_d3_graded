import { useEffect, useState } from "react"

export default function Dashboard (){
    const [userData, setUserData] = useState([])
    const [showGender, setShowGender] = useState(true);
    const [error, setError] = useState("")
    

    useEffect(() => {
        async function getData() { 

            try {
                const res = await fetch("https://randomuser.me/api/?results=10")
                if (!res.ok)
                    throw new Error("Failed to get user!");
                
                const data = await res.json()
                console.log(data)
                setUserData(data.results)
                
            } catch (error) {
                console.error(error) 
            }     
            
        }
       
        getData()
    }, [])


    return (
      <>
        <h1>List of Users</h1>

        <button onClick={() => setShowGender(!showGender)}>
          {showGender ? "Hide Gender" : "Show Gender"}
        </button>

        <ul>
          {userData.map((person) => (
            <main key={person.login.uuid}>
              <h2>
                {person.name.title} {person.name.first} {person.name.last}
              </h2>
              <p>
                <img
                  src={person.picture.large}
                  alt={`${person.name.first} ${person.name.last}`}
                />
              </p>

              <ul>
                {showGender && <li>Gender: {person.gender}</li>}
                <li>Email: {person.email}</li>
                <li>Phone: {person.phone}</li>
                <li>
                  Location: {person.location.city} {person.location.state}
                </li>
              </ul>
            </main>
          ))}
        </ul>
      </>
    );
       
}
