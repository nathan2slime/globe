import { Texture, Vector3 } from "three";

export interface BaseCustomUniforms {
    time: { value: number };
    base: { value: Texture };
    _texture: { value: Texture };
    fresn: {value: 0};
    strokeColor: {value: Vector3};
    atmosphereColor: {value: Vector3};
    alpha: {value: 0};
    ballDensity: {value: 0};
    radius: {value: 0}

    // atm
    atmFresn: {value: 0};
    atmAtmosphereColor: {value: Vector3};
    atmAlpha: {value: 0};
    
}
