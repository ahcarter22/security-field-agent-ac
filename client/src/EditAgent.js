
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";


function EditAgent() {


    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");

    const [toEdit, setToEdit] = useState(null);

    const {agentId} = useParams();

    const [userStatus, setUserStatus] = useContext(AuthContext);

    const nav = useNavigate();

    useEffect( 
        () => {

            const jwt = localStorage.getItem( "token" );
            if( jwt ){
                
                fetch( "http://localhost:8080/api/agent/" + agentId,
                    {
                        headers: {
                            Authorization: "Bearer " + jwt
                        }
                    }
                )
                .then( response => {
                    if( response.status == 200 ){
                        return response.json();
                    } else {
                        console.log( response );
                        alert( "retrieving toEdit failed");
                    }
                })
                .then( retrievedAgent => {
                    console.log( retrievedAgent );
                    setToEdit( retrievedAgent );
                })
                .catch( rejection => {
                    console.log( rejection );
                    alert( "something very bad happened...");
                });
            } else {
                nav("/login");
            }
        },
        []
    );


    function editFormShow() {
        let editForm = document.querySelector("#edit-form-" + props.agentObj.agentId);
        if (editForm.classList.contains("hidden")) {
            editForm.classList.remove("hidden");
        } else {
            editForm.classList.add("hidden");
        }
    }

    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    function handleMiddleNameChange(event) {
        setMiddleName(event.target.value);
    }

    function handleLastNameChange(event) {
        setLastName(event.target.value);
    }

    function replaceAgent(agentObj) {
        let filteredAgents = props.agents.filter(agent => agent.agentId !== agentObj.agentId);
        props.setAgents([agentObj, ...filteredAgents])
    }

    function handleSubmit(e) {
        e.preventDefault();
        let agentCopy = {...props.agentObj};
        agentCopy.firstName = firstName;
        agentCopy.middleName = middleName;
        agentCopy.lastName = lastName;

        fetch("http://localhost:8080/api/agent/" + agentCopy.agentId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(agentCopy)
        }).then(
            response => response.ok ? replaceAgent(agentCopy) : alert("Something went wrong! " + response)
        ).catch(
            rejection => alert(rejection)
        );
        editFormShow();
    }

    return (
        <>
            <form id={"edit-form-" + props.agentObj.agentId} className="hidden" onSubmit={handleSubmit}>
                <label htmlFor="first-name">First Name:</label><br />
                <input onChange={handleFirstNameChange} id="first-name"></input><br />
                <label for="middle-name">Middle Name:</label><br />
                <input onChange={handleMiddleNameChange} id="middle-name"></input><br />
                <label for="middle-name">Last Name:</label><br />
                <input onChange={handleLastNameChange} id="last-name"></input><br />
                <button>Submit</button>
            </form>
            <button onClick={editFormShow}>📝</button>
        </>
    )
}

export default EditAgent;