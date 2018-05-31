const stapper = document.getElementById("stepper-wrapper");
// stapper
// .stappes_step
const resultItemWrap = document.createElement("ul");
const resultItem = document.createElement("li");
resultItemWrap.className = "stepper_result list-group";
resultItem.className = 'stepper_result_item list-group-item jumbotron jumbotron-fluid'
const circleCount = document.createElement("span");
circleCount.className = "circleCount badge badge-primary badge-pill";
const title = document.createElement('h4')
title.className = 'stepper_result_title'


const Stapper = class {
  constructor({ wrapper, onDone, view }) {
    this.active = 0;

    if (wrapper) {
      this.wrapper = wrapper;
    }
    this.onDone = onDone;
    this.steps = wrapper.querySelectorAll(".stepper-wrapper .stepper_step");

    this.btnBack = wrapper.querySelector(
      ".stepper_control .stapper_control_back"
    );
    this.btnNext = wrapper.querySelector(
      ".stepper_control .stapper_control_next"
    );
    this.currentStep = wrapper.querySelector(
      ".stepper_control_current-step_val"
    );
    const title = document.createElement("h3");
    title.className = `stepper_title`;
    this.steps.forEach((step, key) => {
      const titleClone = title.cloneNode(true);
      titleClone.innerHTML = title.innerHTML =
        view[key].title || `Step ${key + 1}`;
      step.prepend(titleClone);
    });
    this.btnBack.addEventListener("click", this.prevStep);
    this.btnNext.addEventListener("click", this.nextStep);
    this.result = [];
    this.view = view
    this.relistener()

  }

  setValueByStep = step => {
    const needStep = this.steps[step];
    const valuesSelector = needStep.querySelectorAll(".step_value");
    valuesSelector.length &&
      valuesSelector.forEach(selector => {
        const { name, value } = selector.dataset;
        this.result[step][name] = value;
      });
  };

  nextStep = bool => {
    if (bool) {
      if (this.active + 2 > this.steps.length) {
        this.onDone();
      } else {
        this.setValueByStep(this.active);
        this.active += 1;
        this.changeView();
      }
    }
  };

  prevStep = bool => {
    if (bool) {
      if (this.active <= 0) {
        this.active = 0;
      } else {
        this.active -= 1;
        this.changeView();
      }
    }
  };

  

  relistener = () => {
    this.steps[this.active].querySelectorAll('.stepper-select').forEach(select => {
      select.removeEventListener('click', this.select, false)
      select.addEventListener('click', this.select, false)
    })
    this.steps[this.active].querySelectorAll('.stepper-input').forEach(input => {
      input.removeEventListener('onChange', this.inputListener, false)
      input.addEventListener('onChange', this.inputListener, false)
    })
  }

  // inputListener = e => {
  //   e.preventDefault()
  //   let selector = e.srcElement
  //   if (!this.result[this.active]) {
  //     this.result[this.active] = {}
  //   }
  // }

  select = e => {
    e.preventDefault()
    let selector = e.srcElement
    const { value, label } = selector.dataset
    console.log(this.result)
    console.log(this.result[this.active], this.active)
    if (!this.result[this.active]) {
      this.result[this.active] = {}
    }
    this.result[this.active]['value'] = value
    this.result[this.active]['label'] = label
    this.changeView()
  }

  changeView = () => {
    this.steps.forEach(step => {
      if (step.matches(".active_step")) {
        step.classList.remove("active_step");
      }
    });
    this.steps[this.active].classList.add("active_step");
    this.currentStep.innerHTML = this.active + 1;
    if (this.active === 0) {
      this.btnBack.disabled = true;
      this.btnBack.classList.remove("btn-primary");
      this.btnBack.classList.add("btn-secondary");
    } else {
      this.btnBack.disabled = false;
      this.btnBack.classList.remove("btn-secondary");
      this.btnBack.classList.add("btn-primary");
    }
    this.btnNext.innerHTML =
      this.active === this.steps.length - 1 ? "Done" : "Next";
    if (!this.result[this.active]) {
      this.btnNext.disabled = true;
      this.btnNext.classList.remove("btn-primary");
      this.btnNext.classList.add("btn-secondary");
    } else {
      this.btnNext.disabled = false;
      this.btnNext.classList.remove("btn-secondary");
      this.btnNext.classList.add("btn-primary");
    }
    this.renderResult()
    this.relistener()
  };

  renderResult = () => {
    const wrap = resultItemWrap.cloneNode(true)
    this.result.map( (res, key) => {
      const item = resultItem.cloneNode(true)
      const count = circleCount.cloneNode(true)
      const head = title.cloneNode(true)
      count.innerHTML = key + 1
      item.innerHTML = res.label
      head.innerHTML = this.view[key].title || `Step ${key + 1}`
      item.prepend(head)
      item.prepend(count)
      wrap.appendChild(item)
    } )
    this.wrapper.querySelector('.stepper_result').replaceWith(wrap)
  }
};

new Stapper({
  wrapper: stapper,
  onDone: () => alert("Done"),
  view: [
    { title: `Schedule Appointment` },
    { title: `Schedule Appointment` },
    { title: `Your Information` },
    { title: `Confirmation` }
  ]
});
