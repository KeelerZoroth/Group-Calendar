import { createContext } from "react";
import { GroupData } from "../interfaces/GroupData";
import { UserData } from "../interfaces/UserData";


interface ContextInterface {
    currentGroup: GroupData | null,
    updateCurrentGroup: (groupData: GroupData | null) => void,
    currentUser: UserData,
    updateCurrentUser: (userData: UserData) => void,
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserContext = createContext<ContextInterface>({} as any);


export default UserContext
