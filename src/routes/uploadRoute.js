const storage = require('../multerConfig')
const multer = require('multer')
const { PrismaClient } = require('@prisma/client')
const { Router } = require('express')
const express = require('express')
const fs = require('fs');
const csv = require('csv-parse');

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
            qtd_pedido: parseInt(data.qtd_pedido),
            embalagem_padrao: parseInt(data.embalagem_padrao),
            qtd_corrigida: parseInt(data.qtd_corrigida),
            data_colocacao: data.data_colocacao,
            semana_compra: data.semana_compra,
            rota_cod: data.rota_cod,
            centro: data.centro,
            rota: data.rota,
            preco_unitario: parseFloat(data.preco_unitario),
            valor_total: parseFloat(data.valor_total),
            dia_colocacao: data.dia_colocacao,
            comprador: data.comprador,
            de_chao: parseFloat(data.de_chao),
            de_simulado: parseFloat(data.de_simulado),
            de_fechamento_sim_viveo: parseFloat(data.de_fechamento_sim_viveo),
            politica: parseInt(data.politica),
            forecast: parseInt(data.forecast),
            estoque_chao: parseInt(data.estoque_chao),
            estoque_total: parseInt(data.estoque_total),
            delta_forecast: parseInt(data.delta_forecast),
            estoque_projetado_c_pedido: parseInt(data.estoque_projetado_c_pedido),
            de_com_pedido_filial: parseFloat(data.de_com_pedido_filial)

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










