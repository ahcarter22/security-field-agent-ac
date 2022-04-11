import EditAgent from "./EditAgent"
import { useContext } from 'react';
import AuthContext from './AuthContext';

function Agent(props) {

    const {agentId, firstName, lastName, middleName, dob, heightInInches} = props.agentObj;
    const [user, setUser] = useContext(AuthContext);

    function removeAgentFromState() {
        props.setAgents([...props.agents].filter(agent => agent.agentId !== agentId));
    }

    function handleDeleteClick() {
        fetch("http://localhost:8080/agents/" + agentId, {
            method: "DELETE"
        })
        .then(
            response => {
                console.log(response);
                removeAgentFromState();
            }
        )
        .catch(
            rejection => console.log(rejection)
        )
    }


   
    return (
        <div className="agent-card">
            <p><b>First Name:</b> {firstName}</p>
            <p><b>Middle Name:</b> {middleName}.</p>
            <p><b>Last Name:</b> {lastName}</p>
            <p><b>DOB:</b> {dob}</p>
            <p><b>Height (in):</b> {heightInInches}</p>
            <EditAgent 
                agentObj={props.agentObj} 
                agents={props.agents}
                setAgents={props.setAgents}
            />
             <button onClick={handleDeleteClick}>❌</button>
        </div>
    )

}

export default Agent;