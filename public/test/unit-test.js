describe('unit-testing grudge list', function() {
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

it('sortDate()', function() {
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

describe('unit testing individual grudge', function() {

});

describe('templates', function() {
  const grudge =
    {
      id: 1,
      name: 'chelsea',
      forgiven: true,
      offense: 'being mean',
      created_at: '2016-09-10T16:44:28.015Z'
    }

  it('grudgeListTemplate() should display a the name of the grudge', function() {
    let display = grudgeListTemplate(grudge)

    expect(display).to.contain('chelsea')
  });

  it('grudgeListTemplate() should include the id of a grudge', function() {
    let display = grudgeListTemplate(grudge)

    expect(display).to.contain("1")
  });

  it('grudgeCountTemplate() should have the correct title and count', function() {
    let countDisplay = grudgeCountTemplate("Forgiven", 60)

    expect(countDisplay).to.contain("Forgiven")
    expect(countDisplay).to.contain("60")
  });
});
