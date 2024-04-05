// import * as THREE from 'three';

// const quaternion = new THREE.Quaternion();
// quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );

// const vector = new THREE.Vector3( 1, 0, 0 );
// vector.applyQuaternion( quaternion );

// // import * as THREE from 'three';

// const width = window.innerWidth, height = window.innerHeight;

// // init

// const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
// camera.position.z = 1;

// const scene = new THREE.Scene();

// const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
// const material = new THREE.MeshNormalMaterial();

// const mesh = new THREE.Mesh( geometry, material );
// scene.add( mesh );

// const renderer = new THREE.WebGLRenderer( { antialias: true } );
// renderer.setSize( width, height );
// renderer.setAnimationLoop( animation );
// document.body.appendChild( renderer.domElement );

// // animation

// function animation( time ) {

// 	mesh.rotation.x = time / 2000;
// 	mesh.rotation.y = time / 1000;

// 	renderer.render( scene, camera );

// }

// class Vector3
// {
//     constructor(x, y, z)
//     {
//         this.x = x;
//         this.y = y;
//         this.z = z;
//     }
//     get GetX(){return this.x;}
//     get GetY(){return this.y;}
//     get GetZ(){return this.z;}

//     set SetX(newX){this.x = newX;}
//     set SetY(newY){this.y = newY;}
//     set SetZ(newZ){this.z = newZ;}
// }
// export class RotationQuaternion
// {
//     constructor(x, y, z, a)
//     {
//         cos_a2 = Math.cos(a/2);
//         sin_a2 = Math.sin(a/2);

//         this.q_0 = cos_a2;
//         this.q_1 = x * sin_a2;
//         this.q_2 = y * sin_a2;
//         this.q_3 = z * sin_a2;
//     }
//     static ConstructQuaternionFromAxes(q_0, q_1, q_2, q_3)
//     {
//         newQuaternion = new RotationQuaternion(0,0,0,0);
//         newQuaternion.SetQ_0(q_0);
//         newQuaternion.SetQ_1(q_1);
//         newQuaternion.SetQ_2(q_2);
//         newQuaternion.SetQ_3(q_3);
//         return newQuaternion;
//     }
//     //possible support for construction from Euler
//     //possible support for construction from matrix

//     get GetQ_0()
//     {
//         return this.q_0;
//     }
//     get GetQ_1()
//     {
//         return this.q_1;
//     }
//     get GetQ_2()
//     {
//         return this.q_2;
//     }
//     get GetQ_3()
//     {
//         return this.q_3;
//     }

//     set SetQ_0(newq_0)
//     {
//         this.q_0 = newq_0;
//     }
//     set SetQ_1(newq_1)
//     {
//         this.q_1 = newq_1;
//     }
//     set SetQ_2(newq_2)
//     {
//         this.q_2 = newq_2;
//     }
//     set SetQ_3(newq_3)
//     {
//         this.q_0 = newq_3;
//     }

//     PostMultiply(anotherQuaternion)
//     {
//         t_0 = (this.q_0*anotherQuaternion.GetQ_0() - this.q_1*anotherQuaternion.GetQ_1() - this.q_2*anotherQuaternion.GetQ_2() - this.q_3*anotherQuaternion.GetQ_3());
//         t_1 = (this.q_0*anotherQuaternion.GetQ_1() + this.q_1*anotherQuaternion.GetQ_0() - this.q_2*anotherQuaternion.GetQ_3() + this.q_3*anotherQuaternion.GetQ_2());
//         t_2 = (this.q_0*anotherQuaternion.GetQ_2() + this.q_1*anotherQuaternion.GetQ_3() + this.q_2*anotherQuaternion.GetQ_0() - this.q_3*anotherQuaternion.GetQ_1());
//         t_3 = (this.q_0*anotherQuaternion.GetQ_3() - this.q_1*anotherQuaternion.GetQ_2() + this.q_2*anotherQuaternion.GetQ_1() + this.q_3*anotherQuaternion.GetQ_0());
//         return RotationQuaternion.ConstructQuaternionFromAxes(t_0, t_1, t_2, r_3);
//     }

