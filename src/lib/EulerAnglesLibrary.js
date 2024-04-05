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

class Euler {
  constructor(x, y, z, order) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.order = order;
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
  get GetOrder() {
    return this.order;
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
  set SetOrder(newOrder) {
    this.order = Order;
  }

  // .copy ( euler : Euler ) : this
  // .clone () : Euler
  // .equals ( euler : Euler ) : Boolean
  // .fromArray ( array : Array ) : this
  // .reorder ( newOrder : String ) : this

  set(x, y, z, order) {
    this.SetX(x);
    this.SetY(y);
    this.SetZ(z);
    this.SetOrder(order);
  }

  setFromRotationMatrix(m, order) {}

  setFromQuaternion(q, order, update) {}

  setFromVector3(v, order) {
    this.set(v.x, v.y, v.z, order);
  }

  toArray() {
    return [this.x, this.y, this.z, this.order];
  }
}
