

async function seedTuRecords(db){
    await db('tu_records').insert(
        {_id: 1, 
        value1: "dolphin", 
        value2: "2.4", 
        value3: true,
    })
}

module.exports = {
    seedTuRecords
}