//     PreMultiply(anotherQuaternion)
//     {
//         t_0 = (this.q_0*anotherQuaternion.GetQ_0() - this.q_1*anotherQuaternion.GetQ_1() - this.q_2*anotherQuaternion.GetQ_2() - this.q_3*anotherQuaternion.GetQ_3());
//         t_1 = (this.q_1*anotherQuaternion.GetQ_0() + this.q_0*anotherQuaternion.GetQ_1() - this.q_3*anotherQuaternion.GetQ_2() + this.q_2*anotherQuaternion.GetQ_3());
//         t_2 = (this.q_2*anotherQuaternion.GetQ_0() + this.q_3*anotherQuaternion.GetQ_1() + this.q_0*anotherQuaternion.GetQ_2() - this.q_1*anotherQuaternion.GetQ_3());
//         t_3 = (this.q_3*anotherQuaternion.GetQ_0() - this.q_2*anotherQuaternion.GetQ_1() + this.q_1*anotherQuaternion.GetQ_2() + this.q_0*anotherQuaternion.GetQ_3());
//         return RotationQuaternion.ConstructQuaternionFromAxes(t_0, t_1, t_2, r_3);
//     }

//     GetInverse()
//     {
//         return RotationQuaternion.ConstructQuaternionFromAxes(this.q_0, -this.q_1, -this.q_2, -this.q_3);
//     }

//     RotateVectorActive(vectorToRotate)
//     {
//         vectorAsQuat = RotationQuaternion.ConstructQuaternionFromAxes(0, vectorToRotate.GetX(), vectorToRotate.GetY(), vectorToRotate.GetZ());
//         inverseQuat = this.GetInverse();
//         result = inverseQuat.PostMultiply(vectorAsQuat).PostMultiply(this);

//         return new Vector3(result.GetQ_1(), result.GetQ_2(), result.GetQ_3())
//     }

//     RotateVectorPassive(vectorToRotate)
//     {
//         vectorAsQuat = RotationQuaternion.ConstructQuaternionFromAxes(0, vectorToRotate.GetX(), vectorToRotate.GetY(), vectorToRotate.GetZ());
//         inverseQuat = this.GetInverse();
//         result = this.PostMultiply(vectorAsQuat).PostMultiply(inverseQuat);

//         return new Vector3(result.GetQ_1(), result.GetQ_2(), result.GetQ_3())
//     }

//     ApplyToThreeObject(threeObject)
//     {
//         threeQuat = THREE.Quaternion(this.q_0, this.q_1, this.q_2, this.q_3);

//         threeObject.applyQuaternion(threeQuat);
//     }
// }

import * as THREE from "three";

class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  get GetX() {
    return this.x;
  }
  get GetY() {
    return this.y;
  }
  get GetZ() {
    return this.z;
  }

  set SetX(newX) {
    this.x = newX;
  }
  set SetY(newY) {
    this.y = newY;
  }
  set SetZ(newZ) {
    this.z = newZ;
  }
}

export class RotationQuaternion {
  constructor(x, y, z, a) {
    const cos_a2 = Math.cos(a / 2);
    const sin_a2 = Math.sin(a / 2);

    this.q_0 = cos_a2;
    this.q_1 = x * sin_a2;
    this.q_2 = y * sin_a2;
    this.q_3 = z * sin_a2;
  }

  static ConstructQuaternionFromAxes(q_0, q_1, q_2, q_3) {
    const newQuaternion = new RotationQuaternion(0, 0, 0, 0);
    newQuaternion.SetQ_0(q_0);
    newQuaternion.SetQ_1(q_1);
    newQuaternion.SetQ_2(q_2);
    newQuaternion.SetQ_3(q_3);
    return newQuaternion;
  }

  get GetQ_0() {
    return this.q_0;
  }
  get GetQ_1() {
    return this.q_1;
  }
  get GetQ_2() {
    return this.q_2;
  }
  get GetQ_3() {
    return this.q_3;
  }

  set SetQ_0(newq_0) {
    this.q_0 = newq_0;
  }
  set SetQ_1(newq_1) {
    this.q_1 = newq_1;
  }
  set SetQ_2(newq_2) {
    this.q_2 = newq_2;
  }
  set SetQ_3(newq_3) {
    this.q_3 = newq_3;
  }

