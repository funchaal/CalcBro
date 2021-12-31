const calc_function = {
    "regra de 3": {
        simples: function (v1, v2, v3) {
            return (v2 * v3) / v1
        }, 
        composta: function (v1, v2, v3, v4, v5, v6, v7) {
            const a = v5 || 1
            const b = v6 || 1
            const total = (v7 * (v2 * v4 * b)) / (v1 * v3 * a)
            return total
        }
    }, 
    potência: {
        potência: function (a, b) {
            return a ** b
        }
    }, 
    raiz: {
        raiz: function (a, b) {
            return a ** (1 / b)
        }
    }, 
    "equação 2º grau": {
        bhaskara: function (v1, v2, v3) {
            v3 = v3 || 0
            let delta = (v2 ** 2) - 4 * v1 * v3
            if (delta < 0) {
                delta = `Δ = ${delta}`
                return delta
            } else {
                const a = (-v2 + (Math.sqrt(delta))) / (2 * v1)
                const b = (-v2 - (Math.sqrt(delta))) / (2 * v1)
                if (a === b) {
                    const solucao = `{${Number(a.toFixed(2))}}`
                    return [solucao, delta, a, null, null]
                } else {
                    const solucao = `{${Number(Math.min(a, b).toFixed(2))}, ${Number(Math.max(a, b).toFixed(2))}}`
                    return [solucao, delta, null, a, b]
                }
            }
        }, 
        delta: function (v1, v2, v3) {
            v3 = v3 || 0
            let delta = (v2 ** 2) - 4 * (v1) * v3
            if (delta < 0) {
                delta = `Δ = ${delta}`
                return delta
            } else {
                const a = (-v2 + (Math.sqrt(delta))) / (2 * v1)
                const b = (-v2 - (Math.sqrt(delta))) / (2 * v1)
                const solucao = `{${Number((Math.min(a, b)).toFixed(2))}, ${Number((Math.max(a, b)).toFixed(2))}}`
                return [delta, solucao, a, b]
            }
        }, 
    }, 
    "notação ciêntifica": {
        "converter para notação ciêntifica": function (v1) {
            if (v1 < 1) {
                var b = '0' + v1.toString().replace(/^0+/, '').replace('.', '')
                let f = 0
                for (let i in b) {
                    if (b[i] !== '0') break
                    f++
                }
                var c = '.' + v1.toString().replace(/^0+/, '').slice(f + 1)
                var g = b.slice(f)[0]
                var h = '-' + f
            } else {
                var a = (v1.toString().split('.')[1] || '').length
                var b = v1.toString().replace('.', '').replace(/^0+/, '')
                var c = '.' + b.slice(1)
                var g = b[0]
                var h = c.length - 1 - a
            }
            var d = c.slice(1).split('').reverse().join('')
            var e = 0
            for (let i in d) {
                if (d[i] !== '0') break
                e++
                if (d[i] === '.') break
            }
            var total = `${g}${c.slice((c.length - e === 1 ? 1 : 0), c.length - e)}x10^${h}`
            return total
        }, 
        "converter para decimal": function (v1) {
            let a = v1.replace(/[X*]/, 'x').split(/[x^]/)
            a.forEach((value) => value = Number.parseFloat(value))
            const total = a[0] * a[1] ** a[2]
            return total
        }
    }, 
    "simplificar frações": {
        "simplificar frações": function (v1) {
            const e = v1.split(/,/g).map((element) => {
                if (!element.includes('/')) element = element.concat('/1')
                return element.split('/')
            }).flat()
            if (!isEveryNumeric__(...e))  throw new Error ('insira corretamente os valores.')
            const f = calc_function['m.d.c.']['m.d.c.'](e.join(','))
            const a = f[0]
            const b = f[2]
            let c = []
            let d = []
            let total = []
            e.forEach((_element, index) => { if (isEven__(index)) total.push(`${e[index] / a}/${e[index + 1] / a}`) })
            total.forEach((element) => {
                const a = Number(element.split('/')[0])
                const b = Number(element.split('/')[1])
                c.push(Number((a / b).toFixed(2)))
                d.push(`${(Number((a / b).toFixed(2))) * 100}%`)
             })
            c = c.join(', ')
            d = d.join(', ')
            total = total.join(', ')
            return [total, a, b, c, d]
        }
    }, 
    "progressão aritmética": {
        gerar: function(v1, v2, v3) {
            let array = []
            let j
            for (let i = 0; i < v3; i++) {
                j = v1 + (i * v2)
                array.push(j)
            }
            const total = array.join(', ')
            const a = v3
            const b = array.reduce((a, b) => a + b)
            const c = v2
            return [total, a, b, c]
        }, 
        localizar: function(v1, v2, v3) {
            let array = []
            let i = 0
            let j
            if ((v3 < v1 && v2 > 0) || (v3 > v1 && v2 < 0)) {
                return
            } else if (v3 < v1) {
                do {
                    j = v1 + (i * v2)
                    array.push(j)
                    i++
                } while (j !== v3 && j > v3)
            } else {
                do {
                    j = v1 + (i * v2)
                    array.push(j)
                    i++
                } while (j !== v3 && j < v3)
            }
            const a = array.length
            const b = array.reduce((a, b) => a + b)
            const c = v2
            const total = array.join(', ')  
            return [total, a, b, c]
        },
        posição: function (v1, v2, v3) {
            const total = v1 + (v3 - 1) * v2
            let array = []
            let j
            for (let i = 0; i < v3; i++) {
                j = v1 + (i * v2)
                array.push(j)
            }
            const a = array.join(', ')
            const b = array.length
            const c = array.reduce((a, b) => a + b)
            const d = v2
            return [total, a, b, c, d]
        }, 
        razão: function (v1, v2, v3) {
            return (v2 - v1) / (v3 - 1)
        }
    }, 
    "progressão geométrica": {
        gerar: function(v1, v2, v3) {
            let array = []
            let j = v1
            for (let i = 0; i < v3; i++) {
                array.push(j)
                j = j * v2
            }
            const total = array.join(', ')
            const a = v3
            const b = array.reduce((a, b) => a + b)
            const c = v2
            return [total, a, b, c]
        }, 
        localizar: function(v1, v2, v3) {
            let array = [v1]
            let j = v1
            while (j !== v3 && j < v3) {
                j = j * v2
                array.push(j)
            }
            const a = array.length
            const b = array.reduce((a, b) => a + b)
            const c = v2
            const total = array.join(', ')
            return [total, a, b, c]
        },
        posição: function (v1, v2, v3) {
            let total = v1 * v2 ** (v3 - 1)
            let array = []
            let j = v1
            for (i = 0; i < v3; i++) {
                array.push(j)
                j = j * v2
            }
            const a = array.join(', ')
            const b = array.length
            const c = array.reduce((a, b) => a + b)
            const d = v2
            return [total, a, b, c, d]
        }, 
        razão: function (v1, v2, v3) {
            return (v2 / v1) ** (1 / (v3 - 1))
        }
    }, 
    "m.m.c.": {
        "m.m.c.": function (v1) {
            let array = v1.replace(/ /g, '').split(/,/g)
            if (!isEveryNumeric__(...array)) throw new Error ('insira corretamente os valores.')
            array = array.map((element) => Number.parseInt(element))
            array = array.filter((element) => (element !== 0 && element !== 1))
            if (!array.length) return [1, 1, 1]
            let j = 2
            let sequencia = []
            while (!array.every((value) => value === 1)) {
                if (array.every((value) => isFloat__((value / j)))) {
                    j++
                } else {
                    sequencia.push(j)
                    array = array.map((value) => value = isFloat__((value / j)) ? value : value / j)
                }
            }
            const total = sequencia.reduce((a, b) => a * b)
            const a = sequencia.reduce((a, b) => a + b)
            const b = sequencia.join(', ')
            return [total, a, b]
        }
    }, 
    "m.d.c.": {
        "m.d.c.": function (v1) {
            let array = v1.replace(/ /g, '').split(/,/g)
            if (!isEveryNumeric__(...array)) throw new Error ('insira corretamente os valores.')
            array = array.map((element) => element = Number.parseInt(element))
            if (array.includes(0) || array.includes(1)) return [1, 1, 1]
            let j = 2
            let sequencia = []
            while (j <= Math.min(...array)) {
                if (array.some((value) => isFloat__((value / j)))) {
                    j++
                } else {
                    sequencia.push(j)
                    array = array.map((value) => value = value / j)
                }
            }
            if (!sequencia.length) sequencia.push(1) 
            const total = sequencia.reduce((a, b) => a * b, 1)
            const a = sequencia.reduce((a, b) => a + b, 0)
            const b = sequencia.join(', ')
            return [total, a, b]
        }
    }, 
    paralelogramo: {
        área: function (v1, v2) {
            return v1 * v2
        }, 
        altura: function (v1, v2) {
            return v1 / v2
        }, 
        base: function (v1, v2) {
            return v1 / v2
        }
    }, 
    retângulo: {
        área: function (v1, v2) {
            const total = v1 * v2
            const a = (v1 * 2) + (v2 * 2)
            return [total, a]
        }, 
        perímetro: function (v1, v2) {
            const total = (v1 * 2) + (v2 * 2)
            const a = v1 * v2
            return [total, a]
        }, 
        lado: function (v1, v2, v3) {
            if (v1) {
                var total = (v1 - (v3 * 2)) / 2
                var a =  ((v1 - (v3 * 2)) / 2) * v3
                var b = v1
            } else {
                var total = v2 / v3
                var a =  v2
                var b = ((v2 / v3) * 2) + (v3 * 2)
            }
            return [total, a, b]
        }
    }, 
    porcentagem: {
        "1": function (v1, v2) {
            return (v1 / 100) * v2
        }, 
        "2": function (v1, v2) {
            const total = `${Number(((v1 * 100) / v2).toFixed(6))}%`
            return total
        }, 
        "3": function (v1, v2, v3) {
            if (v2 < v3) [v2, v3] = [v3, v2]
            const total = `${Number(((v1 - v3) / ((v2 - v3) / 100)).toFixed(6))}%`
            return total
        }, 
        "4": function (v1, v2) {
            return v1 + (v1 / 100) * v2
        }, 
        "5": function (v1, v2) {
            return v1 - (v1 / 100) * v2
        }, 
        "6": function (v1, v2) {
            const total = `${Number((((v2 - v1) * 100) / v1).toFixed(6))}%`
            return total
        }, 
        "7": function (v1, v2) {
            const total = `${Number((-1 * (((v2 - v1) * 100) / v1)).toFixed(6))}%`
            return total
        }, 
        "8": function (v1, v2) {
            return (v2 * 100) / (v1 + 100)
        }, 
        "9": function (v1, v2) {
            return (v2 * 100) / (100 - v1)
        }
    }, 
    "verificar número primo": {
        verificar: function (v1) {
            const a = [2, 3, 4, 5, 6, 7, 8, 9].filter((element) => element !== v1)
            if(a.some((element) => !isFloat__((v1 / element))) || v1 === 1) {
                return 'não é primo'
            } else {
                return 'é primo'
            }
        }, 
        "lista de números primos": function (v1, v2) {
            const b = [2, 3, 4, 5, 6, 7, 8, 9]
            let c = []
            for (let i = v1; i <= v2; i++) {
                if (!b.filter((element) => element !== i).some((element) => !isFloat__((i / element)))) c.push(i)
            }
            c = c.filter((element) => element !== 1)
            const total = c.join(', ')
            const a = c.length
            return [total, a]
        }
    }, 
    circulo: {
        área: function (v1, v2, v3) {
            if (!(v1 || v2)) throw new Error('preencha o valor do raio ou do perímetro')
            if (v1) {
                var total = (v1 ** 2) * (v3 || Math.PI)
                var a = v1
                var b = (2 * (v3 || Math.PI)) * v1
            } else {
                var total = ((v2 / ((2 * (v3 || Math.PI)))) ** 2) * (v3 || Math.PI)
                var a = v2 / (2 * (v3 || Math.PI))
                var b = v2
            }
            let c = 2 * a
            return [total, b, a, c]
        }, 
        perímetro: function (v1, v2, v3) {
            if (!(v1 || v2)) throw new Error('preencha o valor do raio ou da área')
            if (v1) {
                var total = (2 * (v3 || Math.PI)) * v1
                var a =  (v1 ** 2) * (v3 || Math.PI)
                var b = v1
            } else {
                var total = 2 * (Math.sqrt(v2 / (v3 || Math.PI))) * (v3 || Math.PI)
                var a = v2
                var b = Math.sqrt(v2 / (v3 || Math.PI))
            }
            let c = 2 * b
            return [total, a, b, c]
        }, 
        raio: function (v1, v2, v3) {
            if (!(v1 || v2)) throw new Error('preencha o valor do perímetro ou da área')
            if (v1) {
                var total = v1 / (2 * (v3 || Math.PI))
                var a = ((total) ** 2) * (v3 || Math.PI)
                var b = v1
            } else {
                var total = Math.sqrt(v2 / (v3 || Math.PI))
                var a = v2
                var b = (2 * (v3 || Math.PI)) * total
            }
            let c = 2 * total
            return [total, a, b, c]
        }, 
        "coroa circular": function (v1, v2) {
            const total = v1 - v2
           return [total]
        }
    }, 
    quadrado: {
        área: function (v1, v2) {
            if (v1) {
                var total = v1 ** 2
                var a = v1 * 4
                var b = v1
            } else {
                var total = (v2 / 4) ** 2
                var a = v2
                var b = v2 / 4
            }
            return [total, a, b]
        }, 
        perímetro: function (v1, v2) {
            if (v1) {
                var total = v1 * 4
                var a = v1 ** 2
                var b = v1
            } else {
                var total = (Math.sqrt(v2)) * 4
                var a = v2
                var b = (Math.sqrt(v2))
            }
            return [total, a, b]
        }, 
        lado: function (v1, v2) {
            if (v1) {
                var total = v1 / 4
                var a = v1
                var b = (v1 / 4) ** 2
            } else {
                var total = (Math.sqrt(v2))
                var a = (Math.sqrt(v2)) * 4
                var b = v2
            }
            return [total, a, b]
        }
    }, 
    polígono: {
        área: function (v1, v2, v3) {
            if (v1) {
                var total = v1 * v3
                var a =  v1 * 2
                var b = v1
            } else {
                var total = (v2 / 2) * v3
                var a = v2
                var b = v2 / 2
            }
            return [total, a, b]
        },
        apótema: function (v1, v2, v3) {
            if (v1) {
                var total = v3 / v1
                var a =  v1 * 2
                var b = v1
            } else {
                var total = v3 / (v2 / 2)
                var a = v2
                var b = v2 / 2
            }
            return [total, a, b]
        }, 
        semiperímetro: function (v1, v2, v3) {
            const total = (v1 || v2) ? v1 / v2 : v3 / 2
            return total
        }, 
        perímetro: function (v1, v2, v3) {
            const total = (v1 || v2) ? (v1 / v2) * 2 : v3 * 2
            return total
        }, 
        'valor do lado': function (v1, v2, v3) {
            const total = v1 ? (v1 * 2) / v3 : v2 / v3
            return total
        }, 
        'número de lados': function (v1, v2, v3) {
            const total = v1 ? (v1 * 2) / v3 : v2 / v3
            return total
        }
    }, 
    lozango: {
        área: function (v1, v2) {
            const total = (v1 * v2) / 2
            return total
        }, 
        diagonal: function (v1, v2) {
            const total = (v1 / v2) * 2
            return total
        }
    }, 
    trapézio: {
        área: function (v1, v2, v3) {
            const total = ((v1 + v2) * v3) / 2
            const a = (v1 + v2) / 2
            const b = v1 > v2 ? (v1 - v2) / 2 : (v2 - v1) / 2
            return [total, a, b]
        }, 
        base: function (v1, v2, v3) {
            const total = (v1 * 2 - v3 * v2) / v2
            const a = (v1 + v2) / 2
            const b = v1 > v2 ? (v1 - v2) / 2 : (v2 - v1) / 2
            return [total, a, b]
        }, 
        altura: function (v1, v2, v3) {
            const total = v3 / ((v1 + v2) / 2)
            const a = (v1 + v2) / 2
            const b = v1 > v2 ? (v1 - v2) / 2 : (v2 - v1) / 2
            return [total, a, b]
        }, 
        'base média': function (v1, v2) {
            const total = (v1 + v2) / 2
            const a =  v1 > v2 ? (v1 - v2) / 2 : (v2 - v1) / 2
            return [total, a]
        }, 
        'mediana de Euler': function (v1, v2) {
            const total = v1 > v2 ? (v1 - v2) / 2 : (v2 - v1) / 2
            const a = (v1 + v2) / 2
            return [total, a]
        }
    }, 
    pirâmide: {
        volume: function (v1, v2) {
            const total = (1 / 3) * (v1 * v2)
            return total
        }, 
        área: function (v1, v2) {
            const total = v1 + v2
            return total
        }, 
        altura: function (v1, v2) {
            const total = (v1 / v2) / (1 / 3)
            return total
        }, 
        'área da base': function (v1, v2) {
            const total = (v1 / v2) / (1 / 3)
            return total
        }
    }, 
    cone: {
        volume: function (v1, v2, v3) {
            const total = ((v1 * (v3 || Math.PI)) * v2) / 3
            return total
        }, 
        'área total': function (v1, v2, v3) {
            const total = (v1 * (v3 || Math.PI)) * (v2 + v1)
            return total
        }, 
        'área lateral': function (v1, v2, v3) {
            const total = (v1 * (v3 || Math.PI)) * v2
            return total
        }, 
        altura: function (v1, v2, v3) {
            const total = (v1 / (v2 * (v3 || Math.PI))) * 3
            return total
        }, 
        geratriz: function (v1, v2, v3, v4) {
            if (!(v1 || v2)) throw new Error('preencha o valor do raio da base ou da área da base')
            if (v1) {
                var total = Math.sqrt((v1 ** 2) + (v3 ** 2))
            } else {
                var total = Math.sqrt((Math.sqrt(v2 / (v4 || Math.PI)) ** 2) + (v3 ** 2))
            }
            return total
        }
    }, 
    trigonometria: {
        hipotenusa: function (v1, v2) {
            const total = Math.sqrt(v1 ** 2 + v2 ** 2)
            return total
        }, 
        cateto: function (v1, v2) {
            const total = Math.sqrt(v1 ** 2 - v2 ** 2)
            return total
        }, 
        'hipotenusa com ângulo': function (v1, v2, v3, v4) {
            if (!(v1 || v2)) throw new Error('preencha ao menos um dos ângulos')
            if (!(v3 || v4)) throw new Error('preencha o valor do cateto adjacente ou do cateto oposto')
            if (v1) {
                if (v3) {
                    var total = v3 / Math.cos((v1 * Math.PI) / 180)
                } else {
                    var total = v4 / Math.sin((v1 * Math.PI) / 180)
                }
            } else {
                if (v3) {
                    var total = v3 / Math.cos(v2)
                } else {
                    var total = v4 / Math.sin(v2)
                }
            }
            return total
        }, 
        'cateto adjacente': function (v1, v2, v3, v4) {
            if (!(v1 || v2)) throw new Error('preencha ao menos um dos ângulos')
            if (!(v3 || v4)) throw new Error('preencha o valor da hipotenusa ou do cateto oposto')
            if (v1) {
                if (v3) {
                    var total = Math.cos((v1 * Math.PI) / 180) * v3
                } else {
                    var total = v4 / Math.tan((v1 * Math.PI) / 180)
                }
            } else {
                if (v3) {
                    var total = Math.cos(v2) * v3
                } else {
                    var total = v4 / Math.tan(v2)
                }
            }
            return total
        }, 
        'cateto oposto': function(v1, v2, v3, v4) {
            if (!(v1 || v2)) throw new Error('preencha ao menos um dos ângulos')
            if (!(v3 || v4)) throw new Error('preencha o valor da hipotenusa ou do cateto adjacente')
            if (v1) {
                if (v3) {
                    var total = Math.sin((v1 * Math.PI) / 180) * v3
                } else {
                    var total = Math.tan((v1 * Math.PI) / 180) * v4
                }
            } else {
                if (v3) {
                    var total = Math.sin(v2) * v3
                } else {
                    var total = Math.tan(v2) * v4
                }
            }
            return total
        }
    }, 
    estatística: {
        média: function (v1) {
            let array = v1.replace(/ /g, '').split(',')
            if (!isEveryNumeric__(...array)) throw new Error ('insira corretamente os valores')
            array = array.map((el) => Number(el))
            const sum = array.reduce((a, b) => a + b)
            const total = sum / array.length
            const moda = calc_function['estatística']['moda'](v1)
            const len = array.length
            const mediana = isEven__(len) ? (array[((len / 2) - 1)] + array[((len / 2))]) / 2 : array[(Math.ceil(len / 2) - 1)]
            return [total, mediana, moda]
        }, 
        mediana: function(v1) {
            let array = v1.replace(/ /g, '').split(',')
            if (!isEveryNumeric__(...array))  throw new Error ('insira corretamente os valores.')
            array = array.map((el) => Number(el))
            const len = array.length
            const total = isEven__(len) ? (array[((len / 2) - 1)] + array[((len / 2))]) / 2 : array[(Math.ceil(len / 2) - 1)]
            const sum = array.reduce((a, b) => a + b)
            const media = sum / array.length
            const moda = calc_function['estatística']['moda'](v1)
            return [total, media, moda]
        }, 
        moda: function (v1) {
            const array = v1.replace(/ /g, '').split(',')
            if (isSomeEmpty__(...array))  throw new Error ('insira corretamente os valores.')
            array.sort()
            let count = []
            let i = 0
            array.forEach((el, index) => {
                if (el === array[index - 1]) {
                    const value = count[i - 1][0] + 1
                    count[i - 1][0] = value
                } else {
                    count.push([1, i])
                    i++
                }
            })
            count.sort((a, b) => {
                if (a[0] < b[0]) return 1
                if (a[0] > b[0]) return -1
                return 0
            })
            const max = Math.max(...count.map((el) => el[0]))
            count = count.filter((el) => el[0] === max)
            const set = [...new Set(array)]
            const total = count.length === set.length ? '-' : count.map((el) => set[el[1]]).join(', ')
            return total
        }
    }, 
    sorteio: {
        'sorteio de números': function(v1, v2, v3, v4, v5) {
            let total = []
            for (let i = 1; i <= v3; i++) {
                let a
                if (!v4) {
                    do {
                        a = !v5 ? Math.floor(Math.random() * (v1 - v2 + 1)) + v2 : Number((Math.random() * (v1 - v2) + v2).toFixed(2))
                    } while (total.some((val) => val === a))
                    total.push(a)
                } else {
                    a = !v5 ? Math.floor(Math.random() * (v1 - v2 + 1)) + v2 : Number((Math.random() * (v1 - v2 + 1) + v2).toFixed(2))
                    total.push(a)
                }
            }
            total = total.join(' ')
            return total
        }, 
        'sorteio de elementos': function(v1, v2, v3) {
            let total = []
            const array = v1.includes(',') ? v1.split(',').map((el) => el.trim()).filter((el) => !isEmpty__(el)) : [v1]
            const max = array.length
            for (let i = 1; i <= v2; i++) {
                let a
                if (!v3) {
                    do {
                        a = Math.floor(Math.random() * (max))
                    } while (total.some((val) => val === a))
                    total.push(a)
                } else {
                    a = Math.floor(Math.random() * (max))
                    total.push(a)
                }
            }
            total = total.map((el) => array[el]).join(', ')
            return total
        }
    }
}

export default calc_function