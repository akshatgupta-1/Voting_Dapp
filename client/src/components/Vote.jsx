import { useContext } from "react";
import PropTypes from "prop-types";
//import "./Vote.css";
import { toast } from "react-hot-toast";

import { WalletContext } from "../components/Wallet";


const Vote = ({ account }) => {
  const { contract } = useContext(WalletContext);
  const submitVote = async (event) => {
    event.preventDefault();
    const candidateId = document.querySelector("#candidateId").value;
    const voterId = document.querySelector("#voterId").value;
    try {
      await contract.methods
        .vote(voterId, candidateId)
        .send({ from: account, gas: 480000 });
      toast.success("You have voted successfully");
    } catch (error) {
      toast.error("Vote Failed");
    }
  };
  return (
    <div>
      <form className="vote-form" onSubmit={submitVote}>
        <h1>Vote Here</h1>
        <label htmlFor="start">Voter Id:</label>
        <input type="text" id="voterId"></input>

        <label htmlFor="end">Candidate Id:</label>
        <input type="text" id="candidateId"></input>

        <button className="regBtn" type="submit">
          Vote
        </button>
      </form>
    </div>
  );
};
Vote.propTypes = {
  account: PropTypes.node.isRequired,
};
export default Vote;