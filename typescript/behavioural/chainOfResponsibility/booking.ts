import {allocateRoom, Allotment, Room} from "./allocateRoom";
// @ts-ignore - My IDE does seem to like this import
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

function getName(room: number | null, rooms: (Room & { name: string })[]) {
    return rooms.find(r => r.id === room)?.name
}

async function runApp(rooms: (Room & { name: string })[], bookedRooms: number[]): Promise<boolean> {


    console.log("Make booking: ")
    console.log(" 1) Regular: ")
    console.log(" 2) Special: ")
    console.log(" 0) Exit: ")

    const type = await rl.question('Enter selection:  ');
    if(type === "0") {
        return false
    }

    const peopleInput = await rl.question('Number of guests:  ');
    const people = Number.parseInt(peopleInput)

    const allotments: Allotment[] = Array.from({length: people}, () => ({
        room: null
    }))

    try {
        const roomsAvailable = rooms.filter(r => !bookedRooms.includes(r.id))

        const allotmentsRooms = allocateRoom({
            meeting: {special: type === "2", rooms: roomsAvailable},
            allotments
        })

        allotmentsRooms.forEach(allotment => {
            if(allotment.room && !bookedRooms.includes(allotment.room)) {
                bookedRooms.push(allotment.room)
            }
        })

        console.log(`Booking successful, allocated ${allotmentsRooms.length} guests in rooms [${allotmentsRooms.map(a => getName(a.room, rooms)).join(", ")}]`)
    } catch (e) {
        console.error("Booking failed: "+e)
    }

    return true
}

const appLoop = async () => {

    const rooms: (Room & { name: string })[] = [
        {
            id: 1,
            name: "Room 1"
        },
        {
            id: 2,
            name: "Room 2"
        },
        {
            id: 3,
            name: "Room 3",
            special: true
        }
    ]

    const bookedRooms: number[] = []

    while (await runApp(rooms, bookedRooms)) {
        console.log("run again")
    }
}

appLoop().then(() => {
    console.log("Done")
})