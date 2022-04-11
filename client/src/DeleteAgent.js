function DeleteAgent({ agentId, removeFromState }) {

    function handleDelete() {
        fetch("http://localhost:8080/api/agent/" + agentId, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            if (response.status === 200) {
                alert("Deleted successfully!");
                removeFromState(agentId);
            }
        })
    }

    return <button onClick={handleDelete}>❌</button>
}

export default DeleteAgent;