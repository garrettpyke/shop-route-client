import { useState } from "react";

const loginUrl = "http://localhost:8000/sign-in/";

export default function SignInForm({ tokenInfo, setTokenInfo }) {
  const [user, setUser] = useState({ email: "", password: "" });

  // Handles fields for user log-in
  const handleChange = (event) => {
    event.persist();
    setUser((prevUser) => {
      const editedUser = {
        ...prevUser,
        [event.target.name]: event.target.value,
      };
      return editedUser;
    });
  };

  // Submits email & password to API & stores Token in State variable. Token is passed to components through props.
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(loginUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        //remove this block later
        console.log("data is ", data);
        return data;
      })
      .then((data) => setTokenInfo(data))
      .then(() => setUser({ email: "", password: "" }));
  };

  // console.log('tokenInfo is ', tokenInfo) //remove later

  return (
    <div className="form sign-in">
      <h3>Welcome! Please sign in.</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="email"
        ></input>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="password"
        ></input>
        <input type="submit" value="sign-in" />
      </form>
    </div>
  );
}
