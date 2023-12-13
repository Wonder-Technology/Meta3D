open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

module Method = {
  //   let _buildDefaultInputFileStr = inputName => {
  //     j`import { api } from "meta3d-type"

  // export let getContribute = (api:api) => {
  //     return {
  //         inputName: "${inputName}",
  //         func: (meta3dState) => {
  //             return Promise.resolve(null)
  //         }
  //     }
  // }`
  //   }
  let _buildDefaultInputFileStr = inputName => {
    j`window.Contribute = {
    getContribute: (api) => {
      return {
        inputName: "${inputName}",
        func: (meta3dState) =>{
            return Promise.resolve(null)
        }
      }
    }
}`
  }

  let _generateInputName = customInputNames => {
    let rec _func = index => {
      let result = {j`Input${index->IntUtils.intToString}`}

      customInputNames->Meta3dCommonlib.ListSt.includes(result) ? _func(index->succ) : result
    }

    _func(1)
  }

  let addCustomInput = (dispatch, customInputs) => {
    let inputName =
      customInputs
      ->Meta3dCommonlib.ListSt.map(({name}: ElementAssembleStoreType.customInput) => {
        name
      })
      ->_generateInputName

    dispatch(
      ElementAssembleStoreType.AddCustomInput(
        (
          {
            name: inputName,
            fileStr: _buildDefaultInputFileStr(inputName),
          }: ElementAssembleStoreType.customInput
        ),
      ),
    )
  }

  let convertToTreeData = customInputs => {
    customInputs
    ->Meta3dCommonlib.ListSt.map((
      {name, fileStr}: ElementAssembleStoreType.customInput,
    ): Tree.treeData => {
      {
        title: name,
        key: name,
        icon: React.null,
        children: [],
      }
    })
    ->Meta3dCommonlib.ListSt.toArray
  }

  let onSelect = ((dispatch, setSelectedKeys), selectedKeysValue, info: Tree.info) => {
    CodeEditUtils.setCurrentCustomInputNameToGlobal(info.node.key)

    setSelectedKeys(_ => selectedKeysValue)

    dispatch(ElementAssembleStoreType.SelectCustomInput(info.node.key))
  }

  let useSelector = ({elementAssembleState}: AssembleSpaceStoreType.state) => {
    let {customInputs} = elementAssembleState

    customInputs
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (selectedKeys, setSelectedKeys) = service.react.useState(_ => [])

  let customInputs = service.react.useSelector(. Method.useSelector)

  // TODO check: no duplicate name

  <Space direction=#vertical size=#middle>
    <Space direction=#horizontal wrap=true>
      <Button
        icon={<Icon.FileAddOutlined />}
        onClick={_ => {
          Method.addCustomInput(dispatch, customInputs)
        }}
      />
    </Space>
    <Tree
      showIcon=false
      autoExpandParent=false
      treeData={customInputs->Method.convertToTreeData}
      // expandedKeys
      // onExpand={expandedKeysValue =>
      //   Method.onExpand((setExpandedKeys, setAutoExpandParent), expandedKeysValue)}
      selectedKeys
      onSelect={(selectedKeysValue, info) =>
        Method.onSelect((dispatch, setSelectedKeys), selectedKeysValue, info)}
    />
  </Space>
}