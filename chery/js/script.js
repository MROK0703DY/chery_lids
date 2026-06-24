// 0. Переключение тёмной/светлой темы
const themeToggleBtn = document.getElementById("theme-toggle-btn");

// При загрузке проверяем сохранённую тему в localStorage
const savedTheme = localStorage.getItem("chery-theme");
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeToggleBtn.textContent = "☀️";
}

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  themeToggleBtn.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("chery-theme", isLight ? "light" : "dark");
});

// 1. Спарсенный JSON объект из вашей системы
const data_site = {
  advantagetext: "Перебьем любую цену конкурентов!",
  advantext: "CHERY от 1 789 000 ₽!",
  advantext3: "Tenet — это и есть Chery, но под новым именем!",
  bot_name: "Виктория",
  bot_post: "Консультант автосалона CHERY = TENET",
  fixed_phone: "+7 (474) 254-53-12",
  fixed_text: "Позвонить:",
  logotext: "Официальный дилерский центр CHERY = TENET",
  phone: "+7 (474) 254-53-12",
  place: "Липецк, Лебедянское шоссе, владение 2",
  smsdesc:
    'Мы скоро свяжемся с Вами с номера <br><a href="tel:+74742500799">+7 (4742) 500-799</a>.<br>Пожалуйста, ответьте на звонок — это не спам.<br><br>Через <span class="time_redir" id="countdown">10</span> секунд отправим Вам: Подарочный сертификат на дополнительное оборудование стоимостью до 50 000 рублей!',
  smshead: "Спасибо за заявку!",
  promo_text: "Распродажа моделей T7 до 28 июня!",
  promo_end_date: "2026-06-28",
};

// ИСПРАВЛЕННАЯ База данных технических характеристик для модального окна
const carsData = {
  tiggo4: {
    title: "Tiggo 4",
    price: "от 1 650 000 ₽",
    img: "https://avatars.mds.yandex.net/get-verba/1030388/2a00000199cf3139e56c646479077e28cfec/wizardv3mr",
    specs: {
      Габариты: "4318 x 1831 x 1662 мм",
      Двигатель: "1.5 л (атмосферный / турбо)",
      Мощность: "113 / 147 л.с.",
      Трансмиссия: "МКПП / Вариатор (CVT)",
      Привод: "Передний (2WD)",
      Багажник: "340 - 1100 л",
      Клиренс: "190 мм",
    },
  },
  t4l: {
    title: "TENET T4L",
    price: "от 2 159 000 ₽",
    img: "https://autoreview.ru/images/Article/1790/Article_179000_860_575.jpg",
    specs: {
      Габариты: "4506 x 1831 x 1652 мм",
      Двигатель: "1.5 л Turbo",
      Мощность: "147 л.с.",
      Трансмиссия: "Робот (DCT6)",
      Привод: "Передний (2WD)",
      Багажник: "457 - 1500 л",
      Клиренс: "203 мм",
    },
  },
  t4_4wd: {
    title: "TENET T4 (4WD)",
    price: "от 2 300 000 ₽",
    img: "https://autoreview.ru/images/Article/1790/Article_179000_860_575.jpg",
    specs: {
      Габариты: "4320 x 1831 x 1652 мм",
      Двигатель: "1.5 л Turbo",
      Мощность: "147 л.с.",
      Трансмиссия: "Робот (DCT6)",
      Привод: "Полный (4WD)",
      Багажник: "340 - 1100 л",
      Клиренс: "190 мм",
    },
  },
  tiggo7: {
    title: "CHERY TIGGO 7 PRO MAX",
    price: "от 1 789 000 ₽",
    img: "https://s.auto.drom.ru/i24313/r/photos/1461977/big_1732213.jpg",
    specs: {
      Габариты: "4500 x 1842 x 1705 мм",
      Двигатель: "1.6 л Turbo / 1.5 л Turbo",
      Мощность: "150 / 147 л.с.",
      Трансмиссия: "Робот (7DCT) / Вариатор (CVT)",
      Привод: "Передний / Полный",
      Багажник: "475 - 1500 л",
      Клиренс: "190 мм",
    },
  },
};

// 2. Инъекция данных в HTML структуру
document.getElementById("target-phone-top").innerText = data_site.phone;
document.getElementById("target-logotext").innerText = data_site.logotext;
document.getElementById("target-place").innerText = data_site.place;
document.getElementById("target-adv1").innerText = data_site.advantagetext;
document.getElementById("target-adv2").innerText = data_site.advantext;
document.getElementById("target-adv3").innerText = data_site.advantext3;
document.getElementById("target-botname").innerText = data_site.bot_name;
document.getElementById("target-botpost").innerText = data_site.bot_post;
document.getElementById("target-fixedtext").innerText = data_site.fixed_text;
document.getElementById("target-fixedphone").innerText = data_site.fixed_phone;
document.getElementById("target-smshead").innerText = data_site.smshead;
document.getElementById("target-smsdesc").innerHTML = data_site.smsdesc;

// 3. Логика интерактивного модального окна (Popup)
const popupBg = document.getElementById("popup-bg");
const closePopupBtn = document.getElementById("close-popup-btn");
const leadForm = document.getElementById("lead-form-node");
const carInfo = document.getElementById("car-info-node");
const successBlock = document.getElementById("success-block-node");

// Элементы внутри модального окна для динамической подстановки данных
const modalTitle = document.getElementById("modal-car-title");
const modalPrice = document.getElementById("modal-car-price");
const modalImg = document.getElementById("modal-car-img");
const modalSpecsContainer = document.getElementById("modal-car-specs");
const hiddenCarInput = document.getElementById("client-car-choice");

