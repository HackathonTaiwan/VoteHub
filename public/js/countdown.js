
$(function() {
	var i = 60;
	var endT = new Date('12/26/2015').getTime();
	var dayUnit = 86400000;

	function setSpinnerProgress($circle, percentage) {
		var r = 69.85699;
		var c = Math.PI*(r*2);
		var pct = percentage*c;

		$circle.css({ strokeDashoffset: pct });
	}

	var duration = endT - Date.now();
	var totalDay = Math.floor(duration / dayUnit) + 1;
	var day = Math.floor(duration / dayUnit) + 1;
	function updateDay() {
		if (day == 0)
			return;

		day--;

		$('#day').html(day);
		setSpinnerProgress($('#dayT'), day / duration);
	}
	setInterval(updateDay, dayUnit);
	updateDay();

	setInterval(function() {

		/*
		i--;
		if (i < 0) {
			i = 60;
		}
		*/
	/*
		var $circle = $('.circle_animation');
		var r = 69.85699;
		var c = Math.PI*(r*2);

		console.log('C: ' + c);

		console.log('i: ' + i);
		console.log((60-i)/60);

		var pct = ((60-i)/60)*c;

		console.log('PCT: ' + pct);
	*/
	//	$('.timer').html(i);

	//	$circle.css({ strokeDashoffset: pct});
	//	setSpinnerProgress($('.circle_animation'), (60 - i) / 60);

	}, 1000);
});
