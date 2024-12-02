import { ChangeEvent, useContext, useEffect, useState } from "react";
import { retrieveUserGroups } from "../api/userAPI";
import { GroupData } from "../interfaces/GroupData";
import GroupCard from "../components/GroupCard";
import UserContext from "../components/UserContext";
import { createGroup } from "../api/groupAPI";
import auth from "../utils/auth";
import LoggedOutCard from "../components/LoggedOutCard";
import "../pages/styles/viewgroups.css";
import { PlusCircle } from 'react-feather'; // Import icons


const ViewGroupsPage = () => {
    const [userGroups, setUserGroups] = useState<GroupData[]>([]);
    const { currentGroup, updateCurrentGroup, currentUser } = useContext(UserContext);
    const [inputData, setInputData] = useState({
        newGroupName: '',
    });



    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };
    
    const updateUserGroups = async () => {
        if(currentUser.id){
            setUserGroups(await retrieveUserGroups(currentUser.id as number));
        }
    }
    
    
    const createNewGroup = async (groupName: string, hostUserId: number) => {
        console.log(await createGroup({groupName, hostUserId}));
        await updateUserGroups()
    }



    useEffect(() => {
        updateUserGroups()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);
    return (
        <>
        {auth.loggedIn() ?

// Page Stylizing //

    <div className="view-groups-main-container">
    <h2>My Groups</h2>
        <div className="view-groups-section">
            <h3>Current Group</h3>
            <div>
                {currentGroup ? <GroupCard group={currentGroup} /> : <p>No group selected</p>}
            </div>
        </div>

        <div className="view-groups-section-create">
            <h3>Create New Group</h3>
            <div className="view-groups-input-container">
                <input 
                    type="text"
                    name="newGroupName"
                    value={inputData.newGroupName || ''}
                    onChange={handleInputChange}
                    placeholder="Enter Group Name"
                />
                <button onClick={() => createNewGroup(inputData.newGroupName, currentUser!.id!)} className="view-groups-create-group-button">
                    Add <PlusCircle className="view-groups-plus-icon" /> {/* Add the icon here */}
                </button>
            </div>
        </div>
    
        <div className="view-groups-section">
            <h3>Switch Group</h3>
            {userGroups.map((nextGroup, indexKey) => (
                <div className="view-groups-card" key={indexKey}>
                    <GroupCard group={nextGroup} /> 
                    <button onClick={() => updateCurrentGroup(nextGroup)} className="view-groups-select-button">Select</button>
                </div>
            ))}
        </div>
    </div>

// End of Page Stylizing //



        :
        <LoggedOutCard />
        }
        </>
    )
}

export default ViewGroupsPage