import React, { PropTypes } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { Modal, Form, Select, message } from 'antd';
import { format } from 'client/common/i18n/helpers';
import messages from './message.i18n';

const formatMsg = format(messages);
const FormItem = Form.Item;
const Option = Select.Option;

@injectIntl
@Form.create()
export default class SendModal extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
    visible: PropTypes.bool.isRequired,
    tenantName: PropTypes.string.isRequired,
    tenantId: PropTypes.number.isRequired,
    loginName: PropTypes.string.isRequired,
    loginId: PropTypes.number.isRequired,
    shipment: PropTypes.shape({
      trans_mode: PropTypes.string.isRequired,
      bl_no: PropTypes.string.isRequired,
      hawb: PropTypes.string.isRequired,
    }).isRequired,
    brokers: PropTypes.arrayOf(PropTypes.shape({
      partner_id: PropTypes.number.isRequired,
      tid: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      partner_code: PropTypes.string.isRequired,
    })).isRequired,
    transps: PropTypes.arrayOf(PropTypes.shape({
      partner_id: PropTypes.number.isRequired,
      tid: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      partner_code: PropTypes.string.isRequired,
    })).isRequired,
    closeModal: PropTypes.func.isRequired,
    sendInboundShipment: PropTypes.func.isRequired,
    reload: PropTypes.func.isRequired,
  }
  state = {
    region: {
      code: '',
      province: '',
      city: '',
      district: '',
      street: '',
    },
  }
  handleDestRegionChange = (region) => {
    const [code, province, city, district, street] = region;
    this.setState({
      region: {
        code, province, city, district, street,
      },
    });
  }
  msg = descriptor => formatMsg(this.props.intl, descriptor)
  render() {
    const { visible, brokers, transps, form: { getFieldDecorator } } = this.props;
    return (
      <Modal title={this.msg('sendShipment')} visible={visible}
        onOk={this.handleOk} onCancel={this.handleCancel}
      >
        <Form horizontal>
          <FormItem label={this.msg('broker')} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            {form.getFieldDecorator('brkPartnerId', {
              rules: [{ required: true, type: 'number' }],
            })(<Select showSearch optionFilterProp="searched" allowClear>
              {
                brokers.map(pt => (
                  <Option searched={`${pt.partner_code}${pt.name}`}
                    value={pt.partner_id} key={pt.partner_id}
                  >
                    {pt.name}
                  </Option>
                ))
              }
            </Select>)}
          </FormItem>
          <FormItem label={this.msg('sendTrucking')} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            {getFieldDecorator('trsPartnerId', {
              rules: [{ required: true, type: 'number' }],
            })(<Select showSearch optionFilterProp="searched" allowClear />)}
          </FormItem>
          <FormItem label={this.msg('transportDest')} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            {getFieldDecorator('transportDest')(<Cascader />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
