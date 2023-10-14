
import { Link } from "react-router-dom"
import Button from '../components/Button'

const Unauthorized = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center', height: '100dvh', width: '100dvw' }}>
            <h1>401</h1>
            <p>Not authorized.</p>
            <Link to='/login'>
                <Button size="l" variant='primary' text='Take me home' />
            </Link>
        </div>
    )
}

export default Unauthorized