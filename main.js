function main() {

	if ( !Detector.webgl ) Detector.addGetWebGLMessage();
	
	monitors = [];
	shaders = { vertex: '', fragment: '' };
	models = {};
		
	loadingScreen();
	init();
	controls();
	pageControls();
	animate();
}

function init() {

	var normal = {
		pathToMesh: 'models/healthy-heart.stl',
		color: 0xb92c28,
		scale: 1.5,
		rotationX: Math.PI/5,
		rotationY: -Math.PI/5,
		rotationZ: 0,
		positionX: 0,
		positionY: 0,
		positionZ: 0,
		labelID: "label1"
	};
	models.normal = normal;

	var atrialSeptal = {
		pathToMesh: 'models/healthy-heart.stl',
		color: 0x949494,
		scale: 1.5,
		rotationX: Math.PI/5,
		rotationY: -Math.PI/5,
		rotationZ: 0,
		positionX: 0,
		positionY: 0,
		positionZ: 0,
		labelID: "label2"
	};
	models.atrialSeptal = atrialSeptal;

	var ventricularSeptal = {
		pathToMesh: 'models/healthy-heart.stl',
		color: 0xd29b00,
		scale: 1.5,
		rotationX: Math.PI/5,
		rotationY: -Math.PI/5,
		rotationZ: 0,
		positionX: 0,
		positionY: 0,
		positionZ: 0,
		labelID: "label2"
	};
	models.ventricularSeptal = ventricularSeptal;

	var atrioventricularSeptal = {
		pathToMesh: 'models/healthy-heart.stl',
		color: 0xfffff0,
		scale: 1.5,
		rotationX: Math.PI/5,
		rotationY: -Math.PI/5,
		rotationZ: 0,
		positionX: 0,
		positionY: 0,
		positionZ: 0,
		labelID: "label2"
	};
	models.atrioventricularSeptal = atrioventricularSeptal;

	var patentDuctus = {
		pathToMesh: 'models/healthy-heart.stl',
		color: 0x00577d,
		scale: 1.5,
		rotationX: Math.PI/5,
		rotationY: -Math.PI/5,
		rotationZ: 0,
		positionX: 0,
		positionY: 0,
		positionZ: 0,
		labelID: "label2"
	};
	models.patentDuctus = patentDuctus;

	var tetrology = {
		pathToMesh: 'models/healthy-heart.stl',
		color: 0x087830,
		scale: 1.5,
		rotationX: Math.PI/5,
		rotationY: -Math.PI/5,
		rotationZ: 0,
		positionX: 0,
		positionY: 0,
		positionZ: 0,
		labelID: "label2"
	};
	models.tetrology = tetrology;
	
	monitors.push( new Monitor( 'container1', normal ) );
	monitors.push( new Monitor( 'container2', atrialSeptal ) );
	document.getElementById('defect').innerHTML = document.getElementById('title-asd').innerHTML;
	document.getElementById('abstract-panel').innerHTML = document.getElementById('info-asd').innerHTML;

	// load vertex shader
	$.ajax({
		url: "shaders/VertexShader.txt",
		async: false,
		success: function( data ) {
			shaders.vertex = data;
		}
	});

	// load fragment shader
	$.ajax({
		url: "shaders/FragmentShader.txt",
		async: false,
		success: function( data ) {
			shaders.fragment = data;
		}
	});
}

function animate() {
	for ( var i = 0; i < monitors.length; ++i ) {
		monitors[i].animate();
	}
	
	requestAnimationFrame( animate );
}

function loadingScreen() {
	setTimeout( function() {
		$('#loading-screen').fadeOut();
	}, 3000);
	
	var value = 1;
	var progress = setInterval( function() {
		value *= 2;
		$('.progress-bar').css('width', value + '%').attr('aria-valuenow', value);

	}, 250);
}

function pageControls() {
	$('#scroll-app').click(function() {
		$('html, body').animate({scrollTop: $('#app').offset().top}, 1250, 'easeInOutExpo');
	});
	$('#scroll-team').click(function() {
		$('html, body').animate({scrollTop: $('#meet-our-team').offset().top}, 1250, 'easeInOutExpo');
	});
	$('#scroll-tutorial').click(function() {
		$('html, body').animate({scrollTop: $('#tutorial').offset().top}, 1250, 'easeInOutExpo');
	});
	$('#scroll-contact').click(function() {
		$('html, body').animate({scrollTop: $('#contact').offset().top}, 1250, 'easeInOutExpo');
	});

	$('.team').hover(function() {
		desc = $(this).children('.description')
		desc.animate({ height: desc.get(0).scrollHeight }, 200)
	}, function() {
		$(this).children('.description').animate({height: '0em'}, 200)
	});
}

$( document ).ready( main );
