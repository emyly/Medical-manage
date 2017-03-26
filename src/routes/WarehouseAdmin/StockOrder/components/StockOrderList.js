/**
 * Created by wmt on 2016/12/09.
 */
import React, { Component, PropTypes } from 'react'
import OrderRecheckList from 'components/OrderRecheckList'
import StandardDataGrid from 'components/StandardDataGrid'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import RaisedButton from 'material-ui/RaisedButton'
import FilterTabs from 'components/FilterTabs';

export default class StockOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderState: 0,
      dataParams: this.getDataParams(0)
    };
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  getDataParams=(value) => {
    const organizationId = Number(this.props.globalStore.organizationId);
    let dataParams;
    switch (value) {
      case 0:
        dataParams = { DDB: [{ DDLX: ['1'], CJJXSID: organizationId, SHZT: '0', DDZT: '0' }, { DDLX: ['1'], CJJXSID: organizationId, SHZT: '1', DDZT: 0 }] }
        break;
      case 1:
        dataParams = { DDB: [{ DDLX: ['1'], CJJXSID: organizationId, DDZT: '1' }] }
        break;
      case 2:
        dataParams = { DDB: [{ DDLX: ['1'], CJJXSID: organizationId, DDZT: '2' }, { DDLX: ['1'], CJJXSID: organizationId, DDZT: '3' }] }
        break;
    }
    return dataParams;
  }

  handleOrderStateDropDownMenuChange = (value) => {
    this.setState({ orderState: value, dataParams: this.getDataParams(value) });
  };

  handleClick = (e) => {
    this.setState({ orderId: e.GUID });
    this.context.router.push({
      pathname: `/stockOrder/${e.GUID}`,
      // state:{orderState:this.state.orderState}
    });
  }

  handleCreateOrder = () => {
    this.context.router.push({
      pathname: '/stockOrder/createStockOrder',
    });
  }

  render() {
    const actions =
        (<nav>
          <RaisedButton onTouchTap={this.handleCreateOrder} label='新建订单' buttonStyle={{ backgroundColor: '#00A0FF', }} labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#FFF' }} />
          {/* <RaisedButton labelPosition="after" primary={true} icon={<ContentAddCircle />} onTouchTap={this.handleCreateOrder} label='新建订单' />*/}
        </nav>)
    const filter = <FilterTabs tabs={['待审核', '已审核', '已退回']} callback={this.handleOrderStateDropDownMenuChange} />;

    return (
      <StandardDataGrid iconPosition={'-210px 0'} actions={actions} title='备货订单下单' message='...' filter={filter} filterTitle='按订单状态筛选：'>
        <OrderRecheckList MKID={3} dataParams={this.state.dataParams} DDLX={['1']} rowClick={this.handleClick} requredStatus={this.state.orderState} organizationID={Number(this.props.globalStore.organizationId)} />
      </StandardDataGrid>
    );
  }
}
