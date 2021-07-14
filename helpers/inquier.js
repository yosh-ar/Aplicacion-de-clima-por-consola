const inquirer = require('inquirer');
require('colors');

const preguntas = [{
    type: 'list', 
    name : 'opcion',
    message: '¿Que desea hacer?',
    choices: [
        {
            value: '1',
            name : `${'1'.green} Busca ciudad`
        },
        {
            value: '2',
            name : `${'2'.green} Historial de busquedas`
        },
        {
            value: '0',
            name : `${'0'.green} Salir`
        },
    ]
}]


const inquirerMenu = async()=>{
    console.clear();
    console.log('====================================');
    console.log('   Seleccione una opción'.green);
    console.log('====================================\n');

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}


const pausa = async ()=>{
    const enter = [{
        type: 'input', 
        name : 'enter',
        message: `Precione ${'Enter'.green} para continuar`,
    }];
    const stop = await inquirer.prompt(enter);
    return stop;
}
const recibirInput = async (message)=>{
    const questions = [
        {
            type : 'input',
            name : 'desc',
            message,
            validate(value){
                if(value.length === 0 ){
                    return 'Ingresa un valor';
                }
                return true;
            }
        }
    ]
    const {desc} = await inquirer.prompt(questions);
    return desc
}
const listadoLugares = async(lugares)=>{
    console.clear();
    const choices = lugares.map((lugar, i)=>{
        const idx = `${i+1}. `.green
        const {id, nombre} = lugar
        return {
            value: id,
            name: `${idx} ${nombre}`
        }
    });
    choices.unshift({
        value: '0',
        name: `${'0. '.green} Cancelar`
    })
    const preguntas = [{
        type: 'list', 
        name : 'id',
        message: '¿Que desea hacer?',
        choices
    }];
    const {id} = await inquirer.prompt(preguntas);
    return id
}

module.exports = {
    inquirerMenu,
    pausa,
    recibirInput,
    listadoLugares,
}

