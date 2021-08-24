/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/main.scss */ \"./src/scss/main.scss\");\n/* harmony import */ var _js_DepthFirstPaths_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/DepthFirstPaths.js */ \"./src/js/DepthFirstPaths.js\");\n/* harmony import */ var _js_Graph_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/Graph.js */ \"./src/js/Graph.js\");\n/* harmony import */ var _js_domTraversingFuncs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/domTraversingFuncs.js */ \"./src/js/domTraversingFuncs.js\");\n/* harmony import */ var _js_StateManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/StateManager.js */ \"./src/js/StateManager.js\");\n/* harmony import */ var _js_settings_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/settings.js */ \"./src/js/settings.js\");\n\n\n\n\n\n\nvar bodyEl = document.getElementById('body');\nvar tableEl = document.getElementById('table');\nvar startNodeButton = document.getElementById('start-node');\nvar targetNodeButton = document.getElementById('target-node');\nvar wallNodeButton = document.getElementById('wall-node');\nvar stateManager = new _js_StateManager_js__WEBPACK_IMPORTED_MODULE_4__.default();\nvar startButton = document.getElementById('start-button');\nvar resetButton = document.getElementById('reset-button');\n(0,_js_domTraversingFuncs_js__WEBPACK_IMPORTED_MODULE_3__.initializeTable)(tableEl, bodyEl);\n(0,_js_domTraversingFuncs_js__WEBPACK_IMPORTED_MODULE_3__.listenerForTableResizing)(tableEl);\nstartNodeButton.addEventListener('click', function (e) {\n  return (0,_js_domTraversingFuncs_js__WEBPACK_IMPORTED_MODULE_3__.callbackToActivateStartOrTargetButton)(e, _js_settings_js__WEBPACK_IMPORTED_MODULE_5__.START_NODE, startNodeButton, stateManager, bodyEl, tableEl, graph);\n});\ntargetNodeButton.addEventListener('click', function (e) {\n  return (0,_js_domTraversingFuncs_js__WEBPACK_IMPORTED_MODULE_3__.callbackToActivateStartOrTargetButton)(e, _js_settings_js__WEBPACK_IMPORTED_MODULE_5__.TARGET_NODE, targetNodeButton, stateManager, bodyEl, tableEl, graph);\n});\nwallNodeButton.addEventListener('click', function (e) {\n  return (0,_js_domTraversingFuncs_js__WEBPACK_IMPORTED_MODULE_3__.callbackToActivateWallButton)(e, _js_settings_js__WEBPACK_IMPORTED_MODULE_5__.WALL_NODE, wallNodeButton, stateManager, bodyEl, tableEl, graph);\n});\nbodyEl.addEventListener('dblclick', function (e) {\n  console.log('start node', stateManager.startNode);\n  console.log('target node', stateManager.targetNode);\n  console.log(graph.vertices);\n  console.log(stateManager);\n});\nvar graph = new _js_Graph_js__WEBPACK_IMPORTED_MODULE_2__.default(_js_settings_js__WEBPACK_IMPORTED_MODULE_5__.totalColumns, _js_settings_js__WEBPACK_IMPORTED_MODULE_5__.totalRows);\nstartButton.addEventListener('click', function (e) {\n  if (stateManager.state(_js_settings_js__WEBPACK_IMPORTED_MODULE_5__.START_NODE).location && stateManager.state(_js_settings_js__WEBPACK_IMPORTED_MODULE_5__.TARGET_NODE).location) {\n    var pathFinder = new _js_DepthFirstPaths_js__WEBPACK_IMPORTED_MODULE_1__.default(graph, 6);\n  } else {\n    alert('Start and Target nodes are required for the path finder to start!');\n  }\n});\n\n//# sourceURL=webpack://graph-visualizer/./src/index.js?");

/***/ }),

