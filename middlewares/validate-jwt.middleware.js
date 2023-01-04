const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'error en el token'
        })
    };

    try {

        const { userId, email } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.email = email;
        req.userId = userId;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next();
}

module.exports = {
    validarJWT
}