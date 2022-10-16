import { Renderer } from './Renderer.mjs';
import { Node } from './Node.mjs';

const input = document.querySelector('textarea');
const canvas = document.querySelector('canvas');
const renderer = new Renderer(canvas.getContext('2d'));

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

    renderer.render(camera, model);
});
