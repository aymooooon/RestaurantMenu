let row= document.querySelector('.row');
let cont=document.querySelector('.cont');
let forma=document.querySelector('.forma');
let body=document.body;
let rr=document.querySelector('.gtt')
let result=[];
let userEmail;
let userName
let contactUs=document.getElementById('contactUs')


$('.selecto').click(function(){
    $('.leftNav').toggle(500,function(){
        $('.search').slideToggle(500,function(){
            $('.categories').slideToggle(200,function(){
                $('.area').slideToggle(200,function(){
                    $('.ingred').slideToggle(200,function(){
                        $('.contact').slideToggle(500)
                    })
                })
            })
        })
    });
    

})



async function getDataById(id){
    row.innerHTML="";
    let x=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let response=await x.json();
    console.log(response);
    row.innerHTML+=`
    <div class="row">
    <div class="col-lg-6">
        <img class="w-75" src="${response.meals[0].strMealThumb}" alt="">


    </div>
    <div class="col-lg-6 text-white">
        <h2>instructions</h2>
        <p>${response.meals[0].strInstructions}</p>
        <div class="d-flex justify-content-start">
            <p class="px-1 fw-bold">Area:</p>
            <p>${response.meals[0].strArea}</p>
        </div>
        <div class="d-flex justify-content-start">
            <p class="px-1 fw-bold">Category:</p>
            <p>${response.meals[0].strCategory}</p>
        </div>
        <h2>Recipes:</h2>
        <div class="d-flex flex-wrap mb-4 ">
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient1?response.meals[0].strIngredient1:" "}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient2?response.meals[0].strIngredient2:" "}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient3?response.meals[0].strIngredient3:" "}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient4?response.meals[0].strIngredient4:" "}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient5?response.meals[0].strIngredient5:" "}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient6?response.meals[0].strIngredient6:" "}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient7?response.meals[0].strIngredient7:" "}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient8?response.meals[0].strIngredient8:" "}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient9?response.meals[0].strIngredient9:" "}</div>
       
            

        </div>
        <h2>Tags</h2>
        <div class="d-flex flex-wrap mb-4">
            <div class="tagBg p-2  m-2 rounded">${response.meals[0].strTags?response.meals[0].strTags:" "}</div>



        </div>
        <div>
            <div class="btn bg-success text-white"><a href="${response.meals[0].strSource}">Source</a></div>
            <div class="btn bg-danger"><a href="${response.meals[0].strYoutube}">youtube</a></div>
        </div>
        

        
    </div>

</div>
    
    `




    



}


// async function category(){
//    forma.innerHTML=" "
//     let meals= await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
//    let response= await meals.json();
//     result=response.categories;
//     console.log(result);
//     displayData();
   

    
    
// }
categories()


async function search(){
    
    forma.innerHTML=`
    <input id=inp1 type="text" class="form form-control me-3 bg-black text-white names"  placeholder="Search By Name">
    <input id=inp2   maxlength="1"  type="text" class="form form-control bg-black text-white letters" placeholder="Search By First Letter..." maxlength="1" >
    `
    row.innerHTML='';
    $('#inp1').keyup(function(){
        console.log($('#inp1').val());
        filterSearch($('#inp1').val());
    })
   $('#inp2').keyup(function(){
    filterSearch($('#inp2').val());

   })
}

 async function filterSearch(id){ 

    let x=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`)

    let response=await x.json();
    result=response.meals;
    console.log(result);
    
   
row.innerHTML=" "

result?result.map((item)=>{

    return     row.innerHTML+=` <div class="col-lg-3 col-md-3 col-sm-12 position-relative">
    <div onclick=' getDataById(${item.idMeal})'>
               
       <div class="layer fs-2 ">
       <div>
      <div         onclick="getDataById( ${item.idMeal})" > ${ item.strMeal}</div>
       </div>
       
   </div>


       <img class="w-100" src="${item.strMealThumb} " alt="">
   

 </div>
</div>

    `
}):row.innerHTML=`<div > <h2 class=" text-white">NO Result found </h2> </div>`
    
    }

  
//  search()

 async function categories(){
     forma.innerHTML=" "
    row.innerHTML=""
    let x= await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let response= await x.json();
    console.log(response.categories);
    result=response.categories;

   result.map((item) => {
    return    row.innerHTML+=`
       
    <div class=" col-lg-3 col-md-3 col-sm-12 position-relative">
     <div onclick="filterCateg('${item.strCategory}')">
                
        <div class="layer fs-2 px-3"><div>${item.strCategory}
        </div>
        
    </div>


        <img class="w-100" src="${item.strCategoryThumb}
        " alt="">
</div>
</div>

    
    `
   });





 }

 
async function filterCateg(cata){
   forma.innerHTML=" " 
row.innerHTML=""
    let x= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cata}`)
    let response=await x.json();
    result=response.meals;
    console.log(result);
