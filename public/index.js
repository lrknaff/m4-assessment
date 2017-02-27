const $list = $('.hate-list');
const $hateCount = $('.hate-list-count');
const $unforgivenCount = $('.forgiven-count');
const $forgivenCount = $('.unforgiven-count');

$(document).ready(() => {
  displayAll();
});

const displayAll = () => {
  $.get('/api/grudges', (jsonData) => {
      displayGrudgeList((jsonData))
      displayGrudgeCount(jsonData);
      displayUnforgivenCount(jsonData);
      displayForgivenCount(jsonData);
    });
};

const displayGrudgeList = (jsonData) => {
  jsonData.forEach((grudge) => {
    $list.append(grudgeListTemplate(grudge))
  });
};

const displayGrudgeCount = (jsonData) => {
  const grudgeCountTitle = "Grudges"

  $.get('api/grudges', (jsonData) => {
    displayCount($hateCount, grudgeCountTemplate(grudgeCountTitle, jsonData.length))
  });
};

const displayUnforgivenCount = (jsonData) => {
  $.get('api/grudges', (jsonData) => {
    const count = countGrudges(jsonData, false);

    displayCount($unforgivenCount, grudgeCountTemplate("Unforgiven", count));
  });
};

const displayForgivenCount = (jsonData) => {
  $.get('api/grudges', (jsonData) => {
    const count = countGrudges(jsonData, true);

    displayCount($forgivenCount, grudgeCountTemplate("Forgiven", count));
  });
};

const displayCount = (element, display) => {
  element.html(display);
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
      displayAll(jsonData);
    }
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

const clearForm = () => {
  $('.offense-input').val('')
  $('.name-input').val('')
};

const sort = (grudges) => {
  return grudges.sort((a, b) => {
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
};

const sortByName = () => {
  $.get('/api/grudges', (jsonData) => {
    let sortedNames = sort(jsonData);

    $list.html('');
    displayGrudgeList(sortedNames);
  });
};

const sortByDate = () => {
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
