"""
    Как это использовать в будущем?
    1. Когда акция идет:
    Вы оставляете HTML как есть. Скрипт сам считает дни,
    плашка показывается, отступ сайта равен 90px.
    2. Когда акции нет:
    Вы просто заходите в HTML-файл и добавляете класс hidden
    к блоку акции:
    <div class="promo-top-bar hidden" id="promo-bar-node">
    В этом случае плашка полностью аннулируется,
    а CSS автоматически установит верхний отступ сайта в 45px
    (ровно под размер верхней неподвижной плашки стоимости),
    обеспечивая идеальный внешний вид без дыр в дизайне.
"""

car_specifications = {
    "Tiggo 4": {
        "dimensions": "4318 x 1831 x 1662 мм",
        "engine": "1.5 л (атмосферный / турбо)",
        "power": "113 / 147 л.с.",
        "transmission": "МКПП / Вариатор (CVT)",
        "drive": "Передний (2WD)",
        "trunk_capacity": "340 - 1100 л",
        "clearance": "190 мм"
    },
    "TENET T4": {
        "dimensions": "4320 x 1831 x 1652 мм",
        "engine": "1.5 л (атмосферный / турбо)",
        "power": "113 / 147 л.с.",
        "transmission": "МКПП / Вариатор (CVT) / Робот (DCT6)",
        "drive": "Передний (2WD)",
        "trunk_capacity": "340 - 1100 л",
        "clearance": "190 мм"
    },
    "TENET T4L": {
        "dimensions": "4506 x 1831 x 1652 мм",  # Удлиненная версия
        "engine": "1.5 л Turbo",
        "power": "147 л.с.",
        "transmission": "Робот (DCT6)",
        "drive": "Передний (2WD)",
        "trunk_capacity": "457 - 1500 л",     # Увеличенный багажник
        "clearance": "203 мм"
    },
    "TENET T4 (4WD)": {
        "dimensions": "4320 x 1831 x 1652 мм",
        "engine": "1.5 л Turbo",
        "power": "147 л.с.",
        "transmission": "Робот (DCT6)",
        "drive": "Полный (4WD)",
        "trunk_capacity": "340 - 1100 л",
        "clearance": "190 мм"
    },
    "CHERY TIGGO 7 PRO MAX": {
        "dimensions": "4500 x 1842 x 1705 мм",
        "engine": "1.6 л Turbo (в рестайлинге) / 1.5 л Turbo",
        "power": "150 / 147 л.с.",
        "transmission": "Робот (7DCT) / Вариатор (CVT)",
        "drive": "Передний (2WD) / Полный (4WD)",
        "trunk_capacity": "475 - 1500 л",
        "clearance": "190 мм"
    }
}
