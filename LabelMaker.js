function DorsalLabels() {
	var labelMat = new THREE.MeshLambertMaterial( { color: 0x202020 } );
	var labels = [];

	var d = LabelTag( labelMat, "t" );
	d.position.set( 0, 100, 0 );
	d.name = "back labels";
	labels.push(d);
	return labels;
}

function VentralLabels() {
	var labelMat = new THREE.MeshLambertMaterial( { color: 0x202020 } );
	var labels = [];

	var d = LabelTag( labelMat, "t" );
	d.position.set( 0, 100, 0 );
	d.name = "front labels";
	labels.push(d);
	return labels;
}

function BottomLabels() {
	var labelMat = new THREE.MeshLambertMaterial( { color: 0x202020 } );
	var labels = [];

	var d = LabelTag( labelMat, "t" );
	d.position.set( 0, 100, 0 );
	d.name = "bottom labels";
	labels.push(d);
	return labels;
}

function TopLabels() {
	var labelMat = new THREE.MeshLambertMaterial( { color: 0x202020 } );
	var labels = [];

	var d = LabelTag( labelMat, "t" );
	d.position.set( 0, 100, 0 );
	d.name = "top labels";
	labels.push(d);
	return labels;
}

function LeftLabels() {
	var labelMat = new THREE.MeshLambertMaterial( { color: 0x202020 } );
	var labels = [];

	var d = LabelTag( labelMat, "t" );
	d.position.set( 0, 100, 0 );
	d.name = "left labels";
	labels.push(d);
	return labels;
}

function RightLabels() {
	var labelMat = new THREE.MeshLambertMaterial( { color: 0x202020 } );
	var labels = [];

	var d = LabelTag( labelMat, "t" );
	d.position.set( 0, 100, 0 );
	d.name = "right labels";
	labels.push(d);
	return labels;
}

function ExteriorLabels() {
	var labelMat = new THREE.MeshLambertMaterial( { color: 0x202020 } );
	var labels = [];
	
	var aorta;
	var superiorVC, inferiorVC;
	var rightPulmonaryA, leftPulmonaryA, pulmonaryTrunk;
	var rightPulmonaryV, leftPulmonaryV;
	var rAtrium, lAtrium, lVentricle, rVentricle;
	
	aorta = LabelTag( labelMat, "r" );
	aorta.position.set( 6, 30, 10 );
	aorta.name = "aorta";
	labels.push( aorta );
	
	superiorVC = LabelTag( labelMat, "l" );
	superiorVC.position.set( -18, 35, 0 );
	superiorVC.name = "superior vena cava";
	labels.push( superiorVC );
	
	inferiorVC = LabelTag( labelMat, "l" );
	inferiorVC.position.set( -11, -9, -40 );
	inferiorVC.name = "inferior vena cava";
	labels.push( inferiorVC );
	
	rightPulmonaryA = LabelTag( labelMat, "l" );
	rightPulmonaryA.position.set( -14, 30, -23 );
	rightPulmonaryA.name = "right pulmonary artery";
	labels.push( rightPulmonaryA );
	
	leftPulmonaryA = LabelTag( labelMat, "r" );
	leftPulmonaryA.position.set( 28, 17, 0 );
	leftPulmonaryA.name = "left pulmonary artery";
	labels.push( leftPulmonaryA );
	
	rightPulmonaryV = LabelTag( labelMat, "l" );
	rightPulmonaryV.position.set( -14, 20, -30 );
	rightPulmonaryV.name = "right pulmonary veins";
	labels.push( rightPulmonaryV );
	
	leftPulmonaryV = LabelTag( labelMat, "r" );
	leftPulmonaryV.position.set( 32, 8, -5 );
	leftPulmonaryV.name = "left pulmonary veins";
	labels.push( leftPulmonaryV );
	
	pulmonaryTrunk = LabelTag( labelMat, "t" );
	pulmonaryTrunk.position.set( 3, 10, 15 );
	pulmonaryTrunk.name = "pulmonary trunk";
	labels.push( pulmonaryTrunk );
	
	rAtrium = LabelTag( labelMat, "l" );
	rAtrium.position.set( -30, 5, -10 );
	rAtrium.name = "right atrium";
	labels.push( rAtrium );
	
	rVentricle = LabelTag( labelMat, "l" );
	rVentricle.position.set( -25, -20, -5 );
	rVentricle.name = "right ventricle";
	labels.push( rVentricle );
	
	lAtrium = LabelTag( labelMat, "r" );
	lAtrium.position.set( 23, 3, 3 );
	lAtrium.name = "left atrium";
	labels.push( lAtrium );
	
	lVentricle = LabelTag( labelMat, "r" );
	lVentricle.position.set( 26, -20, 4 );
	lVentricle.name = "left ventricle";
	labels.push( lVentricle );
	
	return labels;
}

function LabelTag( labelMat, orientation ) {
	
	var labelPoints = [];
	labelPoints.push( new THREE.Vector2( 0, 0 ) );
	
	switch( orientation ) {
		
		case "t":
			labelPoints.push( new THREE.Vector2( 2, 2 ) );
			labelPoints.push( new THREE.Vector2( 2, 7 ) );
			labelPoints.push( new THREE.Vector2( -2, 7 ) );
			labelPoints.push( new THREE.Vector2( -2, 2 ) );
			break;
		case "r":
			labelPoints.push( new THREE.Vector2( 2, -2 ) );
			labelPoints.push( new THREE.Vector2( 7, -2 ) );
			labelPoints.push( new THREE.Vector2( 7, 2 ) );
			labelPoints.push( new THREE.Vector2( 2, 2 ) );
			break;
		case "l":
			labelPoints.push( new THREE.Vector2( -2, 2 ) );
			labelPoints.push( new THREE.Vector2( -7, 2 ) );
			labelPoints.push( new THREE.Vector2( -7, -2 ) );
			labelPoints.push( new THREE.Vector2( -2, -2 ) );
			break;
		case "b":
			labelPoints.push( new THREE.Vector2( -2, -2 ) );
			labelPoints.push( new THREE.Vector2( -2, -7 ) );
			labelPoints.push( new THREE.Vector2( 2, -7 ) );
			labelPoints.push( new THREE.Vector2( 2, -2 ) );
			break;
		
	}
	
	labelPoints.push( new THREE.Vector2( 0, 0 ) );
	
	var labelShape = new THREE.Shape( labelPoints );
	
	var extrusionSettings = {
		amount: 1, bevelEnabled: false
	};
	
	var labelGeo = new THREE.ExtrudeGeometry( labelShape, extrusionSettings );
	var label = new THREE.Mesh( labelGeo, labelMat );
	
	return label;
}