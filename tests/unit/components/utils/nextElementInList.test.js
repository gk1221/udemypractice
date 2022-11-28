import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", ()=>{
    it("locates element in list and returns next in List", ()=>{
        const list=["A", "B", "C", "D", "E"]
        const value="C"
        const result = nextElementInList(list, value)
        expect(result).toBe("D")
    })

    describe("element is at the end", ()=>{
        it("locates element in list at start", ()=>{
            const list=["A", "B", "C", "D", "E"]
            const value="E"
            const result = nextElementInList(list, value)
            expect(result).toBe("A")
        })
    })
})

