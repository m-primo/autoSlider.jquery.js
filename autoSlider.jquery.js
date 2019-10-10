/* #################################################################################################
    * 'autoSlider.jquery.js': This file represents an auto fade slider.
    * A Simple Open-Source Auto Fade Slider jQuery Plugin.
    * Version [2].
    * https://github.com/m-primo/autoSlider.jquery.js
    -------------------------------------------------
    -> Please firstly check the example html page.
    -> We have made an automatic counter in ids' of the sliders with aS#, to accept multiple sliders in one page without any problem,
       so, for example the selector of the second slider (by default) is: .autoSlider#aS2
    -------------------------------------------------
    * PLEASE CHECK THE EXAMPLE PAGE FOR MORE DETAILS.
    -------------------------------------------------
    | * [Oct 10, 2019]
    | * © 2019 - Developed by Primo.
    | * Open-Source - MIT License.
    | * https://opensource.org/licenses/MIT
    | * https://github.com/m-primo/autoSlider.jquery.js
    | * https://primodpd.blogspot.com
    | * https://mp-primo.blogspot.com
    | * https://mp-primo.blogspot.com/primo
    | * https://mp-primo.blogspot.com/primodpd
    -------------------------------------------------
################################################################################################# */

(function($){
    
    mainSelector = (typeof mainSelector === 'undefined') ? '.autoSlider' : mainSelector;
    var _mainSelectorFull = $(mainSelector);
    var eachSelectorID = 0;
    
    $.fn.autoSlider = function(settings){
        
        // -----------------------------------------------------------------------------------
        // Default Vars
        var defaults = {
            interval: 3500,
            fade: 500,
            isAuto: true,
            
            currentIndex: 0,
            nextCanClick: true,

            sliderContent_selector: '.slider-content',
            notAutoContent_selector: '.notAuto-content',
            allSlides_selector: '.all-slides',
            elmDiv_selector: 'div',
            dotActive_class: 'active',
            button_selector: 'button',
            currentIndex_selector: '.currentIndex',
        };
        // -----------------------------------------------------------------------------------
        
        // -----------------------------------------------------------------------------------
        // Setup
        var options = $.extend(defaults, settings);
        var $this = this;
        var selector = $($this);
        _mainSelectorFull = selector;
        // -----------------------------------------------------------------------------------
        
        // -----------------------------------------------------------------------------------
        // Default Methods
        function dotActive_selector() {
            return (selector.find('.' + options.dotActive_class));
        }

        function slidesLength() {
            return ((selector.find(options.sliderContent_selector + ' ' + options.elmDiv_selector)).length);
        }
        
        function UpdateSlideNumber(num) {
            selector.find(options.currentIndex_selector).text(num + '/' + slidesLength());
        }
        
        function SetAllIndexes() {
            for(var i = 0; i < slidesLength(); i++) {
                var slideNum = i + 1;
                selector.find(options.allSlides_selector).append('<li data-action="GoSlide" data-id="'+slideNum+'">['+slideNum+']</li>');
                selector.find(options.allSlides_selector + ' li').css({
                    'display': 'inline-block',
                    'margin': '0 3px',
                    'cursor': 'pointer'
                });
            }
        }
        // -----------------------------------------------------------------------------------

        // Public Methods
        function GoNext() {
            if(!options.isAuto) {
                if(options.nextCanClick) {
                    options.nextCanClick = false;
                    var thisIndexElm = selector.find(options.sliderContent_selector + ' ' + options.elmDiv_selector).eq(options.currentIndex);
                    if(options.currentIndex+2 <= slidesLength()) {
                        thisIndexElm.removeClass(options.dotActive_class).fadeOut(options.fade, function(){
                            Index(options.currentIndex+1);
                            UpdateSlideNumber(options.currentIndex+1+1);
                            options.currentIndex += 1;
                            options.nextCanClick = true;
                        });
                    } else {
                        thisIndexElm.removeClass(options.dotActive_class).fadeOut(options.fade, function(){
                            Index(0);
                            UpdateSlideNumber(1);
                            options.currentIndex = 0;
                            options.nextCanClick = true;
                        });
                    }
                }
            }
        }
        
        function GoBack() {
            if(!options.isAuto) {
                if(options.nextCanClick) {
                    options.nextCanClick = false;
                    var thisIndexElm = selector.find(options.sliderContent_selector + ' ' + options.elmDiv_selector).eq(options.currentIndex);
                    if(options.currentIndex >= 1) {
                        if(options.currentIndex-2 <= slidesLength()) {
                            thisIndexElm.removeClass(options.dotActive_class).fadeOut(options.fade, function(){
                                Index(options.currentIndex-1);
                                UpdateSlideNumber(options.currentIndex);
                                options.currentIndex -= 1;
                                options.nextCanClick = true;
                            });
                        }
                    } else {
                        thisIndexElm.removeClass(options.dotActive_class).fadeOut(options.fade, function(){
                            Index(slidesLength()-1);
                            UpdateSlideNumber(slidesLength());
                            options.currentIndex = slidesLength()-1;
                            options.nextCanClick = true;
                        });
                    }
                }
            }
        }

        function GoSlide(slide) {
            if(!options.isAuto) {
                if(options.nextCanClick) {
                    options.nextCanClick = false;
                    var thisIndexElm = selector.find(options.sliderContent_selector + ' ' + options.elmDiv_selector).eq(options.currentIndex);
                    if(slide <= slidesLength()) {
                        thisIndexElm.removeClass(options.dotActive_class).fadeOut(options.fade, function(){
                            Index(slide-1);
                            UpdateSlideNumber(slide);
                            options.currentIndex = slide-1;
                            options.nextCanClick = true;
                        });
                    }
                }
            }            
        }
        // -----------------------------------------------------------------------------------
        
        // -----------------------------------------------------------------------------------
        // Private Methods
        function Next(elm) {
            elm.next().addClass(options.dotActive_class).fadeIn(options.fade);
        }
        
        function Previous(elm) {
            elm.prev().addClass(options.dotActive_class).fadeIn(options.fade);
        }
        
        function Index(index) {
            selector.find(options.sliderContent_selector + ' ' + options.elmDiv_selector).eq(index).addClass(options.dotActive_class).fadeIn(options.fade);
        }

        function Auto() {
            if(options.isAuto) {
                $(dotActive_selector()).each(function(){
                    $(this).delay(options.interval).fadeOut(options.fade, function(){
                        $(this).removeClass(options.dotActive_class);
                        if(!$(this).is(':last-child')) {                
                            Next($(this));
                            options.currentIndex += 1;
                        } else {
                            Index(0);
                            options.currentIndex = 0;
                        }
                        UpdateSlideNumber(options.currentIndex + 1);
                        Auto();
                    });
                });
            }
        }
        // -----------------------------------------------------------------------------------

        // -----------------------------------------------------------------------------------
        // Initialization
        function init() {
            selector.find(options.sliderContent_selector + ' ' + options.elmDiv_selector).css('display', 'none');
            $(dotActive_selector()).css('display', 'block');
            UpdateSlideNumber(options.currentIndex + 1);
            Index(0);
            if(options.isAuto) {
                Auto();
                selector.find(options.notAutoContent_selector).css('display', 'none');
            } else {
                selector.find(options.notAutoContent_selector).css('display', 'inline-block');
                selector.find(options.notAutoContent_selector + ' ' + options.button_selector).css('cursor', 'pointer');
                selector.find(options.allSlides_selector).css({
                    'display': 'inline-block',
                    'margin': '0',
                    'padding': '0'
                });
                SetAllIndexes();
            }
        }
        // -----------------------------------------------------------------------------------
        
        init();
        
        // -----------------------------------------------------------------------------------
        // Actions
        $("[data-action='GoSlide']").click(function(e){
            GoSlide($(this).data('id'));
        });
        
        $("[data-action='GoNext']").click(function(e){
            GoNext();
        });
        
        $("[data-action='GoBack']").click(function(e){
            GoBack();
        });
        // -----------------------------------------------------------------------------------
        
    }
    
    _mainSelectorFull.each(function(){
        $(this).attr('data-id', eachSelectorID).attr('id', 'aS' + (eachSelectorID+1));
        eachSelectorID++;
    });

})(jQuery);
