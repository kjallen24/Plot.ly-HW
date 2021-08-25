//Use D3 Library to read in samples.json

function createchart(dValue){ // function to create charts
  d3.json("samples.json").then((data)=>{
    var mysamples = data.samples;
    var resultarray = mysamples.filter( myobjects=> myobjects.id == dValue);
    var myresult = resultarray[0];
    var otu_ids = myresult.otu_ids;
    var otu_labels = myresult.otu_labels;
    var sample_values= myresult.sample_values;
    
    var bargraph = { //bargraph set up
      x: sample_values,
      y: otu_ids.value,
      type: "bar"
    };

    var bardata = [bargraph];

    var barlayout = {
        title: "Sample Value Chart",
        margin: {t:0},
        hovermode: "closest",
        xaxis: { title: "Sample Values"},
        yaxis: { title: "OTU IDs"},
        margin: {t:30}
    };

    var bubblelayout = {//bubble graph set up
      title: "BellyButton Bubble Chart",
      margin: {t:20},
      hovermode: otu_labels,
      xaxis: {title: "OTU IDs"},
      yaxis: {title: "Sample Values"},
      margin: {t:50}
    };

    var bubbledata = [
      {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "earth",
          hovertext: otu_labels,

        }
      }
    ];
    Plotly.newPlot("bar",bardata,barlayout);//display bar graph
    Plotly.newPlot("bubble",bubbledata,bubblelayout);
  });
}

function createMetadata(dValue){
  d3.json("samples.json").then((data)=>{
    var mymetadata = data.metadata;
    var resultarray = mymetadata.filter( myobjects=> myobjects.id == dValue);
    var myresults = resultarray[0];
    var mysmallwindow = d3.select("#sample-metadata");
    mysmallwindow.html("");

    Object.entries(myresults).forEach(([k,v])=>{
      mysmallwindow.append("h6").text(`${k}:${v}`);
    });
  });
}

function optionChanged(dValue){
  createchart(dValue);
  createMetadata(dValue);
}


function initialize(){
  var celldropdown = d3.select("#selDataset");
  d3.json("samples.json").then((data)=>{

    var samplesnames = data.names;
    samplesnames.forEach((sample)=>{
      celldropdown.append("option").text(sample).property("value",sample);
    });
      
    var sample1 = samplesnames[0];
    createchart(sample1);

    createMetadata(sample1);
  });
}
initialize();