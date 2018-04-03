(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Modalx = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        isVisibleClass: 'is-visible',
        singleModalTarget: false,
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
            $('.' + this.options.opener).on('click', this.openModal.bind(this));
            // $(`.${this.options.closer}`).on('click', this.closeModal.bind(this));
            $('.' + this.options.target).on('click', this.closeModal.bind(this));
            $('.' + this.options.opener + ', .' + this.options.closer).children().css('pointer-events', 'none');

            this.addId();
        },

        /**
         * 
         */
        addId: function addId() {
            if (!this.options.singleModalTarget) {
                for (var index = 0; index < $('.' + this.options.opener).length; index++) {
                    $('.' + this.options.opener).eq(index).attr('data-modalx-id', '' + index);
                    $('.' + this.options.closer).eq(index).attr('data-modalx-id', '' + index);
                    $('.' + this.options.target).eq(index).attr('data-modalx-id', '' + index);
                }
            } else {
                $('.' + this.options.opener).attr('data-modalx-id', 'single');
                $('.' + this.options.closer).attr('data-modalx-id', 'single');
                $('.' + this.options.target).attr('data-modalx-id', 'single');
            }
        },


        /**
         * 
         */
        openModal: function openModal(event) {
            event.preventDefault();
            $(event.target).addClass(this.options.isVisibleClass);
            var thisTargetId = $(event.target).attr('data-modalx-id');

            $('.' + this.options.target + '[data-modalx-id="' + thisTargetId + '"]').addClass(this.options.isVisibleClass);

            // Run callback after user opens modal
            if (this.options.openCallback) {
                this.options.openCallback(event);
            }
        },

        /**
         * 
         */
        closeModal: function closeModal(event) {
            event.preventDefault();
            if ($(event.target).closest('.js-modalx-content').length) {
                console.log('clicking content');
            } else {
                // remove modal visibility
                $('.' + this.options.target).removeClass(this.options.isVisibleClass);

                // Run callback after user closes modal
                if (this.options.closeCallback) {
                    this.options.closeCallback(event);
                }
            }
        }

        /*------------------------------------*\
          EXPORT OPTIONS
        \*------------------------------------*/
    };module.exports = namespace['pluginName'];
})(jQuery, window, document);

},{}]},{},[1])(1)
});