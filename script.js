const gameArea = document.getElementById("gameArea");
const photo1 = document.getElementById("photo1");
const photo2 = document.getElementById("photo2");
const statusMessage = document.getElementById("statusMessage");
const restartBtn = document.getElementById("restartBtn");

let photo1Pos = { x: 50, y: 50 }; // Начальная позиция фото 1
let photo2Pos = { x: 500, y: 350 }; // Начальная позиция фото 2
let gameInterval;
let photo1Speed = 3; // Скорость фото 1
let photo2Speed = 2; // Скорость фото 2
let timeElapsed = 0; // Время игры

// Функция для перемещения фото 1 (игрока)
function movePhoto1(e) {
    if (e.key === "ArrowUp") photo1Pos.y -= photo1Speed;
    if (e.key === "ArrowDown") photo1Pos.y += photo1Speed;
    if (e.key === "ArrowLeft") photo1Pos.x -= photo1Speed;
    if (e.key === "ArrowRight") photo1Pos.x += photo1Speed;

    // Обновляем позицию фото 1 на экране
    photo1.style.left = `${photo1Pos.x}px`;
    photo1.style.top = `${photo1Pos.y}px`;
}

// Функция для перемещения фото 2 (преследователь)
function movePhoto2() {
    // Логика для простого преследования
    if (photo2Pos.x < photo1Pos.x) photo2Pos.x += photo2Speed;
    if (photo2Pos.x > photo1Pos.x) photo2Pos.x -= photo2Speed;
    if (photo2Pos.y < photo1Pos.y) photo2Pos.y += photo2Speed;
    if (photo2Pos.y > photo1Pos.y) photo2Pos.y -= photo2Speed;

    // Обновляем позицию фото 2 на экране
    photo2.style.left = `${photo2Pos.x}px`;
    photo2.style.top = `${photo2Pos.y}px`;
}

// Проверка на столкновение
function checkCollision() {
    const dx = photo1Pos.x - photo2Pos.x;
    const dy = photo1Pos.y - photo2Pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 50) {
        clearInterval(gameInterval);
        statusMessage.textContent = "Вы проиграли!";
        restartBtn.style.display = "block"; // Показываем кнопку для перезапуска игры
    }
}

// Функция для старта игры
function startGame() {
    timeElapsed = 0; // Сброс времени
    photo1Pos = { x: 50, y: 50 }; // Начальная позиция фото 1
    photo2Pos = { x: 500, y: 350 }; // Начальная позиция фото 2
    photo1.style.left = `${photo1Pos.x}px`;
    photo1.style.top = `${photo1Pos.y}px`;
    photo2.style.left = `${photo2Pos.x}px`;
    photo2.style.top = `${photo2Pos.y}px`;
    statusMessage.textContent = "Выиграйте, продержавшись 5 минут!";
    restartBtn.style.display = "none"; // Скрываем кнопку для перезапуска игры

    gameInterval = setInterval(() => {
        timeElapsed++;
        if (timeElapsed >= 300) { // 5 минут = 300 секунд
            clearInterval(gameInterval);
            statusMessage.textContent = "Поздравляем, вы выиграли!";
            restartBtn.style.display = "block"; // Показываем кнопку для перезапуска игры
        } else {
            movePhoto2(); // Перемещаем фото 2
            checkCollision(); // Проверяем столкновение
        }
    }, 1000);

    // Слушаем нажатия клавиш для управления фото 1
    document.addEventListener("keydown", movePhoto1);
}

// Функция для перезапуска игры
function restartGame() {
    startGame();
}

// Старт игры при загрузке страницы
startGame();
