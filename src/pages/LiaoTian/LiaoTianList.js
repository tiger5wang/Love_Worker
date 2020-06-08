import React, {Component} from 'react';
import {connect} from 'dva'
import {sk_user_token} from '@/config/StorageKeys'
import styles from './LiaoTianList.css';

import { Icon, Flex } from 'antd-mobile';
import { Toast } from 'antd-mobile/lib/index';
import router from 'umi/router';






class LiaoTianList extends Component {

   constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }


  componentDidMount(){
     this.userInfo = JSON.parse(localStorage.getItem('MSUser'));
     this.token = localStorage.getItem(sk_user_token);
     this.getWebHeader()
    this.get_dataList()

  }


  getWebHeader = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'HeaderData/getWebHeader',
      payload: {},
    });
  };


  get_dataList = () =>{
     const{dispatch} = this.props;
     dispatch({
       type:'PostDataList/getImgList',
       payload:{},
       callback: response => {
         this.setState({
           data: response.data
         })
       }
     })
  };

  gotoDetail = (contextID, title) => {
    if(this.userInfo && this.userInfo.userType==="超级会员" && this.token) {
      // Toast.success(contextID);
      router.push({
        pathname: '/LiaoTian/DataInfoContext',
        query: {
          ID: contextID,
          Title: title
        },
      });
    } else {
      Toast.offline('超级会员专享，来升级会员吧~~~');
    }
  };

  ContextRouter = () => {
    router.push({
      pathname: '/',
    });
  };

  render() {
     const {data} = this.state;

    return(
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div className={styles.header}>
          <Flex justify='start'>
            <Icon onClick={() => this.ContextRouter()} color='#fff' type="left" size='lg'/><span className={styles.headerFont}>{this.props.HeaderData.name}</span>
          </Flex>

        </div>

        {data && data.length > 0 && data.map((item, index) => {
          return (
            <div className={styles.content} onClick={() => this.gotoDetail(item.ID, item.title)}>
                  <div style={{ padding: '0 15px' }}>
                    <div style={{ display: 'flex', padding: '15px 0' }}>
                      <img style={{ height: '64px', marginRight: '15px' }} src={item.imgUrl} alt=""/>
                      <div style={{ lineHeight: 1 }}>
                        <div style={{marginTop:10}}><span style={{ fontSize: '15px' }}>聊天实战: </span><span
                          style={{ fontSize: '15px' }}>{item.title}</span></div>
                      </div>
                    </div>
                  </div>
            </div>
          );
        })}

      </div>
    )
  }
}


export default connect(({ HeaderData }) => {
  return {

    HeaderData,
  };
})(LiaoTianList);

