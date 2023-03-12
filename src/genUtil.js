export function generateObjFromNameAndCpf (obj){
    return {obj,
        [Symbol.iterator]: function* () {
            let keys = Object.keys(obj)
            for (let i = 0; i < keys.length; i++) {
                let newCpf = `${obj[keys[i]].cpf.slice(0,3)}.${obj[keys[i]].cpf.slice(3,6)}.${obj[keys[i]].cpf.slice(6,9)}-${obj[keys[i]].cpf.slice(9,11)}`
                yield { id: keys[i], nome: obj[keys[i]].name, cpf: newCpf };
            }
        }
    }
}
