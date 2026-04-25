import { useEffect, useState } from "react"

export default function Dashboard (){
    const [userData, setUserData] = useState([])
    const [error, setError] = useState("")
    

    useEffect(() => {
        async function getData() { 

            try {
                const res = await fetch("https://randomuser.me/api/?results=10")
                if (!res.ok)
                    throw new Error("Failed to get user!");
                
                const data = await res.json()
                // console.log(data)
                setUserData(data.results)
                
            } catch (error) {
                console.error(error) 
                setError("Something went wrong fetching users")
            }     
            
        }
       
        getData()
    }, [])

    function alphaSort(){
      // console.log("sort clicked")

      const sortedUsers = [...userData].sort((personA, personB) =>
      personA.name.last.localeCompare(personB.name.last)
    )
    setUserData(sortedUsers)
    }
     
  

    return (
      <>
        <h1>List of Users</h1>

        <button onClick={alphaSort}>Sort by Last Name</button>

        
          <ul>
          {userData.map((person) => (
            <li key={person.login.uuid}>
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
                 <li>Gender: {person.gender}</li>
                <li>Email: {person.email}</li>
                <li>Phone: {person.phone}</li>
                <li>
                  Location: {person.location.city} {person.location.state}
                </li>
              </ul>
            </li>
          ))}
        </ul>
        {error && <p>{error}</p>}
      </>
    );
       
}
