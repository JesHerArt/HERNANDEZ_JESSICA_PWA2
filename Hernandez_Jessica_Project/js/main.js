/*  
Jessica J. Hernandez
ID: 0004631401
March 20, 2015 - March 27, 2015 (Project Week 4)
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
    
    
    
    //  Fade in main add-project button on projects.html
    $('#addBtns').fadeTo(100, 0.6);
    
    $('#addBtn1, #addBtn2').mouseover(function () {
        $('#addBtns').fadeTo(100, 1);  
    });
    
    $('#addBtn1, #addBtn2').mouseout(function () {
        $('#addBtns').fadeTo(100, 0.6);  
    });
    
    
    
    //  Editing the placeholder text color for input[type="file"] and input[type="date"]
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
            
            success: function (response) {
                if (response.error) {
                    alert(response.error);
                } else {
                    window.location.assign('login.html');
                }
            }
        });
    });
    
    
    
    //  Displaying the username on top bar of dashboard & projects when logged into account
    $.getJSON("xhr/check_login.php", function (data) {
        $.each(data, function (key, val) {
            $('#welcomeText').append("Welcome, " + val.first_name + "!");
        });
    });
    
    
    
    //  Functionality of the add new project button of the modal
    $('#addProjectBtn').on('click', function () {
       
        var projName = $('#pTitle').val();
            projDesc = $('#pDescription').val();
            projDue = $('#dueDate').val();
            status = $('input[name = "status"]:checked').prop("id");
        
        $.ajax({
            url: "xhr/new_project.php",
            type: "post",
            dataType: "json",
            data: {
                projectName: projName,
                projectDescription: projDesc,
                dueDate: projDue,
                status: status
            },
            success: function (response) {
                if (response.error) {
                    alert(response.error);
                } else {
                    window.location.assign('projects.html');
                }
            }
        });
    });
    
    
    
    //  Getting the projects from the database to display
    var projects = function () {
        
        $.ajax({
            url: 'xhr/get_projects.php',
            type: 'get',
            dataType: 'json',
            success: function (response) {
                if (response.error) {
                    console.log(response.error);
                } else {
                
                    for (var i=0, j=response.projects.length; i < j; i++){
                        var result = response.projects[i];
                        
                        $(".projectsContainer").append(
                        '<div class="projectBox"><input class="projectid" type="hidden" value="' + result.id + '"><!--project title goes here--><div class="projectTitle"><h2>' + result.projectName + '</h2></div><!--details for projects go here--><div class="projectDetails"><p><strong>Description:</strong> ' + result.projectDescription + '<br><strong>File Name:</strong> <br><strong>Due Date:</strong> ' + result.dueDate + '<br><strong>Status:</strong> ' + result.status + '<br><strong>Course:</strong> <br><strong>Professor:</strong> <br><strong>Collaborators:</strong> <br><strong>Grade:</strong> </p></div><!--actions to do to the project are here--><div class="projectActions"><div class="btn">Edit<a href="#"><span class="divButtonLink"></span></a></div><div class="btn">Update Priority<a href="#"><span class="divButtonLink"></span></a></div><div class="btn">Download File<a href="#"><span class="divButtonLink"></span></a></div><div class="btn">Add Note<a href="#"><span class="divButtonLink"></span></a></div><div class="btn">Submit for Grading<a href="#"><span class="divButtonLink"></span></a></div><div class="btn">Delete<a href="#" class="deleteBtn"><span class="divButtonLink"></span></a></div></div></div>');
                    } /*End of for loop*/
                    
                    
                    // Deleting a project & using jQuery UI Modal Dialog Box (Located in projects page)
                    $(function() {
                        $( "#dialog-confirm" ).dialog({
                            autoOpen: false,
                            resizable: false,
                            width: 400,
                            modal: true,
                            buttons: {
                                "Yes, Delete This Project": function() {

                                    var currentProjectID = $('.deleteBtn').closest('.projectBox').find('input[class = "projectid"]').prop("value");

                                    $.ajax({
                                        url: 'xhr/delete_project.php',
                                        data: {
                                            projectID: currentProjectID
                                        },
                                        type: 'post',
                                        dataType: 'json',
                                        success: function (response) {
                                            if (response.error) {
                                                alert(response.error);
                                            } else {
                                                window.location.assign("projects.html");
                                            }
                                        }
                                    });
                                    
                                    $( this ).dialog( "close" );
                                },
                                Cancel: function() {
                                    $( this ).dialog( "close" );
                                }
                          }
                        });
                        
                        $('.deleteBtn').on('click', function(e) {
                            e.preventDefault();
                            $( "#dialog-confirm" ).dialog( "open" );
                            
                            /*console.log("testing to open the dialog box");
                            
                            var currentProjectTitle = $('.deleteBtn').closest('.projectTitle').first('h2').html();
                                    
                            console.log("current project title: " + currentProjectTitle);
                                    
                            $('#titleInsert').html(currentProjectTitle);*/
                            
                        });
                      });
                    
                    
                    // Deleting a project
                    /*$('.deleteBtn').on('click', function (e) {
                        e.preventDefault();
                        
                        
                        var currentProjectID = $(this).closest('.projectBox').find('input[class = "projectid"]').prop("value");
                        
                        console.log("You've deleted project ID: " + currentProjectID);
                        
                        $.ajax({
                            url: 'xhr/delete_project.php',
                            data: {
                                projectID: currentProjectID
                            },
                            type: 'post',
                            dataType: 'json',
                            success: function (response) {
                                console.log('testing for success');
                                
                                if (response.error) {
                                    alert(response.error);
                                } else {
                                    window.location.assign("projects.html");
                                }
                            }
                        });
                    }); *//*End of delete btn on click*/
                    
                }  /*End of else statement*/
            }  /*End of success function*/
        });  /*End of ajax function inside of projects var*/
    };  /*End of projects var*/
    projects();
    
    
    
    //  Datepicker Theme from jQuery UI (Located in add project modal)
    $('.myDatePicker').datepicker({
        minDate: 0    
    });
    
    
    
    //  Sortable Projects from jQuery UI (Located in projects page)
    $(function() {
        $( "#sortable" ).sortable({
            tolerance: "pointer",
            opacity: 0.5,
            cursor: "move",
            helper: "clone"
        });
        
        $( "#sortable" ).disableSelection();
    });
    
    
    
    //  Tabs jQuery UI functionality -- EXTRA UI FEATURE (Located on dashboard)
    $(function() {
        $( "#tabs" ).tabs();
    });
    
    
    
    //  Selectable Box List -- EXTRA UI FEATURE (Located in add project modal)
    $(function() {
        $( "select" ).selectmenu();
    });
    
    
})(jQuery); // end private scope




