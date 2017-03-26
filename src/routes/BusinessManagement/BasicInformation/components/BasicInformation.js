/**
 * Created by liuyali on 2016/11/4.
 */
import React, { Component, PropTypes } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import './BasicInformation.scss';
import ChangeInfoBtn from '../containers/BasicInformationContainer'

import StandardDataGrid from 'components/StandardDataGrid';
/*
 应用程序个性化 模块
 */
export class AppIndividuation extends Component {

  constructor(props) {
    super(props)
  }
  state = {
    message: '',
    openError: false
  }
  handleRequestClose = () => {
    this.setState({
      openError: false
    });
  };
  /*
  * 添加添加图标触发选择图片
  * */
  uploadImg = (event) => {
    const btnARR = document.querySelector(`input[name=${event.target.id}]`);
    const e = document.createEvent('MouseEvents');
    e.initEvent('click', false, true);
    btnARR.dispatchEvent(e);
  }
/*
* 修改APP模块中的图片处理
* */
  handleFiles = () => (event) => {
    const file = event.target.files[0];
    const rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
    const img = document.querySelector(`#${event.target.name}`);

    if (!rFilter.test(file.type)) {
      this.setState({
        message: '请选择正确的图片格式！',
        openError: true
      })
      return;
    }

    const oFReader = new FileReader();
    oFReader.readAsDataURL(file);

    oFReader.onload = function (oFREvent) {
      img.src = oFREvent.target.result;
    };
  }
  render() {
    return (
      <div className='BheaderWrapper subDivWrapper'>
        <div className='AppIndividuationDiv'>
          <img src='logistIcon/edit.png' alt='' />
          {
            this.props.text
          }
        </div>
        <div className='AppIndividuationImg'> <div style={{width:'100%',height:'100%'}} className='BuploadDiv' >
          <input onChange={this.handleFiles()} multiple style={{ display: 'none' }} type='file' name={this.props.id} />
          <div className='wareAddicon' />
          <img onClick={this.uploadImg} id={this.props.id} src='' alt='' />
        </div>
        </div>
        <ErrorSnackBar
          message={this.state.message} open={this.state.openError}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }

}


export default class BasicInformation extends Component {

  constructor(props) {
    super(props)
  }
  state = {
    message: '',
    openError: false,
  }
  handleRequestClose = () => {
    this.setState({
      openError: false
    });
  };
  componentWillReceiveProps(nextProps) {
    if (!nextProps.BasicInformation.status) {
      this.setState({
        message: nextProps.BasicInformation.error.response.Message,
        openError: true
      });
    }
  }
  handleError = () => {
    this.setState({
      message: '选择证件照后才能更新！',
      openError: true
    });
  }

  render() {
    return (
      <StandardDataGrid iconPosition='-60px -90px' title='企业基本信息'>
        <div className='BasicInformation'>
          <div className='BmessageDiv'>
            <div className='Bmessage' style={{ marginRight: '1.5rem' }}><span>公司名称：</span><span>杭州XXXX医疗器械贸易有限公司</span></div>
            <div className='Bmessage' style={{}}><span>法定代表人：</span><span>王某某</span></div>
            <ChangeInfoBtn initFun={this.props.setBasicInfoDataInit} callback={this.handleError} style={{ float: 'right', marginTop: '-.5rem' }} text='基本信息编辑' />
          </div>
          <div className='BimagesWrapper'>
            <AppIndividuation id='wlcm' text='App 启动欢迎页' />
            <AppIndividuation id='yd1' text='更新后导引页1' />
            <AppIndividuation id='yd2' text='更新后导引页2' />
          </div>
        </div>
        <ErrorSnackBar
          message={this.state.message} open={this.state.openError}
          onRequestClose={this.handleRequestClose}
        />
      </StandardDataGrid>

    );
  }
}
