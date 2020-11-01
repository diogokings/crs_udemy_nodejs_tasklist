import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: 'Token não existe'
        });
    }

    const token = authHeader.substring(7);

    console.log(token);

    try {
        const tokenDecoded = await promisify(jwt.verify)(token, authConfig.secret);
        req.userId = tokenDecoded.id;
        return next();

    } catch (err) {
        return res.status(401).json({
            error: 'Token inválido'
        });
    }
} 