import axios from 'axios'
import { useState } from 'react';

function Login(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) =>{
        e.preventDefault();

        try {
            console.log("Email:", email);
            console.log("Password:", senha);

            const response = await axios.post(
                'http://localhost:3000/auth-contratantes',
                JSON.stringify({email, senha}),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            console.log("Response:", response.data);  

        } catch (error) {
            if(!error?.response){
                setError("Erro ao acessar o servidor")
            }
            else if(error.response.status === 401){
                setError("Usuário ou senha inválidos")
            }
        }
    };

    return(
        <div className="login-form-warp">
            <h2>Login</h2>
            <form className="login-form">
                <input type="email" name="email" placeholder="Digite o seu email" onChange={(e)=>setEmail(e.target.value)} required/>
                <input type="password" name="password" placeholder="Digite a sua senha" onChange={(e)=>setSenha(e.target.value)} required/>
                <button type="submit" className='btn-login' onClick={(e) => handleLogin(e)}>Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;
