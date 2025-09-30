const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig')
const apiRoutes = require('./routes/index');

// const UserService = require('./services/user-service');
// const { User, Role } = require('./models/index');
const db = require('./models/index');

const app = express();


const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`);

        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true });
        }

        // const u1 = await User.findByPk(4);
        // const r1 = await Role.findByPk(2);
        // u1.addRole(r1);
        // const response = await r1.hasUser(u1);
        // console.log(response);

        // const service = new  UserService();

        // const newToken = service.createToken({email:'hello@admin.com', id:'1'});
        // console.log("New token is: ", newToken);

        // const token = 'eyJhb...s';
        // const response = service.verifyToken(token);
        // console.log(response);


    })
}

prepareAndStartServer();