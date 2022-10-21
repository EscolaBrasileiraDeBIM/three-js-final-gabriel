import { 
    Scene, 
    PerspectiveCamera, 
    WebGLRenderer,
    AmbientLight,
    DirectionalLight,
    GridHelper,
    AxesHelper
} from "three";

import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls";


const scene = new Scene();

const sizes = {
    width: window.innerWidth,
    heigth: window.innerHeight,
}

const camera = new PerspectiveCamera(75, sizes.width / sizes.heigth);
camera.position.set(15, 14, 8);
camera.lookAt(0, 0, 0);

const canvas = document.getElementById("empty-model-canvas");
const renderer = new WebGLRenderer({
    canvas,
    alpha: true
});
renderer.setSize(sizes.width, sizes.heigth);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const lightColor = 0xffffff;
const ambientLight = new AmbientLight(lightColor, 1);
scene.add(ambientLight);

const dirLight1 = new DirectionalLight(lightColor, 1);
dirLight1.position.set(0.75, 1, 0.5);
scene.add(dirLight1);

const grid = new GridHelper(50, 50);
scene.add(grid);

const axes = new AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 1;
scene.add(axes);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.heigth = window.innerHeight;
    camera.aspect = sizes.width / sizes.heigth;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.heigth);
});