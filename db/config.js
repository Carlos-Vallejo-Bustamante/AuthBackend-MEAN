const { mongoose } = require("mongoose");


const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MongoDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Conexión a la base de datos correcta');

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la base de datos')
    }
}

module.exports = {
    dbConnection
}