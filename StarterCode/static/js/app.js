//Use D3 Library to read in samples.json


//Create Horizontal BarChart w/ drp menu
//// use sample_values as barchart values, otu_ids as labels for barchart and otu_labels as hovertext for barchart

//Create bubble chat that displays: Use otu_ids for the x values.
function createchart(dValue){
  d3.json("samples.json").then((data)=>{
    var mysamples = data.samples;
    var resultarray = mysamples.filter( myobjects=> myobjects.id == dValue);
    alert(resultarray);
    console.log(resultarray);
  });


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