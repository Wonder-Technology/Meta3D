

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as ExtensionsContributesUtils$Frontend from "./ExtensionsContributesUtils.bs.js";

import 'antd/dist/reset.css'
;

function getDifferenceSet(selectedExtensionsFromMarket, selectedExtensionNames) {
  return ArraySt$Meta3dCommonlib.filter(selectedExtensionsFromMarket, (function (param) {
                return !ListSt$Meta3dCommonlib.includes(selectedExtensionNames, param[0].data.extensionPackageData.name);
              }));
}

var Method = {
  getDifferenceSet: getDifferenceSet
};

function ExtensionsUtils(Props) {
  var service = Props.service;
  var selectedExtensionsFromMarket = Props.selectedExtensionsFromMarket;
  var selectedExtensionNames = Props.selectedExtensionNames;
  var useDispatch = Props.useDispatch;
  var selectExtension = Props.selectExtension;
  var dispatch = Curry._1(useDispatch, service.react.useDispatch);
  return React.createElement(Antd.List, {
              grid: {
                gutter: 16,
                column: 2
              },
              dataSource: getDifferenceSet(ListSt$Meta3dCommonlib.toArray(selectedExtensionsFromMarket), selectedExtensionNames),
              renderItem: (function (param) {
                  var protocolConfigOpt = param[1];
                  var extension = param[0];
                  return React.createElement(Antd.List.Item, {
                              children: React.createElement(Antd.Card, {
                                    key: extension.data.extensionPackageData.displayName,
                                    onClick: (function (param) {
                                        Curry._7(selectExtension, dispatch, extension.protocolIconBase64, extension.protocolDisplayName, extension.protocolRepoLink, extension.protocolDescription, ExtensionsContributesUtils$Frontend.getProtocolConfigStr(protocolConfigOpt), extension);
                                      }),
                                    bodyStyle: {
                                      padding: "0px"
                                    },
                                    cover: React.createElement(Antd.Image, {
                                          preview: false,
                                          width: 50,
                                          height: 50,
                                          src: extension.protocolIconBase64
                                        }),
                                    children: React.createElement(Antd.Card.Meta, {
                                          title: React.createElement("span", {
                                                style: {
                                                  whiteSpace: "normal",
                                                  wordBreak: "break-all",
                                                  wordWrap: "break-word"
                                                }
                                              }, extension.data.extensionPackageData.displayName)
                                        })
                                  })
                            });
                })
            });
}

var make = ExtensionsUtils;

export {
  Method ,
  make ,
}
/*  Not a pure module */