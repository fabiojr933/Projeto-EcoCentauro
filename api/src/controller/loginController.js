var Firebird = require('node-firebird');
const firebirdConfig = require('../config/firebirdConfig');
var sha1 = require('sha1');

class loginController {
    async login(req, res) {
        try {
            var nome = req.body.nome.toUpperCase();
            var senha = req.body.senha;
            if (nome == undefined || senha == undefined) {
                return res.status(400).json({
                    error: 'Os paramentos são obrigatorios!!',
                    paramentos: 'nome, senha'
                });
            }

            Firebird.attach(firebirdConfig, async function (err, db) {
                if (err) {
                    return res.status(400).json({
                        error: 'Erro ao executar SQL',
                        paramentos: 'SQL login'
                    });
                }

                db.query(` select A.usuario, A.senha
                        FROM tgerusuario A
                        WHERE A.usuario = '${nome}'`, async (err, result) => {
                    db.detach();
                    var user = result[0].USUARIO.toString();
                    var pass = result[0].SENHA.toString();
                    if (pass === sha1(nome + senha)) {
                        var data = {
                            'usuario': nome,
                            'token': Math.random().toString(15).substring(2),
                        }
                        res.status(200).json(data);
                    } else {
                        res.status(401).json({ 'Error': 'usuario ou senha invalidos' });
                    }
                });

            });
        } catch (error) {
            return res.status(400).json({
                error: 'Erro ao executar SQL',
                paramentos: 'SQL login'
            });
        }
    }

    async listaEmpresa(req, res) {
        try {
            var resultado = [];
            Firebird.attach(firebirdConfig, async function (err, db) {
                if (err) {
                    return res.status(400).json({
                        error: 'Erro ao executar SQL',
                        paramentos: 'SQL ListaEmpresa'
                    });
                }
                db.query(`select a.CODIGO, a.CPFCNPJ, a.RAZAOSOCIAL from TGEREMPRESA a order by a.CODIGO asc`, async (err, result) => {
                    db.detach();
                    result.forEach(v => {
                        resultado.unshift({ 'CODIGO': v.CODIGO.toString(), 'CPFCNPJ': v.CPFCNPJ.toString(), 'RAZAOSOCIAL': v.RAZAOSOCIAL.toString() });

                    });
                    res.status(200).json(resultado)
                });

            });
        } catch (error) {
            return res.status(400).json({
                error: 'Erro ao executar SQL',
                paramentos: 'SQL ListaEmpresa'
            });
        }
    }
}
module.exports = loginController;