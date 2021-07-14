const fs = require('fs');
const axios = require('axios');

class Busqueda {
    historial = [];
    dbPath = './db/database.js';
    constructor(){
        this.leerDB();
    }
    get paramMapBox(){
        return {
            'access_token' :process.env.TOKEN_MAPBOX,
            'limit' : 5 ,
            'language': 'es'
        }
    }
    async buscarCiudad(ciudad){
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad}.json`,
                params : this.paramMapBox
              });
            const respuesta = await instance.get();
            let info = respuesta.data.features;
            return info.map(lugar =>({
                id: lugar.id,
                nombre: lugar.place_name_es,
                lng :lugar.center[0],
                lat :lugar.center[1],
            }));
            
        }catch{
            console.log('Ciudad no encontrada');
        }
    
    }
    get paramOPENWHATER(){
        return {
            'appid': process.env.OPENWHATER_KEY,
            'units' : 'metric' ,
            'lang': 'es'
        }
    }
    async busquedaClima(lat, lon){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                params: this.paramOPENWHATER
            });
            const respuesta = await instance.get();
            
            return {
                desc: respuesta.data.weather[0].description,
                max: respuesta.data.main.temp_max,
                min: respuesta.data.main.temp_min,
                temperatura: respuesta.data.main.temp,
            }
        } catch(error) {
            console.log(error);
        }
    }
    guardarHistorial(lugar){
        if(this.historial.includes(lugar.toLowerCase())){
            return;
        }
        this.historial = this.historial.splice(0,5);
        this.historial.unshift(lugar.toLowerCase());
        this.guardarDb();
    }
    guardarDb(){
        const pyload = {
            historial : this.historial
        }
        fs.writeFileSync(this.dbPath,  JSON.stringify(pyload));
    }
    leerDB(){
        if(!fs.existsSync(this.dbPath))return;
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data =JSON.parse(info);
        this.historial = data.historial;
    }
}

module.exports ={
    Busqueda
}