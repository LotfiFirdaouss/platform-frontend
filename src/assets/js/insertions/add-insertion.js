

//initialization : disabling all fiels for etude (travail is active)
var index;
var elements = document.getElementsByName("etude");
var count = elements.length;
for(index = 0; index < count; index++){
    elements[index].disabled = true;
}

var cursus=document.getElementById("cursus_post_ensam");
cursus.addEventListener('click', () => {
	cursus_value=cursus.value;
    console.log(cursus_value);
    if(cursus_value=="travail"){
        var index;
        var elements = document.getElementsByName("etude");
        var count = elements.length;
        for(index = 0; index < count; index++){
            elements[index].disabled = true;
        }

        var index;
        var elements = document.getElementsByName("travail");
        var count = elements.length;
        for(index = 0; index < count; index++){
            elements[index].disabled = false;
        }

    }else{
        var index;
        var elements = document.getElementsByName("travail");
        var count = elements.length;
        for(index = 0; index < count; index++){
            elements[index].disabled = true;
        }

        var index;
        var elements = document.getElementsByName("etude");
        var count = elements.length;
        for(index = 0; index < count; index++){
            elements[index].disabled = false;
        }
    }
});