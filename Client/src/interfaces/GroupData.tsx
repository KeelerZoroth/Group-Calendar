import { UserData } from "./UserData";

export interface GroupData {
    id: number | null,
    groupName: string | null,
    hostUserId: number | null,
    hostUser: UserData | null,
    Users: UserData[] | null,
}