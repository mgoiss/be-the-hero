import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import herosImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    //Função para coletar os dados da ONG
    async function handleLogin(e){
        e.preventDefault(); //Evitar que o formulario redirecione a pagina

        //Testanto se ocorreu tudo certo
        try {
            const response = await api.post('sessions', {id}); //Passando os dados para o back-end
            
            //Salvando o id e o nome da ONG no Storage do navegador
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name); 
            
            history.push('/profile'); //mudando para a tela profile

        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={ logoImg } alt="Be The Hero" />    

                <form onSubmit={handleLogin}>
                    <h1>FAÇA SEU LOGON</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={ herosImg } alt="Heros" />
        </div>
    )
}
