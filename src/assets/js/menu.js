$(function() {

	// 'use strict';
  
	// $('.js-menu-toggle').click(function(e) {
  
	// 	var $this = $(this);		
	// 	console.log($this);
	// 	if ( $('aside').hasClass('show-sidebar') ) {
	// 		console.log(1)
	// 		$('aside').removeClass('show-sidebar');
	// 		$this.removeClass('active');
	// 	} else {
	// 		console.log(2)
	// 		$('aside').addClass('show-sidebar');	
	// 		$this.addClass('active');
	// 	}
  
	// 	e.preventDefault();
  
	// });
  
	// // click outisde offcanvas
	//   $(document).mouseup(function(e) {
	//   var container = $(".sidebar");
	//   if (!container.is(e.target) && container.has(e.target).length === 0) {
	// 	if ( $('aside').hasClass('show-sidebar') ) {
	// 			  $('aside').removeClass('show-sidebar');
	// 			  $('aside').find('.js-menu-toggle').removeClass('active');
	// 		  }
	//   }
	//   }); 
  
  });
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }  