
import React, {Component} from 'react';
import { Flex, Icon, Toast, ActionSheet, WingBlank, WhiteSpace, ListView, PullToRefresh } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
import moment from 'moment';
import VideoPlayer from '../VideoPlayer';
import styles from './contextInfo.css'
import proxyRequest from '@/utils/request';
import { UrlConfig } from '@/config/config';
import preloadImg from  '../../assets/img/yujiazai.gif'
import { setUrlEncoded } from '@/utils/baseServer';


class contextInfo extends Component {

  constructor(props) {
    super(props);
    this.state={
      isPay: true,
      LDFlag: 1,  // 服务端的 flag值， 1 可以免费看一部， 2 需要购买
      list: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1[0] !== r2[0]
      }),
      upLoading : false,
      pullLoading : false,
      loadEnd: false,
    };
    this.page = 0;
    this.data = []
  }


  componentDidMount(){
    this.orders = window.localStorage.getItem('orders');
    this.pathC = window.localStorage.getItem('c');
    this.getFlag();
    this.getPayStatus();
    this.getIndex();
  }

  componentWillUnmount() {
    const flag = window.localStorage.getItem('flag');
    if(flag != 2) {
      localStorage.setItem('flag', 2);
    }
  }
  // 判断是否支付
  justifyPay = () => {
    const paytype = window.localStorage.getItem('paytype');
    const paydate = window.localStorage.getItem('paydate');

    if(paytype == 1) {  // 单片
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

  // 查询支付状态
  getPayStatus = () => {
    let currentOrder = window.localStorage.getItem('currentOrder');
    if(currentOrder) {
      let formdata = new FormData();
      formdata.append('id', this.pathC);
      formdata.append('orderid', currentOrder);

      proxyRequest.post('/Api/get_os', formdata)
        .then(result => {
          const {code, msg} = result;
          // Toast.info(code)
          if(code == 0) {
            this.justifyPay();
            this.getIndex();
          }
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

    window.location.href = request_url;

  }



  render() {
    const { list, dataSource, upLoading, pullLoading } = this.state;
    const flag = window.localStorage.getItem('flag');
    // console.log('------------------', flag)
    const {data} = this.props.location.query;
    const videoJsOptions = {
      autoplay: true,  //自动播放
      language: 'zh-CN',
      controls: true,  //控制条
      preload: 'auto',  //自动加载
      errorDisplay: true,  //错误展示
      width: window.innerWidth,  //宽
      height: window.innerWidth * 2 / 3,  //高
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
          <div>
            <VideoPlayer {...videoJsOptions} />
            <WingBlank>
              {
                list && list.length &&
                  <ListView
                    dataSource={dataSource.cloneWithRows(list)}
                    renderRow={(rowData, id1, i) => this.renderRow(rowData, i)}
                    initialListSize={5}
                    pageSize={5}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                      {upLoading ? <Icon type="loading" />: null}
                    </div>)}
                    onEndReached={() => this.onEndReached()}
                    onEndReachedThreshold={50}
                    // useBodyScroll={true}
                    style={{ width: window.innerWidth, height: window.innerHeight}}
                    pullToRefresh={<PullToRefresh // import { PullToRefresh } from 'antd-mobile'
                      refreshing={pullLoading}
                      onRefresh={this.onRefresh}
                    />}
                  />
              }
            </WingBlank>
          </div>
        }
      </div>
    );

  }

  // 获取列表数据
  getIndex = () => {
    let formdata = new FormData();
    formdata.append('id', this.pathC);
    formdata.append('page', this.page);

    proxyRequest.post('/Api/getindex', formdata)
      .then(result => {
        console.log('/Api/getindex', result)
        const {code, data, msg} = result;
        if(code === 0) {
          if(!data || data.length <= 0) {
            this.setState({
              loadEnd: true
            })
          }
          let arr = [];
          for(let i=0; i<data.length; i++) {
            arr.push(data[i]);
            if(i % 2 === 1) {
              this.data.push(arr);
              arr = []
            }
          }
          this.setState({
            list: this.data,
            upLoading : false,
            pullLoading : false
          })
        } else {
          Toast.info(msg);
          this.setState({
            upLoading : false,
            pullLoading : false
          })
        }
      })
      .catch(error => {
        console.log('error', error);
        Toast.fail('加载数据失败')
      })
  };
  // 判断支付，跳转详情页
  justifyPay = (data) => {
    let formdata = new FormData();
    formdata.append('id', this.pathC);
    formdata.append('sid', data.id);

    proxyRequest.post('/Api/getdetails', formdata)
      .then(result => {
        console.log('000000000000', result)
        const {code, data, msg} = result;
        if(code === 0) {
          this.goToDetail(data)
        } else {
          Toast.info(msg);
        }
      })
      .catch(error => {
        console.log('error', error);
        Toast.fail('加载视频失败')
      })
  };
  // 跳转详情
  goToDetail = (data) => {
    router.push({
      pathname: '/ContextList/contextInfo',
      query: {
        data
      },
    })
  };

  //上拉加载
  onEndReached = () => {
    // console.log('+++++++++++++++++++++++++++++', this.state.loadEnd)
    if(!this.state.loadEnd) {
      this.page += 1;
      this.setState({upLoading: true});
      this.getIndex();
    }
  }
//下拉刷新
  onRefresh = () => {
    this.setState({ pullLoading: true });
    this.page = 0;
    this.data = [];
    this.getIndex();
    //接口请求第一页数据,完成后将pullLoading设为false
  }

//获取item进行展示
  renderRow = (data, i) => {
    // console.log(data, i)
    return (
      <Flex wrap={'wrap'} style={{width: window.innerWidth - 30}}>
        {data.length > 0 && data.map((item, index) => {
          return (
            <div key={item.id}
                 style={{width: '49%',  marginLeft: index % 2 === 1? '2%': 0, marginTop: 10}}
                 onClick={() => this.justifyPay(item)}>
              <img
                src={this.state[`preloadImg${index}${i}`] ? preloadImg: item.image }
                alt={item.name}
                style={{ width: '100%', height: window.innerWidth / 3 - 10, verticalAlign: 'top', borderRadius: 4}}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                  // this.setState({ imgHeight: 'auto' });
                }}
                onError={() => {this.setState({[`preloadImg${index}${i}`]: true})}}
              />
              <WhiteSpace size={'sm'}/>
              <p className={styles.contextNmae}>{item.name}</p>
              <WhiteSpace size={'sm'}/>
              <p style={{color: 'red'}}>{item.cs}人付款</p>
            </div>
          )
        })}
      </Flex>
    )
  }
}

export default connect(({postContext}) => ({
  postContext
}))(contextInfo)
