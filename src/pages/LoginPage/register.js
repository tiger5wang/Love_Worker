/*
__author__ = 'YongCong Wu'
@Time    : 2019/8/8 16:54
@Email   :  : 1922878025@qq.com
*/
import React, {Component} from 'react';
import { Flex, InputItem, List, Tabs } from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from 'dva'
import styles from '@/pages/home/index.css';
import RegisterLogin from './registerlofin'
import LoginUser from './loginuser'


class register extends Component {

  componentDidMount(){

  }

  render() {

    const { getFieldProps } = this.props.form;
    const tabs = [
      { title: '注册', sub: '1' },
      { title: '登录', sub: '2' },
    ];




    return (
      <div style={{backgroundColor:'#fff', height:'100%'}}>
        <div className={styles.header}>
          <span className={styles.headerFont}>恋爱话术</span>
        </div>

        <Tabs tabs={tabs}
              initialPage={1}
              onChange={(tab, index) => {
                console.log('onChange', index, tab);
              }}
              onTabClick={(tab, index) => {
                console.log('onTabClick', index, tab);
              }}
        >
          <RegisterLogin/>
          <LoginUser/>

        </Tabs>


      </div>
    );
  }
}

const EditHeaderWrapper = createForm()(register);
export default connect(()=>{

})(EditHeaderWrapper)
