const jwt = require('jsonwebtoken')

const generarJWT = (userId, email) => {

    const payLoad = { userId, email };

    return new Promise((resolve, reject) => {

        jwt.sign(payLoad, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
};

module.exports = {
    generarJWT
}