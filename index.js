    var LOADING = document.getElementById('js-loading');
    var NOTIF = document.getElementById('js-notif');
    var TRAY = document.getElementById('js-tray-slide');
    var LATAR = "#cafaec";

    var MYFBX = "model/sofa-panjang.FBX";

    var theModel;
    var model = [];
    var loaded = false;
    var raycaster,intersects, mouse;

    var activeOption = 'body';

    const colors = [
      {
        texture: 'img/1.jpg',
        size: [0.2, 0.2, 0.2],
        shininess: 60 },
      
      {
        texture: 'img/2.jpg',
        size: [0.05, 0.05, 0.05],
        shininess: 0 },
      
      {
        texture: 'img/3.jpg',
        size: [0.5, 0.25, 0.25],
        shininess: 10 },
      
      {
        texture: 'img/4.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 0
      },

      {
        texture: 'img/5.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/6.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/7.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/8.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/9.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/10.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/11.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/12.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/13.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/14.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/15.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/16.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/17.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/18.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/19.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/20.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/21.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      },

      {
        texture: 'img/22.jpg',
        size: [0.25, 0.25, 0.25],
        shininess: 10
      }

      ];
      
      



//SCENE
    var scene = new THREE.Scene();
          scene.background = new THREE.Color(LATAR);
          var canvas = document.querySelector('#c');


//RENDERER
    var renderer = new THREE.WebGLRenderer({canvas, antialias : true});
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
 
        document.body.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);
    

//CAMERA
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(0, 20, 100);


//LIGHT
    var directionalLight, ambientLight;
        directionalLight = new THREE.DirectionalLight(0x404040, 2);
        directionalLight.position.set(-10, 50, 10);
        directionalLight.castShadow = true;
        directionalLight.target.position.set(2, 1, 1);
    scene.add(directionalLight);

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
        hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.254)

    var light = new THREE.PointLight(0xDDDBD3, 1, 500);
        light.position.set(-25, 30, -10);
        light.castShadow = true;
    scene.add(light);

    var light2 = new THREE.PointLight(0x202739, 1, 1000);
        light2.position.set(40, 40, 0);
        light2.castShadow = true;
    scene.add(light2);

    var light3 = new THREE.PointLight(0x010101, 1, 250);
        light3.position.set(0, 30, 10);
        light3.castShadow = true;
    scene.add(light3);

//SHADOW
light.shadow.mapSize.width = 512;  // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5;       // default
light.shadow.camera.far = 500;     // default

light3.shadow.mapSize.width = 512;  // default
light3.shadow.mapSize.height = 512; // default
light3.shadow.camera.near = 0.5;       // default
light3.shadow.camera.far = 500;     // default

light2.shadow.mapSize.width = 512;  // default
light2.shadow.mapSize.height = 512; // default
light2.shadow.camera.near = 5;       // default
light2.shadow.camera.far = 500;     // default


//CONTROL

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enebleDumping = true;
        controls.dumpingFactor = 0.25;
        controls.minDistance = 50;
        controls.maxDistance = 500;
        controls.maxPolarAngle = Math.PI / 2;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2; // 30


// PLAN
    var geoFloor = new THREE.CircleGeometry( 50, 60 );
    var matFloor = new THREE.MeshPhongMaterial({color: "#2d2e2e",
    shininess: 50});

    var mshFloor = new THREE.Mesh( geoFloor, matFloor );
        mshFloor.receiveShadow = true;
        mshFloor.rotation.x = -0.5 * Math.PI;
        mshFloor.position.set( 0, - 0.5, 0 );
        scene.add( mshFloor );

//LOGO
var geo = new THREE.PlaneBufferGeometry(10, 10, 8, 8);
    geo.rotation = -5 * Math.PI;
var log = new THREE.MeshBasicMaterial();
var geolog = new THREE.TextureLoader();
    geolog.load('jpg/logo_bulat.png', function(texture){
      log.map = texture;
      log.wrapS = THREE.RepeatWrapping;
      log.wrapT = THREE.RepeatWrapping;
      log.needsUpdate = true;
    });
var logo = new THREE.Mesh(geo, log);
    logo.receiveShadow = true;
    logo.rotation.x = -0.5 * Math.PI;
    logo.rotation.z = -0.5 * Math.PI;
    logo.position.set( -30, 0, 0 );
    scene.add( logo );

    var logo2 = new THREE.Mesh(geo, log);
    logo2.receiveShadow = true;
    logo2.rotation.x = -0.5 * Math.PI;
    logo2.rotation.z = 0.5 * Math.PI;
    logo2.position.set( 30, 0, 0 );
    scene.add( logo2 );






// ORIGINAL MATERIAL
  const alas = new THREE.TextureLoader().load('model/sofa panjang-rev.fbm/cloth_06_de.jpg',function (alas) {
    alas.offset.set( 0, 0 );
    alas.repeat.set(0.05, 0.05);
    alas.wrapS = THREE.RepeatWrapping;
    alas.wrapT = THREE.RepeatWrapping;
  });
  const bantal = new THREE.TextureLoader().load('model/sofa panjang-rev.fbm/2ndbed blue.jpg');
  const rotan = new THREE.TextureLoader().load('model/sofa panjang-rev.fbm/Copy of rotan sintetis Kuning.jpg', function (rotan) {
    rotan.offset.set( 0, 0 );
    rotan.repeat.set(0.15, 0.15);
    rotan.wrapS = THREE.RepeatWrapping;
    rotan.wrapT = THREE.RepeatWrapping;
  });

  var alasMAT = new THREE.MeshPhongMaterial();
  var bantalMAT = new THREE.MeshPhongMaterial();
  var rotanMAT = new THREE.MeshPhongMaterial();



