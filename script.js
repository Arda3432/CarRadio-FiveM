let player = null;

window.addEventListener('message', function(event) {
    let data = event.data;

    if (data.action === "open") {
        document.getElementById("urlInput").value = "";
        document.body.style.display = "block";
    }

    if (data.action === "play") {
        let videoId = extractYouTubeID(data.url);
        if (videoId) {
            if (player) {
                player.loadVideoById(videoId);
            } else {
                player = new YT.Player('player', {
                    height: '0',
                    width: '0',
                    videoId: videoId,
                    playerVars: { autoplay: 1 }
                });
            }
        }
    }

    if (data.action === "stop") {
        if (player) player.stopVideo();
    }
});

function submitUrl() {
    let url = document.getElementById("urlInput").value;
    fetch(`https://${GetParentResourceName()}/playRadio`, {
        method: 'POST',
        body: JSON.stringify({ url: url })
    }).then(() => {
        document.body.style.display = "none";
    });
}

function closeUI() {
    fetch(`https://${GetParentResourceName()}/close`, { method: 'POST' });
    document.body.style.display = "none";
}

document.body.style.display = "none";

function extractYouTubeID(url) {
    let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return null;
    }
}
