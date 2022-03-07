open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_before_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      Meta3dComponentTransform.StateType.state,
      Meta3dComponentTransform.StateType.config,
      Meta3dComponentTransformProtocol.Index.dataNameType,
      Meta3dComponentTransform.StateType.transform,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let transform = ref(Obj.magic(1))

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state and open debug", () => {
      state := StateTool.createState(~contribute=contribute.contents, ~isDebug=true, ())
    })
  }

  test(."disposed transform shouldn\'t affect other alive ones\' data", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    _getContributeAndCreateAState((given, \"and"))

    given("create a transform", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := t
    })

    \"when"("dispose the transform", () => {
      ()
    })

    then(%re("/^should contract error: \"(.*)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        state :=
          contribute.contents.batchDisposeComponentsFunc(. state.contents, [transform.contents])
      })->toThrowMessage(arg0->Obj.magic)
    })
  })
})
