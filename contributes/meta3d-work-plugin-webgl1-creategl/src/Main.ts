import { workPluginContribute } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType";
import { execFunc as execCreateGL } from "./jobs/init/CreateGLJob";
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-work-plugin-webgl1-creategl-protocol/src/DependentMapType";
import { config } from "meta3d-work-plugin-webgl1-creategl-protocol/src/ConfigType";
import { state, states, workPluginName } from "meta3d-work-plugin-webgl1-creategl-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "create_gl_webgl1_creategl_meta3d":
			return execCreateGL;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, workPluginContribute<config, state, states>> = (api, dependentMapData) => {
	let {
		meta3dWebgl1ExtensionName,
		meta3dBsMostExtensionName
	} = dependentMapData[0]

	return {
		workPluginName: workPluginName,
		createStateFunc: (meta3dState, { canvas }) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, meta3dBsMostExtensionName),
				webgl1Service: api.getExtensionService<webgl1Service>(meta3dState, meta3dWebgl1ExtensionName),
				canvas: canvas,
				gl: null
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_webgl1_creategl_meta3d",
						link: "concat",
						elements: [
							{
								"name": "create_gl_webgl1_creategl_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_creategl_meta3d"
			}
		],
	}
}