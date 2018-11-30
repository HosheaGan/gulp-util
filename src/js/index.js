window.onload = function () { 
    var timeElem = document.getElementById('timer');
    var i = 0;
    var timer = setInterval(function () { 
        i++;
        timeElem.innerHTML = "我在读秒哦 "+i;
    },1000)
}