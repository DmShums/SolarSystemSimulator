import * as THREE from 'three';

const euler = new THREE.Euler( 0, 1, 1.57, 'XYZ' );
const vector = new THREE.Vector3( 1, 0, 1 );
vector.applyEuler(euler);

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

// animation

function animation( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}

class Vector3
{
    constructor(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get GetX(){return this.x;}
    get GetY(){return this.y;}
    get GetZ(){return this.z;}

    set SetX(newX){this.x = newX;}
    set SetY(newY){this.y = newY;}
    set SetZ(newZ){this.z = newZ;}
}

class Euler {
    constructor(x, y, z, order) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.order = order;
    }
    get GetX(){return this.x;}
    get GetY(){return this.y;}
    get GetZ(){return this.z;}
    get GetOrder(){return this.order;}

    set SetX(newX){this.x = newX;}
    set SetY(newY){this.y = newY;}
    set SetZ(newZ){this.z = newZ;}
    set SetOrder(newOrder){this.order = Order;}

    // .copy ( euler : Euler ) : this
    // .clone () : Euler
    // .equals ( euler : Euler ) : Boolean
    // .fromArray ( array : Array ) : this
    // .reorder ( newOrder : String ) : this

    set(x, y, z, order)
    {
        this.SetX(x);
        this.SetY(y);
        this.SetZ(z);
        this.SetOrder(order);
    }

    setFromRotationMatrix(m, order)
    {
        
    }

    setFromQuaternion(q, order, update)
    {
        
    }

    setFromVector3(v, order)
    {
        this.set(v.x, v.y, v.z, order);
    }

    toArray()
    {
        return [this.x, this.y, this.z, this.order]
    }
}