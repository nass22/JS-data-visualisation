//Initialisation des variables globales
let tabAllData = [];
let tabSplice = [];
let tabPaysData = [];
let listTd = document.querySelectorAll("#table1 td");
let tabAnnee = [];
let pays;
let min;
let max;
let dataset = [];
let dataNumber = [];
let objData;

//Ajout du canvas
let firstTable = document.getElementById('table1');
let divParent = document.getElementById('mw-content-text');
let canvas = document.createElement('canvas');
canvas.setAttribute('id', 'myChart');
canvas.setAttribute('width', '400');
canvas.setAttribute('height', '400');
divParent.insertBefore(canvas, firstTable);


//Function couleurs aléatoires
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Récup data tous les pays
listTd.forEach(function (elem) {
    tabAllData.push(elem.innerHTML);
})

//Division du tableau en tableau par pays
while (tabAllData.length > 0) {
    for (i = 0; i < tabAllData.length; i++) {
        tabSplice = tabAllData.splice(0, 12);
        tabPaysData.push(tabSplice);
    }
}

//On enlève les pays et on laisse les data dans le tableau
for (i = 0; i < tabPaysData.length; i++) {
    pays = tabPaysData[i][0];
    tabPaysData[i].shift();
    let data = tabPaysData[i];

    //On change le tableau de string en tableau de nbre
    for (j = 0; j < data.length; j++) {
        let tabTemp = parseFloat(data[j].replace(",", "."));
        dataNumber.push(tabTemp);
    }

    //On enlève les données inexistantes(:)
    for (k = 0; k < dataNumber.length; k++) {
        if (isNaN(dataNumber[k])) {
            dataNumber.splice(k, k);
        }

    }

    let min = Math.min(...dataNumber);
    let max = Math.max(...dataNumber);

    //Création des objets pour le tableau
    objData = {
        label: pays,
        data: dataNumber,
        borderColor: getRandomColor,
        backgroundColor: getRandomColor,
    }
    dataset.push(objData);
    dataNumber = [];
}


//Graphique
const ctx = document.getElementById('myChart').getContext('2d');
let delayed;
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'],
        datasets: dataset,
    },
    options: {
        responsive: true,
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: "Years"
                }
            },
            y: {
                display: true,
                type: 'logarithmic',
                title: {
                    display: true,
                    text: "Crimes (in thousands)"
                }
            }
        }
    }
});
