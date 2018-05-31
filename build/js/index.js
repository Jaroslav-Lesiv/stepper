"use strict";

var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stapper = document.getElementById("stepper-wrapper");
// stapper
// .stappes_step
var resultItemWrap = document.createElement("ul");
var resultItem = document.createElement("li");
resultItemWrap.className = "stepper_result list-group";
resultItem.className = 'stepper_result_item list-group-item jumbotron jumbotron-fluid';
var circleCount = document.createElement("span");
circleCount.className = "circleCount badge badge-primary badge-pill";
var title = document.createElement('h4');
title.className = 'stepper_result_title';

var Stapper = (_temp = _class = function Stapper(_ref) {
  var wrapper = _ref.wrapper,
      onDone = _ref.onDone,
      view = _ref.view;

  _classCallCheck(this, Stapper);

  _initialiseProps.call(this);

  this.active = 0;

  if (wrapper) {
    this.wrapper = wrapper;
  }
  this.onDone = onDone;
  this.steps = wrapper.querySelectorAll(".stepper-wrapper .stepper_step");

  this.btnBack = wrapper.querySelector(".stepper_control .stapper_control_back");
  this.btnNext = wrapper.querySelector(".stepper_control .stapper_control_next");
  this.currentStep = wrapper.querySelector(".stepper_control_current-step_val");
  var title = document.createElement("h3");
  title.className = "stepper_title";
  this.steps.forEach(function (step, key) {
    var titleClone = title.cloneNode(true);
    titleClone.innerHTML = title.innerHTML = view[key].title || "Step " + (key + 1);
    step.prepend(titleClone);
  });
  this.btnBack.addEventListener("click", this.prevStep);
  this.btnNext.addEventListener("click", this.nextStep);
  this.result = [];
  this.view = view;
  this.relistener();
}

// inputListener = e => {
//   e.preventDefault()
//   let selector = e.srcElement
//   if (!this.result[this.active]) {
//     this.result[this.active] = {}
//   }
// }

, _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.setValueByStep = function (step) {
    var needStep = _this.steps[step];
    var valuesSelector = needStep.querySelectorAll(".step_value");
    valuesSelector.length && valuesSelector.forEach(function (selector) {
      var _selector$dataset = selector.dataset,
          name = _selector$dataset.name,
          value = _selector$dataset.value;

      _this.result[step][name] = value;
    });
  };

  this.nextStep = function (bool) {
    if (bool) {
      if (_this.active + 2 > _this.steps.length) {
        _this.onDone();
      } else {
        _this.setValueByStep(_this.active);
        _this.active += 1;
        _this.changeView();
      }
    }
  };

  this.prevStep = function (bool) {
    if (bool) {
      if (_this.active <= 0) {
        _this.active = 0;
      } else {
        _this.active -= 1;
        _this.changeView();
      }
    }
  };

  this.relistener = function () {
    _this.steps[_this.active].querySelectorAll('.stepper-select').forEach(function (select) {
      select.removeEventListener('click', _this.select, false);
      select.addEventListener('click', _this.select, false);
    });
    _this.steps[_this.active].querySelectorAll('.stepper-input').forEach(function (input) {
      input.removeEventListener('onChange', _this.inputListener, false);
      input.addEventListener('onChange', _this.inputListener, false);
    });
  };

  this.select = function (e) {
    e.preventDefault();
    var selector = e.srcElement;
    var _selector$dataset2 = selector.dataset,
        value = _selector$dataset2.value,
        label = _selector$dataset2.label;

    console.log(_this.result);
    console.log(_this.result[_this.active], _this.active);
    if (!_this.result[_this.active]) {
      _this.result[_this.active] = {};
    }
    _this.result[_this.active]['value'] = value;
    _this.result[_this.active]['label'] = label;
    _this.changeView();
  };

  this.changeView = function () {
    _this.steps.forEach(function (step) {
      if (step.matches(".active_step")) {
        step.classList.remove("active_step");
      }
    });
    _this.steps[_this.active].classList.add("active_step");
    _this.currentStep.innerHTML = _this.active + 1;
    if (_this.active === 0) {
      _this.btnBack.disabled = true;
      _this.btnBack.classList.remove("btn-primary");
      _this.btnBack.classList.add("btn-secondary");
    } else {
      _this.btnBack.disabled = false;
      _this.btnBack.classList.remove("btn-secondary");
      _this.btnBack.classList.add("btn-primary");
    }
    _this.btnNext.innerHTML = _this.active === _this.steps.length - 1 ? "Done" : "Next";
    if (!_this.result[_this.active]) {
      _this.btnNext.disabled = true;
      _this.btnNext.classList.remove("btn-primary");
      _this.btnNext.classList.add("btn-secondary");
    } else {
      _this.btnNext.disabled = false;
      _this.btnNext.classList.remove("btn-secondary");
      _this.btnNext.classList.add("btn-primary");
    }
    _this.renderResult();
    _this.relistener();
  };

  this.renderResult = function () {
    var wrap = resultItemWrap.cloneNode(true);
    _this.result.map(function (res, key) {
      var item = resultItem.cloneNode(true);
      var count = circleCount.cloneNode(true);
      var head = title.cloneNode(true);
      count.innerHTML = key + 1;
      item.innerHTML = res.label;
      head.innerHTML = _this.view[key].title || "Step " + (key + 1);
      item.prepend(head);
      item.prepend(count);
      wrap.appendChild(item);
    });
    _this.wrapper.querySelector('.stepper_result').replaceWith(wrap);
  };
}, _temp);

new Stapper({
  wrapper: stapper,
  onDone: function onDone() {
    return alert("Done");
  },
  view: [{ title: "Schedule Appointment" }, { title: "Schedule Appointment" }, { title: "Your Information" }, { title: "Confirmation" }]
});