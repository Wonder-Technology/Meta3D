import { pipelineContribute } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execUpdateCamera } from "./jobs/update/UpdateCameraJob";
import { state, states, pipelineName, allPipelineData, job } from "meta3d-pipeline-camera-sceneview-protocol/src/StateType";
import { config } from "meta3d-pipeline-camera-sceneview-protocol/src/ConfigType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case job.UpdateCamera:
			return execUpdateCamera;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D<pipelineContribute<config, state>> = (api) => {
	return {
		pipelineName: pipelineName,
		createStateFunc: (meta3dState, { isDebug }) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, "meta3d-bs-most-protocol"),
				engineCoreService: api.getExtensionService<engineCoreService>(meta3dState, "meta3d-engine-core-sceneview-protocol"),
				isDebug
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: allPipelineData,
	}
}