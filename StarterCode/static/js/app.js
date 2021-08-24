//Use D3 Library to read in samples.json


//Create Horizontal BarChart w/ drp menu
//// use sample_values as barchart values, otu_ids as labels for barchart and otu_labels as hovertext for barchart

//Create bubble chat that displays: Use otu_ids for the x values.
function createchart(dValue){
  d3.json("samples.json").then((data)=>{
    var mysamples = data.samples;
    var resultarray = mysamples.filter( myobjects=> myobjects.id == dValue);
    var myresult = resultarray[0];
    var otu_ids = myresult.otu_ids;
    var otu_labels = myresult.otu_labels;
    var sample_values= myresult.sample_values;

    var mylayout = {
      title: "BellyButton Bubble Chart",
      margin: {t:0},
      hovermode: "closest",
      xaxis: {title: "otu_ids"},
      margin: {t:30}
    };

    var mydata = [
      {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "earth",

        }
      }
    ];

    Plotly.newPlot("bubble",mydata,mylayout);
  });


}

function optionChanged(dValue){
  createchart(dValue);
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
  });
}
initialize();