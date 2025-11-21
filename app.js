"use strict";
const iconSun = './assets/icons/sun.svg';
const iconRain = './assets/icons/cloud-rain.svg';
const iconWinter = './assets/icons/cloud-snow.svg';
const audioButtonsData = [
    { icon: iconSun, fileNameAudio: 'summer', urlImg: './assets/summer-bg.jpg' },
    { icon: iconRain, fileNameAudio: 'rain', urlImg: './assets/rain-bg.jpg' },
    { icon: iconWinter, fileNameAudio: 'winter', urlImg: './assets/winter-bg.jpg' },
];
let currentAudioElement = null;
document.addEventListener('DOMContentLoaded', () => {
    const buttonsContainer = document.getElementById('buttons-container');
    if (!buttonsContainer)
        return;
    // const soundsButtons = document.querySelectorAll<HTMLElement>('.sounds-button');
    // soundsButtons.forEach((button) => {
    //     //console.log(button.dataset.soundType);
    //     const soundType = button.dataset.soundType ?? '';
    //     button.onclick = () => playSound(soundType);
    // });
    audioButtonsData.forEach((buttonData) => {
        const button = createAudioButton(buttonData);
        buttonsContainer.appendChild(button);
    });
    // Регулируем громкость звука
    const volumeControl = document.querySelector('#volume-control');
    volumeControl.addEventListener('change', handleVolumeChange);
});
//Создание кнопок
function createAudioButton({ icon, fileNameAudio, urlImg }) {
    const button = document.createElement('div');
    button.classList = 'list__item sounds-button';
    button.style.backgroundImage = `url(${urlImg})`;
    const imgIcon = document.createElement('img');
    imgIcon.src = icon;
    imgIcon.alt = fileNameAudio;
    button.appendChild(imgIcon);
    //button.dataset.audioType = fileNameAudio;
    button.onclick = () => playSound(fileNameAudio);
    return button;
}
// Обработчик изменения уровня громкости
function handleVolumeChange(event) {
    const target = event.target;
    const newVolume = parseFloat(target.value);
    if (currentAudioElement) {
        currentAudioElement.volume = newVolume;
    }
}
// Воспроизвести выбранный звук
function playSound(fileNameAudio) {
    const audioElement = document.getElementById(`${fileNameAudio}-audio`);
    // Если ранее играла музыка, останавливаем её
    if (currentAudioElement && currentAudioElement !== audioElement) {
        currentAudioElement.pause();
    }
    if (audioElement.paused || !currentAudioElement) {
        // Запускаем новый трек
        audioElement.play().then(() => {
            currentAudioElement = audioElement;
        }).catch(err => console.error("Ошибка воспроизведения:", err));
    }
    else {
        // Остановили существующий файл
        audioElement.pause();
        currentAudioElement = null;
    }
    setBackgroundImage(fileNameAudio);
}
// Изменяет фоновый рисунок в зависимости от выбранного звука
function setBackgroundImage(fileNameAudio) {
    const file = audioButtonsData.find(file => file.fileNameAudio === fileNameAudio);
    //console.log(file?.urlImg);
    document.querySelector('.main').style.backgroundImage = `url(${file === null || file === void 0 ? void 0 : file.urlImg})`;
}
