import React, { Component } from "react";
import Chart from "chart.js/auto";
import "../../Chartjs.scss";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { view: [], type: "" };
    this.chart = null;
    this.dynamicColors = this.dynamicColors.bind(this);
  }
  async onChange(event) {
    await fetch("/dashboard?type=" + event.target.value)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ view: res.content, type: event.target.value });
      });
  }

  async componentDidMount() {
    var yValues;
    await fetch("/dashboard/All")
      .then((res) => res.json())
      .then((res) => {
        yValues = res.content;
      });

    var xValues = ["House", "Game", "Pet", "Other"];
    var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9"];

    let ctx = document.getElementById("myChart");
    let all = document.getElementById("All");
    this.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
          {
            label: this.state.type,
            data: this.state.view,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    new Chart(all, {
      type: "pie",
      data: {
        labels: xValues,
        datasets: [
          {
            backgroundColor: barColors,
            data: yValues,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "World Wide Wine Production 2018",
        },
      },
    });
  }
  dynamicColors(numdata) {
    const backgroundcolor = [];
    for (var i = 0; i < numdata; i++) {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      const color = "rgba(" + r + "," + g + "," + b + ", 0.5)";

      backgroundcolor.push(color);
    }
    return backgroundcolor;
  }

  componentDidUpdate() {
    let newcolor = this.dynamicColors(this.state.view.length);
    this.chart.data.labels = this.state.view.map((data, index) => {
      return index;
    });
    this.chart.data.datasets[0].data = this.state.view;
    this.chart.data.datasets[0].label = "DataSet of " + this.state.type;
    this.chart.data.datasets[0].backgroundColor = newcolor;
    this.chart.data.datasets[0].borderColor = newcolor.map((value) => {
      return value.replace(/0.5/, "1");
    });
    this.chart.update();
  }

  render() {
    var namelist = ["Choose", "House", "Game", "Pet", "Other"];
    this.state.type
      ? (namelist = ["House", "Game", "Pet", "Other"])
      : (namelist = ["Choose", "House", "Game", "Pet", "Other"]);
    return (
      <div>
        <div className="boxtitle">
          <img src="dashbord.jpg" id="dashboard" alt="titledb"></img>
          <div className="texttitle">DASHBOARD</div>
        </div>
        <div className="choosedata">
          <label>DATASET OF</label>
          <select onChange={this.onChange.bind(this)}>
            {namelist.map((data) => {
              return <option value={data}>{data}</option>;
            })}
          </select>
        </div>
        <div class="chart-container bettweenchart">
          <canvas id="myChart" width="1" height="1"></canvas>
        </div>
        <div class="chart-container">
          <canvas id="All" width="1" height="1"></canvas>
        </div>
        <div className="subchart">
          <div>Chart no.1 Viewer of bar graphs</div>
          <div>
            Chart no.2 The entire number of viewers is shown using a pie chart
          </div>
        </div>
      </div>
    );
  }
}
