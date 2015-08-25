THREE.TableGeometry = function ( width, height, depth, tsurfaceThickness, tbottomThickness, tbottomPadding) {

  THREE.Geometry.call( this );

  this.type = 'TableGeometry';

  this.parameters = {
    width: width,
    height: height,
    depth: depth,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
    tbottomPadding: tbottomPadding
  };

  this.widthSegments = 1;
  this.heightSegments =  1;
  this.depthSegments = 1;
  this.tsurfaceThickness = tsurfaceThickness || 0.1;
  this.tbottomThickness = tbottomThickness || 0.1;
  this.tbottomPadding = tbottomPadding || 0.0;

  var scope = this;

  var width_half = width / 2;
  var height_half = height / 2;
  var depth_half = depth / 2;

  var tsurface_thickness_half = tsurfaceThickness / 2;

  // // tsurface
  // // tsurface bottom
  // buildPlane(
  //     new THREE.Vector3(-width/2, height/2 - tsurface_thickness_half, -depth/2)
  //   , new THREE.Vector3( width/2, height/2 - tsurface_thickness_half, -depth/2)
  //   , new THREE.Vector3( width/2, height/2 - tsurface_thickness_half,  depth/2)
  //   , new THREE.Vector3(-width/2, height/2 - tsurface_thickness_half,  depth/2)
  // );
  //
  // // tsurface top
  // buildPlane(
  //     new THREE.Vector3(-width/2, height/2 + tsurface_thickness_half, -depth/2)
  //   , new THREE.Vector3( width/2, height/2 + tsurface_thickness_half, -depth/2)
  //   , new THREE.Vector3( width/2, height/2 + tsurface_thickness_half,  depth/2)
  //   , new THREE.Vector3(-width/2, height/2 + tsurface_thickness_half,  depth/2)
  // );
  //

  // // tbottom left, right
  // buildPlane(
  //     new THREE.Vector3(-width/2 + tbottomPadding, -height/2, -depth/2)
  //   , new THREE.Vector3(-width/2 + tbottomPadding, -height/2,  depth/2)
  //   , new THREE.Vector3(-width/2 + tbottomPadding,  height/2 - tsurface_thickness_half,  depth/2)
  //   , new THREE.Vector3(-width/2 + tbottomPadding,  height/2 - tsurface_thickness_half, -depth/2)
  // );
  //
  // //tbottom left, left
  // buildPlane(
  //     new THREE.Vector3(-width/2 + tbottomPadding + tbottomThickness, -height/2, -depth/2)
  //   , new THREE.Vector3(-width/2 + tbottomPadding + tbottomThickness, -height/2,  depth/2)
  //   , new THREE.Vector3(-width/2 + tbottomPadding + tbottomThickness,  height/2 - tsurface_thickness_half,  depth/2)
  //   , new THREE.Vector3(-width/2 + tbottomPadding + tbottomThickness,  height/2 - tsurface_thickness_half, -depth/2)
  // );

  // buildPlane( 'z', 'y', - 1, - 1, depth, height, width_half, 0 ); // px
  // buildPlane( 'z', 'y',   1, - 1, depth, height, - width_half, 1 ); // nx
  // buildPlane( 'x', 'z',   1,   1, width, depth, height_half, 2 ); // py
  // buildPlane( 'x', 'z',   1, - 1, width, depth, - height_half, 3 ); // ny
  // buildPlane( 'x', 'y',   1, - 1, width, height, depth_half, 4 ); // pz
  // buildPlane( 'x', 'y', - 1, - 1, width, height, - depth_half, 5 ); // nz

  //tsurface
  buildCube({width: width, height: tsurfaceThickness, depth: depth}, { x: 0, y: height/2 + tsurfaceThickness/2, z: 0 })

  //tbottom front
  buildCube({width: width - tbottomPadding*2, height: height, depth: tbottomThickness}, { x: 0, y: 0, z: depth/2 - tbottomThickness/2 - tbottomPadding })

  //tbottom back
  buildCube({width: width - tbottomPadding*2, height: height, depth: tbottomThickness}, { x: 0, y: 0, z: -depth/2 + tbottomThickness/2 + tbottomPadding })

  //tbottom right
  buildCube({width: tbottomThickness, height: height, depth: depth - tbottomPadding*2}, { x: -width/2 + tbottomThickness/2 + tbottomPadding , y: 0, z: 0 })

  //tbottom left
  buildCube({width: tbottomThickness, height: height, depth: depth - tbottomPadding*2}, { x: width/2 - tbottomThickness/2 - tbottomPadding , y: 0, z: 0 })

  function buildCube(dimension, pos) {
    var widthHalf = dimension.width/2;
    var heightHalf = dimension.height/2;
    var depthHalf = dimension.depth/2;

    // top plane
    buildPlane(
        new THREE.Vector3(-widthHalf + pos.x,  heightHalf + pos.y, - depthHalf + pos.z)
      , new THREE.Vector3( widthHalf + pos.x,  heightHalf + pos.y, - depthHalf + pos.z)
      , new THREE.Vector3( widthHalf + pos.x,  heightHalf + pos.y,   depthHalf + pos.z)
      , new THREE.Vector3(-widthHalf + pos.x,  heightHalf + pos.y,   depthHalf + pos.z)
    );

    // bottom plane
    buildPlane(
        new THREE.Vector3(-widthHalf + pos.x, -heightHalf + pos.y, - depthHalf + pos.z)
      , new THREE.Vector3( widthHalf + pos.x, -heightHalf + pos.y, - depthHalf + pos.z)
      , new THREE.Vector3( widthHalf + pos.x, -heightHalf + pos.y,   depthHalf + pos.z)
      , new THREE.Vector3(-widthHalf + pos.x, -heightHalf + pos.y,   depthHalf + pos.z)
    );

    // left plane
    buildPlane(
        new THREE.Vector3(-widthHalf + pos.x, -heightHalf + pos.y, -depthHalf + pos.z)
      , new THREE.Vector3(-widthHalf + pos.x, -heightHalf + pos.y,  depthHalf + pos.z)
      , new THREE.Vector3(-widthHalf + pos.x,  heightHalf + pos.y,  depthHalf + pos.z)
      , new THREE.Vector3(-widthHalf + pos.x,  heightHalf + pos.y, -depthHalf + pos.z)
    );

    // right plane
    buildPlane(
        new THREE.Vector3(widthHalf + pos.x, -heightHalf + pos.y, -depthHalf + pos.z)
      , new THREE.Vector3(widthHalf + pos.x, -heightHalf + pos.y,  depthHalf + pos.z)
      , new THREE.Vector3(widthHalf + pos.x,  heightHalf + pos.y,  depthHalf + pos.z)
      , new THREE.Vector3(widthHalf + pos.x,  heightHalf + pos.y, -depthHalf + pos.z)
    );


    // front plane
    buildPlane(
        new THREE.Vector3(-widthHalf + pos.x, -heightHalf + pos.y, -depthHalf + pos.z)
      , new THREE.Vector3( widthHalf + pos.x, -heightHalf + pos.y,  depthHalf + pos.z)
      , new THREE.Vector3( widthHalf + pos.x,  heightHalf + pos.y,  depthHalf + pos.z)
      , new THREE.Vector3(-widthHalf + pos.x,  heightHalf + pos.y, -depthHalf + pos.z)
    );

    // back plane
    buildPlane(
        new THREE.Vector3(-widthHalf + pos.x, -heightHalf + pos.y, depthHalf + pos.z)
      , new THREE.Vector3( widthHalf + pos.x, -heightHalf + pos.y, depthHalf + pos.z)
      , new THREE.Vector3( widthHalf + pos.x,  heightHalf + pos.y, depthHalf + pos.z)
      , new THREE.Vector3(-widthHalf + pos.x,  heightHalf + pos.y, depthHalf + pos.z)
    );
  }

  function buildPlane(verticeA, verticeB, verticeC, verticeD){
    var offset = scope.vertices.length;

    scope.vertices.push( verticeA );
    scope.vertices.push( verticeB );
    scope.vertices.push( verticeC );
    scope.vertices.push( verticeD );
    scope.faces.push( new THREE.Face3( offset +2 , offset +1, offset) )
    scope.faces.push( new THREE.Face3( offset, offset +3, offset + 2 ) )
  }

  this.mergeVertices();

};

THREE.TableGeometry.prototype = Object.create( THREE.Geometry.prototype );
THREE.TableGeometry.prototype.constructor = THREE.TableGeometry;
