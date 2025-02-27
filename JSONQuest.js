// jQuery time
var current_fs, next_fs, previous_fs; // fieldsets
var left, opacity, scale; // fieldset properties which we will animate
var animating; // flag to prevent quick multi-click glitches

$(".next").click(function(){
    if(animating) return false;
    animating = true;
    
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
    
    // Activate next step on progress bar
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    
    // Show the next fieldset
    next_fs.show(); 
    
    // Hide the current fieldset with animation
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            scale = 1 - (1 - now) * 0.2;
            left = (now * 50) + "%";
            opacity = 1 - now;
            current_fs.css({'transform': 'scale('+scale+')', 'position': 'absolute'});
            next_fs.css({'left': left, 'opacity': opacity});
        }, 
        duration: 800, 
        complete: function(){
            current_fs.hide();
            animating = false;
        }, 
        easing: 'easeInOutBack'
    });
});

$(".previous").click(function(){
    if(animating) return false;
    animating = true;
    
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    // Deactivate current step on progress bar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
    // Show the previous fieldset
    previous_fs.show(); 
    
    // Hide the current fieldset with animation
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            scale = 0.8 + (1 - now) * 0.2;
            left = ((1 - now) * 50) + "%";
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
        }, 
        duration: 800, 
        complete: function(){
            current_fs.hide();
            animating = false;
        }, 
        easing: 'easeInOutBack'
    });
});

$(".submit").click(function(){
    // Coleta todas as respostas do formulário
    var respostas = {};
    $("fieldset input, fieldset textarea, fieldset select").each(function() {
        var name = $(this).attr("name");
        var value = $(this).val();
        respostas[name] = value;
    });

    console.log("Respostas do formulário:", respostas); // Exibe no console para depuração

    // Oculta o formulário e exibe mensagem de sucesso
    $(".container").fadeOut(500, function() {
        $("<h2>Obrigado! Suas respostas foram enviadas com sucesso.</h2>")
        .hide()
        .appendTo("body")
        .fadeIn(500);
    });

    return false;
});
