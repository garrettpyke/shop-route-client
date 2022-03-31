import React, { useState } from 'react'

const loginUrl = 'http://localhost:8000/sign-in/'

export default function Home() {
    const [tokenInfo, setTokenInfo] = useState({user:{id: 0, email: "", token: ""}})
    const [user, setUser] = useState({email: "", password: ""})

    const handleChange = event => {
        event.persist()
        setUser(prevUser => {
        const editedUser = {...prevUser, [event.target.name] : event.target.value}
        return editedUser
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        fetch(loginUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {                     //remove this block later
                console.log('data is ', data)
                return data
              })
            .then(data => setTokenInfo(data))
            .then(() => setUser({email: "", password: ""}))
    }

    console.log('tokenInfo is ', tokenInfo) //remove later

    return (
        <>
            <div className="sign-in">
                <h3>Welcome! Please sign in.</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="email"></input>
                    <input type="text" name="password" value={user.password} onChange={handleChange} placeholder="password"></input>
                    <input type="submit" value="sign-in"/>
                </form>
            </div>
            {tokenInfo.user?.token ? (<h3>You're in!</h3>) : null}
        </>
    )
}

