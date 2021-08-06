//capture click using parent div of submit button
var submitBtn=document.getElementById("submitBtn");
var submitBtnDiv = document.getElementById("submitBtnDiv");
var ValidityFormWarn=document.getElementById("ValidityFormWarn");
submitBtnDiv.addEventListener('click',() => {
    if( submitBtn.disabled == true ){
        ValidityFormWarn.style.display="block";
    }else{
        ValidityFormWarn.style.display="none";
    }
});






