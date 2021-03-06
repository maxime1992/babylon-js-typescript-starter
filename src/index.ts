import { Game } from './game/game';

declare const module;

// avoid hot reload with Parcel
// https://github.com/parcel-bundler/parcel/issues/289#issuecomment-393106708
if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const game: Game = new Game('renderCanvas');

  game.createScene();

  game.doRender();
});
