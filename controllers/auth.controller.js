const { response } = require('express');
const UserModel = require('../models/User.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../Utils/jwt.util')

const crearUsuario = async (req, res = response) => {

    const { name, email, password } = req.body;

    try {

        //verificar el email
        const user = await UserModel.findOne({ email })

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            })
        }

        // crear usuario con el modelo
        const dbUser = new UserModel(req.body);

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt)

        // Generar el jwt
        const token = await generarJWT(dbUser.id, dbUser.email);


        // Crear usuario de DB
        await dbUser.save();

        // Generar respuesta existosa
        return res.status(200).json({
            ok: true,
            id: dbUser.id,
            name,
            token
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admistrador'
        })
    }

}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const dbUser = await UserModel.findOne({ email });

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            })
        }

        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es válido'
            })
        }

        // Generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.email);

        // Respuesta del servicio
        return res.json({
            ok: true,
            id: dbUser.id,
            name: dbUser.name,
            token
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admistrador'
        })
    }

}

const revalidarToken = async (req, res = response) => {

    const { userId, email } = req;

    const token = await generarJWT(userId, email);

    return res.json({
        ok: true,
        userId,
        email,
        token
    })

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}