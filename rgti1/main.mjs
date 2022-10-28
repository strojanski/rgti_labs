import { Renderer } from './Renderer.mjs';
import { Node } from './Node.mjs';

const input = document.querySelector('textarea');
const canvas = document.querySelector('canvas');
const renderer = new Renderer(canvas.getContext('2d'));

const rotX = document.getElementById("rotationX")
const rotY = document.getElementById("rotationY")
const translateX = document.getElementById("translationX");
const translateY = document.getElementById("translationY");
const scaleX = document.getElementById("scaleX");
const scaleY = document.getElementById("scaleY");

const camera = new Node();
camera.perspective = 1;

const model = new Node();
model.vertices = [];
model.indices = [];

input.addEventListener('change', e => {
    const scene = JSON.parse(input.value);

    camera.translation = [...scene.camera.translation];
    camera.rotation = [...scene.camera.rotation];
    camera.perspective = scene.camera.perspective;

    model.translation = [...scene.model.translation];
    model.rotation = [...scene.model.rotation];
    model.scale = [...scene.model.scale];

    model.vertices = [...scene.vertices];
    model.indices = [...scene.indices];

    rotX.value = model.rotation[0] * 10;
    rotY.value = model.rotation[1] * 10;
    translateX.value = model.translation[0] * 10;
    translateY.value = model.translation[1] * 10;
    scaleX.value = model.scale[0] * 10;
    scaleY.value = model.scale[1] * 10;

    renderer.render(camera, model);
});

rotX.addEventListener("change", (e) => {
    updateModel();
    renderer.render(camera, model);
});

rotY.addEventListener("change", (e) => {
    updateModel();
    renderer.render(camera, model);
});

translateX.addEventListener("change", (e) => {
    updateModel();
    renderer.render(camera, model);
});

translateY.addEventListener("change", (e) => {
    updateModel();
    renderer.render(camera, model);
});

scaleX.addEventListener("change", (e) => {
    updateModel();
    renderer.render(camera, model);
});

scaleY.addEventListener("change", (e) => {
    updateModel();
    renderer.render(camera, model);
});

function updateModel() {
    model.rotation[0] = rotX.value/10;
    model.rotation[1] = rotY.value/10;
    model.translation[0] = translateX.value/10;
    model.translation[1] = translateY.value/10;
    model.scale[0] = scaleX.value/10;
    model.scale[1] = scaleY.value/10;
}

