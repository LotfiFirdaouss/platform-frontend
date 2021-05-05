$(function() {

	'use strict';
  
	$('.js-menu-toggle').click(function(e) {
  
		var $this = $(this);
  
		
  
		if ( $('aside').hasClass('show-sidebar') ) {
			$('aside').removeClass('show-sidebar');
			$this.removeClass('active');
		} else {
			$('aside').addClass('show-sidebar');	
			$this.addClass('active');
		}
  
		e.preventDefault();
  
	});
  
	// click outisde offcanvas
	  $(document).mouseup(function(e) {
	  var container = $(".sidebar");
	  if (!container.is(e.target) && container.has(e.target).length === 0) {
		if ( $('aside').hasClass('show-sidebar') ) {
				  $('aside').removeClass('show-sidebar');
				  $('aside').find('.js-menu-toggle').removeClass('active');
			  }
	  }
	  }); 
  
	  
  
  });
  