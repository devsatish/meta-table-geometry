THREE.TableGeometry = function ( width, height, depth, tsurfaceThickness, tbottomThickness, tbottomPaddingTop, tbottomPaddingBottom) {

  THREE.Geometry.call( this );

  this.type = 'TableGeometry';

  this.parameters = {
    width: width,
    height: height,
    depth: depth,
    tbottomThickness: tbottomThickness,
    tsurfaceThickness: tsurfaceThickness,
    tbottomPaddingTop: tbottomPaddingTop,
    tbottomPaddingBottom: tbottomPaddingBottom
  };

  this.width = width
  this.height = height
  this.depth = depth
  this.tsurfaceThickness = tsurfaceThickness || 0.1;
  this.tbottomThickness = tbottomThickness || 0.1;
  this.tbottomPaddingTop = tbottomPaddingTop || 0.0;
  this.tbottomPaddingBottom = tbottomPaddingBottom || 0.0;

  var scope = this, materialIndex = 0;;

  var width_half = width / 2;
  var height_half = height / 2;
  var depth_half = depth / 2;

  var tsurface_thickness_half = tsurfaceThickness / 2;

  var tbottomDimensionAndPositions = scope.getTbottomDimensionAndPositions( 1, 1, 1, 0.1, 0.1, 0.1 );
  var tsurfaceDimensionAndPosition = scope.getTsurfaceDimensionAndPosition( 1, 1, 1, 0.1, 0.1, 0.1 );

  tbottomDimensionAndPositions.forEach(function(dimensionAndPosition){
    buildCube(dimensionAndPosition.dimension, dimensionAndPosition.position, materialIndex)
    materialIndex++;
  });

  //tsurface
  buildCube(tsurfaceDimensionAndPosition.dimension, tsurfaceDimensionAndPosition.position, materialIndex);

  this.mergeVertices();

  this.update( width, height, depth, tsurfaceThickness, tbottomThickness, tbottomPaddingTop, tbottomPaddingBottom);

  this.computeFaceNormals();
  this.computeVertexNormals();

  function buildCube(dimension, pos, materialIndex) {
    scope.getCubeVertices(dimension, pos).forEach(function(planeVertices){
      planeVertices.push(materialIndex);
      buildPlane.apply(scope, planeVertices);
    })
  }

  function buildPlane(verticeA, verticeB, verticeC, verticeD, materialIndex){
    var offset = scope.vertices.length;
    scope.vertices.push( verticeA );
    scope.vertices.push( verticeB );
    scope.vertices.push( verticeC );
    scope.vertices.push( verticeD );
    var face1 = new THREE.Face3( offset +2 , offset +1, offset );
    var face2 = new THREE.Face3( offset, offset +3, offset + 2 );
    face1.materialIndex = materialIndex;
    face2.materialIndex = materialIndex;

    scope.faces.push( face1 );
    scope.faces.push( face2 );
  }
};

THREE.TableGeometry.prototype = Object.create( THREE.Geometry.prototype );
THREE.TableGeometry.prototype.constructor = THREE.TableGeometry;

THREE.TableGeometry.prototype.vertexNames = {

};

