import "./styles.scss";
import Swiper from "swiper";
import "../node_modules/swiper/css/swiper.min.css";

function lines_disc_img(plase) {
	let elem1 = document.querySelector(plase + " .botton_wrap");
	let botton_wrap_margin = window.getComputedStyle(elem1, null).marginLeft; // Узнаем отступ слева указанный в css
	botton_wrap_margin = Number(botton_wrap_margin.slice(0, -2)); // Убираем 'px' и преобразовываем в число
	let botton_wrap_width = elem1.offsetWidth; // Узнаем ширину

	for (let i of document.querySelectorAll(plase + " .shadow_botton_wrap")) {
		// Задаем высоту вертикальных полос так чтобы они доставали до верхнего края родительского элемента
		let cord = i.offsetTop; // Координаты относительно родителя
		i.querySelector(".vertical_line").style.top = "-" + cord + "px";
		i.querySelector(".vertical_line").style.right = botton_wrap_margin + botton_wrap_width + "px";
		i.querySelector(".horizontal_line").style.left = "-" + (botton_wrap_margin + 2) + "px";
	}
}
function lines_img(plase) {
	for (let i of document.querySelectorAll(plase + " .shadow_botton_wrap")) {
		let sh_botton = i.querySelector(".shadow_botton").offsetWidth;
		i.querySelector(".horizontal_line").style.right = sh_botton + "px";
	}
}

for (let i of document.querySelectorAll("body > div")) {
	if (i.querySelector(".shadow_botton_wrap") != null || i.querySelector(".img_wrap > img") != null) {
		let arr_botton = i.querySelectorAll(".shadow_botton_wrap");
		let arr_img = i.querySelectorAll(".img_wrap > img");
		let arr_desc = i.querySelectorAll(".description");

		let add_class = "test_";
		let add_class_botton = "test_1";

		// Если есть элементы  ".shadow_botton_wrap" и  ".img_wrap > img" то выполняются события смены изображений и тултипов
		function add_rem_class(arr, classAdd, index) {
			for (let i of arr) {
				i.classList.add(classAdd);
			}
			arr[index].classList.remove(classAdd);
		}
		function rem_add_class(arr, classAdd, index) {
			for (let i of arr) {
				i.classList.remove(classAdd);
			}
			arr[index].classList.add(classAdd);
		}

		function event_click_key(index) {
			add_rem_class(arr_img, add_class, index);
			rem_add_class(arr_botton, add_class_botton, index);
			if (arr_desc != null && arr_desc.length != 0) {
				add_rem_class(arr_desc, add_class, index);
			}
		}
		event_click_key(0);

		for (let [index, value] of arr_botton.entries()) {
			value.addEventListener("click", function() {
				// События при клики
				if (value.classList.contains(add_class_botton) == false) {
					event_click_key(index);
				}
			});
			value.addEventListener("keydown", function(event) {
				// События при нажатии Enter когда кнопка в фокусе
				if (event.key == "Enter" || value.classList.contains(add_class_botton) == false) {
					event_click_key(index);
				}
			});
		}
	}
}

function opacity_many_el(plase, element, value) {
	for (let i of document.querySelectorAll(plase + " " + element)) {
		i.style.opacity = value;
	}
}
function height_many_el(plase, element, value) {
	for (let i of document.querySelectorAll(plase + " " + element)) {
		i.style.height = value;
	}
}
function width_many_el(plase, element, value) {
	for (let i of document.querySelectorAll(plase + " " + element)) {
		i.style.width = value;
	}
}
function remuveClass_many_el(plase, element, remuveClass) {
	for (let i of document.querySelectorAll(plase + " " + element)) {
		i.classList.remove(remuveClass);
	}
}
function disc_img_selection(plase, botton_id, img_id, description_id) {
	let line_height = botton_id.offsetTop + botton_id.offsetHeight / 2; // Вычисляем длину линии от центра кнопки до верхнего края родительского элемента

	opacity_many_el(plase, ".description", 0);
	opacity_many_el(plase, ".img_wrap > img", 0);
	opacity_many_el(plase, ".vertical_line", 0);
	opacity_many_el(plase, ".horizontal_line", 0);
	height_many_el(plase, ".vertical_line", 0);
	width_many_el(plase, ".horizontal_line", 0);
	remuveClass_many_el(plase, ".active_shadow_botton", "active_shadow_botton");

	description_id.style.opacity = "1"; // Добавляем нужные классы или стили с учетам нажатия кнопки ↓
	img_id.style.opacity = "1";
	botton_id.querySelector(".vertical_line").style.opacity = "1";
	botton_id.querySelector(".horizontal_line").style.opacity = "1";
	botton_id.querySelector(".shadow_botton").classList.add("active_shadow_botton");

	if (line_height > description_id.offsetHeight) {
		// Задает высоту линии и ширину
		botton_id.querySelector(".vertical_line").style.height = line_height + "px";
	} else {
		botton_id.querySelector(".vertical_line").style.height = description_id.offsetHeight + "px";
	}
	botton_id.querySelector(".horizontal_line").style.width = "420px";
}
function img_selection(plase, botton_id, img_id) {
	opacity_many_el(plase, ".img_wrap > img", 0);
	opacity_many_el(plase, ".horizontal_line", 0);
	width_many_el(plase, ".horizontal_line", 0);
	remuveClass_many_el(plase, ".active_shadow_botton", "active_shadow_botton");

	img_id.style.opacity = "1";
	botton_id.querySelector(".horizontal_line").style.opacity = "1";
	botton_id.querySelector(".shadow_botton").classList.add("active_shadow_botton");
	botton_id.querySelector(".horizontal_line").style.width = "250px";
}
function show_description(plase, botton_id, img_id, description_id) {
	let event_element = botton_id.querySelector(".shadow_botton");
	event_element.addEventListener("click", function() {
		// События при клики
		if (description_id != null) {
			disc_img_selection(plase, botton_id, img_id, description_id);
		} else {
			img_selection(plase, botton_id, img_id);
		}
	});
	event_element.addEventListener("keydown", function(event) {
		// События при нажатии Enter когда кнопка в фокусе
		if (event.key == "Enter") {
			if (description_id != null) {
				disc_img_selection(plase, botton_id, img_id, description_id);
			} else {
				img_selection(plase, botton_id, img_id);
			}
		}
	});
}

