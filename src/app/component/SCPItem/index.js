const SCPItem = ({ scp, onDelete }) => {
    const handleDelete = () => {
        onDelete(scp.id);
    };

    return (
        <div>
            <h3>{scp.name}</h3>
            <p>{scp.description}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default SCPItem;