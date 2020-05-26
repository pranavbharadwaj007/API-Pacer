console.log("hello world");
//initially we will hide
var d=new Date();
let foot=document.getElementById('foot');
let footercon=`<small>&copy; Copyright ${d.getFullYear()}, Coding Thor</small>`;
foot.innerHTML=footercon;
let addbtncnt=0;
function getelestr(e){
let div=document.createElement('div');
div.innerHTML=e;
return div.firstElementChild;
}

let parametersbox=document.getElementById('parameterbox');
parametersbox.style.display='none';

let paramsradio=document.getElementById('paramsradio');
paramsradio.addEventListener('click',()=>{
    document.getElementById('requestjsonbox').style.display='none';
    document.getElementById('parameterbox').style.display='block';
})

let jsonradio=document.getElementById('jsonradio');
jsonradio.addEventListener('click',()=>{
    document.getElementById('requestjsonbox').style.display='block';
    document.getElementById('parameterbox').style.display='none';
    
})

//if we click in + button add more
let addbtn=document.getElementById('addbtn');
addbtn.addEventListener('click',()=>{
    let params=document.getElementById('parms');
    let str=`<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">
      <h5>Parameter ${addbtncnt+2}</h5>
    </label>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterkey${addbtncnt+2}" placeholder="Enter parameter ${addbtncnt+2} key">
    </div>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parametervalue${addbtncnt+2}" placeholder="Enter Parameter ${addbtncnt+2} value">
    </div>
    <button  class="btn btn-success deleteparam">-</button>
  </div>`;
  let paramele=getelestr(str);
  params.appendChild(paramele);
  //delete
  let deleteparam=document.getElementsByClassName('deleteparam');
  for(item of deleteparam){
      item.addEventListener('click',(e)=>{
     
          e.target.parentElement.remove();
      })
  }
  console.log(paramele);
  addbtncnt++;
})

let submit=document.getElementById('submit');
submit.addEventListener('click',()=>{
  document.getElementById('responserPrism').innerHTML = "Please wait.. Fetching response...";
    let url=document.getElementById('url').value;
    let requestType=document.querySelector("input[name='Request']:checked").value;
    let contentType=document.querySelector("input[name='Req']:checked").value;
   
    if(contentType=='params'){
        data={};
        for(i=0;i<addbtncnt+1;i++){
          if(document.getElementById('parameterkey'+(i+1))!=undefined){

            let key=document.getElementById('parameterkey'+(i+1)).value;
            let value=document.getElementById('parametervalue'+(i+1)).value;
            data[key]=value;
          }
          
            
        }
        data=JSON.stringify(data);
    }
    else{
      data=document.getElementById('responserPrism').innerHTML;
    }
    console.log('url=,',url);
    console.log('url req=,',requestType);
    console.log('url con=,',contentType);
    console.log('data=',data);
    if(requestType=='GET'){
      fetch(url,{
         method:'GET', 
      })
      .then(response=>response.text())
      .then((text)=>{
        document.getElementById('responserPrism').innerHTML=text;
        Prism.highlightAll();
      });
    }
    else{
      fetch(url,{
        method:'POST',
        body:data,
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response=>response.text())
      .then((text)=>{
        document.getElementById('responserPrism').innerHTML=text;
        Prism.highlightAll();
      });

    }



})