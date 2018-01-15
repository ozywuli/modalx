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
    var pluginName = 'Modalx';

    /**
     * Defaults
     */
    var defaults = {
        opener: '.js-modalx-open',
        target: '.js-emittee',
        closer: '.js-modalx-close',
        isVisibleClass: 'is-visible'

        /**
         * Plugin Constructor
         */
    };var Modalx = function Modalx(options) {
        this.options = $.extend({}, defaults, options);
        this.init();
    };

    /**
     * Prototype
     */
    Modalx.prototype = {
        init: function init() {
            $(this.options.opener).on('click', this.openModal.bind(this));
            $(this.options.closer).on('click', this.openModal.bind(this));
            $(this.options.opener + ', ' + this.options.closer).children().css('pointer-events', 'none');
        },

        openModal: function openModal(event) {
            event.preventDefault();
            console.log(1);
            $(event.target).toggleClass(this.options.isVisibleClass);
            var thisTarget = $(event.target).attr('data-emittee');
            $('.' + thisTarget).toggleClass(this.options.isVisibleClass);
        },

        closeModal: function closeModal(event) {
            event.preventDefault();
            var thisTarget = $(event.target).attr('data-emittee');
            $('.' + thisTarget).toggleClass(this.options.isVisibleClass);
        }

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
    };$.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new OnToggle(options));
            }
        });
    };

    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    module.exports = Modalx;
})(jQuery, window, document);

},{}]},{},[1])(1)
});