import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css';
import { toast } from 'react-toastify';

import api from "../../services/api";

function Filme(){
    const { id } = useParams();
    const navigation = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}` , {
                params:{
                    api_key: 'e835ad415f6a33c06f8a84507b23aa28',
                    language: 'pt-BR'
                }
            })
            .then((response) => {
                setFilme(response.data);
                console.log(response);
                setLoading(false);
            }) 
            .catch(() => {
                navigation('/', { replace: true });
                return;
            })
        }

        loadFilme();

        return() => {
            console.log('Componente foi desmontado')
        }
    }, [navigation, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@devflix');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme){
            toast.warning('Esse filme já está na sua lista!')
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@devflix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!')

    }

    if(loading){
        return(
            <div className="filme-info">
                <h1> Carregando detalhes... </h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1> {filme.title} </h1>

            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3> Sinopse </h3>
            <span> {filme.overview} </span>
            <strong> Avaliaçã0: {filme.vote_average.toFixed(1)} / 10 </strong>

            <div className="area-buttons">
                <button onClick={salvarFilme} > Salvar </button>
                <button> 
                    <a 
                        href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
                        target="blank"
                        rel="external"
                    > Trailer </a> 
                </button>
            </div>
        </div>
    )
}

export default Filme;