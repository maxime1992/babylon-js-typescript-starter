import {
  Engine,
  Scene,
  Light,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Mesh,
  ArcRotateCamera,
} from 'babylonjs';

export class Game {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private scene: Scene;
  private camera: ArcRotateCamera;
  private light: Light;

  constructor(canvasElement: string) {
    this.canvas = document.getElementById(canvasElement) as HTMLCanvasElement;

    const antialiasing = true;
    this.engine = new Engine(this.canvas, antialiasing);
  }

  createScene(): void {
    this.scene = new Scene(this.engine);

    this.camera = new ArcRotateCamera(
      'camera1',
      0,
      Math.PI / 2,
      13,
      BABYLON.Vector3.Zero(),
      this.scene
    );

    this.camera.setTarget(Vector3.Zero());

    this.camera.attachControl(this.canvas, false);

    // light aiming at the sky
    this.light = new HemisphericLight(
      'light1',
      new Vector3(0, 1, 0),
      this.scene
    );

    const sphereDiameter = 2;
    const sphere: Mesh = MeshBuilder.CreateSphere(
      'sphere',
      { segments: 20, diameter: sphereDiameter },
      this.scene
    );

    sphere.position.y = sphereDiameter / 2;

    const ground = MeshBuilder.CreateGround(
      'ground',
      { width: 6, height: 6, subdivisions: 2 },
      this.scene
    );
  }

  doRender(): void {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }
}