result.map((item)=>{


return    row.innerHTML+=`
<div class=" col-lg-3 col-md-3 col-sm-12 position-relative">

<div onclick=' getDataById(${item.idMeal})'>
<div class="layer fs-2 px-3"><div>${item.strMeal}
</div>

</div>


<img class="w-100" src="${item.strMealThumb}
" alt="">
</div>
</div>



`

})





}

async function area(){
    forma.innerHTML=""
    row.innerHTML="";
let x =await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
let response= await x.json()
result=response.meals;
console.log(result);
result.map((item) => {
    return     row.innerHTML+=`
    <div class="col-lg-3 col-sm-12 col-md-3    position-relative">


   
    <div class="" onclick="filterByArea('${item.strArea}')">

    <div  class=" text-decoration-none text-white"> <i class="icon build  fa-solid fa-city"></i> </div>
  <div class='fs-3 text-white'>
  <div  class=" text-decoration-none text-white">
   ${item.strArea} </div>
    </div>

</div>

    
    `
});



}

async function filterByArea(id){
    row.innerHTML="";
    let x=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`);
    let response=await x.json();
    result=response.meals;
result.map((item)=>{
    return        row.innerHTML+=`
    <div class="col-lg-3   col-sm-12 col-md-3  position-relative">
    <div onclick=' getDataById(${item.idMeal})'>
               
       <div class="layer fs-2 px-3"><div>${item.strMeal}
       </div>
       
   </div>


       <img class="w-100" src="${item.strMealThumb}
       " alt="">
</div>
</div>


    
    `

})




}

async function ingred(){
    forma.innerHTML=" "
    row.innerHTML='';
    let x=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let response=await x.json();
    result=response.meals;
    console.log(result);
result.slice(0,20).map((item)=>{
return          row.innerHTML+=`
<div class="col-lg-3 position-relative mb-5 text-center">
<div onclick="filterIngred('${item.strIngredient}')">

<div><i class="iconingred fs-1 fa-solid fa-bowl-food"></i></div>
<div class='fs-2 text-white'>${item.strIngredient}</div>
<div class='testingred text-white'>${item.strDescription}</div>
</div>
</div>




`


})




}

async function filterIngred(id){
    forma.innerHTML=" "
    row.innerHTML='';
    let x=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`);
    let response= await x.json();
    result=response.meals;
result.map((item)=>{


    return        row.innerHTML+=`
    <div class="col-lg-3 col-md-3 col-sm-12 position-relative">
    <div onclick=' getDataById(${item.idMeal})'>
               
       <div class="layer fs-2 px-3"><div>${item.strMeal}
       </div>
       
   </div>


       <img class="w-100" src="${item.strMealThumb}
       " alt="">
</div>
</div>
    
    `
})

 
   

}


function contactus(){
  
forma.innerHTML=" "
    row.innerHTML= `                   
         <div class="col-lg-6">

    <div class="form-group">
        <input class="form-control shadow   is-valid " required onkeyup="" id="name" placeholder="Enter Your Name">
        <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
            Special Characters and Numbers not allowed
        </div>
    </div>
    
        <div class="form-group">
            <input class="form-control shadow  is-valid " onkeyup="" id="email" placeholder="Enter Your email">
            <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
            enter valid email
            </div>
                    <div class="form-group">
                        <input class="form-control shadow  is-valid " onkeyup="" id="phone" placeholder="phone">
                        <div class="alert mt-1 alert-danger d-none" id="phonealert" role="alert">
                        enter valid phone
                        </div>
                 <div class="col-lg-6">
                    
                 </div>

<button type="submit" disabled id="submitBtn" class="btn btn-outline-danger mt-5">Submit</button>
</div>

</section>
</div> 


</div>
<div class=" col-lg-6" >
<div class="form-group">
<input class="form-control shadow  is-valid " onkeyup="" id="age" placeholder="age">
<div class="alert mt-1 alert-danger d-none" id="agealert" role="alert">
enter valid number
</div>
</div>

<div class="form-group">
<input class="form-control shadow  is-valid " onkeyup="" id="password" placeholder="pass">
<div class="alert mt-1 alert-danger d-none" id="passwordalert" role="alert">
enter valid password
</div>
</div>


<div class="form-group">
<input class="form-control shadow  is-valid " onkeyup="" id="rePassword" placeholder="repass">
<div class="alert mt-1 alert-danger d-none" id="repasswordalert" role="alert">
enter valid password
</div>

</div>
</div>  `



    
}

