Date.prototype.now = function() {
    return ((this.getHours() < 10)?"0":"") + this.getHours() + ":" + 
            ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ":" + 
            ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};

function play(tag) {
    document.getElementById('audioFile').play();
}

function playAudioFile(audioFile) {
    var audio = new Audio('/jingles/' + audioFile);
    audio.play();
}