import * as THREE from 'three';

export function segment(length, radius, radialDecrease, xAngle, yAngle, zAngle, lengthDecrease, color, texture, prevLength) {

  let geometry = new THREE.CylinderGeometry(radius * radialDecrease, radius, length, radius*200, radius * 200);
  let geometry2 = new THREE.CylinderGeometry(radius * radialDecrease, radius*0.85, length, radius*50, radius*50, true);
  geometry.translate(0, length/2, 0);
  geometry2.translate(0, length/2, 0);

  if (texture) {
    let vertices = geometry.attributes.position.array;

    for (let i = 0; i < vertices.length; i++) {
      if (vertices[i] === 10 || vertices[i] === -10) {
        continue;
      }
      let randAmount = Math.random()/100;
      if (Math.random() > .5) {
        vertices[i] += randAmount;
      } else {
        vertices[i] -= randAmount;
        if (vertices[i] < 0.01) {
        }
      }
    }
  }

  let material = new THREE.MeshPhongMaterial({color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`, dithering: true, flatShading: true, precision: 'lowp'});
  let cylinder = new THREE.Mesh(geometry, material);
  let cylinder2 = new THREE.Mesh(geometry2, material);

  cylinder.rotation.x = (xAngle * Math.PI/180);
  cylinder.rotation.y = (yAngle * Math.PI/180);
  cylinder.rotation.z = (zAngle * Math.PI/180);
  cylinder2.rotation.y = cylinder.rotation.y * 1.2;

  let sphereGeometry = new THREE.SphereGeometry(radius*radialDecrease, radius * 80, radius*80);

  if (texture) {
    let sphereVertices = sphereGeometry.attributes.position.array;

    for (let i = 0; i < sphereVertices.length; i++) {

      let randAmount = Math.random()/100;
      if (Math.random() > .5) {
        sphereVertices[i] += randAmount;
      } else {
        sphereVertices[i] -= randAmount;
      }
    }
  }

  let sphere = new THREE.Mesh(sphereGeometry, material);
  sphere.position.set(0, length, 0);
  cylinder.add(sphere);

  cylinder.position.set(0, prevLength, 0);

  if (texture) {
    cylinder.add(cylinder2);
  }

  return cylinder;
}
