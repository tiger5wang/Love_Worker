import React, {Component} from 'react';
import {connect} from 'dva'
import {TabBar} from 'antd-mobile'
import styles from './index.css';
import SessionCategoryList from './SessionCategoryList'
import ReginterPage from '../LoginPage/register'
import ContextPage from '../ContextList/textList'
import { sk_user_token } from '@/config/StorageKeys';
import ProfileCenter from '@/pages/profileCenter'
// import Pagelogin from './pagelogin'

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

  render() {
    return(
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0}}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor={'#ff790c'}
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="情话"
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
            icon={<div className={styles.middle}/>}
            selectedIcon={<div className={styles.middle_selected}/>}
            title="撩妹技巧"
            key="middle"
            selected={this.state.selectedTab === 'middle'}
            onPress={() => {
              this.setState({
                selectedTab: 'middle',
              });
            }}
          >
            {<ContextPage/>}
          </TabBar.Item>
          <TabBar.Item
            icon={<div className={styles.icon}/>}
            selectedIcon={<div className={styles.icon_selected}/>}
            title="个人中心"
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
