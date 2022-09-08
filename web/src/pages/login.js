import React, { useEffect, useState } from 'react';
import api from '../services/api';
import axios from 'axios';

function Login() {

    const [empresa, setEmpresa] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [empresaSelecionada, setEmpresaSelecionada] = useState('');

    useEffect(() => {
        async function Load() {
            var config = {
                method: 'GET',
                url: api.base_url + '/empresa',
            }

            try {
                const response = await axios(config);
                if (response.status == 200) {
                    setEmpresa(response.data);
                }
            } catch (error) {

            }
        }
        Load();
    }, []);

    async function Login(event) {
        event.preventDefault();
        console.log(usuario, senha, empresaSelecionada)

    }

    return (
        <>

            <div className="container sm">
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col">

                        <form onSubmit={Login}> <br /><br />    <br /><br />   <br /><br />
                            <h1 className="h3 mb-3 fw-normal">Login</h1>

                            <label className="form-label">Usuario</label>   
                            <input type="text" className="form-control" name="usuario" onChange={(e) => { setUsuario(e.target.value) }} />

                            <label className="form-label">Senha</label>
                            <input type="text" className="form-control" name="senha" onChange={(e) => { setSenha(e.target.value) }} />

                            <label className="form-label">Empresa</label>
                            <select className="form-select" name='empresaSelecionada' onChange={(e) => { setEmpresaSelecionada(e.target.value) }}>
                                <option selected>Selecione uma empresa</option>
                                {
                                    empresa.map((v) => (
                                        <option value={v.CODIGO} >{v.RAZAOSOCIAL}</option>
                                    ))
                                }

                            </select><br />
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
                        </form>

                    </div>
                    <div className="col">
                    </div>
                </div>


            </div>

        </>
    )
}
export default Login;