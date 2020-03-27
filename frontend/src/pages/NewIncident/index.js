import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    //Criando Estado para armazenar os dados informados pelo usuário
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    //Funçao de Navegação do JavaScript
    const history = useHistory();

    //Função para coletar os dados da ONG
    async function handleNewIncicent(e){
        e.preventDefault(); //Evitar que o formulario redirecione a pagina

        const data = {
            title,
            description,
            value, 
        };

        //Testanto se ocorreu tudo certo
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            }); //Passando os dados para o back-end

            alert('Caso cadastrado com sucesso.'); //Exibindo mensagem

            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    
    return (
        <div className="new-incident-container">
            <div className= "content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncicent}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />            

                    <button className="button" type="submit">Cadastrar</button>                   
                </form>
            </div>
        </div>
    )
}