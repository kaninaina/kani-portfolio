// let text=document.querySelector(".main-left .logo p");
// text.innerHTML=text.innerText.split("").map((char,i)=>{
//     return `<span style="transform:rotate(${i*11}deg)">${char}</span>`
// }).join("");



let nav=document.querySelectorAll("nav > ul > li");
let page=document.querySelector(".main-right");

nav.forEach((el)=>{
    el.addEventListener("click",navActive)
})

function navActive(event){
    let navParent=document.querySelector("nav > ul");
    let navChildrens=[...navParent.children];
    navChildrens.forEach((el)=>{
        el.classList.remove("active")
    });
    event.target.closest("li").classList.add("active");
    pageLoading(event.target.closest("li"));
}
document.querySelector(".aboutme").addEventListener("click",(e)=>{
    let element=e.target.closest(".aboutme");
    pageLoading(element);
    let navParent=document.querySelector("nav > ul");
    let navChildrens=[...navParent.children];
  navChildrens.forEach((el)=>{
           el.classList.remove("active");
    })
   let active=navChildrens.find((el)=>{
    return el.dataset.target==element.dataset.target
   })
   active.classList.add("active")

})
 function pageLoading(element){
    let c=true;
    if(c==false){
        return ""
    }
    let target=element.dataset.target;
   let pageChildrens=[...document.querySelectorAll(".page")];
   let previuousActive=pageChildrens.find((el)=>{
    let a=el.classList.contains("active");
    return a;
   });
   pageChildrens.forEach((el)=>{
    el.classList.remove("active");
    el.style.zIndex=1;
   })
   let active=pageChildrens.find((el)=>{
    let value=el.dataset.value;
    return value==target;
   });
   active.classList.add("active");
   if(previuousActive==active){
    return ""
   }
   active.style.zIndex=2;
   active.style.display="block";
  setTimeout(()=>{
    previuousActive.style.display="none";
c=true;
  },1000);

 }



let skinColorSelectionParent=document.querySelector(".color-type");
skinColorSelectionParent.addEventListener("click",skinColorTransform);

function skinColorTransform(e){
    let element=e.target.closest("p");
    let color=getComputedStyle(element).backgroundColor;
    let skinVariable=document.querySelector(":root");
  skinVariable.style.setProperty("--themecolor",color)
}

let themeAccelerator=document.querySelector(".setting-icon");
themeAccelerator.addEventListener("click",(e)=>{
let element =e.target.closest(".setting");
element.classList.toggle("active")
});

// let modeselection=document.querySelector(".theme");
// modeselection.addEventListener("click",(e)=>{
// let element=e.target.closest(".theme");
// element.classList.toggle("active");
// let active=e.target.id;
// let skinVariable=document.querySelector(":root");

// if(active=="moon"){
//   skinVariable.style.setProperty("--bmainbackround","rgb(22,21,22)");
//   skinVariable.style.setProperty("--divbackground","rgb(65, 65, 65)");
//   skinVariable.style.setProperty("--foregroundcolor","white");
// }
// else{
//     skinVariable.style.setProperty("--bmainbackround","white");
//     skinVariable.style.setProperty("--divbackground","white");
//     skinVariable.style.setProperty("--foregroundcolor","black");
// }
// })

let handBar=document.querySelector(".hand-bar");
let mainLeft=document.querySelector(".main-left");
handBar.addEventListener("click",(e)=>{
    let element=e.target.closest(".hand-bar");
    element.classList.toggle("active");
    mainLeft.classList.toggle("active")
})
mainLeft.addEventListener("click",()=>{
    mainLeft.classList.toggle("active");
    handBar.classList.toggle("active")
});



document.querySelector("#submit").addEventListener("click",(e)=>{
 e.preventDefault();
 document.querySelector("#submit").classList.add("active")
 let form=document.forms.Enquiry;
 let data=[...new FormData(form)].map((el)=>{
    let [name,dta]=el;
    return {name:name,data:dta}
 })
let datas={};
for(let i of data){
datas[i.name]=i.data;
}
sendEmail(datas)
})
emailjs.init("znFD0eRGUbBh6_NzV");
function sendEmail(data){
    var templateParams = data
    emailjs.send('service_8uffnpf', 'template_40ugvfy', templateParams)
        .then(function(response) {
           if(response.status==200){
            document.querySelector("#submit").classList.remove("active")
            alert("Successfully Form Submitted");
document.querySelector("form").children.forEach((el)=>{
    el.querySelector("input").value=""
})
           }
        }, function(error) {
           console.log('FAILED...', error);
        });
}