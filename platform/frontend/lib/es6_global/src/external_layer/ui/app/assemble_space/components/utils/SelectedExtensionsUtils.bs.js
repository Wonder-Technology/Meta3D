

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";

import 'antd/dist/reset.css'
;

function SelectedExtensionsUtils(Props) {
  var service = Props.service;
  var useDispatch = Props.useDispatch;
  var useSelectorResult = Props.useSelectorResult;
  var selectExtension = Props.selectExtension;
  var dispatch = Curry._1(useDispatch, service.react.useDispatch);
  return React.createElement(Antd.List, {
              grid: {
                gutter: 16,
                column: 1
              },
              dataSource: ListSt$Meta3dCommonlib.toArray(useSelectorResult),
              renderItem: (function (param) {
                  var id = param[0];
                  return React.createElement(Antd.List.Item, {
                              children: React.createElement(Antd.Card, {
                                    key: id,
                                    onClick: (function (param) {
                                        Curry._2(selectExtension, dispatch, id);
                                      }),
                                    bodyStyle: {
                                      padding: "0px"
                                    },
                                    cover: React.createElement(Antd.Image, {
                                          preview: false,
                                          width: 50,
                                          height: 50,
                                          src: param[1]
                                        }),
                                    children: React.createElement(Antd.Card.Meta, {
                                          title: React.createElement("span", {
                                                style: {
                                                  whiteSpace: "normal",
                                                  wordBreak: "break-all",
                                                  wordWrap: "break-word"
                                                }
                                              }, param[2].extensionPackageData.displayName)
                                        })
                                  })
                            });
                })
            });
}

var make = SelectedExtensionsUtils;

export {
  make ,
}
/*  Not a pure module */
