const dbConfig = require(".../knexfile.js")
const { db } = require('../db-config')

async function getAllTuRecords(){
    let allRecords = await db.select().table('tu_records')
    console.log(allRecords)
    return allRecords
}

async function getTuRecordById(id){
    let tuRecord = await db('tu_records').where('id', id)
    console.log(tuRecord)
    return tuRecord
}

function createTuRecord(){return}

function modifyTuRecord(){return}

function deleteTuRecord(){return}


module.exports = {
    getAllTuRecords,
    getTuRecordById,
    createTuRecord,
    modifyTuRecord,
    deleteTuRecord
}