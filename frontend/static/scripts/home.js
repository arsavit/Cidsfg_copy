(function ($) {
    $.fn.timeline = function () {
        var selectors = {
            id: $(this),
            item: $(this).find(".timeline-item"),
            activeClass: "timeline-item--active",
            img: ".timeline__img"
        };
        selectors.item.eq(0).addClass(selectors.activeClass);
        selectors.id.css(
            "background-image",
            "url(" +
            selectors.item
                .first()
                .find(selectors.img)
                .attr("data-bg-src") +
            ")"
        );
        selectors.id.css(
            "background-position",
            "center center"
        );
        var itemLength = selectors.item.length;
        $(window).scroll(function () {
            var max, min;
            var pos = $(this).scrollTop();
            selectors.item.each(function (i) {
                min = $(this).offset().top - 200;
                max = $(this).height() + $(this).offset().top + 200;
                var that = $(this);
                if (i == itemLength - 2 && pos > min + $(this).height() / 2) {
                    selectors.item.removeClass(selectors.activeClass);
                    selectors.id.css(
                        "background-image",
                        "url(" +
                        selectors.item
                            .last()
                            .find(selectors.img)
                            .attr("data-bg-src") +
                        ")"
                    );
                    selectors.id.css(
                        "background-position",
                        "center center"
                    );
                    selectors.item.last().addClass(selectors.activeClass);
                } else if (pos <= max - 230 && pos >= min) {
                    selectors.id.css(
                        "background-image",
                        "url(" +
                        $(this)
                            .find(selectors.img)
                            .attr("data-bg-src") +
                        ")"
                    );
                    selectors.id.css(
                        "background-position",
                        "center center"
                    );
                    selectors.item.removeClass(selectors.activeClass);
                    $(this).addClass(selectors.activeClass);
                }
            });
        });
    };
})(jQuery);

$("#timeline-1").timeline();

const lazyLoadInstance = new LazyLoad({});

//Swipers

const getCatalogSlidesPerView = () => {
    if (document.documentElement.clientWidth > 1199) {
        return 3
    } else if (document.documentElement.clientWidth > 768) {
        return 2
    } else {
        return 1
    }
}

const getCatalogSpaceBetween = () => {
    if (document.documentElement.clientWidth > 1199) {
        return 80
    } else if (document.documentElement.clientWidth > 992) {
        return 150
    }
    else if (document.documentElement.clientWidth > 768) {
        return 20
    }
    else {
        return 5
    }
}

const swiper = new Swiper('.swiper-container-detail', {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',

    },
});

let swiperCatalog = new Swiper('#swiper1', {
    slidesPerView: getCatalogSlidesPerView(),
    spaceBetween: getCatalogSpaceBetween(),
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',

    },
});

window.addEventListener('resize', function () {
    swiperCatalog.params.slidesPerView = getCatalogSlidesPerView();
    swiperCatalog.params.spaceBetween = getCatalogSpaceBetween();
    // swiperCatalog.reInit();

});

// табы

const navItemsCatalog = document.querySelectorAll('.tabs-controls-item.catalog'),
    bodyItemsCatalog = document.querySelectorAll('.body-item.catalog'),
    navArrayCatalog = Array.prototype.slice.call(navItemsCatalog),
    catalogContainer = document.querySelector('.tabs-controls-wrapper.catalog .container');

const setActive = (e, itemList) => {
    itemList.forEach(el => {
        el.classList.remove('active');
    });
    e.classList.add('active');
}

const scrollToActiveTab = (e, arr, container) => {
    let getWidth = 0;

    arr.every(element => {
        if (e === element) {
            return false;
        } else {
            getWidth += element.offsetWidth;
            return true;
        }

    });
    container.scrollLeft = getWidth - 25;
}

navItemsCatalog.forEach(e => {
    e.addEventListener('click', () => {
        if (!e.classList.contains('active')) {
            const tabId = e.getAttribute('data-for'),
                tabBodyItem = document.querySelector(`#${tabId}`);
            setActive(e, navItemsCatalog);
            setActive(tabBodyItem, bodyItemsCatalog);
            const swiperID = tabBodyItem.querySelector('.swiper-container-catalog').id;
            const nextID = tabBodyItem.querySelector('.swiper-button-next').id;
            const prevID = tabBodyItem.querySelector('.swiper-button-prev').id;
            let swiperCatalog = new Swiper(`#${swiperID}`, {
                slidesPerView: getCatalogSlidesPerView(),
                spaceBetween: getCatalogSpaceBetween(),
                navigation: {
                    nextEl: `#${nextID}`,
                    prevEl: `#${prevID}`,

                },

            });
            window.addEventListener('resize', function () {
            swiperCatalog.params.slidesPerView = getCatalogSlidesPerView();
            swiperCatalog.params.spaceBetween = getCatalogSpaceBetween();
        });
        }
        scrollToActiveTab(e, navArrayCatalog, catalogContainer);

    })
})

scrollToActiveTab(document.querySelector('.tabs-controls-item.container.active'), navArrayCatalog, catalogContainer);

// сколлбар табов

const tabs = document.querySelectorAll('.tabs-controls-wrapper');

const addScrollbar = () => {
    tabs.forEach(e => {
        console.log(e);
        console.log(e.querySelector('.tabs-slider').offsetWidth);
        console.log(e.querySelector('.container').offsetWidth);
        console.log(window.clientWidth);
        if (e.querySelector('.tabs-slider').offsetWidth > e.querySelector('.container').offsetWidth){
            e.classList.add('scroll');
        }
    })
}

addScrollbar()