/***/ "./src/js/DepthFirstPaths.js":
/*!***********************************!*\
  !*** ./src/js/DepthFirstPaths.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DepthFirstPaths)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar DepthFirstPaths = /*#__PURE__*/function () {\n  function DepthFirstPaths(graphObj, source) {\n    _classCallCheck(this, DepthFirstPaths);\n\n    this.s = source;\n    /* s - starting vertex point*/\n\n    this.edgeTo = [];\n    this.marked = [];\n\n    for (var i = 0; i < graphObj.V; i++) {\n      this.edgeTo.push(null);\n      this.marked.push(false);\n    }\n\n    this.dfs(graphObj, source);\n  }\n\n  _createClass(DepthFirstPaths, [{\n    key: \"dfs\",\n    value: function dfs(graphObj, source) {\n      this.marked[source] = true;\n      var adjList = graphObj.adj(source);\n\n      for (var i = 0; i < adjList.length; i++) {\n        if (!this.marked[adjList[i]]) {\n          this.edgeTo[adjList[i]] = source;\n          this.dfs(graphObj, adjList[i]);\n        }\n      }\n    }\n  }, {\n    key: \"hasPathTo\",\n    value: function hasPathTo(v) {\n      // is there a path from this.source to v?\n      if (v < 0 || v >= this.marked.length) {\n        throw new Error(\"v is not valid (hasPathTo(v))\");\n      }\n\n      if (this.marked[v]) {\n        return true;\n      }\n\n      return false;\n    }\n  }, {\n    key: \"pathTo\",\n    value: function pathTo(v) {\n      if (v < 0 || v >= this.marked.length) {\n        throw new Error(\"v is not valid (pathTo(v))\");\n      }\n\n      if (!this.marked[v]) {\n        return null;\n      }\n\n      var path = [];\n\n      for (var i = v; i != this.s; i = this.edgeTo[i]) {\n        path.push(i);\n      }\n\n      path.push(this.s);\n      return path;\n    }\n  }]);\n\n  return DepthFirstPaths;\n}();\n\n\n\n//# sourceURL=webpack://graph-visualizer/./src/js/DepthFirstPaths.js?");

/***/ }),

/***/ "./src/js/Graph.js":
/*!*************************!*\
  !*** ./src/js/Graph.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Graph)\n/* harmony export */ });\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Graph = /*#__PURE__*/function () {\n  function Graph(totalRows, totalColumns) {\n    _classCallCheck(this, Graph);\n\n    this.vertices = [];\n    this.totalRows = totalRows; // count of total vertices in the graph\n\n    this.totalColumns = totalColumns; // this.E = 0; // count of total edges in the graph\n\n    this.initializeGraph();\n  }\n\n  _createClass(Graph, [{\n    key: \"initializeGraph\",\n    value: function initializeGraph() {\n      var _this = this;\n\n      for (var i = 0; i < this.totalRows; i++) {\n        var row = [];\n\n        for (var j = 0; j < this.totalColumns; j++) {\n          var vertex = [];\n          var neighbors = [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]].filter(function (coord) {\n            if (_this.validateCoordinate(coord[0], coord[1])) {\n              return true;\n            }\n\n            return false;\n          });\n\n          for (var x = 0; x < neighbors.length; x++) {\n            vertex.push(neighbors[x]);\n          }\n\n          row.push(vertex);\n        }\n\n        this.vertices.push(row);\n      }\n    }\n  }, {\n    key: \"validateCoordinate\",\n    value: function validateCoordinate(row, column) {\n      if (row < 0 || row >= this.totalRows) {\n        return false;\n      }\n\n      if (column < 0 || column >= this.totalColumns) {\n        return false;\n      }\n\n      return true;\n    }\n  }, {\n    key: \"addWall\",\n    value: function addWall(i, j) {\n      var _this2 = this;\n\n      // i - row, j - col\n      i = parseInt(i);\n      j = parseInt(j);\n      var neighbors = [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]].filter(function (coord) {\n        if (_this2.validateCoordinate(coord[0], coord[1]) && _this2.vertices[coord[0]][coord[1]] !== null) {\n          return true;\n        }\n\n        return false;\n      }, this);\n      this.vertices[i][j] = null;\n      neighbors.forEach(function (coord) {\n        var _coord = _slicedToArray(coord, 2),\n            x = _coord[0],\n            y = _coord[1];\n\n        x = parseInt(x);\n        y = parseInt(y);\n        _this2.vertices[x][y] = _this2.vertices[x][y].filter(function (coord) {\n          var _coord2 = _slicedToArray(coord, 2),\n              r = _coord2[0],\n              c = _coord2[1];\n\n          r = parseInt(r);\n          c = parseInt(c);\n\n          if (r === i && c === j) {\n            return false;\n          }\n\n          return true;\n        });\n      });\n    }\n  }, {\n    key: \"removeWall\",\n    value: function removeWall(i, j) {\n      var _this3 = this;\n\n      // i - row, j - column\n      i = parseInt(i);\n      j = parseInt(j);\n      var neighbors = [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]].filter(function (coord) {\n        var _coord3 = _slicedToArray(coord, 2),\n            x = _coord3[0],\n            y = _coord3[1];\n\n        x = parseInt(x);\n        y = parseInt(y);\n\n        if (_this3.validateCoordinate(x, y) && _this3.vertices[x][y] !== null) {\n          return true;\n        }\n\n        return false;\n      }, this);\n      neighbors.forEach(function (coord) {\n        var _coord4 = _slicedToArray(coord, 2),\n            x = _coord4[0],\n            y = _coord4[1];\n\n        x = parseInt(x);\n        y = parseInt(y);\n\n        _this3.vertices[x][y].push([i, j]);\n      });\n      this.vertices[i][j] = neighbors;\n    }\n  }, {\n    key: \"adj\",\n    value: function adj(v) {\n      // returns all adjacent vertices to v (who has an edge with v)\n      if (v === null || v === undefined || v < 0 || v >= this.V) {\n        throw new Error(\"v is not valid (adj(v))\");\n      }\n\n      return this.vertices[v];\n    }\n  }, {\n    key: \"toString\",\n    value: function toString() {\n      for (var i = 0; i < this.V; i++) {\n        for (var j = 0; j < this.vertices[i].length; j++) {\n          console.log(\"\".concat(i, \" --> \").concat(this.vertices[i][j]));\n        }\n      }\n    }\n  }]);\n\n  return Graph;\n}();\n\n\n\n//# sourceURL=webpack://graph-visualizer/./src/js/Graph.js?");

/***/ }),

