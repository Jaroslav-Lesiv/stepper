const stapper = document.getElementById('stepper-wrapper')
// stapper
// .stappes_step
const resultItemWrap = document.createElement('div')
resultItemWrap.className = 'stepper_result_item'
const circleCount = document.createElement('span')
circleCount.className = 'circleCount'
const Stapper = class {
    constructor({ wrapper, onDone }) {
        this.active = 0
      
        if (wrapper) {
            this.wrapper = wrapper
        }
        this.onDone = onDone
        this.steps = wrapper.querySelectorAll('.stepper-wrapper .stepper_step')
      
        this.btnBack = wrapper.querySelector('.stepper_control .stapper_control_back')
        this.btnNext = wrapper.querySelector('.stepper_control .stapper_control_next')
      this.currentStep = wrapper.querySelector('.stepper_control_current-step_val')
      
      this.btnBack.addEventListener('click', this.prevStep)
      this.btnNext.addEventListener('click', this.nextStep)
      this.result = {}
    }
  
  setValueByStep = step => {
    const needStep = this.steps[step]
    const valuesSelector = needStep.querySelectorAll('.step_value')
    this.result[step] = {}
    valuesSelector.length && valuesSelector.forEach( selector => {
      const { name, value } = selector.dataset
      this.result[step][name] = value
    } )
    
  }

    nextStep = (bool) => {
        if (bool) {
          console.log(this.active + 2, this.steps.length)
            if (this.active + 2 > this.steps.length) {
                this.onDone()
            } else {
                this.setValueByStep(this.active)
                this.active += 1
                this.changeView()
            };
        };
    };

    prevStep = (bool) => {
        if (bool) {
            if (this.active <= 0) {
                this.active = 0
            } else {
                this.active -= 1
                this.changeView()
            };
        };
    };

    changeView = () => {
        this.steps.forEach(step => {
            if (step.matches('.active_step')) {
                step.classList.remove('active_step')
            };
        });
        this.steps[this.active].classList.add('active_step')
      this.currentStep.innerHTML = this.active + 1
        this.btnNext.innerHTML = this.active === this.steps.length - 1 ? 'Done' : 'Next'
    };
};

new Stapper({ wrapper: stapper, onDone: () => alert('Done') })