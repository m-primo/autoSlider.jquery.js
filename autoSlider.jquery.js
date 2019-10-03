/*
    * 'autoSlider.jquery.js': this file represents a simple auto slider plugin with jquery.
    
    * Auto Slider jQuery Plugin - Version [1]
    * Auto Fade to Slides

    * This version (1) of this plugin is only working with one element only. *
    
    -------------------------------------------------
    | * [Oct 03, 2019]
    | * © 2019 - Developed by Primo.
    | * https://primodpd.blogspot.com
    | * https://mp-primo.blogspot.com
    | * https://mp-primo.blogspot.com/primo
    -------------------------------------------------
*/

var autoSlider = {
    // Selectors [Vars]
    selector: '.autoSlider',
    sliderContent_selector: '.slider-content',
    notAutoContent_selector: '.notAuto-content',
    allSlides_selector: '.all-slides',
    elmDiv_selector: 'div',
    dotActive_class: 'active',
    button_selector: 'button',
    currentIndex_selector: '.currentIndex',
    // Selectors [Methods]
    dotActive_selector: function(){
        return ('.' + autoSlider.dotActive_class);
    },
    slideSelector: function(){
        return (autoSlider.selector + ' ' + autoSlider.sliderContent_selector);
    },
    // rem. Vars
    interval: 3000,
    fade: 1000,
    isAuto: true,
    currentIndex: 0,
    nextCanClick: true,
    // Initialization
    init: function(){
        $(autoSlider.slideSelector() + ' ' + autoSlider.elmDiv_selector).css('display', 'none');
        $(autoSlider.slideSelector() + ' ' + autoSlider.dotActive_selector()).css('display', 'block');
        autoSlider.UpdateSlideNumber(autoSlider.currentIndex + 1);
        autoSlider.Index(0);
        if(autoSlider.isAuto) {
            autoSlider.Start();
            $(autoSlider.selector + ' ' + autoSlider.notAutoContent_selector).css('display', 'none');
        } else {
            $(autoSlider.selector + ' ' + autoSlider.notAutoContent_selector).css('display', 'inline-block');
            $(autoSlider.selector + ' ' + autoSlider.notAutoContent_selector + ' ' + autoSlider.button_selector).css('cursor', 'pointer');
            $(autoSlider.selector + ' ' + autoSlider.allSlides_selector).css({
                'display': 'inline-block',
                'margin': '0',
                'padding': '0'
            });
            autoSlider.SetAllIndexes();
        }
    },
    // Methods
    slidesLength: function(){
        return ($(autoSlider.slideSelector() + ' ' + autoSlider.elmDiv_selector).length);
    },
    UpdateSlideNumber: function(num){
        $(autoSlider.selector + ' ' + autoSlider.currentIndex_selector).text(num + '/' + autoSlider.slidesLength());
    },
    SetAllIndexes: function(){
        for(var i = 0; i < autoSlider.slidesLength(); i++) {
            $(autoSlider.selector + ' ' + autoSlider.allSlides_selector).append('<li onclick="autoSlider.GoSlide('+(i+1)+')">['+(i+1)+']</li>');
            $(autoSlider.selector + ' ' + autoSlider.allSlides_selector + ' li').css({
                'display': 'inline-block',
                'margin': '0 3px',
                'cursor': 'pointer'
            });
        }
    },
    // Public Methods
    GoNext: function(){
        if(!autoSlider.isAuto) {
            if(autoSlider.nextCanClick) {
                autoSlider.nextCanClick = false;
                var thisIndexElm = $(autoSlider.slideSelector() + ' ' + autoSlider.elmDiv_selector).eq(autoSlider.currentIndex);
                if(autoSlider.currentIndex+2 <= autoSlider.slidesLength()) {
                    thisIndexElm.removeClass(autoSlider.dotActive_class).fadeOut(autoSlider.fade, function(){
                        autoSlider.Index(autoSlider.currentIndex+1);
                        autoSlider.UpdateSlideNumber(autoSlider.currentIndex+1+1);
                        autoSlider.currentIndex += 1;
                        autoSlider.nextCanClick = true;
                    });
                } else {
                    thisIndexElm.removeClass(autoSlider.dotActive_class).fadeOut(autoSlider.fade, function(){
                        autoSlider.Index(0);
                        autoSlider.UpdateSlideNumber(1);
                        autoSlider.currentIndex = 0;
                        autoSlider.nextCanClick = true;
                    });
                }
            }
        }
    },
    GoBack: function(){
        if(!autoSlider.isAuto) {
            if(autoSlider.nextCanClick) {
                autoSlider.nextCanClick = false;
                var thisIndexElm = $(autoSlider.slideSelector() + ' ' + autoSlider.elmDiv_selector).eq(autoSlider.currentIndex);
                if(autoSlider.currentIndex >= 1) {
                    if(autoSlider.currentIndex-2 <= autoSlider.slidesLength()) {
                        thisIndexElm.removeClass(autoSlider.dotActive_class).fadeOut(autoSlider.fade, function(){
                            autoSlider.Index(autoSlider.currentIndex-1);
                            autoSlider.UpdateSlideNumber(autoSlider.currentIndex);
                            autoSlider.currentIndex -= 1;
                            autoSlider.nextCanClick = true;
                        });
                    }
                } else {
                    thisIndexElm.removeClass(autoSlider.dotActive_class).fadeOut(autoSlider.fade, function(){
                        autoSlider.Index(autoSlider.slidesLength()-1);
                        autoSlider.UpdateSlideNumber(autoSlider.slidesLength());
                        autoSlider.currentIndex = autoSlider.slidesLength()-1;
                        autoSlider.nextCanClick = true;
                    });
                }
            }
        }
    },
    GoSlide: function(slide) {
        if(!autoSlider.isAuto) {
            if(autoSlider.nextCanClick) {
                autoSlider.nextCanClick = false;
                var thisIndexElm = $(autoSlider.slideSelector() + ' ' + autoSlider.elmDiv_selector).eq(autoSlider.currentIndex);
                if(slide <= autoSlider.slidesLength()) {
                    thisIndexElm.removeClass(autoSlider.dotActive_class).fadeOut(autoSlider.fade, function(){
                        autoSlider.Index(slide-1);
                        autoSlider.UpdateSlideNumber(slide);
                        autoSlider.currentIndex = slide-1;
                        autoSlider.nextCanClick = true;
                    });
                }
            }
        }            
    },
    // Private Methods
    Next: function(elm){
        elm.next().addClass(autoSlider.dotActive_class).fadeIn(autoSlider.fade);
    },
    Previous: function(elm){
        elm.prev().addClass(autoSlider.dotActive_class).fadeIn(autoSlider.fade);
    },
    Index: function(index){
        $(autoSlider.slideSelector() + ' ' + autoSlider.elmDiv_selector).eq(index).addClass(autoSlider.dotActive_class).fadeIn(autoSlider.fade);
    },
    // Auto
    Start: function(){
        if(autoSlider.isAuto) {
            $(autoSlider.slideSelector() + ' ' + autoSlider.dotActive_selector()).each(function(){
                $(this).delay(autoSlider.interval).fadeOut(autoSlider.fade, function(){
                    $(this).removeClass(autoSlider.dotActive_class);
                    if(!$(this).is(':last-child')) {                
                        autoSlider.Next($(this));
                        autoSlider.currentIndex += 1;
                    } else {
                        autoSlider.Index(0);
                        autoSlider.currentIndex = 0;
                    }
                    autoSlider.UpdateSlideNumber(autoSlider.currentIndex + 1);
                    autoSlider.Start();
                });
            });
        } else {
            $(autoSlider.slideSelector() + ' ' + autoSlider.elmDiv_selector).css('display', 'none');
        }
    }
};