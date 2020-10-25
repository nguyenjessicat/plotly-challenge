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
        width: 600
      };
      
      Plotly.newPlot('bubble', data2, layout);


    // Use D3 to create an event handler
    // Call selectSample() when a change takes place to the DOM
      d3.selectAll("#selDataset").on("change", selectSample);
        

      // This function is called when a dropdown menu item is selected
      function selectSample() {
        var selection = data.metadata[0].filter(sampleId => sampleId.id )
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
        dropdownMenu.append('option').attr(dataset, selection)
        
          
          d3.select('#sample-metadata').html("")
            .append(data.metadata)
      
      
      }
  
    });
  }
  
  buildPlot();
  
 


  
  function meta(){
    
  }