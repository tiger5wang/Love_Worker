/*
__author__ = 'YongCong Wu'
@Time    : 2019/8/8 20:14
@Email   :  : 1922878025@qq.com
*/
import React, {Component} from 'react';
import { Button, Flex, InputItem, List, Toast } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import router from 'umi/router';



class loginuser extends Component {

  subMitLogin = () => {
    const { dispatch, form } = this.props;
    const userInfo = form.getFieldsValue();

    dispatch({
      type: 'LoginModalUser/postLogin',
      payload: {
        loginNum: userInfo.userPhone,
        password: userInfo.password,
      },
      callback: response => {
        // router.push({
        //   pathname: '/home',
        // });
        if(response.code===200){
          router.push({
            pathname: '/LoginPage/pagelogin',
            query: {
              id: response.ID,
            },
         });
        }else{
           Toast.offline(response.message);
        }
      },
    });
  };

  render() {

    const { getFieldProps } = this.props.form;

    return (
      <div>
        <Flex justify='center'>
           <h3>用户登录</h3>
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
              type="password"
              placeholder="请输入密码"
            >密码</InputItem>
          </List>

        </Flex>

        <Flex style={{ marginTop: 70 }} justify='center'>
          <Button type="primary" style={{ width: 100 }} onClick={() => this.subMitLogin()}>登录</Button>
        </Flex>

      </div>
    );
  }
}

const EditHeaderWrapper = createForm()(loginuser);
export default connect(()=>{

})(EditHeaderWrapper)

