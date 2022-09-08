import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import { Chart } from "react-google-charts";
import moment from 'moment';

export const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
];


function clienteMaiorCompra() {
/*
    const [dataInicial, setDataIncial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [qtde, setRegistros] = useState('');
    const [empresa, setEmpresa] = useState('');

    */

    async function Carregar() {

        /*
        try {
            var data = {
                description: description,
                title: title,
                alarm: alarm
            }
            var config = {
                method: 'POST',
                url: api.base_url + '/task',                
                data: data
            }

            try {
                const response = await axios(config);
                if (response.status == 201) {
                    history.push('/home');
                }
        
        } catch (error) {

        }
        */
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Header />
                        <Navbar />
                        <div className="table-responsive">

                            <form>
                                <div className="row">
                                    <div className="col">
                                        <label class="form-label">Data Inicial</label>
                                        <input type="date" class="form-control" />
                                    </div>
                                    <div className="col">
                                        <label class="form-label">Data Final</label>
                                        <input type="date" class="form-control" />
                                    </div>
                                    <div className="col">
                                        <label class="form-label">Trazer quandos registros?</label>
                                        <input type="number" value='15' class="form-control" placeholder='Trazer quandos registros? ' />
                                    </div>
                                </div><br />
                                <button type="submit" class="btn btn-primary">Carregar</button>
                            </form>

                            <br />
                            <Chart
                                chartType="Bar"
                                width="100%"
                                height="400px"
                                data={data}
                            />
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default clienteMaiorCompra;