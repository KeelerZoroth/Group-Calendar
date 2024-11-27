import { UserData } from "./UserData";


export interface CommentData {
    id: number | null,
    content: string | null,
    calendarYear: number | null,
    calendarMonth: number | null,
    calendarDay: number | null,
    groupId: number | null,
    createdByUserId: number | null,
    creatingUser: UserData | null,
}