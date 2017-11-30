var drawElement = document.getElementById("draw");
var tabElements = document.querySelectorAll(".maintab > li");
var mainElements = document.querySelectorAll(".main > li");


drawElement.addEventListener('click',function(){
  let editorData = editor.getValue();
  let plotData = JSON.parse(editorData);
  console.log(plotData.data)
  Plotly.newPlot('plotly-div',
    plotData.data,
    plotData.layout || null,
    {editable:true}
  );
  let draw = document.createEvent("HTMLEvents");
  draw.initEvent("click", true, false);
  tabElements[1].dispatchEvent(draw);
},false)

tabElements.forEach(function(value,index,array){
  value.addEventListener("click",function(e){
    e.preventDefault();
    let target = e.target;
    console.log(array)
    array.forEach(function(value2,index2,array2){
      value2.className=null;
    });
    target.className = "select";
    mainElements.forEach(function(value2,index3,array2){
      value2.className=null;
    })
    var p = e.target.parentElement;
    var index = Array.prototype.indexOf.call(p.children, e.target);
    console.log(index)
    mainElements[index].className="select";
  },false);
});



