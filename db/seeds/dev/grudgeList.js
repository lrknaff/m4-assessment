exports.seed = function(knex, Promise) {
  return knex('grudges').del()
  .then(() => {
    return Promise.all([
      knex('grudges').insert({
        id: 1,
        name: 'Alex Tideman',
        offense: 'What kind of animal doesnt like mashed potatos?',
        forgiven: false,
        created_at: new Date
      }),
      knex('grudges').insert({
        id: 2,
        name: 'Taylor Moore',
        offense: 'Just being himself.',
        forgiven: false,
        created_at: new Date
      })
    ]);
  });
};
