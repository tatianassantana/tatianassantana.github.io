$(document).ready(function(){
    
    $('#mt-call-m-menu').prepend('<div id="mt-menu-trigger"></div>');
    var toggle = 0
     
    $('#mt-menu-trigger').on('click', function(){
        if(toggle == 0) menuAnim('#mt-mobile-menu', 0, 500, 1, function(){ toggle = 1; })
        else menuAnim('#mt-mobile-menu', '-2000px', 400, 0, function(){ toggle = 0;})
    });

    $('#mt-m-menu').children().on('click', function(e){
        if(toggle ==1) menuAnim('#mt-mobile-menu', '-500px', 0, 500, function(){ toggle = 0;})
    })

    $(window).on("click", function(){
        if(toggle == 1) menuAnim('#mt-mobile-menu', '-2000px', 0, 500, function() { toggle = 0 });
    })
    
    function menuAnim(dom, left, speed, opacity, callback){
      $(dom).animate({left: left, opacity: opacity}, speed, function(){
         return callback();
      });
    }

  

    $(window).scroll(function(){
        if($(this).scrollTop() > 100){
            $('.mt-to-up').fadeIn('slow');

        }else{
            $('.mt-to-up').fadeOut('slow')
        }
    });


    $('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);
        
	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});

    $("#mt-wait").hide();
    let form = $("#submitEmail");
    $(form).submit(function(e){
        e.preventDefault();
        let name = $("#name").val();
        let email = $("#email").val();
        let body = $("#body").val();
        let query = {};

        if(name == '' | email == '' | body == ''){
            $("#mt-errors").html("<p>Por favor, preencha todos campos obrigatórios</p>");
        }else{
           query = {
               "name" : name,
               "email": email,
               "body": body
           }
          
           $.ajax({
               url: "https://formspree.io/tatianasouza01@gmail.com",
               method: "POST",
               beforeSend: function(){
                   $("#mt-wait").show();
                 },
               complete: function(){$("#mt-wait").fadeOut('slow');},
               data: query,
               dataType: "json",
           }).
            done(function(data){
               $(form)[0].reset();
               console.log(data);
             
            })

        }});


      


})