THREE.TableGeometry.prototype.update = function( width, height, depth, tsurfaceThickness, tbottomThickness, tbottomPaddingTop, tbottomPaddingBottom){
  this.width = width
  this.height = height
  this.depth = depth
  this.tsurfaceThickness = tsurfaceThickness || 0.1;
  this.tbottomThickness = tbottomThickness || 0.1;
  this.tbottomPaddingTop = tbottomPaddingTop || 0.0;
  this.tbottomPaddingBottom = tbottomPaddingBottom || 0.0;

  var scope = this;
  var tbottomDimensionAndPositions = this.getTbottomDimensionAndPositions( width, height, depth, tsurfaceThickness, tbottomThickness, tbottomPaddingTop );
  var tsurfaceDimensionAndPosition = this.getTsurfaceDimensionAndPosition( width, height, depth, tsurfaceThickness, tbottomThickness, tbottomPaddingTop );

  var newVertices = tbottomDimensionAndPositions.reduce(function(previous, dimensionAndPosition){
    return previous.concat.apply(previous, scope.getCubeVertices(dimensionAndPosition.dimension, dimensionAndPosition.position));
  }, []);

  newVertices = newVertices.concat.apply(newVertices, this.getCubeVertices(tsurfaceDimensionAndPosition.dimension, tsurfaceDimensionAndPosition.position));

  var mergedVertices = this.mergeAndReturnVertices(newVertices);
  var diff = tbottomPaddingTop - tbottomPaddingBottom

  // Front Right
  mergedVertices[4].x = mergedVertices[4].x + diff
  mergedVertices[4].z = mergedVertices[4].z + diff

  mergedVertices[5].x = mergedVertices[5].x + diff
  mergedVertices[5].z = mergedVertices[5].z + diff

  mergedVertices[6].x = mergedVertices[6].x + diff
  mergedVertices[6].z = mergedVertices[6].z + diff

  mergedVertices[7].x = mergedVertices[7].x + diff
  mergedVertices[7].z = mergedVertices[7].z + diff


  // Front left
  mergedVertices[10].x = mergedVertices[10].x - diff
  mergedVertices[10].z = mergedVertices[10].z + diff

  mergedVertices[11].x = mergedVertices[11].x - diff
  mergedVertices[11].z = mergedVertices[11].z + diff

  mergedVertices[14].x = mergedVertices[14].x - diff
  mergedVertices[14].z = mergedVertices[14].z + diff

  mergedVertices[15].x = mergedVertices[15].x - diff
  mergedVertices[15].z = mergedVertices[15].z + diff

  // back left
  mergedVertices[18].x = mergedVertices[18].x - diff
  mergedVertices[18].z = mergedVertices[18].z - diff

  mergedVertices[19].x = mergedVertices[19].x - diff
  mergedVertices[19].z = mergedVertices[19].z - diff

  mergedVertices[22].x = mergedVertices[22].x - diff
  mergedVertices[22].z = mergedVertices[22].z - diff

  mergedVertices[23].x = mergedVertices[23].x - diff
  mergedVertices[23].z = mergedVertices[23].z - diff

  // back right
  mergedVertices[26].x = mergedVertices[26].x + diff
  mergedVertices[26].z = mergedVertices[26].z - diff

  mergedVertices[27].x = mergedVertices[27].x + diff
  mergedVertices[27].z = mergedVertices[27].z - diff

  mergedVertices[30].x = mergedVertices[30].x + diff
  mergedVertices[30].z = mergedVertices[30].z - diff

  mergedVertices[31].x = mergedVertices[31].x + diff
  mergedVertices[31].z = mergedVertices[31].z - diff

  this.vertices.forEach(function(vertex, i){
    vertex.x = mergedVertices[i].x;
    vertex.y = mergedVertices[i].y;
    vertex.z = mergedVertices[i].z;
  });

  this.verticesNeedUpdate = true
}

THREE.TableGeometry.prototype.mergeAndReturnVertices = function(vertices){
  var verticesMap = {}; // Hashmap for looking up vertice by position coordinates (and making sure they are unique)
  var unique = [], changes = [];

  var v, key;
  var precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001
  var precision = Math.pow( 10, precisionPoints );
  var i, il, face;
  var indices, j, jl;

  for ( i = 0, il = vertices.length; i < il; i ++ ) {

    v = vertices[ i ];
    key = Math.round( v.x * precision ) + '_' + Math.round( v.y * precision ) + '_' + Math.round( v.z * precision );

    if ( verticesMap[ key ] === undefined ) {

      verticesMap[ key ] = i;
      unique.push( vertices[ i ] );
      changes[ i ] = unique.length - 1;

    } else {
      //console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
      changes[ i ] = changes[ verticesMap[ key ] ];

    }

  };

  var diff = vertices.length - unique.length;
  return unique;

}

THREE.TableGeometry.prototype.getCubeVertices = function(dimension, pos){
  var widthHalf = dimension.width/2;
  var heightHalf = dimension.height/2;
  var depthHalf = dimension.depth/2;

  return [
    //top plane
    [
      new THREE.Vector3(-widthHalf + pos.x,  heightHalf + pos.y, - depthHalf + pos.z)
    , new THREE.Vector3( widthHalf + pos.x,  heightHalf + pos.y, - depthHalf + pos.z)
    , new THREE.Vector3( widthHalf + pos.x,  heightHalf + pos.y,   depthHalf + pos.z)
    , new THREE.Vector3(-widthHalf + pos.x,  heightHalf + pos.y,   depthHalf + pos.z)
    ],
    //bottom plane
    [
      new THREE.Vector3(-widthHalf + pos.x, -heightHalf + pos.y,   depthHalf + pos.z)
    , new THREE.Vector3( widthHalf + pos.x, -heightHalf + pos.y,   depthHalf + pos.z)
    , new THREE.Vector3( widthHalf + pos.x, -heightHalf + pos.y, - depthHalf + pos.z)
    , new THREE.Vector3(-widthHalf + pos.x, -heightHalf + pos.y, - depthHalf + pos.z)
    ],
    //left plane
    [
      new THREE.Vector3(-widthHalf + pos.x,  heightHalf + pos.y, -depthHalf + pos.z)
    , new THREE.Vector3(-widthHalf + pos.x,  heightHalf + pos.y,  depthHalf + pos.z)
    , new THREE.Vector3(-widthHalf + pos.x, -heightHalf + pos.y,  depthHalf + pos.z)
    , new THREE.Vector3(-widthHalf + pos.x, -heightHalf + pos.y, -depthHalf + pos.z)
    ],
    // right plane
    [
        new THREE.Vector3(widthHalf + pos.x, -heightHalf + pos.y, -depthHalf + pos.z)
      , new THREE.Vector3(widthHalf + pos.x, -heightHalf + pos.y,  depthHalf + pos.z)
      , new THREE.Vector3(widthHalf + pos.x,  heightHalf + pos.y,  depthHalf + pos.z)
      , new THREE.Vector3(widthHalf + pos.x,  heightHalf + pos.y, -depthHalf + pos.z)
    ],
    // front plane
    [
        new THREE.Vector3(-widthHalf + pos.x,  heightHalf + pos.y,  depthHalf + pos.z)
      , new THREE.Vector3( widthHalf + pos.x,  heightHalf + pos.y,  depthHalf + pos.z)
      , new THREE.Vector3( widthHalf + pos.x, -heightHalf + pos.y,  depthHalf + pos.z)
      , new THREE.Vector3(-widthHalf + pos.x, -heightHalf + pos.y,  depthHalf + pos.z)
    ],
    // back plane
    [
        new THREE.Vector3(-widthHalf + pos.x, -heightHalf + pos.y, -depthHalf + pos.z)
      , new THREE.Vector3( widthHalf + pos.x, -heightHalf + pos.y, -depthHalf + pos.z)
      , new THREE.Vector3( widthHalf + pos.x,  heightHalf + pos.y, -depthHalf + pos.z)
      , new THREE.Vector3(-widthHalf + pos.x,  heightHalf + pos.y, -depthHalf + pos.z)
    ]
  ]
}

