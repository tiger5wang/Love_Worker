import React, {Component} from 'react';
import {connect} from 'dva'
import { WingBlank, WhiteSpace, SearchBar, Carousel, Grid,NoticeBar, Toast, Flex } from 'antd-mobile';
import styles from './SessionCategoryList.css';
import { createForm } from 'rc-form';
import router from 'umi/router';
import {UrlConfig} from '@/config/config'
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
      selectedTab: 'words',
      open: true,
      visible: false,
      selected: '',
      data: ['1', '2'],
      imgHeight: 176,
    }
  }


  componentDidMount() {
    console.log('------------------------------')
    const { dispatch } = this.props;
    const url_c = window.localStorage.getItem('c')
    const user = window.localStorage.getItem('username')
    if (getPageQuery().c || url_c != '' && url_c != null) {
      localStorage.setItem('c', getPageQuery().c);
      if (user) {
        let formdata = new FormData();
        formdata.append('id', url_c);

        fetch(`${UrlConfig.base_url}/Api/setask`, {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/x-www-form-urlencoded',
          // },
          body: formdata,
        }).then(function(res) {
          console.log('1111111111111111', JSON.stringify(res))
          return res.json();
        }).then(function(json) {
          console.log(JSON.stringify(json))
          if (json.code == '0') {
            console.log('232323233-----正确');
          }
        })
      } else {
        console.log(this.Randomuuid());
        localStorage.setItem('username', this.Randomuuid() + this.Randomuuid() + this.Randomuuid() + this.Randomuuid());
      }
      this.setCarousel()

    } else {
      console.log('=====================')
      window.location.href = 'https://im.qq.com/'
    }
    this.getIndex()
    console.log('window.innerWidth', window.innerWidth)
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

  // http://www.verming.com/Api/getindex
  getIndex = () => {
    let formdata = new FormData();
    formdata.append('id', 6);

    proxyRequest.post('/Api/getindex', formdata)
      .then(result => {
        console.log('0000000000000000000', result)
        const {code, data, msg} = result;
        if(code === 0) {
          this.setState({
            dataList: data
          }, () => console.log('this.state.dataList', this.state.dataList))
        } else {
          Toast.info(msg)
        }
      })
      .catch(error => {
        console.log('error', error)
        Toast.fail(error)
      })
  }



  gotoWordsList = (Id, Name) => {
      router.push({
        pathname: '/wordsList',
        query: {
          id: Id,
          name: Name,
          token: this.token
        },
    })
    // }
  };


  SearchValue = value => {
    router.push({
      pathname: '/home/HuaShuList',
      query: {
        filterData: value,
      },
    });
  };



  render() {

    const data = listdata.map(( i) => ({
      icon: `${i.imgPath}`,
      text: `${i.name}`,
    }));


    return(
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}
           onScroll={() => console.log('11111111111111111111111')}
           onScrollCapture={() => console.log('2222222222222222222222222')}
      >
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
              <a
                key={val}
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

        {/*内容部分*/}
        <Grid  columnNum={6} data={data} hasLine={false}/>


        <WingBlank>
          {this.state.dataList.length > 0 ?
            <Flex wrap={'wrap'}>
              {this.state.dataList.map((item, index) => {

                return (
                  <div key={item.id}
                       style={{width: '49%',  marginLeft: index % 2 === 1? '2%': 0, marginTop: 10}}>
                    <a
                      style={{ width: '100%', height: '100%'}}
                      onClick={() => console.log('click')}
                    >
                      <img
                        src={this.state[`preloadImg${index}`] ? preloadImg: item.image }
                        alt={item.name}
                        style={{ width: '100%', height: window.innerWidth / 3 - 10, verticalAlign: 'top', borderRadius: 4}}
                        onLoad={() => {
                          window.dispatchEvent(new Event('resize'));
                          // this.setState({ imgHeight: 'auto' });
                        }}
                        onError={() => {this.setState({[`preloadImg${index}`]: true})}}
                      />
                      <WhiteSpace size={'sm'}/>
                      <p className={styles.title}>{item.name}</p>
                      <WhiteSpace size={'sm'}/>
                      <p style={{color: 'red'}}>{item.cs}人付款</p>
                    </a>
                  </div>
                )
              })}
            </Flex>
            : null}
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
