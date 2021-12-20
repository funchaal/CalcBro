const express = require('express')
const router = express.Router()

router.get('/raiz', (req, res) => {
    res.render('./calc/raiz/raiz')
})

router.get('/potencia', (req, res) => {
    res.render('./calc/potencia/potencia')
})

router.get('/trapezio', (req, res) => {
    res.redirect('/calc/trapezio/area')
})

router.get('/trapezio/area', (req, res) => {
    res.render('./calc/trapezio/area')
})

router.get('/trapezio/altura', (req, res) => {
    res.render('./calc/trapezio/altura')
})

router.get('/trapezio/base', (req, res) => {
    res.render('./calc/trapezio/base')
})

router.get('/trapezio/base-media', (req, res) => {
    res.render('./calc/trapezio/base_media')
})

router.get('/trapezio/mediana-de-euler', (req, res) => {
    res.render('./calc/trapezio/mediana_de_euler')
})

router.get('/poligono', (req, res) => {
    res.redirect('/calc/poligono/apotema')
})

router.get('/poligono/apotema', (req, res) => {
    res.render('./calc/poligono/apotema')
})

router.get('/poligono/area', (req, res) => {
    res.render('./calc/poligono/area')
})

router.get('/poligono/perimetro', (req, res) => {
    res.render('./calc/poligono/perimetro')
})

router.get('/poligono/semiperimetro', (req, res) => {
    res.render('./calc/poligono/semiperimetro')
})

router.get('/poligono/numero-de-lados', (req, res) => {
    res.render('./calc/poligono/numeroDeLados')
})

router.get('/poligono/valor-do-lado', (req, res) => {
    res.render('./calc/poligono/valorDoLado')
})

router.get('/mdc', (req, res) => {
    res.render('./calc/mdc/mdc')
})

router.get('/mmc', (req, res) => {
    res.render('./calc/mmc/mmc')
})

router.get('/regra-de-3', (req, res) => {
    res.redirect('/calc/regra-de-3/simples')
})

router.get('/regra-de-3/simples', (req, res) => {
    res.render('./calc/regra_de_3/simples')
})

router.get('/regra-de-3/composta', (req, res) => {
    res.render('./calc/regra_de_3/composta')
})

router.get('/progressao-geometrica', (req, res) => {
    res.redirect('/calc/progressao-geometrica/gerar')
})

router.get('/progressao-geometrica/gerar', (req, res) => {
    res.render('./calc/progressao_geometrica/gerar')
})

router.get('/progressao-geometrica/localizar', (req, res) => {
    res.render('./calc/progressao_geometrica/localizar')
})

router.get('/progressao-geometrica/posicao', (req, res) => {
    res.render('./calc/progressao_geometrica/posicao')
})

router.get('/progressao-geometrica/razao', (req, res) => {
    res.render('./calc/progressao_geometrica/razao')
})

router.get('/porcentagem', (req, res) => {
    res.redirect('/calc/porcentagem/1')
})

router.get('/porcentagem/1', (req, res) => {
    res.render('./calc/porcentagem/1')
})

router.get('/porcentagem/2', (req, res) => {
    res.render('./calc/porcentagem/2')
})

router.get('/porcentagem/3', (req, res) => {
    res.render('./calc/porcentagem/3')
})

router.get('/porcentagem/4', (req, res) => {
    res.render('./calc/porcentagem/4')
})

router.get('/porcentagem/5', (req, res) => {
    res.render('./calc/porcentagem/5')
})

router.get('/porcentagem/6', (req, res) => {
    res.render('./calc/porcentagem/6')
})

router.get('/porcentagem/7', (req, res) => {
    res.render('./calc/porcentagem/7')
})

router.get('/porcentagem/8', (req, res) => {
    res.render('./calc/porcentagem/8')
})

router.get('/porcentagem/9', (req, res) => {
    res.render('./calc/porcentagem/9')
})

router.get('/circulo', (req, res) => {
    res.redirect('/circulo/area')
})

router.get('/circulo/area', (req, res) => {
    res.render('./calc/circulo/area')
})

router.get('/circulo/perimetro', (req, res) => {
    res.render('./calc/circulo/perimetro')
})

router.get('/circulo/raio', (req, res) => {
    res.render('./calc/circulo/raio')
})

router.get('/circulo/coroa-circular', (req, res) => {
    res.render('./calc/circulo/coroa_circular')
})

router.get('/equacao-2-grau', (req, res) => {
    res.redirect('/equacao-2-grau/bhaskara')
})

router.get('/equacao-2-grau/bhaskara', (req, res) => {
    res.render('./calc/equacao_2_grau/bhaskara')
})

router.get('/equacao-2-grau/delta', (req, res) => {
    res.render('./calc/equacao_2_grau/delta')
})

router.get('/notacao-cientifica', (req, res) => {
    res.redirect('/notacao-cientifica/converter-para-notacao-cientifica')
})

router.get('/notacao-cientifica/converter-para-notacao-cientifica', (req, res) => {
    res.render('./calc/notacao_cientifica/converter_para_notacao_cientifica')
})

