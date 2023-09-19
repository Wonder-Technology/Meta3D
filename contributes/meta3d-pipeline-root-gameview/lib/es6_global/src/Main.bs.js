

import * as InitJob$Meta3dPipelineRootGameview from "./jobs/InitJob.bs.js";
import * as RenderJob$Meta3dPipelineRootGameview from "./jobs/RenderJob.bs.js";
import * as UpdateJob$Meta3dPipelineRootGameview from "./jobs/UpdateJob.bs.js";
import * as StateType$Meta3dPipelineRootGameviewProtocol from "../../../../../node_modules/meta3d-pipeline-root-gameview-protocol/lib/es6_global/src/StateType.bs.js";

function _getExecFunc(_pipelineName, jobName) {
  if (jobName === StateType$Meta3dPipelineRootGameviewProtocol.job.Init) {
    return InitJob$Meta3dPipelineRootGameview.execFunc;
  } else if (jobName === StateType$Meta3dPipelineRootGameviewProtocol.job.Update) {
    return UpdateJob$Meta3dPipelineRootGameview.execFunc;
  } else if (jobName === StateType$Meta3dPipelineRootGameviewProtocol.job.Render) {
    return RenderJob$Meta3dPipelineRootGameview.execFunc;
  } else {
    return null;
  }
}

function _init(_state) {
  
}

function getContribute(api) {
  return {
          pipelineName: StateType$Meta3dPipelineRootGameviewProtocol.pipelineName,
          createStateFunc: (function (meta3dState, param) {
              var mostService = api.getExtensionService(meta3dState, "meta3d-bs-most-protocol");
              return {
                      mostService: mostService
                    };
            }),
          initFunc: _init,
          getExecFunc: _getExecFunc,
          allPipelineData: StateType$Meta3dPipelineRootGameviewProtocol.allPipelineData,
          restoreFunc: null,
          deepCopyFunc: null
        };
}

export {
  _getExecFunc ,
  _init ,
  getContribute ,
}
/* InitJob-Meta3dPipelineRootGameview Not a pure module */