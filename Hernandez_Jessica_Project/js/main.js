/*  
Jessica J. Hernandez
ID: 0004631401
March 6, 2015 - March 13, 2015 (Project Week 2)
Programming for Web Applications 2 | 201503-01
Professor: Crystal Silvestro
Full Sail University
*/

(function ($) {
	
//    Add to bookmarks functionality for the bookmark banner on the homepage
//    $("#bookmarkme").click(function() {
//            // Mozilla Firefox Bookmark
//            if ('sidebar' in window && 'addPanel' in window.sidebar) { 
//                window.sidebar.addPanel(location.href,document.title,"");
//            } else if( /*@cc_on!@*/false) { // IE Favorite
//                window.external.AddFavorite(location.href,document.title); 
//            } else { // webkit - safari/chrome
//                alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
//            }
//        });
//	
    
    
    $('.masterTooltip').hover(function () {
        
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>').text(title).appendTo('body').fadeIn('100');
        
    }, function () {
        
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
        
    }).mousemove(function (event) {
        
        var mouseX = event.pageX + 20,
            mouseY = event.pageY + 10;
        $('.tooltip').css({top: mouseY, left: mouseX});
        
    });
	
		

	
})(jQuery); // end private scope




