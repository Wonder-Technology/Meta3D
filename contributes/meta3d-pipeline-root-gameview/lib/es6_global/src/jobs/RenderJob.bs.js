

import * as Utils$Meta3dPipelineRootGameview from "./Utils.bs.js";

function execFunc(meta3dState, param) {
  var match = Utils$Meta3dPipelineRootGameview.getState(param.getStatesFunc(meta3dState));
  return match.mostService.callFunc(function (param) {
              console.log("render root job exec");
              return meta3dState;
            });
}

export {
  execFunc ,
}
/* Utils-Meta3dPipelineRootGameview Not a pure module */
