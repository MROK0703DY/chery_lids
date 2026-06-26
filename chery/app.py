import requests
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Разрешает вашему JS делать запросы к Python

# Настройки дилера (заполните, когда дилер даст данные)
DIELER_API_URL = "https://diler-site.com"
DIELER_TOKEN = "токен_дилера"


# Этот маршрут просто открывает ваш index.html вместо Live Server
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


# Этот маршрут служит для отправки файлов скриптов (script.js)
@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('.', path)


# Этот маршрут принимает данные из формы и шлет дилеру
@app.route('/send-lead', methods=['POST'])
def forward_lead():
    user_data = request.json

    payload = {
        "name": user_data.get("name"),
        "phone": user_data.get("phone"),
        "source": "название_вашего_сайта"
    }

    headers = {
        "Authorization": f"Bearer {DIELER_TOKEN}",
        "Content-Type": "application/json"
    }

    try:
        # Отправка дилеру. Пока дилер не дал URL, эту строку можно закомментировать (#)
        # response = requests.post(DIELER_API_URL, json=payload, headers=headers)

        # Печатаем в консоль Python, что данные пришли успешно (для теста)
        print(f"Получен лид: Имя: {payload['name']}, Телефон: {payload['phone']}")

        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == '__main__':
    # Запуск сервера на компьютере
    app.run(debug=True, port=5000)
