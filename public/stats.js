const barCtx = document.getElementById("barChart");
const doughnutCtx = document.getElementById("doughnutChart");
const radarCtx = document.getElementById("radarChart");

new Chart(barCtx, {
  type: "bar",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Total time listeing",
        data: [12, 45, 67, 43, 89, 34, 67],
        borderWidth: 1,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
        barPercentage: 1,
        borderRadius: {
          topLeft: 5,
          topRight: 5,
        },
      },
    ],
  },
  options: {
    scales: {
      y: {
        title: {
          display: true,
          text: "Minutes Listened",
        },
        display: true,
        beginAtZero: true,
        max: 100,
      },
    },
  },
});

new Chart(doughnutCtx, {
  type: "doughnut",
  data: {
    labels: ["Rap", "Pop", "Rock", "Metal", "Indie"],
    datasets: [
      {
        label: "No. of songs",
        data: [300, 500, 100, 50, 250],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(99, 205, 86, 0.2)",
          "rgba(99, 50, 188, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(99, 205, 86)",
          "rgb(99, 50, 188)",
        ],
      },
    ],
  },
});

new Chart(radarCtx, {
  type: "radar",
  data: {
    labels: [
      "Dance",
      "Romance",
      "Chill",
      "Productive",
      "Sleeping",
      "Exercise",
      "Chores",
    ],
    datasets: [
      {
        label: "January",
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Fabruary",
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  },
  options: {
    elements: {
      line: {
        borderWidth: 1,
      },
    },
  },
});
