const ctx = document.getElementById('myChart');

async function getData(){ 
                        const response = await fetch("https://lampicabackendapi.azurewebsites.net/data");
                        const data = await response.json();
                        console.log(data);
                   }
                   getData();

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota', 'Nedjelja'],
      datasets: [{
        label: '# sati rada Lampice',
        data: [data.Monday, data.Tuesday, data.Wednedsay, data.Thursday, data.Friday, data.Saturday, data.Sunday],
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 4,
        tension: 0.1,
        
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
