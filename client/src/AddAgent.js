import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddAgent(){

const [first, setFirst] = useState("");
const [middle, setMiddle] = useState("");
const [last, setLast] = useState("");
const [birthdate, setBirthdate] = useState("");
const [height, setHeight] = useState(0);

const nav = useNavigate();

    function handleFirst(e){
        setFirst(e.target.value)        
    }

    function handleMiddle(e) {
        setMiddle(e.target.value);
    }

    function handleLast(e) {
        setLast(e.target.value);
    }

    function handleDOB(e) {
        setBirthdate(e.target.value);
    }

    function handleHeight(e) {
        setHeight(parseInt(e.target.value));
    }


    function handleSubmit(e){
        e.preventDefault();

        const newAgent = {
            firstName: first,
            middleName: middle,
            lastName: last,
            dob: birthdate,
            heightInInches: height
        };

        fetch("http://localhost:8080/api/agent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAgent)
        }).then(response => {
            alert(response.statusText + " agent");
            nav("/api/agent");
        })
        .catch(
            rejection => console.log("Failure ", rejection)
        );
    }


    return(
        <>
        <h2>Add a new Agent</h2>

        <form onSubmit={handleSubmit}>
            <label forHtml="firstName">First Name</label><br />
            <input onChange={handleFirst} id="firstName"></input><br /><br />
            
            <label forHtml="middleName">Middle Initial:</label><br />
            <input onChange={handleMiddle} id="middleName"></input><br /><br />

            <label forHtml="lastName">Last Name:</label><br />
            <input onChange={handleLast} id="lastName"></input><br /><br />

            <label forHtml="dob">DOB (YYYY-MM-DD):</label><br />
            <input onChange={handleDOB} id="dob"></input><br /><br />

            <label forHtml="heightInInches">Height (inches):</label><br />
            <input onChange={handleHeight} id="heightInInches"></input><br /><br />

            
            <button type="submit">Submit</button>
        </form>
        <hr />
        </>
    )
}

export default AddAgent;