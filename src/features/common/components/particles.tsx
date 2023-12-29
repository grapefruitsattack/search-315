'use client'
import type { Container, Engine, ISourceOptions } from 'tsparticles-engine'
import {Particles} from 'react-tsparticles'
import { loadFull } from "tsparticles"
import { useCallback } from 'react'
import {useSnowParam} from '../hooks/useSnowParam'

const STORAGE_SNOW_PARAM = 'snowParam';

const ParticlesComponent = () => {
  
  //ローカルストレージ
  const [snowParam, setSnowParam] = useSnowParam({snowIsValid:'',noticeCheckedYear:''});
  const jsonStr = localStorage.getItem(STORAGE_SNOW_PARAM);
  const currentSnowParam: {snowIsValid: string, noticeCheckedYear: string} 
    = jsonStr===null?{snowIsValid:'1',noticeCheckedYear:''}:JSON.parse(jsonStr);
  

  const particlesInit = useCallback(async (engine:any) => {
      await loadFull(engine);
    }, []);
  
  const particlesLoaded = useCallback(async (container:any) => {
      await console.log(container);
  }, []);
  

  const options: ISourceOptions = {
    "autoPlay": true,
    "clear": true,
    "defaultThemes": {},
    "delay": 0,
    "fullScreen": {
      "enable": true,
      "zIndex": 0
    },
    "detectRetina": true,
    "duration": 0,
    "fpsLimit": 120,
    "interactivity": {
      "detectsOn": "window",
      "events": {
        "onClick": {
          "enable": false,
        },
        "onHover": {
          "enable": false,
          "parallax": {
            "enable": false,
            "force": 2,
            "smooth": 10
          }
        },
        "resize": {
          "delay": 0.5,
          "enable": true
        }
      },
      "modes": {}
    },
    "particles": {
      "bounce": {
        "horizontal": {
          "value": 1
        },
        "vertical": {
          "value": 1
        }
      },
      "collisions": {
        "absorb": {
          "speed": 2
        },
        "bounce": {
          "horizontal": {
            "value": 1
          },
          "vertical": {
            "value": 1
          }
        },
        "enable": false,
        "maxSpeed": 50,
        "mode": "bounce",
        "overlap": {
          "enable": true,
          "retries": 0
        }
      },
      "color": {
        "value": "#eaf4ff",
        "animation": {
          "h": {
            "count": 0,
            "enable": false,
            "speed": 1,
            "decay": 0,
            "delay": 0,
            "sync": true,
            "offset": 0
          },
          "s": {
            "count": 0,
            "enable": false,
            "speed": 1,
            "decay": 0,
            "delay": 0,
            "sync": true,
            "offset": 0
          },
          "l": {
            "count": 0,
            "enable": false,
            "speed": 1,
            "decay": 0,
            "delay": 0,
            "sync": true,
            "offset": 0
          }
        }
      },
      "effect": {
        "close": true,
        "fill": true,
        "options": {},
        "type": {}
      },
      "groups": {},
      "move": {
        "angle": {
          "offset": 0,
          "value": 90
        },
        "attract": {
          "distance": 200,
          "enable": false,
          "rotate": {
            "x": 3000,
            "y": 3000
          }
        },
        "center": {
          "x": 50,
          "y": 50,
          "mode": "percent",
          "radius": 0
        },
        "decay": 0,
        "distance": {},
        "direction": "bottom",
        "drift": 0,
        "enable": true,
        "gravity": {
          "acceleration": 9.81,
          "enable": false,
          "inverse": false,
          "maxSpeed": 50
        },
        "path": {
          "clamp": true,
          "delay": {
            "value": 0
          },
          "enable": false,
          "options": {}
        },
        "outModes": {
          "default": "out"
        },
        "random": false,
        "size": false,
        "speed": 2,
        "spin": {
          "acceleration": 0,
          "enable": false
        },
        "straight": true,
        "trail": {
          "enable": false,
          "length": 10,
          "fill": {}
        },
        "vibrate": false,
        "warp": false
      },
      "number": {
        "density": {
          "enable": true,
          value_area: 1500
        },
        "value": 1500
      },
      "opacity": {
        "value": 0.91,
        "animation": {
          "count": 0,
          "enable": false,
          "speed": 2,
          "decay": 0,
          "delay": 0,
          "sync": false,
          "mode": "auto",
          "startValue": "random",
          "destroy": "none"
        }
      },
      "reduceDuplicates": false,
      "shadow": {
        "blur": 0,
        "color": {
          "value": "#00000027"
        },
        "enable": false,
        "offset": {
          "x": 0,
          "y": 0
        }
      },
      "shape": {
        "close": true,
        "fill": true,
        "options": {},
        "type": "circle"
      },
      "size": {
        "value": 10,
        "animation": {
          "count": 0,
          "enable": false,
          "speed": 5,
          "decay": 0,
          "delay": 0,
          "sync": false,
          "mode": "auto",
          "startValue": "random",
          "destroy": "none"
        }
      },
      "stroke": {
        "width": 0
      },
      "zIndex": {
        "value": {
          "min": 0,
          "max": 100
        },
        "opacityRate": 10,
        "sizeRate": 10,
        "velocityRate": 10
      },
      "destroy": {
        "bounds": {},
        "mode": "none",
        "split": {
          "count": 1,
          "factor": {
            "value": 3
          },
          "rate": {
            "value": {
              "min": 4,
              "max": 9
            }
          },
          "sizeOffset": true
        }
      },
      "roll": {
        "darken": {
          "enable": false,
          "value": 0
        },
        "enable": false,
        "enlighten": {
          "enable": false,
          "value": 0
        },
        "mode": "vertical",
        "speed": 25
      },
      "tilt": {
        "value": 0,
        "animation": {
          "enable": false,
          "speed": 0,
          "decay": 0,
          "sync": false
        },
        "direction": "clockwise",
        "enable": false
      },
      "twinkle": {
        "lines": {
          "enable": false,
          "frequency": 0.05,
          "opacity": 1
        },
        "particles": {
          "enable": false,
          "frequency": 0.05,
          "opacity": 1
        }
      },
      "wobble": {
        "distance": 10,
        "enable": true,
        "speed": {
          "angle": 10,
          "move": 10
        }
      },
      "life": {
        "count": 0,
        "delay": {
          "value": 0,
          "sync": false
        },
        "duration": {
          "value": 0,
          "sync": false
        }
      },
      "rotate": {
        "value": 0,
        "animation": {
          "enable": false,
          "speed": 0,
          "decay": 0,
          "sync": false
        },
        "direction": "clockwise",
        "path": false
      },
      "orbit": {
        "animation": {
          "count": 0,
          "enable": false,
          "speed": 1,
          "decay": 0,
          "delay": 0,
          "sync": false
        },
        "enable": false,
        "opacity": 1,
        "rotation": {
          "value": 45
        },
        "width": 1
      },
      "links": {
        "blink": false,
        "color": {
          "value": "#fff"
        },
        "consent": false,
        "distance": 100,
        "enable": false,
        "frequency": 1,
        "opacity": 1,
        "shadow": {
          "blur": 5,
          "color": {
            "value": "#00000027"
          },
          "enable": false
        },
        "triangles": {
          "enable": false,
          "frequency": 1
        },
        "width": 1,
        "warp": false
      },
      "repulse": {
        "value": 0,
        "enabled": false,
        "distance": 1,
        "duration": 1,
        "factor": 1,
        "speed": 1
      }
    },
    "pauseOnBlur": true,
    "pauseOnOutsideViewport": true,
    "smooth": false,
    "style": {},
    "zLayers": 100,
    "name": "Snow",
    "motion": {
      "disable": false,
      "reduce": {
        "factor": 4,
        "value": true
      }
    }
  };

  return (
    <Particles
      className={`${currentSnowParam.snowIsValid==='1'?'':'hidden'}`}    
      id="particles"
      init={particlesInit}
      options={options}
      loaded={particlesLoaded}
    />
  )
}

export default ParticlesComponent