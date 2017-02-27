module.exports = function(params){
  return {
    name: params.name,
    offense: params.offense,
    forgiven: params.forgiven || false,
    created_at: params.date || new Date,
    date_of_offense: params.offenseDate || new Date
  };
}
