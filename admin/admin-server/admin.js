const express=require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
//const fs = require('fs')
const csv = require('@fast-csv/format');
const path=require('path')
const app = express()
const student=require('./models/student-data-schema');
const db=require('./config/mongoose');

const { writeToPath } = require('@fast-csv/format');

// var json2csv = require('json2csv');
// var fields = [ 'name', 'rollnum', 'batch', 'degree', 'phonenum','gmail'];

// var fieldNames = [ 'name', 'rollnum', 'batch', 'degree', 'phonenum','gmail'];


app.use(cors({origin:"*"}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(3001,()=>{
    console.log("The server sarted")
});
app.post('/user/create',(req,res,next)=>{
    //console.log(req.body)
    // console.log(req.body.name)
    
    student.create({
        name:req.body.name,
        rollnum:req.body.rollnum,
        batch:req.body.batch,
        degree:req.body.degree,
        phonenum:req.body.phonenum,
        gmail:req.body.gmail
    },function(err,data){
        if(err){
            //console.log('error in creating details')
            return res.send(err);
        }
        //console.log('sucssefully details are created')
        return res.send({status:'successful'});
    });
})
app.get('/rollnum',(req,res)=>{  

    //console.log(req.params)
    //console.log(req.query.rollnumber)
    //res.send(req.query.rollnumber)
    
    student.find({rollnum:req.query.rollnumber}).then(data=>{
        
        res.send(data)
    }).catch(error=>{
        console.log("no data available")
        res.send({status:'no data'})
    })
})

app.get('/batch',(req,res)=>{
    var resu=[]
    //var ws=fs.createWriteStream('Batch.csv')
    
    student.find({batch:req.query.batch}).then(data=>{
        //console.log(data)
        console.log(data)
        data.forEach(i=>{
            resu.push([i.name,i.rollnum,i.batch,i.degree,i.phonenum,i.gmail])
    })
    //console.log(resu)
    const rows = [];
    for(let i=0;i<resu.length;i++){
        rows.push([resu[i][0],resu[i][1],resu[i][2],resu[i][3],resu[i][4],resu[i][5]])
    }
    //console.log(rows)
    writeToPath(path.resolve(__dirname, 'Batch.csv'), rows)
        .on('error', err => console.error(err))
        .on('finish', () => console.log('Done writing.'));
            if(rows.length>0)
            res.send({status:'Data is stored at Batch.csv file'})
            else{
                res.send({status:'no data'})
    }
            
    }).catch(error=>{
        console.log("no data available")
        res.send({status:'no data'})
    })
})

app.get('/degree&batch',(req,res)=>{
    var resu=[]
    //var ws=fs.createWriteStream('Degree.csv')
    student.find({batch:req.query.batch,degree:req.query.degree}).then(data=>{
        
        data.forEach(i=>{
            resu.push([i.name,i.rollnum,i.batch,i.degree,i.phonenum,i.gmail])
    })
    const rows = [];
    for(let i=0;i<resu.length;i++){
        rows.push([resu[i][0],resu[i][1],resu[i][2],resu[i][3],resu[i][4],resu[i][5]])
    }
    console.log(rows)
    writeToPath(path.resolve(__dirname, ' Degree.csv'), rows)
        .on('error', err => console.error(err))
        .on('finish', () => console.log('Done writing.'));

    //csv.write([["Name","Roll Number","Batch","Degree","Phone Number","GMail"]]).pipe(ws)
    
        
    if(rows.length>0)
            res.send({status:'Data is stored at Batch.csv file'})
            else{
                res.send({status:'no data'})
    }
        
    }).catch(error=>{
        //console.log("no data available")
        res.send({status:'no data'})
    })
})