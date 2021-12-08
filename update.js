document.getElementsByTagName("button")[0].addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: `
            videos = document.querySelector('video');
            videos.pause();
            document.body.style.opacity = .5;
            p = document.createElement('p');
            p.innerHTML = 'Please click on a video';
            p.style.position = 'absolute';
            p.style.top = '0%';
            p.style.left = '0%';
            p.style.width = '100%';
            p.style.height = '100%';
            p.style.textAlign = 'center';
            p.style.fontSize = '50px';
            p.style.color = 'white';
            p.style.zIndex = Math.pow(10, 10);
            p.style.opacity = 0.3;
            p.style.pointerEvents = "none";
            document.body.appendChild(p);
            Array(videos).forEach((e) => {
                e.onclick = function() {
                    e.requestPictureInPicture();
                    document.body.style.opacity = 1;
                    videos.onclick = null;
                    p.remove();
                }
            });
        `});
    });
});