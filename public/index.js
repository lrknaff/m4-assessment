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
      displayUnforgivenCount(jsonData);
      displayForgivenCount(jsonData);
    }
  });
};

const displayGrudgeCount = (jsonData) => {
  $.get('api/grudges', (jsonData) => {
    $('.hate-list-count').html(`Number of offenders: ${jsonData.length}`)
  });
};

const displayUnforgivenCount = (jsonData) => {
  $.get('api/grudges', (jsonData) => {
    let count = 0;
    for(var i = 0; i < jsonData.length; i++) {
      if(jsonData[i].forgiven === false) {
        count++;
      }
    }
    $('.unforgiven-count').html(`Number of unforgiven: ${count}`)
  });
};

const displayForgivenCount = (jsonData) => {
  $.get('api/grudges', (jsonData) => {
    let count = 0;
    for(var i = 0; i < jsonData.length; i++) {
      if(jsonData[i].forgiven === true) {
        count++;
      }
    }
    $('.forgiven-count').html(`Number of forgiven: ${count}`)
  });
};

const clearForm = () => {
  $('.offense-input').val('')
  $('.name-input').val('')
};

const sortByName = () => {
  const sortDirection = $('.sort-by-name').attr("class");

  $.get('/api/grudges', (jsonData) => {
    let sortedNames = jsonData.sort((a, b) => {
      const nameA = a.name.replace(/\s+/g, '').toUpperCase();
      const nameB = b.name.replace(/\s+/g, '').toUpperCase();

      if (nameA < nameB) {
        return 1;
      } else if (nameB < nameA) {
        return -1;
      } else {
        return 0;
      }
    });

    $list.html('');

    sortedNames.forEach((grudge) => {
      $list.append((`
                    <li>${grudge.name}<li>
                  `))
    });
  });
};

const sortByDate = () => {
  const sortDirection = $('.sort-by-date').attr("class");

  $.get('/api/grudges', (jsonData) => {
    let sortedDates = jsonData.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (dateA < dateB) {
        return 1;
      } else if (dateB < dateA) {
        return -1;
      } else {
        return 0;
      }
    });

    $list.html('');

    sortedDates.forEach((grudge) => {
      $list.append((`
                    <li>${grudge.name}<li>
                  `))
    });
  });
};

$.get('/api/grudges', (jsonData) => {
  console.log(jsonData);
  jsonData.forEach((grudge) => {
    $list.append((`
                  <li>${grudge.name}<li>
                `))
  });
  displayGrudgeCount(jsonData);
  displayUnforgivenCount(jsonData);
  displayForgivenCount(jsonData);
});

$('.add-offender-button').on('click', function() {
  const grudgeName = $('.name-input').val();
  const grudgeOffense = $('.offense-input').val();

  addGrudgeToDb(grudgeName, grudgeOffense);
  clearForm();
});

$('.sort-by-name').on('click', function() {
  $(this).toggleClass('up');
  sortByName();
});

$('.sort-by-date').on('click', function() {
  $(this).toggleClass('up');
  sortByDate();
});
