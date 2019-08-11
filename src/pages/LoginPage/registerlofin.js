/*
__author__ = 'YongCong Wu'
@Time    : 2019/8/8 20:14
@Email   :  : 1922878025@qq.com
*/
import React, {Component} from 'react';
import { Flex, InputItem, List, Button } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import router from 'umi/router';



class registerlofin extends Component {


  postRegister=()=>{
    const { dispatch, form } = this.props;
    const userInfo = form.getFieldsValue();
    // console.log(JSON.stringify(userInfo));

    dispatch({
      type:'RegisterModalUser/postRegister',
      payload:{
          loginNum: userInfo.userPhone,
          password: userInfo.password
      },
      callback: response=>{
         router.push({
          pathname: '/',
           query: {
             token: response.token,
           },
        });
      }
    })
  };



  render() {

    const { getFieldProps } = this.props.form;

    return (
      <div>
        <Flex justify='center'>
           <h3>用户注册</h3>
        </Flex>
        <Flex justify="center">
          <List>
            <InputItem
              {...getFieldProps('userPhone',
              )}
              placeholder="请输入手机号"
            >手机号</InputItem>
            <InputItem
              {...getFieldProps('password')}
              placeholder="请输入密码"
            >密码</InputItem>
          </List>

        </Flex>
        <Flex style={{marginTop: 70}} justify='center'>
           <Button type="primary" style={{width: 100}} onClick={() => this.postRegister()}>注册</Button>
        </Flex>

      </div>
    );
  }
}

const EditHeaderWrapper = createForm()(registerlofin);
export default connect(({})=>{
  // return {
  //   data: RegisterModalUser.data,
  // };
})(EditHeaderWrapper)

