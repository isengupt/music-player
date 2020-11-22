import React, {useState} from 'react'
import './styles.css'

function Slider() {
return (
    <div class="slider-container">
  <label class="switch" for="checkbox">
    <input type="checkbox" id="checkbox" />
    <div class="slider round"></div>
  </label>
</div>
)
}

export default Slider;

