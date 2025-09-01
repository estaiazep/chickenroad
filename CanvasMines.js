const canvas = document.getElementById("canvas")
const ctx = canvas ? canvas.getContext("2d") : null

if (!canvas || !ctx) {
  console.warn("Canvas element not found")
}

const size = 271
canvas.width = size
canvas.height = size

// Загружаем сигнал
const signalImg = new Image()
signalImg.src = "signalIMG.png"

// Настройки анимации
const pieceCount = 50
const pieceMinSize = 5
const pieceMaxSize = 15
const pieceSpeedFactor = 0.05
const pieceColor = "#0168CF"

// Состояние
let imageVisible = true
const pieces = []

// Рисуем картинку
function drawSignalImage() {
  if (!ctx || !imageVisible) return
  ctx.drawImage(signalImg, 0, 0, size, size)
}

// Создаём частицы
function createPieces() {
  for (let i = 0; i < pieceCount; i++) {
    const angle = Math.random() * 2 * Math.PI
    const distance = Math.random() * 150 + 50
    pieces.push({
      x: size / 2,
      y: size / 2,
      vx: Math.cos(angle) * distance,
      vy: Math.sin(angle) * distance,
      size: pieceMinSize + Math.random() * (pieceMaxSize - pieceMinSize),
      color: pieceColor,
      opacity: 1,
    })
  }
}

// Анимация
function animate() {
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "#090E1D"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Если сигнал ещё не удалён → рисуем
  drawSignalImage()

  // Частицы
  pieces.forEach((piece, index) => {
    piece.x += piece.vx * pieceSpeedFactor
    piece.y += piece.vy * pieceSpeedFactor
    piece.opacity -= 0.02

    ctx.fillStyle = `rgba(${parseInt(piece.color.slice(1, 3), 16)}, 
                          ${parseInt(piece.color.slice(3, 5), 16)}, 
                          ${parseInt(piece.color.slice(5, 7), 16)}, 
                          ${piece.opacity})`

    ctx.fillRect(piece.x, piece.y, piece.size, piece.size)

    if (piece.opacity <= 0) {
      pieces.splice(index, 1)
    }
  })

  requestAnimationFrame(animate)
}

// Удаление картинки → запуск анимации
function removeSignalImage() {
  if (!imageVisible) return
  imageVisible = false
  createPieces()
}

// Запуск
signalImg.onload = () => {
  animate()
}

// Экспортим в глобал (можно вызвать в консоли)
window.removeSignalImage = removeSignalImage

