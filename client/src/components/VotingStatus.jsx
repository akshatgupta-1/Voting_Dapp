import { useContext, useEffect, useState } from "react";
import { WalletContext } from "./Wallet";

const VotingStatus = () => {
    const { contract } = useContext(WalletContext);
    const [voteStatus, setVoteStatus] = useState("");
  
    useEffect(() => {
      const checkVotingStatus = async () => {
        const status = await contract.methods.votingStatus().call();
        setVoteStatus(status);
      };
      contract && checkVotingStatus();
    }, [contract]);
    console.log("VotingStatus", voteStatus);
    const statusColor = voteStatus === "Voting in progress" ? "#2DFF2D" : "red";
  
    return (
      <div style={{ display: "flex" }}>
        Vote Status :
        <div style={{ color: statusColor }}>
          {voteStatus === null ? "no status" : voteStatus}
        </div>
      </div>
    );
  };
  
  export default VotingStatus;