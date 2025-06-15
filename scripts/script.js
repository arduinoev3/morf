const filterItems = document.querySelectorAll('.items-filter li');
const itemCards   = document.querySelectorAll('.item');
const itemsContent = document.getElementById('items-content');

filterItems.forEach((item) => {
  item.onclick = () => {
    // переключаем «активный» пункт фильтра
    filterItems.forEach((el) => el.classList.remove('active'));
    item.classList.add('active');

    const filterText = item.textContent.toLowerCase();

    // показываем / скрываем карточки
    itemCards.forEach((card) => {
      const title = card.querySelector('h4').textContent.toLowerCase();
      card.style.display =
        filterText === 'все' || title.includes(filterText) ? 'flex' : 'none';
    });

    // мгновенно скроллим к блоку с карточками
    itemsContent.scrollIntoView({ behavior: 'instant' });
  };
});
