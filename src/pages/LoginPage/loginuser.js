
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
           Toast.offline('账号或密码错误,请重新输入！');
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

        <Flex justify='center' style={{marginTop: 50}}>
          版权:【最终解释权归本人所有,此系统仅供学习参考，请勿用于非法用途】
        </Flex>

      </div>
    );
  }
}

const EditHeaderWrapper = createForm()(loginuser);
export default connect(()=>{

})(EditHeaderWrapper)

