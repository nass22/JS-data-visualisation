let bodyContent=document.getElementById('bodyContent');
let parent=document.getElementById('content');
let canvas3=document.createElement('canvas');
canvas3.setAttribute('id','myChart3');
canvas3.setAttribute('width', '400');
canvas3.setAttribute('height', '400');
parent.insertBefore(canvas3,bodyContent);

let xhr = new XMLHttpRequest();

const ctx3 = document.getElementById('myChart3').getContext('2d');
const myChart3 = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Y',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',

            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});

let data;
let data2 = [];
let tabX = [];


function getData() {
    xhr.open("POST", "https://canvasjs.com/services/data/datapoints.php", true);
    xhr.send();
    xhr.onreadystatechange;
}

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let tabX = [];
        let tabY = [];
        data = this.response;
        data2 = JSON.parse(data);
        console.log(data2);
        for (i = 0; i < data2.length; i++) {
            tabX.push(data2[i][0]);
            tabY.push(data2[i][1]);
        }
        myChart3.data.labels = tabX;
        myChart3.data.datasets[0].data = tabY;
        myChart3.update();
    }
}

window.setInterval(getData, 1000);
