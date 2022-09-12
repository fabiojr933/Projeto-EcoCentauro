import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import { Chart } from "react-google-charts";
import axios from "axios";
import api from '../services/api';
import { toast } from 'react-toastify';


function ListaCentroCusto() {

    const [load, setLoad] = useState(false);
    const [dados, setDados] = useState([]);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        async function load() {
            var usuario = localStorage.getItem('usuario');
            var empresa = JSON.parse(usuario).empresa;
            try {
                var data = {
                    'empresa': empresa
                }
                var config = {
                    method: 'POST',
                    url: api.base_url + '/listaCentroCusto',
                    data: data
                }
                const resposta = await axios(config);
                if (resposta.status == 200) {
                    setDados(resposta.data);
                    toast.info('Dados carregado com sucesso');
                }
            } catch (error) {
                toast.error(error.response.data.error);
            }
            setLoad(true);
        }
        load();
    }, []);

    async function Marcado(event) {
        event.preventDefault();
        if (check == true) {
            setCheck(false);
        } else {
            setCheck(true)
        }
    }
    async function gerarGrafico(event) {
        event.preventDefault();
        console.log(event)
    }


    if (load === false) {
        return (
            <div className='text-center' style={{ marginTop: 100 }}>
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Carregando aguarde...
                </button>
            </div>
        )
    }
    else {
        return (
            <>
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                                <Header />
                                <Navbar />
                                <br />
                                <h2>Lista de fluxo financeiro</h2>

                                <form onSubmit={gerarGrafico}>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" onClick={Marcado} checked={check} id="defaultCheck1" />
                                        <label class="form-check-label" for="defaultCheck1">
                                            Marcar todos
                                        </label>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Gerar grafico</button>

                                    <div className="table-responsive">
                                        <table className="table table-striped table-sm">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Codigo</th>
                                                    <th scope="col">Centro de custo</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ marginLeft: 40 }}>
                                                {
                                                    dados.map((v) => (
                                                        <>
                                                            <div class="list-group">
                                                                <label class="list-group-item">
                                                                    <input class="form-check-input me-1" type="checkbox" name='CENTROCUSTO' checked={check} value={v.CODIGOCC} />
                                                                    {v.CENTROCUSTO}
                                                                </label>
                                                            </div>
                                                        </>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </form>
                            </main>
                        </div>
                    </div>
                </div >
            </>
        )
    }

}
export default ListaCentroCusto;