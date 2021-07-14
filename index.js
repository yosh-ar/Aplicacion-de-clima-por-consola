
require('dotenv').config()
require('colors');
const { inquirerMenu, pausa, recibirInput,listadoLugares } = require("./helpers/inquier");
const { Busqueda } = require("./models/busquedas");

const main =async()=>{
    let menu = '';
    const busqueda = new Busqueda();
    do{
        menu = await inquirerMenu();
        switch (menu) {
            case '1':
                // busqueda de ciudad  
                const ciudad = await recibirInput('Ingresa ciudad: ');
                const lugares = await busqueda.buscarCiudad(ciudad);
                // seleccionar lugar
                const id = await listadoLugares(lugares);
                if(id === '0') continue ;
                const lugar = lugares.find((l)=> l.id === id);
                // clima del lugar seleccionado 
                busqueda.guardarHistorial(lugar.nombre);
                const clima = await busqueda.busquedaClima(lugar.lat, lugar.lng);
                
                console.clear();
                console.log('===================================='.green);
                console.log('====Información de lugar seleccionado==='.green);
                console.log(`Ciudad. ${lugar.nombre}`)
                console.log(`Longitud. ${lugar.lng}`)
                console.log(`Latitud. ${lugar.lat}`)
                console.log(`Temperatura Grados.C. ${clima.temperatura}`)
                console.log(`Temperatura maxima. ${clima.max}`)
                console.log(`Temperatura minima. ${clima.min}`)
                console.log(`Temperatura descripción. ${clima.desc}`)

                break;
            case '2':
                busqueda.historial.forEach((lugar, i)=>{
                    const idx = `${i +1}`.green;
                    console.log(`${idx} ${lugar}`);
                });
                break;

        }
        if(menu!='0') await pausa();
    }while(menu !='0' );

}

main();