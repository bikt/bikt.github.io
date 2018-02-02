// page init
jQuery(function(){
    jQuery('input, textarea').placeholder();
    initOpenClose();
    initPopups();
    initTabs();
    jcf.customForms.replaceAll();
    $("[rel='lightbox']").fancybox({
        theme : 'light'
    });
    $(".lightbox-open").fancybox({
        theme : 'light'
    });


    $(".input-holder input, .input-holder textarea").focus(function(){
        $(this).parent().addClass("input-focused");

    }).blur(function(){
        if( !$(this).val() ) {
            $(this).parent().removeClass("input-focused");
        }
    })


    $('.slider-product-for').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        fade: true,
        asNavFor: '.slider-product-nav',
        responsive: [
            {
                breakpoint: 1120,
                settings: {
                    fade: false,
                    arrows: true
                }
            }
        ]
    });
    $('.slider-product-nav').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-product-for',
        dots: false,
        focusOnSelect: true
    });

    $('.list-products > li').each(function(){
        var element = $(this);
        var slider = element.find('.slider-for');
        var nav = element.find('.slider-nav');

        slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: nav
        });
        nav.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: slider,
            dots: false,
            vertical: true,
            arrows: true,
            centerMode: false,
            focusOnSelect: true
        });

    });






    $('select').selectric();

    jQuery('.spinner').spinner({
        spin: function (event, ui) {
            if (ui.value < 1) {
                jQuery(this).spinner("value", 1);
                return false;
            }
        }
    });

    /*

    // slider prices

    $('#price').on('input', function () {
        var val = parseInt($(this).val());
        var maxValue = sliderPrice.slider('values',1);
        var min = sliderPrice.slider('option','min');
        if(val >= maxValue || isNaN(val)){
            val = maxValue - 1;
        }
        if(val < min){
            val = min;
        }
        $(this).val(val);
        onInputRangeChange([val, maxValue]);
    });
    $('#price2').on('input', function() {
        var val2 = parseInt($(this).val());
        var minValue = sliderPrice.slider('values',0);
        var max = sliderPrice.slider('option','max');
        if(val2 <= minValue || isNaN(val2)){
            val2 = minValue + 1;
        }
        if(val2 > max){
            val2 = max;
        }

        $(this).val(val2);
        onInputRangeChange([minValue, val2]);

    });
    sliderPrice = $( "#slider_price" );
    var popupHolder = sliderPrice.closest(".popup-holder");
    var onInputRangeChange = function(values){
        $('.price1').text(values[0] + " - ");
        $('.price2').text(values[1] + " р.");
        sliderPrice.slider("values",values);
        popupHolder.addClass('price-active');
    };

    */
    var sliderPrice = $('#slider_price');

    $( "#slider_price" ).slider({
        range: true,
        min: 5000,
        step:100,
        max: 50000,
        values: [ 5000, 45590 ],
        slide: function( event, ui ) {
            $('#price').val(ui.values[0]);
            $('#price2').val(ui.values[1]);
            var popupHolder = sliderPrice.closest(".popup-holder");
            $('.price1').text(ui.values[0] + " - ");
            $('.price2').text(ui.values[1] + " р.");
            popupHolder.addClass('price-active');
        }
    });

    var header = $('.header').offset().top;
    $(window).scroll(function(){
        if( $(window).scrollTop() >  120) {
            $('.header').addClass("sticky");
        } else {
            $('.header').removeClass("sticky");
        }
    })

    // select

    $('.checkbox-popup').each(function(){
        var holder = $(this),
            inner = $('.inner',holder),
            inputs =$('input',holder);
        $.each(inputs,function(){
            var element = $(this);
            element.on('change',function(){
                var str = '';
                $.each(inputs,function(){
                    var checkInput = $(this);
                    if(checkInput.is(':checked')){
                        var text = checkInput.next().find('label').text();
                        str += text + ', ';
                    }
                });
                str = str.substr(0,str.length - 2);
                if(str == '')
                    str = 'Бренды';
                inner.html(str)

            });
        })
    });


    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.header').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('body').removeClass('page-down').addClass('page-up');
            $('.header').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('body').removeClass('page-up').addClass('page-down');
                $('.header').removeClass('nav-up').addClass('nav-down');
            }
        }

        lastScrollTop = st;
    }

    var mobile_nav = $('.header .slide-menu');
    function setPopupHeight(){
        mobile_nav.height($(window).height() - $('.header').outerHeight());
    }
    setPopupHeight();
    $(window).resize(setPopupHeight);

    // select
    $('.select-block').each(function(){
        var holder = $(this),
            inner = $('.inner',holder),
            li = $('.popup ul li',holder);
        $.each(li,function(){
            var element = $(this);
            $('a',element).click(function(e){
                e.preventDefault();
                inner.html($(this).text());
                li.removeClass('active');
                element.addClass('active');
            });
        })
    });
});



// open-close init
function initOpenClose() {
    jQuery('.open-close').openClose({
        activeClass: 'active',
        opener: '.opener',
        slider: '.slide-block',
        animSpeed: 400,
        hideOnClickOutside: true,
        effect: 'slide'
    });
}

// content tabs init
function initTabs() {
    jQuery('ul.tabset').contentTabs({
        tabLinks: 'a'
    });
}

// popups init
function initPopups() {
    jQuery('.popup-holder').contentPopup({
        mode: 'click',
        popup: '.popup',
        btnOpen: '.open',
        btnClose: '.popup a.close-link'
    });
    jQuery('.open-close-menu').contentPopup({
        activeClass: 'active',
        btnOpen: '.opener-menu',
        popup: '.slide-menu',
        btnClose: '.close-link'
    });
}
