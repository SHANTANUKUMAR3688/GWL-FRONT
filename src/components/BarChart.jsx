
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS,
    CategoryScale,
    LinearScale, 
    BarElement,
    Title, 
    Tooltip,
    Legend 
    } from "chart.js";

    ChartJS.register(
        CategoryScale,
        LinearScale, 
        BarElement,
        Title, 
        Tooltip,
        Legend 
    );
function BarChart() {
    const options={
      responsive: true,
    };
    
   const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
  datasets: [{
    label: 'My First dataset',
    data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};
  return (
    <>
    <Bar data={data} options={options} />
    </>
  )
}

export default BarChart