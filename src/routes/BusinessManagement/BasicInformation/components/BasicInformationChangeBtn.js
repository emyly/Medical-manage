/**
 * Created by liuyali on 2016/11/21.
 */

import React, { Component, PropTypes } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Warning from 'material-ui/svg-icons/alert/error';
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import Dialogmin from 'components/StandardUI/StandardDialog';

import './BasicInformation.scss';

// 企业基本信息变更 组件
export default class ChangeInfoBtn extends Component {
  state = {
    uploadFin: false,
    open: false,
    ifFinOpen: false,
    imgArray: [],
    status: 0 // 0代表为选择，1未完成多证合一，2代表完成多证合一
  }
  static propTypes = {
  }

  constructor(props) {
    super(props)
  }
  componentWillReceiveProps(nextProps) {
    const lis = document.querySelectorAll('.BuploadDiv');
    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove('cmpltImgPreview', 'errorImgPreview');
    }

    if (nextProps.BasicInformation.uploadFin) {
      this.setState({
        uploadFin: true
      });
      for (let i = 0; i < nextProps.BasicInformation.idArr.length; i++) {
        const dom = document.getElementById(nextProps.BasicInformation.idArr[i]).parentNode;
        dom.classList.add('cmpltImgPreview');
      }
    } else {
      this.setState({
        uploadFin: false
      });
      for (let i = 0; i < nextProps.BasicInformation.idArr.length; i++) {
        const dom = document.getElementById(nextProps.BasicInformation.idArr[i]).parentNode;
        dom.classList.add('errorImgPreview');
      }
    }
  }

  openDialog = () => {
    this.setState({
      ifFinOpen: true,
    });
  }
  closeDialog = () => {
    this.setState({
      open: false,
    })
  }
  chooseIfFin=(key) => {
    if (key === 1) {
      this.setState(
        {
          ifFinOpen: false,
          open: true,
          status: key,
          imgArray: [{ id: 'img1', documentType: 'Y', documentName: '营业执照' }, { id: 'img2', documentType: 'S', documentName: '税务登记证' }, { id: 'img3', documentType: 'Z', documentName: '组织机构代码证' }, { id: 'img4', documentType: 'J', documentName: '医疗经营许可证' }]

        }
      )
    } else if (key === 2) {
      this.setState(
        {
          ifFinOpen: false,
          open: true,
          status: key,
          imgArray: [{ id: 'img1', documentType: 'M' }, { id: 'img2', documentType: 'J', documentName: '医疗经营许可证' }]

        }
      )
    }
  }

  AuthImg =(imginfo) => {
    if (document.querySelector(`input[name = ${imginfo.id}]`).files[0]) {
      const imgData = new FormData();
      const uploadImage = document.querySelector(`input[name = ${imginfo.id}]`).files[0];

      const obj = {
        WDB: {
          WDMC: uploadImage.name, // 文档名称
          SSJXSID: this.props.globalStore.organizationId, //所属经销商ID
        }
      };
      imgData.append('Body', JSON.stringify(obj));
      imgData.append('file', uploadImage);

      const imgInfo = {
        id: imginfo.id,
        orgId: this.props.globalStore.organizationId,
        info: obj,
        formdata: imgData,
        documentType: imginfo.documentType,
        documentName: imginfo.documentName,
      }
      return imgInfo;
    } else {
      return false;
    }
  }

  submitImg = () => {
    let submitArr = [];
    submitArr = this.state.imgArray.map(imgInfo => this.AuthImg(imgInfo));
    submitArr = submitArr.filter((data, index) => {
      // return data;
      if (data) {
        return data;
      }
    });
    if (submitArr.length > 0) {
      this.props.getBasicInfoData(submitArr);
    } else {
      this.props.callback();
    }
  }

  initDialog = () => {
    this.setState({
      open: false
    });
    this.props.setBasicInfoDataInit();
  }

  getContent =() => {
    switch (this.state.status) {
      case 0:
        return <div className='BimagesWrapper' />;
      case 1:
        return (
          <div style={{ padding: 0, marginTop: '3rem' }} className='BimagesWrapper'>
            <UploadImg id='img1' documentType='Y' documentName='营业执照' text='企业法人营业执照' />
            <UploadImg id='img2' documentType='S' documentName='税务登记证' text='税务登记证' />
            <UploadImg id='img3' documentType='Z' documentName='组织机构代码证' text='组织机构代码证' />
            <UploadImg id='img4' documentType='J' documentName='医疗经营许可证' text='医疗器械经营许可证' />
          </div>
        )
      case 2:
        return (
          <div style={{ padding: 0 }} className='BimagesWrapper'>
            <UploadImg id='img1' text='多证合一' />
            <UploadImg id='img2' text='医疗器械经营许可证' />
          </div>
        );
    }
  }
  getOrgCertificate = () => {
    this.props.getOrgCertificate(this.props.globalStore.organizationId);
  }
  render() {
    const actions = [<FlatButton
      label='关闭'
      onTouchTap={this.closeDialog}
    />, <FlatButton
      labelStyle={{
        color: '#00A0FF'
      }}
      label={this.state.uploadFin ? '完成' : '更新'}
      onTouchTap={this.state.uploadFin ? this.initDialog : this.submitImg}
      primary
    />];

    return (
      <div style={this.props.style}>
        <RaisedButton style={{ marginLeft: 100 }} label={this.props.text} onTouchTap={this.openDialog} backgroundColor='#FFA95D' labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Regular' }} />
        <Dialog
          title={
            <div>
              <span>基本信息变更</span>
              <span onTouchTap={this.getOrgCertificate} className='BminTitle'>已上传税务登记证</span>
            </div>
          }
          actions={actions}
          modal
          open={this.state.open}
        >
          <div style={{ padding: 0 }} className='BimagesWrapper'>
            <div className='BhintMessage'>
              依据相关法律法规，医疗器械流通企业变更信息应当以各类证照登记信息为准。如您需要继续变更企业基本信息，请上传您企业最新的证照，经审核之后变更方能生效
            </div>
            {
              this.getContent()
            }
          </div>
          {/* <div style={{display:'none'}}>*/}

          {/* </div>*/}
        </Dialog>
        <UploadDialog openStatus={this.state.ifFinOpen} ifFin={this.chooseIfFin} />
      </div>
    )
  }
}

