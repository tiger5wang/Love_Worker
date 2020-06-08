import React, {Component} from 'react';
import {connect} from 'dva'
import {TabBar} from 'antd-mobile'
import styles from './index.css';
import SessionCategoryList from './SessionCategoryList'
import ReginterPage from '../LoginPage/register'
import { sk_user_token } from '@/config/StorageKeys';
import ProfileCenter from '@/pages/profileCenter'
import ZaiXian from '@/pages/home/ZaiXian';
import router from 'umi/router';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      directorList: [],
      selectedTab: 'words'
    };
    this.user = false
  }

  componentDidMount() {
    let userInfo = JSON.parse(localStorage.getItem('MSUser'));
    this.token = localStorage.getItem(sk_user_token);
    if(userInfo && userInfo.username && this.token) {
      this.user = true
    }
  }

  routerZaiXian = () => {
    router.push({
      pathname: '/home/ZaiXian',
    });
  };

  render() {
    return(
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0}}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor={'#ec1a5b'}
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="wordsv"
            icon={<div className={styles.words}/>}
            selectedIcon={<div className={styles.words_selected}/>
            }
            selected={this.state.selectedTab === 'words'}
            onPress={() => {
              this.setState({
                selectedTab: 'words',
              });
            }}
          >
            {<SessionCategoryList/>}
          </TabBar.Item>
          <TabBar.Item
            icon={<div className={styles.shexiangtouIcon}/>}
            selectedIcon={<div className={styles.wordSelectIcon}/>}
            title="分类"
            key="laoshi"
            selected={this.state.selectedTab === 'laoshi'}

            // onPress={() => {this.routerZaiXian()}}

            onPress={() => {
              this.setState({
                selectedTab: 'laoshi',
              });
            }}
          >
             {<ZaiXian/>}
          </TabBar.Item>

          <TabBar.Item
            icon={<div className={styles.icon}/>}
            selectedIcon={<div className={styles.icon_selected}/>}
            title="已购"
            key="account"
            selected={this.state.selectedTab === 'account'}
            onPress={() => {
              this.setState({
                selectedTab: 'account',
              });
            }}
          >
            {this.user ? <ProfileCenter/>: <ReginterPage/>}
          </TabBar.Item>

        </TabBar>
      </div>
    )
  }

}


export default connect(({home, header}) => ({
  directorList: home.directorList, header
}))(Home)