THREE.TableGeometry.prototype.getTsurfaceDimensionAndPosition = function( width, height, depth, tsurfaceThickness, tbottomThickness, tbottomPaddingTop ){
  return {
    dimension: {
      width: width,
      height: tsurfaceThickness,
      depth: depth
    },
    position: {
      x: 0,
      y: height/2 - tsurfaceThickness/2,
      z: 0
    }
  }
}

THREE.TableGeometry.prototype.getTbottomDimensionAndPositions = function( width, height, depth, tsurfaceThickness, tbottomThickness, tbottomPaddingTop ){
  return [
    //cube front left
    {
      dimension: {
        width: tbottomThickness,
        height: height - tsurfaceThickness,
        depth: tbottomThickness
      },
      position: {
        x: width/2 - tbottomThickness/2 - tbottomPaddingTop,
        y: -tsurfaceThickness/2,
        z: depth/2 - tbottomThickness/2 - tbottomPaddingTop
      }
    },
    // cube front middle
    {
      dimension: {
        width: width - tbottomThickness*2 - tbottomPaddingTop * 2,
        height: height - tsurfaceThickness,
        depth: tbottomThickness
      },
      position: {
        x: 0,
        y: -tsurfaceThickness/2,
        z: depth/2 - tbottomThickness/2 - tbottomPaddingTop
      }
    },
    // front right
    {
      dimension: {
        width: tbottomThickness,
        height: height - tsurfaceThickness,
        depth: tbottomThickness
      },
      position: {
        x: - (width/2 - tbottomThickness/2 - tbottomPaddingTop),
        y: - tsurfaceThickness/2,
        z: depth/2 - tbottomThickness/2 - tbottomPaddingTop
      }
    },
    // right middle
    {
      dimension: {
        width: tbottomThickness,
        height: height - tsurfaceThickness,
        depth: depth - 2 * tbottomThickness - 2 * tbottomPaddingTop
      },
      position: {
        x: - (width/2 - tbottomThickness/2 - tbottomPaddingTop),
        y: - tsurfaceThickness/2,
        z: 0
      }
    },
    // back right
    {
      dimension: {
        width: tbottomThickness,
        height: height - tsurfaceThickness,
        depth: tbottomThickness
      },
      position: {
        x: - (width/2 - tbottomThickness/2 - tbottomPaddingTop),
        y: - tsurfaceThickness/2,
        z: - (depth/2 - tbottomThickness/2 - tbottomPaddingTop)
      }
    },
    // back middle
    {
      dimension: {
        width: width - tbottomThickness*2 - tbottomPaddingTop * 2,
        height: height - tsurfaceThickness,
        depth: tbottomThickness
      },
      position: {
        x: 0,
        y: - tsurfaceThickness/2,
        z: - (depth/2 - tbottomThickness/2 - tbottomPaddingTop)
      }
    },
    // back left
    {
      dimension: {
        width: tbottomThickness,
        height: height - tsurfaceThickness,
        depth: tbottomThickness
      },
      position: {
        x: width/2 - tbottomThickness/2 - tbottomPaddingTop,
        y: - tsurfaceThickness/2,
        z: - ( depth/2 - tbottomThickness/2 - tbottomPaddingTop )
      }
    },
    // left middle
    {
      dimension: {
        width: tbottomThickness,
        height: height - tsurfaceThickness,
        depth: depth - 2 * tbottomThickness - 2 * tbottomPaddingTop
      },
      position: {
        x: (width/2 - tbottomThickness/2 - tbottomPaddingTop),
        y: - tsurfaceThickness/2,
        z: 0
      }
    }
  ]
}
