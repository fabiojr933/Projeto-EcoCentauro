var Firebird = require('node-firebird');
const firebirdConfig = require('../config/firebirdConfig');


class graficoController {
    async clienteMaiorCompra(req, res) {
        try {
            var qtde = req.body.qtde;
            var dataInicial = req.body.dataInicial;
            var dataFinal = req.body.dataFinal;
            var empresa = req.body.empresa;

            if (qtde == undefined || dataFinal == undefined || dataFinal == undefined || empresa == undefined) {
                return res.status(400).json({
                    error: 'Os paramentos são obrigatorios!!',
                    paramentos: 'Codigo da empresa, Data inicial, Data final, Qtde registro'
                });
            }

            var resultado = [];
            Firebird.attach(firebirdConfig, async function (err, db) {
                if (err) {
                    return res.status(400).json({
                        error: 'Erro ao executar SQL',
                        paramentos: 'SQL clienteMaiorCompra'
                    });
                }

                await db.query(` select first ${qtde}
                VDA.CLIENTE as CODIGO, coalesce(VDA.CLIENTENOME, VDA.CLIENTENOME || VDA.CLIENTE) as CLIENTE,
                SUM(PVD.VENDIDO) AS VALOR
                from TVENPEDIDO VDA
                inner join TVENPRODUTO PVD on (PVD.EMPRESA = VDA.EMPRESA and PVD.PEDIDO = VDA.CODIGO)
                left outer join TESTPRODUTO PDT on (PDT.EMPRESA = PVD.EMPRESA and PDT.PRODUTO = PVD.PRODUTO)
                left outer join TESTPRODUTOGERAL PDG on (PDG.CODIGO = PDT.PRODUTO)
                left outer join TESTNATUREZA NAT on (NAT.CODIGO = VDA.TIPOOPERACAO)
                left outer join TRECCLIENTEGERAL CLG on (CLG.CODIGO = VDA.CLIENTE)
                left outer join TVENCONSUMIDOR C on (C.CODIGO = VDA.CONSUMIDOR)
                where VDA.EMPRESA = ${empresa} and
                    VDA.STATUS = 'EFE' and
                    PVD.PRODUTOGARANTIA <> 'S' and
                    VDA.DATAEFE between '${dataInicial}' and '${dataFinal}' and
                    NAT.GERAESTATISTICA = 'S' and
                    VDA.GERAFINANCEIRO = 'S'
                    AND NOT CLG.nome containing  'CONSUMIDOR'
                    group BY 1,2 ORDER BY VALOR desc`, async (err, result) => {
                    db.detach();

                    if (result === [] || result.length === 0 || result == undefined) {
                        return res.status(400).json({
                            error: 'Não foi encontro nehum registro',
                            paramentos: 'SQL clienteMaiorCompra'
                        });
                    }


                    result.forEach(v => {
                        resultado.unshift({ 'CODIGO': v.CODIGO.toString(), 'CLIENTE': v.CLIENTE.toString(), 'VALOR': Number(v.VALOR.toString()) });

                    });
                    res.status(200).json(resultado)
                });

            });
        } catch (error) {
            return res.status(400).json({
                error: 'Erro ao executar SQL',
                paramentos: 'SQL clienteMaiorCompra'
            });
        }
    }

