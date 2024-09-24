import { useEffect } from "react"

const Auth = () => {
    const initValues = {
        username: '',
        userpassword: ''
    } 
    const [user, setUser] = useState(initValues)
    const [newUser, setNewUser] = useState(true)
    
    const toggle = () => {
        setNewUser(prevStatus => !prevStatus)
    } 
    const handleChange = (e) => {
        const {name, value} = e.target
        setUser
    } 
    const handleSignUp = (e) => {
        e.preventDefault()
        // signup
    }
    const handleLogin = (e) => {
        e.preventDefault()
        // login
    }
    
    useEffect(()=> {

    }, [])

    return (
        <>
            {newUser
                ?
            <form onSubmit={handleSignUp}>
                <input 
                type="text" 
                value={user[username]}
                name='username'
                placeholder="Username..."
                onChange={handleChange}
                />
                <input 
                type="text" 
                value={user[userpassword]}
                name='password'
                placeholder="Pasword..."
                onChange={handleChange}
                />
                <button>Sign Up</button>
                <p onClick={toggle()}>Already signed up?</p>
            </form>
            :
            <form onSubmit={handleLogin}>
                <input 
                type="text" 
                value={user[username]}
                name='username'
                placeholder="Username..."
                onChange={handleChange}
                />
                <input 
                type="text" 
                value={user[password]}
                name='password'
                placeholder="Pasword..."
                onChange={handleChange}
                />
                <button>Sign In</button>
                <p onClick={toggle()}>Not signed up yet?</p>
            </form>
            }
        </>
    )
}
export {Auth}