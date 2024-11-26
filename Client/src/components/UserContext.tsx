import { createContext } from "react";
import { GroupData } from "../interfaces/GroupData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserContext = createContext<{ currentGroup: GroupData | null, updateCurrentGroup: (groupData: GroupData | null) => void }>({} as any);


export default UserContext
