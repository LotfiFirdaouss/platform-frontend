function JSswitchActive(ID){ 
    document.getElementsByClassName('active')[0].classList.add('inactive');
    document.getElementsByClassName('active')[0].classList.remove('active');

    document.getElementById(ID).classList.add('active');
    document.getElementById(ID).classList.remove('inactive');
}