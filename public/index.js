const $list = $('.hate-list');

const displayGrudgeList = (jsonData) => {
  $list.append(`
    <li id=${jsonData.id}>${jsonData.name}<li>
    `)
  };

const addGrudgeToDb = (grudgeName, grudgeOffense) => {
  $.ajax({
    url: '/api/grudges',
    type: 'post',
    data: {
      name: grudgeName,
      offense: grudgeOffense
    },
    success: function(jsonData) {
      console.log(jsonData);
      displayGrudgeList(jsonData);
      displayGrudgeCount(jsonData);
    }
  });
};

const displayGrudgeCount = (jsonData) => {
  $.get('api/grudges', (jsonData) => {
    $('.hate-list-count').html(`Number of offenders: ${jsonData.length}`)
  });
};

const clearForm = () => {
  $('.offense-input').val('')
  $('.name-input').val('')
};

$.get('/api/grudges', (jsonData) => {
  console.log(jsonData);
  jsonData.forEach((grudge) => {
    $list.append((`
                  <li>${grudge.name}<li>
                `))
  });
  displayGrudgeCount(jsonData);
});

$('.add-offender-button').on('click', function() {
  const grudgeName = $('.name-input').val();
  const grudgeOffense = $('.offense-input').val();

  addGrudgeToDb(grudgeName, grudgeOffense);
  clearForm();
});
