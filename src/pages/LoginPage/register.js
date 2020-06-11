import React, {Component} from 'react';
import { Flex, WingBlank, List} from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from 'dva'
import Styles from './register.css'
import ModifyImg from  '../../assets/img/emptyCart.jpg'
import proxyRequest from '@/utils/request';
const Item = List.Item;


class register extends Component {

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

  render() {
    let orders = window.localStorage.getItem('orders')
    var list = []
    if(orders) {
       list = orders.split(',');
    }else {
      list = []
    }

    return (
      <div className={Styles.box}>
        {list.length > 0 ? list.map(item => <Item extra={item}>订单号</Item>) :
          <WingBlank size="sm">
            <Flex justify='center' style={{marginTop:'50%'}}>
              <img alt=" " src={ModifyImg}/>
            </Flex>
            <Flex justify='center'>
              <span>空空如也  <a href='#' style={{ color: 'red' }}>随便逛逛</a></span>
            </Flex>
          </WingBlank>
        }

      </div>

    );
  }
}

const EditHeaderWrapper = createForm()(register);
export default connect(()=>{

})(EditHeaderWrapper)
