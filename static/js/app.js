function buildPlot() {
  d3.json("samples.json").then(function (data) {
    console.log(data);
    // Grab values from the data json object to build the plots

    var sampleValues = data.samples[0].sample_values;
    var otuIds = data.samples[0].otu_ids;
    var otulabels = data.samples[0].otu_labels;

    sampleValuesS = sampleValues.slice(0, 10);
    otulabelsS = otulabels.slice(0, 10);
    otuIdsS = otuIds.slice(0, 10).map(otuID => `OTU ${otuID}`)
    console.log(sampleValuesS);
    console.log(otuIdsS);
    console.log(otulabelsS);

    var trace1 = {
      type: "bar",
      orientation: "h",
      text: otulabelsS,
      x: sampleValuesS,
      y: otuIdsS


    };

    Plotly.newPlot("bar", [trace1]);

    var trace2 = {
      type: "scatter",
      y: sampleValues,
      x: otuIds,
      text: ['otulabels'],
      mode: 'markers',
      marker: {
        color: otuIds,
        size: sampleValues
      }
    };

    var data2 = [trace2];

    var layout = {
      title: 'OTU IDs',
      showlegend: false,
      height: 600,
      width: 1000
    };
    Plotly.newPlot('bubble', data2, layout);
  });
}
  buildPlot();
  function init() {

    var selectElm = d3.select("#selDataset");
    d3.json("samples.json").then(function (data) {
      var names = data.names;
      names.forEach((name) => {
        selectElm.append('option').text(name).property('value', name);
      });

      // var firstsample = names[0];

    })
  } init();



  function optionChanged() {
    var selector = d3.select('#selDataset');
    d3.json("samples.json").then(function (data) {
      console.log(data);

      var curvalue = selector.property("value");
      var meta = data.metadata.filter(d => d.id == curvalue);
      var result = d3.select("#sample-metadata");
      result.html("");

      Object.entries(meta[0]).forEach(([key, value]) => {
        result.append('p').text(`${key},${value}`);
      });
      
    })
  }



// Use the first sample from the list to build the initial plots
var firstSample = names[0];
buildPlot(firstSample);
optionChanged(firstSample);



function Changed(newSample) {
// Fetch new data each time a new sample is selected
buildPlot(newSample);
optionChanged(newSample);
}
