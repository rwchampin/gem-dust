// app.js
import bongiovi from "bongiovi";
import App from "./App";
import SceneApp from "./SceneApp";
window.params = {
	numParticles: 256 * 2,
	sphereSize: 50
};

(function () {


	App = function () {
		var l = new bongiovi.SimpleImageLoader();
		var a = ["assets/particle.png", "assets/blue.jpg", "assets/gold.jpg"];
		l.load(a, this, this._onImageLoaded);
	}

	var p = App.prototype;

	p._onImageLoaded = function (img) {
		window.images = img;
		if (document.body) this._init();
		else {
			window.addEventListener("load", this._init.bind(this));
		}
	};

	p._init = function () {
		this.canvas = document.createElement("canvas");
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.canvas.className = "Main-Canvas";
		document.body.appendChild(this.canvas);
		bongiovi.GL.init(this.canvas);

		this._scene = new SceneApp();
		bongiovi.Scheduler.addEF(this, this._loop);

		// this.gui = new dat.GUI({width:300});
	};

	p._loop = function () {
		this._scene.loop();
	};

})();


new App();