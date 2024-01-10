import Navigationn from "../components/Navigation";
import PropTypes from "prop-types";
import { WalletContext } from "../components/Wallet"; 
import { useContext, useState } from "react";
import Winner from "../components/Winner";

const ElectionComission=({account})=>{
    const {web3,contract} = useContext(WalletContext)
    const [winner,setWinner] = useState("No Winner yet")

    const VotingTime =  async(event) =>{

        event.preventDefault();

        const starttime = document.querySelector("#start").value;
        const endtime = document.querySelector("#end").value;

        const timeData={
            starttime,
            endtime
          }
          try {
          const res = await fetch("http://localhost:3000/api/time-verify",{
             method:"POST",
             headers:{
              "content-type":"application/json"
             },
             body:JSON.stringify(timeData),
          })

          const data = await res.json()

            if(data.message === "Time is less than 24 hours"){
                await contract.methods.voteTime(starttime,endtime).send({from :  account, gas : 480000})
                alert("Voting Started")

            }
            else{
                throw new Error("Time is greater than 24 hours")
            }
            
            
        }catch(error){
            console.log(error)
            console.error("Voting initialization failed")
        }
    }

    const result= async() =>{

        try{
            await contract.methods.result().send({from : account, gas : 480000})
            const winCandidate = await contract.methods.winner().call()
            setWinner(winCandidate)
            alert("Result declared")

        }catch(error){
            console.log(error)
        }

    }

    const emergency= async() =>{

        try{
            await contract.methods.emeregency().send({from :  account, gas : 480000})
            alert("Emergency Declared")

        }catch(error){
            console.log(error)
        }

    }


    return(
        <>
            <div>
                <Navigationn></Navigationn>
                   <h2>{winner}</h2>
                <form className = "form" onSubmit = {VotingTime}>
                    <label className="label2" htmlFor="start">
                        Start Time :
                    </label>
                    <input className="innerBoxVote" type = "text" id = "start"></input>

                    <label className="label2" htmlFor="end">
                        End Time :
                    </label>
                    <input className="innerBoxVote" type = "text" id = "end"></input>

                    <button className="regBtn" type = "submit">
                        Voting Start
                    </button>

                </form>

            </div>

            <div className="space">

                <button className="emerBtn" onClick={emergency}>
                    Emergency
                </button>

                <button className="resBtn" onClick={result}>
                    Result
                </button>

            </div>

        </>

    )
}

ElectionComission.propTypes = {
    account: PropTypes.node.isRequired,
};


export default ElectionComission;