import React, {Component} from 'react';
import {connect} from 'dva'
import {
  WingBlank,
  WhiteSpace,
  SearchBar,
  Carousel,
  Grid,
  NoticeBar,
  Toast,
  Flex,
  Icon,
  ListView,
  PullToRefresh
} from 'antd-mobile';
import styles from './SessionCategoryList.css';
import { createForm } from 'rc-form';
import router from 'umi/router';
// 等会要放开
import lb1 from '../../assets/img/lb1.jpg';
import lb2 from '../../assets/img/lb2.jpg';
import liest1 from  '../../assets/img/1577453883_2111036308.png'
import liest2 from  '../../assets/img/1577453832_742047754.png'
import liest3 from  '../../assets/img/1577453733_1352348737.png'
import liest4 from  '../../assets/img/1577453565_516727827.png'
import liest5 from  '../../assets/img/1577453854_1382469246.png'
import liest6 from  '../../assets/img/1577453651_1501000480.png'

import liest7 from  '../../assets/img/1577453797_1717017493.png'
import liest8 from  '../../assets/img/1577453489_2053494951.png'
import liest9 from  '../../assets/img/1577453865_6817530.png'
import liest10 from  '../../assets/img/1577446105_461386401.png'
import liest11 from  '../../assets/img/1577453505_1414941554.png'
import liest12 from  '../../assets/img/1577453865_6817530.png'

import preloadImg from  '../../assets/img/mide170pl.jpg'

import { getPageQuery } from '@/utils/utils'
import proxyRequest from '@/utils/request';

const listdata = [
  { 'name': '全部', 'imgPath': `${liest1}` },
  { 'name': '国产', 'imgPath': `${liest2}` },
  { 'name': '日韩', 'imgPath': `${liest3}` },
  { 'name': '欧美', 'imgPath': `${liest4}` },
  { 'name': '三级', 'imgPath': `${liest5}` },
  { 'name': '动漫', 'imgPath': `${liest6}` },
  { 'name': '迷奸', 'imgPath': `${liest7}` },
  { 'name': '偷拍', 'imgPath': `${liest8}` },
  { 'name': '人兽', 'imgPath': `${liest9}` },
  { 'name': '乱伦', 'imgPath': `${liest10}` },
  { 'name': '少女', 'imgPath': `${liest11}` },
  { 'name': '制服', 'imgPath': `${liest12}` }];

