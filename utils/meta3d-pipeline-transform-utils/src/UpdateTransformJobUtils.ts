import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { transform, update } from "meta3d-component-transform-protocol-common"
import { componentName, dataName } from "meta3d-component-transform-protocol";

export let updateTransform = <engineCoreState_ extends engineCoreState, engineCoreService_ extends engineCoreService>(engineCoreState: engineCoreState_, engineCoreService: engineCoreService_) => {
	let usedTransformContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName)
	let allTransforms = engineCoreService.getAllComponents<transform>(usedTransformContribute)

	usedTransformContribute = allTransforms.reduce((usedTransformContribute, transform) => {
		return engineCoreService.setComponentData<transform, update>(usedTransformContribute, transform, dataName.update, null)
	}, usedTransformContribute)

	return engineCoreService.setUsedComponentContribute(engineCoreState, usedTransformContribute, componentName)
}