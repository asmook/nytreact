import React from 'react';

const Saved = (props) => (
<div className="card mt-4">
        <div className="card-header text-center">
            {props.title}
        </div>
    <div className="card-body">
        <a className="card-text" href={props.url}>{props.url}</a>
        <p className="card-text">{props.description}</p>
        <button className="btn" onClick={() => props.handleDeleteButton(props.id)}>Delete Saved Article</button>
    </div>
</div>
)

export default Saved