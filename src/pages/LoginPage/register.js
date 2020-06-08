import React, {Component} from 'react';
import { Flex, WingBlank} from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from 'dva'
import Styles from './register.css'
import ModifyImg from  '../../assets/img/emptyCart.jpg'


class register extends Component {

  componentDidMount(){

  }

  render() {

    return (
      <div className={Styles.box}>
        <WingBlank size="sm">
          <Flex justify='center' style={{marginTop:'50%'}}>
            <img alt=" " src={ModifyImg}/>
          </Flex>
          <Flex justify='center'>
            <span>空空如也  <a href='#' style={{ color: 'red' }}>随便逛逛</a></span>
          </Flex>
        </WingBlank>
      </div>

    );
  }
}

const EditHeaderWrapper = createForm()(register);
export default connect(()=>{

})(EditHeaderWrapper)
