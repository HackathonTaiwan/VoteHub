$(document).ready(function() {
		$(".Download").eq(0).ElasticProgress({
				buttonSize: 60,
				fontFamily: "Montserrat",
				colorBg: "#66b2ff",
				colorFg: "#0066cc",
				width: Math.min($(window).width()/1.8, 2600),
				onClick: function(event) {
						console.log("onClick");
						$(this).ElasticProgress("open");
				},
				onOpen: function(event) {
						console.log("onOpen");
						fakeLoading($(this));
				},
				onComplete: function(event) {
						console.log("onComplete");
						$( "#first" ).html( "<h1> 2,000 票</h1>" );
				},
				onClose: function(event) {
						console.log("onClose");
				},
				onFail: function(event) {
						console.log("onFail");
						$(this).ElasticProgress("open");
				},
				onCancel: function(event) {
						console.log("onCancel");
						$(this).ElasticProgress("open");
				}
		});

		$(".Download").eq(1).ElasticProgress({
				buttonSize: 60,
				fontFamily: "Montserrat",
				colorBg: "#adeca8",
				colorFg: "#669900",
				width: Math.min($(window).width()/1.8, 2600),
				onClick: function(event) {
						console.log("onClick");
						$(this).ElasticProgress("open");
				},
				onOpen: function(event) {
						console.log("onOpen");
						fakeLoading($(this));
				},
				onComplete: function(event) {
						console.log("onComplete");
						$( "#second" ).html( "<h1> 2,300 票</h1>" );
				},
				onClose: function(event) {
						console.log("onClose");
				},
				onFail: function(event) {
						console.log("onFail");
						$(this).ElasticProgress("open");
				},
				onCancel: function(event) {
						console.log("onCancel");
						$(this).ElasticProgress("open");
				}
		});

		$(".Download").eq(2).ElasticProgress({
				buttonSize: 60,
				fontFamily: "Montserrat",
				colorBg: "#ffd11a",
				colorFg: "#ff751a",
				width: Math.min($(window).width()/1.8, 2600),
				onClick: function(event) {
						console.log("onClick");
						$(this).ElasticProgress("open");
				},
				onOpen: function(event) {
						console.log("onOpen");
						fakeLoading($(this));
				},
				onComplete: function(event) {
						console.log("onComplete");
						$( "#third" ).html( "<h1> 2,100 票</h1>" );
				},
				onClose: function(event) {
						console.log("onClose");
				},
				onFail: function(event) {
						console.log("onFail");
						$(this).ElasticProgress("open");
				},
				onCancel: function(event) {
						console.log("onCancel");
						$(this).ElasticProgress("open");
				}
		});

		var e = new ElasticProgress(document.querySelectorAll('.Download')[3], {
				colorFg: "#ed7499",
				colorBg: "#635c73",
				highlightColor: "#ed7499",
				barHeight: 14,
				barInset: 10,
				fontFamily: "Indie Flower"
		});
		e.onClick(function() {
				e.open();
		})
		e.onOpen(function() {
				fakeLoading(e, 2, 0.1);
		});
		e.onFail(function() {
				e.close();
		})

		function fakeLoading($obj, speed, failAt) {
				if (typeof speed == "undefined") speed = 2;
				if (typeof failAt == "undefined") failAt = -1;
				var v = 0;
				var l = function() {
						if (failAt > -1) {
								if (v >= failAt) {
										if (typeof $obj.jquery != "undefined") {
												$obj.ElasticProgress("fail");
										} else {
												$obj.fail();
										}
										return;
								}
						}
						v += Math.pow(Math.random(), 55) * 0.1 * speed;

						if (typeof $obj.jquery != "undefined") {
								$obj.ElasticProgress("setValue", v);
						} else {
								$obj.setValue(v);
						}
						if (v < 1) {
								TweenMax.delayedCall(0.05 + (Math.random() * 0.14), l)
						}
				};
				l();
		}
});