contactUs.addEventListener('click',function(){
contactus();
let userEmail = document.getElementById("email");
let userName = document.getElementById("name");
let userPhone = document.getElementById("phone"); 
let userAge = document.getElementById("age");
let userPassword = document.getElementById("password");
let userRePassword = document.getElementById("rePassword");
let userNameAlert = document.getElementById("namealert");
let userEmailAlert = document.getElementById("emailalert");
let userPhoneAlert = document.getElementById("phonealert");
let userAgeAlert = document.getElementById("agealert");
let userpasswordAlert = document.getElementById("passwordalert");
let userRepasswordAlert = document.getElementById("repasswordalert");
userName,userEmail,userPhone,userAge,userPassword,userRePassword.addEventListener('keyup',function(){
    validation();
})



    function userNameValid() {
     let usernamevalid =   /^[a-zA-Z ]+$/.test(userName.value)
console.log(usernamevalid)
        return /^[a-zA-Z ]+$/.test(userName.value)
     }
     function userEmailValid() {
    console.log(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value))

         return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
     }
     
     function userPhoneValid() {
        console.log(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value))
         return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
     }
     
     function userAgeValid() {

        console.log(/^[1-9][0-9]?$|^100$/.test(userAge.value))
         return /^[1-9][0-9]?$|^100$/.test(userAge.value)

     }
     
     function userPasswordValid() {
        console.log(     /^[A-Za-z]/.test(userPassword.value))
         return   /^[A-Za-z]/.test(userPassword.value)
     }
     
     function userRePasswordValid() {
      console.log(userPassword.value == userRePassword.value)  
         return userPassword.value == userRePassword.value
     }
     
     
    
    function validation(){
      
        if (userNameValid()) {
            userName.classList.remove("is-invalid")
            userName.classList.add("is-valid")
            userNameAlert.classList.add("d-none")
            // userNameAlert.classList.replace("d-block", "d-none")
    
        } else {
            userName.classList.remove("is-valid")
            userName.classList.add("is-invalid")
    
            userNameAlert.classList.remove("d-none")
        }
        if (userEmailValid() ) {
            userEmail.classList.remove("is-invalid")
            userEmail.classList.add("is-valid")
            userEmailAlert.classList.add("d-none")
            // userNameAlert.classList.replace("d-block", "d-none")
    
        } else {
            userEmail.classList.remove("is-valid")
            userEmail.classList.add("is-invalid")
    
            userEmailAlert.classList.remove("d-none")
        }
        if (userPhoneValid()  ) {
            userPhone.classList.remove("is-invalid")
            userPhone.classList.add("is-valid")
            userPhoneAlert.classList.add("d-none")
            // userNameAlert.classList.replace("d-block", "d-none")
    
        } else {
            userPhone.classList.remove("is-valid")
            userPhone.classList.add("is-invalid")
    
            userPhoneAlert.classList.remove("d-none")
        }
        if (userAgeValid()  ) {
            userAge.classList.remove("is-invalid")
            userAge.classList.add("is-valid")
            userAgeAlert.classList.add("d-none")
            // userNameAlert.classList.replace("d-block", "d-none")
    
        } else {
            userAge.classList.remove("is-valid")
            userAge.classList.add("is-invalid")
    
            userAgeAlert.classList.remove("d-none")
        }
        if (userPasswordValid()   ) {
            userPassword .classList.remove("is-invalid")
            userPassword .classList.add("is-valid")
            userpasswordAlert.classList.add("d-none")
            // userNameAlert.classList.replace("d-block", "d-none")
    
        } else {
            userPassword.classList.remove("is-valid")
            userPassword.classList.add("is-invalid")
    
            userpasswordAlert.classList.remove("d-none")
        }
        if ( userRePasswordValid()  ) {
            userRePassword.classList.remove("is-invalid")
            userRePassword.classList.add("is-valid")
            userpasswordAlert.classList.add("d-none")
            // userNameAlert.classList.replace("d-block", "d-none")
    
        } else {
            userPassword.classList.remove("is-valid")
            userPassword.classList.add("is-invalid")
    
            userpasswordAlert.classList.remove("d-none")
        }


    if(userNameValid()&&userEmailValid()&& userPhoneValid() &&userAgeValid() &&userPasswordValid() &&userRePasswordValid ){
        document.getElementById("submitBtn").removeAttribute("disabled")
    }else{
        document.getElementById("submitBtn").setAttribute("disabled","true")
    }
    }

})





$(document).ready(function(){
console.log("ffff")

$("#loading .spinner").fadeOut(1000,function(){


$("#loading").fadeOut(1000 ,function(){
    $("#loading").remove()
$("body").css("overflow","auto")



})

    })
})