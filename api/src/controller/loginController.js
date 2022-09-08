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

                await db.query(` select A.usuario, A.senha
                        FROM tgerusuario A
                        WHERE A.usuario = '${nome}'`, async (err, result) => {
                    db.detach();
                    var user = result[0].USUARIO.toString();
                    var pass = result[0].SENHA.toString();
                    console.log('banco  ' + pass + '  -  ' + ' paramentro ' + senha + ' ' + sha1(senha));
                    if (pass === sha1(senha)) {
                        console.log('senha igual')
                        console.log(pass + '  -  ' + sha1(senha));
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
}
module.exports = loginController;