import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';



export default function Login() {
    const [submitError, setSubmitError] = React.useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get('email');
        const password = data.get('password');

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
            email,
            password
        })
        .then((response) => {
            if (response.data.status === "success") {
                setCookie('jwt', response.data.data.token);
                window.location.href = '/';
            } else {
                setSubmitError(response.data.data.result || "Noe gikk galt, prøv igjen senere.");
            }
        })
        .catch((error) => {
            console.error('Error logging in:', error);
        });
    };

    return (
        <div>
            <h1>Logg inn</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder='tipsoss@politiet.no' name="email" required />
                <br />
                <label htmlFor="password">Passord:</label>
                <input type="password" id="password" placeholder='************' name="password" required />
                <br />
                <button type="submit">Logg inn</button>
            </form>
            <section>
                {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
            </section>
        </div>
    );
};
