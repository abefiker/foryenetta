const express = require('express')
const mysql = require('mysql2');
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
const db = mysql.createConnection(
    {
        user : "abemelek",
        host : "db4free.net",
        password : "Db@be1994",
        database : "todotask21"
    }
)
app.use('/sign-up',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    db.query("insert into users (username,password,email) values (?,?,?)",[username,password,email]
    ,(err,result)=>{
        if(result){
            res.status(200).send("successfull sign-up")
        }else{
            res.status(404).send({message:"already exist"})
        }
    })
})

  
app.use('/Login',(req,res)=>{
    const email = req.body.email
    const password = req.body.password

    db.query("select  * from users where email = ? and password = ?",[email,password]
    ,(err,result)=>{
        
        if(err){
            res.status(404).json({message:"Failed"})
        }else if(result.length > 0 ){
          return  res.status(200).json({
                id:result[0].id
        })
            
        }else{
            res.status(404).send({message:"Failed"})
        }
    })
})

app.post('/api', (req, res) => {
    const { task_name, description, due_date , user_id } = req.body;
    const sql = 'INSERT INTO tasks (task_name, description, due_date, user_id) VALUES (?, ?, ?,?)';
    db.query(sql, [task_name, description, due_date,user_id], (error, result) => {
      console.log("error",error)
      console.log("result",result)
    });
  });
  app.get('/:id' , (req, res) => {
    const id = req.params.id;
    const sql = `select * from tasks  where user_id ='${id}'`;
    db.query(sql,(error, result) => {
        
        if(error){
            res.status(404).json({message:"Failed"})
        }else if(result.length > 0 ){
          return  res.status(200).json({
                tasks: result
        })}else{
            res.status(404).send({message:"Failed"})
        }
    });
  });   
    
  app.delete('/api/removed/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, id, (error, result) => {
      if (error) {
        res.status(404).json({ message: "Failed" })
      } else {
        res.status(200).json({ message: "Successfully deleted task" })
      }
    });
  });
  app.get('/api/get/:id',(req,res)=>{
    const id = req.params.id
    db.query(`select * from tasks where id = ${id}`
    ,(err,result)=>{
      console.log(result)
        if(err){
            res.status(404).json({message:"Failed"})
        }else if(result.length > 0 ){
          return  res.status(200).json({
                result:result
        })
            
        }else{
            res.status(404).send({message:"Failed"})
        }
    })
})
  app.put('/api/put/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)
    const {task_name,description,due_date} = req.body
    db.query(`update tasks  set task_name = ?, description = ? , due_date = ? where id = ${id}`,
    [id,task_name,description,due_date]
    ,(err,result)=>{
          console.log(result)
        if(err){
            res.status(404).json({message:"Failed"})
        }else if(result.length > 0 ){
          return  res.status(200).json({
                id:result[0].id
        })
            
        }else{
            res.status(404).send({message:"Failed"})
        }
    })
})

app.listen(3002,()=>{
    console.log("running backend server")
})