    async produtoMaiorSaida(req, res) {
        try {
            var qtde = req.body.qtde;
            var dataInicial = req.body.dataInicial;
            var dataFinal = req.body.dataFinal;
            var empresa = req.body.empresa;

            if (qtde == undefined || dataFinal == undefined || dataFinal == undefined || empresa == undefined) {
                return res.status(400).json({
                    error: 'Os paramentos são obrigatorios!!',
                    paramentos: 'Codigo da empresa, Data inicial, Data final, Qtde registro'
                });
            }

            var resultado = [];
            Firebird.attach(firebirdConfig, async function (err, db) {
                if (err) {
                    return res.status(400).json({
                        error: 'Erro ao executar SQL',
                        paramentos: 'SQL produtoMaiorSaida'
                    });
                }


                await db.query(` 
            select  first ${qtde}
            PDV.PRODUTO as CODPRO,
                  case
                    when PDG.PRODUTOGRADE is not null then PDG.DESCRICAOGRADE
                    when PDV.PRODUTOGENERICO = 'S' then PDV.DESCRICAOEDITADA
                    else PDG.DESCRICAO
                  end as DESCPRO,
                  case
                    when PDV.TIPOVENDA = 'D' then cast((PDV.QTDE * (-1)) as numeric(18,3))
                    else cast(PDV.QTDE as numeric(18,3))
                  end as QUANTIDADE,
                  case
                    when PDV.TIPOVENDA = 'D' then cast((PDV.VLRLIQUIDO * (-1)) as numeric(18,2))
                    else cast(PDV.VLRLIQUIDO as numeric(18,2))
                  end as VLRLIQUIDO,
           
                  case
                    when PDV.TIPOVENDA = 'D' then (PDV.LUCROLIQUIDOOBTIDO * (-1))
                    else PDV.LUCROLIQUIDOOBTIDO
                  end as LUCROLIQUIDOOBTIDO
           
           from TVENPEDIDO PED
           left outer join TVENPRODUTO PDV on (PDV.EMPRESA = PED.EMPRESA and PDV.PEDIDO = PED.CODIGO)
           left outer join TESTPRODUTO PDT on (PDT.EMPRESA = PDV.EMPRESA and PDT.PRODUTO = PDV.PRODUTO)
           left outer join TESTPRODUTOGERAL PDG on (PDG.CODIGO = PDT.PRODUTO)
           left outer join TESTNATUREZA NAT on (PED.TIPOOPERACAO = NAT.CODIGO)
           left outer join TESTGRUPOICMS GRP on (GRP.CODIGOID = PDV.GRUPOICMS)
           left outer join TESTMARCA MAR on (MAR.CODIGO = PDG.MARCA)
           left outer join TGEREMPRESA EMPR on (PED.EMPRESA = EMPR.CODIGO)
           inner join TRECCLIENTEGERAL CLI on (CLI.CODIGO = PED.CLIENTE)
           inner join TGERCIDADE CID on (CID.CODIGO = CLI.CIDADE)
           join TESTGRUPO G on (G.EMPRESA = PDT.EMPRESA) and (G.CODIGO = PDT.GRUPO)
           where (PED.EMPRESA = ${empresa}) and
                 PED.STATUS = 'EFE' and
                 PDV.PRODUTOGARANTIA <> 'S' and
                 PED.DATAEFE between '${dataInicial}' and '${dataFinal}'
           order by QUANTIDADE DESC
            `, async (err, result) => {
                    db.detach();

                    if (result === [] || result.length === 0 || result == undefined) {
                        return res.status(400).json({
                            error: 'Não foi encontro nehum registro',
                            paramentos: 'SQL produto mairo saida'
                        });
                    }

                    result.forEach(v => {
                        resultado.unshift({
                            'CODIGO': v.CODPRO.toString(), 'PRODUTO': v.DESCPRO.toString(), 'QUANTIDADE': Number(v.QUANTIDADE.toString()),
                            'VALOR': Number(v.VLRLIQUIDO.toString()), 'LUCRO': Number(v.LUCROLIQUIDOOBTIDO.toString())
                        });

                    });
                    res.status(200).json(resultado)
                });

            });
        } catch (error) {
            return res.status(400).json({
                error: 'Erro ao executar SQL',
                paramentos: 'SQL produtoMaiorSaida'
            });
        }
    }

