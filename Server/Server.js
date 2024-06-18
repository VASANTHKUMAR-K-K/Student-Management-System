const express=require("express")
const cors=require("cors")
const mysql=require("mysql")
const dotenv=require('dotenv')
const app=express()


app.use(express.json());
app.use(cors());

dotenv.config({
    path: "./.env"
});

const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    password:process.env.DATABASE_PASSWORD,
    dateStrings:"date"
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});



app.get("/", (req,res)=>{
   const sql="SELECT * FROM studentdetails";
   db.query(sql, (err,data)=>{
    if(err) return res.json("Error occured in db")
        return res.json(data);
   })
});


app.post("/create",(req,res)=>{
    const sql="INSERT INTO studentdetails (`FirstName`, `LastName`,`Location`, `Email`, `DOB`, `Education`, `About`) VALUES (?)";
    const values=[
        req.body.fname,
        req.body.lname,
        req.body.location,
        req.body.email,
        req.body.dob,
        req.body.education,
        req.body.about,
    ];
   //console.log(values)
    db.query(sql,[values], (err,data)=>{
        if(err) return res.json("Error",err);
            return res.json(data);
    });

    
});



app.put("/update/:id",(req,res)=>{
    const sql="update studentdetails set FirstName=? , LastName=? , Location=?, Email=?, DOB=?, Education=?, About=? where ID=?"
    const values=[
        req.body.fname,
        req.body.lname,
        req.body.location,
        req.body.email,
        req.body.dob,
        req.body.education,
        req.body.about,
    ];
    const id=req.params.id;
    db.query(sql,[...values, id], (err,data)=>{
        if(err) return res.json("Error");
            return res.json(data);
    });
});

app.delete("/student/:id",(req,res)=>{
    const sql="DELETE FROM STUDENTDETAILS WHERE ID=?";
    
    const id=req.params.id;
    db.query(sql,[id], (err,data)=>{
        if(err) return res.json("Error");
            return res.json(data);
    });
});


app.listen(8081, ()=>{
    console.log("port listening @ 8081")
});