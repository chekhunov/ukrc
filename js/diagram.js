var fullValues = 0;

Chart.defaults.global.tooltips.custom = function(tooltip) {
    // Tooltip Element
    var tooltipEl = document.getElementById('chartjs-tooltip');
    
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        legendItems.forEach((item) =>  {
            item.classList.remove('active');
        });
        return;
    }
    
    legendItems.forEach((item) =>  {
        item.classList.remove('active');
    });
    
    let curentItexElem = tooltip.dataPoints[0].index;
    
    legendItems[curentItexElem].classList.add('active');
 
    function getBody(bodyItem) {
        return bodyItem.lines;
    }
    
    
    // Set Text
    if (tooltip.body) {
        var bodyLines = tooltip.body.map(getBody);
        var innerHtml = '';
 
        bodyLines.forEach(function(body, i) {
            body = body[0].replace(/[^-0-9]/gim,'').replace("-","").replace("-","");
            innerHtml +=  body ;
        });
 
        var tableRoot = tooltipEl.querySelector('.manufacturing-hover-active');
        var valuePct = parseFloat((innerHtml / fullValues) * 100).toFixed(1);
        tableRoot.innerHTML = valuePct;
    }
 
   
    let canvasBox = document.querySelector('#myChart').getBoundingClientRect();
    var position = this._chart.canvas.getBoundingClientRect();
    
    var positionY = this._chart.canvas.offsetTop;
    var positionX = this._chart.canvas.offsetLeft;
 
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
   
    tooltipEl.style.left = positionX + tooltip.caretX - 20  + 'px';
    tooltipEl.style.top = positionY +  tooltip.caretY - 20  + 'px';
};
 
var ctx = document.getElementById('myChart').getContext('2d');
let dataValue = [100, 190, 30, 50, 21, 30, 100,500, 109, 30, 50, 20, 30, 10];
let dataName = ['Оргтехника, телекоммуникации', 'Полиграфия', 'Бытовая электротехника', 'Транспортные средства и услуги', 'Туризм, спорт, развлечения', 'Авто-, мото-', 'Промышленность, производство','Оргтехника, телекоммуникации', 'Полиграфия', 'Бытовая электротехника', 'Транспортные средства и услуги', 'Туризм, спорт, развлечения', 'Авто-, мото-', 'Промышленность, производство'];

dataValue.forEach((item) => {
    fullValues += item;
});
 
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: dataName,
        datasets: [{
            data: dataValue,
            backgroundColor: '#F0F0FA',
            borderColor: "#FAFAFF",
            borderWidth: 1,
            hoverBackgroundColor: '#5C5DF7',
            hoverBorderColor: '#5C5DF7',
        }]
    },
    options: {
        legend: {
            display: false,
        },
        cutoutPercentage: 20,
        tooltips: {
            enabled: false,
        },
        animation: {
            duration: 0
        },
        hover: {
            animationDuration: 0 
        }
    }
});
 
var myLegendContainer = document.getElementById("myChartLegend");
myLegendContainer.innerHTML = myChart.generateLegend();
var legendItems = myLegendContainer.getElementsByTagName('li');

myLegendContainer.querySelector("ul").classList.add('legent__list');

for (var i = 0; i < legendItems.length; i++) {
  legendItems[i].classList.add('legent__item');
  legendItems[i].querySelector('span').classList.add('icon-drop');
  legendItems[i].setAttribute('data-index', i);
}

myChart.openToolTip = function(index) {
    var mouseMoveEvent, meta, point, rectangle, value;
 
    meta = this.getDatasetMeta(0);
    rectangle = this.canvas.getBoundingClientRect();
    point = meta.data[index].getCenterPoint();
 
    mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: rectangle.left + point.x,
      clientY: rectangle.top + point.y
    });
 
    this.canvas.dispatchEvent(mouseMoveEvent);
 
};
 
myChart.closeToolTip = function() {
    var mouseOutEvent = new MouseEvent('mouseout');
    return this.canvas.dispatchEvent(mouseOutEvent);
};
 
 
var legendItems = document.querySelectorAll(".legent__item");
 
legendItems.forEach(
  (value, index) => {
    value.addEventListener("mouseover", function() {
      myChart.closeToolTip();
      myChart.openToolTip(index);
    });
    value.addEventListener("mouseout", function() {
      myChart.closeToolTip();
    });
  }
);

let secondContainerItems = document.createElement('ul');
secondContainerItems.classList.add('legent__list');
myLegendContainer.append(secondContainerItems);
let halfItems = Math.floor((legendItems.length - 1) / 2);

legendItems.forEach(function(item,index){
    
    if(index > halfItems) {
        secondContainerItems.append(item);
    }
});

// Create tablet version 

var data = [
  {
   "name": "Энергетические и сырьевые ресурсы", 
    "value": 180
  }, {
   "name": "Металлургия и металлообработка", 
    "value": 100
  }, {
   "name": "Машиностроение, оборудование",  
    "value": 135
  }, {
   "name": "Электрооборудование и устройства", 
    "value": 230
  }, {
   "name": "Пищевая промышленность", 
    "value": 90
  }, {
   "name": "Сельское хозяйство", 
    "value": 180
  }
];


// Setup global variables
var svg = document.querySelectorAll('.pie-chart'),
    list = document.getElementById('pie-values'),
    totalValue = 0,
    radius = 12,
    circleLength = Math.PI * (radius * 2), // Circumference = PI * Diameter
    spaceLeft = circleLength;

// Get total value of all data.
for (var i = 0; i < data.length; i++) {
  totalValue += data[i].value;
}

let statisticsItem = document.querySelectorAll('.js-statistic');

statisticsItem.forEach((item,index) => {
    let persent = item.querySelector('.js-number');
    let name = item.querySelector('.js-name');
    
    valuePct = parseFloat((data[index].value / totalValue) * 100).toFixed(1);
    
    name.innerHTML = data[index].name;
    persent.innerHTML = valuePct + "%";
    
});

// Loop trough data to create pie
svg.forEach(function(item,index){
    var spaceLeft = circleLength;
    item.setAttribute("data-name", data[index].name);
    for (var c = 0; c < data.length; c++) {
    
        // Create circle
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        // Set attributes (self explanatory)
        circle.setAttribute("class", "pie-chart-value");
        circle.setAttribute("cx", 20);
        circle.setAttribute("cy", 20);
        circle.setAttribute("r", radius);
        circle.setAttribute("data-name", data[c].name);

        // Set dash on circle
        circle.style.strokeDasharray = (spaceLeft) + " " + circleLength;

        // Append circle to svg.

        item.appendChild(circle);

        // Subtract current value from spaceLeft
        spaceLeft -= (data[c].value / totalValue) * circleLength;
    }
    let getAttribute = item.getAttribute('data-name');
    document.querySelector(`.pie-chart[data-name="${getAttribute}"] .pie-chart-value[data-name="${getAttribute}"]`).classList.add('active');
});
