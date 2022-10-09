"use strict";

let data = [	//地図データ、0:通路、1:目的地、2:荷物、6:壁
	[6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
	[6, 6, 6, 6, 6, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
	[6, 6, 6, 6, 6, 2, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
	[6, 6, 6, 6, 6, 0, 0, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
	[6, 6, 6, 0, 0, 2, 0, 0, 2, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
	[6, 6, 6, 0, 6, 0, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
	[6, 0, 0, 0, 6, 0, 6, 6, 6, 0, 6, 6, 6, 6, 0, 0, 1, 1, 6, 6],
	[6, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 6, 6],
	[6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 0, 6, 0, 6, 0, 0, 1, 1, 6, 6],
	[6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6],
	[6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
];

let gc;			//canvasに描画するためのグラフィックコンテキスト
let px = 12;	//主人公のx座標
let py = 8;		//主人公のy座標

//初期化関数
function init() {
	//canvasの描画用コンテキストを変数gcに格納
	gc = document.getElementById("soko").getContext("2d");
	//キー押下時のイベントハンドラにmykeydownを登録
	onkeydown = mykeydown;
	//再描画
	repaint();
}

//上下左右ボタンが押された時のコールバック
function l() {
	mykeydown({keyCode:37});
}

//上下左右ボタンが押された時のコールバック
function u() {
	mykeydown({keyCode:38});
}

//上下左右ボタンが押された時のコールバック
function r() {
	mykeydown({keyCode:39});
}

//上下左右ボタンが押された時のコールバック
function d() {
	mykeydown({keyCode:40});
}

//キー押下時のイベントハンドラ
function mykeydown(e) {
	//ひとつ先の座標
	let dx0 = px;
	let dy0 = py;
	//さらに先の座標
	let dx1 = px;
	let dy1 = py;
	switch (e.keyCode) {
		case 37:
			dx0--;
			dx1 -= 2;
			break;
		case 38:
			dy0--;
			dy1 -= 2;
			break;
		case 39:
			dx0++;
			dx1 += 2;
			break;
		case 40:
			dy0++;
			dy1 += 2;
			break;
	}

	//荷物なし&壁なし→進む
	if ((data[dy0][dx0] & 0x2) == 0) {
		px = dx0;
		py = dy0;
	//進行方向に荷物あり
	} else if ((data[dy0][dx0] & 0x6) == 2) {
		//荷物なし&壁なし→進む
		if ((data[dy1][dx1] & 0x2) == 0) {
			//隣の荷物をクリア
			data[dy0][dx0] ^= 2;
			//更に先に荷物をセット
			data[dy1][dx1] |= 2;
			px = dx0;
			py = dy0;
		}
	}
	repaint();
}

function repaint() {
	//背景をすべてクリア
	gc.fillStyle = "black";
	gc.fillRect(0, 0, 800, 440);
	for (let y = 0; y < data.length; y++) {
		for (let x = 0; x < data[y].length; x++) {
			if (data[y][x] & 0x1) {
				gc.drawImage(imgGoal, x * 40, y * 40, 40, 40);
			}
			if (data[y][x] & 0x2) {
				gc.drawImage(imgLuggage, x * 40, y * 40, 40, 40);
			}
			if (data[y][x] == 6) {
				gc.drawImage(imgWall, x * 40, y * 40, 40, 40);
			}
		}
	}
	gc.drawImage(imgWorker, px * 40, py * 40, 40, 40);
}