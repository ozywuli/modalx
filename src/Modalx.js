/**
 * Modalx.js
 * @author Ozy Wu-Li - @ousikaa
 * @description Simple modal toggler
 */

// https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
// the anonymous function protects the `$` alias from name collisions
;(function( $, window, document, undefined ) {
    let pluginName = 'Modalx';

    /**
     * Defaults
     */
    let defaults = {
        opener: '.js-modalx-open',
        target: '.js-emittee',
        closer: '.js-modalx-close',
        isVisibleClass: 'is-visible'
    }

    /**
     * Plugin Constructor
     */
    let Modalx = function( options ) {
        this.options = $.extend( {}, defaults, options );
        this.init();
    }


    /**
     * Prototype
     */
    Modalx.prototype = {
        init: function() {
            $(this.options.opener).on('click', this.openModal.bind(this));
            $(this.options.closer).on('click', this.openModal.bind(this));
            $(this.options.target).on('click', this.closeModal.bind(this))
            $(`${this.options.opener}, ${this.options.closer}`).children().css('pointer-events', 'none');
        },

        openModal: function(event) {
            event.preventDefault();
            $(event.target).toggleClass(this.options.isVisibleClass);
            let thisTarget = $(event.target).attr('data-emittee');
            $(`.${thisTarget}`).toggleClass(this.options.isVisibleClass);
        },

        closeModal: function(event) {
            event.preventDefault();
            if ($(event.target).closest('.js-modalx-content').length) {
                console.log('clicking')
            } else {
                $(this.options.target).removeClass(this.options.isVisibleClass);
            }
        }
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new OnToggle( options ));
            }
        });
    };

    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    module.exports = Modalx;

})( jQuery, window , document );