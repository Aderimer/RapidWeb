import axios from 'axios';



const Register = () => {
    function Register(data) {
        const username = data.target.username.value;
        const email = data.target.email.value;
        const password = data.target.password.value;
        const passwordConfirm = data.target.passwordConfirm.value;

        if (password !== passwordConfirm) {
            alert("Passwords do not match!");
            return;
        } else {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/signup`, {
                username: username,
                email: email,
                password: password
            })
        }

    }
    return (
        <div>
            <h1>Register</h1>
            <p>Please fill out the form to register.</p>
            <div>
                <form onSubmit={Register}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                    <label htmlFor="passwordConfirm">Confirm Password:</label>
                    <input type="password" id="passwordConfirm" name="passwordConfirm" required />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register;