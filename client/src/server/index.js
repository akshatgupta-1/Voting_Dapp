const express = require('express')
const app = express()
const cors = require("cors")
app.use(cors())
const {Web3} = require("web3")
app.use(express.json())

const ABI = require("./ABI")

const web3 = new Web3("HTTP://127.0.0.1:7545");
const contractAddress = "0x88183c3b5997f92cA7EB8f6C061c88e0Cfb5197D";
      //to create contract instance - abi and contract address
const contract = new web3.eth.Contract(ABI, contractAddress);

const genderVerification = (gender) =>{
    const genderValue = gender.toLowerCase()
    if(genderValue==="male" || genderValue === "female" || genderValue === "other") return true;
    else return false;
}

const partyClash = async(party) =>{

    const candidateList = await contract.methods.candidateList().call()
    const exists = candidateList.some((candidate)=>candidate.party.toLowerCase()===party.toLowerCase())
    return exists;

}


app.post("/api/time-verify",async(req,res)=>{
    const {starttime,endtime} = req.body;

    if(endtime-starttime<86400){
        res.status(200).json({message:"Time is less than 24 hours"})
    }else{
        res.status(403).json({message : "Time is greater than 24 hours"})
    }
})


app.post("/api/voter-verify",async(req,res)=>{
    const {gender} = req.body;

    const genderStatus = genderVerification(gender)
    if(genderStatus===true){
        res.status(200).json({message:"Registartion Successfull"})
    }else{
        res.status(403).json({message : "Gender value invalid"})
    }
})

app.post("/api/candidate-verify",async(req,res)=>{

    const {gender,partyName} = req.body;

    const genderStatus = genderVerification(gender)
    const partyClashtatus  = await partyClash(partyName)

    if(genderStatus===true){
        if(partyClash===false){
            res.status(200).json({message:"Registartion Successfull"})
        }
        else{
            res.status(403).json({message : "Party name clashes"})
        }
    }else{
        res.status(403).json({message : "Gender value invalid"})
    }


})

app.listen(3000,()=>{
    console.log("Server is running at PORT 3000")

})