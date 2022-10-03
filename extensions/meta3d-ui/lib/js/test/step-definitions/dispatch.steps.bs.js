'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("sinon");
var Caml_array = require("rescript/lib/js/caml_array.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var JestCucumber = require("jest-cucumber");
var MainTool$Meta3dUi = require("../tool/MainTool.bs.js");
var NumberTool$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/test/bdd/NumberTool.bs.js");
var Operators$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/Operators.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

var feature = JestCucumber.loadFeature("./test/features/dispatch.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        var state = {
          contents: 1
        };
        var _prepare = function (given, and) {
          Curry._2(given, "prepare sandbox", (function (param) {
                  sandbox.contents = Sinon.sandbox.create();
                  
                }));
          return Curry._2(and, "create state", (function (param) {
                        state.contents = MainTool$Meta3dUi.createState(undefined);
                        
                      }));
        };
        test("if element state change, update data", (function (param) {
                var and = param.and;
                var elementName1 = "e1";
                var elementState1 = {
                  contents: 1
                };
                _prepare(param.given, and);
                Curry._2(and, /^register element(\d+) whose elementState(\d+) has data(\d+) = (\d+)$/, (function (param) {
                        var $$arguments = NumberTool$Meta3dCommonlib.getExnAndConvertArgumentsToNumber(Caml_option.undefined_to_opt(typeof arguments === "undefined" ? undefined : arguments));
                        elementState1.contents = {
                          data1: Caml_array.get($$arguments, 3)
                        };
                        state.contents = MainTool$Meta3dUi.registerElement(sandbox, state.contents, 1, elementName1, undefined, Caml_option.some(elementState1.contents), undefined);
                        
                      }));
                Curry._2(and, "combine reducer1", (function (param) {
                        state.contents = MainTool$Meta3dUi.combineReducer(state.contents, [
                              elementName1,
                              (function (elementState, action) {
                                  var match = action.type;
                                  if (match === "Set") {
                                    return ImmutableHashMap$Meta3dCommonlib.set(elementState, "data1", action.value);
                                  } else {
                                    return elementState;
                                  }
                                })
                            ]);
                        
                      }));
                Curry._2(param.when, /^dispatch action to set data(\d+) to (\d+)$/, (function (param) {
                        var $$arguments = NumberTool$Meta3dCommonlib.getExnAndConvertArgumentsToNumber(Caml_option.undefined_to_opt(typeof arguments === "undefined" ? undefined : arguments));
                        state.contents = MainTool$Meta3dUi.dispatch(state.contents, {
                              type: "Set",
                              value: Caml_array.get($$arguments, 1)
                            });
                        
                      }));
                Curry._2(param.then, "mark state change", (function (param) {
                        return Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.isStateChange(state.contents, elementName1)), true);
                      }));
                return Curry._2(and, /^data(\d+) should be (\d+)$/, (function (param) {
                              var $$arguments = NumberTool$Meta3dCommonlib.getExnAndConvertArgumentsToNumber(Caml_option.undefined_to_opt(typeof arguments === "undefined" ? undefined : arguments));
                              return Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.getElementState(state.contents, elementName1).data1), Caml_array.get($$arguments, 1));
                            }));
              }));
        return test("else, not update data", (function (param) {
                      var and = param.and;
                      var elementName1 = "e1";
                      var elementState1 = {
                        contents: 1
                      };
                      var originData1 = {
                        contents: 1
                      };
                      _prepare(param.given, and);
                      Curry._2(and, /^register element(\d+) whose elementState(\d+) has data(\d+) = (\d+)$/, (function (param) {
                              var $$arguments = NumberTool$Meta3dCommonlib.getExnAndConvertArgumentsToNumber(Caml_option.undefined_to_opt(typeof arguments === "undefined" ? undefined : arguments));
                              originData1.contents = Caml_array.get($$arguments, 3);
                              elementState1.contents = {
                                data1: Caml_array.get($$arguments, 3)
                              };
                              state.contents = MainTool$Meta3dUi.registerElement(sandbox, state.contents, 1, elementName1, undefined, Caml_option.some(elementState1.contents), undefined);
                              
                            }));
                      Curry._2(and, "combine reducer1", (function (param) {
                              state.contents = MainTool$Meta3dUi.combineReducer(state.contents, [
                                    elementName1,
                                    (function (elementState, action) {
                                        var match = action.type;
                                        if (match === "Set") {
                                          return ImmutableHashMap$Meta3dCommonlib.set(elementState, "data1", action.value);
                                        } else {
                                          return elementState;
                                        }
                                      })
                                  ]);
                              
                            }));
                      Curry._2(param.when, /^dispatch action to set data(\d+) to (\d+)$/, (function (param) {
                              var $$arguments = NumberTool$Meta3dCommonlib.getExnAndConvertArgumentsToNumber(Caml_option.undefined_to_opt(typeof arguments === "undefined" ? undefined : arguments));
                              state.contents = MainTool$Meta3dUi.dispatch(state.contents, {
                                    type: "Set",
                                    value: Caml_array.get($$arguments, 1)
                                  });
                              
                            }));
                      Curry._2(param.then, "mark state not change", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.isStateChange(state.contents, elementName1)), false);
                            }));
                      return Curry._2(and, "data1 should not change", (function (param) {
                                    return Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.getElementState(state.contents, elementName1).data1), originData1.contents);
                                  }));
                    }));
      }));

exports.feature = feature;
/* feature Not a pure module */
