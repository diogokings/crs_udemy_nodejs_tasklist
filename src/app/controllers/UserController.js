import User from '../models/User';

class UserController {
    async store(req, res) {

        const userExist = await findUserByEmail(req.body.email);

        if (userExist) {
            return res.status(400).json({
                error: 'Usuario já existe'
            })
        }

        const { id, name, email } = await User.create(req.body);
        
        return res.json({
            id,
            name,
            email
        });
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        console.log(user.email);

        if (email !== user.email) {
            
            const userExist = await findUserByEmail(email);

            console.log(userExist);

            if (userExist) {
                return res.status(400).json({
                    error: 'Esse email já existe'
                });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({
                error: 'Senha incorreta'
            });
        }
        
        const { id, name } = await user.update(req.body);

        return res.json({
            id,
            name,
            email
        });
    }
}

function findUserByEmail(email) {
    return User.findOne({
        where: {
            email: email
        }
    })
}

export default new UserController();