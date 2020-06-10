import React, {Component} from 'react';
import {connect} from 'dva';
import {
  WingBlank,
  WhiteSpace,
  Toast,
  Flex,
  Icon,
  ListView,
  PullToRefresh } from 'antd-mobile'
import router from 'umi/router';
import styles from './HuaShuList.css';
import proxyRequest from '@/utils/request';
import preloadImg from  '../../assets/img/mide170pl.jpg';


class HuaShuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.flag = window.localStorage.getItem('flag');
    this.searchDataList();
  }

  returnPage = () => {
    this.props.history.goBack()
  };

  searchDataList = () => {
    const url_c = window.localStorage.getItem('c');
    let formdata = new FormData();
    formdata.append('id', url_c);
    formdata.append('page', this.page);
    formdata.append('keyword', this.props.location.query.filterData);

    proxyRequest.post('/Api/getlist', formdata)
      .then(result => {
        console.log('/Api/getlist', result)
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
        Toast.fail(error)
      })
  };


  listDataInfo = dataID => {
    router.push({
      pathname: '/wordsList/datainfo',
      query: {
        uid: dataID,
        titid: this.props.location.query.id,
        name: this.props.location.query.name,
        filterData: this.props.location.query.filterData,

      },
    });
  };

  // 判断支付，跳转详情页
  justifyPay = (data) => {
    const url_c = window.localStorage.getItem('c');
    let formdata = new FormData();
    formdata.append('id', url_c);
    formdata.append('sid', data.id);

    proxyRequest.post('/Api/getdetails', formdata)
      .then(result => {
        console.log('000000000000', result)
        const {code, data, msg} = result;
        if(code === 0) {
          this.goToDetail(data)
        } else {
          Toast.info(msg)
        }
      })
      .catch(error => {
        console.log('error', error);
        Toast.fail('视频加载失败')
      })
  }

  goToDetail = async (data) => {
    router.push({
      pathname: '/ContextList/contextInfo',
      query: {
        data
      },
    })
  };

  //上拉加载
  onEndReached = () => {
    // console.log('+++++++++++++++++++++++++++++', this.state.loadEnd)
    if(!this.state.loadEnd) {
      this.page += 1;
      this.setState({upLoading: true});
      this.searchDataList();
    }
  }
//下拉刷新
  onRefresh = () => {
    this.setState({ pullLoading: true });
    this.page = 0;
    this.data = [];
    this.searchDataList();
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
  };

  render() {
    const { list, dataSource, upLoading, pullLoading } = this.state;
    return (
      <div style={{backgroundColor: '#fff'}}>
        <div className={styles.header}>
          <Flex justify="start">
            <div className={styles.goback}>
              <Icon onClick={() => this.returnPage()} color='#fff' type="left" size='lg'/>
            </div>
            <span className={styles.headerFont}>搜索{this.props.location.query.filterData}的结果</span>
          </Flex>
        </div>

        {list && list.length ?
          <WingBlank>
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
          </WingBlank>
          :
          <div className={styles.container}>
            <p className={styles.noData}>暂无数据</p>
          </div>
        }

      </div>
    )
  }

}

export default connect(({searchData}) => ({
  searchData: searchData.data
}))(HuaShuList)
