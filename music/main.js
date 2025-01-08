let playButtons = document.querySelectorAll('.play');
let pauseButtons = document.querySelectorAll('.pause');
let timeDisplays = document.querySelectorAll('.time_remaining');
let audios = document.querySelectorAll('audio');

// Función para formatear el tiempo en mm:ss
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Mostrar la duración total de las canciones al cargar la página
audios.forEach((audio, index) => {
    audio.addEventListener('loadedmetadata', () => {
        let timeDisplay = timeDisplays[index];
        timeDisplay.textContent = formatTime(audio.duration);
    });
});

// Función para reproducir una canción
function playAudio(button, audio, timeDisplay) {
    // Pausar y reiniciar otros audios
    audios.forEach(a => {
        if (a !== audio) {
            a.pause();
            a.currentTime = 0;
        }
    });

    // Restablecer todos los botones de reproducción y pausa
    playButtons.forEach(btn => {
        btn.style.display = 'block';
    });
    pauseButtons.forEach(pauseBtn => {
        pauseBtn.style.display = 'none';
    });

    if (audio.paused) {
        audio.play();
        button.style.display = 'none';

        // Mostrar el botón de pausa correspondiente
        pauseButtons.forEach(pauseButton => {
            if (pauseButton.dataset.audioId === audio.id) {
                pauseButton.style.display = 'block';
            }
        });

        // Actualizar el tiempo restante
        audio.addEventListener('timeupdate', () => {
            let timeLeft = audio.duration - audio.currentTime;
            timeDisplay.textContent = formatTime(timeLeft);
        });

        // Evento para iniciar la siguiente canción al finalizar la actual
        audio.addEventListener('ended', () => {
            let nextIndex = (Array.from(audios).indexOf(audio) + 1) % audios.length;
            let nextAudio = audios[nextIndex];
            let nextButton = playButtons[nextIndex];
            let nextTimeDisplay = timeDisplays[nextIndex];
            playAudio(nextButton, nextAudio, nextTimeDisplay);
        });
    } else {
        audio.pause();
    }
}

// Añadir eventos a los botones de reproducción
playButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        let audioId = 'music' + button.id.replace('play', '');
        let audio = document.getElementById(audioId);
        let timeDisplay = document.querySelector(`#time${button.id.replace('play', '')}`);
        playAudio(button, audio, timeDisplay);
    });
});

// Añadir eventos a los botones de pausa
pauseButtons.forEach(button => {
    button.addEventListener('click', () => {
        let audioId = button.dataset.audioId;
        let audio = document.getElementById(audioId);

        if (!audio.paused) {
            audio.pause();
            button.style.display = 'none';

            // Mostrar el botón de reproducción correspondiente
            playButtons.forEach(playButton => {
                if ('music' + playButton.id.replace('play', '') === audioId) {
                    playButton.style.display = 'block';
                }
            });
        }
    });
});


//like

let like = document.querySelectorAll('.like_gusta');
let me_gusta = document.querySelectorAll('.like_red');

like.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (me_gusta[index].style.display === 'none' || me_gusta[index].style.display === '') {
            me_gusta[index].style.display = 'block';
            button.style.display = 'none';
        } else {
            me_gusta[index].style.display = 'none';
        }
    });
});

me_gusta.forEach((button, index) => {
    button.addEventListener('click', () => {
        like[index].style.display = 'block';
        button.style.display = 'none';
    });
});

//menu

let menu_movil = document.querySelector('#menu_movil');
let exit = document.querySelector('#exit');

let menu = document.querySelector('#menu').addEventListener('click', ()=>{
    menu_movil.style.display = 'block';
    exit.addEventListener('click', ()=>{
        if(menu_movil.style.display === 'block'){
            menu_movil.style.display = 'none';
        }
    })
});

