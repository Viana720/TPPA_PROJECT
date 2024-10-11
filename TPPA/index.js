 
 // Seleciona todos os itens do dropdown
 const dropdownItems = document.querySelectorAll('.dropdown-item');
 const dropdownButton = document.getElementById('dropdownMenuButton');

 // Adiciona um evento de clique para cada item do dropdown
 dropdownItems.forEach(item => {
     item.addEventListener('click', function() {
         // Altera o texto do botão dropdown para o texto da opção selecionada
         dropdownButton.textContent = this.textContent;
     });
 });

 // Define as variáveis antes de criar o gráfico
 let day1 = 26;
 let day2 = 57;
 let day3 = 37;
 let day4 = 68;
 let day5 = 89;
 let day6 = 92;
 let day7 = 52;

 let day1X = 64;
 let day2X = 43;
 let day3X = 57;
 let day4X = 29;
 let day5X = 98;
 let day6X = 38;
 let day7X = 17;

 let erro1 = "Parafusamento";
 let erro2 = "Conector USB";
 let erro3 = "Conexão perdida";
 let erro4 = "Erro de serigrafia";
 let erro5 = "Led trincado";
 let erro6 = "Serial number duplicado";
 let erro7 = "Placa danificada";


 const labels = ['12/08', '13/08', '14/08', '15/08', '16/08', '17/08', '18/08'];
 const labels2 = [ erro1, erro2, erro3, erro4, erro5, erro6, erro7];
 const dataValues = [day1, day2, day3, day4, day5, day6, day7];
 const dataValuesX = [day1X, day2X, day3X, day4X, day5X, day6X, day7X];
 

 const ctx = document.getElementById('g1').getContext('2d');
 const ctx2 = document.getElementById('g2').getContext('2d');


function calcularMedia(dataValues) {
let soma = dataValues.reduce((a, b) => a + b, 0);
return soma / dataValues.length;
}

// Cálculo das médias para os dois gráficos
const mediaFTTOPEX = calcularMedia(dataValues);
const mediaFTTComposto = calcularMedia(dataValuesX);

// Gráfico 1 - FTT OPEX         
new Chart(ctx, {
type: 'bar',
data: { 
 labels: labels,
 datasets: [{
     label: 'FTT OPEX  (Média: ' + mediaFTTOPEX.toFixed(2) + '%)',
     data: dataValues,
     backgroundColor: 'lightgreen',
     borderColor: 'rgba(75, 192, 192, 1)',
     borderWidth: 0
 }]
},
options: {
 scales: {
     y: {
         beginAtZero: true,
         max: 100, // Definir o valor máximo como 100
         ticks: {
             stepSize: 50, // Definir 3 divisões (0, 50, 100)
             callback: function(value) {
                 return value + '%'; // Adicionar símbolo de porcentagem aos valores
             }
         }
     }
 },
 plugins: {
     datalabels: {
         display: true,
         align: 'early',
         anchor: 'early',
         formatter: (value) => {
             return value + '%'; // Exibir valor percentual no topo da barra
         }
     },



 }
},
plugins: [ChartDataLabels] // Ativando o plugin de datalabels
});

// Gráfico 2 - FTT COMPOSTO
new Chart(ctx2, {
type: 'bar',
data: {
 labels: labels,
 datasets: [{
     label: 'FTT COMPOSTO (Média: ' + mediaFTTComposto.toFixed(2) + '%)',
     data: dataValuesX,
     backgroundColor: 'lightblue',
     borderColor: 'rgba(75, 192, 192, 1)',
     borderWidth: 0
 }]
},
options: {
 scales: {
     y: {
         beginAtZero: true,
         max: 100, // Definir o valor máximo como 100
         ticks: {
             stepSize: 50, // Definir 3 divisões (0, 50, 100)
             callback: function(value) {
                 return value + '%'; // Adicionar símbolo de porcentagem aos valores
             }
         }
     }
 }, 
 plugins: {                 
     datalabels: {
         display: true,
         align: 'early',
         anchor: 'early',
         formatter: (value) => {
             return value + '%'; // Exibir valor percentual no topo da barra
         }
     },
     
 }
},
plugins: [ChartDataLabels] // Ativando o plugin de datalabels
});
 // Gráfico 3
 const combinedData = labels2.map((label, index) => {
     return {
         label: label,
         value: dataValuesX[index]
     };
 });

 combinedData.sort((a, b) => b.value - a.value);

 const sortedLabels = combinedData.map(item => item.label);
 const sortedDataValues = combinedData.map(item => item.value);

 // Cálculo do percentual acumulado para o gráfico de Pareto
 const total = sortedDataValues.reduce((acc, value) => acc + value, 0);
 const cumulativePercentages = sortedDataValues.map((value, index, array) => {
     const cumulativeValue = array.slice(0, index + 1).reduce((acc, curr) => acc + curr, 0);
     return (cumulativeValue / total * 100).toFixed(2);
 });

 // Classificação de cores com base nos três maiores valores
 const sortedValues = [...sortedDataValues].sort((a, b) => b - a);
 const topColors = ['darkblue', 'mediumblue', 'blue'];
 const sortedBackgroundColors = sortedDataValues.map(value => {
     const index = sortedValues.indexOf(value);
     return index < 3 ? topColors[index] : 'lightblue';
 });


 const ctx3 = document.getElementById('g3').getContext('2d');
 new Chart(ctx3, {
     type: 'bar',
     data: {
         labels: sortedLabels,
         datasets: [
             {
                 label: 'TOP FALHAS',
                 data: sortedDataValues,
                 backgroundColor: sortedBackgroundColors,
                 borderColor: 'rgba(75, 192, 192, 1)',
                 borderWidth: 0.5,
                 yAxisID: 'y',
                 barPercentage: 1.0,
                 categoryPercentage: 1.0
             },
            
         ]
     },
     options: {
         scales: {
             y: {
                 beginAtZero: true,
                 type: 'linear',
                 position: 'left',
                 title: {
                     display: true,
                     text: 'Quantidade'
                 }
             },
            
         }
     }
 });


//Formulário Action
document.addEventListener('DOMContentLoaded', function () {
const steps = document.querySelectorAll('.form-step');
let currentStep = 0;

function showStep(step) {
 steps.forEach((stepElement, index) => {
     if (index === step) {
         stepElement.classList.add('active');
     } else {
         stepElement.classList.remove('active');
     }
 });
}

document.getElementById('next-1').addEventListener('click', function () {
 currentStep = 1;
 showStep(currentStep);
});

document.getElementById('prev-2').addEventListener('click', function () {
 currentStep = 0;
 showStep(currentStep);
});

document.getElementById('next-2').addEventListener('click', function () {
 currentStep = 2;
 showStep(currentStep);
});

document.getElementById('prev-3').addEventListener('click', function () {
 currentStep = 1;
 showStep(currentStep)
}); 

document.getElementById('submit').addEventListener('click', function () {
 alert('Formulário enviado!');
});

// Iniciar exibindo o primeiro passo
showStep(currentStep); 
});

new DataTable('#example', {
scrollX: true,
scrollY: 200
});


$(document).ready(function() {
$('#example').DataTable({
"paging": false,   // Desativa a paginação
 scrollX: true  // Ativa o scroll horizontal para tabelas largas
});
});
