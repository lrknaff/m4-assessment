const $list = $('.hate-list');

const displayFolders = (jsonData) => {
  $list.append(`
                <div>list</div>
               `)
};


$.get('/api/grudges', (jsonData) => {
  console.log(jsonData);
  jsonData.forEach((grudge) => {
    $list.append((`
                  <li>${grudge.name}<li>
                `))
  })
});
