
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";


function EditAgent() {


    

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


    
    function handleFirstNameChange(event) {
        let toEditCopy = {...toEdit};
        toEditCopy.firstName = event.target.value;
        setToEdit(toEditCopy);
    }

    function handleMiddleNameChange(event) {
        let toEditCopy = {...toEdit};
        toEditCopy.middleName = event.target.value;
        setToEdit(toEditCopy);
    }

    function handleLastNameChange(event) {
        let toEditCopy = {...toEdit};
        toEditCopy.lastName = event.target.value;
        setToEdit(toEditCopy);
    }

    function handleDOBChange(event) {
        let toEditCopy = {...toEdit};
        toEditCopy.dob = event.target.value;
        setToEdit(toEditCopy);
    }

    function handleHeightChange(event) {
        let toEditCopy = {...toEdit};
        toEditCopy.heightInInches = event.target.value;
        setToEdit(toEditCopy);
    }


    function handleSubmit(e) {
        e.preventDefault();
        
        

        fetch("http://localhost:8080/api/agent/" + toEdit.agentId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(toEdit)
        }).then(
            response => response.ok ? nav("/agents") : alert("Something went wrong! " + response)
        ).catch(
            rejection => alert(rejection)
        );
       
    }

    return (
        <>
        {toEdit ?  
            <form onSubmit={handleSubmit}>
                <label htmlFor="first-name">First Name:</label><br />
                <input value={toEdit?.firstName} onChange={handleFirstNameChange} id="first-name"></input><br />
                <label htmlFor="middle-name">Middle Name:</label><br />
                <input value={toEdit?.middleName} onChange={handleMiddleNameChange} id="middle-name"></input><br />
                <label htmlFor="last-name">Last Name:</label><br />
                <input value={toEdit?.lastName} onChange={handleLastNameChange} id="last-name"></input><br />
                <label htmlFor="dob">DOB:</label><br />
                <input type="date" value={toEdit?.dob} onChange={handleDOBChange} id="dob"></input><br />
                <label htmlFor="height">Height In Inches:</label><br />
                <input value={toEdit?.heightInInches} onChange={handleHeightChange} id="height"></input><br />
                <button>Submit</button>
            </form>

            : <></> }
            
        </>
    )
}

export default EditAgent;