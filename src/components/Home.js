import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            welcome guys
            <Link to="/register" > register</Link>
        </div>
    )
}

export default Home