

export default function SignInForm({handleChange, handleSubmit, email, password}) {


    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" value={email} onChange={handleChange} placeholder="email"></input>
            <input type="text" name="password" value={password} onChange={handleChange} placeholder="password"></input>
            <input type="submit" value="sign-in"/>
        </form>
    )    
}