class SessionCategoryList extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataList: [],
      data: ['1', '2'],
      imgHeight: 176,
      list: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1[0] !== r2[0]
      }),
      upLoading : false,
      pullLoading : false,
      loadEnd: false,
    };
    this.data = [];
    this.page = 0;
  }


  componentDidMount() {
    const url_c = window.localStorage.getItem('c');
    this.flag = window.localStorage.getItem('flag');
    if(!this.flag) {
      localStorage.setItem('flag', 1);
    }
    this.pathC = getPageQuery().c ? getPageQuery().c : url_c;
    this.setask();
  }

  // 随机值
  Randomuuid=()=> {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }

  // 轮播图
  setCarousel = () =>{
    this.setState({
      data: [lb1, lb2]
    })
  };

  setask = () => {
    const user = window.localStorage.getItem('username');
    if (this.pathC) {
      this.getIndex();
      this.setCarousel();
      localStorage.setItem('c', this.pathC);

      if (!this.flag || this.flag == 1) {
        let formdata = new FormData();
        formdata.append('id', this.pathC);

        proxyRequest.post('/Api/setask', formdata)
          .then(function(json) {
            // console.log(JSON.stringify(json))
            // if (json.code == '0') {
              // console.log('232323233-----正确');
            // }
          })
          .catch(error => {
            console.log(error);
          });
      }
      if(!user) {
        localStorage.setItem('username', this.Randomuuid() + this.Randomuuid() + this.Randomuuid() + this.Randomuuid());
      }
    } else {
      window.location.href = 'https://im.qq.com/'
    }
  };

  // http://www.verming.com/Api/getindex
  getIndex = () => {
    let formdata = new FormData();
    formdata.append('id', this.pathC);
    formdata.append('page', this.page);

    proxyRequest.post('/Api/getindex', formdata)
      .then(result => {
        console.log('/Api/getindex', result)
        const {code, data, msg} = result;
        if(code === 0) {
          if(!data || data.length <= 0) {
            this.setState({
              loadEnd: true
            })
          }
          let arr = [];
          for(let i=0; i<data.length; i++) {
            arr.push(data[i]);
            if(i % 2 === 1) {
              this.data.push(arr);
              arr = []
            }
          }
          this.setState({
            list: this.data,
            upLoading : false,
            pullLoading : false
          })
        } else {
          Toast.info(msg);
          this.setState({
            upLoading : false,
            pullLoading : false
          })
        }
      })
      .catch(error => {
        console.log('error', error);
        Toast.fail('加载数据失败')
      })
  };
  // 判断支付，跳转详情页
  justifyPay = (data) => {
    let formdata = new FormData();
    formdata.append('id', this.pathC);
    formdata.append('sid', data.id);

    proxyRequest.post('/Api/getdetails', formdata)
      .then(result => {
        console.log('000000000000', result)
        const {code, data, msg} = result;
        if(code === 0) {
          this.goToDetail(data)
        } else {
          Toast.info(msg);
        }
      })
      .catch(error => {
        console.log('error', error);
        Toast.fail('加载视频失败')
      })
  };

  goToDetail = (data) => {
    router.push({
      pathname: '/ContextList/contextInfo',
      query: {
        data
      },
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

  //上拉加载
  onEndReached = () => {
    // console.log('+++++++++++++++++++++++++++++', this.state.loadEnd)
    if(!this.state.loadEnd) {
      this.page += 1;
      this.setState({upLoading: true});
      this.getIndex();
    }
  }
//下拉刷新
  onRefresh = () => {
    this.setState({ pullLoading: true });
    this.page = 0;
    this.data = [];
    this.getIndex();
    //接口请求第一页数据,完成后将pullLoading设为false
  }
//获取item进行展示
  renderRow = (data, i) => {
    // console.log(data, i)
    return (
        <Flex wrap={'wrap'} style={{width: window.innerWidth - 30}}>
          {data.length > 0 && data.map((item, index) => {
            return (
              <div key={item.id}
                   style={{width: '49%',  marginLeft: index % 2 === 1? '2%': 0, marginTop: 10}}
                   onClick={() => this.justifyPay(item)}>
                <img
                  src={this.state[`preloadImg${index}${i}`] ? preloadImg: item.image }
                  alt={item.name}
                  style={{ width: '100%', height: window.innerWidth / 3 - 10, verticalAlign: 'top', borderRadius: 4}}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                    // this.setState({ imgHeight: 'auto' });
                  }}
                  onError={() => {this.setState({[`preloadImg${index}${i}`]: true})}}
                />
                <WhiteSpace size={'sm'}/>
                <p className={styles.title}>{item.name}</p>
                <WhiteSpace size={'sm'}/>
                <p style={{color: 'red'}}>{item.cs}人付款</p>
              </div>
            )
          })}
        </Flex>
    )
  }


  render() {
    // console.log('*************************', ReactDOM.findDOMNode(this.lv).parentNode.offsetTop)
    const data = listdata.map(( i) => ({
      icon: `${i.imgPath}`,
      text: `${i.name}`,
    }));

    const { list, dataSource, upLoading, pullLoading } = this.state;
    return(
      <div className={styles.container}>
        <SearchBar placeholder="搜索关键字例如:人兽、强奸..." onSubmit={value => this.SearchValue(value)}/>

        {/*轮播图*/}
         <WingBlank size="sm">
            <Carousel
            autoplay={true}
            infinite={true}
            autoplayInterval={3000}
            // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            // afterChange={index => console.log('slide to', index)}
          >
            {this.state.data.map(val => (
              <a key={val}
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={`${val}`}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top', borderRadius: 11, marginTop:4 }}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
            </Carousel>
         </WingBlank>
        <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
          如 果 付 款 后 没 有 跳 转 播 放 页 面 请 联 系 客 服.855779585955
        </NoticeBar>

        {/*分类部分*/}
        <Grid  columnNum={6} data={data} hasLine={false} onClick={(item) => this.SearchValue(item.text)}/>

        <WingBlank>
          {
            list && list.length ?
              <ListView
                dataSource={dataSource.cloneWithRows(list)}
                renderRow={(rowData, id1, i) => this.renderRow(rowData, i)}
                initialListSize={5}
                pageSize={5}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                  {upLoading ? <Icon type="loading" />: null}
                </div>)}
                onEndReached={() => this.onEndReached()}
                onEndReachedThreshold={50}
                // useBodyScroll={true}
                style={{ width: window.innerWidth, height: window.innerHeight}}
                pullToRefresh={<PullToRefresh // import { PullToRefresh } from 'antd-mobile'
                  refreshing={pullLoading}
                  onRefresh={this.onRefresh}
                />}
              />
              :
              list && !list.length ?
                <div >
                  <p>暂无数据</p>
                </div> : null
          }
        </WingBlank>
      </div>
    )
  }


}


const SessionCategory = createForm()(SessionCategoryList);
export default connect(({home, header})=>{
  return {
    header
  };
})(SessionCategory)
