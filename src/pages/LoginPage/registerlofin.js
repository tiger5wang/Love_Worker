
import React, {Component} from 'react';
import { Flex, InputItem, List, Button, Toast } from 'antd-mobile';
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
        if(response.code===200){
          Toast.success(response.message)
        //   router.push({
        //   pathname: '/',
        //    query: {
        //      token: response.token,
        //    },
        // });
        }else{
          Toast.offline(response.message);
        }

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
          <Button type="primary" style={{ width: 100 }} onClick={() => this.postRegister()}>注册</Button>
        </Flex>

        <Flex justify='center' style={{ marginTop: 50 }}>
          版权:【最终解释权归本人所有,此系统仅供学习参考，请勿用于非法用途】
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

