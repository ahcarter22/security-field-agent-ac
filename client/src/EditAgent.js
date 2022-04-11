import { useState } from "react";

function EditAgent(props) {


    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");

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

        fetch("http://localhost:8080/api/agents/" + agentCopy.agentId, {
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