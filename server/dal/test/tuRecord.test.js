const {
    migrateTestDb,
    seedTuRecords,
    cleanUpTuRecords,
    dolphin,
    whale,
    orca
} = require('./fixtures')
const {
    getAllTuRecords,
    getTuRecordById,
    createTuRecord,
    modifyTuRecord,
    deleteTuRecord,
    dbBoolToBool
} = require('../tuRecord')
const db = require('../../db-config')

beforeAll(async () => {
    console.log("Initializing and seeding test database...")
    await migrateTestDb(db)
    await seedTuRecords(db)
    console.log("Test database initialized and seeded.")
})

afterAll(async () => {
    console.log("Cleaning up test database...")
    cleanUpTuRecords(db)
})

describe("tuRecord.js", () => {

    test("dbBoolToBool converts database result of 0 or 1 to JS bool", () => {

        let falseResult = dbBoolToBool(0)
        let trueResult = dbBoolToBool(1)

        expect(falseResult).toEqual(false)
        expect(trueResult).toEqual(true)
    })

    test("getAllTuRecords returns all records", async () => {
        let actual = await getAllTuRecords()
        expect(actual.length).toEqual(3)

        let dolphinRec = actual[0]
        expect(dolphinRec._id).toEqual(1)
        expect(dolphinRec.value1).toEqual("dolphin")
        expect(dolphinRec.value2).toEqual(2.4)
        expect(dolphinRec.value3).toBeTruthy()
        expect(dolphinRec.created_at).not.toBeNull()
        expect(dolphinRec.updated_at).not.toBeNull()
    })
})