'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stapper = document.getElementById('stepper-wrapper');
// stapper
// .stappes_step
var resultItemWrap = document.createElement('div');
resultItemWrap.className = 'stepper_result_item';
var circleCount = document.createElement('span');
circleCount.className = 'circleCount';
var Stapper = function Stapper(_ref) {
    var _this = this;

    var wrapper = _ref.wrapper,
        onDone = _ref.onDone;

    _classCallCheck(this, Stapper);

    this.setValueByStep = function (step) {
        var needStep = _this.steps[step];
        var valuesSelector = needStep.querySelectorAll('.step_value');
        _this.result[step] = {};
        valuesSelector.length && valuesSelector.forEach(function (selector) {
            var _selector$dataset = selector.dataset,
                name = _selector$dataset.name,
                value = _selector$dataset.value;

            _this.result[step][name] = value;
        });
    };

    this.nextStep = function (bool) {
        if (bool) {
            console.log(_this.active + 2, _this.steps.length);
            if (_this.active + 2 > _this.steps.length) {
                _this.onDone();
            } else {
                _this.setValueByStep(_this.active);
                _this.active += 1;
                _this.changeView();
            };
        };
    };

    this.prevStep = function (bool) {
        if (bool) {
            if (_this.active <= 0) {
                _this.active = 0;
            } else {
                _this.active -= 1;
                _this.changeView();
            };
        };
    };

    this.changeView = function () {
        _this.steps.forEach(function (step) {
            if (step.matches('.active_step')) {
                step.classList.remove('active_step');
            };
        });
        _this.steps[_this.active].classList.add('active_step');
        _this.currentStep.innerHTML = _this.active + 1;
        _this.btnNext.innerHTML = _this.active === _this.steps.length - 1 ? 'Done' : 'Next';
    };

    this.active = 0;

    if (wrapper) {
        this.wrapper = wrapper;
    }
    this.onDone = onDone;
    this.steps = wrapper.querySelectorAll('.stepper-wrapper .stepper_step');

    this.btnBack = wrapper.querySelector('.stepper_control .stapper_control_back');
    this.btnNext = wrapper.querySelector('.stepper_control .stapper_control_next');
    this.currentStep = wrapper.querySelector('.stepper_control_current-step_val');

    this.btnBack.addEventListener('click', this.prevStep);
    this.btnNext.addEventListener('click', this.nextStep);
    this.result = {};
};

new Stapper({ wrapper: stapper, onDone: function onDone() {
        return alert('Done');
    } });