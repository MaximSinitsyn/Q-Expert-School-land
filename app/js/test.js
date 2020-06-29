function send_form(a){

  	var name_client = $('.' + a + ' input[name="nameClient"]').val();
  	var phone_client = $('.' + a + ' input[name="phoneClient"]').val();
  	var email_client = $('.' + a + ' input[name="emailClient"]').val();

  	if (name_client && phone_client) {
	    $.ajax({
            type: "POST",
            url: "forma.php",
            data: {
                name_client: name_client,
                phone_client: phone_client,
                email_client: email_client
        	},
        	success: function(data) {
            	$('.' + a).html(data);
            	$('.norequired').removeClass('norequired_active');
        	}
    	});
	} else {
		$('.norequired').addClass('norequired_active');
		$('.norequired').html('<div class="uk-text-center" >Заполните поле Имя и Телефон</div>');
	}
}