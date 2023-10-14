import { Link } from "react-router-dom"


const NotFound = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', justifyContent: 'center', height: '100dvh', width: '100dvw' }}>
            <h1>404</h1>
            <p>Page not found.</p>
            <Link style={{ marginTop:'16px' }} to='/'><p>Take me home</p></Link>
        </div>
    )
}

export default NotFound