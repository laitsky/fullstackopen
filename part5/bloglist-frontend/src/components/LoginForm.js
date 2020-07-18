import React from 'react'

const LoginForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <h1>log in to application</h1>
        {
            <div style={{color: 'red'}}>
                {props.warning}
            </div>
        } <br />
        username 
        <input
            type="text"
            name="username"
            value={props.username}
            onChange={e => props.setUsername(e.target.value)}
        /> <br/>
        password 
        <input
            type="password"
            name="password" 
            value={props.password}
            onChange={e => props.setPassword(e.target.value)}
        /> <br/>
        <button>login</button>
    </form>
)

export default LoginForm