/***/ "./src/js/StateManager.js":
/*!********************************!*\
  !*** ./src/js/StateManager.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ StateManager)\n/* harmony export */ });\n/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings.js */ \"./src/js/settings.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar StateManager = /*#__PURE__*/function () {\n  function StateManager() {\n    _classCallCheck(this, StateManager);\n\n    this.startNode = {\n      active: false,\n      location: null\n    };\n    this.targetNode = {\n      active: false,\n      location: null\n    };\n    this.wallNode = {\n      active: false,\n      location: new Set()\n    };\n  }\n\n  _createClass(StateManager, [{\n    key: \"state\",\n    value: function state(name) {\n      switch (name) {\n        case _settings_js__WEBPACK_IMPORTED_MODULE_0__.START_NODE:\n          return this.startNode;\n\n        case _settings_js__WEBPACK_IMPORTED_MODULE_0__.TARGET_NODE:\n          return this.targetNode;\n\n        case _settings_js__WEBPACK_IMPORTED_MODULE_0__.WALL_NODE:\n          return this.wallNode;\n\n        default:\n          throw new Error('given name value could not match any given case');\n      }\n    }\n  }, {\n    key: \"changeState\",\n    value: function changeState(name, key) {\n      var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n\n      switch (name) {\n        case _settings_js__WEBPACK_IMPORTED_MODULE_0__.START_NODE:\n          if (val === null) {\n            this.startNode[key] = !this.startNode[key];\n          } else {\n            this.startNode[key] = val;\n          }\n\n          break;\n\n        case _settings_js__WEBPACK_IMPORTED_MODULE_0__.TARGET_NODE:\n          if (val === null) {\n            this.targetNode[key] = !this.targetNode[key];\n          } else {\n            this.targetNode[key] = val;\n          }\n\n          break;\n\n        case _settings_js__WEBPACK_IMPORTED_MODULE_0__.WALL_NODE:\n          if (val === null) {\n            this.wallNode[key] = !this.wallNode[key];\n          } else if (key === 'location') {\n            this.wallNode.location.push(val);\n          } else {\n            this.wallNode[key] = val;\n          }\n\n          break;\n\n        default:\n          throw new Error('given name value could not match any given case');\n      }\n    }\n  }, {\n    key: \"anyActive\",\n    value: function anyActive() {\n      if (this.startNode.active || this.targetNode.active || this.wallNode.active) {\n        return true;\n      }\n\n      return false;\n    }\n  }]);\n\n  return StateManager;\n}();\n\n\n\n//# sourceURL=webpack://graph-visualizer/./src/js/StateManager.js?");

/***/ }),

