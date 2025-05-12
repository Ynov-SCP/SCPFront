import SCPItem from '../SCPItem';

const SCPList = ({ scps, onDelete }) => {
    return (
        <div>
            {scps.map((scp) => (
                <SCPItem key={scp.id} scp={scp} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default SCPList;