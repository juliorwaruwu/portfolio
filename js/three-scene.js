// =============================
// SCENE
// =============================

const scene = new THREE.Scene();

// =============================
// CAMERA
// =============================

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 15;

// =============================
// RENDERER
// =============================

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

document
  .getElementById("bg")
  .appendChild(renderer.domElement);

// =============================
// LIGHTS
// =============================

const ambientLight =
  new THREE.AmbientLight(
    0xffffff,
    1.2
  );

scene.add(ambientLight);

const pointLight =
  new THREE.PointLight(
    0x00e5ff,
    4
  );

pointLight.position.set(
  10,
  10,
  10
);

scene.add(pointLight);

// =============================
// MAIN SPHERE
// =============================

const sphereGeometry =
  new THREE.IcosahedronGeometry(
    4,
    2
  );

const sphereMaterial =
  new THREE.MeshStandardMaterial({

    color: 0x00e5ff,

    wireframe: true,

    transparent: true,

    opacity: 0.8,

    emissive: 0x00e5ff,

    emissiveIntensity: 0.5

  });

const sphere =
  new THREE.Mesh(
    sphereGeometry,
    sphereMaterial
  );

scene.add(sphere);

// =============================
// OUTER ORBIT
// =============================

const orbitGeometry =
  new THREE.TorusGeometry(
    6,
    0.05,
    16,
    100
  );

const orbitMaterial =
  new THREE.MeshBasicMaterial({

    color: 0x8b5cf6

  });

const orbit =
  new THREE.Mesh(
    orbitGeometry,
    orbitMaterial
  );

orbit.rotation.x =
  Math.PI / 2;

scene.add(orbit);

// =============================
// PARTICLES
// =============================

const particleCount = 2000;

const particleGeometry =
  new THREE.BufferGeometry();

const particlePositions = [];

for(let i = 0; i < particleCount; i++){

  particlePositions.push(
    (Math.random() - 0.5) * 120
  );

  particlePositions.push(
    (Math.random() - 0.5) * 120
  );

  particlePositions.push(
    (Math.random() - 0.5) * 120
  );

}

particleGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(
    particlePositions,
    3
  )
);

const particleMaterial =
  new THREE.PointsMaterial({

    color: 0x00e5ff,

    size: 0.06,

    transparent: true,

    opacity: 0.8

  });

const particles =
  new THREE.Points(
    particleGeometry,
    particleMaterial
  );

scene.add(particles);

// =============================
// FLOATING NODES
// =============================

const nodes = [];

for(let i = 0; i < 40; i++){

  const geometry =
    new THREE.SphereGeometry(
      0.12,
      16,
      16
    );

  const material =
    new THREE.MeshBasicMaterial({

      color: 0xffffff

    });

  const node =
    new THREE.Mesh(
      geometry,
      material
    );

  const radius =
    8 + Math.random() * 3;

  const angle =
    Math.random() * Math.PI * 2;

  node.position.x =
    Math.cos(angle) * radius;

  node.position.z =
    Math.sin(angle) * radius;

  node.position.y =
    (Math.random() - 0.5) * 8;

  scene.add(node);

  nodes.push(node);

}

// =============================
// MOUSE
// =============================

let mouseX = 0;
let mouseY = 0;

window.addEventListener(
  "mousemove",
  (event)=>{

    mouseX =
      (event.clientX /
      window.innerWidth) * 2 - 1;

    mouseY =
      -(event.clientY /
      window.innerHeight) * 2 + 1;

  }
);

// =============================
// ANIMATION
// =============================

const clock =
  new THREE.Clock();

function animate(){

  requestAnimationFrame(
    animate
  );

  const elapsed =
    clock.getElapsedTime();

  // Main sphere

  sphere.rotation.x += 0.002;
  sphere.rotation.y += 0.003;

  // Orbit

  orbit.rotation.z += 0.002;

  // Particles

  particles.rotation.y += 0.0005;

  // Floating motion

  sphere.position.y =
    Math.sin(elapsed) * 0.3;

  orbit.position.y =
    Math.sin(elapsed) * 0.3;

  // Mouse interaction

  camera.position.x +=
    (
      mouseX * 3 -
      camera.position.x
    ) * 0.03;

  camera.position.y +=
    (
      mouseY * 3 -
      camera.position.y
    ) * 0.03;

  camera.lookAt(
    scene.position
  );

  // Nodes orbit

  nodes.forEach(
    (node,index)=>{

      node.rotation.x += 0.01;
      node.rotation.y += 0.01;

      node.position.y +=
        Math.sin(
          elapsed + index
        ) * 0.002;

    }
  );

  renderer.render(
    scene,
    camera
  );

}

animate();

// =============================
// RESIZE
// =============================

window.addEventListener(
  "resize",
  ()=>{

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);