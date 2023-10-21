import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth'
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(''); //error message দেখানোর জন্য।
    const [success, setSuccess] = useState(''); // ‍success message দেখানোর জন্য।

    const handleSubmit = (event) => {
        //1. prevent page Refresh/Reload
        event.preventDefault() // preventDefault ছাড়া form submit করলে page reload হয়ে যাবে, অন্য কথাও চলে যাবে। যদি আমরা এটা আটকাতে চাই এবং reload ছাড়া আমরা data কে পেতে চাই তাহলে preventDefault ব্যবহার করতে হবে।
        // console.log(event.target.email.value) //এখানে email টা হলো input এর name
        // console.log(event.target.password.value) //এখানে password টা হলো input এর name

        setSuccess('')
        setError('')
        //2. collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        if (!/(?=.*[A-Z])/.test(password)) { //এখানে চেক করা হয়ে যদি A-Z পর্যন্ত password এর মধ্যে না থাকে তাহলে error show করবে।
            setError('Please Add at least one uppercase')
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)) { //এখানে চেক করা হয়ে যদি 0-9 পর্যন্ত password এর মধ্যে না থাকে তাহলে error show করবে।
            setError('Please add at least one number')
            return;
        }
        else if (password.length < 6) {
            setError('Please add at least 6 characters in your password');
            return;
        }

        //3 create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                setError('') // ‍login successful হলে, তাহলে error message empty হয়ে যাবে।
                event.target.reset() //login হওয়ার পরে input field Empty করার জন্য।
                setSuccess('User has been created successfully')
                sendVerificationEmail(result.user)
            })
            .catch(error => {
                console.error(error.message)
                setError(error.message)
                setSuccess('') //যদি success না হয় তাহলে Message Empty হয়ে যাবে।
            })
    }
    //send Email Verification 
    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result)
                alert('Please Verify your email address')
            })

    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        // console.log(event.target.value)
    }
    const handlePasswordBlur = (event) => {
        // console.log(event.target.value)
    }

    return (
        <div className='w-50 mx-auto '>
            <h2>Please Register</h2>
            <form onSubmit={handleSubmit}>
                {/* onChange দিয়ে event target করলে প্রতি key click এ event টিগার হবে এতে করে আলাদা আলাদা ভাবে show করবে console এ। এটা একটা পদ্ধতি*/}
                <input className='w-50 mb-4 rounded p-2 outline' onChange={handleEmailChange} type='email' name='email' id='email' placeholder='email' required />
                <br />
                <input className='w-50 mb-4 rounded p-2 outline' onBlur={handlePasswordBlur} type="password" name='password' id='password' placeholder='your password' required />
                <br />
                <input className='btn btn-primary' type="submit" value='Register' />
            </form>
            <p><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
            <p className='text-danger'> {error}</p>
            <p className='text-success fw-bold'>{success}</p>

        </div>
    );
};

export default Register;