const programLinks = document.querySelectorAll('.list-group-item-action');
const videoPlayerContainer = document.getElementById('video-player-container');
const videoPlayer = videojs('video-player', {
    techOrder: ['html5'],
    html5: {
        hls: {
            withCredentials: false
        }
    }
});
const iframePlayer = document.getElementById('iframe-player');

function activateChannel(link) {
    const videoSrc = link.dataset.videoSrc;
    const iframeSrc = link.dataset.iframeSrc;

    if (videoSrc) {
        iframePlayer.style.display = 'none';
        iframePlayer.src = '';
        videoPlayerContainer.style.display = 'block';
        videoPlayer.src({ src: videoSrc, type: 'application/x-mpegURL' });
        videoPlayer.play();
        videoPlayerContainer.scrollIntoView({ behavior: 'smooth' });
    } else if (iframeSrc) {
        videoPlayer.pause();
        videoPlayerContainer.style.display = 'none';
        videoPlayer.src('');
        iframePlayer.style.display = 'block';
        iframePlayer.src = iframeSrc;
        iframePlayer.scrollIntoView({ behavior: 'smooth' });
    }

    programLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
}

programLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        activateChannel(link);
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '1' && key <= '9') {
        const index = parseInt(key, 10) - 1;
        if (index < programLinks.length) {
            activateChannel(programLinks[index]);
        }
    } else if (key === '0') {
        const index = 9;
        if (index < programLinks.length) {
            activateChannel(programLinks[index]);
        }
    }
});
