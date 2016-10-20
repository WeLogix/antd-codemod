import React, { PropTypes } from 'react';
import { Button, Form, Input, Row, Col, message } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { format } from 'client/common/i18n/helpers';
import messages from './message.i18n';
import globalMessages from 'client/common/root.i18n';
import './acc.less';
const formatMsg = format(messages);
const formatGlobalMsg = format(globalMessages);
const FormItem = Form.Item;

@injectIntl
@Form.create()
export default class ChangePassword extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
    form: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired,
  }
  msg = key => formatMsg(this.props.intl, key);

  renderTextInput(labelName, field, rules) {
    const { form: { getFieldProps, getFieldError } } = this.props;
    return (
      <FormItem label={labelName} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}
        help={rules && getFieldError(field)} hasFeedback required
      >
        <Input type="password" { ...this.props.form.getFieldProps(field, rules) } />
      </FormItem>
    );
  }
  render() {
    const { intl } = this.props;
    return (
      <div className="page-body-center">
        <div className="panel-heading">
          <h3>{this.msg('pwdTitle')}</h3>
          <Button size="large" onClick={this.handleCancel} style={{ float: 'right' }} icon="left">{formatGlobalMsg(intl, 'back')}</Button>
        </div>
        <div className="panel-body">
          <Form horizontal
            className="form-edit-content offset-right-col"
          >
            {this.renderTextInput(this.msg('oldPwd'), 'oldPwd', this.oldPwdRules)}
            {this.renderTextInput(this.msg('newPwd'), 'newPwd', this.pwdRules)}
            {this.renderTextInput(this.msg('confirmPwd'), 'confirmPwd', this.confirmPwdRules)}
            <Row>
              <Col span="18" offset="6">
                <Button htmlType="submit" size="large" type="primary">{formatGlobalMsg(intl, 'ok')}</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

