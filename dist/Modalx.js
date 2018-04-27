(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Modalx = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

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
;(function ($, window, document, undefined) {
    /**
     * Plugin namespace
     */
    var namespace = {
        pluginName: 'Modalx'
    };

    /**
     * Defaults
     */
    var defaults = {
        opener: 'js-modalx-open',
        target: 'js-modalx-target',
        closer: 'js-modalx-close',
        content: 'js-modalx-content',
        isVisibleClass: 'is-visible',
        singleModalTarget: false,
        autoTarget: true,
        openCallback: function openCallback(event) {
            console.log('open callback');
        },
        closeCallback: function closeCallback(event) {
            console.log('close callback');
        }
    };

    /**
     * Plugin Constructor
     */
    namespace['pluginName'] = function (options) {
        this.options = $.extend({}, defaults, options);
        this.init();
    };

    /**
     * Prototype
     */
    namespace['pluginName'].prototype = {
        /**
         * 
         */
        init: function init() {
            $('.' + this.options.opener).on('click', this.openEventHandler.bind(this));
            // $(`.${this.options.closer}`).on('click', this.closeModal.bind(this));
            $('.' + this.options.target).on('click', this.closeEventHandler.bind(this));
            $('.' + this.options.opener + ', .' + this.options.closer).children().css('pointer-events', 'none');

            if (this.options.autoTarget) {
                this.addId();
            }
        },

        /**
         * Automatically add IDs
         */
        addId: function addId() {
            if (!this.options.singleModalTarget) {
                for (var index = 0; index < $('.' + this.options.opener).length; index++) {
                    $('\n                        .' + this.options.opener + ':eq(' + index + '),\n                        .' + this.options.closer + ':eq(' + index + '), \n                        .' + this.options.target + ':eq(' + index + ')\n                    ').attr('data-modalx-id', '' + index);
                }
            } else {
                $('\n                    .' + this.options.opener + ', \n                    .' + this.options.closer + ', \n                    .' + this.options.target + '\n                ').attr('data-modalx-id', 'single');
            }
        },


        /**
         * Open Modal
         */
        openModal: function openModal(target, event) {
            $(target).addClass(this.options.isVisibleClass);

            // Run callback after user opens modal
            if (this.options.openCallback) {
                this.options.openCallback(target, event);
            }
        },


        /**
         * Open Event Handler
         */
        openEventHandler: function openEventHandler(event) {
            event.preventDefault();
            $(event.target).addClass(this.options.isVisibleClass);
            var thisTargetId = $(event.target).attr('data-modalx-id');

            this.openModal('.' + this.options.target + '[data-modalx-id="' + thisTargetId + '"]', event);
        },

        /**
         * Close Event handler
         */
        closeEventHandler: function closeEventHandler(event) {
            event.preventDefault();
            if ($(event.target).closest('.' + this.options.content).length) {} else {
                this.closeModal();
            }
        },

        /**
         * Close modal
         */
        closeModal: function closeModal(event) {
            // remove modal visibility
            $('.' + this.options.opener + ', .' + this.options.target).removeClass(this.options.isVisibleClass);

            // Run callback after user closes modal
            if (this.options.closeCallback) {
                this.options.closeCallback(event);
            }
        }
    };

    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    module.exports = namespace['pluginName'];
})(jQuery, window, document);

},{}]},{},[1])(1)
});