// Делегирование кликов: вешаем слушатель на всю сетку автомобилей
document.querySelector(".cars-grid").addEventListener("click", (e) => {
  // Находим карточку авто, по которой или внутри которой кликнули
  const card = e.target.closest(".car-card");
  if (!card) return;

  const carId = card.dataset.carId;
  const carData = carsData[carId];

  if (carData) {
    // 1. Заполняем текстовые поля и картинку в модальном окне
    modalTitle.innerText = carData.title;
    modalPrice.innerText = carData.price;
    modalImg.src = carData.img;
    modalImg.alt = carData.title;

    // Передаем название модели в скрытое поле формы
    hiddenCarInput.value = carData.title;

    // 2. Генерируем таблицу характеристик
    modalSpecsContainer.innerHTML = ""; // Очищаем старые данные
    for (const [label, value] of Object.entries(carData.specs)) {
      const specRow = document.createElement("div");
      specRow.className = "spec-row";
      specRow.innerHTML = `
        <span class="spec-label">${label}</span>
        <span class="spec-value">${value}</span>
      `;
      modalSpecsContainer.appendChild(specRow);
    }

    // 3. Открываем окно
    popupBg.classList.add("active");
  }
});

const closePopup = () => {
  popupBg.classList.remove("active");
  setTimeout(() => {
    carInfo.style.display = "block";
    leadForm.style.display = "flex";
    successBlock.classList.remove("active");
  }, 300);
};

closePopupBtn.addEventListener("click", closePopup);
popupBg.addEventListener("click", (e) => {
  if (e.target === popupBg) closePopup();
});

// 4. Логика отправки заявки Виктории в Telegram
leadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Проверка чекбокса согласия на обработку ПД (152-ФЗ)
  const pdCheckbox = document.getElementById("pd-agreement");
  const checkboxLabel = pdCheckbox?.closest(".checkbox-agreement");

  if (!pdCheckbox || !pdCheckbox.checked) {
    if (checkboxLabel) {
      checkboxLabel.classList.add("error");
      // Убираем ошибку при повторном клике на чекбокс
      pdCheckbox.addEventListener(
        "change",
        () => checkboxLabel.classList.remove("error"),
        { once: true },
      );
    }
    // Показываем alert с понятным сообщением
    alert("Необходимо дать согласие на обработку персональных данных");
    return;
  }

  const name = document.getElementById("client-name").value;
  const phone = document.getElementById("client-phone").value;
  const selectedCar = hiddenCarInput.value || "Не определена";

  // Формируем текст сообщения для Telegram с указанием выбранного автомобиля
  const messageText = `🔥 Новая заявка на тест-драйв/расчет!\n🚗 Модель: <b>${selectedCar}</b>\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n✅ Согласие на ПД: Да\nМенеджер: Виктория`;

  // Данные вашего Telegram-бота (замените на свои, когда будете готовы)
  const TELEGRAM_TOKEN = "ВАШ_ТОКЕН_БОТА";
  const TELEGRAM_CHAT_ID = "ВАШ_ID_ЧАТА_ИЛИ_ВИКТОРИИ";
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  // Отправка запроса в фоновом режиме (Fetch)
  fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: messageText,
      parse_mode: "HTML",
    }),
  }).catch((err) => console.log("Ошибка отправки в TG:", err));

  // Визуальное переключение на окно "Спасибо"
  carInfo.style.display = "none";
  leadForm.style.display = "none";
  successBlock.classList.add("active");

  let timeLeft = 10;
  const countdownElement = document.getElementById("countdown");
  const interval = setInterval(() => {
    timeLeft--;
    if (countdownElement) countdownElement.innerText = timeLeft;
    if (timeLeft <= 0) clearInterval(interval);
  }, 1000);
});

// ==================== ИСПРАВЛЕННАЯ ЛОГИКА ДЛЯ НОВЫХ ВЕРХНИХ ПОЛЕЙ ====================

// Инъекция текста акции из data_site
if (document.getElementById("target-promo-text")) {
  document.getElementById("target-promo-text").innerText = data_site.promo_text;
}

// Автоматический расчет оставшихся дней
const calculateRemainingDays = (endDateStr) => {
  const now = new Date();
  const endDate = new Date(endDateStr);

  now.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const diffTime = endDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
};

// Вывод дней в счетчик с исправленным синтаксисом склонения
const remainingDays = calculateRemainingDays(data_site.promo_end_date);
const countdownNode = document.getElementById("target-promo-countdown");

if (countdownNode) {
  if (remainingDays > 0) {
    let dayWord = "дней";
    const lastDigit = remainingDays % 10;
    const lastTwoDigits = remainingDays % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      dayWord = "день";
    } else if (
      [2, 3, 4].includes(lastDigit) &&
      ![11, 12, 13, 14].includes(lastTwoDigits)
    ) {
      dayWord = "дня";
    }

    countdownNode.innerText = `Осталось: ${remainingDays} ${dayWord}`;
  } else {
    countdownNode.innerText = "Последний день акции!";
  }
}

// Логика скрытия панели по клику на крестик
const promoBar = document.getElementById("promo-bar-node");
const closePromoBtn = document.getElementById("close-promo-btn");
const quoteContainer = document.querySelector(".quote");

if (closePromoBtn && promoBar) {
  closePromoBtn.addEventListener("click", () => {
    promoBar.classList.add("hidden");
    if (quoteContainer) {
      quoteContainer.style.setProperty("margin-top", "45px", "important");
    }
  });
}
