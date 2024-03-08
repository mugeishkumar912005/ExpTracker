const E=require('express');
const P=require('body-parser');
const DB=require('mongoose');
const {ModelE}=require('./Schema.js');
const cors=require('cors');
/*
add Expence -/add(post)
update -/update(patch)
delete -/delete(post)
view -/view(get)
verifying the expence exceed
monthly analyses
validation 
account creation
*/
// Mogo Connection
async function Connect(){
    try{
        await DB.connect("mongodb+srv://kmugeis2005:dontforgetit@mugeishhero.ggr3iod.mongodb.net/Express?retryWrites=true&w=majority&appName=mugeishhero");
        console.log("Connection Established");
    }catch(error){
        console.log("Connection not established");
    } 
}
//function call
Connect();
//creating Server
const App=E()
App.use(P.json());
App.use(cors());
const User=DB.model('ExpD1', ModelE);
// App.post('/Login',async (request,response)=>{
//         const {amount,catagory,Date}=request.body;
//         try{
//            const newUser=await User.create({amount:30000,catagory:"Rent",Date:"2024-03-8"});
//            response.status(200).json(newUser);
//         }catch(error){
//             console.error(error);
//             response.status(500).json({ error: 'Server error' });
//         }
// })
App.get('/get-expenses',async (request,response)=>{
    try{
        console.log("Exepences");
        const Exp= await User.find();
        response.status(200).json(Exp);
    }catch(error){
        response.status(500).json({
            'status':"Failure",
            "Msg":"Could not Fetch"
        });
        
    }
       
});
App.post('/add-expenses',async (request,response)=>{
    const {amount,catagory,Date}=request.body;
    try{
        
        const newUser=await User.create({'amount':amount,'catagory':catagory,'Date':Date});
        response.status(201).json({
            'msg':"Success full add"
        });
        console.log(request.body);
    }catch(error){
        console.log("Not Added");
        response.status(200).json({
            "msg":"Opps Something Went wrong",
            "ERROR":error
        });
    }
})
App.delete('/delete-expenses/:id',async (request,response)=>{
    try{
         const ExpD=await User.findById(request.params.id)
        //  console.log(ExpD);
        if(ExpD){
            await User.findByIdAndDelete(ExpD);
            response.status(200).json({
                "status":"Entry Found..",
                "msg":"Succesfull Deleation"
             })
        }
    }catch(error){
          response.status(401).json({
            "status":"Entry Not Found..",
            'msg':"Cannot Delet Something Went Wrong",
            "Error":error
          })
    }
})
App.patch('/update-expenses/:id', async (request, response) => {
    try {
        const expense = await User.findById(request.params.id);
        const {amount,catagory,Date}=request.body;
        if (!expense) {
            return response.status(404).json({
                status: "Entry Not Found",
                msg: "Expense not found"
            });
        }
        expense.amount =amount;
        expense.catagory = catagory;
        expense.Date =Date;
        await expense.save();
        response.status(200).json({
            msg: "Successfully updated expense"
        });
    } catch (error) {
        response.status(500).json({
            status: "Error",
            msg: "Unable to update expense",
            error: error.message
        });
    }
});

const Port=process.env.PORT || 5100;
App.listen(Port,()=>
{
    console.log("Hey this a server by Express");
})