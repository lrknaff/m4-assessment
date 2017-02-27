describe('Presentation and Interaction', function() {
  const grudgeArray = [
{
  id: 1,
  name: 'lacey',
  forgiven: false,
  offense: 'being mean',
  created_at: '2016-09-10T16:44:28.015Z'
},
{
  id: 2,
  name: 'mike',
  forgiven: true,
  offense: 'forgetting the cookies',
  created_at: '2015-09-10T16:44:28.015Z'
},
{
  id: 3,
  name: 'trump',
  forgiven: false,
  offense: 'having bad hair',
  created_at: '2014-09-10T16:44:28.015Z'
}
];

it('sortName()', function() {
let sortedArray = sortName(grudgeArray);

expect(sortedArray).to.eql([
    {
      id: 3,
      name: 'trump',
      forgiven: false,
      offense: 'having bad hair',
      created_at: '2014-09-10T16:44:28.015Z'
    },
    {
      id: 2,
      name: 'mike',
      forgiven: true,
      offense: 'forgetting the cookies',
      created_at: '2015-09-10T16:44:28.015Z'
    },
    {
      id: 1,
      name: 'lacey',
      forgiven: false,
      offense: 'being mean',
      created_at: '2016-09-10T16:44:28.015Z'
    }
  ]);
});

it('countGrudges() count unforgiven', function() {
  expect(countGrudges(grudgeArray, true)).to.equal(1);
});

it('countGrudges() count forgiven', function() {
  expect(countGrudges(grudgeArray, false)).to.equal(2);
});

});
