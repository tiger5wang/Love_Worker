import React, {Component} from 'react';
import { Flex, Icon, WingBlank, WhiteSpace, List, Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import router from 'umi/router';
import {connect} from 'dva'
import Styles from './register.css'
import ModifyImg from  '../../assets/img/emptyCart.jpg'
import proxyRequest from '@/utils/request';
import preloadImg from '@/assets/img/yujiazai.gif';
const Item = List.Item;


class register extends Component {

  state = {};
  list = [];

  getPayStatus = (order) => {
    if(order) {
      let formdata = new FormData();
      formdata.append('id', this.pathC);
      formdata.append('orderid', order);

      proxyRequest.post('/Api/get_os', formdata)
        .then(result => {
          const {code, msg} = result;
          // Toast.info(code)
          if(code == 0) {
            this.list.push(order)
          }
          console.log('-------------', result)
        })
        .catch(err => console.log('error', err))
    }
  }

  getOrders = async () => {
    if(this.orders && this.orders.length > 0) {
      let orders = this.orders.split(',');
      for(let order of orders) {
        await this.getPayStatus(order)
      }
    }
   }

  componentDidMount(){
    this.orders = window.localStorage.getItem('orders');
    this.pathC = window.localStorage.getItem('c');
    // alert(this.orders)
    // this.getOrders()
  }

  // 获取详情信息
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

  // 跳转详情页
  goToDetail = (data) => {
    router.push({
      pathname: '/ContextList/contextInfo',
      query: {
        data,
        isWatched: true
      },
    })
  };

  rendItem = (item, index) => {
    return (
      <div key={item.id}
           style={{width: '49%',  marginLeft: index % 2 === 1? '2%': 0, marginTop: 10}}
           onClick={() => this.justifyPay(item)}>
        <img
          src={!this.state[`preloadImg${index}`] ? preloadImg: item.image }
          alt={item.name}
          style={{ width: '100%', height: window.innerWidth / 3 - 10, verticalAlign: 'top', borderRadius: 4}}
          onLoad={() => {
            this.setState({[`preloadImg${index}`]: true})
            window.dispatchEvent(new Event('resize'));
            // this.setState({ imgHeight: 'auto' });
          }}
          onError={() => {this.setState({[`preloadImg${index}`]: false})}}
        />
        <WhiteSpace size={'sm'}/>
        <p className={Styles.title}>{item.name}</p>
        <WhiteSpace size={'sm'}/>
        <p style={{color: 'red'}}>{item.cs}人付款</p>
      </div>
    )
  }

  render() {
    let watchedString = window.localStorage.getItem('watchedData');
    const watchedData =  JSON.parse(watchedString) || [] ;
    console.log('--------------', watchedData)

    let orders = window.localStorage.getItem('orders')
    var list = []
    if(orders) {
       list = orders.split(',');
    }else {
      list = []
    }

    return (
      <div className={Styles.box}>
        <Flex justify="start" style={{backgroundColor: 'red', padding: '8px 15px'}}>
          {/*<Icon style={{width: 30, height: 20}} onClick={() => this.returnPage()} color='#fff' type="left" size='lg'/>*/}
          <p style={{fontSize: 16, color: '#fff'}}>已购</p>
        </Flex>
        <WingBlank>
          {watchedData.length > 0 ?
            <Flex wrap={'wrap'} style={{width: window.innerWidth - 30}}>
              {watchedData.map((item, index) => this.rendItem(item,  index))}
            </Flex>
            :
            <div>
              <Flex justify='center' style={{marginTop:'50%'}}>
                <img alt=" " src={ModifyImg}/>
              </Flex>
              <Flex justify='center'>
                <span>空空如也  <a href='#' style={{ color: 'red' }}>随便逛逛</a></span>
              </Flex>
            </div>
          }
        </WingBlank>

      </div>

    );
  }
}

const EditHeaderWrapper = createForm()(register);
export default connect(()=>{

})(EditHeaderWrapper)
