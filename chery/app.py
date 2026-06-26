from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Разрешает вашему JS делать запросы к Python

# Файл, куда будут сохраняться заявки клиентов (для локального тестирования)
LEADS_FILE = "leads.txt"


# Этот маршрут просто открывает ваш index.html вместо Live Server
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


# Этот маршрут служит для отправки файлов скриптов (script.js) и стилей
@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('.', path)


# Этот маршрут принимает данные из формы и сохраняет локально
@app.route('/send-lead', methods=['POST'])
def handle_lead():
    try:
        user_data = request.json
        name = user_data.get("name", "Не указано")
        phone = user_data.get("phone", "Не указано")
        car_model = user_data.get("car_model", "Не выбрана")

        # Получаем текущую дату и время для лога
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Красиво оформляем текст для записи в файл
        lead_entry = (
            f"=== НОВЫЙ ЛИД [{current_time}] ===\n"
            f"👤 Имя: {name}\n"
            f"📞 Телефон: {phone}\n"
            f"🚗 Выбор: {car_model}\n"
            f"==================================\n\n"
        )

        # Записываем заявку в файл leads.txt (дописываем в конец файла)
        with open(LEADS_FILE, "a", encoding="utf-8") as f:
            f.write(lead_entry)

        # Выводим сообщение в терминал VS Code для наглядности
        print(f"\n🎉 УСПЕХ! Получен лид от {name} ({phone}). "
              f"Машина: {car_model}. Записано в {LEADS_FILE}")

        return jsonify({"status": "success",
                        "message": "Lead saved locally"}), 200

    except Exception as e:
        print(f"❌ Ошибка на сервере: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == '__main__':
    print("🚀 Локальный тестовый сервер запущен!")
    print("👉 Нажмите Ctrl+C в терминале, чтобы остановить его.")
    app.run(debug=True, port=5000)
