export interface Room {
    id: number
    special?: boolean
}

export interface Meeting {
    rooms: Room[]
    special?: boolean
}

export interface Allotment {
    room: number | null;
}

export interface AllocationProperties {
    meeting: Meeting,
    allotments: Allotment[]
}

export const allocateRoom = ({meeting, allotments}: AllocationProperties): Allotment[] => {

    const newAllotments = [...allotments]

    if(allotments.length === 0) {
        throw new Error("Allocation is invalid - at least 1 allotment must be requested")
    }

    if (meeting.special === true) {
        meeting.rooms = meeting.rooms.filter(room => room.special)
    }

    if(meeting.rooms.length == 0) {
        throw new Error("No rooms available")
    }

    newAllotments.forEach((allotment) => {
        allotment.room = meeting.rooms?.[0]?.id || null
    })

    return newAllotments
}