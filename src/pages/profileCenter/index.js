
import React,{Component} from 'react';
import { Flex, List, Icon, Toast, Button } from 'antd-mobile';
import styles from '@/pages/home/index.css';
import { connect } from 'dva';
import router from 'umi/router';
import { Storage } from '@/utils';
import { sk_user_token } from '@/config/StorageKeys';

const Item = List.Item;


class ProfileCenter extends Component {
  constructor(props) {
    super(props);
    this.state={
      username: '',
      create_time:'',
      userType: '',
      token:'',
      id: 0,
      kefu:'',
      huiyuan:''

    };
  }

  componentDidMount(){
    this.getWebHeader()
    this.get_kefu()
    this.hyJS()
    this.getStorage()

    const{dispatch, location} = this.props;
    const{id} = this.state;
    dispatch({
      type:'profileCenter/postUserInfo',
      payload:{
        id : id
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
          id: response.ID
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

   getWebHeader = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'HeaderDataLogin/getWebHeader',
      payload: {},
    });
  };


  hyJS = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'SettingsInfo/postSettingsInfo',
      payload: {},
      callback: response => {
        if (response.code === 200) {
          this.setState({
            huiyuan: response.hy,
          });
        } else {
          Toast.offline(response.message);
        }
      },
    });
  };

  get_kefu = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'SettingsInfo/getSettingsInfo',
      payload: {},
      callback: response => {
        if (response.code === 200) {
          this.setState({
            kefu: response.kf,
          });
        } else {
          Toast.offline(response.message);
        }
      },
    });
  };


  louot=()=>{
     router.push({
        pathname: '/LoginPage/register',
      });
  }

  render() {

    const{username, userType, create_time, kefu,huiyuan } = this.state;

    return (
            <div style={{backgroundColor:'#fff',position: 'fixed', height: '100%', width: '100%', top: 0}}>

        <div className={styles.header}>
          <Flex justify='between'>
            <Flex>
               <Icon onClick={() => this.returnHome()} color='#fff' type="left" size='lg'/>
            <span className={styles.headerFont}>{this.props.HeaderDataLogin.name}</span>
            </Flex>
            <Button inline size="small" onClick={() => this.louot()}>退出登录</Button>
            </Flex>

        </div>

        <Flex justify='center' style={{marginTop: 10}}>
          <img style={{width:50, height:50, borderRadius:'30%'}} src="http://i2.tiimg.com/702780/87a35efc5814c7de.png"  alt="头像" />
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
        <Flex justify='start' style={{marginTop: 10}}>
          <h3>会员介绍:</h3>
        </Flex>
        <Flex justify='start'>
          <p>
            {huiyuan}
          </p>
        </Flex>
         <Flex justify='start' style={{marginTop: 8}}>
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


export default connect(({profileCenter, HeaderDataLogin}) => ({
  profileCenter,
  HeaderDataLogin
}))(ProfileCenter)


