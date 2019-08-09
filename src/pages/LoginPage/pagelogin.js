/*
__author__ = 'YongCong Wu'
@Time    : 2019/8/9 10:09
@Email   :  : 1922878025@qq.com
*/
import React,{Component} from 'react';
import {Flex, List, Icon} from 'antd-mobile';
import styles from '@/pages/home/index.css';
import { connect } from 'dva';
import router from 'umi/router';

const Item = List.Item;
class pagelogin extends Component {

  state={
    username: '',
    create_time:'',
    userType: '',
    token:''
  };

  componentDidMount(){

    const{dispatch, location} = this.props;
    dispatch({
      type:'UserInfo/postUserInfo',
      payload:{
          id : location.query.id
      },
      callback: response=>{
        this.setState({
          username: response.username,
          userType: response.userType,
          create_time: response.create_time,
          token: response.token
        })
        console.log(response)
      }
    })

  }


  returnHome = () => {
    const { token } = this.state;
    router.push({
      pathname: '/',
      query: {
        token: token,
      },
    });
  };

  render() {

    const{username, userType, create_time} = this.state;


    return (
      <div style={{backgroundColor:'#fff',position: 'fixed', height: '100%', width: '100%', top: 0}}>

        <div className={styles.header}>
          <Flex justify='start'>
            <Icon onClick={() => this.returnHome()} color='#fff' type="left" size='lg'/>
            <span className={styles.headerFont}>恋爱话术</span>
          </Flex>

        </div>

        <Flex justify='center' style={{marginTop: 100}}>
          <img style={{width:100, height:100, borderRadius:'50%'}} src="https://www.wuyongcong.com/uploads/201903/avatar_15906d9cfe68cc32_small.jpeg"  alt="头像" />
        </Flex>
         <Flex justify='center'>
          <h3>会员级别: {userType}</h3>
        </Flex>
        <Flex justify='center'>
          <h3>当前用户登录账号: {username}</h3>
        </Flex>
        <Flex justify='center'>
          <h3>注册时间: {create_time}</h3>
        </Flex>

        <List  className="my-list" style={{marginTop: 80}}>
          <Item arrow="horizontal" multipleLine onClick={() => {
          }}>
            会员介绍
          </Item>
        </List>
        <List className="my-list">
          <Item arrow="horizontal" multipleLine onClick={() => {
          }}>
            联系客服
          </Item>
        </List>
      </div>
    );
  }
}

export default connect(({UserInfo}) => ({
UserInfo
}))(pagelogin)


