const $display = $('.individual-grudge');
const id = parseInt(window.location.pathname.split("/")[1]);

const forgiveGrudge = () => {
  $.ajax({
    url: '/api/grudges',
    type: 'patch',
    data: {
      forgiven: true,
      id: id
    }
  });
};

$.get('/api/grudges', (jsonData) => {
  jsonData.forEach((grudge) => {
    if(grudge.id === id) {
      $display.append((`
                        <h2>${grudge.name}</h2>
                        <p>${grudge.offense}</p>
                        <input onClick="forgiveGrudge()" class="forgive-button" type="submit" value="Forgive" />
                  `))
    }
  });
});
