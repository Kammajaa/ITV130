/**
* Slot machine
* Author: Saurabh Odhyan | http://odhyan.com
*
* Licensed under the Creative Commons Attribution-ShareAlike License, Version 3.0 (the "License")
* You may obtain a copy of the License at
* http://creativecommons.org/licenses/by-sa/3.0/
*
* Date: May 23, 2011
*/
$(document).ready(function() {
	/**
	* Global variables
	*/
	var completed = 0,
		imgHeight = 1204,
		start = 60,
		win = false,
		wi = 3,
		running = false,
		posArr = [
			start - 10, //alarm
			start + 148, //horse
			start + 148 * 2, //cherries
            start + 148 * 3, //chest
            start + 148 * 4, //coin
            start + 148 * 5, //number-seven
            start + 148 * 6, //piggy-bank
            start + 148 * 7  //small-diamond
		];

	var win = [];
	win[0] = win[454] = win[913] = 1;
	win[80] = win[539] = win[1000] = 2;
	win[165] = win[624] = win[1085] = 3;
	win[237] = win[696] = win[1157] = 4;
	win[310] = win[769] = win[1230] = 5;
	win[378] = win[837] = win[1298] = 6;

	/**
	* @class Slot
	* @constructor
	*/
	function Slot(el, max, step) {
		this.speed = 0; //speed of the slot at any point of time
		this.step = step; //speed will increase at this rate
		this.si = null; //holds setInterval object for the given slot
		this.el = el; //dom element of the slot
		this.maxSpeed = max; //max speed this slot can have
		this.pos = null; //final position of the slot

		$(el).pan({
            fps:30,
            dir:'down'
        });
		$(el).spStop();
	}

	/**
	* @method start
	* Starts a slot
	*/
	Slot.prototype.start = function() {
		var _this = this;
		// $(_this.el).addClass('motion');
        $(_this.el).spStart();
		_this.si = window.setInterval(function() {
			if(_this.speed < _this.maxSpeed) {
				_this.speed += _this.step;
				$(_this.el).spSpeed(_this.speed);
			}
		}, 100);
	};

	/**
	* @method stop
	* Stops a slot
	*/
	Slot.prototype.stop = function() {
		var _this = this,
			limit = 30;
		clearInterval(_this.si);
		_this.si = window.setInterval(function() {
			if(_this.speed > limit) {
				_this.speed -= _this.step;
				$(_this.el).spSpeed(_this.speed);
			}
			if(_this.speed <= limit) {
				_this.finalPos(_this.el);
				$(_this.el).spSpeed(0);
				$(_this.el).spStop();
				clearInterval(_this.si);
				// $(_this.el).removeClass('motion');
				_this.speed = 0;
			}
		}, 100);
	};

	/**
	* @method finalPos
	* Finds the final position of the slot
	*/
	Slot.prototype.finalPos = function() {
		var el = this.el,
			el_id,
			pos,
			posMin = 2000000000,
			best,
			bgPos,
			i,
			j,
			k;

		el_id = $(el).attr('id');
		//pos = $(el).css('background-position'); //for some unknown reason, this does not work in IE
		pos = document.getElementById(el_id).style.backgroundPosition;
		pos = pos.split(' ')[1];
		pos = parseInt(pos, 10);
		if (win) {

		}
		for(i = 0; i < posArr.length; i++) {
			if (win) {
				i = wi;
			}
			for(j = 0;;j++) {
				k = posArr[i] + (imgHeight * j);
				if(k > pos) {
					if((k - pos) < posMin) {
						posMin = k - pos;
						best = k;
						this.pos = posArr[i]; //update the final position of the slot
					}
					break;
				}
			}
			if (win) {
				break;
			}
		}

		best += imgHeight + 4;
		bgPos = "50% " + best + "px";
		$(el).animate({
			backgroundPosition:"(" + bgPos + ")"
		}, {
			duration: 600,
			complete: function() {
				completed ++;
            }
		});
		console.log(best);
	};

	/**
	* @method reset
	* Reset a slot to initial state
	*/
	Slot.prototype.reset = function() {
		var el_id = $(this.el).attr('id');
        $._spritely.instances[el_id].t = 0;
        console.log(this.pos % imgHeight);

		$(this.el).css('background-position', '50% ' + this.pos % imgHeight + 'px');
		this.speed = 0;
		completed = 0;
	};


	function checkWin() {
		if (a.pos === b.pos && a.pos === c.pos) {
			startCoinAnimation();
			setTimeout(function() {
				running = false;
			}, 6500);
		} else {
            running = false;
        }
	}

	//create slot objects
	var a = new Slot('#slot1', Math.floor((Math.random() * 10)) + 30, 1),
		b = new Slot('#slot2', Math.floor((Math.random() * 10)) + 30, 2),
		c = new Slot('#slot3', Math.floor((Math.random() * 10)) + 30, 3);

	/**
	* Slot machine controller
	*/
	$('.nob').click(function() {
		if (running) {
			return;
		}
		running = true;
		var x;
		pullLeaver();
		// a.reset();
		// b.reset();
		// c.reset();
		a.start();
		b.start();
		c.start();

		win = Math.random() > 0.5;
		wi = Math.floor((Math.random() * posArr.length));
		console.log(win);

		// disableControl(); //disable control until the slots reach max speed

		setTimeout(function() {
			a.stop();
			b.stop();
			c.stop();
			x = window.setInterval(function() {
				if(a.speed === 0 && b.speed === 0 && c.speed === 0 && completed === 3) {
					// enableControl();
					window.clearInterval(x);
					completed = 0;
                    checkWin();
				}
			}, 100);
		}, 2900);
	});
});
