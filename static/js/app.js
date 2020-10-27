  function buildPlot() {
    d3.json("samples.json").then(function(data) {
      console.log(data);
      // Grab values from the data json object to build the plots
      
      var sampleValues = data.samples[0].sample_values;
      var otuIds = data.samples[0].otu_ids;
      var otulabels = data.samples[0].otu_labels;
      
      sampleValuesS = sampleValues.slice(0,10);
      otulabelsS = otulabels.slice(0,10);
      otuIdsS = otuIds.slice(0,10).map(otuID => `OTU ${otuID}`)
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
                
      Plotly.newPlot("bar",[trace1]);

      var trace2 = {
        type: "scatter",
        y: sampleValues,
        x: otuIds,
        text: ['otulabels'],
        mode: 'markers',
        marker:{
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

      var names = data.names;
      var selectElm = d3.select("#selDataset");
      names.forEach((name) => {
        selectElm.append('option').text(name).property('value', name);
      })
    })
    
  }
  buildPlot();
  function optionChanged() {
    d3.json("samples.json").then (function(data){
      console.log(data);
    var selector = d3.select('#selDataset');
    var curvalue = selector.property("value");
    var result = d3.select("#sample-metadata");
    var meta = data.metadata.filter(d => d.id == curvalue);
      meta.html("");
      Object.entries(meta[0]).forEach(([key, value]) => {
        result.append('p').text(`${key},${value}`)
      })
      })}
  optionChanged();
    