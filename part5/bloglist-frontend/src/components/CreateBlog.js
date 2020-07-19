import React from 'react'

const CreateBlog = props => (
    <form onSubmit={props.handleSubmit}>
        <h1>create new</h1>
        title:
        <input
            type="text"
            name="title"
            value={props.title}
            onChange={e => props.setTitle(e.target.value)}
        /><br />
        author:
        <input
            type="text"
            name="author"
            value={props.author}
            onChange={e => props.setAuthor(e.target.value)}
        /><br />        
        url:
        <input
            type="text"
            name="url"
            value={props.url}
            onChange={e => props.setUrl(e.target.value)}
        /><br />
        <button onClick={props.handleCreateBlog}>create</button>
    </form>
)

export default CreateBlog