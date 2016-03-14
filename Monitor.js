function Monitor( containerID, heart ) {

	var fov = 25;
	var maxFov = 75, minFov = 5;
	var defaultCamRadius = 300;
	
	var container, stats, parentCanvas;
	var containerW, containerH;
	
	var camera, scene, renderer;
	var material, mesh, loader, model;
	var light;
	var axisHelper, gridHelper;
	var labels;
	
	var mouse = new THREE.Vector2( 0, 0 );
	var deltaMouse = new THREE.Vector2( 0, 0 );
	var mouseDown = false;
	var theta = 0, phi = 0;
	var deltaTheta = 0, deltaPhi = 0;
	var target = new THREE.Vector3( 0, 0, 0 );
	var radius = 300;
	
	var ray = new THREE.Vector2();
	var cursor = new THREE.Vector2();
	var raycaster = new THREE.Raycaster();
	var intersect;
	var labelDiv, interval;

	var gridFlag = true, statsFlag = true, labelFlag = false, resetFovFlag = false,
			resetPhiFlag = false, resetThetaFlag = false;
	
	var restoreFov = 0, restoreTheta = 0, restorePhi = 0;
	var finalFov = 25, finalTheta = 0, finalPhi = 0;
	/* animationDamping MUST be a divisor of 1; i.e. 1 / animationDamping must equal a natural number
	 * do NOT change tolerance, animationDamping and tolerance are co-dependent and chosen carefully
	 */
	var animationDamping = 0.1, rotateSpeed = 3, tolerance = 0.000001;
	
	init();
	
	function init() {
		container = document.getElementById( containerID );
		containerW = $(container).width();
		containerH = $(container).height();
		
		camera = new THREE.PerspectiveCamera( fov, container.clientWidth / container.clientHeight, 0.1, 1000 );
		camera.position.z = defaultCamRadius;
		camera.up.set( 0, 1, 0 );
		
		scene = new THREE.Scene();
		
		axisHelper = new THREE.AxisHelper( 1000 );
		gridHelper = new THREE.GridHelper( 1000, 10 );
		gridHelper.position.set( 0, -60, 0 );
		
		light = new THREE.Vector3( 0, 0, 0 );
		
		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( 0xfafafa );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( container.clientWidth, container.clientHeight );
		container.appendChild( renderer.domElement );

		model = heart;
		loader = new THREE.STLLoader();
		loader.load( model.pathToMesh, modelLoadedCallBack );

		labels = ExteriorLabels();
		labelDiv = document.getElementById( model.labelID );
		
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '5%';
		stats.domElement.style.left = '5%';
		
		parentCanvas = document.getElementById( 'parent-canvas' );
		
		parentCanvas.addEventListener( 'mousedown', onMouseDown, false );
		parentCanvas.addEventListener( 'wheel', onWheel, false );
		container.addEventListener( 'mousemove', raycasting, false );
		window.addEventListener( 'resize', onWindowResize, false );

		interval = setInterval(debugInfo, 50);
	}
	
	this.loadNewModel = function( heart ) {
		model = heart;
		scene.remove( mesh );
		loader.load( model.pathToMesh, modelLoadedCallBack );
	};
	
	function modelLoadedCallBack( geometry ) {
		material = new THREE.ShaderMaterial( {
			vertexShader: shaders.vertex,
			fragmentShader: shaders.fragment,
			uniforms: {
				"uColor": { type: 'c', value: new THREE.Color( model.color ) },
				"uAmbient": { type: 'c', value: new THREE.Color( 0x949494 ) },
				"uLightDir": { type: 'v3', value: light },
				"view": { type: 'i', value: 0 }
			}
		});
		material.side = THREE.DoubleSide;
		mesh = new THREE.Mesh( geometry, material );
		mesh.rotation.set( model.rotationX, model.rotationY, model.rotationZ );
		mesh.scale.set( model.scale, model.scale, model.scale );
		scene.add( mesh );
	}
	
	function onWindowResize() {
		containerW = $(container).width();
		containerH = $(container).height();
		
		camera.aspect = containerW / containerH;
		camera.updateProjectionMatrix();
		
		renderer.setSize( containerW, containerH );
	}
	
	function onWheel( event ) {
		event.preventDefault();
		event.stopPropagation();
		
		fov += event.deltaY;
		fov = Math.max( minFov, Math.min( maxFov, fov ) );
		camera.fov = fov;
		camera.updateProjectionMatrix();
	}
	
	function onMouseDown( event ) {
		mouseDown = true;
		
		parentCanvas.addEventListener( 'mousemove', onMouseMove, false );
		parentCanvas.addEventListener( 'mouseup', onMouseUp, false );
		parentCanvas.addEventListener( 'mouseout', onMouseOut, false );
		
		mouse.x = event.clientX;
		mouse.y = event.clientY;
	}
	
	function onMouseMove( event ) {
		if ( mouseDown ) {
			deltaMouse.x = event.clientX - mouse.x;
			deltaMouse.y = event.clientY - mouse.y;
			
			mouse.x = event.clientX;
			mouse.y = event.clientY;
			
			deltaTheta = deltaMouse.x / radius;
			deltaPhi = deltaMouse.y / radius;
			
			theta -= deltaTheta*rotateSpeed;
			phi += deltaPhi*rotateSpeed;
			phi = Math.max( -Math.PI / 2, Math.min( Math.PI/2, phi ) );
		}
	}
	
	function raycasting( event ) {
		// convert from window co-ordinates to normalized device co-ordinates
		ray.x = 2 * ( event.offsetX / $(container).width() ) - 1;
		ray.y = 1 - 2 * ( event.offsetY / $(container).height() );
		
		// track position of mouse on screen
		cursor.x = event.clientX;
		cursor.y = event.clientY;
	}
	
	function onMouseUp( event ) {
		disposeListeners( event );
	}
	
	function onMouseOut() {
		disposeListeners();
		$(labelDiv).hide();
	}
	
	function disposeListeners() {
		mouseDown = false;
		deltaTheta = 0;
		deltaPhi = 0;

		parentCanvas.removeEventListener( 'mousemove', onMouseMove, false );
		parentCanvas.removeEventListener( 'mouseup', onMouseUp, false );
		parentCanvas.removeEventListener( 'mouseout', onMouseOut, false );
	}
	
	this.toggleGrid = function() {
		if ( gridFlag ) {
			scene.add( axisHelper );
			scene.add( gridHelper );
			gridFlag = false;
		}
		else {
			scene.remove( axisHelper );
			scene.remove( gridHelper );
			gridFlag = true;
		}
	};
	
	this.toggleStats = function() {
		if ( statsFlag ) {
			container.appendChild( stats.domElement );
			$('.debug').css('visibility', 'visible');
			statsFlag = false;
		}
		else {
			container.removeChild( stats.domElement );
			$('.debug').css('visibility', 'hidden');
			statsFlag = true;
		}
	};
	
	this.reset = function(t, p) {
		restoreFov = ( finalFov - fov ) * animationDamping;
		resetFovFlag = true;

		theta %= (2 * Math.PI);
		if ( theta < 0 ) theta += (2 * Math.PI);
		if ( !t ) {
			finalTheta = ( theta < Math.PI ) ? 0: 2 * Math.PI;
		}
		else
			finalTheta = t;
		restoreTheta = ( finalTheta - theta ) * animationDamping;
		resetThetaFlag = true;

		finalPhi = p == undefined? 0: p;
		restorePhi = ( finalPhi - phi ) * animationDamping;
		resetPhiFlag = true;
	};
	
	this.toggleLabels = function() {
		if ( labelFlag ) {
			for ( var i = 0; i < labels.length; ++i )
				scene.remove( labels[i] );
			labelFlag = false;
		}
		else {
			for ( var i = 0; i < labels.length; ++i )
				scene.add( labels[i] );
			labelFlag = true;
		}
	};
	
	this.animate = function() {
		render();
		stats.update();
	};
	
	this.toggleCrossSection = function(n) {
		material.uniforms.view.value = n;
		if ( labelFlag ) {
			for ( var i = 0; i < labels.length; ++i )
				scene.remove( labels[i] );
		}
		switch (n) {
			case 1:
				this.reset();
				labels = DorsalLabels();
				break;
			case 2:
				this.reset(Math.PI, 0);
				labels = VentralLabels();
				break;
			case 3:
				this.reset(undefined, Math.PI/2);
				labels = BottomLabels();
				break;
			case 4:
				this.reset(undefined, -Math.PI/2);
				labels = TopLabels();
				break;
			case 5:
				this.reset(Math.PI/2, 0);
				labels = LeftLabels();
				break;
			case 6:
				this.reset(3*Math.PI/2, 0);
				labels = RightLabels();
				break;
			default:
				this.reset();
				labels = ExteriorLabels();
				break;
		}

		if ( labelFlag ) {
			for ( var i = 0; i < labels.length; ++i )
				scene.add( labels[i] );
		}
	};
	
	function render() {
		updateCamera();
		
		if ( labelFlag ) labelPicking();
		light.copy( camera.position );
		
		renderer.render( scene, camera );
	}
	
	function labelPicking( ) {
		raycaster.setFromCamera( ray, camera );
		
		intersect = raycaster.intersectObjects( scene.children, true )[0];
		if ( intersect !== undefined ) {

			$(labelDiv).text( intersect.object.name );
			$(labelDiv).css( { left: cursor.x, top: cursor.y } );
			$(labelDiv).show();
			
		}
		else $(labelDiv).hide();
	}
	
	function updateCamera() {
		if ( mouseDown || resetThetaFlag || resetPhiFlag || resetFovFlag ) {
			phi = Math.max( -Math.PI / 2, Math.min( Math.PI/2, phi ) );

			camera.position.x = radius * Math.cos( phi ) * Math.sin( theta );
			camera.position.y = radius * Math.sin( phi );
			camera.position.z = radius * Math.cos( phi) * Math.cos( theta );

			camera.lookAt( target );
		}

		if ( resetFovFlag ) {
			if ( Math.abs( fov - finalFov ) > tolerance && !mouseDown) {
				fov += restoreFov;
				camera.fov = fov;
				camera.updateProjectionMatrix();
			}
			else {
				resetFovFlag = false;
				restoreFov = 0;
			}
		}
		if ( resetThetaFlag ) {
			if ( Math.abs( theta - finalTheta) > tolerance && !mouseDown ) {
				theta += restoreTheta;
				camera.lookAt( target );
			}
			else {
				resetThetaFlag = false;
				restoreTheta = 0;
			}
		}
		if ( resetPhiFlag ) {
			if ( Math.abs( phi - finalPhi ) > tolerance && !mouseDown ) {
				phi += restorePhi;
				camera.lookAt( target );
			}
			else {
				resetPhiFlag = false;
				restorePhi = 0;
			}
		}
	}
	
	function debugInfo() {
		var r = camera.position.clone();
		var t = theta / Math.PI;
		var p = phi / Math.PI;
		$('.debug').html( 'Camera position: ( ' + r.x.toFixed(2) + ', ' + r.y.toFixed(2) + ', ' + r.z.toFixed(2) + ' )'
						+ '<br \>Theta: ' + t.toFixed(2) + 'pi , Phi: ' + p.toFixed(2) + 'pi'
						+ '<br \>Field Of View: ' + camera.fov.toFixed(2) );
	}
};