    async vendasPorVendedor(req, res) {
        try {
            var dataInicial = req.body.dataInicial;
            var dataFinal = req.body.dataFinal;
            var empresa = req.body.empresa;

            console.log(dataFinal, dataInicial, empresa)
            if (dataInicial == undefined || dataFinal == undefined || empresa == undefined) {
                return res.status(400).json({
                    error: 'Os paramentos são obrigatorios!!',
                    paramentos: 'Codigo da empresa, Data inicial, Data final'
                });
            }

            var resultado = [];
            Firebird.attach(firebirdConfig, async function (err, db) {
                if (err)
                    return res.status(400).json({
                        error: 'Erro ao executar SQL',
                        paramentos: 'SQL vendasPorVendedor'
                    });

                await db.query(`select
                        VDD.CODIGO || '-' || VDD.NOME as VENDEDOR,
                        SUM(PDV.VLRLIQUIDO) as VLRLIQUIDO,
                        SUM(PDV.vlrdesc) AS DESCONTO
                    from TVENPEDIDO PED
                    inner join TVENPRODUTO PDV on (PDV.EMPRESA = PED.EMPRESA and PDV.PEDIDO = PED.CODIGO)
                    inner join TESTPRODUTO PDT on (PDT.EMPRESA = PDV.EMPRESA and PDT.PRODUTO = PDV.PRODUTO)
                    inner join TESTPRODUTOGERAL PDG on (PDG.CODIGO = PDT.PRODUTO)
                    inner join TESTSUBGRUPO SUB on (SUB.EMPRESA = PDT.EMPRESA and SUB.GRUPO = PDT.GRUPO and SUB.SUBGRUPO = PDT.SUBGRUPO)
                    left outer join TESTCONDPAGVENDA CON on (CON.EMPRESA = PED.EMPRESA and CON.CODIGO = PED.CONDICAOPAGTO)
                    left outer join TESTNATUREZA NAT on (NAT.CODIGO = PED.TIPOOPERACAO)
                    left outer join TVENVENDEDOR VDD on (VDD.EMPRESA = PED.EMPRESA and VDD.CODIGO = PED.VENDEDOR)
                    where PED.EMPRESA = '${empresa}' and
                        PED.STATUS = 'EFE' and
                        PED.DATAEFE >= '${dataInicial}' and
                        PED.DATAEFE <= '${dataFinal}' and
                        PDV.PRODUTOGARANTIA <> 'S' and
                        NAT.GERAESTATISTICA = 'S' and
                        ((PDV.TIPOGRUPO = 'R') or (PDV.TIPOGRUPO = 'S')) and
                        PDV.TIPOVENDA in ('A', 'M', 'N') and
                        PED.GERAFINANCEIRO = 'S'   
                        group BY 1`, async (err, result) => {
                    db.detach();

                    if (result === [] || result.length === 0 || result == undefined) {
                        return res.status(400).json({
                            error: 'Não foi encontro nehum registro',
                            paramentos: 'SQL vendasPorVendedor'
                        });
                    }

                    result.forEach(v => {
                        resultado.unshift({ 'VENDEDOR': v.VENDEDOR.toString(), 'VLRLIQUIDO': Number(v.VLRLIQUIDO.toString()), 'DESCONTO': Number(v.DESCONTO.toString()) });

                    });
                    res.status(200).json(resultado)
                });

            });
        } catch (error) {
            return res.status(400).json({
                error: 'Erro ao executar SQL',
                paramentos: 'SQL vendasPorVendedor'
            });
        }
    }

    async listaCentroCusto(req, res) {
        try {
            var empresa = req.body.empresa;
           
            if (empresa == undefined) {
                return res.status(400).json({
                    error: 'Os paramentos são obrigatorios!!',
                    paramentos: 'Codigo da empresa'
                });
            }

            var resultado = [];
            Firebird.attach(firebirdConfig, async function (err, db) {
                if (err)
                    return res.status(400).json({
                        error: 'Erro ao executar SQL',
                        paramentos: 'SQL listaCentroCusto'
                    });

                await db.query(`select a.codigocc, a.descricao2 AS CENTROCUSTO from TGERCENTROCUSTO a  where a.empresa = '${empresa}' and a.ativa = 'S' and a.tipo = 'A'`, async (err, result) => {
                    db.detach();

                    if (result === [] || result.length === 0 || result == undefined) {
                        return res.status(400).json({
                            error: 'Não foi encontro nehum registro',
                            paramentos: 'SQL listaCentroCusto'
                        });
                    }

                    result.forEach(v => {
                        resultado.unshift({'CODIGOCC': v.CODIGOCC.toString(), 'CENTROCUSTO': v.CENTROCUSTO.toString() });

                    });
                    res.status(200).json(resultado)
                });

            });
        } catch (error) {
            return res.status(400).json({
                error: 'Erro ao executar SQL',
                paramentos: 'SQL vendasPorVendedor'
            });
        }
    }
}

module.exports = graficoController;