const grudgeListTemplate = (grudge) => {
  return (
      `
      <li id=${grudge.id}>
        <a href=/${grudge.id}>${grudge.name}</a>
      </li>
      `
  )
};

const grudgeCountTemplate = (title, grudgeCount) => {
  return (
   `${title}: <span>${grudgeCount.length}</span>`
  )
};
