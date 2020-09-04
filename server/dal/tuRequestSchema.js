// tbl.increments("_id").notNullable()
// tbl.string("value1").notNullable()
// tbl.float("value2").notNullable()
// tbl.boolean("value3").notNullable()
// /**
//  * You can create both of these with table.timestamps(true, true)
//  * adhering more closely to the actual data
//  * but the name requirements necessitate these be created individually
//  */
// tbl.date("creationDate").notNullable()
// tbl.date("lastModificationDate").notNullable()

const validator = require("jsonschema").Validator

const tuRequestSchema = { 
    "id":"tuRequest", 
    "type":"object", 
    "properties":{  
        "timestamp": {
            "type": "integer"
        },
        "value1": {
            "type":"string"
        },  
        "value2": {   
            "type": "float"
        },  
        "value3": {
            "type": "bool"
        }
    }, 
    "required" :[
        "timestamp",
        "value1",
        "value2",
        "value3"
    ]
};

const tuRequestValidator = new validator();
tuRequestValidator.addSchema(tuRequestSchema, "tuRequest");

module.exports = {
    tuRequestSchema,
    tuRequestValidator
}