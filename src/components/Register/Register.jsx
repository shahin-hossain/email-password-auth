import React, { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault() // preventDefault ছাড়া form submit করলে page refresh হয়ে যাবে, অন্য কথাও চলে যাবে। যদি আমরা এটা আটকাতে চাই এবং refresh ছাড়া আমরা data কে পেতে চাই তাহলে preventDefault ব্যবহার করতে হবে।
        // console.log(event.target.email.value) //এখানে email টা হলো input এর name
        // console.log(event.target.password.value) //এখানে password টা হলো input এর name
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        // console.log(event.target.value)
    }
    const handlePasswordBlur = (event) => {
        // console.log(event.target.value)
    }
    return (
        <div>
            <h2>Please Register</h2>
            <form onSubmit={handleSubmit}>
                {/* onChange দিয়ে event target করলে প্রতি key click এ event টিগার হবে এতে করে আলাদা আলাদা ভাবে show করবে console এ। এটা একটা পদ্ধতি*/}
                <input onChange={handleEmailChange} type='email' name='email' id='email' placeholder='email' />
                <br />
                <input onBlur={handlePasswordBlur} type="password" name='password' id='password' placeholder='your password' />
                <br />
                <input type="submit" value='Register' />
            </form>
        </div>
    );
};

export default Register;