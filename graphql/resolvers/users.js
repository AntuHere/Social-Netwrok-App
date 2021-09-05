const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError } = require('apollo-server')

const {validateRegisterInput, validateLogin} = require('../../util/validators')
const User = require('../../models/User')
const {SECRET_KEY} = require('../../config')
function generalToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    },
    SECRET_KEY,
        {expiresIn: '1h'}
    )
}
module.exports = {
    Mutation: {
        async login(_, {username,password}){
            const {errors, valid} = validateLogin(username,password);
            if(!valid){
                throw new UserInputError('Errors', {errors});
            }

                const user = await User.findOne({username});

                if(!user){
                    errors.general = 'User Not Found';
                    throw new UserInputError('User not found', { errors });
                }

                const match = await bcrypt.compare(password, user.password);
                if(!match){
                    errors.general = 'Wrong Crendetials';
                    throw new UserInputError('Wrong crendetials', { errors });
                }

                const token = generalToken(user)

                return {
                    ...user._doc,
                    id: user._id,
                    token
                };
            
        },

        async register(_,{registerInput: {username,email,password,confirmPassword}}){
            
            // check Validation
            const {valid, errors} = validateRegisterInput(username,email,password,confirmPassword)
            if(!valid){
                throw new UserInputError('Errors', {errors})
            }
            // check existing username
            const user = await User.findOne({username});
            if(user){
                throw new UserInputError('UserName is taken', {
                    errors:{
                        username: 'This UserName is taken'
                    }
                })
            }
            // hash password and generate auth token  
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })
            const res = await newUser.save();
            const token = generalToken(res)
            return {
                ...res._doc,
                id: res._id,
                token
            }
            
        }

    }
}
