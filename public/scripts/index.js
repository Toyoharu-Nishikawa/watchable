var drawElement = document.getElementById("draw");
var tabElements = document.querySelectorAll(".maintab > li");
var mainElements = document.querySelectorAll(".main > li");

var req = new XMLHttpRequest();

var editor = ace.edit('editor')
editor.setTheme("ace/theme/monokai")
editor.getSession().setOptions({
  mode: "ace/mode/json",
  tabSize: 2,
  useSoftTabs: true
});
//editor.setKeyboardHandler("ace/keyboard/vim");
editor.setOptions({
  fontSize: "13pt"
});
editor.$blockScrolling = Infinity; 
editor.setValue( window.localStorage.getItem("remember"));

var control = {
  pushButton: function(){
      let self = this;
      document.getElementById('button').addEventListener('click',self.send,false);
  },
  send: function(jsonText){
    req.open("POST", "data_registry",true);
    req.addEventListener('load',function(e){
      console.log("save data successfully");
      document.removeEventListener('load',arguments.callee,false)
    },false);
    req.setRequestHeader("content-type","application/json");
    console.log(jsonText);
    req.responseType = "json";
    req.send(jsonText);
    return this
  },
}


drawElement.addEventListener('click',function(){
  let editorData = editor.getValue();
  let plotData = JSON.parse(editorData);
  window.localStorage.setItem("remember",editorData);
  control.send(editorData);
  console.log(plotData.data)
  Plotly.newPlot('plotly-div',
    plotData.data,
    plotData.layout,
    {
      editable: true,
      showLink: false,
      displaylogo: false,
      modeBarButtonsToRemove: ['sendDataToCloud']
    }
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
    
    //get index of clicked element
    var index = Array.prototype.indexOf.call(p.children, e.target);
    console.log(index)
    mainElements[index].className="select";
  },false);
});