/***/ "./src/js/domTraversingFuncs.js":
/*!**************************************!*\
  !*** ./src/js/domTraversingFuncs.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initializeTable\": () => (/* binding */ initializeTable),\n/* harmony export */   \"listenerForTableResizing\": () => (/* binding */ listenerForTableResizing),\n/* harmony export */   \"callbackToActivateStartOrTargetButton\": () => (/* binding */ callbackToActivateStartOrTargetButton),\n/* harmony export */   \"callbackToActivateWallButton\": () => (/* binding */ callbackToActivateWallButton)\n/* harmony export */ });\n/* harmony import */ var _Graph_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Graph.js */ \"./src/js/Graph.js\");\n/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.js */ \"./src/js/settings.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\nfunction initializeTable(tableEl, bodyEl) {\n  // adds table rows and columns (tr, td)\n  for (var i = 0; i < _settings_js__WEBPACK_IMPORTED_MODULE_1__.totalRows; i++) {\n    var tr = document.createElement('tr');\n    tr.className = \"row row-\".concat(i);\n\n    for (var j = 0; j < _settings_js__WEBPACK_IMPORTED_MODULE_1__.totalColumns; j++) {\n      var td = document.createElement('td');\n      td.className = \"col \".concat(i, \"-\").concat(j);\n      tr.appendChild(td);\n    }\n\n    tableEl.appendChild(tr);\n  }\n\n  bodyEl.appendChild(tableEl);\n}\nfunction listenerForTableResizing(tableEl) {\n  // to maintain table's ratio of 16:9 (for the cells to be equal size no matter of how wide or tall it is)\n  window.onload = function () {\n    var width = tableEl.clientWidth;\n    tableEl.style.height = width * 0.625;\n  };\n\n  window.addEventListener('resize', function () {\n    var width = tableEl.clientWidth;\n    tableEl.style.height = width * 0.625;\n  });\n}\nfunction callbackToActivateStartOrTargetButton(event, stateName, buttonEl, stateManager, bodyEl, tableEl, graph) {\n  function callbackToDeactivateStartOrTargetButton(e) {\n    resetCellIfOccupied(e, stateManager, graph);\n\n    if (e.target.tagName === 'TD') {\n      var _e$target$className$m = e.target.className.match(/\\d+/g),\n          _e$target$className$m2 = _slicedToArray(_e$target$className$m, 2),\n          row = _e$target$className$m2[0],\n          col = _e$target$className$m2[1];\n\n      var lastCell = document.querySelector(\"td.\".concat(stateName));\n\n      if (lastCell) {\n        lastCell.classList.remove(stateName);\n      }\n\n      e.target.classList.add(stateName);\n      stateManager.state(stateName).location = [row, col];\n    }\n\n    stateManager.changeState(stateName, 'active');\n\n    if (stateManager.anyActive()) {\n      // checks if any other button's state is activated before this got removed (in that case return, don't execute code below)\n      return;\n    }\n\n    bodyEl.style.cursor = 'auto';\n    tableEl.className = '';\n    buttonEl.style.cursor = 'pointer';\n  }\n\n  stateManager.changeState(stateName, 'active');\n\n  if (stateManager.state(stateName).active) {\n    // \n    bodyEl.style.cursor = 'pointer';\n    buttonEl.style.cursor = 'pointer';\n    tableEl.className = \"\".concat(stateName);\n    setTimeout(function () {\n      // we use settimeout to not fire this event together with the outer event listener (avoiding to get batched together with outer function)\n      bodyEl.addEventListener('click', function (e) {\n        callbackToDeactivateStartOrTargetButton(e);\n      }, {\n        once: true,\n        capture: true\n      });\n    }, 0);\n  }\n}\nfunction callbackToActivateWallButton(event, stateName, buttonEl, stateManager, bodyEl, tableEl, graph) {\n  function handleMouseMove(e) {\n    resetCellIfOccupied(e, stateManager, graph);\n\n    if (e.target.tagName !== 'TD') {\n      return;\n    }\n\n    var _e$target$className$m3 = e.target.className.match(/\\d+/g),\n        _e$target$className$m4 = _slicedToArray(_e$target$className$m3, 2),\n        row = _e$target$className$m4[0],\n        col = _e$target$className$m4[1];\n\n    var locationCoordinates = \"\".concat(row, \"-\").concat(col);\n\n    if (stateManager.state(stateName).location.has(locationCoordinates)) {\n      return;\n    }\n\n    e.target.classList.add(stateName);\n    graph.addWall(row, col);\n  }\n\n  function callbackToDeactivateWallButton(e) {\n    bodyEl.removeEventListener('mousemove', handleMouseMove);\n    stateManager.changeState(stateName, 'active');\n\n    if (stateManager.anyActive()) {\n      return;\n    }\n\n    bodyEl.style.cursor = 'auto';\n    tableEl.className = '';\n    buttonEl.style.cursor = 'pointer';\n  }\n\n  stateManager.changeState(stateName, 'active');\n\n  if (stateManager.state(stateName).active) {\n    // \n    bodyEl.style.cursor = 'pointer';\n    buttonEl.style.cursor = 'pointer';\n    tableEl.className = \"\".concat(stateName);\n\n    if (stateName === _settings_js__WEBPACK_IMPORTED_MODULE_1__.WALL_NODE) {\n      bodyEl.addEventListener('mousedown', function (e) {\n        handleMouseMove(e); // bug fixed node (triggers to add a wall when clicked only on a single cell (there is no movement)\n\n        bodyEl.addEventListener('mousemove', handleMouseMove); // if mouse moving while it is clicked down - add the wall over the cells the user hovers\n      }, {\n        once: true,\n        capture: true\n      });\n      bodyEl.addEventListener('mouseup', callbackToDeactivateWallButton, {\n        once: true\n      }); // once mouse left button is released deactivate wall button\n    }\n  }\n}\n\nfunction resetCellIfOccupied(e, stateManager, graph) {\n  if (e.target.tagName === 'TD' && e.target.classList.length > 2) {\n    var classList = _toConsumableArray(e.target.classList);\n\n    var _e$target$className$m5 = e.target.className.match(/\\d+/g),\n        _e$target$className$m6 = _slicedToArray(_e$target$className$m5, 2),\n        row = _e$target$className$m6[0],\n        col = _e$target$className$m6[1];\n\n    if (classList[2] === _settings_js__WEBPACK_IMPORTED_MODULE_1__.START_NODE) {\n      stateManager.state(_settings_js__WEBPACK_IMPORTED_MODULE_1__.START_NODE).location = null;\n      e.target.classList.remove(_settings_js__WEBPACK_IMPORTED_MODULE_1__.START_NODE);\n    } else if (classList[2] === _settings_js__WEBPACK_IMPORTED_MODULE_1__.TARGET_NODE) {\n      stateManager.state(_settings_js__WEBPACK_IMPORTED_MODULE_1__.TARGET_NODE).location = null;\n      e.target.classList.remove(_settings_js__WEBPACK_IMPORTED_MODULE_1__.TARGET_NODE);\n    } else if (classList[2] === _settings_js__WEBPACK_IMPORTED_MODULE_1__.WALL_NODE) {\n      graph.removeWall(row, col);\n      e.target.classList.remove(_settings_js__WEBPACK_IMPORTED_MODULE_1__.WALL_NODE);\n    }\n  }\n}\n\n//# sourceURL=webpack://graph-visualizer/./src/js/domTraversingFuncs.js?");

