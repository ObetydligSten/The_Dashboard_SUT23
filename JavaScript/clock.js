
function clockUpdate(){
    var now = new Date(); 
    var hours = now.getHours();
    var minutes = now.getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var timeString = hours + ":" + minutes;

    document.getElementById('time').textContent = timeString;
    document.getElementById('date').textContent = dateFormat();
}

function dateFormat(){
    var now = new Date();

    var months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 
                    'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
    var monthIndex = now.getMonth();
    var day = now.getDate();
    var year = now.getFullYear();

    var formattedDate = day + ' ' + months[monthIndex] + ' ' + year;

    return formattedDate;
}

setInterval(clockUpdate, 1000);

clockUpdate();
