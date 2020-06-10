
import React, {Component} from 'react';
import { Flex, Icon, Toast } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
import VideoPlayer from '../VideoPlayer';
import styles from './contextInfo.css'


class contextInfo extends Component {


  state={
    isPay: false
  }

  componentDidMount(){
      // this.get_context_info()
  }

  get_context_info =() =>{
    const{dispatch, location} = this.props;
    dispatch({
      type:'postContext/postContextInfo',
      payload:{
        id: location.query.ID
      },
      callback: response => {
        if(response.code===200){
          this.setState({
            context: response.context
          })
        }else{
          Toast.offline(response.message);
        }
      }
    })
  };

  SearchValue = value => {
    router.push({
      pathname: '/home/HuaShuList',
      query: {
        filterData: value,
      },
    });
  };

  returnPage = () => {
    this.props.history.goBack()
  };

  toPay = () => {
    this.setState({
      isPay: true
    })
  }

  render() {
    const flag = window.localStorage.getItem('flag');
    console.log('------------------', flag)
    const {data} = this.props.location.query;
    const videoJsOptions = {
      autoplay: true,  //自动播放
      language: 'zh-CN',
      controls: true,  //控制条
      preload: 'auto',  //自动加载
      errorDisplay: true,  //错误展示
      width: 500,  //宽
      height: 300,  //高
      // fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
      // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
      // textTrackDisplay: false,  // 不渲染字幕相关DOM
      userActions: {
        hotkeys: true  //是否支持热键
      },
      sources: [
        {
          src: data.url,
          // type: "video/m3u8",  //类型可加可不加，目前未看到影响
          // type: 'video/mp4',
        }
      ]
    };

    return (
      <div>
        <div className={styles.header}>
          <Flex justify="start">
            <Icon style={{width: 30, height: 20}} onClick={() => this.returnPage()} color='#fff' type="left" size='lg'/>
            <p className={styles.title}>{data.name}</p>
          </Flex>
        </div>
        {flag == 2 && !this.state.isPay ?
          <div className={styles.backImg} style={{backgroundImage: `url(${data.image})`}}>
            <button onClick={this.toPay}>{data.price}元单片看</button>
            <button onClick={this.toPay}>{data.btprice}元包天看</button>
            <button onClick={this.toPay}>{data.byprice}元包月看</button>
            <button onClick={() => this.SearchValue('全部')}>更多视频</button>
          </div>
          :
          <VideoPlayer {...videoJsOptions} />
        }
      </div>
    );

  }
}

export default connect(({postContext}) => ({
  postContext
}))(contextInfo)
