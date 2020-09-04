const dolphin = {
    _id: 1, 
    value1: "dolphin", 
    value2: 2.4, 
    value3: true,
}

const whale = {
    _id: 2,
    value1: "whale",
    value2: 4.2,
    value3: false,
}

const orca = {
    _id: 3,
    value1: "orca",
    value2: 2.3,
    value3: true,
}

async function migrateTestDb(db){
    await db.migrate.latest()
    await db('tu_records').truncate()
}

async function seedTuRecords(db){
    await db('tu_records').insert(dolphin)
    await db('tu_records').insert(whale)
    await db('tu_records').insert(orca)
}

async function cleanUpTuRecords(db){
    await db('tu_records').truncate()
}

module.exports = {
    migrateTestDb,
    seedTuRecords,
    cleanUpTuRecords,
    dolphin,
    whale,
    orca
}