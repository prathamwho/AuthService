const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig')
const apiRoutes = require('./routes/index');

const UserService = require('./services/user-service');

const app = express();


const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, ()=>{
        console.log(`Server Started on Port: ${PORT}`);

        // const service = new  UserService();

        // const newToken = service.createToken({email:'hello@admin.com', id:'1'});
        // console.log("New token is: ", newToken);

        // const token = 'eyJhb...s';
        // const response = service.verifyToken(token);
        // console.log(response);


    })
}

prepareAndStartServer();