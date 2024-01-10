import { useEffect , useContext, useState } from "react";
import { WalletContext } from "./Wallet";

const VoterDisplay=()=>{

    const {contract} = useContext(WalletContext)
    const [voters,setVoters] = useState([])

    useEffect(()=>{

        const voterInfo = async()=>{

            const voters = await contract.methods.voterList().call();          
            setVoters(voters)                  
        }
        contract && voterInfo();                                                    

    },[contract])

    return(
        <>
            {voters.map((voter)=>{
                <ul key = {voter.voterId}>

                    <li > {voter.name}</li>
                    <li> {voter.age}   </li>
                    <li> {voter.gender}   </li>
                    
                </ul>
            })}
        </>
    )

}

export default VoterDisplay;