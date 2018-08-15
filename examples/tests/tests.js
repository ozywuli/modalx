QUnit.test('After clicking the open toggle, make sure the visibility class is added to both opener and targeter', function(assert) {
    $('.js-modalx-open').trigger('click');

    assert.dom('.js-modalx-open').hasClass('is-visible');
    assert.dom('.js-modalx-target').hasClass('is-visible');
});

QUnit.test('After clicking the close toggle, make sure the visibility class is removed from both opener and targeter', function(assert) {
    $('.js-modalx-close').trigger('click');

    assert.dom('.js-modalx-open').doesNotHaveClass('is-visible');
    assert.dom('.js-modalx-target').doesNotHaveClass('is-visible');
});

QUnit.test('After clicking outside the modal content, make sure the visibility class is removed from both opener and targeter', function(assert) {
    $('.js-modalx-open').trigger('click');
    $('.outside-content').trigger('click');

    assert.dom('.js-modalx-open').doesNotHaveClass('is-visible');
    assert.dom('.js-modalx-target').doesNotHaveClass('is-visible');
});