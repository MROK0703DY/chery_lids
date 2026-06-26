document.getElementById('leadForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Стопаем стандартную перезагрузку страницы

    const nameInput = document.getElementById('userName').value.trim();
    const phoneInput = document.getElementById('userPhone').value.trim();

    // Регулярное выражение для проверки телефона (РФ)
    const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

    if (!phoneRegex.test(phoneInput)) {
        alert('Пожалуйста, введите корректный номер телефона (например, +79991234567)');
        return; // Останавливаем отправку, если номер неправильный
    }

    // Очищаем номер от скобок, пробелов и тире, оставляя только цифры
    const cleanPhone = phoneInput.replace(/\D/g, '');

    const data = {
        name: nameInput,
        phone: cleanPhone
    };

    try {
        // Отправляем данные на ваш локальный Python-сервер
        const response = await fetch('http://127.0.0', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Заявка успешно отправлена дилеру!');
            document.getElementById('leadForm').reset(); // Очищаем форму
        } else {
            alert('Ошибка при отправке. Попробуйте позже.');
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
        alert('Не удалось связаться с сервером.');
    }
});
