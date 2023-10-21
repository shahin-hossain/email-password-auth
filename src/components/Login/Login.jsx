import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(); // useRef use করার কারণ হলো, সরাসরি input Field থেকে data কে Hook করে emailRef এর মধ্যে store করার জন্য।

    const handleLogin = (event) => {
        event.preventDefault()

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        //login Validation 
        //login এ সাধারনত validation করার দরকার নেই, ঐটা শুধু registration এ করতে হবে।
        setError('') //reset error
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Please add at least two uppercase letter.')
            return;
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Please add al least one special characters.')
            return;
        }
        else if (password.length < 6) {
            setError('Password must be 6 characters long.')
        }

        // sign in email & password pass

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                if (!loggedUser.emailVerified) {
                    alert('Your Account is not Verified')
                    // return;
                }
                setSuccess('User Login successful')
                setError('');

            })
            .catch(error => {
                setError(error.message);
                setSuccess('');
            })
    }

    //Reset Password
    const handleResetPassword = event => {
        const email = emailRef.current.value;
        if (!email) {
            alert('please provide your email address to reset')
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please Check Your Email')
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
            })
    }
    return (
        <div className='w-25 mx-auto'>

            <form onSubmit={handleLogin}>
                <h2 className="text-center">Login</h2>
                <div className="form-group mb-3">
                    <label htmlFor="email">Username</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your username"
                        ref={emailRef} //react এর একটি Props হলো এ ref={}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
            <p>Forget Password ? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></p>
            <p><small>New this website please <Link to='/register'>Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>

        </div>
    );
};

export default Login;