import User from '../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if (user) {
            if (await user.checkPassword(password)) {
                const { id, name } = user;

                return res.json({
                    user: {
                        id,
                        name,
                        email
                    },
                    token: jwt.sign(
                        { id },
                        authConfig.secret,
                        { expiresIn: authConfig.expiresIn }
                    )
                })
            }
        }

        return res.status(401).json({ error: 'Email ou Senha incorreta!'});
    }
}

export default new SessionController();