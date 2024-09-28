const app = require('./server');

function main () {
    
    /**
     * Configuro el puerto en el que va correr o escuchar el servidor
     */
    app.set('port', process.env.PORT || 5000);

    /**
     * Preparo el servidor para que eschuche en el puerto seleccionado y lo ejecuto
     */
    const puerto = app.get('port');

    app.listen(puerto, ()=>{
        console.log('Servidor corriendo en el puerto', puerto);
    })

}

/**
 * Ejecuto la función main
 */
main();