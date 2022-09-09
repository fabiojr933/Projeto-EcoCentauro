import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import axios from 'axios';

function Login() {

    const [empresa, setEmpresa] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [empresaSelecionada, setEmpresaSelecionada] = useState('');
    var Navigate = useNavigate();

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
        try {
            var data = {
                'nome': usuario,
                'senha': senha
            }
            var config = {
                method: 'POST',
                url: api.base_url + '/login',
                data: data
            }
            const response = await axios(config);
            if (response.status == 200) {
                var dados = response.data;
                var token = {
                    ...dados,
                    'empresa': empresaSelecionada
                }
                localStorage.setItem('usuario', JSON.stringify(token));
                Navigate('/')
            }
        } catch (err) {

        }

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
                            <input type="text" className="form-control" name="usuario" onChange={(e) => { setUsuario(e.target.value) }} required />

                            <label className="form-label">Senha</label>
                            <input type="password" className="form-control" name="senha" onChange={(e) => { setSenha(e.target.value) }} required />

                            <label className="form-label">Empresa</label>
                            <select className="form-select" name='empresaSelecionada' onChange={(e) => { setEmpresaSelecionada(e.target.value) }} required>
                                {
                                    empresa.map((v) => (
                                        <option key={v.CODIGO} value={v.CODIGO} >{v.RAZAOSOCIAL}</option>
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