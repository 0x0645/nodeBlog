const mysql=require("mysql2")
const dbConfig =mysql.createConnection({
    host:'localhost',
    database:'blog',
    user:'root',
    password:''
}
)
module.exports=dbConfig