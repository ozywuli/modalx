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
    /**
     * Plugin namespace
     */
    let namespace = {
        pluginName: 'Modalx'
    };


    /**
     * Defaults
     */
    let defaults = {
        opener: 'js-modalx-open',
        target: 'js-modalx-target',
        closer: 'js-modalx-close',
        content: 'js-modalx-content',
        isVisibleClass: 'is-visible',
        singleModalTarget: false,
        autoTarget: true,
        openCallback(event) {
            // console.log('open callback');
        },
        closeCallback(event) {
            // console.log('close callback');
        }
    }

    /**
     * Plugin Constructor
     */
    namespace['pluginName'] = function( options ) {
        this.options = $.extend( {}, defaults, options );
        this.init();
    }


    /**
     * Prototype
     */
    namespace['pluginName'].prototype = {
        /**
         * 
         */
        init: function() {
            $(`.${this.options.opener}`).on('click', this.openEventHandler.bind(this));
            $(`.${this.options.closer}`).on('click', this.closeModal.bind(this));
            $(`.${this.options.target}`).on('click', this.closeEventHandler.bind(this))

            $(`.${this.options.opener}, .${this.options.closer}`).children().css('pointer-events', 'none');

            if (this.options.autoTarget) {
                this.addId();
            }
        },

        /**
         * Automatically add IDs
         */
        addId() {
            if (!this.options.singleModalTarget) {
                for (let index = 0; index < $(`.${this.options.opener}`).length; index++) {
                    $(`
                        .${this.options.opener}:eq(${index}),
                        .${this.options.closer}:eq(${index}), 
                        .${this.options.target}:eq(${index})
                    `).attr('data-modalx-id', `${index}`);
                }
            } else {
                $(`
                    .${this.options.opener}, 
                    .${this.options.closer}, 
                    .${this.options.target}
                `).attr('data-modalx-id', `single`);
            }
        },

        /**
         * Open Modal
         */
        openModal(target, event) {
            $(target).addClass(this.options.isVisibleClass);

            // Run callback after user opens modal
            if (this.options.openCallback) {
                this.options.openCallback(target, event);    
            }
        },

        /**
         * Open Event Handler
         */
        openEventHandler: function(event) {
            event.preventDefault();
            $(event.target).addClass(this.options.isVisibleClass);
            let thisTargetId = $(event.target).attr('data-modalx-id');

            this.openModal(`.${this.options.target}[data-modalx-id="${thisTargetId}"]`, event);
        },

        /**
         * Close Event handler
         */
        closeEventHandler: function(event) {
            event.preventDefault();
            if ($(event.target).closest(`.${this.options.content}`).length) {

            } else {
                this.closeModal();    
            }
            
        },

        /**
         * Close modal
         */
        closeModal(event) {
            // remove modal visibility
            $(`.${this.options.opener}, .${this.options.target}`).removeClass(this.options.isVisibleClass);

            // Run callback after user closes modal
            if (this.options.closeCallback) {
                this.options.closeCallback(event);
            }
        },

    }


    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    module.exports = namespace['pluginName'];

})( jQuery, window , document );