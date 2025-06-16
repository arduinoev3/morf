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


const btn = document.getElementById('order-action');
const fields = {
  item: document.getElementById('item'),
  name: document.getElementById('name'),
  phone: document.getElementById('phone'),
};

btn.addEventListener('click', () => {
  let hasError = false;

  Object.entries(fields).forEach(([key, input]) => {
    const value = input.value.trim();

    const isValid =
      key === 'phone'
        ? value.length > 10
        : value.length > 0;

    input.style.borderColor = isValid ? '#fff' : 'red';
    if (!isValid) hasError = true;
  });

  if (!hasError) {
    alert('Спасибо за заявку! Мы скоро свяжемся с вами');
    Object.values(fields).forEach((input) => {
      input.value = '';
      input.style.borderColor = '#fff';
    });
  }
});