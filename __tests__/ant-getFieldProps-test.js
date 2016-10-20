jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;
defineTest(__dirname, 'antd-getFieldProps-to-getFieldDecorator', {}, 'single-member-getFieldProps');
defineTest(__dirname, 'antd-getFieldProps-to-getFieldDecorator', {}, 'multiple-mixed-getFieldProps');
