import jwt from 'jsonwebtoken';
import config from 'config';




export const generarJWT=(uid:String ='')=>{
    return new Promise((resolve, reject )=>{
        const payload={uid};

        jwt.sign(payload, config.get('SECRETORPRIVATEKEY'), 
        {expiresIn: config.get('jwtExpiration')}, 
        (error, token)=>{
            if (error){
                console.log(error);
                reject('NO se pudo generar el token');
                  
            }else{
                resolve(token);
            }
        });
    })
}