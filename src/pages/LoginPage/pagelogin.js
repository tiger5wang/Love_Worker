/*
__author__ = 'YongCong Wu'
@Time    : 2019/8/9 10:09
@Email   :  : 1922878025@qq.com
*/
import React,{Component} from 'react';
import { Flex, List, Icon, Toast } from 'antd-mobile';
import styles from '@/pages/home/index.css';
import { connect } from 'dva';
import router from 'umi/router';
import { Storage } from '@/utils';
import { sk_user_token } from '@/config/StorageKeys';

const Item = List.Item;


class pagelogin extends Component {
  constructor(props) {
    super(props);
    this.state={
      username: '',
      create_time:'',
      userType: '',
      token:'',
      kefu:'',
      huiyuan:''
    };
  }

  componentDidMount(){
    this.getStorage()
    this.hyJS()
    this.get_kefu()

    const{dispatch, location} = this.props;
    dispatch({
      type:'UserInfo/postUserInfo',
      payload:{
          id : location.query.id
      },
      callback: response=>{
        let user = {
          username: response.username,
          userType: response.userType,
          create_time: response.create_time,
        };
        Storage.set('MSUser', user);
        this.setState({
          username: response.username,
          userType: response.userType,
          create_time: response.create_time,
        })
      }
    })

  }

  getStorage = () => {
    let userInfo = JSON.parse(localStorage.getItem('MSUser'));
    this.token = localStorage.getItem(sk_user_token);
    if(userInfo && userInfo.username && this.token) {
      this.setState({
        username: userInfo.username,
        userType: userInfo.userType,
        create_time: userInfo.create_time,
      })
    }
  };

  returnHome = () => {
    router.push({
      pathname: '/',
    });
  };


  get_kefu = ()=>{
      const{dispatch} = this.props;
     dispatch({
      type:'SettingsInfo/getSettingsInfo',
      payload: {},
      callback: response => {
          if(response.code===200){
            this.setState({
              kefu: response.kf
            })
        }else{
          Toast.offline(response.message);
        }
      }
    })
  }

  hyJS= () => {
    const{dispatch} = this.props;
      dispatch({
      type:'SettingsInfo/postSettingsInfo',
      payload: {},
      callback: response => {
        if(response.code===200){
          this.setState({
            huiyuan: response.hy
          })
        }else{
          Toast.offline(response.message);
        }
      }
    })
  }

  render() {

    const{username, userType, create_time, kefu, huiyuan} = this.state;

    return (
      <div style={{backgroundColor:'#fff',position: 'fixed', height: '100%', width: '100%', top: 0}}>

        <div className={styles.header}>
          <Flex justify='start'>
            <Icon onClick={() => this.returnHome()} color='#fff' type="left" size='lg'/>
            <span className={styles.headerFont}>恋爱话术</span>
          </Flex>

        </div>

        <Flex justify='center' style={{marginTop: 100}}>
          <img style={{width:100, height:100, borderRadius:'50%'}} src="https://i.loli.net/2019/08/10/RPMitd6SIVe8nfw.jpg"  alt="头像" />
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
        <Flex justify='start' style={{marginTop: 80}}>
          <h3>会员介绍:</h3>
        </Flex>
        <Flex justify='start'>
          <p>
            {huiyuan}
          </p>
        </Flex>
         <Flex justify='start' style={{marginTop: 15}}>
          <h3>联系客服:</h3>
        </Flex>
         <Flex justify='start'>
          <p>
            {kefu}
          </p>
        </Flex>
      </div>
    );
  }
}


export default connect(({userInfo, SettingsInfo}) => ({
  userInfo,
  SettingsInfo
}))(pagelogin)


