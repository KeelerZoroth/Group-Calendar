import { ChangeEvent, useContext, useEffect, useState } from "react"
import UserContext from "../components/UserContext";
import { UserData } from "../interfaces/UserData";
import { addUserToGroup, deleteGroup, removeUserFromGroup, retrieveGroupUsers } from "../api/groupAPI";
import { retrieveAllUsers } from "../api/userAPI";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import LoggedOutCard from "../components/LoggedOutCard";


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







    const styles: {[key: string]: React.CSSProperties} = {
        mainDiv: {
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        subDiv: {
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    }




    return (
        <>
        {auth.loggedIn() ?
        <div style={styles.mainDiv}>
            {currentGroup?.hostUser?.id === currentUser.id && (<div style={styles.subDiv}>
                <div>
                    <input 
                    type='text'
                    name='usernameInvitee'
                    value={inputData.usernameInvitee || ''}
                    onChange={handleInputChange}
                    />
                    <button onClick={
                        () => {
                            inviteUser(inputData.usernameInvitee)
                        }
                    }>Invite User</button>
                    <p>{inviteAlert}</p>
                </div>

                <button onClick={
                    () => {
                        deleteCurrentGroup()
                    }
                }>Delete Group</button>
            </div>)}
            
            <h2>Group Info</h2>
            {currentGroup ? 
            (
                <>
                {currentUser.username !== currentGroup?.hostUser?.username && (<button onClick={() => {
                    kickUser(currentGroup.id!, currentUser.id!);
                    updateCurrentGroup(null);
                    navigate("/viewgroups");
                }}>Leave Group</button>)}
                <div>
                    <h3>Host: {currentGroup?.hostUser?.username}</h3>
                    {groupUsers.map((nextUser, indexKey) => {
                        if(nextUser.username !== currentGroup?.hostUser?.username){
                            return (
                                <div key={indexKey}>
                                    <p>{nextUser.username}</p>
                                    {currentGroup?.hostUser?.id === currentUser.id && (<button onClick={() => {
                                        kickUser(currentGroup.id!, nextUser.id!);
                                    }}>Remove User</button>)}
                                </div>
                            )
                        } else {
                            return
                        }
                    })}
                </div>
                </>) 
            : (<p>You have no group selected.</p>)}
        </div>
        :
        <LoggedOutCard/>
        }
        </>
    )
}

export default GroupInfoPage