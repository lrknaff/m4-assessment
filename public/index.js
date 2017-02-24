const $list = $('.hate-list');

const displayGrudgeList = (jsonData) => {
  $list.append(`
      <li id=${jsonData.id}>
        <a href=/${jsonData.id}>${jsonData.name}</a>
      </li>
    `)
  };

const addGrudgeToDb = (grudgeName, grudgeOffense, id) => {
  $.ajax({
    url: '/api/grudges',
    type: 'post',
    data: {
      name: grudgeName,
      offense: grudgeOffense
    },
    success: function(jsonData) {
      displayGrudgeList(jsonData);
      displayGrudgeCount(jsonData);
      displayUnforgivenCount(jsonData);
      displayForgivenCount(jsonData);
    }
  });
};

const displayGrudgeCount = (jsonData) => {
  $.get('api/grudges', (jsonData) => {
    $('.hate-list-count').html(`Grudges: <span>${jsonData.length}</span>`)
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
    $('.unforgiven-count').html(`Unforgiven: <span>${count}</span>`)
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
    $('.forgiven-count').html(`Forgiven: <span>${count}</span>`)
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

    displaySorted(sortedNames);
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

    displaySorted(sortedDates);
  });
};

const displaySorted = (sorted) => {
  sorted.forEach((grudge) => {
    $list.append((`
                    <li id=${grudge.id}>
                      <a href=/${grudge.id}>${grudge.name}</a>
                    </li>
                `))
  });
};

$.get('/api/grudges', (jsonData) => {
  jsonData.forEach((grudge) => {
    $list.append((`
                      <li id=${grudge.id}>
                        <a href=/${grudge.id}>${grudge.name}</a>
                      </li>
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
