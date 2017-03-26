/**
 * Created by NXQ on 11/18/2016.
 */


import React, { Component, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import './WelcomeHome.scss';
import { connect } from 'react-redux';
import {
  handleToggleDrawer
} from 'layouts/components/MenuBar/modules/menuBar';

class WelcomeHome extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }
  /**
   * 临时Click方式
   */
  handleToggleDrawer = () =>　() => {
    this.props.handleToggleDrawer(!this.props.menuBar.open);
  }
  render() {
    return (
      <div className='welcome-home'>
        <Card style={{ width: '100%', height: '100%', paddingBottom: 20 }} containerStyle={{ width: '100%', height: '100%' }}>
          <div className='container' style={{ background: 'url(welcomeBk.png)' }}>
            <div className='top-context' onClick={this.handleToggleDrawer()}>
              <div className='top-logo' style={{ background: 'url(welcomeSmallLogo.png)' }} />
            </div>
            <div className='middle-context'>
              <div>
                <img src='/welcomeMiddleLogo.png' />
                <div className='up-word' style={{ display: 'none' }}>你的企业好管家</div>
                <div className='down-word' style={{ display: 'none' }}>优管理 提业绩 增收益</div>
              </div>
            </div>
            <div className='bottom-context'>
              <div>
                <div className='headquarters-address'>上海总部：上海市杨浦区殷行路1280号嘉誉都汇广场O1栋506室</div>
                <div className='development-center-address'>杭州研发中心：杭州市文一路115号实验楼419号</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

}

const mapDispatchToProps = {
  handleToggleDrawer
}

const mapStateToProps = state => ({
  menuBar: state.menuBar
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeHome)
