import { ChangeEvent, useContext, useEffect, useState } from "react"
import UserContext from "../components/UserContext";
import { UserData } from "../interfaces/UserData";
import { addUserToGroup, deleteGroup, removeUserFromGroup, retrieveGroupUsers } from "../api/groupAPI";
import { retrieveAllUsers } from "../api/userAPI";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import LoggedOutCard from "../components/LoggedOutCard";
import "../pages/styles/groupinfopage.css";
import { Send, Slash, User } from 'react-feather'; // Import icons


const GroupInfoPage = () => {
    const {currentGroup, updateCurrentGroup, currentUser} = useContext(UserContext);
    const [groupUsers, setGroupUsers] = useState<UserData[]>([]);
    const [inviteAlert, setInviteAlert] = useState('');
    const [inputData, setInputData] = useState({
        usernameInvitee: '',
    });
    const navigate = useNavigate();



    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };


    const updateGroupUsers = async () => {
        if(currentGroup){
            setGroupUsers(await retrieveGroupUsers(currentGroup.id as number));
        }
    }
    

    const kickUser = async (groupId: number, userId: number) => {
        removeUserFromGroup(groupId, userId);
        await updateGroupUsers();
    }

    const deleteCurrentGroup = () => {
        deleteGroup(currentGroup?.id as number);
        navigate("/viewgroups");
        updateCurrentGroup(null);
    };


    


    const inviteUser = async(nameOfUser: string) => {
        const foundUser = await retrieveAllUsers(nameOfUser);
        if(foundUser.length > 0) {
            const apiResponce = await addUserToGroup(currentGroup?.id as number, foundUser[0].id as number);
            if(typeof apiResponce === "string" ){
                setInviteAlert("User Invited");
                updateGroupUsers();
            } else {
                setInviteAlert("This User is already invited");
            }
        } else {
            setInviteAlert("User doesn't exist");
        }
    };

    
    useEffect(() => {
        if(currentGroup){
            updateGroupUsers();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentGroup]);

    return (
        <>
        {auth.loggedIn() ?


        // Page Stylizing //
        
    <div className="group-info-container">
    <h4>About Group</h4>
    {currentGroup ? (
        <>
            <div className="group-info-card">
                <h3>Host: {currentGroup?.hostUser?.username}</h3>

                {groupUsers.map((nextUser, indexKey) => {
                    if (nextUser.username !== currentGroup?.hostUser?.username) {
                        return (
                            <div key={indexKey} className="group-info-user-row">  
                                <User className="group-info-user-icon" />  {/* Add the User icon here */}
                                <p className="group-info-user-name">{nextUser.username}</p>  
                                {currentGroup?.hostUser?.id === currentUser.id && (
                                    <button 
                                        className="group-info-remove-button" 
                                        onClick={() => {
                                            kickUser(currentGroup.id!, nextUser.id!);
                                        }}
                                    >
                                        Remove <Slash className="group-info-send-icon" />
                                    </button>
                                )}
                            </div>
                        );
                    } else {
                        return null;  
                    }
                })}
            </div>

            {currentGroup?.hostUser?.id === currentUser.id && (
                <div className="group-info-section">
                    <div className="group-info-input-container">
                        <input
                            className="group-info-input"
                            type="text"
                            name="usernameInvitee"
                            value={inputData.usernameInvitee || ""}
                            onChange={handleInputChange}
                            placeholder="Username"
                        />
                        <button 
                            className="group-info-invite-button" 
                            onClick={() => {
                                inviteUser(inputData.usernameInvitee);
                            }}
                        >
                            Invite <Send className="group-info-send-icon" /> {/* Add the icon here */}
                        </button>
                    </div>
                    <p className="group-info-invite-alert">{inviteAlert}</p>
                </div>
            )}

            {currentGroup?.hostUser?.id === currentUser.id && (
                <button 
                    className="group-info-delete-button" 
                    onClick={() => deleteCurrentGroup()}
                >
                    Delete Group
                </button>
            )}

                {currentUser.username !== currentGroup?.hostUser?.username && (
                    <button 
                        className="group-info-leave-button" 
                        onClick={() => {
                            kickUser(currentGroup.id!, currentUser.id!);
                            updateCurrentGroup(null);
                            navigate("/viewgroups");
                        }}
                    >
                        Leave Group
                    </button>
                )}
            </>
        ) : (
            <p>You have no group selected.</p>
        )}
    </div>

// End of Page Stylizing //



        :
        <LoggedOutCard/>
        }
        </>
    )
}

export default GroupInfoPage