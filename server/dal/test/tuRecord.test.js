const {
    migrateTestDb,
    seedTuRecords,
    cleanUpTuRecords,
    dolphin,
    whale,
    orca,
    requestBody,
    newRequestBody
} = require('./fixtures')
const {
    getAllTuRecords,
    getTuRecordById,
    createTuRecord,
    modifyTuRecord,
    deleteTuRecord,
    dbBoolToBool,
    tuRecordToResponse,
    tuRequestToRecord
} = require('../tuRecord')
const db = require('../../db-config')
let sanitizedBody = tuRequestToRecord(requestBody)
let sanitizedNewBody = tuRequestToRecord(newRequestBody)

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

    test("tuRequestToRecord strips timestamp and packages keys neatly", () => {
        let actual = tuRequestToRecord(requestBody)
        expect(actual.timestamp === undefined).toBeTruthy()
    })

    test("tuRecordToResponse packages tuRecord as spec'ed response object", () => {
        let record = {
            _id: 2,
            value1: 'whale',
            value2: 4.2,
            value3: 0,
            created_at: '2020-09-04 01:13:25',
            updated_at: '2020-09-04 01:13:25'
        }
        let expected = {
            "id": 2,
            "timestamp": (new Date()).getTime(),
            "value1": "whale",
            "value2": 4.2,
            "value3": false
        }
        let actual = tuRecordToResponse(record)
        expect(actual.id).toEqual(expected.id)
        expect(actual.timestamp >= expected.timestamp).toBeTruthy()
        expect(actual.value1).toEqual(expected.value1)
        expect(actual.value2).toEqual(expected.value2)
        expect(actual.value3).toEqual(expected.value3)

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

    test("createTuRecord creates a record properly", async () => {
        let actual_id = await createTuRecord(sanitizedBody)
        let actual = await getTuRecordById(actual_id)
        let persisted = await getTuRecordById(actual_id)

        expect(actual_id).toEqual(persisted._id)
        expect(actual.value1).toEqual(requestBody.value1)
        expect(actual.value2).toEqual(requestBody.value2)
        expect(dbBoolToBool(actual.value3)).toEqual(requestBody.value3)
    })

    test("modifyTuRecord modifies specified record", async () => {
        let original_id = await createTuRecord(sanitizedBody)
        let original = await getTuRecordById(original_id)
        let num_updated = await modifyTuRecord(original_id, sanitizedNewBody)
        let actual = await getTuRecordById(original_id)

        expect(actual).not.toEqual(original)
        expect(actual._id).toEqual(original._id)

        expect(actual.value1).toEqual(newRequestBody.value1)
        expect(actual.value1).not.toEqual(original.value1)

        expect(actual.value2).toEqual(newRequestBody.value2)
        expect(actual.value2).not.toEqual(original.value2)

        expect(dbBoolToBool(actual.value3)).toEqual(newRequestBody.value3)
        expect(dbBoolToBool(actual.value3)).not.toEqual(original.value3)
    })

    test("deleteTuRecord deletes specified record only", async () => {
        let recordIdToDelete = await createTuRecord(sanitizedBody)
        let recordToDelete = await getTuRecordById(recordIdToDelete)
        let actual = await deleteTuRecord(recordToDelete._id)
        let lookupAll = await getAllTuRecords()

        expect(lookupAll.length).not.ToEqual(0)
        expect(lookupAll).not.toContain(recordToDelete)
        expect(actual).toEqual(recordToDelete._id)
    })
})