import loadingSpinner from '../assets/loadingSpinner.svg'
import '../css/Loading.css'

const Loading = ({...props}) => {
    return (
        <div className={props.className} style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center', height: '100dvh', width: '100dvw' }}>
            <img className='loadingPage-spinner' style={{ height: '32px' }} src={loadingSpinner} alt="Loading Spinner" />
            <p style={{ fontSize:'20px' }}>Loading...</p>
        </div>
    )
}

export default Loading