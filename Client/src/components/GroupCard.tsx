import { GroupData } from "../interfaces/GroupData";
import "../pages/styles/GroupCard.css";

const GroupCard = (props: { group: GroupData }) => {
    const { group } = props;

    return (
        <div className="group-card-main">
            <div className="group-card-info-main">
                <h1>{group.groupName}</h1>
            </div>
            <div className="group-card-user-row">
                <div className="group-card-user-name">
                    <p>Host: {group.hostUser?.username}</p>
                </div>
            </div>
        </div>
    );
}

export default GroupCard;
