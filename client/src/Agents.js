import { useState, useEffect } from "react";
import Agent from "./Agent";


function Agents() {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/agents")
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert("Something went wrong while fetching...");
            }
            })
        .then(jsonData => setAgents(jsonData))
        .catch(rejection => alert("Failure: " + rejection.status + ": " + rejection.statusText));
        }, []);
  

    function removeAgentFromState(agentId) {
        setAgents(agents.filter(agentObj => agentObj.agentId !== agentId));
    }

    function agentFactory() {
        return agents.map(agentObj => (
            <Agent 
                key={agentObj.agentId} 
                agentObj={agentObj} 
                agents={agents}
                removeFromState={removeAgentFromState}
            />
        ))
    }

    return (
        <>
            {agentFactory()}
        </>
    )
}

export default Agents;