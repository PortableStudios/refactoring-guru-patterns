import {allocateRoom, AllocationProperties} from "./allocateRoom";

function generateTestAllocationProps(): AllocationProperties {
    return {
        allotments: [{room: null}],
        meeting: {
            rooms: [
                {
                    id: 1
                },
                {
                    id: 2,
                    special: true
                }
            ]
        }
    };
}

describe('Chain of Responsibility', () => {
    it("should allocate room if valid and available", () => {
        const output = allocateRoom(generateTestAllocationProps())
        expect(output).not.toBeNull()
        expect(output.map(allot => allot.room).filter(Boolean).length).toBeGreaterThan(0)
    })
    it("should allocate special room if required", () => {
        const props = generateTestAllocationProps()
        props.meeting.special = true
        const output = allocateRoom(props)
        expect(output).not.toBeNull()
        expect(output.map(allot => allot.room)).toStrictEqual([2])
    })
    it("should throw error if invalid", () => {
        const props = generateTestAllocationProps()
        props.allotments = []
        expect(() => allocateRoom(props)).toThrow(/allocation is invalid/i)
    })
    it("should throw error if unavailable", () => {
        const props = generateTestAllocationProps()
        delete props.meeting.rooms[1]
        props.meeting.special = true
        expect(() => allocateRoom(props)).toThrow(/no rooms available/i)
    })
});