  PostMultiply(anotherQuaternion) {
    const t_0 =
      this.q_0 * anotherQuaternion.GetQ_0() -
      this.q_1 * anotherQuaternion.GetQ_1() -
      this.q_2 * anotherQuaternion.GetQ_2() -
      this.q_3 * anotherQuaternion.GetQ_3();
    const t_1 =
      this.q_0 * anotherQuaternion.GetQ_1() +
      this.q_1 * anotherQuaternion.GetQ_0() -
      this.q_2 * anotherQuaternion.GetQ_3() +
      this.q_3 * anotherQuaternion.GetQ_2();
    const t_2 =
      this.q_0 * anotherQuaternion.GetQ_2() +
      this.q_1 * anotherQuaternion.GetQ_3() +
      this.q_2 * anotherQuaternion.GetQ_0() -
      this.q_3 * anotherQuaternion.GetQ_1();
    const t_3 =
      this.q_0 * anotherQuaternion.GetQ_3() -
      this.q_1 * anotherQuaternion.GetQ_2() +
      this.q_2 * anotherQuaternion.GetQ_1() +
      this.q_3 * anotherQuaternion.GetQ_0();
    return RotationQuaternion.ConstructQuaternionFromAxes(t_0, t_1, t_2, t_3);
  }

  PreMultiply(anotherQuaternion) {
    const t_0 =
      this.q_0 * anotherQuaternion.GetQ_0() -
      this.q_1 * anotherQuaternion.GetQ_1() -
      this.q_2 * anotherQuaternion.GetQ_2() -
      this.q_3 * anotherQuaternion.GetQ_3();
    const t_1 =
      this.q_1 * anotherQuaternion.GetQ_0() +
      this.q_0 * anotherQuaternion.GetQ_1() -
      this.q_3 * anotherQuaternion.GetQ_2() +
      this.q_2 * anotherQuaternion.GetQ_3();
    const t_2 =
      this.q_2 * anotherQuaternion.GetQ_0() +
      this.q_3 * anotherQuaternion.GetQ_1() +
      this.q_0 * anotherQuaternion.GetQ_2() -
      this.q_1 * anotherQuaternion.GetQ_3();
    const t_3 =
      this.q_3 * anotherQuaternion.GetQ_0() -
      this.q_2 * anotherQuaternion.GetQ_1() +
      this.q_1 * anotherQuaternion.GetQ_2() +
      this.q_0 * anotherQuaternion.GetQ_3();
    return RotationQuaternion.ConstructQuaternionFromAxes(t_0, t_1, t_2, t_3);
  }

  GetInverse() {
    return RotationQuaternion.ConstructQuaternionFromAxes(
      this.q_0,
      -this.q_1,
      -this.q_2,
      -this.q_3
    );
  }

  RotateVectorActive(vectorToRotate) {
    const vectorAsQuat = RotationQuaternion.ConstructQuaternionFromAxes(
      0,
      vectorToRotate.GetX(),
      vectorToRotate.GetY(),
      vectorToRotate.GetZ()
    );
    const inverseQuat = this.GetInverse();
    const result = inverseQuat.PostMultiply(vectorAsQuat).PostMultiply(this);

    return new Vector3(result.GetQ_1(), result.GetQ_2(), result.GetQ_3());
  }

  RotateVectorPassive(vectorToRotate) {
    const vectorAsQuat = RotationQuaternion.ConstructQuaternionFromAxes(
      0,
      vectorToRotate.GetX(),
      vectorToRotate.GetY(),
      vectorToRotate.GetZ()
    );
    const inverseQuat = this.GetInverse();
    const result = this.PostMultiply(vectorAsQuat).PostMultiply(inverseQuat);

    return new Vector3(result.GetQ_1(), result.GetQ_2(), result.GetQ_3());
  }

  ApplyToThreeObject(threeObject) {
    const threeQuat = new THREE.Quaternion(
      this.q_1,
      this.q_2,
      this.q_3,
      this.q_0
    );
    threeObject.applyQuaternion(threeQuat);
  }
}
