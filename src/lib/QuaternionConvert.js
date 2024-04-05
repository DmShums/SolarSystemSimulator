export function convertAxisToQuaternion(x, y, z, a) {
  const cos_a2 = Math.cos(a / 2);
  const sin_a2 = Math.sin(a / 2);

  const q_0 = cos_a2;
  const q_1 = x * sin_a2;
  const q_2 = y * sin_a2;
  const q_3 = z * sin_a2;

  return { q_0, q_1, q_2, q_3 };
}

export function convertQuaternionToAxis(quaternion) {
  const q_0 = quaternion.GetQ_0;
  const q_1 = quaternion.GetQ_1;
  const q_2 = quaternion.GetQ_2;
  const q_3 = quaternion.GetQ_3;

  let angle;
  let x;
  let y;
  let z;

  if (q_0 !== 1) {
    angle = 2 * (Math.cos(q_0) ^ -1);
    x = q_1 / Math.sin(angle / 2);
    y = q_2 / Math.sin(angle / 2);
    z = q_3 / Math.sin(angle / 2);
  } else {
    // identity quaternion, that will produce no rotation
    angle = 0;
    x = 1;
    y = 0;
    z = 0;
  }

  return { x, y, z, angle };
}

export function convertQuaternionToMatrix(quaternion) {
  const q_0 = quaternion.GetQ_0;
  const q_1 = quaternion.GetQ_1;
  const q_2 = quaternion.GetQ_2;
  const q_3 = quaternion.GetQ_3;

  const rotationMatrix = [
    [
      1 - 2 * q_2 * q_2 - 2 * q_3 * q_3,
      2 * q_1 * q_2 - 2 * q_0 * q_3,
      2 * q_1 * q_3 + 2 * q_0 * q_2,
    ],
    [
      2 * q_1 * q_2 + 2 * q_0 * q_3,
      1 - 2 * q_1 * q_1 - 2 * q_3 * q_3,
      2 * q_2 * q_3 - 2 * q_0 * q_1,
    ],
    [
      2 * q_1 * q_3 - 2 * q_0 * q_2,
      2 * q_2 * q_3 + 2 * q_0 * q_1,
      1 - 2 * q_1 * q_1 - 2 * q_2 * q_2,
    ],
  ];

  return rotationMatrix;
}

export function convertMatrixToQuaternion(matrix) {
  let q_0 = Math.sqrt(1 + matrix[0][0] + matrix[1][1] + matrix[2][2]) / 2;
  let q_1 = Math.sqrt(1 + matrix[0][0] - matrix[1][1] - matrix[2][2]) / 2;
  let q_2 = Math.sqrt(1 - matrix[0][0] + matrix[1][1] - matrix[2][2]) / 2;
  let q_3 = Math.sqrt(1 - matrix[0][0] - matrix[1][1] + matrix[2][2]) / 2;

  const largest = Math.max(q_0, q_1, q_2, q_3);

  if (q_0 === largest) {
    q_1 = (matrix[1][2] - matrix[2][1]) / (4 * q_0);
    q_2 = (matrix[2][0] - matrix[0][2]) / (4 * q_0);
    q_3 = (matrix[0][1] - matrix[1][0]) / (4 * q_0);
  } else if (q_1 === largest) {
    q_0 = (matrix[1][2] - matrix[2][1]) / (4 * q_1);
    q_2 = (matrix[0][1] + matrix[1][0]) / (4 * q_1);
    q_3 = (matrix[2][0] + matrix[0][2]) / (4 * q_1);
  } else if (q_2 === largest) {
    q_0 = (matrix[2][0] - matrix[0][2]) / (4 * q_2);
    q_1 = (matrix[0][1] + matrix[1][0]) / (4 * q_2);
    q_3 = (matrix[1][2] + matrix[2][1]) / (4 * q_2);
  } else {
    q_0 = (matrix[0][1] - matrix[1][0]) / (4 * q_3);
    q_1 = (matrix[2][0] + matrix[0][2]) / (4 * q_3);
    q_2 = (matrix[1][2] + matrix[2][1]) / (4 * q_3);
  }

  const length = Math.sqrt(q_0 * q_0 + q_1 * q_1 + q_2 * q_2 + q_3 * q_3);
  q_0 /= length;
  q_1 /= length;
  q_2 /= length;
  q_3 /= length;

  return { q_0, q_1, q_2, q_3 };
}

export function convertEulerToQuaternion(euler) {
  const x = euler.GetX;
  const y = euler.GetY;
  const z = euler.GetZ;

  const cx = Math.cos((x * Math.PI) / 180 / 2);
  const sx = Math.sin((x * Math.PI) / 180 / 2);
  const cy = Math.cos((y * Math.PI) / 180 / 2);
  const sy = Math.sin((y * Math.PI) / 180 / 2);
  const cz = Math.cos((z * Math.PI) / 180 / 2);
  const sz = Math.sin((z * Math.PI) / 180 / 2);

  const w = cx * cy * cz + sx * sy * sz;
  const quaternionX = sx * cy * cz - cx * sy * sz;
  const quaternionY = cx * sy * cz + sx * cy * sz;
  const quaternionZ = cx * cy * sz - sx * sy * cz;

  return { quaternionX, quaternionY, quaternionZ, w };
}
