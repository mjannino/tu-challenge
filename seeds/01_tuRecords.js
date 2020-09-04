
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tu_records').del()
    .then(function () {
      // Inserts seed entries
      return knex('tu_records').insert([
        {
          value1: "dolphin", 
          value2: 2.4, 
          value3: true,
        },
        {
          value1: "whale",
          value2: 4.2,
          value3: false,
        },
        {
          value1: "orca",
          value2: 2.3,
          value3: true,
      }
      ]);
    });
};
