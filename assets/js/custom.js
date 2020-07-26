(function ($) {

	"use strict";

	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();


	// Menu Dropdown Toggle
	if ($('.menu-trigger').length) {
		$(".menu-trigger").on('click', function () {
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('a[href*=\\#]:not([href=\\#])').on('click', function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				var width = $(window).width();
				if (width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);
				}
				$('html,body').animate({
					scrollTop: (target.offset().top) - 130
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
		$(document).on("scroll", onScroll);

		//smoothscroll
		$('a[href^="#"]').on('click', function (e) {
			e.preventDefault();
			$(document).off("scroll");

			$('a').each(function () {
				$(this).removeClass('active');
			})
			$(this).addClass('active');

			var target = this.hash,
				menu = target;
			var target = $(this.hash);
			$('html, body').stop().animate({
				scrollTop: (target.offset().top) - 130
			}, 500, 'swing', function () {
				window.location.hash = target;
				$(document).on("scroll", onScroll);
			});
		});
	});

	function onScroll(event) {
		var scrollPos = $(document).scrollTop();
		$('.nav a').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
				$('.nav ul li a').removeClass("active");
				currLink.addClass("active");
			}
			else {
				currLink.removeClass("active");
			}
		});
	}


	// Home seperator
	if ($('.home-seperator').length) {
		$('.home-seperator .left-item, .home-seperator .right-item').imgfix();
	}


	// Home number counterup
	if ($('.count-item').length) {
		$('.count-item strong').counterUp({
			delay: 10,
			time: 1000
		});
	}


	// Page loading animation
	$(window).on('load', function () {
		if ($('.cover').length) {
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function () {
			setTimeout(function () {
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function () {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function () {
			if (width < 992) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}


})(window.jQuery);


// Changing the pricing based on custom location

function getIP(json) {
	if (json.country) {
		var pricingStartup, pricingCompany, pricingBusiness;

		switch (json.country) {
			case "India":
				pricingStartup = "₹5000",
					pricingCompany = "₹12000",
					pricingBusiness = "₹15000+"
				break;

			case "United Kingdom":
				pricingStartup = "£85",
					pricingCompany = "£150",
					pricingBusiness = "£220+"
				break;

			case "Germany":
				pricingStartup = "€65",
					pricingCompany = "€115",
					pricingBusiness = "€170+"
				break;

			case "Canada":
				pricingStartup = "$100",
					pricingCompany = "$215",
					pricingBusiness = "$320+"
				break;

			case "United States":
				pricingStartup = "$95",
					pricingCompany = "$195",
					pricingBusiness = "$295+"
				break;

			case "Nigeria":
				pricingStartup = "₦25000",
					pricingCompany = "₦70000",
					pricingBusiness = "₦100000+"
				break;
				
			case "South Africa":
				pricingStartup = "R1000",
					pricingCompany = "R2500",
					pricingBusiness = "R5500+"
			break;

			default:
				pricingStartup = "₹5000",
					pricingCompany = "₹12000",
					pricingBusiness = "₹15000+"
				break;
		}

		var valueStartup = document.getElementById('pricingStartup');
		var valueCompany = document.getElementById('pricingCompany');
		var valueBusiness = document.getElementById('pricingBusiness');


		valueStartup.innerHTML = pricingStartup;
		valueCompany.innerHTML = pricingCompany;
		valueBusiness.innerHTML = pricingBusiness;

	}
}


// Our Partners Carousel Slider

	const lerp = (f0, f1, t) => (1 - t) * f0 + t * f1;
	const clamp = (val, min, max) => Math.max(min, Math.min(val, max));

	class DragScroll {
	constructor(obj) {
		this.$el = document.querySelector(obj.el);
		this.$wrap = this.$el.querySelector(obj.wrap);
		this.$item = this.$el.querySelectorAll(obj.item);
		this.$bar = this.$el.querySelector(obj.bar);
		this.init();
	}

	init() {
		this.progress = 0;
		this.speed = 0;
		this.oldX = 0;
		this.x = 0;
		this.playrate = 0;
		//
		this.bindings();
		this.events();
		this.calculate();
		this.raf();
	}

	bindings() {
		[
		'events',
		'calculate',
		'raf',
		'handleWheel',
		'move',
		'raf',
		'handleTouchStart',
		'handleTouchMove',
		'handleTouchEnd'].
		forEach(i => {this[i] = this[i].bind(this);});
	}

	calculate() {
		this.progress = 0;
		this.wrapWidth = 0;
		this.$item.forEach(i => {
		this.wrapWidth += i.clientWidth;
		});
		this.$wrap.style.width = `${this.wrapWidth}px`;
		this.maxScroll = this.wrapWidth - this.$el.clientWidth;
	}

	handleWheel(e) {
		this.progress += e.deltaY;
		this.move();
	}

	handleTouchStart(e) {
		e.preventDefault();
		this.dragging = true;
		this.startX = e.clientX || e.touches[0].clientX;
		this.$el.classList.add('dragging');
	}

	handleTouchMove(e) {
		if (!this.dragging) return false;
		const x = e.clientX || e.touches[0].clientX;
		this.progress += (this.startX - x) * 2.5;
		this.startX = x;
		this.move();
	}

	handleTouchEnd() {
		this.dragging = false;
		this.$el.classList.remove('dragging');
	}

	move() {
		this.progress = clamp(this.progress, 0, this.maxScroll);
	}

	events() {
		window.addEventListener('resize', this.calculate);
		window.addEventListener('wheel', this.handleWheel);
		//
		this.$el.addEventListener('touchstart', this.handleTouchStart);
		window.addEventListener('touchmove', this.handleTouchMove);
		window.addEventListener('touchend', this.handleTouchEnd);
		//
		window.addEventListener('mousedown', this.handleTouchStart);
		window.addEventListener('mousemove', this.handleTouchMove);
		window.addEventListener('mouseup', this.handleTouchEnd);
		document.body.addEventListener('mouseleave', this.handleTouchEnd);
	}

	raf() {
		requestAnimationFrame(this.raf);
		this.x = lerp(this.x, this.progress, 0.1);
		this.playrate = this.x / this.maxScroll;
		//
		this.$wrap.style.transform = `translateX(${-this.x}px)`;
		this.$bar.style.transform = `scaleX(${.18 + this.playrate * .82})`;
		//
		this.speed = Math.min(100, this.oldX - this.x);
		this.oldX = this.x;
		//
		this.scale = lerp(this.scale, this.speed, 0.1);
		this.$item.forEach(i => {
		i.style.transform = `scale(${1 - Math.abs(this.speed) * 0.002})`;
		i.querySelector('img').style.transform = `scaleX(${1 + Math.abs(this.speed) * 0.004})`;
		});
	}}


	const scroll = new DragScroll({
	el: '.carousel',
	wrap: '.carousel--wrap',
	item: '.carousel--item',
	bar: '.carousel--progress-bar' });