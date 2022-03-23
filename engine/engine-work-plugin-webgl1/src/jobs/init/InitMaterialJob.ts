import { execFunc as execFuncType } from "../../Type";
import { getState } from "../Utils";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { initMaterialUtils } from "engine-work-plugin-webgl1-utils/src/utils/InitMaterialJobUtils";
import { states } from "engine-work-plugin-webgl1-protocol";
import { componentName, pbrMaterial } from "../../../../../component_protocols/meta3d-component-pbrmaterial-protocol/src/Index";

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, engineCoreService, gl, material } = getState(states)

	return mostService.callFunc(() => {
		console.log("init webgl job init material job exec");

		gl = getExn(gl);

		let programMap = getExn(material.programMap);

		let usedPBRMaterialContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName)
		let allMaterialIndices = engineCoreService.getAllComponents<pbrMaterial>(usedPBRMaterialContribute)

		let newProgramMap = initMaterialUtils(webgl1Service, gl, programMap, allMaterialIndices);

		return setStatesFunc(engineCoreState, {
			...states,
			"engine-work-plugin-webgl1": {
				...getState(states),
				material: {
					programMap: newProgramMap
				}
			}
		})
	})
}