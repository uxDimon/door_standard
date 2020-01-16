import "./styles.scss";
import Swiper from "swiper";
import "../node_modules/swiper/css/swiper.min.css";

for (let i of document.querySelectorAll(".quest")) {
	// Скрывает или показывает tooltip
	let tooltip = i.parentElement.querySelector(".tooltip");
	let transition_duration = 150; // Время анимации появления тултипа в миллисекундах(ms)

	function tooltip_close() {
		tooltip.style.opacity = "0";
		tooltip.style.top = `-${tooltip.offsetHeight}px`;
		setTimeout(function() {
			tooltip.style.display = "none";
		}, transition_duration);
	}

	tooltip.style.transitionDuration = `${transition_duration}ms`;
	tooltip.style.top = `-${tooltip.offsetHeight}px`;
	tooltip.style.display = "none";

	i.addEventListener("click", function() {
		tooltip.style.display = "block";
		tooltip.style.top = `-${tooltip.offsetHeight + 25}px`;
		tooltip.style.opacity = "1";
	});

	tooltip.querySelector(".close").addEventListener("click", tooltip_close);

	let click_check = true;
	tooltip.addEventListener("mouseover", function() {
		// Запрещает закрывать тултип при наведенном на него курсоре
		click_check = false;
	});
	tooltip.addEventListener("mouseout", function() {
		click_check = true;
	});
	document.addEventListener("mouseup", function() {
		// Закрывает тултип при нажатии по нажатию мыши на в любую область
		if (click_check && tooltip.style.display == "block") {
			tooltip_close();
		}
	});
}

for (let i of document.querySelectorAll("body > div")) {
	// Если есть элементы  ".shadow_botton_wrap" и  ".img_wrap > img" то выполняются события смены изображений и тултипов
	if (i.querySelector(".shadow_botton_wrap") != null || i.querySelector(".img_wrap > img") != null) {
		let arr_botton = i.querySelectorAll(".shadow_botton_wrap");
		let arr_img = i.querySelectorAll(".img_wrap > img");
		let arr_desc = i.querySelectorAll(".description");

		let add_class = "hide_item";
		let add_class_botton = "active_botton";

		function add_rem_class(arr, classAdd, index_botton) {
			// Добавляет классы к списку элементов
			for (let value of arr) {
				value.classList.add(classAdd);
			}
			arr[index_botton].classList.remove(classAdd); // Удаляет класс у определенного индекса
		}
		function rem_add_class(arr, classAdd, index) {
			// Удаляет классы у списка элементов
			for (let i of arr) {
				i.classList.remove(classAdd);
			}
			arr[index].classList.add(classAdd); // Добавляет класс к определенному индексу
		}
		// Задает высоту горизонтальных линий
		function vert_line_height(arr, index) {
			let disc_height = arr_desc[index].offsetHeight;
			let vertical_line = arr[index].querySelector(".vertical_line");

			for (let value of arr) {
				value.querySelector(".vertical_line").style.height = "0px";
			}

			// Если горизонтальная линия ниже чем окно с описанием то её длина достигает горизонтальной линии
			if (arr[index].offsetTop + arr[index].querySelector(".horizontal_line").offsetTop < disc_height) {
				vertical_line.style.height = disc_height + "px";
			} else {
				vertical_line.style.height =
					arr[index].offsetTop + arr[index].querySelector(".horizontal_line").offsetTop + 2 + "px";
			}
		}

		function event_click_key(index) {
			add_rem_class(arr_img, add_class, index);
			rem_add_class(arr_botton, add_class_botton, index);
			if (arr_desc != null && arr_desc.length != 0) {
				add_rem_class(arr_desc, add_class, index);
				vert_line_height(arr_botton, index);
			}
		}

		event_click_key(0);

		if (i.querySelector(".advantage_block") != null) {
			let hor_line_left = i.querySelector(".botton_wrap").offsetLeft - i.querySelector(".advantage_block").offsetWidth;

			// Положение горизонтальной линии с лева. Если есть титул
			for (let horizontal_line of i.querySelectorAll(".botton_wrap .horizontal_line")) {
				horizontal_line.style.left = "-" + hor_line_left + "px";
			}

			// Положение вертикальной линии. Если есть титул
			for (let vertical_line of i.querySelectorAll(".botton_wrap .vertical_line")) {
				let vert_line_top = vertical_line.parentNode.offsetTop;
				vertical_line.style.left = "-" + hor_line_left - 2 + "px";
				vertical_line.style.top = "-" + vert_line_top + "px";
			}

			for (let [index, value] of arr_botton.entries()) {
				let description_text = arr_desc[index].innerHTML;
				value.querySelector(".tooltip").insertAdjacentHTML("beforeend", description_text); // Копируем содержимое описание в тайтал
				value.querySelector(".tooltip h2").remove(); // Удаляем заголовок
			}
		}

		for (let [index, value] of arr_botton.entries()) {
			// События при клики
			value.addEventListener("click", function() {
				if (value.classList.contains(add_class_botton) == false) {
					event_click_key(index);
				}
			});
			// События при нажатии Enter когда кнопка в фокусе
			value.addEventListener("keydown", function(event) {
				if (event.key == "Enter" || value.classList.contains(add_class_botton) == false) {
					event_click_key(index);
				}
			});
		}
	}
}

for (let i of document.querySelectorAll('input[type = "text"], input[type = "tel"]')) {
	// Добавляет класс к 'label > span' если в input есть значение
	i.onchange = function() {
		if (i.value != "") {
			i.nextElementSibling.classList.add("value_on");
		} else {
			i.nextElementSibling.classList.remove("value_on");
		}
	};
}

var mySwiper = new Swiper(".swiper1", {
	// https://swiperjs.com/api
	// Optional parameters
	loop: true,

	// If we need pagination
	pagination: {
		el: ".swiper-pagination"
	},

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	}
});
var mySwiper = new Swiper(".swiper2", {
	// Optional parameters
	loop: true,

	// If we need pagination
	pagination: {
		el: ".swiper-pagination"
	},

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	}
});
