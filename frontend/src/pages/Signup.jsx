import { Link } from 'react-router-dom'
import Input from '../components/Input'
import '../css/Login.css'
import { useState, useEffect } from 'react'
import Button from '../components/Button'
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [currentImg, setCurrentImg] = useState(0);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    
    const navigate = useNavigate();

    // Function to redirect to the /chat route
    const handleSignup = () => {
        localStorage.setItem('userId', 234)
        navigate("/chat");
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImg(currentImg => (currentImg + 1) % 4);
        }, 11000);
        return () => clearInterval(interval);
    }, []);



    return (
        <div className='loginContainer'>

            <div className='landing-right column'>
                <div className='loadingBar'></div>
                <div className='landing-right-imgCont'>
                    <img style={{ opacity: currentImg === 0 ? 1 : 0, backgroundColor: '#002D62' }} src="" />
                    <img style={{ opacity: currentImg === 1 ? 1 : 0, backgroundColor: '#97233F' }} src="" />
                    <img style={{ opacity: currentImg === 2 ? 1 : 0, backgroundColor: '#17B169' }} src="" />
                    <img style={{ opacity: currentImg === 3 ? 1 : 0, backgroundColor: '#1d1160' }} src="" />
                    <p style={{ opacity: currentImg === 0 ? 1 : 0 }}>Digital payment security relies heavily on MFA, requiring users to provide two or more forms of authentication, such as a password and a fingerprint scan or a one-time code sent to their mobile device. This added layer of security makes it more difficult for unauthorized individuals to access accounts.</p>
                    <p style={{ opacity: currentImg === 1 ? 1 : 0 }}>Tokenization is a process where sensitive card information is replaced with a unique token. These tokens are useless to hackers if intercepted, as they can only be used for specific transactions. This technology significantly reduces the risk of card data breaches.</p>
                    <p style={{ opacity: currentImg === 2 ? 1 : 0 }}>The introduction of EMV (Europay, Mastercard, and Visa) chip cards has increased digital payment security. These chips generate a unique transaction code for each payment, making it extremely difficult for criminals to clone cards and commit fraud.</p>
                    <p style={{ opacity: currentImg === 3 ? 1 : 0 }}>Digital payment transactions are often protected by end-to-end encryption, ensuring that data remains secure from the point of entry to its destination. This encryption makes it nearly impossible for cybercriminals to intercept and decipher sensitive payment information.</p>
                </div>
            </div>
            <div className="login">
                <div className='login-header'>
                    <h1>Signup</h1>
                    <p>to create an account</p>
                </div>

                <div className='login-body'>
                    <div className='login-body-inputField'>
                        <p>Full name</p>
                        <Input search={name} setSearch={setName} type='text' placeHolder='' />
                    </div>
                    <div className='login-body-inputField'>
                        <p>Email address</p>
                        <Input search={email} setSearch={setEmail} type='email' placeHolder='' />
                    </div>
                    <div className='login-body-inputField'>
                        <p>Password</p>
                        <Input search={password} setSearch={setPassword} type='password' placeHolder='' />
                    </div>

                    <Button handleClick={async () => { handleSignup() }} style={{ marginTop: '8px' }} text='Click to signup' variant='primary' size='l' />
                </div>

                <p>Have an account? <Link to='/login'>Login</Link></p>
            </div>


        </div>
    )
}

export default Signup