import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import { Chart } from "react-google-charts";
import axios from "axios";
import api from '../services/api';

export const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
];


function ClienteMaiorCompra() {

    const [dataInicial, setDataInicial] = useState(null);
    const [dataFinal, setDataFinal] = useState(null);
    const [qtde, setRegistros] = useState(null);
    const [dataGrafico, setDataGrafico] = useState([]);


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
                url: api.base_url + '/clienteMaiorCompra',
                data: data
            }           
            const resposta = await axios(config);
            var dados = [];
            if (resposta.status == 200) {
                resposta.data.map((v) => {
                    dados.push({ 'CLIENTE': v.CLIENTE, 'VALOR': v.VALOR });
                });
                JSON.parse(dados);
                setDataGrafico()
                console.log(dados);
            }

        } catch (error) {

        }

    }

    return (
        <>
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
                                width="100%"
                                height="400px"
                                data={dataGrafico}
                            />
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default ClienteMaiorCompra;