import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-work-plugin-webgl1-creategl-protocol/src/StateType";
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"

function _createGL({ getContext }: webgl1Service, canvas: HTMLCanvasElement) {
	return getContext(canvas, {
		alpha: true,
		antialias: true,
		depth: true,
		failIfMajorPerformanceCaveat: false,
		powerPreference: "default",
		premultipliedAlpha: true,
		preserveDrawingBuffer: false,
		stencil: false,
		desynchronized: false
	})
}

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, canvas } = getState(states)

	return mostService.callFunc(() => {
		let gl = _createGL(webgl1Service, canvas)

		console.log("create gl job->gl:", gl);

		return setStatesFunc<states>(
			engineCoreState,
			setState(states,
				{
					...getState(states),
					gl: gl
				}
			)
		)
	})
}