/***/ }),

/***/ "./src/js/settings.js":
/*!****************************!*\
  !*** ./src/js/settings.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"START_NODE\": () => (/* binding */ START_NODE),\n/* harmony export */   \"TARGET_NODE\": () => (/* binding */ TARGET_NODE),\n/* harmony export */   \"WALL_NODE\": () => (/* binding */ WALL_NODE),\n/* harmony export */   \"totalRows\": () => (/* binding */ totalRows),\n/* harmony export */   \"totalColumns\": () => (/* binding */ totalColumns)\n/* harmony export */ });\nvar START_NODE = 'start-node';\nvar TARGET_NODE = 'target-node';\nvar WALL_NODE = 'wall-node';\nvar totalRows = 25; // number of table rows\n\nvar totalColumns = 40; // number of table columns\n\n//# sourceURL=webpack://graph-visualizer/./src/js/settings.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss ***!
  \*********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../images/start.svg */ \"./src/images/start.svg\"), __webpack_require__.b);\nvar ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../images/target.svg */ \"./src/images/target.svg\"), __webpack_require__.b);\nvar ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../images/wall.svg */ \"./src/images/wall.svg\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(___CSS_LOADER_URL_IMPORT_0___);\nvar ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(___CSS_LOADER_URL_IMPORT_1___);\nvar ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(___CSS_LOADER_URL_IMPORT_2___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"body {\\n  margin: 0;\\n  font-family: Arial, Helvetica, sans-serif;\\n  box-sizing: border-box;\\n}\\n\\n#table {\\n  margin: auto;\\n  margin-top: 1rem;\\n  border-collapse: collapse;\\n  width: 98%;\\n  max-width: 750px;\\n  margin-bottom: 1rem;\\n}\\n#table tr td {\\n  border: 0.5px solid black;\\n  min-width: 5px;\\n  min-height: 5px;\\n}\\n#table tr td.start-node {\\n  background-image: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \"), none;\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n}\\n#table tr td.target-node {\\n  background-image: url(\" + ___CSS_LOADER_URL_REPLACEMENT_1___ + \"), none;\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n}\\n#table tr td.wall-node {\\n  background-image: url(\" + ___CSS_LOADER_URL_REPLACEMENT_2___ + \"), none;\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n}\\n#table.start-node td:hover {\\n  background-image: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \"), none;\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n}\\n#table.target-node td:hover {\\n  background-image: url(\" + ___CSS_LOADER_URL_REPLACEMENT_1___ + \"), none;\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n}\\n#table.wall-node td:hover {\\n  background-image: url(\" + ___CSS_LOADER_URL_REPLACEMENT_2___ + \"), none;\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n}\\n\\nheader#nav {\\n  margin: auto;\\n  max-width: 1200px;\\n  width: 95%;\\n  display: flex;\\n  justify-content: space-around;\\n  padding: 0rem 1rem;\\n}\\nheader#nav div#node-buttons {\\n  font-size: 12px;\\n  display: flex;\\n  flex-wrap: wrap;\\n  justify-content: left;\\n  flex-direction: column;\\n  padding: 5px;\\n  max-width: 130px;\\n}\\nheader#nav div#node-buttons .tool {\\n  border-radius: 5px;\\n  cursor: pointer;\\n  padding: 5px;\\n  border: 1px solid #8e8c8c;\\n  margin-bottom: 7px;\\n  color: #656565;\\n  width: 100px;\\n}\\nheader#nav div#node-buttons .tool:hover {\\n  background-color: #e9e9e9;\\n}\\nheader#nav div#run-reset-buttons {\\n  font-size: 12px;\\n  display: flex;\\n  flex-wrap: wrap;\\n  justify-content: center;\\n  flex-direction: column;\\n  padding: 5px;\\n  max-width: 130px;\\n}\\nheader#nav div#run-reset-buttons .tool {\\n  font-family: \\\"Gill Sans\\\", \\\"Gill Sans MT\\\", Calibri, \\\"Trebuchet MS\\\", sans-serif;\\n  border-radius: 5px;\\n  cursor: pointer;\\n  padding: 5px;\\n  border-bottom: 1px solid #8e8c8c;\\n  border-top: 1px solid #8e8c8c;\\n  margin-bottom: 7px;\\n  width: 90px;\\n  background-color: none;\\n  text-align: center;\\n}\\nheader#nav div#run-reset-buttons .tool#start-button {\\n  font-size: 20px;\\n  color: black;\\n}\\nheader#nav div#run-reset-buttons .tool#start-button:hover {\\n  background-color: #6fff82;\\n}\\nheader#nav div#run-reset-buttons .tool#reset-button {\\n  font-size: 15px;\\n  color: black;\\n}\\nheader#nav div#run-reset-buttons .tool#reset-button:hover {\\n  background-color: #ff6060;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://graph-visualizer/./src/scss/main.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === \"string\") {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, \"\"]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://graph-visualizer/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    // eslint-disable-next-line no-param-reassign\n    options = {};\n  }\n\n  if (!url) {\n    return url;\n  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign\n\n\n  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    // eslint-disable-next-line no-param-reassign\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    // eslint-disable-next-line no-param-reassign\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://graph-visualizer/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__.default, options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);\n\n\n//# sourceURL=webpack://graph-visualizer/./src/scss/main.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://graph-visualizer/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://graph-visualizer/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var style = document.createElement(\"style\");\n  options.setAttributes(style, options.attributes);\n  options.insert(style);\n  return style;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://graph-visualizer/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(style) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    style.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://graph-visualizer/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute(\"media\", media);\n  } else {\n    style.removeAttribute(\"media\");\n  }\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, style);\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var style = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(style, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(style);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://graph-visualizer/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, style) {\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://graph-visualizer/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/images/start.svg":
/*!******************************!*\
  !*** ./src/images/start.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"ad7054456b7a02d30166.svg\";\n\n//# sourceURL=webpack://graph-visualizer/./src/images/start.svg?");

/***/ }),

/***/ "./src/images/target.svg":
/*!*******************************!*\
  !*** ./src/images/target.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"920b182cfd5cf1d8c1de.svg\";\n\n//# sourceURL=webpack://graph-visualizer/./src/images/target.svg?");

/***/ }),

/***/ "./src/images/wall.svg":
/*!*****************************!*\
  !*** ./src/images/wall.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"11ab118b02b80917c3c9.svg\";\n\n//# sourceURL=webpack://graph-visualizer/./src/images/wall.svg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/dist/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;