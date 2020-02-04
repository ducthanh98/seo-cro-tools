const express = require('express');
const routes = require('./api');
const cors = require('cors');
module.exports = class Server {
    constructor(port) {
        this.app = express();
        this.port = port || 3000;
        this.start()
    }

    start(port){
        this.config();

        this.routes();

        this.app.listen(this.port,()=>{console.log('App is running')})
    }

    config(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes(){
        this.app.use('/api',routes.initialize())
    }
}