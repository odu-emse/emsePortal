import { Strategy  as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'

//Model imports
import User from '../models/User'

export default function authentication(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //match email entered with the one in the database
            User.findOne({ email: email})
                .then(user => {
                    if (!user){
                        return done(null, false, { message: "The email you entered isn't registered."})
                    }

                    //Match entered password with the one in the database
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            throw err
                        }
                        if (isMatch){
                            return done(null, user)
                        }
                        else{
                            return done(null, false, { message: "Incorrect email and password combination."})
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err,user) => {
            done(err, user)
        })
    })
}