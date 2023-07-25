import { BaseCustomUniforms } from '../types/interfaces';
import { Vector3 } from 'three';
import GUI from 'lil-gui';

let guiSavedData = {};
let gui: GUI | any;
let uniforms: BaseCustomUniforms;

const globeParams = {
    strokeCol: new Vector3(),
    atmCol: new Vector3(),
    atmColor: new Vector3(),
}

const localSave = {
    savePreset() {
        console.log(gui);
        guiSavedData = gui.save();
        localStorage.setItem('gui', JSON.stringify(guiSavedData));
    },
    loadPreset() {
        const savedData = JSON.parse(localStorage.getItem('gui')!);
        gui.load(savedData);
    }
}

export function saveGui(_gui: GUI) {
    gui = _gui;
    gui.add(localSave, 'savePreset');
    gui.add(localSave, 'loadPreset');
    localSave.loadPreset();
}

function setup_gui(_uniforms: BaseCustomUniforms) {
    uniforms = _uniforms;
    gui = new GUI();

    gui.addFolder("Globe");
    gui.children[0].add(uniforms.fresn, 'value', -1, 3);
    gui.children[0].addColor(globeParams, 'strokeCol').onChange((e: any) => {
        uniforms.strokeColor.value = new Vector3(e.r, e.g, e.b);
    });
    gui.children[0].addColor(globeParams, 'atmCol').onChange((e: any) => {
        uniforms.atmosphereColor.value = new Vector3(e.r, e.g, e.b);
    });

    gui.children[0].add(uniforms.alpha, 'value', 0, 1).name("Alpha");
    gui.children[0].add(uniforms.ballDensity, 'value', 0, 200).name("Points");
    gui.children[0].add(uniforms.radius, 'value', 0, 1).name("Radius");
    gui.children[0].close();

    gui.addFolder("Atmosphere");
    gui.children[1].addColor(globeParams, 'atmColor').onChange((e: any) => {
        uniforms.atmAtmosphereColor.value = new Vector3(e.r, e.g, e.b);
    });

    gui.children[1].add(uniforms.atmFresn, 'value', 0, 3).name("Fresnel");
    gui.children[1].add(uniforms.atmAlpha, 'value', 0, 1).name("Alpha");
    gui.children[1].close();
    gui.close();

    //close folders
    // gui.children.forEach((e: any) => {
    //     if (typeof e.name == 'undefined')
    //         e.close();
    // });
    saveGui(gui);
    // gui.close();
}

export { setup_gui }