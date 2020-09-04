const db = require('../db-config')

async function getAllTuRecords(){
    return await db.select().table('tu_records')
}

async function getTuRecordById(id){
    return await db('tu_records').where('_id', id).first()
}

async function createTuRecord(){return}

async function modifyTuRecord(){return}

async function deleteTuRecord(){return}

function dbBoolToBool(x){
    return !x ? false : true
}

module.exports = {
    getAllTuRecords,
    getTuRecordById,
    createTuRecord,
    modifyTuRecord,
    deleteTuRecord,
    dbBoolToBool
}