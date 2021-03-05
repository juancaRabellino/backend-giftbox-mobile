const mongoose=require("mongoose");

mongoose.connect(process.env.MONGOBD,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(()=>console.log("Database Conected"))
.catch(error=>console.log(error))
