/*  
Jessica J. Hernandez
ID: 0004631401
March 14, 2015 - March 20, 2015 (Project Week 2)
Programming for Web Applications 2 | 201503-01
Professor: Crystal Silvestro
Full Sail University
*/

(function ($) {
	
    // Add to bookmarks functionality for the bookmark banner on the homepage
    $("#bookmarkme").click(function () {
        // Mozilla Firefox Bookmark
        if ('sidebar' in window && 'addPanel' in window.sidebar) { 
            window.sidebar.addPanel(location.href, document.title, "");
        } else if (/*@cc_on!@*/false) { // IE Favorite
            window.external.AddFavorite(location.href, document.title); 
        } else { // webkit - safari/chrome
            alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
        }
    });
	
    
    
    // Tooltip animation with added on styling.
    $('.masterTooltip').hover(function () {
        
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>').text(title).appendTo('body').fadeIn('100');
        
    }, function () {
        
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
        
    }).mousemove(function (event) {
        
        var mouseX = event.pageX + 20,
            mouseY = event.pageY + 5;
        $('.tooltip').css({top: mouseY, left: mouseX});
        
    });
    
    
    
    //  Tabbed navigation interactivity
    $('#tabs div[id]').hide().eq(0).show();
    $('#tabs div[id]:not(:first)').hide();
    
    $('#tabs-nav li').click(function (e) { 
        e.preventDefault();
        $('#tabs div[id]').hide();
        
        $('#tabs-nav .current').removeClass('current');
        $(this).addClass('current');
        var clicked = $(this).find('a:first').attr('href');
        
        $('#tabs ' + clicked).fadeIn('fast');
    }).eq(0).addClass('current');
    
    
    
    //  Overlay and modal actions
    $('.modalClick').on('click', function (event) {
        event.preventDefault();
        $('.overlay').fadeIn().find('#modal').fadeIn();
        $('.overlay').fadeIn().find('#loginModal').fadeIn();
    });
    
    $('.close').on('click', function (event) {
        event.preventDefault();
        $('.overlay').fadeOut().find('#modal').fadeOut(); 
    });
    
    
    
    //  Fade in add-project button
    $('#addBtns').fadeTo(100, 0.6);
    
    $('#addBtn1, #addBtn2').mouseover(function () {
        $('#addBtns').fadeTo(100, 1);  
    });
    
    $('#addBtn1, #addBtn2').mouseout(function () {
        $('#addBtns').fadeTo(100, 0.6);  
    });
    
    
    
    //  Editing the placeholder text color for input[type="file"] and input[type="date"
    $('#pFile, #dueDate').on('click', function () {
       $(this).css({'color':'#a7cc5d'}); 
    });
    
    
    
    //  Fading of the status images in the modal
    $('.pStatus').mouseover(function () {
        $(this).fadeTo(100, 0.6); 
    });
    
    $('.pStatus').mouseout(function () {
        $(this).fadeTo(100, 1);  
    });
    
    
    
    //  Logging in
    $('.signInButton').click(function (e) {
        e.preventDefault();
        
        var user = $('#userName').val();
        var pass = $('#password').val();
        
        $.ajax({
            url: 'xhr/login.php',
            type: 'post',
            dataType: 'json',
            data: {
                username: user,
                password: pass
            },
            success: function (response) {
                if (response.error) {
                    alert(response.error);
                } else {
                    window.location.assign('dashboard.html');
                }
            }
        });
    });
    
    
    
    //  Logging Out
    $('.logout').click(function (e) {
        e.preventDefault();
        
        $.get('xhr/logout.php', function () {
            window.location.assign('index.html');
        });
    });
    
    
    
    //  Register Page
    $('#registerBtn').click(function (e) {
         e.preventDefault();
        
        var firstname = $('#firstName').val();
            lastname = $('#lastName').val();
            username = $('#usersname').val();
            email = $('#email').val();
            password = $('#passWord').val();
        
        $.ajax({
           url: 'xhr/register.php',
            type: 'post',
            dataType: 'json',
            data: {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password
            },
            
            success: function(response) {
                if (response.error) {
                    alert(response.error);
                } else {
                    window.location.assign('login.html');
                }
            }
        });
    });
    
    
})(jQuery); // end private scope




