const storage = require('../multerConfig')
const multer = require('multer')
const { PrismaClient } = require('@prisma/client')
const { Router } = require('express')
const express = require('express')

const upload = multer({storage: storage})
const prisma = new PrismaClient
const router = Router()

router.use("/files", express.static("uploads"))

router.post('/upload', upload.single('file') ,(req, res) => {

    const arquivoImportado = '../uploads/' + req.file.filename

    fs.createReadStream(arquivoImportado)
    .pipe(csv.parse({ columns: true, delimiter: ';' }))
    .on('data', async (data) => {

        const dadosTratados = {
            tipo_de_compra: data.tipo_de_compra,
            codigo: data.codigo,
            descricao: data.descricao,
            fornecedor: data.fornecedor,
            qtd_pedido: data.qtd_pedido,
            embalagem_padrao: data.embalagem_padrao,
            qtd_corrigida: data.qtd_corrigida,
            data_colocacao: data.data_colocacao,
            semana_compra: data.semana_compra,
            rota_cod: data.rota_cod,
            centro: data.centro,
            rota: data.rota,
            preco_unitario: data.preco_unitario,
            valor_total: data.valor_total,
            dia_colocacao: data.dia_colocacao,
            comprador: data.comprador,
            de_chao: data.de_chao,
            de_simulado: data.de_simulado,
            de_fechamento_sim_viveo: data.de_fechamento_sim_viveo,
            politica: data.politica,
            forecast: data.forecast,
            estoque_chao: data.estoque_chao,
            estoque_total: data.estoque_total,
            delta_forecast: data.delta_forecast,
            estoque_projetado_c_pedido: data.estoque_projetado_c_pedido,
            de_com_pedido_filial: data.de_com_pedido_filial

        };

        await prisma.Map.create({
            data: dadosTratados
        });

    })
    .on('end', () => {
        console.log('Leitura do arquivo finalizada.');
        res.send('Arquivo importado e processado com sucesso.');
    });

})

module.exports = router










