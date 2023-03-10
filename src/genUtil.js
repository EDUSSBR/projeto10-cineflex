export function generateObjFromNameAndCpf (obj){
    return {obj,
        [Symbol.iterator]: function* () {
            let keys = Object.keys(obj)
            for (let i = 0; i < keys.length; i++) {
                yield { id: keys[i], nome: obj[keys[i]].name, cpf: obj[keys[i]].cpf };
            }
        }
    }
}