function tooltip() {
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
}
function clone_description(botton_id, description_id) {
	// Копируем содержимое описание в тайтал
	let description_text = description_id.innerHTML;
	botton_id.querySelector(".tooltip").insertAdjacentHTML("beforeend", description_text);
	botton_id.querySelector(".tooltip h2").remove(); // Удаляем заголовок
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

clone_description(sh_botton_0_1, desc_0_1);
clone_description(sh_botton_0_2, desc_0_2);
clone_description(sh_botton_0_3, desc_0_3);
clone_description(sh_botton_0_4, desc_0_4);
clone_description(sh_botton_0_5, desc_0_5);

clone_description(sh_botton_2_1, desc_2_1);
clone_description(sh_botton_2_2, desc_2_2);
clone_description(sh_botton_2_3, desc_2_3);
clone_description(sh_botton_2_4, desc_2_4);
clone_description(sh_botton_2_5, desc_2_5);

tooltip();

lines_disc_img(".door_advantages");
lines_img(".top_lock");
lines_disc_img(".security_points");
lines_img(".door_armor");

disc_img_selection(".door_advantages", sh_botton_0_1, img_dor_0_1, desc_0_1);
img_selection(".top_lock", sh_botton_1_1, img_dor_1_1);
disc_img_selection(".security_points", sh_botton_2_1, img_dor_2_1, desc_2_1);
img_selection(".door_armor", sh_botton_3_1, img_dor_3_1);

window.onload = function() {
	lines_disc_img(".door_advantages");
	lines_img(".top_lock");
	lines_disc_img(".security_points");
	lines_img(".door_armor");

	disc_img_selection(".door_advantages", sh_botton_0_1, img_dor_0_1, desc_0_1);
	img_selection(".top_lock", sh_botton_1_1, img_dor_1_1);
	disc_img_selection(".security_points", sh_botton_2_1, img_dor_2_1, desc_2_1);
	img_selection(".door_armor", sh_botton_3_1, img_dor_3_1);
};

show_description(".door_advantages", sh_botton_0_1, img_dor_0_1, desc_0_1);
show_description(".door_advantages", sh_botton_0_2, img_dor_0_2, desc_0_2);
show_description(".door_advantages", sh_botton_0_3, img_dor_0_3, desc_0_3);
show_description(".door_advantages", sh_botton_0_4, img_dor_0_4, desc_0_4);
show_description(".door_advantages", sh_botton_0_5, img_dor_0_5, desc_0_5);

show_description(".top_lock", sh_botton_1_1, img_dor_1_1);
show_description(".top_lock", sh_botton_1_2, img_dor_1_2);

show_description(".security_points", sh_botton_2_1, img_dor_2_1, desc_2_1);
show_description(".security_points", sh_botton_2_2, img_dor_2_2, desc_2_2);
show_description(".security_points", sh_botton_2_3, img_dor_2_3, desc_2_3);
show_description(".security_points", sh_botton_2_4, img_dor_2_4, desc_2_4);
show_description(".security_points", sh_botton_2_5, img_dor_2_5, desc_2_5);

show_description(".door_armor", sh_botton_3_1, img_dor_3_1);
show_description(".door_armor", sh_botton_3_2, img_dor_3_2);
