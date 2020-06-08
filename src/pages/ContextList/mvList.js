import React, {Component} from 'react';
import {connect} from 'dva'
import { Flex, Icon } from 'antd-mobile';
import {sk_user_token} from '@/config/StorageKeys'
import styles from './textListCSS.css';

import { ListView } from 'antd-mobile';
import { Toast } from 'antd-mobile/lib/index';
import router from 'umi/router';






class mvList extends Component {

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


  get_dataList = () =>{
     const{dispatch} = this.props;
     dispatch({
       type:'PostDataList/getMvDataList',
       payload:{},
       callback: response => {
         this.setState({
           data: response.data
         })
       }
     })
  };

     getWebHeader = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'HeaderDataContent/getWebHeader',
      payload: {},
    });
  };

  gotoDetail = (contextID, title) => {
    if (this.userInfo && this.userInfo.userType === '超级会员' && this.token) {
      // window.open(contextID);
      router.push({
        pathname: '/ContextList/mvContext',
        query: {
          Url: contextID,
          Title: title,
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
            <Icon onClick={() => this.ContextRouter()} color='#fff' type="left" size='lg'/><span
            className={styles.headerFont}>{this.props.HeaderDataContent.name}</span>
          </Flex>

        </div>

        {data && data.length > 0 && data.map((item, index) => {
          return (
            <div className={styles.content} onClick={() => this.gotoDetail(item.url, item.title)}>
                  <div style={{ padding: '0 15px' }}>
                    <Flex jusitfy='between'>
                      <img style={{ height: '64px', marginRight: '30px' }} src={item.imgUrl} alt=""/>
                      <div style={{ lineHeight: 1 }}>
                        <div style={{ marginTop: 10 }}><span style={{ fontSize: '15px' }}>视频标题: </span><span
                          style={{ fontSize: '15px' }}>{item.title}</span></div>
                        <div style={{ marginTop: 20 }}><span style={{ fontSize: '15px' }}>发布作者: </span><span
                          style={{ fontSize: '15px' }}>{this.props.HeaderDataContent.name}</span></div>
                      </div>
                    </Flex>
                  </div>
            </div>
          );
        })}

      </div>
    )
  }
}

export default connect(({PostDataList, HeaderDataContent}) => ({
  PostDataList,
  HeaderDataContent
}))(mvList)

