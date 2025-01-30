import userSchema from "./model.js"


 export async function addUser(req,res){
  const {username,email,address}=req.body;
  console.log(req.body);
  res.status(201).send({msg:"successfully added"})
   await userSchema.create({username,email,address})

  
}

export async function getUser(req,res){
    const users=await userSchema.find();
    console.log(users)
    res.status(200).send(users)
}

export async function deleteUser(req,res){
    const {_id}=req.params
       await userSchema.deleteOne({_id})
       .then(()=>{
           res.status(200).send({msg:"Task deleted successfully"})
       })
       .catch((err)=>{
           res.status(500).send(err)
       })
    
}
export async function updateUser(req,res){
    const {_id}=req.params
    const {username,email,address}=req.body;
    await userSchema.findByIdAndUpdate(_id,{username,email,address})
       .then(()=>{
            res.status(200).send({msg:"Task updated successfully"})
       })
       .catch((err)=>{
            res.status(500).send(err)
       })
}
