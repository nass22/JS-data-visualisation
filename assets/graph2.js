//Initialisation des variables globales
let listTd2 = document.querySelectorAll("#table2 td");
let tabAllData2 = [];
let tabSplice2 = [];
let tabPaysData2 = [];
let tabAnnee2 = [];
let pays2;
let min2;
let max2;
let dataset2 = [];
let dataNumber2 = [];
let objData2;

//Ajout du canvas:
let table2 = document.getElementById('table2');
let divParent2 = document.getElementById('mw-content-text');
let canvas2 = document.createElement('canvas');
canvas2.setAttribute('id', 'myChart2');
canvas2.setAttribute('width', '400');
canvas2.setAttribute('height', '400');
divParent2.insertBefore(canvas2, table2);

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
listTd2.forEach(function (elem) {
    tabAllData2.push(elem.innerHTML);
})


//Division du tableau en tableau par pays
while (tabAllData2.length > 0) {
    for (i = 0; i < tabAllData2.length; i++) {
        tabSplice2 = tabAllData2.splice(0, 3);
        tabPaysData2.push(tabSplice2);
    }
}

//On enlève les pays et on laisse les data dans le tableau
for (i = 0; i < tabPaysData2.length; i++) {
    pays2 = tabPaysData2[i][0];
    tabPaysData2[i].shift();
    let data = tabPaysData2[i];

    //On change le tableau de string en tableau de nbre
    for (j = 0; j < data.length; j++) {
        let tabTemp = parseInt(data[j]);
        dataNumber2.push(tabTemp);
    }

    //Création des objets pour le tableau
    objData2 = {
        label: pays2,
        data: dataNumber2,
        borderColor: getRandomColor,
        backgroundColor: getRandomColor,
    }
    dataset2.push(objData2);
    dataNumber2 = [];
}


//Graphique
const ctx2 = document.getElementById('myChart2').getContext('2d');
let delayed2;
const myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['2007-09', '2010-12'],
        datasets: dataset2,
    },
    options: {
        responsive: true,
        animation: {
            onComplete: () => {
                delayed2 = true;
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed2) {
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
                title: {
                    display: true,
                    text: "Prison population (per 100,000 inhabitants)"
                }
            }
        }
    }
});





