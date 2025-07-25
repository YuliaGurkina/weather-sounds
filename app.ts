type AudioButton = { 
    icon: string, 
    fileNameAudio: string, 
    urlImg: string 
};

const iconSun = './assets/icons/sun.svg';
const iconRain = './assets/icons/cloud-rain.svg';
const iconWinter = './assets/icons/cloud-snow.svg';

const audioButtonsData: AudioButton[] = [
    { icon: iconSun, fileNameAudio: 'summer', urlImg: './assets/summer-bg.jpg' },
    { icon: iconRain, fileNameAudio: 'rain', urlImg: './assets/rain-bg.jpg' },
    { icon: iconWinter, fileNameAudio: 'winter', urlImg: './assets/winter-bg.jpg' },
];

let currentAudioElement: HTMLAudioElement | null = null;

document.addEventListener('DOMContentLoaded', () => {
    const buttonsContainer = document.getElementById('buttons-container');
    if (!buttonsContainer) return;
    
    //Создаем кнопки
    audioButtonsData.forEach((buttonData) => {
       const button = createAudioButton(buttonData);
       buttonsContainer.appendChild(button);
    });

    // Регулируем громкость звука
    const volumeControl = document.querySelector('#volume-control') as HTMLInputElement;
    volumeControl.addEventListener('change', handleVolumeChange);
});

//Создание кнопок
function createAudioButton({icon, fileNameAudio, urlImg}: AudioButton): HTMLElement {
    const button = document.createElement('div');
    button.classList = 'list__item sounds-button';
    button.style.backgroundImage = `url(${urlImg})`;
    const imgIcon = document.createElement('img');
    imgIcon.src = icon;
    imgIcon.alt = fileNameAudio;
    button.appendChild(imgIcon);
    button.onclick = () => playSound(fileNameAudio);
    return button;
}

// Обработчик изменения уровня громкости
function handleVolumeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newVolume = parseFloat(target.value);
    if (currentAudioElement) {
        currentAudioElement.volume = newVolume;
    }
}

// Воспроизвести выбранный звук
function playSound(fileNameAudio: string) {
    const audioElement = document.getElementById(`${fileNameAudio}-audio`) as HTMLAudioElement;

    // Если ранее играла музыка, останавливаем её
    if (currentAudioElement && currentAudioElement !== audioElement) {
        currentAudioElement.pause();
    }

    if (audioElement.paused || !currentAudioElement) {
        // Запускаем новый трек
        audioElement.play().then(() => {
            currentAudioElement = audioElement;
        }).catch(err => console.error("Ошибка воспроизведения:", err));
    } else {
        // Остановили существующий файл
        audioElement.pause();
        currentAudioElement = null;
    }

    setBackgroundImage(fileNameAudio);
}

// Изменяет фоновый рисунок в зависимости от выбранного звука
function setBackgroundImage(fileNameAudio: string) {
    const file = audioButtonsData.find(file => file.fileNameAudio === fileNameAudio);
    //console.log(file?.urlImg);
    document.querySelector<HTMLElement>('.main')!.style.backgroundImage = `url(${file?.urlImg})`;
}