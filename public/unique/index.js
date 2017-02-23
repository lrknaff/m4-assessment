const $display = $('.individual-grudge');

$.get('/api/grudges', (jsonData) => {
  const id = parseInt(window.location.pathname.split("/")[1]);
  console.log(jsonData);
  jsonData.forEach((grudge) => {
    if(grudge.id === id) {
      console.log(grudge)
      $display.append((`
                      <h2>${grudge.name}</h2>
                      <p>${grudge.offense}</p>
                      <input class="forgive-button" type="submit" value="Forgive" />
                  `))
    }
  });
});
