const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota', 'Nedjelja'],
      datasets: [{
        label: '# sati rada Lampice',
        data: [5, 20, 3, 8, 14, 7, 13],
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
