import { useContext } from "react";
import { WalletContext } from "../components/Wallet";
import Navigationn from "../components/Navigation";
import PropTypes from "prop-types";
import CandidateDisplay from "../components/CandidateDisplay";

const CandidateRegister=(account)=>{

    const {web3,contract} = useContext(WalletContext)

    // console.log(contract)
    // console.log(web3)
    //console.log(account)

    //const {contract}=useContext{WalletContext}

    const candidateRegistration = async(event)=>{
        event.preventDefault();
        const name = document.querySelector("#name").value;
        const party = document.querySelector("#party").value;
        const age = document.querySelector("#age").value;
        const gender = document.querySelector("#gender").value;


        const partData={
            gender,
            party
        }


        try{

            const res = await fetch("http://localhost:3000/api/candidate-verify",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify(partData)
            })

            const data = await res.json()

            if(data.message==="Registartion Successfull"){
                await contract.methods.candidateRegister(name,party,age,gender).send({from:account , gas:480000})
            alert("Registeration Successfull")

            }
            else if(data.message==="Gender value invalid"){
                throw new Error("Gender Value invalid")
            }
            else{
                throw new Error("Party name clashes")
            }
            

        }catch(error){
            console.error(error)
            console.log(error)

        }

    };

    return(
        <>
            <Navigationn/>
            <form className = "form" onSubmit={candidateRegistration}>
                <label className="label1" htmlFor="name">
                    Name:
                </label>
                <input className="innerBoxCand" type = "text" id="name"></input>

                <label className="label1" htmlFor="party">
                    Party:
                </label>
                <input className="innerBoxCand" type = "text" id="party"></input>

                <label className="label1" htmlFor="age">
                    Age:
                </label>
                <input className="innerBoxCand" type = "text" id="age"></input>

                <label className="label1" htmlFor="gender">
                    Gender:
                </label>
                <input className="innerBoxCand" type = "text" id="gender"></input>

                <button className="regBtn" type="submit">
                    Register
                </button>
            </form>
            <CandidateDisplay/>
        </>



    )
}

CandidateRegister.propTypes = {
    account: PropTypes.node.isRequired,
};


export default CandidateRegister;