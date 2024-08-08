const Auth = (props) => {
    const {
        handleChange,
        handleSubmit,
        btnTxt,
        user: {
            username,
            password
        }
    } = props
    return (
        <form onSubmit={handleSubmit}>
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
            <button>{btnTxt}</button>
        </form>
    )
}
export {Auth}