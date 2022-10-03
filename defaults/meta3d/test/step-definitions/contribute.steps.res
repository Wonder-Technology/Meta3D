open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/contribute.feature")

defineFeature(feature, test => {
  let _buildEmptyMapData = () => {
    (Meta3dCommonlib.ImmutableHashMap.createEmpty(), Meta3dCommonlib.ImmutableHashMap.createEmpty())
  }

  test(."get all contributes by type", ({given, \"when", \"and", then}) => {
    let state = ref(Obj.magic(1))

    given(
      "register action, component, element, ui control, skin, gameObject, workPlugin contributes",
      () => {
        state := StateTool.create()

        state :=
          Main.registerContribute(
            state.contents,
            "a1",
            ContributeTool.buildGetContributeFunc({
              "actionName": "a1",
              "handler": Obj.magic(1),
            })->Obj.magic,
            _buildEmptyMapData(),
          )
        state :=
          Main.registerContribute(
            state.contents,
            "c1",
            ContributeTool.buildGetContributeFunc({
              "componentName": "c1",
              "createComponentFunc": Obj.magic(1),
            })->Obj.magic,
            _buildEmptyMapData(),
          )
        state :=
          Main.registerContribute(
            state.contents,
            "e1",
            ContributeTool.buildGetContributeFunc({
              "elementName": "e1",
              "execOrder": 0,
            })->Obj.magic,
            _buildEmptyMapData(),
          )
        state :=
          Main.registerContribute(
            state.contents,
            "g1",
            ContributeTool.buildGetContributeFunc({
              "createGameObjectFunc": Obj.magic(1),
              "getAllGameObjectsFunc": Obj.magic(1),
            })->Obj.magic,
            _buildEmptyMapData(),
          )
        state :=
          Main.registerContribute(
            state.contents,
            "u1",
            ContributeTool.buildGetContributeFunc({
              "uiControlName": "u1",
              "func": Obj.magic(1),
            })->Obj.magic,
            _buildEmptyMapData(),
          )
        state :=
          Main.registerContribute(
            state.contents,
            "s1",
            ContributeTool.buildGetContributeFunc({
              "skinName": "s1",
              "skin": Obj.magic(1),
            })->Obj.magic,
            _buildEmptyMapData(),
          )
        state :=
          Main.registerContribute(
            state.contents,
            "w1",
            ContributeTool.buildGetContributeFunc({
              "workPluginName": "w1",
              "allPipelineData": Obj.magic(1),
            })->Obj.magic,
            _buildEmptyMapData(),
          )
      },
    )

    \"when"("get all contributes by each type by api", () => {
      ()
    })

    then("get them", () => {
      (
        APITool.buildAPI().getAllContributesByType(.
          state.contents,
          Meta3dType.ContributeType.Action,
        )
        ->Obj.magic
        ->Js.Json.stringify,
        APITool.buildAPI().getAllContributesByType(.
          state.contents,
          Meta3dType.ContributeType.Component,
        )
        ->Obj.magic
        ->Js.Json.stringify,
        APITool.buildAPI().getAllContributesByType(.
          state.contents,
          Meta3dType.ContributeType.Element,
        )
        ->Obj.magic
        ->Js.Json.stringify,
        APITool.buildAPI().getAllContributesByType(.
          state.contents,
          Meta3dType.ContributeType.GameObject,
        )
        ->Obj.magic
        ->Js.Json.stringify,
        APITool.buildAPI().getAllContributesByType(.
          state.contents,
          Meta3dType.ContributeType.UIControl,
        )
        ->Obj.magic
        ->Js.Json.stringify,
        APITool.buildAPI().getAllContributesByType(. state.contents, Meta3dType.ContributeType.Skin)
        ->Obj.magic
        ->Js.Json.stringify,
        APITool.buildAPI().getAllContributesByType(.
          state.contents,
          Meta3dType.ContributeType.WorkPlugin,
        )
        ->Obj.magic
        ->Js.Json.stringify,
      )->expect ==
        (
          "[{\"actionName\":\"a1\",\"handler\":1}]",
          "[{\"componentName\":\"c1\",\"createComponentFunc\":1}]",
          "[{\"elementName\":\"e1\",\"execOrder\":0}]",
          "[{\"createGameObjectFunc\":1,\"getAllGameObjectsFunc\":1}]",
          "[{\"uiControlName\":\"u1\",\"func\":1}]",
          "[{\"skinName\":\"s1\",\"skin\":1}]",
          "[{\"workPluginName\":\"w1\",\"allPipelineData\":1}]",
        )
    })
  })

  test(."register contribute with unknown type", ({given, \"when", \"and", then}) => {
    let state = ref(Obj.magic(1))

    \"when"("register unknown type contribute", () => {
      state := StateTool.create()

      state :=
        Main.registerContribute(
          state.contents,
          "a1",
          ContributeTool.buildGetContributeFunc({
            "a1": "a1",
          })->Obj.magic,
          _buildEmptyMapData(),
        )
    })

    \"and"("get all contributes by action type by api", () => {
      ()
    })

    then("get empty", () => {
      APITool.buildAPI().getAllContributesByType(. state.contents, Meta3dType.ContributeType.Action)
      ->Obj.magic
      ->Js.Json.stringify
      ->expect == "[]"
    })
  })
})
