open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

@react.component
let make = (
  ~service: service,
  ~selectedPackagesFromMarket: selectedPackagesFromMarket,
  ~useDispatch,
  ~selectPackage,
) => {
  let dispatch = useDispatch(service.react.useDispatch)

  <List
    grid={{gutter: 16, column: 3}}
    dataSource={selectedPackagesFromMarket->Meta3dCommonlib.ListSt.toArray}
    renderItem={({protocol, name} as package) => {
      <List.Item>
        <Card
          key={name}
          onClick={_ => {
            selectPackage(dispatch, package)
          }}
          bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
          cover={<Image preview=false src={protocol.iconBase64} width=50 height=50 />}>
          <Card.Meta
            title={<span
              style={ReactDOM.Style.make(
                ~whiteSpace="normal",
                ~wordWrap="break-word",
                ~wordBreak="break-all",
                (),
              )}>
              {React.string(name)}
            </span>}
          />
        </Card>
      </List.Item>
    }}
  />
}
