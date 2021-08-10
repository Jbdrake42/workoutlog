const Sequelize = require('sequelize');
const sequelize = new Sequelize('workout-logbook',
'postgres', 'password',{
    host:'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connected to workout-logbook postgres database');
    },
    function(err){
        console.log(err)
    }
);
module.exports = sequelize;