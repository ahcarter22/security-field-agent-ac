import EditAgent from './EditAgent';
import DeleteAgent from './DeleteAgent';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import {Link} from 'react-router-dom';


function Agent(props) {

    const {agentId, firstName, lastName, middleName, dob, heightInInches} = props.agentObj;
    const [user, setUser] = useContext(AuthContext);


   
    return (
        <div className="agent-card">
            <p><b>First Name:</b> {firstName}</p>
            <p><b>Middle Name:</b> {middleName}.</p>
            <p><b>Last Name:</b> {lastName}</p>
            <p><b>DOB:</b> {dob}</p>
            <p><b>Height (in):</b> {heightInInches}</p>
            { user?.user.sub === username || user?.user.authorities.includes("ROLE_ADMIN") ? (
                <>
                <Link to={'/edit/' + agentId} >Edit</Link>
                <DeleteAgent agentId={agentId} removeFromState={props.removeFromState} /></>
            ) : (
                null
            ) } 
            <EditAgent 
                agentObj={props.agentObj} 
                agents={props.agents}
                setAgents={props.setAgents}
            />
        </div>
    )

}

export default Agent;