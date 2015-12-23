
$(function() {
	var endT = new Date('12/26/2015').getTime();
	var rings = {
		'DAYS': { 
			s: 86400000, // mseconds in a day,
			max: 365
		},
		'HOURS': {
			s: 3600000, // mseconds per hour,
			max: 24
		},
		'MINUTES': {
			s: 60000, // mseconds per minute
			max: 60
		},
		'SECONDS': {
			s: 1000,
			max: 60
		},
		'MICROSEC': {
			s: 10,
			max: 100
		}
	};
	var r = 69.85699;

	function setSpinnerProgress($circle, percentage) {
		var c = Math.PI * (r * 2);
		var pct = percentage * c;

		$circle.css({ strokeDashoffset: pct });
	}

	var duration;

	function updateRing(key) {
		var v = Math.floor(duration / rings[key].s);
		var dur = rings[key].s * v;

		duration -= dur;

		$('#' + key).html(v);
		setSpinnerProgress($('#' + key + 'T'), (rings[key].max - v) / rings[key].max);
	}
	
	setInterval(function() {
		duration = endT - new Date().getTime();

		updateRing('DAYS');
		updateRing('HOURS');
		updateRing('MINUTES');
		updateRing('SECONDS');
		updateRing('MICROSEC');
	}, 16);
});