router.get('/notacao-cientifica/converter-para-decimal', (req, res) => {
    res.render('./calc/notacao_cientifica/converter_para_decimal')
})

router.get('/trigonometria', (req, res) => {
    res.redirect('/trigonometria/hipotenusa')
})

router.get('/trigonometria/hipotenusa', (req, res) => {
    res.render('./calc/trigonometria/hipotenusa')
})

router.get('/trigonometria/cateto', (req, res) => {
    res.render('./calc/trigonometria/cateto')
})

router.get('/trigonometria/hipotenusa-com-angulo', (req, res) => {
    res.render('./calc/trigonometria/hipotenusa_com_angulo')
})

router.get('/trigonometria/cateto-adjacente', (req, res) => {
    res.render('./calc/trigonometria/cateto_adjacente')
})

router.get('/trigonometria/cateto-oposto', (req, res) => {
    res.render('./calc/trigonometria/cateto_oposto')
})

router.get('/cone', (req, res) => {
    res.redirect('/cone/volume')
})

router.get('/cone/volume', (req, res) => {
    res.render('./calc/cone/volume')
})

router.get('/cone/altura', (req, res) => {
    res.render('./calc/cone/altura')
})

router.get('/cone/area-total', (req, res) => {
    res.render('./calc/cone/area_total')
})

router.get('/cone/area-lateral', (req, res) => {
    res.render('./calc/cone/area_lateral')
})

router.get('/cone/geratriz', (req, res) => {
    res.render('./calc/cone/geratriz')
})

router.get('/retangulo', (req, res) => {
    res.redirect('/retangulo/area')
})

router.get('/retangulo/area', (req, res) => {
    res.render('./calc/retangulo/area')
})

router.get('/retangulo/perimetro', (req, res) => {
    res.render('./calc/retangulo/perimetro')
})

router.get('/retangulo/lado', (req, res) => {
    res.render('./calc/retangulo/lado')
})

router.get('/paralelogramo', (req, res) => {
    res.redirect('/paralelogramo/area')
})

router.get('/paralelogramo/area', (req, res) => {
    res.render('./calc/paralelogramo/area')
})

router.get('/paralelogramo/altura', (req, res) => {
    res.render('./calc/paralelogramo/altura')
})

router.get('/paralelogramo/base', (req, res) => {
    res.render('./calc/paralelogramo/base')
})

router.get('/piramide', (req, res) => {
    res.redirect('/piramide/volume')
})

router.get('/piramide/volume', (req, res) => {
    res.render('./calc/piramide/volume')
})

router.get('/piramide/altura', (req, res) => {
    res.render('./calc/piramide/altura')
})

router.get('/piramide/area-da-base', (req, res) => {
    res.render('./calc/piramide/area_da_base')
})

router.get('/progressao-aritmetica', (req, res) => {
    res.redirect('/progressao-aritmetica/gerar')
})

router.get('/progressao-aritmetica/gerar', (req, res) => {
    res.render('./calc/progressao_aritmetica/gerar')
})

router.get('/progressao-aritmetica/localizar', (req, res) => {
    res.render('./calc/progressao_aritmetica/localizar')
})

router.get('/progressao-aritmetica/posicao', (req, res) => {
    res.render('./calc/progressao_aritmetica/posicao')
})

router.get('/progressao-aritmetica/razao', (req, res) => {
    res.render('./calc/progressao_aritmetica/razao')
})

router.get('/simplificar-fracao', (req, res) => {
    res.render('./calc/simplificar_fracao/simplificar_fracao')
})

router.get('/sorteio', (req, res) => {
    res.redirect('/sorteio/sorteio-de-numeros')
})

router.get('/sorteio/sorteio-de-numeros', (req, res) => {
    res.render('./others/sorteio/sorteio_de_numeros')
})

router.get('/sorteio/sorteio-de-elementos', (req, res) => {
    res.render('./others/sorteio/sorteio_de_elementos')
})

router.get('/verificar-numero-primo', (req, res) => {
    res.redirect('./verificar-numero-primo/verificar')
})

router.get('/verificar-numero-primo/verificar', (req, res) => {
    res.render('./calc/verificar_numero_primo/verificar')
})

router.get('/verificar-numero-primo/lista-de-numeros-primos', (req, res) => {
    res.render('./calc/verificar_numero_primo/lista_de_numeros_primos')
})

router.get('/home', (req, res) => {
    res.render('./others/home')
})

router.get('/', (req, res) => {
    res.redirect('./home')
})

router.get('/estatistica', (req, res) => {
    res.redirect('./estatistica/media')
})

router.get('/estatistica/media', (req, res) => {
    res.render('./calc/estatistica/media')
})

router.get('/estatistica/mediana', (req, res) => {
    res.render('./calc/estatistica/mediana')
})

router.get('/estatistica/moda', (req, res) => {
    res.render('./calc/estatistica/moda')
})

router.get('/estatistica/variante', (req, res) => {
    res.render('./calc/estatistica/variante')
})

router.get('/estatistica/desvio-padrao', (req, res) => {
    res.render('./calc/estatistica/desvio_padrao')
})

module.exports = router