//INISIAL MAP
    const INITIAL_MAP = [
        {childID: "bantal", mtl:bantalMAT},//bantal
        {childID: "body", mtl:rotanMAT},//bantal
        {childID: "dudukan", mtl:alasMAT}//kain
    ];



        
//LOADER
var loader = new THREE.FBXLoader();
    loader.load(MYFBX, function (fbx) {
    theModel = fbx;
    theModel.scale.set(0.25, 0.25, 0.25);
    theModel.traverse(function (children) {
      model.push(children);
      if (children.isMesh){
        children.castShadow = true;
        children.receiveShadow = true;
      }
    });

//SET INISIAL TEXTURE
    for (let object of INITIAL_MAP) {
      initColor(theModel, object.childID, object.mtl);
    }

    scene.add(theModel);
    LOADING.remove();

  });

  function initColor(parent, type, mtl) {
    parent.traverse(children => {
      if (children.isMesh) {
        if (children.name.includes(type)) {
          children.material = mtl;
          children.nameID = type; 
         }
      }
    });
  }

  
  
function buildColors(colors) {
  for (let [i, color] of colors.entries()){
    let swatch = document.createElement('div');
        swatch.classList.add('tray__swatch');

        if (color.texture){
          swatch.style.backgroundImage = "url("+color.texture + ")";
        }
        swatch.setAttribute('data-key', i);
        TRAY.append(swatch);
  }

}

  buildColors(colors);

//Select Option
const options = document.querySelectorAll(".option");

for (const option of options) {
  option.addEventListener('click', selectOption);
}

function selectOption(e) {
  let option = e.target;
  activeOption = e.target.dataset.option;
  for (const otherOption of options) {
    otherOption.classList.remove('--is-active');
  }
  option.classList.add('--is-active');
}

// Swatches
const swatches = document.querySelectorAll(".tray__swatch");

for (const swatch of swatches) {
  swatch.addEventListener('click', selectSwatch);
}

function selectSwatch(e) {
  let color = colors[parseInt(e.target.dataset.key)];
  let new_mtl;

  if (color.texture) {

    let txt = new THREE.TextureLoader().load(color.texture);

    txt.repeat.set(color.size[0], color.size[1], color.size[2]);
    txt.wrapS = THREE.RepeatWrapping;
    txt.wrapT = THREE.RepeatWrapping;

    new_mtl = new THREE.MeshPhongMaterial({
      map: txt,
      shininess: color.shininess ? color.shininess : 10 });

  } else

  {
    new_mtl = new THREE.MeshPhongMaterial({
      color: parseInt('0x' + color.color),
      shininess: color.shininess ? color.shininess : 10 });


  }

  setMaterial(theModel, activeOption, new_mtl);
}

function setMaterial(parent, type, mtl) {
  parent.traverse(o => {
    if (o.isMesh && o.nameID != null) {
      if (o.nameID == type) {
        o.material = mtl;
      }
    }
  });
}

      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();
      document.addEventListener('mousedown', onDocumentMouseDown, false);
      document.addEventListener('touchstart', onDocumentTouchStart, false);


  
//FUNGSI MOBILE FRENDLY
function onWindowResize(renderer) {
  const canvas = renderer.domElement;

  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize = canvasPixelWidth !== window.innerWidth || canvasPixelHeight !== window.innerHeight;
  if (needResize) {

    renderer.setSize(window.innerWidth, window.innerHeight, false);
  }
  return needResize;
}



//RAYCASTING


function onDocumentTouchStart( event ) {
  event.preventDefault();
  event.clientX = event.touches[0].clientX;
  event.clientY = event.touches[0].clientY;
  onDocumentMouseDown( event );

}

function onDocumentMouseDown( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( model );
  
  var color =(Math.random() * 0xAABBCC);

  if ( intersects.length > 0 ) {

  
      intersects[ 0 ].object.material.color.setHex( color );

      this.temp = intersects[ 0 ].object.material.color.getHexString();

      this.name = intersects[ 0 ].object.name;
    
  
  }
  
}   


//DRAG FUNCTION

var slider = document.getElementById('js-tray'),sliderItems = document.getElementById('js-tray-slide'),difference;

function slide(wrapper, items) {
  var posX1 = 0,
  posX2 = 0,
  posInitial,
  threshold = 20,
  posFinal,
  slides = items.getElementsByClassName('tray__swatch');

  // Mouse events
  items.onmousedown = dragStart;

  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);


  function dragStart(e) {
    e = e || window.event;
    posInitial = items.offsetLeft;
    difference = sliderItems.offsetWidth - slider.offsetWidth;
    difference = difference * -1;

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }

    if (items.offsetLeft - posX2 <= 0 && items.offsetLeft - posX2 >= difference) {
      items.style.left = items.offsetLeft - posX2 + "px";
    }
  }

  function dragEnd(e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {

    } else if (posFinal - posInitial > threshold) {

    } else {
      items.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

}

slide(slider, sliderItems);


function animate() {
    
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
      if (theModel != null && loaded == false) {
        NOTIF.classList.add('start');
      }
  
  }

  if (onWindowResize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  
  animate();



