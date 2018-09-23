function visualizeTree(treeData) {
    // setup svg
    var margin = { top: 80, bottom: 80 },
        width = 900,
        height = 900;
    
    var xOffset = 0, yOffset = margin.top / 2;

    var svg = d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height);
    svg.append("g")
       .classed("nodes", true)
       // .attr("viewBox", "0 0 600 350")
       .attr("transform", "translate(0," + yOffset + ")");

    var txtXOffset = 10 + xOffset;
    var txtYOffset = 10 + yOffset;
    svg.append("g")
       .classed("node_text", true)
       .attr("transform", "translate(" + txtXOffset + "," + txtYOffset + ")");

    svg.append("g")
       .classed("links", true)
       // links need to have the same translation as nodes
       .attr("transform", "translate(0," + yOffset + ")");
                
    var treeLayout = d3.tree().size([width, height - margin.top - margin.bottom]);

    var root = d3.hierarchy(treeData /* use the default children accessor*/);

    treeLayout(root); // write x and y values on each node of root

    // Filter dummy nodes. They are used to calculate tree layout but they shouldn't
    // be shown in the final tree
    var realNodes = root.descendants().filter(function(d) {
        /*console.log(d);*/
        return d.data.name != "dummy";
    });

    // Nodes
    svg.select("g.nodes")
       .selectAll("circle.node")
       .data(realNodes)
       .enter()
         .append("circle")
         .classed("node", true)
         .attr("cx", function(d) { /*console.log("cx = " + d.x);*/ return d.x; })
         .attr("cy", function(d) { /*console.log("cy = " + d.y);*/ return d.y; })
         .attr("r", 10);

    // Texts
    svg.select("g.node_text")
       .selectAll("text.node")
       .data(realNodes)
       .enter()
         .append("text")
         .classed("node", true)
         .attr("x", function(d) { return d.x; })
         .attr("y", function(d) { return d.y; })
         .text(function(d) {
             return d.data.name; });

    var realLinks = root.links().filter(function(d) {
        /*console.log(d);*/
        return (d.source.data.name != "dummy" &&
                d.target.data.name != "dummy");
    });
    // Links
    svg.select("g.links")
       .selectAll("line.link")
       .data(realLinks)
       .enter()
         .append("line")
         .classed("link", true)
         .attr("x1", function(d) { return d.source.x; })
         .attr("y1", function(d) { return d.source.y; })
         .attr("x2", function(d) { return d.target.x; })
         .attr("y2", function(d) { return d.target.y; })
}