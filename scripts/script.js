const filterItems = document.querySelectorAll('.cars-filter li');
const carItems = document.querySelectorAll('.car');
const carsContent = document.getElementById('cars-content');

filterItems.forEach((item) => {
  item.onclick = () => {
    // переключаем «активный» пункт фильтра
    filterItems.forEach((el) => el.classList.remove('active'));
    item.classList.add('active');

    const filterText = item.textContent.toLowerCase();

    // показываем / скрываем карточки автомобилей
    carItems.forEach((car) => {
      const carTitle = car.querySelector('h4').textContent.toLowerCase();

      if (filterText === 'все марки' || carTitle.includes(filterText)) {
        car.style.display = 'flex';
      } else {
        car.style.display = 'none';
      }
    });

    // мгновенно скроллим к блоку с карточками
    carsContent.scrollIntoView({ behavior: 'instant' });
  };
});

const btn = document.getElementById('order-action');
const fields = {
  car: document.getElementById('car'),
  name: document.getElementById('name'),
  phone: document.getElementById('phone'),
};

btn.addEventListener('click', () => {
  let hasError = false;

  Object.entries(fields).forEach(([key, input]) => {
    const value = input.value.trim();

    const isValid =
      key === 'phone'
        ? value.length > 10 // ► новая простая проверка
        : value.length > 0; // ► для name и car — непустое поле

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
