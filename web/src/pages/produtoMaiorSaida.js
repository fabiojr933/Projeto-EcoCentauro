import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import { Chart } from "react-google-charts";
import axios from "axios";
import api from '../services/api';
import { toast } from 'react-toastify';


export const options = {
    title: "Produto maior saida",
    is3D: true,
};
export const options2 = {
    chart: {
        title: "Produto maior saida",
    },
};

function ProdutoMaiorSaida() {

    const [dataInicial, setDataInicial] = useState(null);
    const [dataFinal, setDataFinal] = useState(null);
    const [qtde, setRegistros] = useState(null);
    const [dataGrafico, setDataGrafico] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [load, setLoad] = useState(false);



    useEffect(() => {
        async function load() {
            var semDados = [
                ['Produto', 'quantidade']
                ['Sem dados', 0.00],
            ]
            setDataGrafico(semDados);
            setLoad(true)
        }
        load();
    }, []);


    async function Carregar(event) {

        event.preventDefault();
        var usuario = localStorage.getItem('usuario');
        var empresa = JSON.parse(usuario).empresa;

        try {
            var data = {
                'dataInicial': dataInicial,
                'dataFinal': dataFinal,
                'qtde': qtde,
                'empresa': empresa
            }
            var config = {
                method: 'POST',
                url: api.base_url + '/produtoMaiorSaida',
                data: data
            }
            const resposta = await axios(config);
            var dados = [];
            if (resposta.status == 200) {
                setDataTable(resposta.data);
                resposta.data.map((v) => {
                    dados.push([v.PRODUTO, v.QUANTIDADE]);
                });

                dados.unshift(['Produto', 'Quantidade']);
                setLoad(true);
                setDataGrafico(dados)
                toast.info('Dados carregado com sucesso');
            }

        } catch (error) {
            var semDados = [
                ['Produto', 'Valor']
                ['Sem dados', 0.00],
            ]
            setDataGrafico(semDados);
            toast.error(error.response.data.error);
        }
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
                                <div className="table-responsive">

                                    <form onSubmit={Carregar}>
                                        <div className="row">
                                            <div className="col">
                                                <label class="form-label">Data Inicial</label>
                                                <input type="date" class="form-control" name="dataInicial" onChange={(e) => { setDataInicial(e.target.value) }} required />
                                            </div>
                                            <div className="col">
                                                <label class="form-label">Data Final</label>
                                                <input type="date" class="form-control" name="dataFinal" onChange={(e) => { setDataFinal(e.target.value) }} required />
                                            </div>
                                            <div className="col">
                                                <label class="form-label">Trazer quandos registros?</label>
                                                <input type="number" class="form-control" placeholder='Trazer quandos registros? ' required name="qtde" onChange={(e) => { setRegistros(e.target.value) }} />
                                            </div>
                                        </div><br />
                                        <button type="submit" class="btn btn-primary">Carregar</button>
                                    </form>

                                    <br />
                                    <Chart
                                        chartType="PieChart"
                                        data={dataGrafico}
                                        options={options}
                                        width={"90%"}
                                        height={"400px"}
                                    />
                                    <br />
                                    <Chart
                                        chartType="Bar"
                                        width="90%"
                                        height="400px"
                                        data={dataGrafico}
                                        options={options2}
                                    />

                                </div><br />
                                <h2>Clientes com maior compra</h2>
                                <div className="table-responsive">
                                    <table className="table table-striped table-sm">
                                        <thead>
                                            <tr>
                                                <th scope="col">CODIGO</th>
                                                <th scope="col">PRODUTO</th>
                                                <th scope="col">QUANTIDADE</th>
                                                <th scope="col">VALOR</th>
                                                <th scope="col">LUCRO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataTable.map((v) => (
                                                    <tr>
                                                        <td>{v.CODIGO}</td>
                                                        <td>{v.PRODUTO}</td>
                                                        <td>{v.QUANTIDADE}</td>
                                                        <td>R$ {v.VALOR}</td>
                                                        <td>R$ {v.LUCRO}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </main>
                        </div>
                    </div>
                </div >
            </>
        )
    }

}
export default ProdutoMaiorSaida;