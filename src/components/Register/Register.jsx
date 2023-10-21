import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import app from '../../firebase/firebase.config';

const Register = () => {
    const [email, setEmail] = useState('');

    const auth = getAuth(app);

    const handleSubmit = (event) => {
        //1. prevent page Refresh/Reload
        event.preventDefault() // preventDefault ছাড়া form submit করলে page reload হয়ে যাবে, অন্য কথাও চলে যাবে। যদি আমরা এটা আটকাতে চাই এবং reload ছাড়া আমরা data কে পেতে চাই তাহলে preventDefault ব্যবহার করতে হবে।
        // console.log(event.target.email.value) //এখানে email টা হলো input এর name
        // console.log(event.target.password.value) //এখানে password টা হলো input এর name

        //2. collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        // console.log(email, password)
        //3 create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
            })
            .catch(error => {
                console.error(error)
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
        <div className='w-50 mx-auto'>
            <h2>Please Register</h2>
            <form onSubmit={handleSubmit}>
                {/* onChange দিয়ে event target করলে প্রতি key click এ event টিগার হবে এতে করে আলাদা আলাদা ভাবে show করবে console এ। এটা একটা পদ্ধতি*/}
                <input className='w-50 mb-4 rounded p-2 outline' onChange={handleEmailChange} type='email' name='email' id='email' placeholder='email' />
                <br />
                <input className='w-50 mb-4 rounded p-2 outline' onBlur={handlePasswordBlur} type="password" name='password' id='password' placeholder='your password' />
                <br />
                <input className='btn btn-primary' type="submit" value='Register' />
            </form>
        </div>
    );
};

export default Register;