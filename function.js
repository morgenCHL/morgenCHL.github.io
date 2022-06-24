var video;
var cvs;
let t1=0;
let t2=0;
let pauseCount = -1;
let rewindCount = 0;
let forwardCount = 0;

window.onload=function(){
    video = document.getElementById("video");
    video.addEventListener("timeupdate", updateTimer);
    video.addEventListener("ended", function(){
        alert("Ended");
    });
    video.addEventListener("play", function(){
        if ((t2 - t1) > 1){
            forwardTag = document.querySelector("#forward");
            forwardCount++;
            updateMessage = "影片跳躍次數: " + forwardCount + " 次";
            forwardTag.innerHTML = updateMessage;
        }else if((t2 - t1) < -1){
            rewindTag = document.querySelector("#rewind");
            rewindCount++;
            updateMessage = "影片倒帶次數: " + rewindCount + " 次";
            rewindTag.innerHTML = updateMessage;
        }else{
            pauseCount++;
            updateMessage = "影片暫停次數: " + pauseCount + " 次";
            pauseTag = document.querySelector("#pause");
            pauseTag.innerHTML = updateMessage;
            playTime_before = video.currentTime;
        }
        t1 = video.currentTime;
        t2 = video.currentTime;
    });
};
function updateTimer(){
    t2 = video.currentTime;
    if((t2-t1)>0 && (t2-t1)<0.5){
        t1=t2;
    }
    var timer = document.getElementById("timer");
    timer.innerHTML = video.currentTime+"/"+video.duration;
    document.querySelector("#t1").innerHTML = "t1: " + t1;
    document.querySelector("#t2").innerHTML = "t2: " + t2;
}
function loadFile(input){
    var file = input.files[0];
    var src = URL.createObjectURL(file);
    video = document.getElementById("video");
    video.src=src;
    video.load();
    video.addEventListener("timeupdate", updateTimer);
}
