const $list = $('.hate-list');
const $hateCount = $('.hate-list-count');
const $unforgivenCount = $('.forgiven-count');
const $forgivenCount = $('.unforgiven-count');

$(document).ready(() => {
  $.get('/api/grudges', (jsonData) => {
      displayGrudgeList((jsonData))
      displayGrudgeCount(jsonData);
      displayUnforgivenCount(jsonData);
      displayForgivenCount(jsonData);
    });
});

const displayGrudgeList = (jsonData) => {
  jsonData.forEach((grudge) => {
    $list.append(grudgeListTemplate(grudge))
  });
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
  let grudgeCountTitle = "Grudges"

  $.get('api/grudges', (jsonData) => {
    $hateCount.html(grudgeCountTemplate(grudgeCountTitle, jsonData))
  });
};

const displayUnforgivenCount = (jsonData) => {
  $.get('api/grudges', (jsonData) => {
    const count = countGrudges(jsonData, false);

    $('.unforgiven-count').html(`Unforgiven: <span>${count}</span>`)
  });
};

const countGrudges = (jsonData, boolean) => {
  let count = 0;

  for(var i = 0; i < jsonData.length; i++) {
    if(jsonData[i].forgiven === boolean) {
      count++;
    }
  };

  return count;
};

const displayForgivenCount = (jsonData) => {
  $.get('api/grudges', (jsonData) => {
    const count = countGrudges(jsonData, true);

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

    displayGrudgeList(sortedNames);
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

    displayGrudgeList(sortedDates);
  });
};

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
