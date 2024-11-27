import { ChangeEvent, useContext, useEffect, useState } from "react";
import { retrieveUserGroups } from "../api/userAPI";
import { GroupData } from "../interfaces/GroupData";
import GroupCard from "../components/GroupCard";
import UserContext from "../components/UserContext";
import { createGroup } from "../api/groupAPI";
import auth from "../utils/auth";
import LoggedOutCard from "../components/LoggedOutCard";


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


    const styles: {[key: string]: React.CSSProperties} = {
        mainDiv: {
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        subDiv: {
            width: '100%',
            background: 'rgb(0, 255, 255)',
            border: '3px solid navy',
        },
        subDiv2: {
            width: '100%',
            paddingBottom: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        h2: {
            margin: '10px 0px',
        },
        groupListDiv: {
            width: '100%',
            padding: '10px 0px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        groupDiv: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        groupSubDiv: {
            width: '100%',
            background: 'rgb(100, 100, 100)',
            padding: '5px 0px',
        }
    };
    
    return (
        <>
        {auth.loggedIn() ?
        <div style={styles.mainDiv}>
            <div>
                <input 
                    type='text'
                    name='newGroupName'
                    value={inputData.newGroupName || ''}
                    onChange={handleInputChange}
                />
                <button onClick={
                    () => {
                        createNewGroup(inputData.newGroupName, currentUser!.id!);
                    }
                }>Create Group</button>
            </div>
            <div style={styles.subDiv}>
                <div style={styles.subDiv2}>
                    <p><strong>Current Group:</strong></p>
                    {currentGroup ? <GroupCard group={currentGroup} /> : <p>None</p>}
                </div>
                <h2 style={styles.h2}>Your Groups</h2>
            </div>
            <div style={styles.groupListDiv}>
                {userGroups.map((nextGroup, indexKey) => {
                    // if (currentGroup?.groupName !== nextGroup.groupName && currentGroup?.hostUser?.id !== nextGroup.hostUser?.id){
                        return (
                        <div style={styles.groupDiv} key={indexKey}>
                            <GroupCard group={nextGroup} /> 
                            <div style={styles.groupSubDiv}>
                                <button onClick={() => {
                                    updateCurrentGroup(nextGroup); 
                                }}>Select</button>
                            </div>
                        </div>)
                    // }
                })}
            </div>
        </div>
        :
        <LoggedOutCard />
        }
        </>
    )
}

export default ViewGroupsPage