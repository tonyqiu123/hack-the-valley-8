import { Link } from "react-router-dom"
import Button from '../components/Button'

const NotFound = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center', height: '100dvh', width: '100dvw' }}>
            <h1>404</h1>
            <p>Page not found.</p>
            <Link to='/'>
                <Button size="l" variant='primary' text='Take me home' />
            </Link>
        </div>
    )
}

export default NotFound