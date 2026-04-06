import React, { useEffect } from 'react';
import axios from 'axios';
//import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';



export default function RegisterUser() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validateSchema),
    mode: 'onChange'
  });
  const [submitError, setSubmitError] = React.useState(null);


  const onSubmit = data => {axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/signup`, {
    username: data.Brukernavn,
    email: data.Email,
    password: data.BekreftPassord
  })
  .then(response => {
    console.log(response);
    if (response.data.status === "success") {
      window.location.href = '/login';
    } else {
        setSubmitError(response.data.data.message || "Noe gikk galt, prøv igjen senere.");
    }
  }).catch(error => {
    console.error(error);
    setSubmitError(error.response?.data?.data?.message || "Noe gikk galt, prøv igjen senere.");
  })
};

/*
// Google login || Functional but unused
const [user, setUser] = useState([]);
const [profile, setProfile] = useState([]);


const login = useGoogleLogin({
  onSuccess: async (tokenResponse) => setUser(tokenResponse),
  onError: error => console.log('Login failed:', error),
  flow: 'implicit',
  scope: 'openid profile email'
});

useEffect(
  () => {
    if (user) {
      axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      }).then((res) => {
        setProfile(res.data);
      })
      .catch((err) => console.log(err));
    }
  },
  [user]
)

*/
  
  return (
    <div>
        <section>
        <h2>Registrer bruker</h2>
        </section>
    <form onSubmit={handleSubmit(onSubmit)}>
            {submitError && <p>{submitError}</p>}
      <input type="text" placeholder="Brukernavn" {...register("Brukernavn")} />
        <p>{errors.Brukernavn?.message}</p>
      <input type="text" placeholder="Email" {...register("Email")} />
        <p>{errors.Email?.message}</p>
      <input type="password" placeholder="Passord" {...register("Passord")} />
        <p>{errors.Passord?.message}</p>
      <input type="password" placeholder="Bekreft passord" {...register("BekreftPassord")} />
        <p>{errors.BekreftPassord?.message}</p>
      <input disabled={!!errors.Brukernavn || !!errors.Email || !!errors.Passord || !!errors.BekreftPassord} type="submit" />
    </form>
    
    </div>
  );
}

  const validateSchema = Yup.object().shape({
    Passord: Yup.string()
        .required('Passord er påkrevd')
        .min(6, 'Please ikke bruk "passord123", minst 6 tegn'),
    BekreftPassord: Yup.string()
        .oneOf([Yup.ref('Passord'), null], 'Passordene må være like')
        .required('Påkrevd, for å bekrefte passordet'),
    Email: Yup.string()
        .required('Påkrevd, er så du kan bruke "glemt passord"')
        .email('Email er den med @ og sånt'),
    Brukernavn: Yup.string()
        .required('Brukernavn er påkrevd')
        .min(3, 'Minst 3 tegn')
        .max(24, 'Bruk kortere navn, max 24 tegn'),
  });