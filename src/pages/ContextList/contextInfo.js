
import React, {Component} from 'react';
import { Flex, Icon, Toast, ActionSheet } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
import moment from 'moment';
import VideoPlayer from '../VideoPlayer';
import styles from './contextInfo.css'
import proxyRequest from '@/utils/request';


class contextInfo extends Component {


  state={
    isPay: false
  }

  componentDidMount(){
    const flag = window.localStorage.getItem('flag');
    const paytype = window.localStorage.getItem('paytype');
    const paydate = window.localStorage.getItem('paydate');
    if(flag == '2') {
      if(paytype == 2) {  // 包天
        if(moment(paydate) == moment()) {
          this.setState({
            isPay: true
          })
        }
      }
      if(paytype == 3) {  // 包月
        if(moment(paydate).add(1, 'months') >= moment()) {
          this.setState({
            isPay: true
          })
        }
      }
    }
  }

  get_context_info =() =>{
    const{dispatch, location} = this.props;
    dispatch({
      type:'postContext/postContextInfo',
      payload:{
        id: location.query.ID
      },
      callback: response => {
        if(response.code===200){
          this.setState({
            context: response.context
          })
        }else{
          Toast.offline(response.message);
        }
      }
    })
  };

  SearchValue = value => {
    router.push({
      pathname: '/home/HuaShuList',
      query: {
        filterData: value,
      },
    });
  };

  returnPage = () => {
    const flag = window.localStorage.getItem('flag');
    if(flag != 2) {
      localStorage.setItem('flag', 2);
    }
    this.props.history.goBack()
  };

  showActionSheet = (data, type) => {
    const BUTTONS = ['微信支付', '支付宝支付', '取消'];
    ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: -1,
        // title: 'title',
        title : '选择支付方式',
        maskClosable: true,
        'data-seed': 'logId',
        // wrapProps,
      },
      (buttonIndex) => {
        if(buttonIndex === BUTTONS.length - 1) return;
        this.setState({ clicked: BUTTONS[buttonIndex] }, () => this.toPay(data, type));
      });
  }

  toPay = (data, type) => {
    // id=6
    // orderid=随机的订单号
    // money=价格
    // zname=资源名称
    // paytype=1微信，2支付宝
    let money;
    if(type === 1) money = data.price;
    if(type === 2) money = data.btprice;
    if(type === 3) money = data.byprice;
    const url_c = window.localStorage.getItem('c');
    let formdata = new FormData();
    formdata.append('id', url_c);
    formdata.append('orderid', data.id);
    formdata.append('money', this.page);
    formdata.append('zname', data.name);
    formdata.append('paytype', this.state.clicked == '微信支付' ? 1: 2);

    proxyRequest.post('/Api/startpay', formdata)
      .then(result => {
        // console.log('==========================', result)
        const {code, data, msg} = result;
        if(code == 0) {
          localStorage.setItem('paytype', type);
          localStorage.setItem('paydate', new Date());
          this.setState({
            isPay: true
          })
        }
      })
      .catch(error => {
        console.log('error', error);
        Toast.fail('支付失败');
      })
    this.setState({
      isPay: true
    })
  }

  render() {
    const flag = window.localStorage.getItem('flag');
    // console.log('------------------', flag)
    const {data} = this.props.location.query;
    const videoJsOptions = {
      autoplay: true,  //自动播放
      language: 'zh-CN',
      controls: true,  //控制条
      preload: 'auto',  //自动加载
      errorDisplay: true,  //错误展示
      width: 500,  //宽
      height: 300,  //高
      // fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
      // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
      // textTrackDisplay: false,  // 不渲染字幕相关DOM
      userActions: {
        hotkeys: true  //是否支持热键
      },
      sources: [
        {
          src: data.url,
          // type: "video/m3u8",  //类型可加可不加，目前未看到影响
          // type: 'video/mp4',
        }
      ]
    };

    return (
      <div>
        <div className={styles.header}>
          <Flex justify="start">
            <Icon style={{width: 30, height: 20}} onClick={() => this.returnPage()} color='#fff' type="left" size='lg'/>
            <p className={styles.title}>{data.name}</p>
          </Flex>
        </div>
        {flag == 2 && !this.state.isPay ?
          <div className={styles.backImg} style={{backgroundImage: `url(${data.image})`}}>
            <button onClick={() => this.showActionSheet(data, 1)}>{data.price}元单片看</button>
            <button onClick={() => this.showActionSheet(data, 2)}>{data.btprice}元包天看</button>
            <button onClick={() => this.showActionSheet(data, 3)}>{data.byprice}元包月看</button>
            <button onClick={() => this.SearchValue('全部')}>更多视频</button>
          </div>
          :
          <VideoPlayer {...videoJsOptions} />
        }
      </div>
    );

  }
}

export default connect(({postContext}) => ({
  postContext
}))(contextInfo)
