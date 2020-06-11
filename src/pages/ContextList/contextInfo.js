
import React, {Component} from 'react';
import { Flex, Icon, Toast, ActionSheet } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
import moment from 'moment';
import VideoPlayer from '../VideoPlayer';
import styles from './contextInfo.css'
import proxyRequest from '@/utils/request';
import { UrlConfig } from '@/config/config';
import { setUrlEncoded } from '@/utils/baseServer';


class contextInfo extends Component {


  state={
    isPay: false,
    LDFlag: 1
  }

  componentWillUnmount() {
    const flag = window.localStorage.getItem('flag');
    if(flag != 2) {
      localStorage.setItem('flag', 2);
    }
  }

  componentDidMount(){
    this.orders = window.localStorage.getItem('orders');
    this.pathC = window.localStorage.getItem('c');
    // setInterval(() => console.log('22222222222222222222222'), 1000)
    this.getFlag();
    this.getPayStatus();


  }

  justifyPay = () => {
    const paytype = window.localStorage.getItem('paytype');
    const paydate = window.localStorage.getItem('paydate');

    if(paytype == 1) {
      this.setState({
        isPay: true
      });
      localStorage.setItem('currentOrder', '');
    }
    if(paytype == 2) {  // 包天
      if(moment(paydate).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
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

  // http://www.verming.com/Api/get_os
  getPayStatus = () => {
    let currentOrder = window.localStorage.getItem('currentOrder');
    // Toast.info(currentOrder)
    // alert(currentOrder)
    // alert(this.pathC)
    if(currentOrder) {
      let formdata = new FormData();
      formdata.append('id', this.pathC);
      formdata.append('orderid', currentOrder);

      proxyRequest.post('/Api/get_os', formdata)
        .then(result => {
          const {code, msg} = result;
          // Toast.info(code)
          if(code == 0) {
            this.justifyPay()
          }
          console.log('-------------', result)
        })
        .catch(err => console.log('error', err))
    }

  }

  // 获取flag
  getFlag = () => {
    let formdata = new FormData();
    formdata.append('id', this.pathC);
    proxyRequest.post('/Api/get_flag', formdata)
      .then(result => {
        let {code, flag} = result;
        if(code == 0) {
          this.setState({
            LDFlag: flag
          })
        }
      })
      .catch(error => console.log(error))
  }

  // 更多视频
  SearchValue = value => {
    router.push({
      pathname: '/home/HuaShuList',
      query: {
        filterData: value,
      },
    });
  };

  // 返回
  returnPage = () => {
    this.props.history.goBack()
  };

  // 选择支付弹窗
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

    let paytype = this.state.clicked == '微信支付' ? 1: 2
    let datetime = new Date().getTime().toString().substr(-12);
    this.datetime = datetime;
    let pars = `id=${this.pathC}&orderid=${datetime}&money=${money}&zname=${data.id}&paytype=${paytype}`

    let request_url = UrlConfig.base_url + '/Pay/startpay?' + pars;
    localStorage.setItem('currentOrder', datetime)
    localStorage.setItem('paytype', type);
    localStorage.setItem('paydate', new Date());
    if(!this.orders) {
      localStorage.setItem('orders', datetime);
    } else {
      localStorage.setItem('orders', `${this.orders},${datetime}`);
    }

    setInterval(() => console.log('11111111111111'), 1000)

    window.location.href = request_url;

    //
    // this.setState({
    //   isPay: true
    // })
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
          <div className={styles.backImg} >
            {this.state.LDFlag === 2 && <button onClick={() => this.showActionSheet(data, 1)}>{data.price}元单片看</button>}
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