// 企业证照上传
class UploadDialog extends Component {

  constructor(props) {
    super(props)
  }

  closeDialog = value => () => {
    this.props.ifFin(value);
  }
  render() {
    const actions = [<FlatButton
      labelStyle={{
        color: '#00A0FF'
      }}
      label='四证'
      onTouchTap={this.closeDialog(1)}
    />, <FlatButton
      onTouchTap={this.closeDialog(2)}
      labelStyle={{
        color: '#00A0FF'
      }}
      label='多证合一'
    />];
    return (
      <Dialogmin
        title='企业证照'
        actions={actions}
        modal
        open={this.props.openStatus}
        autoDetectWindowHeight
        autoScrollBodyContent
      >
        <div style={{ margin: 30 }}>
          您的企业是具备四证（营业执照、税务登记证、医疗器械经营许可证、组织机构代码证）还是多证合一（多证合一、医疗器械经营许可证）？
        </div>
      </Dialogmin>
    )
  }
}

// 上传照片
// 企业证照上传
export class UploadImg extends Component {
  state = {
  }
  constructor(props) {
    super(props)
  }
  /*
   * 修改图片模块中的图片处理
   * */
  static defaultProps = {
    display: true,
    src: ''
  }
  static propTypes = {
    display: PropTypes.bool,
    id: PropTypes.string.isRequired,
    // documentName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }
  handleFiles = () => (event) => {
    console.debug('event:', event.target.files);
    const file = event.target.files[0];
    const rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
    const img = document.querySelector(`#${event.target.name}`);
    console.debug('handleFiles:', img);
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
  /*
   * 添加添加图标触发选择图片
   * */
  uploadImg = (event) => {
    const btnARR = document.querySelector(`input[name=${event.target.id}]`);
    const e = document.createEvent('MouseEvents');
    e.initEvent('click', false, true);
    btnARR.dispatchEvent(e);
  }
  render() {
    return (
      <div style={{ display: this.props.display ? 'block' : 'none' }} className='BheaderImgWrapper subDivWrapper'>
        <div className='BuploadDiv' >
          <input onChange={this.handleFiles()} multiple style={{ display: 'none' }} type='file' name={this.props.id} />
          <div className='wareAddicon' />
          <p className='Badd'>添加</p>
          {/* 上传完成图标*/}
          <div className='imgComplete completeUp'>
            <img src='/done.png' alt='' />
            <p>完成</p>
          </div>
          {/* 上传失败图标*/}
          <div className='imgComplete errorUp'>
            <img src='/renovate.png' alt='' />
            <p>上传失败，重新上传</p>
          </div>
          <img onClick={this.uploadImg} id={this.props.id} src={this.props.src} alt='' />
        </div>
        <p className='BheaderInfo'>{this.props.text}</p>
      </div>
    )
  }
}

