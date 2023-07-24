import { Texture } from "three";

export interface BaseCustomUniforms {
    time: { value: number };
    base: { value: Texture };
}
