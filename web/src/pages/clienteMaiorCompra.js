
import Navbar from '../components/navbar';
import Header from '../components/header';
import Home from '../components/home';
import { Chart } from "react-google-charts";

export const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
];


function clienteMaiorCompra() {
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
                                <button type="submit" class="btn btn-primary">Carregar....</button>
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