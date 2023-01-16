import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
import sequelizeStore from 'connect-session-sequelize'
import db from './config/Database.js'
import UserRoute from './routes/UserRoute.js'
import AuthRoute from './routes/AuthRoute.js'
dotenv.config()

const app = express()
app.use(express.json())

const sessionStore = sequelizeStore(session.Store)

const store =  new sessionStore({
    db: db
});

(async()=>{
    await db.sync();
})();

app.use(session({
    secret:process.env.SESS_SECRET="secret",
    resave:false,
    saveUninitialized:true,
    store:store,
    cookie:{
        secure:'auto'
    }

}))

app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))

app.use(UserRoute)
app.use(AuthRoute)

const PORT=process.env.PORT ||3445
app.listen(PORT,() =>{
    console.log(`Server is running on port \n http://localhost${PORT}`)
})