let execFunc: Meta3dEngineCoreProtocol.StateType.execFunc = (engineCoreState, {getStatesFunc}) => {
  let {mostService} = engineCoreState->getStatesFunc->Obj.magic->Utils.getState

  mostService.callFunc(() => {
    Js.log("render root job exec")

    engineCoreState
  })
}