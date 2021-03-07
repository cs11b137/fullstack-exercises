import React, { useState } from 'react'

const Togglable = (props) => {
    const [isVisible, setVisible] = useState(false)

    const hide = { display: isVisible ? 'none' : '' }
    const show = { display: isVisible ? '' : 'none' }


    
    return (
        <div>
            <div style={hide}>
                <button onClick={() => setVisible(true)}>new blog</button>
            </div>
            <div style={show}>
                {props.children}
                <button onClick={() => setVisible(false)}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable;