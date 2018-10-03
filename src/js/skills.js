console.log ('я скиллс')

const result = document.querySelector('.result')

class Skill {
    constructor(width, height, result, percent) {
        this.svgNs = 'http://www.w3.org/2000/svg';
        this.svg = document.createElementNS(this.svgNs, 'svg');
        this.width = width;
        this.height = height;
        this.radius = this.width / 3;
        this.percent = percent;
        this.strokeDashArray = 2 * Math.PI * this.radius;

        this.svg.setAttribute('width', this.width);
        this.svg.setAttribute('height', this.height);
        this.svg.setAttribute('ViewBox', `0 0 ${this.width} ${this.height}`);

        this.baseCircle = this.createCircle('#1bb696', true);
        this.bgCircle = this.createCircle('#ccc');

        this.svg.appendChild(this.bgCircle)
        this.svg.appendChild(this.baseCircle)
        
        result.appendChild(this.svg);
    }

    createCircle(color, isBase = false) {
        const circle = document.createElementNS(this.svgNs, 'circle');
        const cx = this.width / 2;
        const cy = this.height / 2;
        
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', this.radius);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', color);
        circle.setAttribute('stroke-width', '20');
        if(isBase) {
            circle.setAttribute('transform', `rotate(-90 ${cx} ${cy})`);
            circle.setAttribute('stroke-dasharray', this.strokeDashArray);
            circle.setAttribute('stroke-dashoffset', this.strokeDashArray);
        }

        return circle;
    }

    draw(progress) {
        this.baseCircle.setAttribute(
            'stroke-dashoffset',
            (1 - progress * this.percent) * this.strokeDashArray
        );
    }
}

const skillHtml = new Skill(150, 150, result, 0.65);
const skillCss = new Skill(150, 150, result, 0.75);

function animate(options) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction от 0 до 1
    let timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    // текущее состояние анимации
    let progress = options.timing(timeFraction);

    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

anim.onclick = function() {
    animate({
      duration: 2000,
      timing: function(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        skillHtml.draw(progress);
        skillCss.draw(progress);
      }
    })
  }