import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incident, setIncidents] = useState([]);
    
    const history = useHistory();

    const ongId = localStorage.getItem('ongId'); //Pegando o nome da ONG
    const ongName = localStorage.getItem('ongName'); //Pegando o nome da ONG

    //Função responsável pela listagem 
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId, //Passando o ID da ONG para filtragem
            }
        }).then(response => {
            setIncidents(response.data); //Pegando o ARRAY com os dados
        })
    }, [ongId]);

    //Função para deletar
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, { //passando o id do caso
                headers: {
                    Authorization: ongId, //Passando o ID da ONG para filtragem
                }
            });

            setIncidents(incident.filter(incident => incident.id !== id)); //Removendo da tela o caso que foi excluido
        } catch (err) {
            alert('Erro ao deletar o caso, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vindo, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={() => handleLogout()} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incident.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}                
            </ul>
        </div>
    );
}