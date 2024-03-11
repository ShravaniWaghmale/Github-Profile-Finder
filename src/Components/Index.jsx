import React from 'react'
import { useEffect, useState } from "react";
import User from './User';

function Index() {
    const[username, setUsername] = useState('ShravaniWaghmale')
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    
    async function fetchGithubUSerData() {
        setLoading(true)
        const res = await fetch(`https://api.github.com/users/${username}`)
        const data = await res.json()

        if(data) {
            setUserData(data)
            setLoading(false)
            setUsername('')
        }
        console.log(data)
    }

    function handleSubmit() {
        fetchGithubUSerData()
    }

    useEffect(() => {
        fetchGithubUSerData()
    },[])

    if(loading) {
        return <h1>Loading data! Please wait</h1>
    }

    return (
        <div className="github-profile-container">
            <div className="inptu-wrapper">
                <input 
                name="search-by-username"
                type="text"
                placeholder="Search Github Username..."
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                />
                <button onClick={handleSubmit}>Search</button>
            </div>
            { userData !== null ? <User user={userData}/> : null } 
        </div>
    )
}

export default Index
