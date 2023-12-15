<!-- <template>
  <div class="content">
    <svg viewBox="0 0 960 300">
      <symbol id="s-text">
        <text text-anchor="middle" x="51%" y="51%">404</text>
        <text text-anchor="middle" x="50%" y="50%">404</text>
        <text text-anchor="middle" x="49%" y="49%">404</text>
      </symbol>
      <g class="g-ants">
        <use xlink:href="#s-text" class="text"></use>
        <use xlink:href="#s-text" class="text"></use>
        <use xlink:href="#s-text" class="text"></use>
        <use xlink:href="#s-text" class="text"></use>
        <use xlink:href="#s-text" class="text"></use>
      </g>
    </svg>

    <div class="bottom">
      <h1
        style="
          font-size: 36px;
          display: inline-block;
          margin-right: 30px;
          transform: translateY(7px);
        "
      >
        Page Not Found
      </h1>
      <a href="./" class="anniu" style="font-weight: bolder; color: aliceblue">Back to Home</a>
    </div>
  </div>
  <div class="pyramid-loader pyramid-loader1">
    <div class="wrapper">
      <span class="side side1"></span>
      <span class="side side2"></span>
      <span class="side side3"></span>
      <span class="side side4"></span>
      <span class="shadow"></span>
    </div>
  </div>
  <div class="pyramid-loader pyramid-loader2">
    <div class="wrapper">
      <span class="side side1"></span>
      <span class="side side2"></span>
      <span class="side side3"></span>
      <span class="side side4"></span>
      <span class="shadow"></span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>



<style scoped lang="scss">
.anniu:hover {
  box-shadow: 0 0 10px 1px white;
}

.bottom {
  position: absolute;
  left: 47%;
  transform: translate(-50%);
  bottom: 25%;
}

.pyramid-loader {
  position: absolute;
  width: 300px;
  height: 300px;
  display: block;
  transform-style: preserve-3d;
  transform: rotateX(-20deg);
}

.pyramid-loader1 {
  position: absolute;
  left: 250px;
  top: 100px;
}

.pyramid-loader2 {
  position: absolute;
  right: 250px;
  top: 100px;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: spin 4s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotateY(360deg);
  }
}

.pyramid-loader .wrapper {
  .side {
    width: 70px;
    height: 70px;

    /* you can choose any gradient or color you want */
    /* background: radial-gradient( #2F2585 10%, #F028FD 70%, #2BDEAC 120%); */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform-origin: center top;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }

  .side1 {
    transform: rotateZ(-30deg) rotateY(90deg);
    background: conic-gradient(#2bdeac, #f028fd, #d8cce6, #2f2585);
  }

  .side2 {
    transform: rotateZ(30deg) rotateY(90deg);
    background: conic-gradient(#2f2585, #d8cce6, #f028fd, #2bdeac);
  }

  .side3 {
    transform: rotateX(30deg);
    background: conic-gradient(#2f2585, #d8cce6, #f028fd, #2bdeac);
  }

  .side4 {
    transform: rotateX(-30deg);
    background: conic-gradient(#2bdeac, #f028fd, #d8cce6, #2f2585);
  }

  .shadow {
    width: 60px;
    height: 60px;
    background: #8b5ad5;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: rotateX(90deg) translateZ(-40px);
    filter: blur(12px);
  }
}

html, body {
  margin: 0;
  padding: 0;
  font-weight: 800;
  box-sizing: border-box;
  background: #000;
  font-family: cursive;
}

svg {
  font: 10.5em 'Monoton';
  width: 100%;
  height: 100vh;
}

.content {
  text-align: center;
  background-color: #000;
}

h1 {
  text-align: center;
  font: 1.5em 'Roboto', sans-serif;
  font-weight: bold;
  color: #61a096;
  opacity: 0.6;
}

a {
  display: inline-block;
  text-transform: uppercase;
  font-size: 1em 'Roboto';
  font-weight: 300;
  border: 2px solid #9ab3af;
  border-radius: 4px;
  color: #a0bdb8;
  margin: 15px 0;
  padding: 8px 14px;
  text-decoration: none;
  opacity: 0.6;
}

.text {
  fill: none;
  stroke-dasharray: 8% 29%;
  stroke-width: 5px;
  stroke-dashoffset: 1%;
  animation: stroke-offset 5.5s infinite linear;

  &:nth-child(1) {
    stroke: #1c234d;
    animation-delay: -1;
  }

  &:nth-child(2) {
    stroke: #315b2c;
    animation-delay: -2s;
  }

  &:nth-child(3) {
    stroke: #2f8f7f;
    animation-delay: -3s;
  }

  &:nth-child(4) {
    stroke: #2f8f7f;
    animation-delay: -4s;
  }

  &:nth-child(5) {
    stroke: #da2717;
    animation-delay: -5s;
  }
}

@keyframes stroke-offset {
  100% {
    stroke-dashoffset: -35%;
  }
}

</style> -->