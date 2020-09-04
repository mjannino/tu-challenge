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
        expect(dolphinRec.value1).toEqual(dolphin.value1)
        expect(dolphinRec.value2).toEqual(dolphin.value2)
        expect(dolphinRec.value3).toBeTruthy()
        expect(dolphinRec.created_at).not.toBeNull()
        expect(dolphinRec.updated_at).not.toBeNull()
    })

    test("getTuRecordById gets correct record", async () => {
        let actual = await getTuRecordById(2)
        expect(actual._id).toEqual(2)
        expect(actual.value1).toEqual(whale.value1)
        expect(actual.value2).toEqual(whale.value2)
        expect(actual.value3).toBeFalsy()
        expect(actual.created_at).not.toBeNull()
        expect(actual.updated_at).not.toBeNull()
    })
})